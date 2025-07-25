import { access_token, BASIC_URL } from "@/shared/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASIC_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${access_token}`)
            return headers
        },
    }),
    tagTypes: ['orderApi'],
    endpoints: (builder) => ({

        addOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/Order",
                method: "POST",
                body: newOrder
            }),
            invalidatesTags: ['orderApi']
        }),

        getUserOrdersByUserId: builder.query({
            query: (id) => `/Order/User-orders?userId=${id}`,
            providesTags: ['orderApi']
        }),

        confirmOrderByDoctor: builder.mutation({
            query: (orderId) => ({
                url: `/Order/Confirm-order-by-doctor?orderId=${orderId}`,
                method: "PUT",
            }),
            invalidatesTags:['orderApi']
        }),

        cancelOrderByDoctor: builder.mutation({
           query: (cancelledOrder) => ({
                url: `/Order/Cancel-order-by-doctor`,
                method: "PUT",
                body:cancelledOrder
            }),
            invalidatesTags:['orderApi']
        }),

        getOrders: builder.query({
            query: (params) => `/Order/All?DoctorName=${params?.doctorName || ""}&UserName=${params?.userName || ""}`,
            providesTags: ['orderApi']
        }),

        addOrderByAdmin: builder.mutation({
            query: (newOrderByAdmin) => ({
                url: '/Order/By-admin',
                method: "POST",
                body: newOrderByAdmin
            }),
            invalidatesTags:['orderApi']
        })



    })
})



export const { useAddOrderMutation, useGetUserOrdersByUserIdQuery, useGetOrdersQuery,
     useAddOrderByAdminMutation,useConfirmOrderByDoctorMutation,useCancelOrderByDoctorMutation } = orderApi

