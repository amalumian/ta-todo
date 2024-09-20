import { useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { todoRemoved, todoToggled, todoUpdated } from './todosSlice'
import { MinusIcon } from '@heroicons/react/20/solid'

type TodoProps = {
  todo: {
    id: string
    text: string
    isCompleted: boolean
  }
}

const TodoItem = ({ todo: { id, text, isCompleted } }: TodoProps) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(text)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsEditing(false)
        if (newText === '') {
          dispatch(todoRemoved(id))
        } else {
          dispatch(todoUpdated({ id, changes: { text: newText } }))
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dispatch, id, newText])

  const handleComplete = () => {
    dispatch(todoToggled(id))
  }

  const handleRemove = () => {
    dispatch(todoRemoved(id))
  }

  const handleToggleEditing = () => {
    setIsEditing(!isEditing)
  }

  const handleChangeNewText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value)
  }

  const handleNewTextSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleToggleEditing()
    if (newText === '') {
      dispatch(todoRemoved(id))
    } else {
      dispatch(todoUpdated({ id, changes: { text: newText } }))
    }
  }

  return (
    <li ref={containerRef} className='flex border-b border-solid border-b-orange-300'>
      <label className='relative flex cursor-pointer items-center'>
        <input
          id={`todo-item-checkbox-${id}`}
          type='checkbox'
          checked={isCompleted}
          onChange={handleComplete}
          className='peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-orange-300 bg-orange-100 transition-all checked:border-orange-500 checked:bg-orange-500'
        />
      </label>
      {isEditing ? (
        <form onSubmit={handleNewTextSubmit} className='w-full'>
          <input
            id={`todo-item-input-${id}`}
            ref={inputRef}
            className='w-full flex-grow bg-transparent p-2 outline-0'
            type='text'
            value={newText}
            onChange={handleChangeNewText}
            autoComplete='off'
          />
        </form>
      ) : (
        <div
          className='w-full flex-grow overflow-hidden whitespace-normal break-all p-2'
          onClick={handleToggleEditing}
        >
          {text}
        </div>
      )}
      <button className='ml-auto' type='button' onClick={handleRemove}>
        <MinusIcon className='size-5' />
      </button>
    </li>
  )
}

export default TodoItem
