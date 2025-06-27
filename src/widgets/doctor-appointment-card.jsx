import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Calendar, Check, Clock2, User2, X } from 'lucide-react'
import React from 'react'

const DoctorAppointmentCard = () => {
    return (
        <Card className='md:w-[350px]'>
            <CardHeader className='text-center'>
                <CardTitle>Patient Appointment</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex items-center gap-4 border-b pb-3 '>
                    <User2 className='h-4 w-4' />
                    <div>
                        <p className="text-sm font-medium">Patient Id : user01</p>
                        <p className="text-sm text-muted-foreground">User Name</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 py-5'>
                    <Calendar className='h-4 w-4' />
                    <div>
                        <p className="text-sm font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">Tuesday, July 1, 2025</p>
                    </div>
                </div>

                <div className='flex items-center border-b gap-4 py-2'>
                    <Clock2 className='h-4 w-4' />
                    <div>
                        <p className="text-sm font-medium">Time</p>
                        <p className="text-sm text-muted-foreground">14:00 - 15:00</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className='flex gap-3 items-end justify-end'>
               <Button  className='flex items-center text-red-600 bg-white border border-red-500 hover:bg-teal-600'>
                <X/>
                Cancel</Button>
               <Button variant='secondary' className='flex items-center text-white hover:bg-teal-600'>
                <Check/>
                Confirm</Button>
            </CardFooter>
        </Card>
    )
}

export default DoctorAppointmentCard