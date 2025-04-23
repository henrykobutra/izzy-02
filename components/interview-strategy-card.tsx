"use client"

import { useStrategies } from "@/hooks/strategies/useStrategies"
import Link from "next/link"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, ChevronRight, Plus } from "lucide-react"

export function InterviewStrategyCard() {
  const { hasStrategies, strategies, loading } = useStrategies()
  
  const strategiesCount = strategies.length

  return (
    <Card className="@container">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardDescription>Interview Strategy</CardDescription>
          {hasStrategies && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {strategiesCount} {strategiesCount === 1 ? 'Strategy' : 'Strategies'}
            </Badge>
          )}
        </div>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {loading ? (
            "Loading..."
          ) : hasStrategies ? (
            <>Job-Tailored Strategies</>
          ) : (
            <>Create Your First Strategy</>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {hasStrategies 
            ? "Personalized interview prep based on your target jobs" 
            : "Analyze job postings to get customized interview guidance"}
        </p>
        <Button variant="outline" size="sm" asChild className="mt-2">
          <Link 
            href="/dashboard/interview-strategy" 
            className="flex items-center gap-1"
          >
            {hasStrategies ? (
              <>
                <span>View Strategies</span>
                <ChevronRight className="h-3 w-3" />
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" />
                <span>Create Strategy</span>
              </>
            )}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
