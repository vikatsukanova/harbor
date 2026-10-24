import { expect, test } from '@playwright/test'
import { visualStories } from './stories.js'

for (const story of visualStories) {
  test(story.name, async ({ page }) => {
    if (story.viewport) {
      await page.setViewportSize(story.viewport)
    }
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`)
    const root = page.locator('#storybook-root')
    await root.waitFor()
    await page.evaluate(() => document.fonts.ready)
    await expect(root).toHaveScreenshot(`${story.name}.png`)
  })
}
