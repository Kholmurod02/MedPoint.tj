"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Badge } from "@/shared/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Edit, Save, X, User, Phone, Mail, FileText, Stethoscope, Heart, Activity } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"



export default function MasterProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    id: "DOC001",
    firstName: "Doctor",
    lastName: "Doctor",
    phone: "+992 97 727 5599",
    email: "medpoint.tj@gmail.com",
    description:
      "Experienced cardiologist with over 15 years of practice. Specialized in interventional cardiology and heart disease prevention. Committed to providing compassionate care and staying current with the latest medical advances.",
    specialization: "Cardiology",
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Family Medicine",
    "Internal Medicine",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
  ]





  return (
    <div className="min-h-screen  from-blue-50 via-indigo-50 to-cyan-50 p-2">

      <div className="max-w-4xl mx-auto space-y-3 relative z-10">
        {/* Header with animated pulse */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Doctor Profile
          </h1>
          <div className="flex items-center justify-center space-x-2 text-blue-500">
            <Heart className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-medium">Healthcare Professional</span>
            <Activity className="h-5 w-5 animate-bounce" />
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-up w-[100%]">
          <CardHeader className="p-4 mx-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg">
            <div className="flex items-center  gap-2 justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300">
                    <AvatarImage src="/logo.png" />
                    <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                      {/* {getInitials(profile.firstName, profile.lastName)} */}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="animate-fade-in-delay">
                  <CardTitle className="text-3xl font-bold text-white">
                    {profile.firstName} {profile.lastName}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-2 text-blue-100">
                    <Badge className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none hover:from-cyan-500 hover:to-blue-500 transition-all duration-300">
                      {profile.specialization}
                    </Badge>
                  </CardDescription>
                </div>
              </div>


              <Dialog>
                <DialogTrigger className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 w-[30px] flex items-center justify-center rounded-2xl" >
                  <Edit className="h-4 w-4 m-2" />
                </DialogTrigger>

                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Profile Editing</DialogTitle>
                    <DialogDescription>
                      Make changes and save
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-blue-700 font-semibold">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Enter first name"
                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-blue-700 font-semibold">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Enter last name"
                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-blue-700 font-semibold">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            placeholder="Enter phone number"
                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-blue-700 font-semibold">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            placeholder="Enter email address"
                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className=" grid grid-cols-1 mt-5 space-y-2">
                        <div className="space-y-2 ">
                          <Label htmlFor="specialization" className="text-blue-700 font-semibold">
                            Specialization
                          </Label>
                          <Select>
                            <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300">
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                            <SelectContent>
                              {specializations.map((spec) => (
                                <SelectItem key={spec} value={spec} className="hover:bg-blue-50">
                                  {spec}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2 w-[]">
                          <Label htmlFor="description" className="text-blue-700 font-semibold">
                            Professional Description
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Enter professional description"
                            className="min-h-[120px] border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 mt-5">
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
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

                  </div>
                </DialogContent>
              </Dialog>


            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="group flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105 ">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full group-hover:rotate-12 transition-transform duration-300">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-blue-600">Full Name</Label>
                    <p className="text-lg font-medium text-gray-800">
                      {profile.firstName} {profile.lastName}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300 hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full group-hover:rotate-12 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-blue-600">Phone</Label>
                    <p className="text-lg font-medium text-gray-800">{profile.phone}</p>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full group-hover:rotate-12 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-blue-600">Email</Label>
                    <p className="text-medium font-medium text-gray-800">{profile.email}</p>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full group-hover:rotate-12 transition-transform duration-300">
                    <Stethoscope className="h-6 w-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-blue-600">Specialization</Label>
                    <p className="text-lg font-medium text-gray-800">{profile.specialization}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group p-6 rounded-lg bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 hover:from-blue-100 hover:via-indigo-100 hover:to-cyan-100 transition-all duration-500 hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full group-hover:rotate-12 transition-transform duration-300">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <Label className="text-sm font-semibold text-blue-600 mb-2 block">
                        Professional Description
                      </Label>
                      <p className="text-base leading-relaxed text-gray-700">{profile.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* // Edit Mode with smooth transitions */}
            {/* <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-blue-700 font-semibold">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={editedProfile.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter first name"
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-blue-700 font-semibold">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={editedProfile.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter last name"
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-blue-700 font-semibold">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter phone number"
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-700 font-semibold">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-blue-700 font-semibold">
                    Specialization
                  </Label>
                  <Select
                    value={editedProfile.specialization}
                    onValueChange={(value) => handleInputChange("specialization", value)}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec} className="hover:bg-blue-50">
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-blue-700 font-semibold">
                    Professional Description
                  </Label>
                  <Textarea
                    id="description"
                    value={editedProfile.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter professional description"
                    className="min-h-[120px] border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
              </div> */}

          </CardContent>
        </Card>
      </div>

      {/* <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style> */}
    </div>
  )
}
