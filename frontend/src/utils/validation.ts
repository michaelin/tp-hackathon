const duplicateMessage = 'A skill with this name already exists.'
const validationMessage =
  'Skill name must be 1-80 characters after normalization.'

export function normalizeSkillName(name: string): string {
  return name.trim().split(/\s+/).filter(Boolean).join(' ')
}

export function validateSkillName(name: string): string | null {
  const normalized = normalizeSkillName(name)
  const count = Array.from(normalized).length
  if (count < 1 || count > 80) {
    return validationMessage
  }
  return null
}

export function isDuplicateName(
  name: string,
  existing: string[],
  current?: string,
): boolean {
  const normalized = normalizeSkillName(name).toLowerCase()
  const currentNormalized = current
    ? normalizeSkillName(current).toLowerCase()
    : null
  return existing.some((item) => {
    const candidate = normalizeSkillName(item).toLowerCase()
    if (currentNormalized && candidate === currentNormalized) {
      return false
    }
    return candidate === normalized
  })
}

export function duplicateNameMessage(): string {
  return duplicateMessage
}

export function skillValidationMessage(): string {
  return validationMessage
}
