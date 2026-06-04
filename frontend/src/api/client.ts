import type { ErrorResponse, Skill, SkillInput } from './types'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function parseError(response: Response): Promise<ErrorResponse> {
  try {
    return (await response.json()) as ErrorResponse
  } catch {
    return { code: 'UNKNOWN', message: 'Unexpected error.' }
  }
}

export async function listSkills(): Promise<Skill[]> {
  const response = await fetch(`${API_BASE}/api/skills`)
  if (!response.ok) {
    throw await parseError(response)
  }
  return (await response.json()) as Skill[]
}

export async function addSkill(input: SkillInput): Promise<Skill> {
  const response = await fetch(`${API_BASE}/api/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!response.ok) {
    throw await parseError(response)
  }
  return (await response.json()) as Skill
}

export async function renameSkill(
  id: number,
  input: SkillInput,
): Promise<Skill> {
  const response = await fetch(`${API_BASE}/api/skills/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!response.ok) {
    throw await parseError(response)
  }
  return (await response.json()) as Skill
}

export async function deleteSkill(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/api/skills/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw await parseError(response)
  }
}
