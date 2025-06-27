import { BASIC_URL } from '@/shared/config/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://147.45.146.15:5063/api",
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtZWRwb2ludC50akBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1MTAyNDIxNywiaXNzIjoidG9wZmlsZS50aiIsImF1ZCI6Ind3dy50b3BmaWxlLnRqIn0.dQ6uQ4lGf8Sv3gbN-JbJuBtizg93IorFyrI0PdUralA`)
            return headers
        },
    }),
    tagTypes: ['userApi'],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/User/All',
            providesTags: ['userApi'],
        }),

        addUser: builder.mutation({
            query: (newUser) => ({
                url: "/User",
                method: "POST",
                body: newUser                
            })
        })
    }),
})

export const { useGetAllUsersQuery, useAddUserMutation } = userApi
