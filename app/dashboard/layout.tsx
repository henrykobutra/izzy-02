import { Metadata } from "next"
import { ClientDashboardLayout } from "@/components/client-dashboard-layout"

// Default metadata for the dashboard
export const metadata: Metadata = {
  title: "Interview Dashboard | Izzy AI",
  description: "Track your progress and prepare for your next interview with Izzy AI"
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientDashboardLayout>{children}</ClientDashboardLayout>
}