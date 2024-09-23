import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch } from '../../app/hooks'
import { listAdded } from './listsSlice'
import Modal from '../../common/components/Modal'

type ListsFormProps = {
  onToggleModal: () => void
}

const ListsForm = ({ onToggleModal }: ListsFormProps) => {
  const [name, setName] = useState('')

  const dispatch = useAppDispatch()

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleAddList = () => {
    if (name) {
      dispatch(listAdded({ name, id: uuidv4(), isActive: false }))
      onToggleModal()
      setName('')
    }
  }

  const handleCancelAddingList = () => {
    onToggleModal()
    setName('')
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (name) {
      dispatch(listAdded({ name, id: uuidv4(), isActive: false }))
      onToggleModal()
      setName('')
    }
  }

  return (
    <Modal
      title='Add New List'
      confirmButton='Add'
      denyButton='Cancel'
      onConfirm={handleAddList}
      onDeny={handleCancelAddingList}
    >
      <form id='lists-form' onSubmit={handleFormSubmit}>
        <input
          id='lists-form-input'
          className='w-full rounded border border-solid border-black p-2'
          value={name}
          onChange={handleChangeText}
          placeholder='Name'
          autoFocus
          autoComplete='off'
        />
      </form>
    </Modal>
  )
}

export default ListsForm
