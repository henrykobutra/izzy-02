"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function SiteHeader() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)
  
  // Set mounted state to true after component mounts
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  // Get page title from pathname
  const getPageTitle = () => {
    if (!pathname) return "Dashboard"
    
    const segments = pathname.split('/').filter(Boolean)
    
    // If we're at the root dashboard, just show "Dashboard"
    if (segments.length === 1 && segments[0] === "dashboard") {
      return "Dashboard"
    }
    
    // Otherwise, use the last segment as the page title
    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1]
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ')
    }
    
    return "Dashboard"
  }
  
  // Generate breadcrumb items from the path
  const generateBreadcrumbs = () => {
    if (!pathname) return []
    
    const segments = pathname.split('/').filter(Boolean)
    
    // If we're on the dashboard page or have less than 2 segments, don't show breadcrumbs
    if (segments.length <= 1) return []
    
    // Create breadcrumb items for intermediate paths (skip the first segment which is "dashboard")
    const breadcrumbs = []
    
    // Add items for each segment except the last one
    for (let i = 1; i < segments.length - 1; i++) {
      const segment = segments[i]
      const path = `/${segments.slice(0, i + 1).join('/')}`
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      breadcrumbs.push({ label, path })
    }
    
    return breadcrumbs
  }
  
  const title = getPageTitle()
  const breadcrumbs = generateBreadcrumbs()
  const showBreadcrumbs = breadcrumbs.length > 0
  
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        
        {/* Always render both versions but show/hide with CSS to avoid hydration mismatch */}
        <div className="flex items-center">
          {/* Title only version */}
          <h1 
            className={`text-base font-medium ${mounted && showBreadcrumbs ? 'hidden' : 'block'}`}
          >
            {title}
          </h1>
          
          {/* Breadcrumb version */}
          <div className={mounted && showBreadcrumbs ? 'block' : 'hidden'}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                
                {breadcrumbs.map((breadcrumb) => (
                  <React.Fragment key={breadcrumb.path}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={breadcrumb.path}>
                        {breadcrumb.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
                
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          {/* Right side content can go here */}
        </div>
      </div>
    </header>
  )
}