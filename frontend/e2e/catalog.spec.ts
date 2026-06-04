import { expect, test } from '@playwright/test'
import { attachMockCatalogApi } from './mockApi'

test('full catalog CRUD journey', async ({ page }) => {
  await attachMockCatalogApi(page, [
    { id: 1, name: 'Automated Testing' },
    { id: 2, name: 'Go' },
    { id: 3, name: 'TypeScript' },
  ])

  await page.goto('/')

  await expect(page.getByText('Automated Testing')).toBeVisible()
  await page.getByPlaceholder('Enter a skill').fill('Rust')
  await page.getByRole('button', { name: 'Add Skill' }).click()
  await expect(page.getByText('Rust')).toBeVisible()

  await page
    .getByText('Rust')
    .locator('..')
    .getByRole('button', { name: 'Rename' })
    .click()
  await page.getByLabel('Rename skill').fill('Rustlang')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Rustlang')).toBeVisible()

  await page
    .getByText('Rustlang')
    .locator('..')
    .getByRole('button', { name: 'Delete' })
    .click()
  await expect(page.getByText('Rustlang')).not.toBeVisible()
})
