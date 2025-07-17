import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '@/entities/user/api/userApi'
import { doctorApi } from '@/entities/doctor/api/doctorApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { reviewApi } from '@/entities/reviews/api/reviewApi'
import { orderApi } from '@/entities/order/api/orderApi'
import { statisticsApi } from '@/entities/dashboards/api/statistics'
import { authApi } from '@/entities/auth/api/auth-api'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      doctorApi.middleware,
      reviewApi.middleware,
      orderApi.middleware,
      statisticsApi.middleware,
      authApi.middleware
    )
})

setupListeners(store.dispatch)
