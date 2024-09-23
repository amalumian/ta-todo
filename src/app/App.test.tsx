import { screen } from '@testing-library/react'

import App from './App'
import { renderWithProvider } from '../common/utils/test-utils'

describe('App', () => {
  beforeEach(() => renderWithProvider(<App />))

  it('renders header element', () => {
    const headerElement = screen.getByRole('heading', { name: /todo/i })
    expect(headerElement).toBeInTheDocument()
  })

  it('renders Lists component', () => {
    const listsComponent = screen.getByRole('heading', { name: /lists/i })
    expect(listsComponent).toBeInTheDocument()
  })

  it('renders TodosList component', () => {
    const todosListComponent = screen.getByRole('heading', { name: /general/i })
    expect(todosListComponent).toBeInTheDocument()
  })

  it('renders footer element', () => {
    const footerElement = screen.getByRole('link', { name: /github/i })
    expect(footerElement).toBeInTheDocument()
  })
})
