"use client"
import { useGetUserByIdQuery } from '@/entities/user/api/userApi'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Calendar, Clock, Edit, Mail, MapPin, MoreHorizontal, Phone, Save, Shield, Trash, User, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const UserById = () => {
    const reviews = [
        {
            id: 1,
            service: "Hair Styling",
            rating: 5,
            comment: "Absolutely amazing service! The stylist was professional and the results exceeded my expectations.",
            date: "December 20, 2024",
            provider: "Emma Wilson",
        },
        {
            id: 2,
            service: "Massage Therapy",
            rating: 4,
            comment: "Very relaxing session. The therapist was skilled and the atmosphere was perfect.",
            date: "December 10, 2024",
            provider: "Michael Chen",
        },
        {
            id: 3,
            service: "Facial Treatment",
            rating: 5,
            comment: "My skin feels incredible! Will definitely book again.",
            date: "November 28, 2024",
            provider: "Lisa Rodriguez",
        },
    ]

    const appointments = [
        {
            id: 1,
            service: "User Name",
            provider: "Emma Wilson",
            date: "December 28, 2024",
            time: "2:00 PM",
            status: "confirmed",
            duration: "90 min",
            price: "$85",
        },
        {
            id: 2,
            service: "Deep Tissue Massage",
            provider: "Michael Chen",
            date: "January 5, 2025",
            time: "11:00 AM",
            status: "pending",
            duration: "60 min",
            price: "$120",
        },
        {
            id: 3,
            service: "Facial Treatment",
            provider: "Lisa Rodriguez",
            date: "December 15, 2024",
            time: "3:30 PM",
            status: "completed",
            duration: "75 min",
            price: "$95",
        },
        {
            id: 4,
            service: "Manicure",
            provider: "Anna Kim",
            date: "December 10, 2024",
            time: "1:00 PM",
            status: "cancelled",
            duration: "45 min",
            price: "$45",
        },
    ]

    const { id } = useParams()
    const { data } = useGetUserByIdQuery(id)
    const user = data?.data

    const [firstName,setFirstName]=useState(user?.firstName)
    const [lastName,setLastName]=useState(user?.lastName)
    const [phone,setPhone]=useState(user?.phone)
    const [email,setEmail]=useState(user?.email)


    return (
        <div className='container m-auto p-4 gap-5'>
            <div className='flex items-center justify-between mb-5'>

                <h1 className='font-bold text-2xl'>Personal Information</h1>
               
            </div>
            <Card>
                <CardContent>
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="flex items-center justify-center flex-col gap-4">
                            <Avatar className="h-30 w-30">
                                <AvatarImage src={user?.profileImageUrl} alt="solo" />
                                <AvatarFallback className="text-lg">
                                    {user?.lastName[0]}{user?.firstName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold">{user?.firstName}  {user?.lastName}</h1>
                                <div className='flex gap-3 items-center justify-center my-2'>
                                    <Badge
                                        variant="outline"
                                        className={`mt-1 ${user?.isDeleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}  >
                                        {user?.isDeleted ? "Deleted" : "Active"}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className={`mt-1 ${user?.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}  >
                                        {user?.isEmailVerified ? "Verified" : "UnVerified"}
                                    </Badge>
                                </div>
                            </div>
                        </div>


                    </div>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Role</p>
                                            <p className="font-medium">{user?.role}</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p className="font-medium">{user?.phone}</p>
                                        </div>
                                    </div>

                                    {/* <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Member Since</p>
                                            <p className="font-medium">2024-10-11</p>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            <Tabs defaultValue="appointments" className="my-5">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Appointments Tab */}
                <TabsContent value="appointments">
                    <Card>
                        <CardContent>
                            <div className="space-y-4">
                                {appointments.map((appointment) => (
                                    <div key={appointment.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold">{appointment.service}</h3>
                                                    {/* <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge> */}
                                                </div>
                                                <p className="text-sm text-muted-foreground">Provider: {appointment.provider}</p>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {appointment.date}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {appointment.time}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <MoreHorizontal />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem><Trash /> Delete Appointment</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                    <Card>
                        {/* <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>Reviews and ratings left by this user</CardDescription>
            </CardHeader> */}
                        <CardContent>
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-semibold">{review.service}</h3>
                                                <p className="text-sm text-muted-foreground">Provider: {review.provider}</p>
                                            </div>
                                            <div className="text-right">
                                                {/* <div className="flex items-center gap-1 mb-1">{renderStars(review.rating)}</div> */}
                                                <p className="text-sm text-muted-foreground">{review.date}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm leading-relaxed">{review.comment}</p>
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

export default UserById