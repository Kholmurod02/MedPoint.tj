"use client"

import { Users, UserCheck, Calendar, MessageSquare, TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart"
import { useGetCountStatsQuery } from "@/entities/dashboards/api/statistics"
import { Progress } from "@/shared/ui/progress"
import { useState } from "react"
import ReactApexChart from "react-apexcharts"

const userData = [
  { month: "Jan", users: 1200, doctors: 45, appointments: 890, reviews: 234 },
  { month: "Feb", users: 1350, doctors: 48, appointments: 1020, reviews: 267 },
  { month: "Mar", users: 1580, doctors: 52, appointments: 1180, reviews: 298 },
  { month: "Apr", users: 1720, doctors: 55, appointments: 1350, reviews: 334 },
  { month: "May", users: 1890, doctors: 58, appointments: 1520, reviews: 378 },
  { month: "Jun", users: 2100, doctors: 62, appointments: 1680, reviews: 412 },
]



const monthlyStats = [
  { category: "Users", current: 2100, previous: 1890, growth: 11.1 },
  { category: "Doctors", current: 62, previous: 58, growth: 6.9 },
  { category: "Appointments", current: 1680, previous: 1520, growth: 10.5 },
  { category: "Reviews", current: 412, previous: 378, growth: 9.0 },
]

export default function DashboardAdmin() {
  const [options, setOptions] = useState({
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    title: {
      text: "Users vs Doctors",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#333",
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    colors: ["#007bff", "#00e396"],
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#e7e7e7",
    },
  });

const [series,setSeries] = useState([{name:"Users",data:[1,2,3,4,12,]},{name:"Doctors",data:[2,4,1,41,2]}])

  const { data: stats } = useGetCountStatsQuery()
  const countStats = stats?.data

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full container m-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          {/* <p className="text-gray-600 mt-2">Overview of key system metrics</p> */}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users Card */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Number of users</CardTitle>
              <div className="p-2 rounded-full bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{countStats?.usersCount}</div>
              {/* <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-medium">+11.1%</span> from last month
              </div> */}
              <div className="mt-3 h-2 rounded-full">
                <div className="h-2 w-3/4">
                  <Progress
                    className='bg-blue-100'
                    value={countStats?.usersCount} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctors Card */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-green-100 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Number of doctors</CardTitle>
              <div className="p-2 rounded-full bg-green-100">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{countStats?.doctorsCount}</div>
              {/* <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-medium">+6.9%</span> from last month
              </div> */}
              <div className="mt-3 h-2 bg-green-100 rounded-full">
                <div className="h-2 w-3/4">
                  <Progress
                    className='bg-green-100  [&>div]:bg-green-600'
                    value={countStats?.doctorsCount} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointments Card */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-purple-100 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">Number of appointments</CardTitle>
              <div className="p-2 rounded-full bg-purple-100">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{countStats?.ordersCount}</div>
              {/* <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-medium">+10.5%</span> from last month
              </div> */}
              <div className="mt-3 h-2 bg-purple-100 rounded-full">
                <div className="h-2 w-3/4">
                  <Progress
                    className='bg-purple-100  [&>div]:bg-purple-600'
                    value={countStats?.ordersCount} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Card */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-orange-100 bg-gradient-to-br from-orange-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">Number of reviews</CardTitle>
              <div className="p-2 rounded-full bg-orange-100">
                <MessageSquare className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{countStats?.reviewsCount}</div>
              {/* <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-medium">+9.0%</span> from last month
              </div> */}
              <div className="mt-3 h-2 bg-orange-100 rounded-full">
                <div className="h-2 w-3/4">
                  <Progress
                    className='bg-orange-100  [&>div]:bg-orange-600'
                    value={countStats?.doctorsCount} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Users Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              {/* <CardDescription>User growth dynamics over the last 6 months</CardDescription> */}
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: {
                    label: "Users",
                    color: "hsl(221, 83%, 53%)",
                  },
                }}
                className="h-[300px] w-[100%]"
              >
                <ReactApexChart
                  options={options}
                  series={series}
                  type="area"
                  height={220}
                />
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Appointments Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Doctor Appointments</CardTitle>
              <CardDescription>Number of appointments by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  appointments: {
                    label: "Appointments",
                    color: "hsl(262, 83%, 58%)",
                  },
                }}
                className="h-[300px] w-[100%]"
              >
                <LineChart data={userData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="var(--color-appointments)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-appointments)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doctors and Reviews Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Doctors and Reviews</CardTitle>
              <CardDescription>Comparison of doctors count and reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  doctors: {
                    label: "Doctors",
                    color: "hsl(142, 76%, 36%)",
                  },
                  reviews: {
                    label: "Reviews",
                    color: "hsl(25, 95%, 53%)",
                  },
                }}
                className="h-[300px] w-[100%]"
              >
                <BarChart data={userData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="doctors" fill="var(--color-doctors)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="reviews" fill="var(--color-reviews)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Monthly Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Comparison with Previous Month</CardTitle>
              <CardDescription>Percentage change in key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{stat.category}</p>
                      <p className="text-sm text-gray-600">
                        {stat.current.toLocaleString()} (prev: {stat.previous.toLocaleString()})
                      </p>
                    </div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="font-semibold">+{stat.growth}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Statistics</CardTitle>
            <CardDescription>All key metrics in one chart</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Users",
                  color: "hsl(221, 83%, 53%)",
                },
                doctors: {
                  label: "Doctors",
                  color: "hsl(142, 76%, 36%)",
                },
                appointments: {
                  label: "Appointments",
                  color: "hsl(262, 83%, 58%)",
                },
                reviews: {
                  label: "Reviews",
                  color: "hsl(25, 95%, 53%)",
                },
              }}
              className="h-[400px] w-full"
            >
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-users)", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="var(--color-appointments)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-appointments)", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="reviews"
                  stroke="var(--color-reviews)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-reviews)", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="doctors"
                  stroke="var(--color-doctors)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-doctors)", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}