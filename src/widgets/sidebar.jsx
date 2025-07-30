"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

import {
  Calendar,
  LayoutDashboard,
  MessageSquare,
  UserCircle,
  Stethoscope,
  Users,
  MessageCircle,
} from "lucide-react";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import SidebarFooter from "./sidebar-footer";
import { useCurrentUserQuery } from "@/entities/user/api/userApi";
import { useCurrentDoctorQuery } from "@/entities/doctor/api/doctorApi";

export function AppSidebar() {

  const [role, setRole] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  





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
      title: "Chats",
      url: "/master/chat",
      icon: MessageCircle,
      highlight: "bg-yellow-600",
    },
    // {
    //   title: "Profile",
    //   url: "/master/profile",
    //   icon: UserCircle,
    //   highlight: "bg-gray-700",
    // },
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
    // {
    //   title: "Profile",
    //   url: "/admin/profile",
    //   icon: UserCircle,
    //   highlight: "bg-gray-700",
    // }
  ]


  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setRole(role);

        if (role === "Admin") {
          setMenuItems(adminMenuItems);
        } else if (role === "Doctor") {
          setMenuItems(masterMenuItems);
        } else {
          setMenuItems([]);
        }
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
  }, []);





  return (
    <Sidebar className="border-r-0 bg-blue-600 shadow-xl text-blue-400">
      <SidebarHeader className="p-6 border-b border-blue-200 relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg border-2 border-blue-400 shadow-lg relative overflow-hidden">
            <div className="w-28 h-28 rounded-md flex items-center justify-center">
              <img src="../../logo.png" alt="MedPoint Logo" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-blue-600 tracking-tight">MedPoint</h2>
            <p className="text-xs text-blue-400">Healthcare Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 text-blue-500">
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
                    className="text-blue-800 hover:bg-blue-500 hover:text-blue-700 data-[state=open]:bg-blue-500 transition-all duration-200 group relative gap-3 mb-3 h-12"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-2 py-3 rounded-lg font-medium hover:scale-[1.02] active:scale-95 hover:text-white"
                    >
                      <div
                        className={`p-2 rounded-md ${item.highlight} shadow-sm group-hover:scale-110 transition-transform relative`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
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

      {/* <SidebarFooter data={role == "Admin" ? adminData : doctorData} /> */}
    </Sidebar>
  );
}
