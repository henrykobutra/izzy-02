"use client"

import { useInterviewSessions } from "@/hooks/interview-sessions/useInterviewSessions"
import Link from "next/link"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ChevronRight } from "lucide-react"

export function PracticeInterviewCard() {
  const { hasSessions, sessions, loading } = useInterviewSessions()
  
  // Calculate total completed sessions
  const completedSessions = sessions.filter(session => session.status === "completed").length
  const totalSessions = sessions.length
  
  // Show completed ratio if any sessions
  const completionText = hasSessions
    ? `${completedSessions}/${totalSessions} completed sessions`
    : "Get real-time feedback with AI-powered interviews"

  return (
    <Card className="@container">
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
      <CardContent className="pt-0 pb-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {completionText}
        </p>
        <Button variant="outline" size="sm" asChild className="mt-2">
          <Link 
            href="/dashboard/practice-interview" 
            className="flex items-center gap-1"
          >
            <Play className="h-3 w-3" />
            <span>{hasSessions ? "Practice More" : "Start Practice"}</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
