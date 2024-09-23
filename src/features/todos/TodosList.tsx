import { useState } from 'react'

import { completedTodosRemoved, selectTodos } from './todosSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import TodoItem from './TodosItem'
import { selectActiveList } from '../lists/listsSlice'
import TodosForm from './TodosForm'

const TodosList = () => {
  const [isShownCompleted, setIsShownCompleted] = useState(false)

  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)
  const activeList = useAppSelector((state) => selectActiveList(state))

  const listTodos = todos.filter((todo) => todo.listId === activeList?.id)
  const activeTodos = listTodos.filter((todo) => !todo.isCompleted)
  const completedTodos = listTodos.filter((todo) => todo.isCompleted)

  const handleShowCompleted = () => {
    setIsShownCompleted(!isShownCompleted)
  }

  const handleClearTodos = () => {
    if (activeList) {
      dispatch(completedTodosRemoved(activeList.id))
      handleShowCompleted()
    }
  }

  return (
    <>
      <header className='mb-4 flex justify-between text-2xl font-bold text-orange-500'>
        <h2>{activeList?.name}</h2>
        <div>{activeTodos.length}</div>
      </header>

      <div>
        <div className='flex justify-between text-gray-500'>
          <div>
            {`${completedTodos.length} Completed · `}
            <button
              className='text-orange-500 hover:text-orange-950'
              type='button'
              onClick={handleClearTodos}
            >
              Clear
            </button>
          </div>

          <button
            className='text-orange-500 hover:text-orange-950'
            type='button'
            onClick={handleShowCompleted}
          >
            Show
          </button>
        </div>

        {isShownCompleted && (
          <ul className='text-gray-500'>
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>

      <div>
        <ul>
          {activeTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>

        <TodosForm />
      </div>
    </>
  )
}

export default TodosList
