import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

type List = {
  id: string
  name: string
  isActive: boolean
}

const listsAdapter = createEntityAdapter<List>()

const initialState = listsAdapter.getInitialState()

const filledInitialState = listsAdapter.addOne(initialState, {
  id: 'default',
  name: 'General',
  isActive: true,
})

const listsSlice = createSlice({
  name: 'lists',
  initialState: filledInitialState,
  reducers: {
    listAdded: listsAdapter.addOne,
    listRemoved: (state, action: PayloadAction<string>) => {
      const listId = action.payload
      const lists = Object.values(state.entities)

      listsAdapter.removeOne(state, listId)

      if (lists.length > 1) {
        const firstRemainingList = Object.values(state.entities)[0]
        if (firstRemainingList) {
          state.entities[firstRemainingList.id]!.isActive = true
        }
      }
    },
    listToggled: (state, action: PayloadAction<string>) => {
      const currentActiveList = Object.values(state.entities).find((list) => list.isActive)
      if (currentActiveList) {
        currentActiveList.isActive = false
      }

      const nextActiveListId = action.payload
      const nextActiveList = state.entities[nextActiveListId]
      nextActiveList.isActive = true
    },
  },
})

export default listsSlice.reducer

export const { listAdded, listRemoved, listToggled } = listsSlice.actions

export const {
  selectAll: selectLists,
  selectById: selectListById,
  selectEntities,
} = listsAdapter.getSelectors<RootState>((state) => state.lists)

export const selectActiveList = (state: RootState) => {
  return selectLists(state).find((list) => list.isActive)
}
