import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Admin Functions",
      url: "#",
      items: [
        {
          title: "Configure Roles",
          key: "configure-roles", // Unique key for identifying functionality
        },
        {
          title: "Blacklist Users",
          key: "blacklist-users",
        },
      ],
    },
    {
      title: "Courses",
      url: "#",
      items: [
        {
          title: "Add Course",
          key: "add-course",
        },
        {
          title: "Update Course",
          key: "update-course",
        },
        {
          title: "Delete Course",
          key: "delete-course",
        },
      ],
    },
    {
      title: "Lessons",
      url: "#",
      items: [
        {
          title: "Add Lesson",
          key: "add-lesson",
        },
        {
          title: "Update Lesson",
          key: "update-lesson",
        },
        {
          title: "Delete Lesson",
          key: "delete-lesson",
        },
      ],
    },
  ],
};

export function AppSidebar({
  onFunctionSelect,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onFunctionSelect: (key: string) => void;
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <p className="text-center font-bold">Admin Dashboard</p>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.key}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => onFunctionSelect(subItem.key)}
                    >
                      <button>{subItem.title}</button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
