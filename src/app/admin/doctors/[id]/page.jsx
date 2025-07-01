import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Calendar, Clock, DollarSign, Edit, Mail, MapPin, MoreHorizontal, Phone, Star, Users } from 'lucide-react'
import React from 'react'

const DoctorById = () => {

  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Michael Brown",
      date: "2024-01-20",
      time: "09:00 AM",
      type: "Follow-up",
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "Lisa Wilson",
      date: "2024-01-20",
      time: "10:30 AM",
      type: "Consultation",
      status: "Confirmed",
    },
    {
      id: 3,
      patientName: "David Taylor",
      date: "2024-01-20",
      time: "02:00 PM",
      type: "Check-up",
      status: "Pending",
    },
    {
      id: 4,
      patientName: "Jennifer Lee",
      date: "2024-01-21",
      time: "11:00 AM",
      type: "Emergency",
      status: "Urgent",
    },
  ]

  const recentReviews = [
    {
      id: 1,
      patientName: "John Smith",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Dr. Johnson is exceptional. She took the time to explain my condition thoroughly and made me feel comfortable throughout the entire process.",
    },
    {
      id: 2,
      patientName: "Maria Garcia",
      rating: 5,
      date: "2024-01-12",
      comment: "Outstanding care and professionalism. Highly recommend Dr. Johnson to anyone needing cardiac care.",
    },
    {
      id: 3,
      patientName: "Robert Chen",
      rating: 4,
      date: "2024-01-10",
      comment: "Very knowledgeable doctor. The appointment was efficient and she answered all my questions.",
    },
    {
      id: 4,
      patientName: "Emily Davis",
      rating: 5,
      date: "2024-01-08",
      comment: "Dr. Johnson saved my life. Her quick diagnosis and treatment plan were perfect. Forever grateful.",
    },
  ]

  return (
    <div className='container m-auto p-auto'>
      {/* header */}
      <div className="flex items-center justify-between space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Profile</h1>
          <p className="text-gray-600">Admin Dashboard - Doctor Management</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* profile card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={`/placeholder.svg?height=128&width=128`} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-3xl">
                  JS
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-2xl font-bold ">4.2</span>
                <span>(12 reviews)</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center  space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-blue-950">John Smith</h1>
                  {/* {doctor.verified && <CheckCircle className="h-6 w-6 text-green-400" title="Verified Doctor" />} */}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className='bg-blue-500'>Dentist</Badge>
                  <Badge className='bg-green-700'>Online</Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-800">
                    5 years
                  </Badge>
                </div>
                <p className="text-slate-700 mb-4">Experienced internal medicine physician with expertise in preventive care and chronic disease management. Dr. Johnson has been practicing for over 15 years and has helped thousands of patients achieve better health outcomes through personalized care and evidence-based medicine.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Mail className="h-4 w-4" />
                    <span>doctor@email.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Phone className="h-4 w-4" />
                    <span>+992919991111</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <MapPin className="h-4 w-4" />
                    <span>Central Hospital</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Users className="h-4 w-4" />
                    <span> 120 patients</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <DollarSign className="h-4 w-4" />
                    <span>$100 consultation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Calendar className="h-4 w-4" />
                    <span>Joined 2020-12-22</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* main content */}

      <Tabs defaultValue="appointments" className="space-y-4 w-full my-3">
        <TabsList className={'w-full'}>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* appointments */}
        <TabsContent value="appointments" className="space-y-4 w-full">
          <div className="space-y-6">
            <Card className='w-full'>
              <CardContent className='w-full'>
                <div className="space-y-4 w-full">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{appointment.patientName}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                      {/* <Badge>{appointment.status}</Badge> */}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </TabsContent>

           {/* reviews */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardContent>
              <div className="space-y-6">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{review.patientName}</p>
                        <div className="flex items-center gap-2">
                          {/* <div className="flex">{renderStars(review.rating)}</div> */}
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default DoctorById