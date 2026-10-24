import { expect, test } from '@playwright/test'

test('disclosure opens with the keyboard and Escape closes it', async ({ page }) => {
  await page.goto('/iframe.html?id=components-disclosure--closed&viewMode=story')
  const trigger = page.getByRole('button', { name: 'Sources' })
  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('region', { name: 'Sources' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(trigger).toBeFocused()
})

test.describe('site header at a phone width', () => {
  test.use({ viewport: { width: 390, height: 800 } })

  test('the menu button reveals the nav and Escape closes it', async ({ page }) => {
    await page.goto('/iframe.html?id=components-site-header--default&viewMode=story')
    const toggle = page.locator('[data-nav-toggle]')
    await expect(toggle).toHaveAccessibleName('Menu')
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden()
    await toggle.click()
    await expect(toggle).toHaveAccessibleName('Close')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('link', { name: 'Journal' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toHaveAccessibleName('Menu')
    await expect(toggle).toBeFocused()
  })
})
