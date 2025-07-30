'use client';

import { useGetDoctorChatsQuery } from '@/entities/chat/api/chatApi';
import { getSignalRConnection } from '@/lib/signalR';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ChatSidebar() {
    const pathname = usePathname();

    const isChatList = pathname === "/master/chat"
    const isDesktop = typeof window === "undefined" ? true : window.innerWidth >= 768

    const chats = [
        { id: 1, name: "chat 1" },
        { id: 2, name: "chat 12" }
    ]

    useEffect(() => {
        const connection = getSignalRConnection();

        connection.start()
            .then(() => {
                toast.success("Signal connected ");
                connection.invoke("JoinRoom", "room-123");
            })
            .catch((err) => console.error("❌ SignalR connection error:", err));

        connection.on("ReceiveMessage", (roomId, message) => {
            console.log(`[${roomId}] 📩 Новое сообщение:`, message);
        });

        return () => {
            connection.stop();
        };
    }, []);

    const { data } = useGetDoctorChatsQuery()
    console.log("chats",data);
    

    return (
        <div className={`
      ${isChatList ? 'block' : 'hidden'} 
      md:block 
      w-full h-full p-4
    `}>
            <h2 className="text-xl font-bold mb-4">Все чаты</h2>
            <ul>
                {chats.map((chat) => (
                    <li key={chat.id} className="mb-2">
                        <Link href={`/master/chat/${chat.id}`}>
                            <Button
                                variant='ghost'
                                className="w-full flex items-center p-2 hover:bg-gray-200 rounded"
                            >
                                {chat.name}
                            </Button>
                        </Link>
                    </li>
                ))}
                <div>
                    <p>Chat Connected</p>
                    
                </div>

            </ul>
        </div>
    )
}
