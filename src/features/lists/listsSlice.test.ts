import { configureStore } from '@reduxjs/toolkit'

import listsReducer, {
  listAdded,
  listRemoved,
  listToggled,
  selectActiveList,
  selectLists,
} from './listsSlice'
import { RootState } from '../../app/store'

describe('listsSlice', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({ reducer: { lists: listsReducer } })
  })

  it('initializes with the default list', () => {
    const state = store.getState() as RootState

    expect(selectLists(state)).toHaveLength(1)
    expect(selectActiveList(state)?.id).toBe('default')
  })

  it('adds a new list', () => {
    const newList = { id: 'test', name: 'Test List', isActive: false }
    store.dispatch(listAdded(newList))
    const state = store.getState() as RootState

    expect(state.lists.entities['test']).toEqual(newList)
  })

  it('toggles active list', () => {
    const newList = { id: 'test', name: 'Test List', isActive: false }

    store.dispatch(listAdded(newList))
    store.dispatch(listToggled('test'))

    const state = store.getState() as RootState

    expect(state.lists.entities['test'].isActive).toBe(true)
    expect(state.lists.entities['default'].isActive).toBe(false)
  })

  it('removes a list', () => {
    const newList = { id: 'test', name: 'Test List', isActive: false }

    store.dispatch(listAdded(newList))
    store.dispatch(listToggled('test'))
    store.dispatch(listRemoved('test'))

    const state = store.getState() as RootState

    expect(state.lists.entities['test']).not.toBeDefined()
    expect(state.lists.entities['default'].isActive).toBe(true)
  })

  it('selectLists returns all lists', () => {
    const newList1 = { id: 'test-1', name: 'Test List 1', isActive: false }
    const newList2 = { id: 'test-2', name: 'Test List 2', isActive: false }

    store.dispatch(listAdded(newList1))
    store.dispatch(listAdded(newList2))

    const state = store.getState() as RootState
    const lists = selectLists(state)

    expect(lists).toHaveLength(3)
    expect(lists[1]).toEqual(newList1)
    expect(lists[2]).toEqual(newList2)
  })

  it('selectActiveList returns the currently active list', () => {
    const newList1 = { id: 'test-1', name: 'Test List 1', isActive: false }
    const newList2 = { id: 'test-2', name: 'Test List 2', isActive: false }

    store.dispatch(listAdded(newList1))
    store.dispatch(listAdded(newList2))
    store.dispatch(listToggled('test-1'))

    const state = store.getState() as RootState
    const activeList = selectActiveList(state)

    expect(activeList).toEqual({ id: 'test-1', name: 'Test List 1', isActive: true })
  })

  it('activates the first remaining list when the active list is removed', () => {
    store.dispatch(listAdded({ id: 'test-1', name: 'Test 1', isActive: false }))
    store.dispatch(listAdded({ id: 'test-2', name: 'Test 2', isActive: false }))
    store.dispatch(listRemoved('default'))

    const state = store.getState() as RootState

    expect(selectActiveList(state)?.id).toBe('test-1')
  })
})
