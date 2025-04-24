"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconChartBar,
  IconDashboard,
  IconFileDescription,
  IconListDetails,
  IconMessage,
  IconMicrophone,
  IconSparkles,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import Link from "next/link"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUser } from "@/hooks/use-user"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Profile Analysis",
      url: "/dashboard/profile-analysis",
      icon: IconFileDescription,
    },
    {
      title: "Interview Strategy",
      url: "/dashboard/interview-strategy",
      icon: IconListDetails,
    },
    {
      title: "Practice Interview",
      url: "/dashboard/practice-interview",
      icon: IconMessage,
    },
    {
      title: "Feedback & Evaluation",
      url: "/dashboard/feedback",
      icon: IconChartBar,
    },
  ],

  navSecondary: [
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useUser();

  // Default user data for fallback when loading or no user
  const defaultUser = {
    name: "Guest User",
    email: "guest@example.com",
    avatar: "",
  };

  // Use actual user data or fallback
  const userData = user ? {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  } : defaultUser;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="p-1.5">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Izzy AI Logo"
                  width={40}
                  height={40}
                  className="mr-3"
                  priority
                  unoptimized
                />
                <div className="flex flex-col">
                  <span className="text-base font-semibold">Izzy AI</span>
                  <span className="text-xs text-muted-foreground -mt-0.5">Interview Preparation Assistant</span>
                </div>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/dashboard/practice-interview">
            <Button className="cursor-pointer w-full mt-2" variant="outline"><IconMicrophone />Quick Interview</Button>
          </Link>
        </SidebarGroup>
        <NavMain items={data.navMain} />
        <SidebarGroup className="mt-auto">
          <div className="px-3 py-2 text-xs">
            <Badge variant="outline" className="bg-yellow-800 text-yellow-100 border-yellow-600 mb-2 font-medium">Educational Review</Badge>
            <p className="text-muted-foreground mb-2">
              This is an educational review project. It may contain bugs and issues.
              AI can get things wrong, always review the results.
            </p>
            <p className="text-muted-foreground mb-2 text-[11px]">
              Finals project for the Deep Learning class taught by Prof. Patricia McManus, Spring Term 2025, at HCC.
            </p>
            <div className="border-t pt-2 mt-1">
              <p className="font-medium mb-1">Project by Henry Kobutra</p>
              <div className="flex flex-col gap-1">
                <a 
                  href="https://www.linkedin.com/in/henrykobutra/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/henrykobutra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>
                <a 
                  href="https://kobutra.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  kobutra.com
                </a>
              </div>
              <div className="flex items-center mt-3 text-[10px] text-muted-foreground">
                <IconSparkles size={12} className="mr-1" />
                Built with Coffee in Houston, TX
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} loading={loading} />
      </SidebarFooter>
    </Sidebar>
  )
}
