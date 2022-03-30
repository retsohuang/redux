import { combineReducers } from '@reduxjs/toolkit'
import entitiesReducer from 'store/entities'

export default combineReducers({
  entities: entitiesReducer
})
