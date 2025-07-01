import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Calendar, CalendarDays, Clock, Stethoscope, User } from 'lucide-react'
import React from 'react'

const AdminAppointmentCard = () => {
    return (
        <Card className='md:w-[300px]'>
            <CardHeader className='text-white bg-blue-400 p-5 mx-2 rounded-2xl'>
                <CardTitle className='flex gap-3 items-center justify-center '><CalendarDays /> Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h1 className="flex items-center gap-2 text-sm font-medium ">
                            <Stethoscope className="h-4 w-4" />
                            Doctor Id
                        </h1>
                        <Badge variant="secondary" className="font-mono bg-blue-200 text-blue-800 hover:bg-blue-300">
                            DOC-001
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        <h1 className="flex items-center gap-2 text-sm font-medium">
                            <User className="h-4 w-4" />
                            User Id
                        </h1>
                        <Badge variant="secondary" className="font-mono bg-blue-200 text-blue-800 hover:bg-blue-300">
                            USR-123
                        </Badge>
                    </div>
                </div>

                <div className='flex items-center gap-4 py-5'>
                    <Calendar className='h-4 w-4' />
                    <div>
                        <p className="text-sm font-medium">Date</p>
                        <Badge variant="secondary" className="font-mono bg-blue-200 text-blue-800 hover:bg-blue-300">Tuesday, July 1, 2025</Badge>
                    </div>
                </div>

                <div className='flex items-center  gap-4 py-2'>
                    <Clock className='h-4 w-4' />
                    <div>
                        <p className="text-sm font-medium">Time</p>
                        <Badge variant="secondary" className="font-mono bg-blue-200 text-blue-800 hover:bg-blue-300">10:00 AM - 11:00 AM</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminAppointmentCard