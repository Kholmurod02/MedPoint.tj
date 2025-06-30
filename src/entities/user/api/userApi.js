import { BASIC_URL } from '@/shared/config/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASIC_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtZWRwb2ludC50akBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1MTI3NjAzMywiaXNzIjoidG9wZmlsZS50aiIsImF1ZCI6Ind3dy50b3BmaWxlLnRqIn0.kQQWMd9vNq5hCIJpickuhz-LKyArago6S--iLWOCBQ8`)
            return headers
        },
    }),
    tagTypes: ['userApi'],
    endpoints: (builder) => ({

        getUserById: builder.query({
            query: (id) => `/User/ById?userId=${id}`,
            providesTags: ['userApi'],
        }),

        addUser: builder.mutation({
            query: (newUser) => ({
                url: "/User",
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ['userApi']
        }),

        updateUser: builder.mutation({
            query: ({id,newUser}) => ({
                url: `/User?id=${id}`,
                method: "PUT",
                body: newUser
            }),
            invalidatesTags: ['userApi']
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/User?userId=${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['userApi']
        }),

        userFilters: builder.query({
            query: (user) => `/User/All?Name=${user.nameFilter || ""}&Phone=${user.phoneFilter || ""}&Email=${user.emailFilter || ""}&Role=${user.roleFilter || ""}&IsDeleted=${user.statusFilter || ""}&IsEmailVerified=${user.verificationFilter || ""}`,
            providesTags: ['userApi'],
        }),


    })
})

export const { useGetUserByIdQuery, useAddUserMutation, useDeleteUserMutation, useUserFiltersQuery,useUpdateUserMutation } = userApi
