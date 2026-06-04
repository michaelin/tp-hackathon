import { useState } from 'react'
import type { Skill } from '../api/types'
import { RenameSkillForm } from './RenameSkillForm'

interface SkillListItemProps {
  skill: Skill
  existingNames: string[]
  onRename: (id: number, name: string) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export function SkillListItem({
  skill,
  existingNames,
  onRename,
  onDelete,
}: SkillListItemProps) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <li className="skill-item">
        <RenameSkillForm
          currentName={skill.name}
          existingNames={existingNames}
          onCancel={() => setEditing(false)}
          onSubmit={async (name) => {
            await onRename(skill.id, name)
            setEditing(false)
          }}
        />
      </li>
    )
  }

  return (
    <li className="skill-item">
      <span>{skill.name}</span>
      <div className="actions">
        <button type="button" onClick={() => setEditing(true)}>
          Rename
        </button>
        <button type="button" onClick={() => onDelete(skill.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}
