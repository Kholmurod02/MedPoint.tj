import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '@/entities/user/api/userApi'
import { doctorApi } from '@/entities/doctor/api/doctorApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { reviewApi } from '@/entities/reviews/api/reviewApi'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      doctorApi.middleware,
      reviewApi.middleware
    )
})

setupListeners(store.dispatch)
