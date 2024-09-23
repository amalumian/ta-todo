import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProvider } from '../../common/utils/test-utils'
import Lists from './Lists'

describe('Lists', () => {
  const user = userEvent.setup()

  it('adds, toggles and removes lists with correct classes', async () => {
    renderWithProvider(<Lists />)

    const buttonElement = screen.getByRole('button', { name: /add list/i })
    expect(buttonElement).toBeInTheDocument()

    const listElement = screen.getByRole('button', { name: /general/i })
    const listElementWrapper = listElement.closest('div')
    expect(listElementWrapper).toHaveClass('bg-orange-300')

    await user.click(buttonElement)
    const headingElement = screen.getByRole('heading', { name: /add new list/i })
    expect(headingElement).toBeInTheDocument()

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    await user.type(inputElement, 'New List')

    const confirmElement = screen.getByRole('button', { name: 'Add' })
    await user.click(confirmElement)
    const newListElement = screen.getByRole('button', { name: /new list/i })
    expect(newListElement).toBeInTheDocument()

    await user.click(newListElement)
    const newListElementWrapper = newListElement.closest('div')
    expect(newListElementWrapper).toHaveClass('bg-orange-300')
    expect(listElementWrapper).not.toHaveClass('bg-orange-300')

    const removeButtonElement = screen.getByTestId('remove-button-newlist')
    await user.click(removeButtonElement)
    expect(newListElement).not.toBeInTheDocument()
    expect(listElementWrapper).toHaveClass('bg-orange-300')
  })
})
