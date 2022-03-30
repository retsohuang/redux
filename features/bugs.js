import { createSelector, createSlice } from '@reduxjs/toolkit'

let lastId = 0

const bugsSlice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    createBug: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload,
        resolved: false
      })
    },
    deleteBug: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id)
      if (index !== -1) {
        bugs.splice(index, 1)
      }
    },
    resolveBug: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload)
      if (index !== -1) {
        bugs[index].resolved = true
      }
    },
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload
      const index = bugs.findIndex((bug) => bug.id === bugId)
      if (index !== -1) {
        bugs[index].userId = userId
      }
    }
  }
})

const selectBugs = (state) => state.entities.bugs

export const bugsAction = bugsSlice.actions
export const getUnresolvedBugs = createSelector(selectBugs, (bugs) =>
  bugs.filter((bug) => !bug.resolved)
)
export const getBugsByUser = (userId) =>
  createSelector(selectBugs, (bugs) => bugs.filter((bug) => bug.userId === userId))
export default bugsSlice.reducer
