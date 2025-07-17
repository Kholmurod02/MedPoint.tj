"use client"

import { useGetDoctorByNameQuery } from "@/entities/doctor/api/doctorApi"
import { useAddOrderByAdminMutation, useGetOrdersQuery } from "@/entities/order/api/orderApi"
import { useGetUserByNameQuery } from "@/entities/user/api/userApi"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Separator } from "@/shared/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Calendar, Clock, MoreHorizontal, Search, User, UserCheck } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"



const getStatusBadge = (status) => {
  const statusConfig = {
    Finished: { label: "Finished", className: "bg-green-100 text-green-800 hover:bg-green-200" },
    NotAccepted: { label: "Not Accepted", className: "bg-red-100 text-red-800 hover:bg-red-200" },
    Pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
  }

  const config = statusConfig[status] || {
    label: status ?? "Unknown",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  }

  return <Badge className={config.className}>{config.label}</Badge>
}


const formatDateTime = (dateString, timeString) => {
  let date
  if (timeString) {
    date = new Date(`${dateString}T${timeString}`)
  } else {
    date = new Date(dateString)
  }

  return {
    date: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  }
}

export default function AppointmentTable() {

  const [doctorSearch, setDoctorSearch] = useState('')
  const [userSearch, setUserSearch] = useState('')

  const params = {
    doctorName: doctorSearch,
    userName: userSearch
  }

  const { data: orders } = useGetOrdersQuery(params)
  const appointments = orders?.data

  // add order by admin
  const [open, setOpen] = useState(false)

  // filtered doctors
  const [docByName, setDocByName] = useState('')
  const [docIdx, setDocIdx] = useState(null)
  const { data: doctors } = useGetDoctorByNameQuery(docByName)
  const filteredDoctors = doctors?.data
  console.log(docIdx);


  // filtered user
  const [userByName, setUserByName] = useState('')
  const [userIdx, setUserIdx] = useState(null)
  const { data: users } = useGetUserByNameQuery(userByName)
  const filteredUsers = users?.data
  console.log(userIdx);


  const [aptDate, setAptDate] = useState('')
  const [aptTime, setAptTime] = useState('')
  console.log('aptDate', aptDate);
  console.log('aptTime', aptTime);

  const [addOrderByAdmin] = useAddOrderByAdminMutation()

  const handleAddAppointmentByAdmin = async (e) => {
    e.preventDefault()
    const orderByAdmin = {
      "doctorId": docIdx,
      "userId": userIdx,
      "date": aptDate,
      "startTime": aptTime
    }

    try {
      await addOrderByAdmin(orderByAdmin).unwrap()
      setOpen(false)
      toast.success("Appointment successfully booked!")
    } catch (error) {
      toast.error(error.data.message)
    }
  }


  return (
    <div className="w-full space-y-6 p-6  min-h-screen">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Appointments</p>
                <p className="text-2xl font-bold">{appointments?.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Completed</p>
                <p className="text-2xl font-bold">
                  {appointments?.filter((apt) => apt.orderStatus === "Finished")?.length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">
                  {appointments?.filter((apt) => apt.orderStatus === "Pending")?.length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Cancelled</p>
                <p className="text-2xl font-bold">
                  {appointments?.filter((apt) => apt.orderStatus === "NotAccepted")?.length}
                </p>
              </div>
              <User className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>



      <Card className="border-blue-200 shadow-lg p-4">
        <CardHeader className=" rounded-t-lg  ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6" />
              <CardTitle className="text-2xl font-bold">Appointment Management</CardTitle>
            </div>
            <div className="flex items-center space-x-2">

              {/* book appointment by admin */}

              <div className="relative">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>Add Appointment</Button>
                  </DialogTrigger>
                    <DialogContent>
                  <form onSubmit={handleAddAppointmentByAdmin}>
                      <DialogTitle className={"mb-5"}>Book Appointment for User</DialogTitle>
                      <Separator />
                      <div className="grid gap-4 mt-5">
                        {/* Doctor Search */}
                        <div className="grid gap-3">
                          <Label htmlFor="doctor-search">Doctor Name</Label>
                          <Input
                            id="doctor-search"
                            placeholder="Search Doctor..."
                            value={docByName}
                            onChange={(e) => setDocByName(e.target.value)}
                          />
                          {filteredDoctors?.length > 0 && (
                            <ul className="border p-2 rounded bg-white shadow">
                              {filteredDoctors.map((doc) => (
                                <li
                                  key={doc.id}
                                  className="cursor-pointer hover:bg-gray-100 px-2 py-1"
                                  onClick={() => {
                                    setDocIdx(doc.id)
                                    setDocByName(`${doc.firstName} ${doc.lastName}`)
                                  }}
                                >
                                  {doc.firstName} {doc.lastName}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* User Search */}
                        <div className="grid gap-3">
                          <Label htmlFor="user-search">User Name</Label>
                          <Input
                            id="user-search"
                            placeholder="Search User..."
                            value={userByName}
                            onChange={(e) => setUserByName(e.target.value)}
                          />
                          {filteredUsers?.length > 0 && (
                            <ul className="border p-2 rounded bg-white shadow">
                              {filteredUsers.map((user) => (
                                <li
                                  key={user.id}
                                  className="cursor-pointer hover:bg-gray-100 px-2 py-1"
                                  onClick={() => {
                                    setUserIdx(user.id)
                                    setUserByName(`${user.firstName} ${user.lastName}`)
                                  }}
                                >
                                  {user.firstName} {user.lastName}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Date */}
                        <div className="grid gap-3">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            defaultValue={new Date().toISOString().split("T")[0]}
                            value={aptDate}
                            onChange={(e) => setAptDate(e.target.value)}
                          />
                        </div>

                        {/* Time */}
                        <div className="grid gap-3">
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input
                            id="startTime"
                            name="startTime"
                            type="time"
                            step="1"
                            value={aptTime}
                            onChange={(e) => setAptTime(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                  </form>
                    </DialogContent>
                </Dialog>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {/* User Search */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Search by User Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-purple-500">
                  <Search className="h-4 w-4" />
                </span>
                <Input
                  placeholder="Enter user name"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Doctor Search */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Search by Doctor Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-blue-500">
                  <Search className="h-4 w-4" />
                </span>
                <Input
                  placeholder="Enter doctor name"
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>

          </div>

        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50 hover:bg-blue-100">
                  <TableHead className="font-semibold text-blue-900">Doctor</TableHead>
                  <TableHead className="font-semibold text-blue-900">Patient</TableHead>
                  <TableHead className="font-semibold text-blue-900">Date & Time</TableHead>
                  <TableHead className="font-semibold text-blue-900">Duration</TableHead>
                  <TableHead className="font-semibold text-blue-900">Status</TableHead>
                  <TableHead className="font-semibold text-blue-900">Created</TableHead>
                  {/* <TableHead className="font-semibold text-blue-900">Notes</TableHead> */}
                  <TableHead className="font-semibold text-blue-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments?.map((appointment, index) => {
                  const startDateTime = formatDateTime(appointment.date, appointment.startTime)
                  const endDateTime = formatDateTime(appointment.date, appointment.endTime)
                  const createdDateTime = formatDateTime(appointment.createdAt)

                  return (
                    <TableRow
                      key={appointment.id}
                      className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      {/* <TableCell className="font-medium text-blue-700">{appointment.id}</TableCell> */}
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="font-medium text-gray-900">{appointment.doctorName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">

                          <div className="font-medium text-gray-900">{appointment.userName}</div>

                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <div className="font-medium text-gray-900">{startDateTime.date}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {startDateTime.time} - {endDateTime.time}
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment?.orderStatus)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-gray-900">{createdDateTime.date}</div>
                          <div className="text-gray-500">{createdDateTime.time}</div>
                        </div>
                      </TableCell>
                      {/* <TableCell>
                        {appointment.cancellationReason ? (
                          <div className="max-w-32">
                            <div className="text-sm text-red-600 truncate" title={appointment.cancellationReason}>
                              {appointment.cancellationReason}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell> */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-100">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-blue-200">
                            <DropdownMenuLabel className="text-blue-900">Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="hover:bg-blue-50">View details</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-blue-50">Edit appointment</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:bg-blue-50">Send reminder</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                              Cancel appointment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>


    </div>
  )
}
