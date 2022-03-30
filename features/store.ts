import { configureStore } from '@reduxjs/toolkit'

import reducer from '@/features/reducers'

const store = configureStore({
  reducer
})

export default store
