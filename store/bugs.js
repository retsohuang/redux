import { createSelector, createSlice } from '@reduxjs/toolkit'

import * as apiActions from '@/store/api'

let lastId = 0

const bugsSlice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload
      bugs.loading = false
      bugs.lastFetch = Date.now()
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false
    },
    createBug: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload,
        resolved: false
      })
    },
    deleteBug: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id)
      if (index !== -1) {
        bugs.list.splice(index, 1)
      }
    },
    resolveBug: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload)
      if (index !== -1) {
        bugs.list[index].resolved = true
      }
    },
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload
      const index = bugs.list.findIndex((bug) => bug.id === bugId)
      if (index !== -1) {
        bugs.list[index].userId = userId
      }
    }
  }
})

const selectBugsList = (state) => state.entities.bugs.list
export const bugsAction = bugsSlice.actions
export const getUnresolvedBugs = createSelector(selectBugsList, (bugs) =>
  bugs.filter((bug) => !bug.resolved)
)
export const getBugsByUser = (userId) =>
  createSelector(selectBugsList, (bugs) => bugs.filter((bug) => bug.userId === userId))

const url = '/api/bugs'
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs

  if (Date.now() - lastFetch < 1000 * 60 * 10) {
    return
  }

  dispatch(
    apiActions.callBegan({
      url,
      onStart: bugsAction.bugsRequested.type,
      onError: bugsAction.bugsRequestFailed.type,
      onSuccess: bugsAction.bugsReceived.type
    })
  )
}

export default bugsSlice.reducer
