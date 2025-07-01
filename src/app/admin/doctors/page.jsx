"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { MoreHorizontal, Search, UserPlus, Edit, Trash2, Mail, Shield, Save, X, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import Link from "next/link"
import { useAddUserMutation, useGetAllUsersQuery } from "@/entities/user/api/userApi"



export default function Doctors() {
  const [addUser] = useAddUserMutation()
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    role: ""
  })





  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Doctor Management</h1>
        </div>
        {/* add user */}
        <Dialog>
          <DialogTrigger asChild >
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Add new User
            </DialogTitle>
            <form>
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
                {/* role */}
                {/* <div className="space-y-2">
                  <Label htmlFor="role">Roles</Label>
                  <Select
                    value={doctor.role}
                    onValueChange={(e) => setdoctor({ ...doctor, role: e.value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role for doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                {/* image */}
                {/* <div className="space-y-2">
                  <Label htmlFor="photo">Image</Label>
                  <Input
                    type='file'
                    id="photo"
                    required
                  />
                </div> */}
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
                />
              </div>
            </div>

              {/* Search by email */}
            <div className="space-y-2">
              <Label htmlFor="email-filter">Email Address</Label>
              <Input
                id="email-filter"
                placeholder="Search by email..."
              />
            </div>

             {/* Search by specialization */}
            <div className="space-y-2">
              <Label htmlFor="phone-filter">Specialization</Label>
              <Input
                id="phone-filter"
                placeholder="Search by specialization..."
              />
            </div>
  
             {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="deleted-filter">Status</Label>
              <Select className="w-100">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Online</SelectItem>
                  <SelectItem value="deleted">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* isDeleted */}
            <div className="space-y-2">
              <Label htmlFor="verified-filter">Email Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="verified">Active Doctor</SelectItem>
                  <SelectItem value="unverified">Deleted Doctor</SelectItem>
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
                <TableHead>Reviews/Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[]?.map((doctor) => (
                <TableRow key={doctor.id} className={doctor.is_deleted ? "opacity-60" : ""}>
                  <TableCell className="font-medium">
                    {doctor.first_name} {doctor.last_name}
                  </TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>
                    <Badge
                      className={"bg-gray-100 text-gray-800"}>
                      {doctor.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={doctor.is_deleted ? "bg-red-200 text-red-900" : "bg-green-100 text-green-800"}>
                      {doctor.is_deleted ? "Deleted" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={doctor.is_email_verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {doctor.is_email_verified ? "Verified" : "Unverified"}
                      </Badge>
                      {doctor.is_email_verified && <Mail className="h-4 w-4 text-green-600" />}
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
                        {/* <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem> */}
                        {/* <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Change Role
                        </DropdownMenuItem> */}
                        {/* {!user.is_email_verified && (
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Verification
                          </DropdownMenuItem>
                        )} */}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          {user.is_deleted ? "Restore User" : "Delete User"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your filters.</p>
            </div>
          )} */}
        </CardContent>
      </Card>
    </div>
  )
}
