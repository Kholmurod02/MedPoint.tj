"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Link, Phone, Video, MoreVertical, Camera, Mic, ImageIcon, Smile, Plus, Paperclip, Send } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/shared/ui/drawer"
import { Input } from "@/shared/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { connectToChatHub } from "@/lib/signalR"



const messages = [
  { id: 1, text: "Hey, what's up?", sender: "contact", timestamp: "09:00" },
  { id: 2, text: "All good, you?", sender: "user", timestamp: "09:01" },
  { id: 3, text: "I'm good too, thanks!", sender: "contact", timestamp: "09:02" },
  { id: 4, text: "Are you going to work today?", sender: "contact", timestamp: "09:03" },
  { id: 5, text: "Nope, day off today.", sender: "user", timestamp: "09:05" },
  { id: 6, text: "Nice! Want to hang out?", sender: "contact", timestamp: "09:06" },
  { id: 7, text: "Sure, what time?", sender: "user", timestamp: "09:07" },
  { id: 8, text: "How about 11:00?", sender: "contact", timestamp: "09:08" },
  { id: 9, text: "Sounds good!", sender: "user", timestamp: "09:10" },
  { id: 10, text: "I'll pick the spot.", sender: "contact", timestamp: "09:12" },
  { id: 11, text: "Cool, see you later.", sender: "user", timestamp: "09:14" },
  { id: 12, text: "Later!", sender: "contact", timestamp: "09:15" }
];



export default function UserChatById() {
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false)
  const [messageText, setMessageText] = useState("")
  const router = useRouter()





  return (
    <div className="flex flex-col my-10  h-screen bg-white text-gray-900 max-w-screen mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-white relative top-[-30] z-50">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100" onClick={() => router.push("/master/chat")}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="KHALID" />
            <AvatarFallback className="bg-gray-200 text-gray-700">KH</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg text-gray-900">Kholmurod Khairulloev</h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
            <Phone className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
            <Video className="h-6 w-6" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                <MoreVertical className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-gray-200">
              <DropdownMenuItem className="text-red-600 hover:bg-red-50 hover:text-red-700">
                Delete Chat
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsInfoDrawerOpen(true)} className="text-gray-900 hover:bg-gray-100">
                Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50 h-59 ">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${message.sender === "user" ? "justify-end" : "justify-start"} `}
          >
            {message.sender === "contact" && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Contact" />
                <AvatarFallback className="bg-gray-200 text-gray-700">KH</AvatarFallback>
              </Avatar>
            )}

            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${message.sender === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-white text-gray-900 border border-gray-200"
                }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form>

          <div className="flex items-center space-x-2">
            <label
              className="inline-flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-md px-2 py-1 text-sm transition-colors hover:bg-gray-100"
            >
              <Paperclip className="w-4 h-4" />
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("Выбран файл:", file.name);
                  }
                }}
              />
            </label>

            <div className="flex-1 relative">
              <Input placeholder="Type your message..." className="pr-10 bg-gray-50 border-gray-200 focus:bg-white" />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Info Drawer */}
      <Drawer direction="right" open={isInfoDrawerOpen} onOpenChange={setIsInfoDrawerOpen}>
        <DrawerContent className="bg-white border-gray-200">
          <DrawerHeader>
            <DrawerTitle className="text-gray-900">Chat Info</DrawerTitle>
          </DrawerHeader>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="KHALID" />
                <AvatarFallback className="bg-gray-200 text-gray-700">KH</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">KHALID🐺</h3>
                <p className="text-gray-600">davlatov._7</p>
                <p className="text-sm text-gray-500">Last seen recently</p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Phone</span>
                <span className="text-gray-500">+1 234 567 8900</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Username</span>
                <span className="text-gray-500">@davlatov._7</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Bio</span>
                <span className="text-gray-500">Living life to the fullest 🐺</span>
              </div>
            </div>

            {/* <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-white">
                View Profile
              </Button>
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-white">
                Block User
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Chat
              </Button>
            </div> */}

          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
