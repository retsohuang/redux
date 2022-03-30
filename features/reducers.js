import { combineReducers } from '@reduxjs/toolkit'

import entitiesReducer from '@/features/entities'

export default combineReducers({
  entities: entitiesReducer
})
