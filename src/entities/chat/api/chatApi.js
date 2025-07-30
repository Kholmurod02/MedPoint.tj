import Cookies from "js-cookie"
import { BASIC_URL } from '@/shared/config/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASIC_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['chatApi'],
  endpoints: (builder) => ({
    getDoctorChats: builder.query({
      query: ()=> "/Chat/doctor/rooms",
      providesTags: ['chatApi'],
    }),
  }),
})

export const { useGetDoctorChatsQuery } = chatApi
