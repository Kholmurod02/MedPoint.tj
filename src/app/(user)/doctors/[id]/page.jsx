"use client"
import { Phone, Mail, Clock, Award, GraduationCap, Briefcase, CalendarIcon, ClockIcon, ArrowRight, Facebook, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import Image from "next/image"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import Calendar20 from "@/features/calendar20"
import { useParams } from "next/navigation"
import { useGetDoctorByIdQuery, useGetScheduleByDoctorIdQuery } from "@/entities/doctor/api/doctorApi"

export default function DoctorById() {
  const { id } = useParams()
  const { data } = useGetDoctorByIdQuery(id)
  const doctorData = data?.data || []

  const { data: schedule}=useGetScheduleByDoctorIdQuery(id)
  const scheduleData = schedule?.data
  console.log(scheduleData);
  
  

  return (
    <>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Two-column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN: Image + Contact */}
            <div className="flex flex-col space-y-6">
              {/* Doctor Photo */}
              <Card className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative w-full h-[400px] bg-gray-50">
                    <Image
                      src="/womenDoc.jpg"
                      alt={`Dr. ${doctorData?.firstName} ${doctorData?.lastName}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-2xl"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-5">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-lg">Contact Info</h3>
                  </div>
                  <div className="space-y-4 text-gray-700 text-base">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-500" />
                      <span>{doctorData?.phone || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <span>{doctorData?.email || "N/A"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN: Name + Description + Schedule */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
              {/* Name + Description */}
              <Card className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-tight">
                        Dr. {doctorData?.firstName} {doctorData?.lastName}
                      </h1>
                      <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                        {doctorData?.description || "No description available."}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
                        <Facebook className="w-5 h-5 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
                        <Linkedin className="w-5 h-5 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-xl">Appointment Schedules</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {scheduleData?.map(({ id, dayOfWeek, workStart, workEnd, isDayOff }) => {
                      const displayTime = `${workStart.slice(0, 5)} - ${workEnd.slice(0, 5)}`

                      return (
                        <div
                          key={id}
                          className={`flex justify-between items-center px-4 py-3 rounded-lg transition-all duration-200
                      ${isDayOff
                              ? "bg-gray-50 text-gray-400"
                              : "bg-blue-50 text-blue-700 hover:bg-blue-100"}
                    `}
                        >
                          <span className="font-medium">{dayOfWeek}</span>
                          <div className="flex items-center space-x-2">
                            {!isDayOff && <Clock className="w-4 h-4 text-blue-500 opacity-70" />}
                            <span className="font-medium">
                              {isDayOff ? "Closed" : displayTime}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>



      {/* Book Appointment */}
      <section className="relative h-[650px] flex items-center my-20 justify-start p-4 bg-blue-900 bg-[url('/calendar_book.png')] bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 my-10 w-full p-3">
          <Calendar20 />
        </div>
      </section>





    </>
  )
}
