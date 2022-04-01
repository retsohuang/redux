import { configureStore } from '@reduxjs/toolkit'

import api from '@/store/middleware/api'
import logger from '@/store/middleware/logger'
import toast from '@/store/middleware/toast'
import reducer from '@/store/reducers'

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger({ destination: 'console' }), toast, api]),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
