import { configureStore } from '@reduxjs/toolkit'
import reducer from 'store/reducers'

import logger from '@/store/middleware/logger'

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger({ destination: 'console' }))
})

export default store
