import { expect, test } from '@playwright/test'

test('shows seeded skills from live backend', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('Automated Testing')).toBeVisible()
  await expect(page.getByText('Go')).toBeVisible()
  await expect(page.getByText('TypeScript')).toBeVisible()
})
