import { describe, expect, it } from 'vitest'
import {
  isDuplicateName,
  normalizeSkillName,
  validateSkillName,
} from './validation'

describe('validation', () => {
  it('normalizes whitespace', () => {
    expect(normalizeSkillName('  Go   Lang ')).toBe('Go Lang')
  })

  it('supports unicode and emoji', () => {
    expect(validateSkillName('技能 😀')).toBeNull()
  })

  it('rejects empty and too long values', () => {
    expect(validateSkillName('    ')).not.toBeNull()
    expect(validateSkillName('a'.repeat(81))).not.toBeNull()
  })

  it('detects duplicates case-insensitively', () => {
    expect(isDuplicateName(' go ', ['Go', 'TypeScript'])).toBe(true)
    expect(isDuplicateName('Rust', ['Go', 'TypeScript'])).toBe(false)
  })
})
