'use client';

import { useGetDoctorChatsQuery } from '@/entities/chat/api/chatApi';
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

const chatContacts = [
    {
        id: "1",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Hey! How are you doing today?",
        timestamp: "2m ago",
        unreadCount: 2,
        isOnline: true,
    },
    {
        id: "19",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Hey! How are you doing today?",
        timestamp: "2m ago",
        unreadCount: 2,
        isOnline: true,
    },
    {
        id: "165",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Hey! How are you doing today?",
        timestamp: "2m ago",
        unreadCount: 2,
        isOnline: true,
    },
    {
        id: "791",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Hey! How are you doing today?",
        timestamp: "2m ago",
        unreadCount: 2,
        isOnline: true,
    },
    {
        id: "2",
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Thanks for the help with the project!",
        timestamp: "1h ago",
        isOnline: true,
    },
    {
        id: "3",
        name: "Carol Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Can we schedule a meeting for tomorrow?",
        timestamp: "3h ago",
        unreadCount: 1,
        isOnline: false,
    },
    {
        id: "4",
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "The documents are ready for review",
        timestamp: "1d ago",
        isOnline: false,
    },
    {
        id: "5",
        name: "Emma Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Looking forward to our lunch!",
        timestamp: "2d ago",
        unreadCount: 5,
        isOnline: true,
    },
    {
        id: "6",
        name: "Frank Miller",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Great job on the presentation",
        timestamp: "3d ago",
        isOnline: false,
    },
]

export default function ChatSidebar() {
    const pathname = usePathname();

    const isChatList = pathname === "/master/chat"
    const isDesktop = typeof window === "undefined" ? true : window.innerWidth >= 768

    

    const { data } = useGetDoctorChatsQuery()
    console.log("chats", data);


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
                        {chatContacts.map((contact) => (
                            <Card
                                key={contact.id}
                                className="mb-2 cursor-pointer hover:bg-gray-50 transition-colors border-0 shadow-none p-0 flex "
                            >
                                <CardContent className="p-3">
                                    <div className="flex items-start space-x-3">
                                        {/* Avatar with Online Status */}
                                        <div className="relative">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                                <AvatarFallback className="bg-blue-500 text-white">
                                                    {contact.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            {contact.isOnline && (
                                                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                                            )}
                                        </div>

                                        {/* Chat Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                                                <span className="text-xs text-gray-500 flex-shrink-0">{contact.timestamp}</span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-gray-600 truncate flex-1">{contact.lastMessage}</p>
                                                {contact.unreadCount && (
                                                    <Badge
                                                        variant="default"
                                                        className="ml-2 bg-blue-500 hover:bg-blue-600 text-xs px-2 py-1 min-w-[20px] h-5 flex items-center justify-center"
                                                    >
                                                        {contact.unreadCount}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
