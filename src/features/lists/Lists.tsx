import { useState } from 'react'
import { MinusIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ListsForm from './ListsForm'
import { listRemoved, listToggled, selectLists } from './listsSlice'

const Lists = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useAppDispatch()
  const lists = useAppSelector(selectLists)

  const handleToggleModal = () => setIsModalOpen(!isModalOpen)

  const handleActiveList = (id: string) => {
    dispatch(listToggled(id))
  }

  const handleRemoveList = (id: string) => {
    dispatch(listRemoved(id))
  }

  return (
    <>
      <h2 className='mb-4 px-2'>My Lists</h2>

      <div className='flex flex-grow flex-col'>
        {lists.map((list) => {
          return (
            <div
              className={`mb-1 flex justify-between rounded-lg px-2 py-1 font-bold last:mb-0 hover:bg-orange-300 ${list.isActive ? 'bg-orange-300' : ''}`}
              key={list.id}
            >
              <button
                type='button'
                className='flex-grow text-left'
                onClick={() => handleActiveList(list.id)}
              >
                {list.name}
              </button>
              {list.id !== 'default' && (
                <button type='button' onClick={() => handleRemoveList(list.id)}>
                  <MinusIcon className='size-5' />
                </button>
              )}
            </div>
          )
        })}
      </div>

      <button
        type='button'
        className='mt-4 flex items-center px-2 hover:text-orange-500'
        onClick={handleToggleModal}
      >
        Add List <PlusCircleIcon className='ml-0.5 size-5' />
      </button>

      {isModalOpen && <ListsForm onToggleModal={handleToggleModal} />}
    </>
  )
}

export default Lists
