import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '@/entities/user/api/userApi'
import { doctorApi } from '@/entities/doctor/api/doctorApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { reviewApi } from '@/entities/reviews/api/reviewApi'
import { orderApi } from '@/entities/order/api/orderApi'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      doctorApi.middleware,
      reviewApi.middleware,
      orderApi.middleware
    )
})

setupListeners(store.dispatch)
