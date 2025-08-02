'use client'

import ChatSidebar from '@/widgets/chat-sidebar';
import { usePathname } from 'next/navigation';

export default function DoctorChatsLayout({ children }) {
  const pathname = usePathname()

  const isChatList = pathname === "/master/chat"
  const isChatOpened = pathname.startsWith("/master/chat/") && pathname.split("/").length > 3

  return (
    <div className="flex  w-full max-h-screen">

      {/* SIDEBAR — всегда показывается на десктопе, на мобилке только если /master/chat */}
      <aside className={`
        ${isChatList ? 'block' : 'hidden'} 
        md:block 
        w-full md:w-[45%] max-h-screen
         border-r overflow-y-auto
      `}>
        <ChatSidebar />
      </aside>

      {/* MAIN — всегда показывается на десктопе, на мобилке только если открыт чат */}
      <main className={`
        ${isChatOpened ? 'block' : 'hidden'} 
        md:block 
        flex-1 overflow-y-auto
        max-w-screen
        max-h-screen
      `}>
        {children}
      </main>
    </div>
  )
}
 