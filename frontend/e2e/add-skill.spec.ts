import { expect, test } from '@playwright/test'
import { attachMockCatalogApi } from './mockApi'

test('add skill success and duplicate rejection', async ({ page }) => {
  await attachMockCatalogApi(page, [
    { id: 1, name: 'Automated Testing' },
    { id: 2, name: 'Go' },
  ])

  await page.goto('/')
  await page.getByPlaceholder('Enter a skill').fill('Rust')
  await page.getByRole('button', { name: 'Add Skill' }).click()
  await expect(page.getByText('Rust')).toBeVisible()

  await page.getByPlaceholder('Enter a skill').fill('go')
  await expect(
    page.getByText('A skill with this name already exists.'),
  ).toBeVisible()
})
