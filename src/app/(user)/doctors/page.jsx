"use client"
import { useGetAllDoctorsQuery } from '@/entities/doctor/api/doctorApi';
import DoctorCard from '@/features/doctor-card';
import Swiperr from '@/features/swiper'
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const DoctorsPage = () => {
  const [name,setName]=useState('')

  const healthTips = [
    {
      id: 1,
      description: "Avoid smoking and limit alcohol — they increase cancer and heart disease risk.",
      title: "CDC"
    },
    {
      id: 2,
      description: "Manage stress — chronic stress affects the heart, digestion, and immunity.",
      title: "Harvard Medical School"
    },
    {
      id: 3,
      description: "See a doctor regularly — early diagnosis saves lives.",
      title: "Ministry of Health"
    },
    {
      id: 4,
      description: "Take medications only as prescribed — self-medication can be dangerous.",
      title: "World Health Organization"
    }
  ];

  const params = {
    "nameFilter":name
  }

  const { data } = useGetAllDoctorsQuery(params)
  const doctors = data?.data
  
  return (
    <div>

      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">


          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              type="search" placeholder="Search doctors..." className="pl-9 pr-4 py-2 rounded-md border" />
            </div>
            {/* <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="specialization-asc">Specialization (A-Z)</SelectItem>
                <SelectItem value="specialization-desc">Specialization (Z-A)</SelectItem>
              </SelectContent>
            </Select> */}

            <div className="flex gap-2">


            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors?.map((doctor) => (
           <Link key={doctor?.id}  href={`/doctors/${doctor.id}`}>
            <DoctorCard doctor={doctor} />
            </Link>
          ))}
        </div>
      </div>

      {/* HealthTips */}
      <section className='text-center my-20'>
        <p className="text-blue-600 font-medium text-sm tracking-wider uppercase mb-2"> Medical Advices</p>
        <h2 className="text-4xl font-bold text-slate-800 mb-12">Simple advice for better living</h2>
        <div className='h-[330px] w-full p-2 my-10'>
          <Swiperr key={healthTips.id} data={healthTips} />
        </div>
      </section>


    </div>
  )
}

export default DoctorsPage