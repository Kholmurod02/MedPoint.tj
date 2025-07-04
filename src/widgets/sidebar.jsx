"use client"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar"
import { Calendar, LayoutDashboard, MessageSquare, UserCircle, Settings, Stethoscope, Users, LogOut, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { Button } from "@/shared/ui/button"

import { useCurrentUserQuery } from "@/entities/user/api/userApi"


export function AppSidebar() {
  const [role, setRole] = useState("Doctor")
  const { data } = useCurrentUserQuery()



  const masterMenuItems = [
    {
      title: "Dashboard",
      url: "/master",
      icon: LayoutDashboard,
      highlight: "bg-blue-800",
    },
    {
      title: "Appointments",
      url: "/master/appointments",
      icon: Calendar,
      highlight: "bg-emerald-800",
    },
    {
      title: "Reviews",
      url: "/master/reviews",
      icon: MessageSquare,
      highlight: "bg-yellow-600",
    },
    {
      title: "Profile",
      url: "/master/profile",
      icon: UserCircle,
      highlight: "bg-gray-700",
    },
  ]

  const adminMenuItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      highlight: "bg-blue-800",
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      highlight: "bg-purple-600",
    },
    {
      title: "Doctors",
      url: "/admin/doctors",
      icon: Stethoscope,
      highlight: "bg-blue-600",
    },
    {
      title: "Appointments",
      url: "/admin/appointments",
      icon: Calendar,
      highlight: "bg-emerald-800",
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: MessageSquare,
      highlight: "bg-yellow-600",
    },
    {
      title: "Profile",
      url: "/admin/profile",
      icon: UserCircle,
      highlight: "bg-gray-700",
    }
  ]

  const menuItems = role == "Admin" ? adminMenuItems : masterMenuItems




  return (
    <Sidebar className="border-r-0 bg-blue-600 shadow-xl text-blue-400 ">
      <SidebarHeader className="p-6 border-b border-blue-200 relative overflow-hidden">

        <div className="flex items-center gap-3 relative z-10">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg border-2 border-blue-400 shadow-lg relative overflow-hidden">
            <div className="w-28 h-28  rounded-md flex items-center justify-center">
              <img src="../../logo.png" alt="MedPoint Logo" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-blue-600 tracking-tight">MedPoint</h2>
            <p className="text-xs text-blue-400">Healthcare Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 text-blue-500 ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-600 text-xs uppercase font-bold tracking-wider mb-3 ml-1">
            MEDICAL NAVIGATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-blue-800  hover:bg-blue-500 hover:text-blue-700 data-[state=open]:bg-blue-500 transition-all duration-200 group relative gap-3 mb-3 h-12"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-2 py-3 rounded-lg font-medium hover:scale-[1.02] active:scale-95 hover:text-white"
                    >
                      <div
                        className={`p-2 rounded-md ${item.highlight} shadow-sm group-hover:scale-110 transition-transform relative`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                        {item.badge && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{item.badge}</span>
                          </div>
                        )}
                      </div>
                      <span className="flex-1">{item.title}</span>
                      <div className="ml-auto w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-blue-200">
        {/* User profile */}
        <div className="flex items-center gap-3 p-3 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all duration-200 cursor-pointer group hover:shadow-md relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="relative">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center border-2 border-blue-300 shadow-md group-hover:border-blue-200 overflow-hidden">
              <img
                src={data?.data?.profileImageUrl}
                alt={`${data?.data?.firstName} ${data?.data?.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-blue-500"></div> */}
          </div>

          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-sm font-bold text-white">{data?.data?.firstName} {data?.data?.lastName}</p>
            <p className="text-xs text-blue-200 truncate">{data?.data?.role}</p>
          </div>

          {/* Setting */}

          <Popover>
            <PopoverTrigger asChild>
              <div className="flex flex-col gap-1 relative z-10 cursor-pointer">
                <Settings className="w-4 h-4 text-blue-200 group-hover:text-white transition-colors" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[170px] p-2">
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between hover:bg-red-100 text-red-600"
                  onClick={() => {
                    // Add your logout logic here
                    console.log('Logging out...')
                  }}
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </div>
                </Button>
              </div>
            </PopoverContent>
          </Popover>


        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
