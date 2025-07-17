import { access_token, BASIC_URL } from "@/shared/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASIC_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${access_token}`)
            return headers
        },
    }),
    tagTypes: ['reviewApi'],
    endpoints: (builder) => ({

        getAllReviews: builder.query({
            query: (params) => `/Review/All?DoctorName=${params?.doctorName || ""}&UserName=${params?.userName || ""}&RatingFrom=${params?.ratingFrom || ""}&RatingTo=${params?.ratingTo || ""}&CreatedFrom=${params?.createdFrom || ""}&CreatedTo=${params?.createdTo || ""}&IsHidden=${params?.isHidden || ""}`,
            providesTags: ['reviewApi']
        }),

        getReviewsForClients: builder.query({
            query: () => "/Review/All",
            providesTags: ['reviewApi']
        }),


        removeReview: builder.mutation({
            query: (id) => ({
                url: `/Review?reviewId=${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['reviewApi']
        }),

        statusReview: builder.mutation({
            query: (status) => ({
                url: `/Review/Hide-Or-Show-Review`,
                method: "PUT",
                body: {
                    ReviewId: status.reviewId,
                    IsHidden: status.isHidden
                }
            }),
            invalidatesTags: ['reviewApi']
        }),

        getReviewsByUserId: builder.query({
            query: (id) => `/Review/ByUserId?userId=${id}`,
            providesTags: ['reviewApi']
        }),

        getReviewsByDoctorId: builder.query({
            query: (id) => `/Review/ByDoctorId?doctorId=${id}`,
            providesTags: ['reviewApi']
        }),

        postReview: builder.mutation({
            query: (newReview) => ({
                url: '/Review',
                method: "POST",
                body: newReview
            }),
            invalidatesTags: ['reviewApi']
        })





    })
})

export const { useGetAllReviewsQuery, useRemoveReviewMutation, useStatusReviewMutation, useGetReviewsByUserIdQuery, useGetReviewsByDoctorIdQuery, useGetReviewsForClientsQuery, usePostReviewMutation } = reviewApi