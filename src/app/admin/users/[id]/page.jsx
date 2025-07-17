"use client"
import { useGetReviewsByUserIdQuery } from '@/entities/reviews/api/reviewApi'
import { useGetUserByIdQuery, useGetUserOrdersQuery } from '@/entities/user/api/userApi'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { ArrowLeft, Calendar, Clock, Mail, MoreHorizontal, Phone, Save, Shield, Star, Trash, User, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const UserById = () => {




    const { id } = useParams()
    const { data } = useGetUserByIdQuery(id)
    const user = data?.data

    const router = useRouter()

    const { data: reviews } = useGetReviewsByUserIdQuery(id)


    const { data: appointment } = useGetUserOrdersQuery(id)
    const appointments = appointment?.data
    console.log(appointments);


    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))
    }

    return (
        <div className='container m-auto p-4 gap-5'>
            <div className='flex items-center gap-7 mb-5'>
                <p onClick={() => router.back()}><ArrowLeft /></p>
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
                                {appointments?.map((appointment) => (
                                    <div key={appointment.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold">{appointment.userName}</h3>
                                                    {/* <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge> */}
                                                </div>
                                                <p className="text-sm text-muted-foreground">Dr: {appointment.doctorName}</p>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {appointment.date}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {appointment.startTime} -{appointment.endTime}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {/* <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <MoreHorizontal />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem><Trash /> Delete Appointment</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu> */}
                                                <Badge
                                                    className={
                                                        appointment.orderStatus === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : appointment.orderStatus === "Finished"
                                                                ? "bg-green-100 text-green-700"
                                                                : appointment.orderStatus === "Canceled"
                                                                    ? "bg-red-100 text-red-700"
                                                                    : "bg-gray-100 text-gray-700"
                                                    }
                                                >
                                                    {appointment.orderStatus}
                                                </Badge>                                            </div>
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
                        <CardContent>
                            <div className="space-y-6">
                                {reviews?.data?.map((review) => (
                                    <div key={review.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-semibold">{review.userName}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </p>
                                                {/* <p className="text-sm text-muted-foreground">Dr: {review.doctorName}</p> */}
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 mb-1">{renderStars(review.rating)}   {review.rating}/5</div>
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