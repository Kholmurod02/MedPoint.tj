"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { MoreHorizontal, Search, UserPlus, Edit, Trash2, Mail, Save, X, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import Link from "next/link"
import { useAddDoctorMutation, useGetAllDoctorsQuery, useGetDoctorsSpecializationsQuery, useRemoveDoctorMutation, useUpdateDoctorMutation } from "@/entities/doctor/api/doctorApi"
import { Textarea } from "@/shared/ui/textarea"
import toast from "react-hot-toast"



export default function Doctors() {
  const [addDialog, setAddDialog] = useState(false)
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    specialization: [],
    description: ""
  })

  const [addDoctor] = useAddDoctorMutation()
  const handleAddDoctor = async(e) => {
    e.preventDefault()
    try {
     await addDoctor(doctor).unwrap()
      setAddDialog(false)
      toast.success("Doctor Successfully added")
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  const [nameFilter, setNameFilter] = useState("")
  const [emailFilter, setEmailFilter] = useState("")
  const [specialization, setSpecialization] = useState([])
  const [status, setStatus] = useState('')
  const [emailStatus, setEmailStatus] = useState('')

  const params = {
    nameFilter,
    emailFilter,
    // specialization: specialization === "all" ? [] : [specialization],
    status: status == "all" ? "" : status,
    emailStatus: emailStatus == "all" ? "" : emailStatus
  }

  const { data: doctors, isLoading, error } = useGetAllDoctorsQuery(params)
  const { data: specs } = useGetDoctorsSpecializationsQuery()
 
  const [removeDoctor] = useRemoveDoctorMutation()


  return (
    <div className="container mx-auto p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Doctor Management</h1>
        </div>
        {/* add doctor */}
        <Dialog open={addDialog} onOpenChange={setAddDialog}>
          <DialogTrigger asChild >
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Add New Doctor
            </DialogTitle>
            <form onSubmit={handleAddDoctor}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
                {/* firstName */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter First Name..."
                    required
                    value={doctor.firstName}
                    onChange={(e) => setDoctor({ ...doctor, firstName: e.target.value })}
                  />
                </div>
                {/* lastName */}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter Last Name..."
                    required
                    value={doctor.lastName}
                    onChange={(e) => setDoctor({ ...doctor, lastName: e.target.value })}
                  />
                </div>
                {/* phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type='number'
                    id="phone"
                    placeholder="Enter Phone Number..."
                    required
                    value={doctor.phone}
                    onChange={(e) => setDoctor({ ...doctor, phone: e.target.value })}
                  />
                </div>
                {/* email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type='email'
                    id="email"
                    placeholder="Enter Email Address..."
                    required
                    value={doctor.email}
                    onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
                  />
                </div>
                {/* password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password*</Label>
                  <Input
                    type='password'
                    id="password"
                    placeholder="Enter password ..."
                    required
                    value={doctor.password}
                    onChange={(e) => setDoctor({ ...doctor, password: e.target.value })}
                  />
                </div>
                {/* specialization */}
                <div className="space-y-2">
                  <Label htmlFor="role">Specializations</Label>
                  <Select
                    value={doctor.specialization[0] || ""}
                    onValueChange={(value) => setDoctor({ ...doctor, specialization: [value] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specs?.data.map((el) => <SelectItem key={el.id} value={el.name}>{el.name}</SelectItem>)}
                    </SelectContent>
                    {/* <SelectContent value="JuniorDoctor">JuniorDoctor</SelectContent>
                    <SelectContent value="MiddleDoctor">MiddleDoctor</SelectContent>
                    <SelectContent value='SeniorDoctor'>SeniorDoctor</SelectContent> */}
                  </Select>
                </div>
                {/* description */}
                <div className="space-y-2">
                  <Label htmlFor="desc">Description*</Label>
                  <Textarea
                    id="desc"
                    placeholder="Enter your description ..."
                    required
                    value={doctor.description}
                    onChange={(e) => setDoctor({ ...doctor, description: e.target.value })}
                  />

                </div>

              </div>

              {/* action */}
              <div className="flex justify-end space-x-2 mt-5">
                <Button
                  size="sm"
                  type='submit'
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

      {/* Filters */}
      <Card>
        <CardHeader>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Search by Name */}
            <div className="space-y-2">
              <Label htmlFor="name-filter">Full Name</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name-filter"
                  placeholder="Search by name..."
                  className="pl-10"
                  value={nameFilter}
                  onChange={(e) => { setNameFilter(e.target.value) }}
                />
              </div>
            </div>

            {/* Search by email */}
            <div className="space-y-2">
              <Label htmlFor="email-filter">Email Address</Label>
              <Input
                id="email-filter"
                placeholder="Search by email..."
                value={emailFilter}
                onChange={(e) => { setEmailFilter(e.target.value) }}
              />
            </div>

            {/* Search by specialization */}
            {/* <div className="space-y-2">
              <Label htmlFor="deleted-filter">Specializations</Label>
              <Select className="w-100" value={specialization} onValueChange={setSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specs?.data?.map((spec) => {
                    return (
                      <SelectItem key={spec.id} value={spec.name}>{spec.name}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div> */}

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="deleted-filter">Status</Label>
              <Select className="w-100" onValueChange={(value) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="true">Online</SelectItem>
                  <SelectItem value="false">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* isDeleted */}
            <div className="space-y-2">
              <Label htmlFor="verified-filter">Email Status</Label>
              <Select onValueChange={(value) => setEmailStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="false">Active Doctor</SelectItem>
                  <SelectItem value="true">Deleted Doctor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end items-center mt-4">
            <Button variant="outline" >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>FullName</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors?.data?.map((doctor) => (
                <TableRow key={doctor.id} className={doctor.isDeleted ? "opacity-60" : ""}>
                  <TableCell className="font-medium">
                    {doctor.firstName} {doctor.lastName}
                  </TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  {/* special */}
                  <TableCell>

                    <Badge className={"bg-gray-100 text-gray-800"} >
                      {doctor.specialization[0]}
                    </Badge>


                  </TableCell>
                  {/* status */}
                  <TableCell>
                    <Badge className={doctor.isActive ? "bg-green-200 text-green-900" : "bg-red-100 text-red-800"}>
                      {doctor.isActive ? "Online" : "Offline"}
                    </Badge>
                  </TableCell>
                  {/* emailStatus */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={doctor.isDeleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {doctor.isDeleted ? "Deleted" : "Verified"}
                      </Badge>
                      {doctor?.isDeleted && <Mail className="h-4 w-4 text-green-600" />}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/admin/doctors/${doctor.id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        {/* <DropdownMenuItem onClick={() => editDoctorFunc(doctor)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit  Doctor
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="text-destructive" onClick={() =>{ removeDoctor(doctor.id),
                          toast.success("Doctor successfully deleted")
                        }}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          {doctor.isDeleted ? "Restore User" : "Delete User"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
