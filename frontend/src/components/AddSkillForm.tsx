import { useMemo, useState } from 'react'
import {
  duplicateNameMessage,
  isDuplicateName,
  normalizeSkillName,
  validateSkillName,
} from '../utils/validation'

interface AddSkillFormProps {
  existingNames: string[]
  onSubmit: (name: string) => Promise<void>
}

export function AddSkillForm({ existingNames, onSubmit }: AddSkillFormProps) {
  const [name, setName] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const validationError = useMemo(() => validateSkillName(name), [name])
  const duplicate = useMemo(
    () => isDuplicateName(name, existingNames),
    [name, existingNames],
  )
  const errorText = duplicate ? duplicateNameMessage() : validationError
  const disabled = Boolean(errorText) || saving

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (disabled) {
      return
    }
    setSaving(true)
    setSubmitError(null)
    try {
      await onSubmit(normalizeSkillName(name))
      setName('')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to add skill.'
      setSubmitError(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="skill-form" onSubmit={handleSubmit}>
      <label htmlFor="add-skill-input">Add skill</label>
      <input
        id="add-skill-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter a skill"
        className={errorText ? 'invalid' : ''}
      />
      {errorText ? <p className="error-text">{errorText}</p> : null}
      {submitError ? <p className="error-text">{submitError}</p> : null}
      <button type="submit" disabled={disabled}>
        {saving ? 'Saving...' : 'Add Skill'}
      </button>
    </form>
  )
}
