import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Separator } from "@/shared/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Mail, Phone, Shield, CheckCircle, Edit, Settings, User, Upload, Trash2, MoreVertical } from "lucide-react"

export default function AdminProfile() {
  const adminData = {
    id: 2,
    firstName: "Med",
    lastName: "Point",
    phone: "123456789",
    email: "medpoint.tj@gmail.com",
    role: "Admin",
    profileImageUrl: null,
    isDeleted: false,
    isEmailVerified: true,
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
                <AvatarImage src={adminData.profileImageUrl || undefined} />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-semibold">
                  AAA
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-2xl font-bold">
                  {adminData.firstName} {adminData.lastName}
                </h2>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Shield className="w-3 h-3 mr-1" />
                    {adminData.role}
                  </Badge>
                  {adminData.isEmailVerified && (
                    <Badge variant="secondary" className="bg-green-500/20 text-white border-green-300/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              <div className="md:ml-auto flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Settings className="w-4 h-4" />
                </Button>
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
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Profile Image
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile Image
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Profile Image
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
                        <p className="text-lg font-semibold text-slate-900 mt-1">{adminData.firstName}</p>
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
                        <p className="text-lg font-semibold text-slate-900 mt-1">{adminData.lastName}</p>
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
                        <p className="text-lg font-semibold text-slate-900 mt-1 font-mono">#{adminData.id}</p>
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
                            {adminData.role}
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
                          {adminData.isEmailVerified && (
                            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-lg font-semibold text-slate-900 break-all">{adminData.email}</p>
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
                        <p className="text-lg font-semibold text-slate-900">{adminData.phone}</p>
                        <p className="text-sm text-slate-500 mt-1">Mobile contact</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            {/* <Separator className="my-6" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Account Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="font-medium text-slate-900">Email Verified</p>
                    <p className="text-sm text-slate-600">Account is verified</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium text-slate-900">Admin Access</p>
                    <p className="text-sm text-slate-600">Full system privileges</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4 text-center">
                    <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium text-slate-900">Active Account</p>
                    <p className="text-sm text-slate-600">Account is active</p>
                  </CardContent>
                </Card>
              </div>
            </div> */}

            {/* Action Buttons */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
