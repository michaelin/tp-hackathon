import type { Page } from '@playwright/test'

export interface MockSkill {
  id: number
  name: string
}

export async function attachMockCatalogApi(page: Page, initial: MockSkill[]) {
  let skills = [...initial]

  await page.route('**/api/skills', async (route, request) => {
    if (request.method() === 'GET') {
      await route.fulfill({ json: skills })
      return
    }
    if (request.method() === 'POST') {
      const body = request.postDataJSON() as { name: string }
      if (
        skills.some(
          (skill) => skill.name.toLowerCase() === body.name.toLowerCase(),
        )
      ) {
        await route.fulfill({
          status: 409,
          json: {
            code: 'SKILL_NAME_DUPLICATE',
            message: 'A skill with this name already exists.',
          },
        })
        return
      }
      const created = {
        id: Math.max(...skills.map((s) => s.id), 0) + 1,
        name: body.name,
      }
      skills = [...skills, created]
      await route.fulfill({ status: 201, json: created })
      return
    }
    await route.fallback()
  })

  await page.route('**/api/skills/*', async (route, request) => {
    const id = Number(request.url().split('/').pop())
    if (request.method() === 'PATCH') {
      const body = request.postDataJSON() as { name: string }
      const duplicate = skills.some(
        (skill) =>
          skill.id !== id &&
          skill.name.toLowerCase() === body.name.toLowerCase(),
      )
      if (duplicate) {
        await route.fulfill({
          status: 409,
          json: {
            code: 'SKILL_NAME_DUPLICATE',
            message: 'A skill with this name already exists.',
          },
        })
        return
      }
      skills = skills.map((skill) =>
        skill.id === id ? { ...skill, name: body.name } : skill,
      )
      const updated = skills.find((skill) => skill.id === id)
      await route.fulfill({ json: updated })
      return
    }
    if (request.method() === 'DELETE') {
      skills = skills.filter((skill) => skill.id !== id)
      await route.fulfill({ status: 204, body: '' })
      return
    }
    await route.fallback()
  })
}
