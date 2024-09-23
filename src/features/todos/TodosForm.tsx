import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { todoAdded } from '../todos/todosSlice'
import { selectActiveList } from '../lists/listsSlice'

const TodosForm = () => {
  const [text, setText] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()
  const activeList = useAppSelector((state) => selectActiveList(state))

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSubmitText = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (text !== '') {
      dispatch(todoAdded({ text, isCompleted: false, id: uuidv4(), listId: activeList!.id }))
      setText('')
    }
  }

  return (
    <form className='h-10 w-full' id='todos-form' onSubmit={handleSubmitText}>
      <input
        ref={inputRef}
        id='todos-form-input'
        className='h-10 w-full border-b border-solid border-b-orange-300 bg-transparent p-2 pl-0 outline-0'
        value={text}
        onChange={handleChangeText}
        placeholder='Type Todo'
        autoComplete='off'
      />
    </form>
  )
}

export default TodosForm
