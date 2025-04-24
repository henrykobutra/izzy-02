"use client"

import { usePathname } from "next/navigation"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()

  // Function to determine if an item should be active based on pathname
  const isItemActive = (itemUrl: string) => {
    // For the dashboard specifically, only activate when exactly on /dashboard
    if (itemUrl === "/dashboard") {
      return pathname === "/dashboard"
    }

    // For other items, activate when pathname exactly matches or is a direct subpath
    return pathname === itemUrl || (
      pathname.startsWith(`${itemUrl}/`) &&
      // Make sure a parent path doesn't match when on a child path
      // e.g., don't highlight "dashboard" when on "dashboard/profile-analysis"
      !items.some(item =>
        item.url !== itemUrl &&
        pathname.startsWith(`${item.url}/`)
      )
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <div className="border-b border-sidebar-border opacity-50 mb-4"></div>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = isItemActive(item.url)

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild isActive={isActive}>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}