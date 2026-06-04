import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CatalogPage } from './CatalogPage'
import * as api from '../api/client'

vi.mock('../api/client')

describe('CatalogPage', () => {
  it('renders sorted skills from API', async () => {
    vi.mocked(api.listSkills).mockResolvedValue([
      { id: 2, name: 'go' },
      { id: 1, name: 'Automated Testing' },
    ])
    vi.mocked(api.addSkill).mockResolvedValue({ id: 3, name: 'Rust' })
    vi.mocked(api.renameSkill).mockResolvedValue({ id: 2, name: 'Go' })
    vi.mocked(api.deleteSkill).mockResolvedValue()

    render(<CatalogPage />)

    await waitFor(() => {
      expect(screen.getByText('Automated Testing')).toBeInTheDocument()
      expect(screen.getByText('go')).toBeInTheDocument()
    })
  })
})
