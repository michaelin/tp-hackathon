import type { Skill } from '../api/types'
import { SkillListItem } from './SkillListItem'

interface SkillListProps {
  skills: Skill[]
  onRename: (id: number, name: string) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export function SkillList({ skills, onRename, onDelete }: SkillListProps) {
  return (
    <ul className="skill-list">
      {skills.map((skill) => (
        <SkillListItem
          key={skill.id}
          skill={skill}
          existingNames={skills.map((item) => item.name)}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
