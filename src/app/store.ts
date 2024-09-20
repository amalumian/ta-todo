import { configureStore } from '@reduxjs/toolkit'

import todosReducer from '../features/todos/todosSlice';
import listsReducer from '../features/lists/listsSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    lists: listsReducer
  },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
