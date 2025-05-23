"use client"

import {
  IconDotsVertical,
  IconLogout,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
import { useState, useEffect } from "react"

export function NavUser({
  user,
  loading = false,
}: {
  user?: {
    name: string
    email: string
    avatar: string
  }
  loading?: boolean
}) {
  const { isMobile } = useSidebar()
  const { isSigningOut } = useAuth()
  const [displayName, setDisplayName] = useState<string>("User")
  const [initials, setInitials] = useState<string>("UN")

  // Set display name and initials when user changes
  useEffect(() => {
    if (user?.name) {
      setDisplayName(user.name)
      // Generate initials from name (up to 2 characters)
      const nameInitials = user.name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      setInitials(nameInitials || 'UN');
    }
  }, [user]);

  // Loader steps for signout
  const signOutSteps = [
    { text: "Signing you out..." },
    { text: "Clearing your session" },
    { text: "Redirecting to login" },
  ];

  return (
    <>
      {isSigningOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <MultiStepLoader loadingStates={signOutSteps} loading={true} duration={1200} loop={false} />
        </div>
      )}
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {/* Always render both versions but hide one with CSS to prevent hydration mismatch */}
                <div className={loading ? "block" : "hidden"}>
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="ml-auto h-4 w-4" />
                </div>
                <div className={loading ? "hidden" : "flex items-center w-full"}>
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage src={user?.avatar} alt={displayName} />
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                    <span className="truncate font-medium">{displayName}</span>
                    <span className="truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                  <IconDotsVertical className="ml-auto size-4" />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className={loading ? "flex items-center gap-2 w-full" : "hidden"}>
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className={loading ? "hidden" : "flex items-center w-full"}>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar} alt={displayName} />
                      <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                      <span className="truncate font-medium">{displayName}</span>
                      <span className="text-muted-foreground truncate text-xs">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className={loading ? "block" : "hidden"}>
                {/* Skeleton menu items */}
                <DropdownMenuGroup>
                  <div className="flex items-center gap-2 px-2 py-1.5">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <DropdownMenuSeparator />
                  <div className="flex items-center gap-2 px-2 py-1.5">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </DropdownMenuGroup>
              </div>
              <div className={loading ? "hidden" : "block"}>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/account">
                      <IconUserCircle />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <IconSettings />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer"
                >
                  <Link href="/signout" prefetch={false}>
                    <IconLogout className="h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
