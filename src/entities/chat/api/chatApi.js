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

    getUserChats: builder.query({
      query: () => "/Chat/Chats-list",
      providesTags: ['chatApi'],
    }),



  }),
})

export const { useGetUserChatsQuery } = chatApi
