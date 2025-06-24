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
import { Calendar, Clock, Edit, Mail, MapPin, MoreHorizontal, Phone, Save, Trash, User, X } from 'lucide-react'
import React from 'react'

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
    return (
        <div className='container m-auto p-4 gap-5'>
            <div className='flex items-center justify-between mb-5'>

           <h1 className='font-bold text-2xl'>Personal Information</h1>
            {/* update user */}
            <Dialog>
                <DialogTrigger asChild >
                    <Button>
                        <Edit className="mr-2 h-4 w-4" />
                        Update User
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        Edit User
                    </DialogTitle>
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">

                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Enter First Name..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Enter Last Name..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    type='number'
                                    id="phone"
                                    placeholder="Enter Phone Number..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    type='email'
                                    id="email"
                                    placeholder="Enter Email Address..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Password*</Label>
                                <Input
                                    type='password'
                                    id="email"
                                    placeholder="Enter Email Address..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Roles</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role for user" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-5">
                            <Button
                                size="sm"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

             </div>
            <Card>
                <CardContent>
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="flex items-center justify-center flex-col gap-4">
                            <Avatar className="h-30 w-30">
                                <AvatarImage src="/placeholder.svg" alt="JD" />
                                <AvatarFallback className="text-lg">
                                    JD
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold">John Donald</h1>
                                <div className='flex gap-3 items-center justify-center my-2'>
                                    <Badge variant="outline" className="mt-1 bg-green-100 text-green-800">
                                        Active
                                    </Badge>
                                    <Badge variant="outline" className="mt-1 bg-green-100 text-green-800">
                                        Verified
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
                                            <p className="font-medium">user@email.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p className="font-medium">99876543123</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Address</p>
                                            <p className="font-medium">Dushanbe Street 19</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Member Since</p>
                                            <p className="font-medium">2024-10-11</p>
                                        </div>
                                    </div>
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