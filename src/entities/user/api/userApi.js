import { BASIC_URL } from '@/shared/config/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASIC_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtZWRwb2ludC50akBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1MTM3MDc1NSwiaXNzIjoidG9wZmlsZS50aiIsImF1ZCI6Ind3dy50b3BmaWxlLnRqIn0.TtTUOH2hKJfF7OfkX4M-n1m2px7hZiOB0QVf6Z-JW5s`)
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
            query: ({ id, newUser }) => ({
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

        currentUser: builder.query({
            query: () => '/User/CurrentUser',
            providesTags: ['userApi'],
        }),

        changeImageUser: builder.mutation({
            query: (formdata) => ({
                url: "/User/upload-or-update-profile-image",
                method: "POST",
               body:formdata
            }),
            invalidatesTags: ["userApi"]
        }),

        deleteUserImage: builder.mutation({
            query: () => ({
                url: '/User/delete-profile-image',
                method: "DELETE"
            }),
            invalidatesTags: ['userApi']
        }),


    })
})

export const {
    useGetUserByIdQuery, useAddUserMutation, useDeleteUserMutation,
    useUserFiltersQuery, useUpdateUserMutation, useCurrentUserQuery,
    useChangeImageUserMutation, useDeleteUserImageMutation
} = userApi
