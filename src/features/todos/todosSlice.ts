import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { type RootState } from '../../app/store'
import { listRemoved } from '../lists/listsSlice'

type Todo = {
  id: string
  text: string
  isCompleted: boolean
  listId: string | undefined
}

const todosAdapter = createEntityAdapter<Todo>()

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    todoAdded: todosAdapter.addOne,
    todoRemoved: todosAdapter.removeOne,
    completedTodosRemoved: (state, action: PayloadAction<string>) => {
      const activeListId = action.payload
      const activeListTodos = Object.values(state.entities).filter(
        (todo) => todo.listId === activeListId,
      )
      const completedTodos = activeListTodos.filter((todo) => todo.isCompleted)
      const completedTodoIds = completedTodos.map((todo) => todo.id)
      todosAdapter.removeMany(state, completedTodoIds)
    },
    todoToggled: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const todo = state.entities[id]
      todo.isCompleted = !todo.isCompleted
    },
    todoUpdated: todosAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(listRemoved, (state, action: PayloadAction<string>) => {
      const listIdToRemove = action.payload

      const todoIdsToRemove = Object.values(state.entities)
        .filter((todo) => todo?.listId === listIdToRemove)
        .map((todo) => todo!.id)

      todosAdapter.removeMany(state, todoIdsToRemove)
    })
  },
})

export const { todoAdded, todoRemoved, todoToggled, completedTodosRemoved, todoUpdated } = todosSlice.actions
export const { selectAll: selectTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors<RootState>((state) => state.todos)
export default todosSlice.reducer
