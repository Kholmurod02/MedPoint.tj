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
        }),

        getCountReviewsAndOrdersStatsByMonth: builder.query({
            query: () => "/AdminDashboard/Monthly-count-stats-Orders-Reviews",
            providesTags: ['statisticsApi']
        }),

        getCountUsersAndDoctorStatsByMonth: builder.query({
            query: () => "/AdminDashboard/Monthly-count-stats-Users-Doctors",
            providesTags: ['statisticsApi']
        }),

        getPopularDoctors: builder.query({
            query: () => "/AdminDashboard/Popular-doctors",
            providesTags: ['statisticsApi']
        }),

        getPercentageStatistics: builder.query({
            query: () => "/AdminDashboard/Percentage-change-info",
            providesTags: ['statisticsApi']
        }),

        getDoctorStatisticByMonth: builder.query({
            query:()=> "/Doctor/Doctor-statistics-by-month",
            providesTags: ['statisticsApi']
        }),

        getAllDoctorStatistic: builder.query({
            query:()=> "/Doctor/Doctor-statistics",
            providesTags: ['statisticsApi']
        }),

    })
})

export const { useGetCountStatsQuery, useGetCountUsersAndDoctorStatsByMonthQuery, useGetCountReviewsAndOrdersStatsByMonthQuery,
    useGetPopularDoctorsQuery, useGetPercentageStatisticsQuery, useGetDoctorStatisticByMonthQuery,useGetAllDoctorStatisticQuery } = statisticsApi



