"use client"

import { Bell, Search, Settings, User, LogOut, Menu, Shield, Moon } from "lucide-react"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Badge } from "@/shared/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import Link from "next/link"
import {jwtDecode} from "jwt-decode"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useCurrentDoctorQuery } from "@/entities/doctor/api/doctorApi"
import { useCurrentUserQuery } from "@/entities/user/api/userApi"

export default function AdminHeader() {
  const router = useRouter()

  // Хуки вызываем на верхнем уровне
  const { data: currentDoctor } = useCurrentDoctorQuery()
  const { data: currentAdmin } = useCurrentUserQuery()

  // Получаем токен из куки
  const token = Cookies.get("token")

  // Переменная для роли и данных пользователя
  let itemRole = null
  let itemData = null

  // Парсим токен и получаем роль
  if (token) {
    try {
      const decodedItem = jwtDecode(token)
      itemRole = decodedItem['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    } catch (error) {
      console.error("JWT decode error:", error)
    }
  }

  // Назначаем данные в зависимости от роли
  if (itemRole === "Admin") {
    itemData = currentAdmin?.data
  } else {
    itemData = currentDoctor?.data
  }


  return (
    <header className="w-full  bg-white">
      <div className="container flex h-16 items-center justify-end px-4">
        <div className="flex items-center gap-2">
          {/* Notifications */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* Settings */}
          {/* <Button variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button> */}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full border">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={itemData?.profileImageUrl} alt={`${itemData?.firstName} ${itemData?.lastName}`} />
                  <AvatarFallback>{`${itemData?.firstName?.[0] || ''}${itemData?.lastName?.[0] || ''}`}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{`${itemData?.firstName || ''} ${itemData?.lastName || ''}`}</p>
                  <p className="text-xs leading-none text-muted-foreground">{itemData?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={itemRole == "Admin"?"/admin/profile":"/master/profile"} className="flex gap-2 items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  Cookies.remove("token")
                  router.push("/login")
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
