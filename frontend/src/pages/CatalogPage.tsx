import { useEffect, useMemo, useState } from 'react'
import { addSkill, deleteSkill, listSkills, renameSkill } from '../api/client'
import type { ErrorResponse, Skill } from '../api/types'
import { AddSkillForm } from '../components/AddSkillForm'
import { SkillList } from '../components/SkillList'

function sortSkills(skills: Skill[]): Skill[] {
  return [...skills].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      sensitivity: 'accent',
      usage: 'sort',
    }),
  )
}

export function CatalogPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try {
      setSkills(sortSkills(await listSkills()))
      setError(null)
    } catch {
      setError('Unable to load skills.')
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const existingNames = useMemo(
    () => skills.map((skill) => skill.name),
    [skills],
  )

  async function handleAdd(name: string) {
    try {
      const created = await addSkill({ name })
      setSkills((prev) => sortSkills([...prev, created]))
      setError(null)
    } catch (e) {
      const apiError = e as ErrorResponse
      throw new Error(apiError.message)
    }
  }

  async function handleRename(id: number, name: string) {
    try {
      const updated = await renameSkill(id, { name })
      setSkills((prev) =>
        sortSkills(prev.map((item) => (item.id === id ? updated : item))),
      )
      setError(null)
    } catch {
      setError('Unable to rename skill.')
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteSkill(id)
      setSkills((prev) => prev.filter((item) => item.id !== id))
      setError(null)
    } catch {
      setError('Unable to delete skill.')
    }
  }

  return (
    <main className="catalog-page">
      <section className="hero">
        <p className="eyebrow">Team Skills Matrix</p>
        <h1>Global Skill Catalog</h1>
      </section>

      <AddSkillForm existingNames={existingNames} onSubmit={handleAdd} />
      {error ? <p className="error-text">{error}</p> : null}
      <SkillList
        skills={skills}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </main>
  )
}
