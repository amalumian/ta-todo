import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProvider } from '../../common/utils/test-utils'
import TodosList from './TodosList'

describe('TodosList', () => {
  const user = userEvent

  beforeEach(async () => {
    renderWithProvider(<TodosList />)
  })

  it('renders with initial state', () => {
    const headingElement = screen.getByRole('heading', { name: /general/i })
    expect(headingElement).toBeInTheDocument()

    const activeTodosCountElement = screen.getByTestId('active-todos-count')
    expect(activeTodosCountElement).toHaveTextContent('0')

    const completedTodosCountElement = screen.getByTestId('completed-todos-count')
    expect(completedTodosCountElement).toHaveTextContent('0')
  })

  it('renders new todo, changes todo, deletes todo', async () => {
    const inputAddTodoElement = screen.getByPlaceholderText('Type Todo')

    await user.type(inputAddTodoElement, 'Todo')
    await user.keyboard('{Enter}')

    const todoElement = screen.getByText(/todo/i)
    expect(todoElement).toBeInTheDocument()

    const activeTodosCountElement = screen.getByTestId('active-todos-count')
    expect(activeTodosCountElement).toHaveTextContent('1')

    await user.click(todoElement)
    const inputChangeTodoElement = screen.getByDisplayValue('Todo')
    await user.clear(inputChangeTodoElement)
    await user.type(inputChangeTodoElement, 'New Todo')
    expect(inputChangeTodoElement).toHaveValue('New Todo')
    await user.keyboard('{Enter}')

    const newTodoElement = screen.getByText(/new todo/i)
    expect(newTodoElement).toBeInTheDocument()

    const checkboxElement = screen.getByRole('checkbox')
    await user.click(checkboxElement)
    expect(activeTodosCountElement).toHaveTextContent('0')
    const completedTodosCountElement = screen.getByTestId('completed-todos-count')
    expect(completedTodosCountElement).toHaveTextContent('1')
    expect(newTodoElement).not.toBeInTheDocument()

    const buttonShowElement = screen.getByRole('button', { name: /show/i })
    await user.click(buttonShowElement)
    expect(screen.getByText(/new todo/i)).toBeInTheDocument()

    await user.click(buttonShowElement)
    expect(screen.queryByText(/new todo/i)).not.toBeInTheDocument()

    const buttonClearElement = screen.getByRole('button', { name: /clear/i })
    await user.click(buttonClearElement)
    expect(completedTodosCountElement).toHaveTextContent('0')
  })
})
