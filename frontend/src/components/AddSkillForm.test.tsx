import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AddSkillForm } from './AddSkillForm'

describe('AddSkillForm', () => {
  it('disables submit when input is invalid', () => {
    render(<AddSkillForm existingNames={['Go']} onSubmit={vi.fn()} />)
    const input = screen.getByPlaceholderText('Enter a skill')
    fireEvent.change(input, { target: { value: '   ' } })
    expect(screen.getByRole('button', { name: /add skill/i })).toBeDisabled()
  })

  it('shows duplicate error and disables submit', () => {
    render(<AddSkillForm existingNames={['Go']} onSubmit={vi.fn()} />)
    const input = screen.getByPlaceholderText('Enter a skill')
    fireEvent.change(input, { target: { value: 'go' } })
    expect(
      screen.getByText('A skill with this name already exists.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add skill/i })).toBeDisabled()
  })
})
