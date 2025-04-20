import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export function StrategyLoader() {
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto px-4 pb-20">
      <div className="mb-8 flex items-center">
        <Link href="/dashboard/interview-strategy">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Strategies</span>
          </Button>
        </Link>
      </div>
      
      <div className="rounded-xl bg-gradient-to-br from-muted/50 to-muted p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <div className="space-y-4">
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-24 w-48" />
          </div>
        </div>
      </div>
      
      <Skeleton className="h-12 w-72 mb-8" />
      
      <div className="grid grid-cols-1 gap-8">
        <Skeleton className="h-[300px] w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    </div>
  )
}
