import { access_token, BASIC_URL } from '@/shared/config/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASIC_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${access_token}`)
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
