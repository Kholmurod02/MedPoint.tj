 "use client"
import { useCurrentUserQuery } from '@/entities/user/api/userApi';
 import { Button } from '@/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import Cookies from 'js-cookie';
import { LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
 
 const SidebarFooter = ({data}) => {
    const router = useRouter()
   return (
    <div className="p-4 border-t border-blue-200">
        <div className="flex items-center gap-3 p-3 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all duration-200 cursor-pointer group hover:shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="relative">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center border-2 border-blue-300 shadow-md group-hover:border-blue-200 overflow-hidden">
              <img
                src={data?.data?.profileImageUrl}
                alt={`${data?.data?.firstName} ${data?.data?.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-sm font-bold text-white">{data?.data?.firstName} {data?.data?.lastName}</p>
            <p className="text-xs text-blue-200 truncate">{data?.data?.role}</p>
          </div>

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
                    Cookies.remove("token");
                    router.push("/login");
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
      </div>
   )
 }
 
 export default SidebarFooter