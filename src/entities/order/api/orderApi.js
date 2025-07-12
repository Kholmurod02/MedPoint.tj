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
        })



    })
})



export const { useAddOrderMutation } = orderApi

