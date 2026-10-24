import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:6007',
    reducedMotion: 'reduce',
    ...devices['Desktop Chrome'],
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },
  webServer: {
    command: 'npx http-server storybook-static -p 6007 -c-1',
    url: 'http://127.0.0.1:6007/iframe.html',
    reuseExistingServer: false,
    timeout: 30_000,
  },
})
