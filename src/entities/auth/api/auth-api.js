import { BASIC_URL } from "@/shared/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASIC_URL
    }),
    tagTypes: ['authApi'],
    endpoints: (builder) => ({

        registration: builder.mutation({
            query: (newUser) => ({
                url: "/Auth/register",
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ['authApi']
        }),

        verification: builder.mutation({
            query: (verificationCode) => ({
                url: "/Auth/verify-email",
                method: "POST",
                body: verificationCode
            }),
            invalidatesTags: ['authApi']
        }),


          resendVerificationCode: builder.mutation({
            query: () => ({
                url: "/Auth/resend-verification-code",
                method: "POST",
            }),
            invalidatesTags: ['authApi']
        })


    })


})

export const { useRegistrationMutation,useVerificationMutation,useResendVerificationCodeMutation } = authApi