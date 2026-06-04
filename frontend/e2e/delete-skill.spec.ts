import { expect, test } from '@playwright/test'
import { attachMockCatalogApi } from './mockApi'

test('delete skill removes item immediately', async ({ page }) => {
  await attachMockCatalogApi(page, [
    { id: 1, name: 'Automated Testing' },
    { id: 2, name: 'Go' },
  ])

  await page.goto('/')
  await expect(page.getByText('Go')).toBeVisible()
  await page
    .getByText('Go')
    .locator('..')
    .getByRole('button', { name: 'Delete' })
    .click()
  await expect(page.getByText('Go')).not.toBeVisible()
})
