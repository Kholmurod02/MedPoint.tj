import { access_token, BASIC_URL } from '@/shared/config/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const statisticsApi = createApi({
    reducerPath: 'statisticsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASIC_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${access_token}`)
            return headers
        },
    }),
    tagTypes: ['statisticsApi'],
    endpoints: (builder) => ({

        getCountStats: builder.query({
            query: () => "/AdminDashboard/Count-stats",
            providesTags: ['statisticsApi']
        })

    })
})

export const { useGetCountStatsQuery } = statisticsApi



