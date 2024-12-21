import { useState } from "react";
import ConfigureRoles from "@/components/admin/configureroles";
import BlacklistUsers from "@/components/admin/blacklistuser";
import AddCourse from "@/components/admin/addcourse";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Page() {
  const [role, setRole] = useState<string | null>("ADMIN"); // Admin role check
  const [currentView, setCurrentView] = useState<string>("dashboard"); // Default view

  // Map view names to components
  const views: { [key: string]: JSX.Element } = {
    dashboard: (
      <div className="text-gray-600">
        Welcome to the Admin Dashboard. Select a functionality to get started.
      </div>
    ),
    "add-course": <AddCourse />,
    "configure-roles": <ConfigureRoles />,
    "blacklist-users": <BlacklistUsers />,
  };

  if (role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar onFunctionSelect={setCurrentView} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Admin Panel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {currentView.replace("-", " ").toUpperCase()}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Frequently Used Actions */}
          <h2 className="text-lg font-semibold">Frequently Used</h2>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div
              className="aspect-video bg-green-800 text-white rounded-xl p-4 cursor-pointer"
              onClick={() => setCurrentView("add-course")}
            >
              <h3 className="text-lg font-semibold">Add Course +</h3>
              <p className="text-sm">Click here to add a new course.</p>
            </div>
            <div
              className="aspect-video bg-red-800 text-white rounded-xl p-4 cursor-pointer"
              onClick={() => setCurrentView("configure-roles")}
            >
              <h3 className="text-lg font-semibold">Configure Roles</h3>
              <p className="text-sm">Click here to configure roles.</p>
            </div>
            <div
              className="aspect-video bg-stone-900 text-white rounded-xl p-4 cursor-pointer"
              onClick={() => setCurrentView("blacklist-users")}
            >
              <h3 className="text-lg font-semibold">Blacklist Users 🚫</h3>
              <p className="text-sm">Click here to blacklist users.</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
            {views[currentView] || <p className="text-gray-600">Page not found</p>}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}