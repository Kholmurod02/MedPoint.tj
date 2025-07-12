import { CalendarDays, Star, MessageSquareText, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"

export default function MasterDashboard() {
  const appointments = [
    {
      id: "1",
      patient: "Alice Johnson",
      date: "2025-07-15",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: "2",
      patient: "Bob Williams",
      date: "2025-07-15",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      id: "3",
      patient: "Charlie Brown",
      date: "2025-07-16",
      time: "02:00 PM",
      status: "Confirmed",
    },
    {
      id: "4",
      patient: "Diana Prince",
      date: "2025-07-16",
      time: "03:45 PM",
      status: "Cancelled",
    },
    {
      id: "5",
      patient: "Eve Adams",
      date: "2025-07-17",
      time: "09:00 AM",
      status: "Confirmed",
    },
  ]

  const totalReviews = 250
  const averageRating = 4.7

  const ratingDistribution = {
    "5_star": 180,
    "4_star": 50,
    "3_star": 15,
    "2_star": 3,
    "1_star": 2,
  }

  const getPercentage = (count) => (count / totalReviews) * 100

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40"> 
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Reviews Overview Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews Overview</CardTitle>
              <MessageSquareText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                {averageRating} <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground">Based on {totalReviews} reviews</p>
            </CardContent>
          </Card>

          {/* Total Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">Total upcoming and past appointments</p>
            </CardContent>
          </Card>

          {/* Placeholder Card for future use */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+150</div>
              <p className="text-xs text-muted-foreground">New patients this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Appointments Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your next patient visits.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.patient}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            appointment.status === "Confirmed"
                              ? "default"
                              : appointment.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Rating Distribution Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Breakdown of your patient reviews by star rating.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {Object.entries(ratingDistribution).map(([key, count]) => (
                <div key={key} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-right">{key.replace("_star", "")} Star</div>
                  <Progress value={getPercentage(count)} className="flex-1" />
                  <div className="w-10 text-sm text-right text-muted-foreground">{count}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
