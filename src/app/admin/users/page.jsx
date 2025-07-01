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
import { useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation, useUserFiltersQuery } from "@/entities/user/api/userApi"



export default function Users() {


  // add user
  const [addUser] = useAddUserMutation()
  const [open, setOpen] = useState(false)
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
    setOpen(false)
  }

  //  delete user
  const [deleteUser] = useDeleteUserMutation()

  //filter users
  const [nameFilter, setNameFilter] = useState("")
  const [emailFilter, setEmailFilter] = useState("")
  const [phoneFilter, setPhoneFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [verificationFilter, setVerificationFilter] = useState("")

  const params = {
    nameFilter,
    emailFilter,
    phoneFilter,
    roleFilter: roleFilter == "all" ? "" : roleFilter,
    statusFilter: statusFilter == "all" ? "" : statusFilter,
    verificationFilter: verificationFilter == "all" ? "" : verificationFilter,
  }
  const { data: filteredData } = useUserFiltersQuery(params)

  // update user 
  const [update, setUpdate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  })
  const [idx, setIdx] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [updateUser] = useUpdateUserMutation()
  const handleUpdateUser = (e) => {
    e.preventDefault()
    updateUser({id: idx, newUser: update})
    setEditOpen(false)
  }




  return (
    <div className="container mx-auto p-6 space-y-6">

      {/* edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogTitle>
            Edit User
          </DialogTitle>
          <form onSubmit={handleUpdateUser}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">

              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter First Name..."
                  required
                  value={update.firstName}
                  onChange={(e) => setUpdate({ ...update, firstName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter Last Name..."
                  required
                  value={update.lastName}
                  onChange={(e) => setUpdate({ ...update, lastName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type='number'
                  id="phone"
                  placeholder="Enter Phone Number..."
                  required
                  value={update.phone}
                  onChange={(e) => setUpdate({ ...update, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type='email'
                  id="email"
                  placeholder="Enter Email Address..."
                  required
                  value={update.email}
                  onChange={(e) => setUpdate({ ...update, email: e.target.value })}
                />
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        {/* add user */}
        <Dialog open={open} onOpenChange={setOpen}>
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
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone-filter">Phone Number</Label>
              <Input
                id="phone-filter"
                placeholder="Search by phone..."
                value={phoneFilter}
                onChange={(e) => setPhoneFilter(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-filter">Email Address</Label>
              <Input
                id="email-filter"
                placeholder="Search by email..."
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-filter">Role</Label>
              <Select
                value={roleFilter}
                onValueChange={(value) => setRoleFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deleted-filter">Status</Label>
              <Select className="w-100"
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="false">Active</SelectItem>
                  <SelectItem value="true">Deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verified-filter">Email Status</Label>
              <Select
                value={verificationFilter}
                onValueChange={(value) => setVerificationFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Verified</SelectItem>
                  <SelectItem value="false">Unverified</SelectItem>
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
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email Verified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData?.data?.map((user) => (
                <TableRow key={user.id} className={user.isDeleted ? "opacity-60" : ""}>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
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
                  {/* actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* Info */}
                        <Link href={`/admin/users/${user.id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        {/* edit */}
                        <DropdownMenuItem onClick={() => {
                          setUpdate({
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                            email: user?.email,
                            phone: user?.phone,
                          });
                          setEditOpen(true);
                          setIdx(user.id)
                        }}>
                          <Edit className="mr-4 h-4 w-4" />
                          Update User
                        </DropdownMenuItem>
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
                        {/* delete */}
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteUser(user.id)}>
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
