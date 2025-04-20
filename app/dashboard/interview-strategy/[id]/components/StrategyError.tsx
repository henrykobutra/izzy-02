import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle } from "lucide-react"

interface StrategyErrorProps {
  error: string
}

export function StrategyError({ error }: StrategyErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center max-w-md text-center mb-6">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold tracking-tight mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Link href="/dashboard/interview-strategy">
          <Button variant="default" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Strategies
          </Button>
        </Link>
      </div>
    </div>
  )
}
