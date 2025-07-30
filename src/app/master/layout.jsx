"use client"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import AdminHeader from "@/widgets/admin-header";
import { AppSidebar } from "@/widgets/sidebar";

export default function MasterLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center sticky top-0 z-50 border-b bg-white">
          <SidebarTrigger className="text-blue-600 hover:bg-blue-50 w-10 h-10" />
          <AdminHeader />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
