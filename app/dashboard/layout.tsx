"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
          
          {/* App Footer */}
          <footer className="border-t border-border/20 py-3 px-6">
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground/40">
              <div>&copy; Izzy AI 2025 <a href="https://kobutra.com" className="hover:text-muted-foreground transition-colors">Henry Kobutra</a></div>
              <div className="flex items-center gap-2">
                <a href="/terms" className="hover:text-muted-foreground transition-colors">Terms</a>
                <span className="text-border/30">•</span>
                <a href="/privacy" className="hover:text-muted-foreground transition-colors">Privacy</a>
                <span className="text-border/30">•</span>
                <a href="/about" className="hover:text-muted-foreground transition-colors">About</a>
                <span className="text-border/30">•</span>
                <a href="https://github.com/henrykobutra" className="hover:text-muted-foreground transition-colors">GitHub</a>
              </div>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}