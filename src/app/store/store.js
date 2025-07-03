import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '@/entities/user/api/userApi'
import { doctorApi } from '@/entities/doctor/api/doctorApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      doctorApi.middleware
    )
})

setupListeners(store.dispatch)
