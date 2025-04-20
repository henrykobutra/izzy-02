import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Your Interview Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Track your progress and prepare for your next interview
        </p>
      </div>
      
      <SectionCards />
      
      <div>
        <div className="px-4 lg:px-6 mb-2">
          <h2 className="text-xl font-semibold tracking-tight">Recent Interviews</h2>
          <p className="text-muted-foreground">Your latest practice sessions and their results</p>
        </div>
        <DataTable data={data} />
      </div>
    </div>
  )
}