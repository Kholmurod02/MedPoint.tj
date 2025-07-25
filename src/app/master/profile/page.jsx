"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Separator } from "@/shared/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import {
  Mail,
  Phone,
  User,
  FileText,
  Edit,
  Camera,
  Trash2,
  Save,
} from "lucide-react"
import { Switch } from "@/shared/ui/switch"
import {
  useChangeDoctorActivityStatusMutation,
  useCurrentDoctorQuery,
  useGetDoctorsSpecializationsQuery,
  useUpdateDoctorMutation,
} from "@/entities/doctor/api/doctorApi"
import toast from "react-hot-toast"

export default function DoctorProfile() {
  const { data } = useCurrentDoctorQuery()
  const doctorData = data?.data

  // Локальный стейт для редактируемых данных
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    description: "",
    specialization: [],
  })

  const [isEditOpen, setIsEditOpen] = useState(false)

  const [updateDoctor] = useUpdateDoctorMutation()

  // При изменении doctorData обновляем локальный editData
  useEffect(() => {
    if (doctorData) {
      setEditData({
        firstName: doctorData.firstName || "",
        lastName: doctorData.lastName || "",
        email: doctorData.email || "",
        phone: doctorData.phone || "",
        description: doctorData.description || "",
        specialization: doctorData.specialization || [],
      })
    }
  }, [doctorData])

  async function handleEdit(e) {
    e.preventDefault()
    try {
      await updateDoctor({ id: doctorData?.id, editedDoctor: editData }).unwrap()
      toast.success("Profile successfully updated")
      setIsEditOpen(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    }
  }

  const { data: specs } = useGetDoctorsSpecializationsQuery()
  const specializationOptions = specs?.data || []

  // Локальный стейт для активности
  const [isActive, setIsActive] = useState(false)
  const [changeActivity, { isLoading }] = useChangeDoctorActivityStatusMutation()

  // Синхронизируем isActive с серверными данными
  useEffect(() => {
    if (typeof doctorData?.isActive === "boolean") {
      setIsActive(doctorData.isActive)
    }
  }, [doctorData?.isActive])

  async function handleSwitchChange(value) {
    setIsActive(value)
    try {
      await changeActivity({ doctorId: doctorData?.id, isActive: value }).unwrap()
      toast.success("Status updated successfully")
    } catch (error) {
      toast.error("Failed to update status")
      setIsActive(!value) // Откатить состояние при ошибке
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto p-4 max-w-2xl rounded">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold text-blue-800">My Profile</h1>
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          </div>
          <p className="text-blue-600 mt-2 text-sm font-medium">
            Manage your personal information
          </p>
        </div>

        {/* Main Profile Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

            <div className="flex items-center justify-between relative z-10 py-4">
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-white/20 rounded-full blur-md"></div>
                  <Avatar className="h-20 w-20 ring-3 ring-white/50 shadow-xl relative">
                    <AvatarImage src={doctorData?.profileImageUrl} />
                    <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                      {/* Можно инициаллы */}
                      {doctorData?.firstName?.[0]}
                      {doctorData?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  {/* Camera Dropdown */}
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
                        onClick={() =>
                          document.getElementById("photo-upload")?.click()
                        }
                        className="text-blue-700 hover:bg-blue-50 cursor-pointer rounded-lg m-1 text-sm"
                      >
                        <Camera className="h-3 w-3 mr-2" />
                        Upload Image
                      </DropdownMenuItem>
                      {doctorData?.profileImageUrl && (
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

                {/* Name + Specs */}
                <div>
                  <CardTitle className="text-xl font-bold text-white mb-1"></CardTitle>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-2xl">
                      {doctorData?.firstName} {doctorData?.lastName}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {doctorData?.specialization?.map((spec, index) => (
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
              </div>

              {/* Right: Buttons */}
              <div className="flex gap-3">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-4 py-2">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto rounded-2xl border-0 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-blue-800 text-xl font-bold">
                        Edit Profile
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label
                              htmlFor="firstName"
                              className="text-blue-700 font-medium text-sm"
                            >
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              value={editData?.firstName}
                              onChange={(e) =>
                                setEditData({ ...editData, firstName: e.target.value })
                              }
                              className="border-blue-200 focus:border-blue-500 rounded-lg h-9"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="lastName"
                              className="text-blue-700 font-medium text-sm"
                            >
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              value={editData?.lastName}
                              onChange={(e) =>
                                setEditData({ ...editData, lastName: e.target.value })
                              }
                              className="border-blue-200 focus:border-blue-500 rounded-lg h-9"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-blue-700 font-medium text-sm"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={editData?.email}
                            onChange={(e) =>
                              setEditData({ ...editData, email: e.target.value })
                            }
                            className="border-blue-200 focus:border-blue-500 rounded-lg h-9"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="text-blue-700 font-medium text-sm"
                          >
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            value={editData?.phone}
                            onChange={(e) =>
                              setEditData({ ...editData, phone: e.target.value })
                            }
                            className="border-blue-200 focus:border-blue-500 rounded-lg h-9"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="specialization"
                            className="text-blue-700 font-medium text-sm"
                          >
                            Specialization
                          </Label>
                          <Select
                            value={editData.specialization}
                            onValueChange={(value) => {
                              // При выборе нескольких специализаций
                              if (editData.specialization.includes(value)) {
                                // Удаляем если уже выбран
                                setEditData({
                                  ...editData,
                                  specialization: editData.specialization.filter(
                                    (v) => v !== value
                                  ),
                                })
                              } else {
                                // Добавляем новый
                                setEditData({
                                  ...editData,
                                  specialization: [...editData.specialization, value],
                                })
                              }
                            }}
                            multiple
                          >
                            <SelectTrigger className="border-blue-200 focus:border-blue-500 rounded-lg h-9">
                              <SelectValue
                                placeholder="Select specialization"
                                // Показываем выбранные через запятую
                                value={editData.specialization.join(", ")}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {specializationOptions.map((spec) => (
                                <SelectItem key={spec.id} value={spec.name}>
                                  {spec.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="description"
                            className="text-blue-700 font-medium text-sm"
                          >
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            value={editData?.description}
                            onChange={(e) =>
                              setEditData({ ...editData, description: e.target.value })
                            }
                            className="border-blue-200 focus:border-blue-500 min-h-[80px] rounded-lg"
                            placeholder="Enter your professional description..."
                          />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button
                            type="submit"
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
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            {/* Status Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-l-4 border-blue-500 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isActive ? "bg-green-400 animate-pulse" : "bg-gray-400"
                      }`}
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
                      isActive
                        ? "text-green-700 bg-green-100 border border-green-200"
                        : "text-gray-600 bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                  <Switch
                    id="active-status"
                    checked={isActive}
                    onCheckedChange={handleSwitchChange}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div>
              <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                  <User className="h-4 w-4 text-white" />
                </div>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">
                        Email
                      </p>
                      <p className="font-bold text-blue-800 text-sm truncate">
                        {doctorData?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-indigo-600 font-bold uppercase tracking-wide">
                        Phone
                      </p>
                      <p className="font-bold text-indigo-800 text-sm">
                        {doctorData?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-blue-200 to-transparent h-px" />

            {/* Professional Info */}
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
                    "{doctorData?.description}"
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
