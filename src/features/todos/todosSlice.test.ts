import todosReducer, {
  todoAdded,
  todoRemoved,
  completedTodosRemoved,
  todoToggled,
  todoUpdated,
} from './todosSlice'

type Todo = {
  id: string
  text: string
  isCompleted: boolean
  listId: string
}

const initialState = {
  ids: [],
  entities: {},
}

describe('todosSlice', () => {
  it('handles initial state', () => {
    expect(todosReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('handles todoAdded', () => {
    const newTodo: Todo = {
      id: '1',
      text: 'Test Todo',
      isCompleted: false,
      listId: 'list-1',
    }

    const nextState = todosReducer(initialState, todoAdded(newTodo))

    expect(nextState.ids).toContain(newTodo.id)
    expect(nextState.entities[newTodo.id]).toEqual(newTodo)
  })

  it('handles todoRemoved', () => {
    const initialStateWithTodo = {
      ids: ['1'],
      entities: {
        '1': { id: '1', text: 'Test Todo', isCompleted: false, listId: 'list-1' },
      },
    }

    const nextState = todosReducer(initialStateWithTodo, todoRemoved('1'))

    expect(nextState.ids).not.toContain('1')
    expect(nextState.entities['1']).toBeUndefined()
  })

  it('handles completedTodosRemoved', () => {
    const initialStateWithTodos = {
      ids: ['1', '2'],
      entities: {
        '1': { id: '1', text: 'Test Todo 1', isCompleted: true, listId: 'list-1' },
        '2': { id: '2', text: 'Test Todo 2', isCompleted: false, listId: 'list-1' },
      },
    }

    const nextState = todosReducer(initialStateWithTodos, completedTodosRemoved('list-1'))

    expect(nextState.ids).toContain('2')
    expect(nextState.ids).not.toContain('1')
    expect(nextState.entities['1']).toBeUndefined()
  })

  it('handles todoToggled', () => {
    const initialStateWithTodo = {
      ids: ['1'],
      entities: {
        '1': { id: '1', text: 'Test Todo', isCompleted: false, listId: 'list-1' },
      },
    }

    const nextState = todosReducer(initialStateWithTodo, todoToggled('1'))

    expect(nextState.entities['1']!.isCompleted).toBe(true)
  })

  it('handles todoUpdated', () => {
    const initialStateWithTodo = {
      ids: ['1'],
      entities: {
        '1': { id: '1', text: 'Test Todo', isCompleted: false, listId: 'list-1' },
      },
    }

    const updatedTodo = { id: '1', changes: { text: 'Updated Todo' } }

    const nextState = todosReducer(initialStateWithTodo, todoUpdated(updatedTodo))

    expect(nextState.entities['1']!.text).toBe('Updated Todo')
  })
})
