import { useMemo, useState } from 'react'
import {
  duplicateNameMessage,
  isDuplicateName,
  normalizeSkillName,
  validateSkillName,
} from '../utils/validation'

interface RenameSkillFormProps {
  currentName: string
  existingNames: string[]
  onSubmit: (name: string) => Promise<void>
  onCancel: () => void
}

export function RenameSkillForm({
  currentName,
  existingNames,
  onSubmit,
  onCancel,
}: RenameSkillFormProps) {
  const [name, setName] = useState(currentName)
  const [saving, setSaving] = useState(false)

  const validationError = useMemo(() => validateSkillName(name), [name])
  const duplicate = useMemo(
    () => isDuplicateName(name, existingNames, currentName),
    [name, existingNames, currentName],
  )
  const errorText = duplicate ? duplicateNameMessage() : validationError

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (errorText || saving) {
      return
    }
    setSaving(true)
    await onSubmit(normalizeSkillName(name))
    setSaving(false)
  }

  return (
    <form className="rename-form" onSubmit={handleSubmit}>
      <input
        aria-label="Rename skill"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={errorText ? 'invalid' : ''}
      />
      {errorText ? <p className="error-text">{errorText}</p> : null}
      <div className="actions">
        <button type="submit" disabled={Boolean(errorText) || saving}>
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
