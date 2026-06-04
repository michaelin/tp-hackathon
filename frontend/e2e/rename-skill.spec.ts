import { expect, test } from '@playwright/test'
import { attachMockCatalogApi } from './mockApi'

test('rename skill success and duplicate rejection', async ({ page }) => {
  await attachMockCatalogApi(page, [
    { id: 1, name: 'Automated Testing' },
    { id: 2, name: 'Go' },
    { id: 3, name: 'TypeScript' },
  ])

  await page.goto('/')
  await page
    .getByText('Go')
    .locator('..')
    .getByRole('button', { name: 'Rename' })
    .click()
  await page.getByLabel('Rename skill').fill('Golang')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Golang')).toBeVisible()

  await page
    .getByText('Golang')
    .locator('..')
    .getByRole('button', { name: 'Rename' })
    .click()
  await page.getByLabel('Rename skill').fill('TypeScript')
  await expect(
    page.getByText('A skill with this name already exists.'),
  ).toBeVisible()
})
