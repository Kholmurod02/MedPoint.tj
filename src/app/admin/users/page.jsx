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



export default function Users() {
  const { data, error, isLoading } = useGetAllUsersQuery()
  console.log(data);

  const [addUser] = useAddUserMutation()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    role: ""
  })

  const handleAddUser = (e) => {
    e.preventDefault()
    addUser(user)
  }



  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        {/* add user */}
        <Dialog>
          <DialogTrigger asChild >
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Add new User
            </DialogTitle>
            <form onSubmit={handleAddUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
                {/* firstName */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter First Name..."
                    required
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  />
                </div>
                {/* lastName */}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter Last Name..."
                    required
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                </div>
                {/* role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Roles</Label>
                  <Select
                    value={user.role}
                    onValueChange={(value) => setUser({ ...user, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role for user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
          {/* <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

            <div className="space-y-2">
              <Label htmlFor="phone-filter">Phone Number</Label>
              <Input
                id="phone-filter"
                placeholder="Search by phone..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-filter">Email Address</Label>
              <Input
                id="email-filter"
                placeholder="Search by email..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-filter">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deleted-filter">Status</Label>
              <Select className="w-100">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="deleted">Deleted Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verified-filter">Email Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
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
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email Verified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((user) => (
                <TableRow key={user.id} className={user.is_deleted ? "opacity-60" : ""}>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      className={"bg-gray-100 text-gray-800"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.isDeleted ? "bg-red-200 text-red-900" : "bg-green-100 text-green-800"}>
                      {user.isDeleted ? "Deleted" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={user.isEmailVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {user.isEmailVerified ? "Verified" : "Unverified"}
                      </Badge>
                      {user.isEmailVerified && <Mail className="h-4 w-4 text-green-600" />}
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
                        <Link href={`/admin/users/${user.id}`}>
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
