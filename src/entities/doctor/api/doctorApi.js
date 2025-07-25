import { access_token, BASIC_URL } from '@/shared/config/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASIC_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${access_token}`)
            return headers
        },
    }),
    tagTypes: ['doctorApi'],
    endpoints: (builder) => ({

        // getAllDoctors: builder.query({
        //     query: (doctor) => `/Doctor/All?Name=${doctor.nameFilter || ""}&Email=${doctor.emailFilter || ""}&Specialization=${doctor.specialization || [""] }&IsActive=${doctor.status || ""}&IsDeleted=${doctor.emailStatus || ""}`,
        //     providesTags: ['doctorApi']
        // }),

         getAllDoctors: builder.query({
            query: (doctor) => `/Doctor/All?Name=${doctor.nameFilter || ""}&Email=${doctor.emailFilter || ""}&IsActive=${doctor.status || ""}&IsDeleted=${doctor.emailStatus || ""}`,
            providesTags: ['doctorApi']
        }),

        getDoctorsSpecializations: builder.query({
            query: () => "/Doctor/specializations",
            providesTags: ['doctorApi']
        }),

        getDoctorById: builder.query({
            query: (id) => `/Doctor/ById?doctorId=${id}`,
            providesTags: ['doctorApi']
        }),

        addDoctor: builder.mutation({
            query: (newDoctor) => ({
                url: "/Doctor",
                method: "POST",
                body: newDoctor
            }),
            invalidatesTags: ['doctorApi']
        }),

        updateDoctor: builder.mutation({
            query: ({ id, editedDoctor }) => ({
                url: `/Doctor?id=${id}`,
                method: "PUT",
                body: editedDoctor
            }),
            invalidatesTags: ['doctorApi']
        }),

        removeDoctor: builder.mutation({
            query: (id) => ({
                url: `/Doctor?doctorId=${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['doctorApi']
        }),

         currentDoctor: builder.query({
            query: () => '/Doctor/CurrentDoctor',
            providesTags: ['doctorApi'],
        }),

        getScheduleByDoctorId: builder.query({
            query:(id)=>`/DoctorSchedule/By-doctor-id?doctorId=${id}`,
            providesTags:["doctorApi"]
        }),

        getDoctorOrders:builder.query({
            query:(id)=>`/Order/Doctor-orders?doctorId=${id}`,
            providesTags:['doctorApi']
        }),

          getDoctorByName: builder.query({
            query: (doctorName) => `/Doctor/ByName?name=${doctorName}`,
            providesTags: ['doctorApi']
        }),

        changeDoctorActivityStatus:builder.mutation({
            query:(doctorStatus)=>({
                url:"/Doctor/ChangeActivityStatus",
                method:"PUT",
                body:doctorStatus
            }),
            invalidatesTags:['doctorApi']
        })

    })
})

export const { useGetAllDoctorsQuery, useGetDoctorsSpecializationsQuery, useGetDoctorByIdQuery,
     useAddDoctorMutation, useUpdateDoctorMutation, useRemoveDoctorMutation,useCurrentDoctorQuery,
     useGetScheduleByDoctorIdQuery,useGetDoctorOrdersQuery,
    useGetDoctorByNameQuery,useChangeDoctorActivityStatusMutation } = doctorApi


