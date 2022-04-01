import { createSelector, createSlice } from '@reduxjs/toolkit'

import * as apiActions from '@/store/api'

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
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload)
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id)
      if (index !== -1) {
        bugs.list[index].resolved = true
      }
    },
    bugAssignedToUser: (bugs, action) => {
      const { id, userId } = action.payload
      const index = bugs.list.findIndex((bug) => bug.id === id)
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

export const addBug = (bug) =>
  apiActions.callBegan({
    url,
    method: 'POST',
    data: bug,
    onSuccess: bugsAction.bugAdded.type
  })

export const resolveBug = (id) =>
  apiActions.callBegan({
    url: `${url}/${id}`,
    method: 'PATCH',
    data: { resolved: true },
    onSuccess: bugsAction.bugResolved.type
  })

export const assignBugToUser = ({ bugId, userId }) =>
  apiActions.callBegan({
    url: `${url}/${bugId}`,
    method: 'PATCH',
    data: { userId },
    onSuccess: bugsAction.bugAssignedToUser.type
  })

export default bugsSlice.reducer
