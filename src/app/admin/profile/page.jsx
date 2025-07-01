"use client"
import { useChangeImageUserMutation, useCurrentUserQuery, useDeleteUserImageMutation, useUpdateUserMutation } from "@/entities/user/api/userApi"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Separator } from "@/shared/ui/separator"
import { Mail, Phone, Shield, CheckCircle, Edit, Settings, User, Upload, Trash2, MoreVertical, LogOut, Save, X } from "lucide-react"
import { useState } from "react"

export default function AdminProfile() {
  const { data } = useCurrentUserQuery()
  const adminData = data?.data
  const [deleteUserImage] = useDeleteUserImageMutation()
  const [changeImageUser] = useChangeImageUserMutation()
 
 


  const [updateUser] = useUpdateUserMutation()
  const [idx, setIdx] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const handleUpdateProfile = (e) => {
    e.preventDefault()
    updateUser({ id: idx, newUser: update })
    setEditOpen(false)
  }
  const [update, setUpdate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  })

  const handleEdit = () => {
    setUpdate({
      firstName: adminData?.firstName || "",
      lastName: adminData?.lastName || "",
      email: adminData?.email || "",
      phone: adminData?.phone || ""
    })
    setIdx(adminData?.id)
    setEditOpen(true)
  }





  return (
    <div className="min-h-screen   md:p-2">

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Admin Profile</h1>
          <p className="text-slate-600">Manage your account information and settings</p>
        </div>

        {/* Main Profile Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-2">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={adminData?.profileImageUrl} />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-semibold">
                  {adminData?.firstName[0]}{adminData?.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-2xl font-bold">
                  {adminData?.firstName} {adminData?.lastName}
                </h2>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Shield className="w-3 h-3 mr-1" />
                    {adminData?.role}
                  </Badge>
                  {adminData?.isEmailVerified && (
                    <Badge variant="secondary" className="bg-green-500/20 text-white border-green-300/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              <div className="md:ml-auto flex gap-2">

                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild >
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      onClick={handleEdit}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>
                      Edit Profile
                    </DialogTitle>
                    <form onSubmit={handleUpdateProfile}>
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
                            value={update?.lastName}
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
                            value={update?.phone}
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
                            value={update?.email}
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 ">
                    <DropdownMenuItem className="relative cursor-pointer p-0" >
                      <Upload className="w-4 h-4 mx-2 my-2" />
                      <span className="ml-1 mt-2">Change Profile Image</span>

                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </DropdownMenuItem>


                    <DropdownMenuItem className="cursor-pointer text-red-600"
                      onClick={() => deleteUserImage()}>
                      <Trash2 className="w-4 h-4 mr-2 mb-2" />
                      Delete Profile Image
                    </DropdownMenuItem>
                    <Separator />

                    <DropdownMenuItem>
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-3 pb-2 border-b border-blue-100">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">First Name</p>
                        <p className="text-lg font-semibold text-slate-900 mt-1">{adminData?.firstName}</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-200/50 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">Last Name</p>
                        <p className="text-lg font-semibold text-slate-900 mt-1">{adminData?.lastName}</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-200/50 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 p-4 rounded-xl border border-slate-200/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">User ID</p>
                        <p className="text-lg font-semibold text-slate-900 mt-1 font-mono">#{adminData?.id}</p>
                      </div>
                      <div className="w-10 h-10 bg-slate-200/50 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-slate-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">Role</p>
                        <div className="mt-2">
                          <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200">
                            <Shield className="w-3 h-3 mr-1" />
                            {adminData?.role}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-green-200/50 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-3 pb-2 border-b border-blue-100">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-xl border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-slate-600">Email Address</p>
                          {adminData?.isEmailVerified && (
                            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-lg font-semibold text-slate-900 break-all">{adminData?.email}</p>
                        <p className="text-sm text-slate-500 mt-1">Primary contact method</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-600 mb-2">Phone Number</p>
                        <p className="text-lg font-semibold text-slate-900">{adminData?.phone}</p>
                        <p className="text-sm text-slate-500 mt-1">Mobile contact</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
