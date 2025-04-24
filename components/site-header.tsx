"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export function SiteHeader() {
  const pathname = usePathname()

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

      // Check if the last segment is a UUID
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lastSegment)) {
        // Get the previous segment (if it exists)
        if (segments.length > 1) {
          const prevSegment = segments[segments.length - 2]

          // Special case for feedback path
          if (prevSegment === "feedback") {
            return "Evaluation"
          }

          // For hyphenated paths, take only the last part
          const parts = prevSegment.split('-')
          const lastPart = parts[parts.length - 1]

          // Convert to singular form (simple rule: remove trailing 's')
          const singularForm = lastPart.endsWith('s')
            ? lastPart.slice(0, -1)
            : lastPart

          return singularForm.charAt(0).toUpperCase() + singularForm.slice(1)
        }
      }

      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ')
    }

    return "Dashboard"
  }

  // Generate breadcrumb items from the path
  const generateBreadcrumbs = () => {
    if (!pathname) return []

    const segments = pathname.split('/').filter(Boolean)

    // Handle the dashboard root case differently
    if (segments.length === 1 && segments[0] === "dashboard") {
      return []
    }

    // Create breadcrumb items for intermediate paths (skip the first segment which is "dashboard")
    const breadcrumbs = []

    // Add items for each segment except the last one
    for (let i = 1; i < segments.length - 1; i++) {
      const segment = segments[i]
      const path = `/${segments.slice(0, i + 1).join('/')}`

      // Capitalize each word in hyphenated paths
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({ label, path })
    }

    return breadcrumbs
  }

  const title = getPageTitle()
  const breadcrumbs = generateBreadcrumbs()
  const isDashboardRoot = pathname === "/dashboard"

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)] capitalize">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center">
          <Breadcrumb className="flex">
            <BreadcrumbList>
              {/* For Dashboard root, show just one item */}
              {isDashboardRoot ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
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
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Right side content can go here */}
        </div>
      </div>
    </header>
  )
}