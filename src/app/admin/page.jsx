"use client"

import { Users, UserCheck, Calendar, MessageSquare, TrendingUp, ArrowUp, ArrowDown, Stethoscope, ShoppingCart, Star, UserCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart"
import { useGetCountReviewsAndOrdersStatsByMonthQuery, useGetCountStatsQuery, useGetCountUsersAndDoctorStatsByMonthQuery, useGetPercentageStatisticsQuery, useGetPopularDoctorsQuery } from "@/entities/dashboards/api/statistics"
import { Progress } from "@/shared/ui/progress"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Cookies from "js-cookie"

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })


const iconMap = {
  Users: <Users className="w-5 h-5 text-blue-600" />,
  Doctors: <Stethoscope className="w-5 h-5 text-purple-600" />,
  Orders: <ShoppingCart className="w-5 h-5 text-green-600" />,
  Reviews: <Star className="w-5 h-5 text-yellow-500" />,
};


export default function DashboardAdmin() {

  const token = Cookies.get("token")

  // chart No 1
  const [series, setSeries] = useState([{ name: "Users", data: [] }, { name: "Doctors", data: [] }])

  const { data: usersAndDoctors } = useGetCountUsersAndDoctorStatsByMonthQuery(undefined, {
    skip: !token,
  });

  const statData = usersAndDoctors?.data || [];


  const [options, setOptions] = useState({
    chart: {
      type: "bar",
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
      categories: [],
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

  useEffect(() => {
    if (statData?.length === 0) return;

    const users = [];
    const doctors = [];
    const months = [];

    statData?.forEach((el) => {
      users?.push(el?.usersCount);
      doctors?.push(el?.doctorsCount);

      const date = new Date(el?.month + "-01");
      const formattedMonth = date.toLocaleString("en-US", {
        month: "short",
        // year: "2-digit",
      }); // Например: "Jan 25"

      months?.push(formattedMonth);
    });




    setSeries([
      { name: "Users", data: users },
      { name: "Doctors", data: doctors },
    ]);

    setOptions((prev) => ({
      ...prev,
      xaxis: {
        ...prev.xaxis,
        categories: months || [],
      },
    }));
  }, [statData]);


  // countStats
  const { data: stats } = useGetCountStatsQuery()
  const countStats = stats?.data



  // Chart No 2

  const [series2, setSeries2] = useState([{ name: "Reviews", data: [] }, { name: "Appointments", data: [] }])

  const { data: reviewsAndOrders } = useGetCountReviewsAndOrdersStatsByMonthQuery(undefined, {
    skip: !token,
  })
  const statData2 = reviewsAndOrders?.data || []


  const [options2, setOptions2] = useState({
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
      text: "Reviews vs Appointments",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#1E293B", // чуть темнее
      },
    },
    xaxis: {
      categories: [], // заполни позже
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
    colors: ["#F97316", "#A855F7"],
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
    if (statData2?.length === 0) return;

    const reviews = [];
    const orders = [];
    const months2 = [];

    statData2?.forEach((el) => {
      reviews?.push(el?.reviewsCount);
      orders?.push(el?.ordersCount);

      const date = new Date(el?.month);
      const formattedMonth = date.toLocaleString("en-US", {
        month: "short",
        // year: "2-digit",
      }); // Например: "Jan 25"

      months2?.push(formattedMonth);
    });


    setSeries2([
      { name: "Reviews", data: reviews },
      { name: "Appointments", data: orders },
    ]);

    setOptions2((prev) => ({
      ...prev,
      xaxis: {
        ...prev.xaxis,
        categories: months2 || [],
      },
    }));
  }, [statData2]);

  // Popular doctors
  const { data: popular } = useGetPopularDoctorsQuery()
  const popularDoctors = popular?.data

  // Percentage statistics
  const { data: percentageInfo } = useGetPercentageStatisticsQuery()
  const monthlyStats = percentageInfo?.data




  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full container m-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          {/* <p className="text-gray-600 mt-2">Overview of key system metrics</p> */}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users Card */}
          <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-blue-100 bg-gradient-to-br from-blue-50 to-white h-37 py-4 sm:p-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs sm:text-sm font-medium text-blue-600">Users</CardTitle>
              <div className="p-1 sm:p-2 rounded-full bg-blue-100">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{countStats?.usersCount}</div>
              <div className="mt-2 h-2 rounded-full">
                <div className="h-2 w-full">
                  <Progress className="bg-blue-100" value={countStats?.usersCount} />
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Doctors Card */}
          <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-green-100 bg-gradient-to-br from-green-50 to-white h-37 py-4 sm:p-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs sm:text-sm font-medium text-green-600">Doctors</CardTitle>
              <div className="p-1 sm:p-2 rounded-full bg-green-100">
                <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{countStats?.doctorsCount}</div>

              <div className="mt-2 h-2 bg-green-100 rounded-full">
                <Progress
                  className="bg-green-100 [&>div]:bg-green-600"
                  value={countStats?.doctorsCount}
                />
              </div>
            </CardContent>
          </Card>


          {/* Appointments Card */}
          <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-purple-100 bg-gradient-to-br from-purple-50 to-white h-37 py-4 sm:p-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs sm:text-sm font-medium text-purple-600">
                Appointments
              </CardTitle>
              <div className="p-1 sm:p-2 rounded-full bg-purple-100">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {countStats?.ordersCount}
              </div>
              <div className="mt-2 h-2 bg-purple-100 rounded-full">
                <Progress
                  className="bg-purple-100 [&>div]:bg-purple-600"
                  value={countStats?.ordersCount}
                />
              </div>
            </CardContent>
          </Card>


          {/* Reviews Card */}
          <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-orange-100 bg-gradient-to-br from-orange-50 to-white h-37 py-4 sm:p-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs sm:text-sm font-medium text-orange-600">
                Number of reviews
              </CardTitle>
              <div className="p-1 sm:p-2 rounded-full bg-orange-100">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {countStats?.reviewsCount}
              </div>
              <div className="mt-2 h-2 bg-orange-100 rounded-full">
                <Progress
                  className="bg-orange-100 [&>div]:bg-orange-600"
                  value={countStats?.reviewsCount}
                />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Users Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User/doctors growth dynamics by month</CardTitle>
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
                  options={options || []}
                  series={series || []}
                  type="area"
                  height={220}
                />
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Appointments Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Number of reviews/appointments by month</CardTitle>
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
                <ReactApexChart
                  options={options2 || []}
                  series={series2 || []}
                  type="area"
                  height={220}
                />
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Month-over-Month Overview</CardTitle>
              <CardDescription>How each metric changed since last month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {monthlyStats?.map((stat, index) => {
                  const isPositive = parseFloat(stat.percenteDifference) >= 0;
                  const Icon = isPositive ? ArrowUp : ArrowDown;
                  const iconColor = isPositive ? "text-green-600" : "text-red-600";

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between border p-4 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-full">
                          {iconMap[stat.category]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{stat.category}</p>
                          <p className="text-xs text-gray-500">
                            {stat.current} (prev: {stat.previous})
                          </p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 font-medium ${iconColor}`}>
                        <Icon className="w-4 h-4" />
                        <span>{Math.abs(stat.percenteDifference)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Popular doctors */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Doctors</CardTitle>
              <CardDescription>Top doctors by number of orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularDoctors?.slice(0, 5)?.map((doctor, index) => (
                  <div
                    key={doctor.doctorId}
                    className="flex items-center justify-between rounded-md p-3 bg-muted hover:bg-accent transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Stethoscope className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {index + 1}. {doctor.doctorName}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {doctor.orderCount} orders
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}