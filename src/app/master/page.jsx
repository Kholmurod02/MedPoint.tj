"use client"

import { CalendarDays, Star, MessageSquareText, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import { ChartContainer } from "@/shared/ui/chart"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useGetAllDoctorStatisticQuery, useGetDoctorStatisticByMonthQuery } from "@/entities/dashboards/api/statistics"
import Cookies from "js-cookie"
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

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

  const getPercentage = (count) => (count / totalReviews) * 100

  const token = Cookies.get('token')

  const { data } = useGetAllDoctorStatisticQuery(undefined, {
    skip: !token,
  })
  const overallDoctorStatistic =  data?.data;


// doctor chart
  const [series, setSeries] = useState([{ name: "Reviews", data: [] }, { name: "Appointments", data: [] }])
 
   const { data: reviewsAndOrders } = useGetDoctorStatisticByMonthQuery(undefined, {
     skip: !token,
   })
   const statData = reviewsAndOrders?.data || []
   
   const [options, setOptions] = useState({
     chart: {
       type: "line",
       height: 350,
       toolbar: { show: false },
       fontFamily: "Arial, sans-serif",
       foreColor: "#333",
     },
     stroke: {
       curve: "smooth",
       width: 3,
     },
     title: {
      //  text: "Reviews vs Appointments",
       align: "left",
       style: {
         fontSize: "18px",
         fontWeight: "bold",
         color: "#1E293B", 
       },
     },
     xaxis: {
       categories: [], 
       title: {
         text: "Month",
         style: {
           fontSize: "14px",
           fontWeight: 600,
         },
       },
       labels: {
         style: {
           fontSize: "13px",
           colors: "#555",
         },
       },
     },
     yaxis: {
       title: {
         text: "Count",
         style: {
           fontSize: "14px",
           fontWeight: 600,
         },
       },
       labels: {
         style: {
           fontSize: "13px",
           colors: "#555",
         },
       },
     },
     colors: ["#F97316", "#50C878"],
     legend: {
       position: "top",
       horizontalAlign: "right",
       fontSize: "13px",
       fontWeight: 500,
     },
     dataLabels: {
       enabled: false,
     },
     grid: {
       borderColor: "#E5E7EB",
       strokeDashArray: 4,
       padding: {
         left: 10,
         right: 10,
       },
     },
     tooltip: {
       theme: "light",
       x: {
         format: "MMM yyyy",
       },
     },
   });
 
 
   useEffect(() => {
     if (statData?.length === 0) return;
 
     const reviews = [];
     const orders = [];
     const months = [];
 
     statData?.forEach((el) => {
       reviews?.push(el?.reviewCount);
       orders?.push(el?.orderCount);
 
       const date = new Date(el?.month);
       const formattedMonth = date.toLocaleString("en-US", {
         month: "short",
         // year: "2-digit",
       }); // Например: "Jan 25"
 
       months?.push(formattedMonth);
     });
 
 
     setSeries([
       { name: "Reviews", data: reviews },
       { name: "Appointments", data: orders },
     ]);
 
     setOptions((prev) => ({
       ...prev,
       xaxis: {
         ...prev.xaxis,
         categories: months || [],
       },
     }));
   }, [statData]);



  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Reviews Overview Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews Overview</CardTitle>
              <MessageSquareText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                {overallDoctorStatistic?.averageRating} <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground">Based on {overallDoctorStatistic?.reviewCount} reviews</p>
            </CardContent>
          </Card>

          {/* Total Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallDoctorStatistic?.orderCount}</div>
              <p className="text-xs text-muted-foreground">Total upcoming and past appointments</p>
            </CardContent>
          </Card>

          {/* Placeholder Card for future use */}
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+150</div>
              <p className="text-xs text-muted-foreground">New patients this month</p>
            </CardContent>
          </Card> */}
        </div>



        <Card>
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
                options={options || []}
                series={series || []}
                type="area"
                height={220}
              />
            </ChartContainer>
          </CardContent>
        </Card>



      </main>
    </div>
  )
}
