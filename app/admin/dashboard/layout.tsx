"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSideBar } from "@/components/admin/AdminSideBar";
import Logout from "./Logout";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <SidebarProvider>
          <AdminSideBar />
          <div className="flex flex-col w-full">
            <header className="bg-gray-50 dark:bg-[#161b27] border-b w-full flex items-center gap-2 border-slate-200 dark:border-slate-800 px-4 md:px-6 py-4">
              <SidebarTrigger />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200">
                      Admin Dashboard
                    </h1>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 hidden sm:block">
                      Welcome back, Admin
                    </p>
                  </div>
                </div>
                <Logout />
              </div>
            </header>
            <div className="w-full h-full bg-gray-100 dark:bg-[#14161d]">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
