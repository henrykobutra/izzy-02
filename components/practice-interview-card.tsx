"use client"

import { useInterviewSessions } from "@/hooks/interview-sessions/useInterviewSessions"
import Link from "next/link"
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ChevronRight, CalendarClock, CheckSquare, Tag, ListChecks } from "lucide-react"

export function PracticeInterviewCard() {
  const { hasSessions, sessions, loading } = useInterviewSessions()
  
  // Calculate total completed sessions
  const completedSessions = sessions.filter(session => session.status === "completed").length
  const totalSessions = sessions.length
  
  // Get most recent session date
  const sortedSessions = [...sessions].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
    return dateB - dateA
  })
  
  const lastPracticeDays = sortedSessions.length > 0 && sortedSessions[0].created_at
    ? Math.floor((new Date().getTime() - new Date(sortedSessions[0].created_at).getTime()) / (1000 * 60 * 60 * 24))
    : null
    
  // Get unique interview types
  const interviewTypes = [...new Set(sessions.map(s => s.interview_type))].filter(Boolean)
  
  // Get total topics covered
  const allTopics = sessions.flatMap(s => s.topics_covered || [])
  const uniqueTopics = [...new Set(allTopics)]
  const topicsCount = uniqueTopics.length

  return (
    <Card className="@container flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardDescription>Practice Interviews</CardDescription>
          {hasSessions && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
              {completedSessions} {completedSessions === 1 ? 'Session' : 'Sessions'}
            </Badge>
          )}
        </div>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {loading ? (
            "Loading..."
          ) : hasSessions ? (
            <>Simulated Interview Practice</>
          ) : (
            <>Start Your First Practice</>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-0 flex-grow">
        {!loading && hasSessions && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <CheckSquare className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {completedSessions}/{totalSessions} interviews completed
              </span>
            </div>
            
            {lastPracticeDays !== null && (
              <div className="flex items-center gap-1">
                <CalendarClock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {lastPracticeDays === 0 
                    ? "Practiced today" 
                    : lastPracticeDays === 1 
                      ? "Last practice: yesterday" 
                      : `Last practice: ${lastPracticeDays} days ago`}
                </span>
              </div>
            )}
            
            {interviewTypes.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {interviewTypes.length === 1 
                    ? `${interviewTypes[0].charAt(0).toUpperCase() + interviewTypes[0].slice(1)} interviews` 
                    : `${interviewTypes.length} interview types`}
                </span>
              </div>
            )}
            
            {topicsCount > 0 && (
              <div className="flex items-center gap-1">
                <ListChecks className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {topicsCount} topic{topicsCount !== 1 ? 's' : ''} covered
                </span>
              </div>
            )}
          </div>
        )}
        
        {!loading && !hasSessions && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            Get real-time feedback with AI-powered interviews
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-3 pb-3">
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link 
            href="/dashboard/practice-interview" 
            className="flex items-center justify-center gap-1"
          >
            <Play className="h-3 w-3" />
            <span>{hasSessions ? "Practice More" : "Start Practice"}</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
