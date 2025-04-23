"use client"

import { useFeedback } from "@/hooks/feedback/useFeedback"
import { useUser } from "@/hooks/users/useUser"
import Link from "next/link"
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ChevronRight, BarChart3, Lightbulb, TrendingUp, LineChart, Check } from "lucide-react"

export function FeedbackCard() {
  const { userId } = useUser()
  const { 
    hasFeedback, 
    feedbackData, 
    isLoading, 
    sessionsReadyForFeedback,
    loadingReadySessions,
    improvementAreas
  } = useFeedback(userId)
  
  // Count total feedback items and sessions ready for feedback
  const totalFeedbacks = feedbackData.length
  const totalReady = sessionsReadyForFeedback.length
  
  // Calculate average score across all feedbacks
  const avgScore = feedbackData.length > 0
    ? Math.round(feedbackData.reduce((sum, fb) => sum + fb.overall_score, 0) / feedbackData.length)
    : 0
  
  // Get the latest feedback date
  const latestFeedback = feedbackData.length > 0
    ? [...feedbackData].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
    : null
    
  // Count total strengths and areas for improvement across all feedback
  const totalStrengths = feedbackData.reduce((sum, fb) => sum + (fb.strengths?.length || 0), 0)
  const totalImprovements = feedbackData.reduce((sum, fb) => sum + (fb.areas_for_improvement?.length || 0), 0)

  return (
    <Card className="@container flex flex-col">
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
      <CardContent className="pt-0 pb-0 flex-grow">
        {!isLoading && !loadingReadySessions && (
          <div className="flex flex-col gap-1.5">
            {totalReady > 0 && (
              <div className="flex items-center gap-1">
                <Check className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {`${totalReady} interview${totalReady !== 1 ? 's' : ''} ready for feedback`}
                </span>
              </div>
            )}
            
            {hasFeedback && avgScore > 0 && (
              <div className="flex items-center gap-1">
                <LineChart className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {`${avgScore}% average interview score`}
                </span>
              </div>
            )}
            
            {hasFeedback && totalStrengths > 0 && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {`${totalStrengths} identified strength${totalStrengths !== 1 ? 's' : ''}`}
                </span>
              </div>
            )}
            
            {hasFeedback && totalImprovements > 0 && (
              <div className="flex items-center gap-1">
                <Lightbulb className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {`${totalImprovements} improvement area${totalImprovements !== 1 ? 's' : ''}`}
                </span>
              </div>
            )}
            
            {!hasFeedback && totalReady === 0 && (
              <p className="text-xs text-muted-foreground">
                Complete practice interviews to receive evaluations
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-3 pb-3">
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link 
            href="/dashboard/feedback" 
            className="flex items-center justify-center gap-1"
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
      </CardFooter>
    </Card>
  )
}
