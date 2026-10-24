import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { a11yStories } from './stories.js'

async function openStory(page, id) {
  // manual: the Storybook addon skips its own axe run, so this test can run axe.
  await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=a11y.manual:!true`)
  await page.locator('#storybook-root').waitFor()
  await page.evaluate(() => document.fonts.ready)
}

for (const id of a11yStories) {
  test(`${id} has no axe violations`, async ({ page }) => {
    await openStory(page, id)
    const results = await new AxeBuilder({ page }).include('#storybook-root').analyze()
    expect(results.violations, formatViolations(results.violations)).toEqual([])
  })
}

function formatViolations(violations) {
  return violations
    .map((violation) => {
      const nodes = violation.nodes.map((node) => node.target.join(' ')).join(', ')
      return `${violation.id}: ${violation.help} (${nodes})`
    })
    .join('\n')
}
