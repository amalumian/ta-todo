import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ListsForm from './ListsForm'
import { listRemoved, listToggled, selectActiveList, selectLists } from './listsSlice'
import { MinusIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const Lists = () => {
  const dispatch = useAppDispatch()
  const lists = useAppSelector(selectLists)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleToggleModal = () => setIsModalOpen(!isModalOpen)

  const handleActive = (id: string) => {
    dispatch(listToggled(id))
  }

  const handleRemove = (id: string) => {
    dispatch(listRemoved(id))
  }

  return (
    <>
      <header className='mb-4 px-2 font-bold'>
        <h2>My Lists</h2>
      </header>

      <div className='flex flex-grow flex-col'>
        {lists.map((list) => {
          return (
            <div
              className={`flex justify-between rounded-lg px-2 py-1 font-bold ${list.isActive ? 'bg-orange-300' : null}`}
              key={list.id}
            >
              <button className='flex-grow text-left' onClick={() => handleActive(list.id)}>
                {list.name}
              </button>
              {list.id !== 'default' && (
                <button role='button' onClick={() => handleRemove(list.id)}>
                  <MinusIcon className='size-5' />
                </button>
              )}
            </div>
          )
        })}
      </div>
      {isModalOpen && <ListsForm onToggleModal={handleToggleModal} />}
      <button className='flex items-center px-2' onClick={handleToggleModal}>
        Add List <PlusCircleIcon className='ml-0.5 size-4' />
      </button>
    </>
  )
}

export default Lists
