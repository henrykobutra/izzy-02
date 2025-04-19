"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconMessage,
  IconRefresh,
  IconReport,
  IconSettings,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
  navClouds: [
    {
      title: "My Interviews",
      icon: IconFolder,
      url: "/dashboard/my-interviews",
      items: [
        {
          title: "Recent Interviews",
          url: "/dashboard/my-interviews/recent",
        },
        {
          title: "Archived",
          url: "/dashboard/my-interviews/archived",
        },
      ],
    },
    {
      title: "Resources",
      icon: IconDatabase,
      url: "/dashboard/resources",
      items: [
        {
          title: "Job Descriptions",
          url: "/dashboard/resources/job-descriptions",
        },
        {
          title: "Interview Guides",
          url: "/dashboard/resources/guides",
        },
      ],
    },
    {
      title: "AI Assistance",
      icon: IconFileAi,
      url: "/dashboard/ai-assistance",
      items: [
        {
          title: "Resume Analyzer",
          url: "/dashboard/ai-assistance/resume",
        },
        {
          title: "Answer Formatter",
          url: "/dashboard/ai-assistance/formatter",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "FAQ",
      url: "/dashboard/faq",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
