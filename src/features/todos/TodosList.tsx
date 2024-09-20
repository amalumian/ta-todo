import { completedTodosRemoved, selectTodos } from './todosSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import TodoItem from './TodosItem'
import { selectActiveList } from '../lists/listsSlice'
import { useState } from 'react'
import TodosForm from './TodosForm'

const TodosList = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)
  const activeList = useAppSelector((state) => selectActiveList(state))
  const listTodos = todos.filter((todo) => todo.listId === activeList?.id)
  const activeTodos = listTodos.filter((todo) => !todo.isCompleted)
  const completedTodos = listTodos.filter((todo) => todo.isCompleted)

  const handleClear = () => {
    if (activeList) {
      dispatch(completedTodosRemoved(activeList.id))
      handleShowCompleted()
    }
  }

  const [isShownCompleted, setIsShownCompleted] = useState(false)

  const handleShowCompleted = () => {
    setIsShownCompleted(!isShownCompleted)
  }

  return (
    <>
      <div className='mb-4 flex justify-between text-2xl font-bold text-orange-500'>
        <h2>{activeList?.name}</h2>
        <div>{activeTodos.length}</div>
      </div>

      <div>
        <div className='flex justify-between text-gray-500'>
          <div>
            {`${completedTodos.length} Completed · `}
            <button className='text-orange-500' type='button' onClick={handleClear}>
              Clear
            </button>
          </div>
          <button className='text-orange-500' type='button' onClick={handleShowCompleted}>
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
