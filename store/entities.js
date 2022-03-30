import { combineReducers } from '@reduxjs/toolkit'
import bugsReducer from 'store/bugs'
import projectsReducer from 'store/projects'
import usersReducer from 'store/users'

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer
})
