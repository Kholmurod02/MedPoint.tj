"use client"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Separator } from "@/shared/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Mail, Phone, User, FileText, Edit, Camera, Settings, LogOut, Trash2, Save } from "lucide-react"
import { Switch } from "@/shared/ui/switch"
import { useState } from "react"

const doctorData = {
  id: 1,
  firstName: "Doctor",
  lastName: "Test",
  phone: "018581313",
  email: "kurbanovs397@gmail.com",
  description: "Really good description",
  specialization: ["MiddleDoctor"],
  profileImageUrl: null,
  isActive: true,
}

const specializationOptions = ["SeniorDoctor", "MiddleDoctor", "JuniorDoctor", "Specialist", "Consultant"]

export default function Component() {
  const [editData, setEditData] = useState({
    firstName: doctorData.firstName,
    lastName: doctorData.lastName,
    phone: doctorData.phone,
    email: doctorData.email,
    description: doctorData.description,
    specialization: doctorData.specialization,
  })
  const [isEditOpen, setIsEditOpen] = useState(false)

  const fullName = `${doctorData.firstName} ${doctorData.lastName}`
  const initials = `${doctorData.firstName.charAt(0)}${doctorData.lastName.charAt(0)}`

  const handleSave = () => {
    console.log("Saving data:", editData)
    setIsEditOpen(false)
  }

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const handleDeleteAccount = () => {
    console.log("Deleting account...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="container mx-auto p-4 max-w-2xl rounded">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold text-blue-800">My Profile</h1>
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          </div>
          <p className="text-blue-600 mt-2 text-sm font-medium">Manage your personal information</p>
        </div>

        {/* Main Profile Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
          {/* Profile Header with Avatar on Left, Buttons on Right */}
          <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

            <div className="flex items-center justify-between relative z-10 py-4">
              {/* Left Side - Avatar and Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {/* Avatar with Glow Effect */}
                  <div className="absolute -inset-2 bg-white/20 rounded-full blur-md"></div>
                  <Avatar className="h-20 w-20 ring-3 ring-white/50 shadow-xl relative">
                    <AvatarImage src={doctorData.profileImageUrl || undefined} />
                    <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Camera Button */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full h-7 w-7 p-0 bg-white text-blue-600 hover:bg-blue-50 shadow-lg border-2 border-white"
                      >
                        <Camera className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-36 rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-sm"
                      align="end"
                    >
                      <DropdownMenuItem
                        onClick={() => document.getElementById("photo-upload")?.click()}
                        className="text-blue-700 hover:bg-blue-50 cursor-pointer rounded-lg m-1 text-sm"
                      >
                        <Camera className="h-3 w-3 mr-2" />
                        Upload Image
                      </DropdownMenuItem>
                      {doctorData.profileImageUrl && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => console.log("Deleting image...")}
                            className="text-red-600 hover:bg-red-50 cursor-pointer rounded-lg m-1 text-sm"
                          >
                            <Trash2 className="h-3 w-3 mr-2" />
                            Delete Image
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        console.log("Uploading file:", file)
                      }
                    }}
                  />
                </div>

                {/* Name and Specialization */}
                <div>
                  <CardTitle className="text-xl font-bold text-white mb-1">{fullName}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {doctorData.specialization.map((spec, index) => (
                      <Badge
                        key={index}
                        className="bg-white/20 text-white border-white/30 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="flex gap-3">
                {/* Edit Profile Modal */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-4 py-2">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto rounded-2xl border-0 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-blue-800 text-xl font-bold">Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-blue-700 font-medium text-sm">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            value={editData.firstName}
                            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                            className="border-blue-200 focus:border-blue-500 rounded-lg h-9"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-blue-700 font-medium text-sm">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            value={editData.lastName}
                            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                            className="border-blue-200 focus:border-blue-500 rounded-lg h-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-blue-700 font-medium text-sm">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="border-blue-200 focus:border-blue-500 rounded-lg h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-blue-700 font-medium text-sm">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="border-blue-200 focus:border-blue-500 rounded-lg h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialization" className="text-blue-700 font-medium text-sm">
                          Specialization
                        </Label>
                        <Select
                          value={editData.specialization[0]}
                          onValueChange={(value) => setEditData({ ...editData, specialization: [value] })}
                        >
                          <SelectTrigger className="border-blue-200 focus:border-blue-500 rounded-lg h-9">
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            {specializationOptions.map((spec) => (
                              <SelectItem key={spec} value={spec}>
                                {spec}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-blue-700 font-medium text-sm">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          value={editData.description}
                          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                          className="border-blue-200 focus:border-blue-500 min-h-[80px] rounded-lg"
                          placeholder="Enter your professional description..."
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button
                          onClick={handleSave}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-9"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditOpen(false)}
                          className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 rounded-xl h-9"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Settings Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-4 py-2"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-40 rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-sm"
                    align="end"
                  >
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-blue-700 hover:bg-blue-50 cursor-pointer rounded-lg m-1"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleDeleteAccount}
                      className="text-red-600 hover:bg-red-50 cursor-pointer rounded-lg m-1"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            {/* Compact Status Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-l-4 border-blue-500 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <div
                      className={`w-3 h-3 rounded-full ${doctorData.isActive ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800">Account Status</h3>
                    <p className="text-blue-600 text-sm">Toggle your availability</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      doctorData.isActive
                        ? "text-green-700 bg-green-100 border border-green-200"
                        : "text-gray-600 bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {doctorData.isActive ? "Active" : "Inactive"}
                  </span>
                  <Switch
                    id="active-status"
                    checked={doctorData.isActive}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Compact Personal Information */}
            <div>
              <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                  <User className="h-4 w-4 text-white" />
                </div>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Compact Email Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Email</p>
                      <p className="font-bold text-blue-800 text-sm truncate">{doctorData.email}</p>
                    </div>
                  </div>
                </div>

                {/* Compact Phone Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-indigo-600 font-bold uppercase tracking-wide">Phone</p>
                      <p className="font-bold text-indigo-800 text-sm">{doctorData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-blue-200 to-transparent h-px" />

            {/* Compact Professional Information */}
            <div>
              <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                Professional Information
              </h3>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200 shadow-md">
                <div className="relative">
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full opacity-20"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full opacity-30"></div>
                  <p className="text-blue-700 leading-relaxed font-medium italic relative z-10">
                    "{doctorData.description}"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
