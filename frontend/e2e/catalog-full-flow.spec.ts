import { expect, test } from '@playwright/test'
import { attachMockCatalogApi } from './mockApi'

test('catalog full flow list add rename delete', async ({ page }) => {
  await attachMockCatalogApi(page, [
    { id: 1, name: 'Automated Testing' },
    { id: 2, name: 'Go' },
    { id: 3, name: 'TypeScript' },
  ])

  await page.goto('/')
  await expect(page.getByText('Automated Testing')).toBeVisible()

  await page.getByPlaceholder('Enter a skill').fill('Platform Architecture')
  await page.getByRole('button', { name: 'Add Skill' }).click()
  await expect(page.getByText('Platform Architecture')).toBeVisible()

  await page
    .getByText('Platform Architecture')
    .locator('..')
    .getByRole('button', { name: 'Rename' })
    .click()
  await page.getByLabel('Rename skill').fill('Platform Engineering')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Platform Engineering')).toBeVisible()

  await page
    .getByText('Platform Engineering')
    .locator('..')
    .getByRole('button', { name: 'Delete' })
    .click()
  await expect(page.getByText('Platform Engineering')).not.toBeVisible()
})
