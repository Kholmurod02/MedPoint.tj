"use client"
import { useCurrentUserQuery } from "@/entities/user/api/userApi"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Mail, EyeIcon, Trash, ImagePlus, User, Phone } from "lucide-react"

// Placeholder image for profile if not available
const PLACEHOLDER_PROFILE_IMAGE = "/womenDoc.jpg"

export default function DashboardPage() {
  const { data: user } = useCurrentUserQuery()
  const userData = user?.data

  

  

  const appointmentsData = [
    {
      id: 9,
      doctorId: 1,
      doctorName: "Doctor Test",
      userId: 2,
      userName: "Med1 Point",
      date: "2025-07-19",
      startTime: "17:00:00",
      endTime: "17:30:00",
      createdAt: "2025-07-15T13:50:59.7860327",
      orderStatus: "Pending",
      cancellationReason: null,
    },
    {
      id: 5,
      doctorId: 1,
      doctorName: "Doctor Test",
      userId: 2,
      userName: "Med1 Point",
      date: "2025-07-18",
      startTime: "11:00:00",
      endTime: "11:30:00",
      createdAt: "2025-07-12T17:04:08.2535667",
      orderStatus: "Accepted",
      cancellationReason: null,
    },
    {
      id: 8,
      doctorId: 1,
      doctorName: "Doctor Test",
      userId: 2,
      userName: "Med1 Point",
      date: "2025-07-31",
      startTime: "09:45:00",
      endTime: "10:15:00",
      createdAt: "2025-07-12T19:07:17.1896272",
      orderStatus: "NotAccepted",
      cancellationReason: null,
    },
    {
      id: 7,
      doctorId: 1,
      doctorName: "Doctor Test",
      userId: 2,
      userName: "Med1 Point",
      date: "2025-07-31",
      startTime: "08:00:00",
      endTime: "08:30:00",
      createdAt: "2025-07-12T19:06:58.6232265",
      orderStatus: "NotAccepted",
      cancellationReason: null,
    },
  ]

  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Data Card */}
        <Card className="lg:col-span-3 rounded-xl shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  className="rounded-full px-4 py-2 text-sm flex items-center gap-2 bg-transparent"
                >
                  <User className="h-4 w-4" />
                  {userData?.firstName ?? "First"} {userData?.lastName ?? "Last"}
                </Button>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  className="rounded-full px-4 py-2 text-sm flex items-center gap-2 bg-transparent"
                >
                  <Phone className="h-4 w-4" />
                  {userData?.phone ?? "No phone"}
                </Button>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  className="rounded-full px-4 py-2 text-sm flex items-center gap-2 bg-transparent"
                >
                  <Mail className="h-4 w-4" />
                  {userData?.email ?? "No email"}
                </Button>
              </div>
              <Button className="mt-4 px-6 py-2 rounded-lg">Edit Profile</Button>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-52 w-52  border-gray-200 rounded overflow-hidden">
                <AvatarImage
                  src={userData?.profileImageUrl || PLACEHOLDER_PROFILE_IMAGE}
                  alt={`${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`}
                />
                <AvatarFallback>
                  {(userData?.firstName?.[0] ?? "") + (userData?.lastName?.[0] ?? "")}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="ghost" className="text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                  <ImagePlus className="mr-1 h-4 w-4" />
                  Change Image
                </Button>
                <Button variant="ghost" className="text-sm text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash className="mr-1 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

         {/* My Appointment Card */}
        <Card className="lg:col-span-2 rounded-xl shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">My Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointmentsData?.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg">Dr. {appointment.doctorName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {/* Doctor role is not in data, so omitting or using placeholder */}
                    {/* Junior / Senior */}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-600 font-medium text-sm">
                    {`${appointment.startTime.substring(0, 5)} - ${appointment.endTime.substring(0, 5)}`}
                  </span>
                  <span className="text-muted-foreground text-sm">{formatAppointmentDate(appointment.date)}</span>
                  {appointment.orderStatus === "Pending" ? (
                    <Button variant="destructive" size="sm" className="rounded-md px-4 py-2">
                      Cancel
                    </Button>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                      {appointment.orderStatus === "NotAccepted" ? "Not Accepted" : "Completed"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Password Card */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Пароль</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input id="current-password" type="password" placeholder="Текущий пароль" className="pr-10 rounded-lg" />
              <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>
            <div className="relative">
              <Input id="new-password" type="password" placeholder="Новый пароль" className="pr-10 rounded-lg" />
              <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>
            <div className="relative">
              <Input
                id="confirm-password"
                type="password"
                placeholder="Подтвердить пароль"
                className="pr-10 rounded-lg"
              />
              <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>
            <Button className="w-full px-6 py-2 rounded-lg">Изменить</Button>
          </CardContent>
        </Card>

       
      </div>
    </div>
  )
}
