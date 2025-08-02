'use client'

import ChatSidebar from '@/widgets/chat-sidebar'
import { usePathname } from 'next/navigation'

export default function UserChatsLayout({ children }) {
  const pathname = usePathname()

  const isChatList = pathname === "/chat"
  const isChatOpened = /^\/chat\/\d+\/\d+$/.test(pathname)

  return (
    <div className="flex w-full h-130 p-10">

      {/* SIDEBAR — показывается только на /chat или всегда на десктопе */}
      <aside className={`
        // ${isChatList ? 'block' : 'hidden'}
        md:block
        w-full md:w-[45%]  
        border-r overflow-y-auto
      `}>
        <ChatSidebar />
      </aside>

      {/* MAIN — показывается только если открыт конкретный чат или всегда на десктопе */}
      <main className={`
        ${isChatOpened ? 'block' : 'hidden'}
        md:block
        w-full md:w-[55%] max-h-screen
        overflow-y-auto
      `}>
        {children}
      </main>
    </div>
  )
}
