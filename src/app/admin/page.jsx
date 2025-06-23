"use client"

import { Users, UserCheck, Calendar, MessageSquare, TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart"

const userData = [
  { month: "Янв", users: 1200, doctors: 45, appointments: 890, reviews: 234 },
  { month: "Фев", users: 1350, doctors: 48, appointments: 1020, reviews: 267 },
  { month: "Мар", users: 1580, doctors: 52, appointments: 1180, reviews: 298 },
  { month: "Апр", users: 1720, doctors: 55, appointments: 1350, reviews: 334 },
  { month: "Май", users: 1890, doctors: 58, appointments: 1520, reviews: 378 },
  { month: "Июн", users: 2100, doctors: 62, appointments: 1680, reviews: 412 },
]

const monthlyStats = [
  { category: "Пользователи", current: 2100, previous: 1890, growth: 11.1 },
  { category: "Врачи", current: 62, previous: 58, growth: 6.9 },
  { category: "Записи", current: 1680, previous: 1520, growth: 10.5 },
  { category: "Отзывы", current: 412, previous: 378, growth: 9.0 },
]

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full md:max-width-1200 md:m-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Панель администратора</h1>
          <p className="text-gray-600 mt-2">Обзор основных метрик системы</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Карточка пользователей */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Кол-во пользователей</CardTitle>
              <div className="p-2 rounded-full bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2,100</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-medium">+11.1%</span> с прошлого месяца
              </div>
              <div className="mt-3 h-2 bg-blue-100 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
              </div>
            </CardContent>
          </Card>

          {/* Карточка врачей */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-green-100 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Кол-во врачей</CardTitle>
              <div className="p-2 rounded-full bg-green-100">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">62</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-medium">+6.9%</span> с прошлого месяца
              </div>
              <div className="mt-3 h-2 bg-green-100 rounded-full">
                <div className="h-2 bg-green-500 rounded-full w-2/3"></div>
              </div>
            </CardContent>
          </Card>

          {/* Карточка записей */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-purple-100 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">Кол-во записей</CardTitle>
              <div className="p-2 rounded-full bg-purple-100">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1,680</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-medium">+10.5%</span> с прошлого месяца
              </div>
              <div className="mt-3 h-2 bg-purple-100 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full w-4/5"></div>
              </div>
            </CardContent>
          </Card>

          {/* Карточка отзывов */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-orange-100 bg-gradient-to-br from-orange-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">Кол-во отзывов</CardTitle>
              <div className="p-2 rounded-full bg-orange-100">
                <MessageSquare className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">412</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-medium">+9.0%</span> с прошлого месяца
              </div>
              <div className="mt-3 h-2 bg-orange-100 rounded-full">
                <div className="h-2 bg-orange-500 rounded-full w-3/5"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Users Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Рост пользователей</CardTitle>
              <CardDescription>Динамика роста пользователей за последние 6 месяцев</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: {
                    label: "Пользователи",
                    color: "hsl(221, 83%, 53%)",
                  },
                }}
                className="h-[300px] w-[100%]"
              >
                <AreaChart data={userData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="var(--color-users)"
                    fill="var(--color-users)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Appointments Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Записи к врачам</CardTitle>
              <CardDescription>Количество записей по месяцам</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  appointments: {
                    label: "Записи",
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
              <CardTitle>Врачи и отзывы</CardTitle>
              <CardDescription>Сравнение количества врачей и отзывов</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  doctors: {
                    label: "Врачи",
                    color: "hsl(142, 76%, 36%)",
                  },
                  reviews: {
                    label: "Отзывы",
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
              <CardTitle>Сравнение с предыдущим месяцем</CardTitle>
              <CardDescription>Процентное изменение основных метрик</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{stat.category}</p>
                      <p className="text-sm text-gray-600">
                        {stat.current.toLocaleString()} (было: {stat.previous.toLocaleString()})
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
            <CardTitle>Общая статистика</CardTitle>
            <CardDescription>Все основные метрики в одном графике</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Пользователи",
                  color: "hsl(221, 83%, 53%)",
                },
                doctors: {
                  label: "Врачи",
                  color: "hsl(142, 76%, 36%)",
                },
                appointments: {
                  label: "Записи",
                  color: "hsl(262, 83%, 58%)",
                },
                reviews: {
                  label: "Отзывы",
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
