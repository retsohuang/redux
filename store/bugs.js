import { createSelector, createSlice } from '@reduxjs/toolkit'

let lastId = 0

const bugsSlice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
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
export default bugsSlice.reducer
