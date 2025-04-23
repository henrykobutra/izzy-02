"use client"

import { useFeedback } from "@/hooks/feedback/useFeedback"
import { useUser } from "@/hooks/users/useUser"
import Link from "next/link"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ChevronRight, BarChart3 } from "lucide-react"

export function FeedbackCard() {
  const { userId } = useUser()
  const { 
    hasFeedback, 
    feedbackData, 
    isLoading, 
    sessionsReadyForFeedback,
    loadingReadySessions
  } = useFeedback(userId)
  
  // Count total feedback items and sessions ready for feedback
  const totalFeedbacks = feedbackData.length
  const totalReady = sessionsReadyForFeedback.length
  
  // Determine the status text based on data
  const statusText = totalReady > 0
    ? `${totalReady} session${totalReady !== 1 ? 's' : ''} ready for feedback`
    : hasFeedback
      ? `${totalFeedbacks} interview evaluation${totalFeedbacks !== 1 ? 's' : ''}`
      : "No evaluations yet"

  return (
    <Card className="@container">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardDescription>Feedback & Evaluations</CardDescription>
          {(hasFeedback || totalReady > 0) && (
            <Badge 
              variant="secondary" 
              className={totalReady > 0 
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
              }
            >
              {totalReady > 0 ? "New Available" : `${totalFeedbacks} Total`}
            </Badge>
          )}
        </div>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {isLoading || loadingReadySessions ? (
            "Loading..."
          ) : totalReady > 0 ? (
            <>Feedback Ready to Generate</>
          ) : hasFeedback ? (
            <>Interview Performance</>
          ) : (
            <>No Feedback Yet</>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {isLoading || loadingReadySessions ? (
            "Checking feedback status..."
          ) : totalReady > 0 ? (
            `Generate detailed feedback for ${totalReady} completed interview${totalReady !== 1 ? 's' : ''}`
          ) : hasFeedback ? (
            "Track progress and identify improvement areas"
          ) : (
            "Complete practice interviews to receive evaluations"
          )}
        </p>
        <Button variant="outline" size="sm" asChild className="mt-2">
          <Link 
            href="/dashboard/feedback" 
            className="flex items-center gap-1"
          >
            {totalReady > 0 ? (
              <>
                <FileText className="h-3 w-3" />
                <span>Generate Feedback</span>
              </>
            ) : hasFeedback ? (
              <>
                <BarChart3 className="h-3 w-3" />
                <span>View Evaluations</span>
              </>
            ) : (
              <>
                <FileText className="h-3 w-3" />
                <span>Check Feedback</span>
              </>
            )}
            <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
