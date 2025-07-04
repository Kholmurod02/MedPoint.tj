"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Mail, Phone, User, Stethoscope, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Star, Calendar, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { useParams, useRouter } from "next/navigation"
import { useGetDoctorByIdQuery } from "@/entities/doctor/api/doctorApi"
import { useGetReviewsByDoctorIdQuery } from "@/entities/reviews/api/reviewApi"



// Mock appointments data
const appointmentsData = [
  {
    id: 1,
    patientName: "John Smith",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    type: "Consultation",
  },
  {
    id: 2,
    patientName: "Sarah Johnson",
    date: "2024-01-15",
    time: "2:30 PM",
    status: "pending",
    type: "Follow-up",
  },
  {
    id: 3,
    patientName: "Mike Wilson",
    date: "2024-01-16",
    time: "9:15 AM",
    status: "completed",
    type: "Check-up",
  },
]
 

export default function DoctorProfileById() {
  const router = useRouter()
  const { id } = useParams()

  const { data } = useGetDoctorByIdQuery(id)
  const doctorData = data?.data

  const {data:reviews}=useGetReviewsByDoctorIdQuery(id)
  const doctorReviews = reviews?.data;
  
  
  




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <ArrowLeft onClick={() => router.back()} className="h-5 w-5 cursor-pointer" />
          <p className="font-bold">Back to Table Doctors</p>
        </div>
        {/* Header Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={doctorData?.profileImageUrl || ""} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-semibold">
                  KK
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-3xl font-bold text-slate-800">
                      Dr. {doctorData?.firstName} {doctorData?.lastName}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {doctorData?.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          <Stethoscope className="w-3 h-3 mr-1" />
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <User className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium text-slate-800">{doctorData?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-slate-600">Phone</p>
                      <p className="font-medium text-slate-800">{doctorData?.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Details */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Stethoscope className="w-5 h-5" />
                    Professional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-50/50">
                    <p className="text-sm text-slate-600 mb-1">Doctor ID</p>
                    <p className="font-medium text-slate-800">#{doctorData?.id}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50/50">
                    <p className="text-sm text-slate-600 mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${doctorData?.isActive ? "bg-green-500" : "bg-slate-400"}`} />
                      <span className={`text-sm font-medium ${doctorData?.isActive ? "text-green-700" : "text-slate-600"}`}>
                        {doctorData?.isActive ? "Currently Active" : "Currently Inactive"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {doctorData?.description || "No description available."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Calendar className="w-5 h-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointmentsData.map((appointment) => (
                  <div key={appointment.id} className="p-4 rounded-lg bg-slate-50/50 border border-slate-200/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{appointment.patientName}</h4>
                        <p className="text-sm text-slate-600">{appointment.type}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </div>
                        <Badge
                          variant={
                            appointment.status === "confirmed"
                              ? "default"
                              : appointment.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-slate-100 text-slate-600"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <MessageSquare className="w-5 h-5" />
                  Patient Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {doctorReviews?.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg bg-slate-50/50 border border-slate-200/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-800">{review.userName}</h4>
                        <p className="text-sm text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
