import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RenameSkillForm } from './RenameSkillForm'

describe('RenameSkillForm', () => {
  it('shows duplicate error and disables save', () => {
    render(
      <RenameSkillForm
        currentName="Go"
        existingNames={['Go', 'TypeScript']}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByLabelText('Rename skill'), {
      target: { value: 'typescript' },
    })

    expect(
      screen.getByText('A skill with this name already exists.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })
})
