'use client';

import { useGetUserChatsQuery } from '@/entities/chat/api/chatApi';
import { useGetDoctorByIdQuery } from '@/entities/doctor/api/doctorApi';
import { getSignalRConnection } from '@/lib/signalR';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import Cookies from 'js-cookie';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';



export default function ChatSidebar() {
    const pathname = usePathname();

    const isChatList = pathname === "/master/chat"
    const isDesktop = typeof window === "undefined" ? true : window.innerWidth >= 768



    const { data: chats } = useGetUserChatsQuery()
    const chatContacts = chats?.data;

    const { data: doctorData } = useGetDoctorByIdQuery()
    const doctor = doctorData?.data

    




    return (
        <div className={`
      ${isChatList ? 'block' : 'hidden'} 
      md:block 
      w-full max-h-screen p-4
    `}>
            <div className=" flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200  ">
                    <h1 className="text-xl font-semibold text-gray-900 mb-3">Messages</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input placeholder="Search conversations..." className="pl-10" />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1">
                    <div className="py-2 overflow-scroll max-h-screen">
                        {chatContacts?.map((chat) => (
                            <Link href={`/chat/${chat.id}`} key={chat?.id}>
                                <Card
                                    className="mb-2 cursor-pointer hover:bg-gray-50 transition-colors border-0 shadow-none p-0 flex "
                                >
                                    <CardContent className="p-3">
                                        <div className="flex items-start space-x-3">
                                            {/* Avatar with Online Status */}
                                            <div className="relative">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={chat?.avatar || "/placeholder.svg"} alt={chat?.name} />
                                                    <AvatarFallback className="bg-blue-500 text-white">
                                                        AA
                                                    </AvatarFallback>
                                                </Avatar>
                                                {/* {contact.isOnline && (
                                                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                                            )} */}
                                            </div>

                                            {/* Chat Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-medium text-gray-900 truncate">{chat?.doctorId}</h3>
                                                    <span className="text-xs text-gray-500 flex-shrink-0">
                                                        {chat?.lastMessageSentAt ? new Date(chat.lastMessageSentAt).toLocaleTimeString('ru-RU', { timeStyle: 'short' }) : null}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-600 truncate flex-1">{chat?.lastMessage}</p>
                                                    {chat?.unreadMessages > 0 ? (
                                                        <Badge
                                                            variant="default"
                                                            className="ml-2 bg-blue-500 hover:bg-blue-600 text-xs px-2 py-1 min-w-[20px] h-5 flex items-center justify-center"
                                                        >
                                                            {chat?.unreadMessages}

                                                        </Badge>
                                                    ) : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
