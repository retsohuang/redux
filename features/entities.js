import { combineReducers } from '@reduxjs/toolkit'

import bugsReducer from '@/features/bugs'
import projectsReducer from '@/features/projects'
import usersReducer from '@/features/users'

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer
})
