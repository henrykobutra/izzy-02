"use client"

import React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle, Award, Briefcase, BarChart, Clock, Target } from "lucide-react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { getFeedback } from "@/services/database/feedback/getFeedback"
import type { FeedbackWithMetadata } from "@/types/interview-feedback"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

/**
 * Formats a date into a readable string
 * @param date The date to format
 * @returns Formatted date string (e.g. "April 23, 2025")
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Helper function to get gradient based on score
const getScoreGradient = (score: number): string => {
  if (score >= 80) return "from-emerald-500/20 to-emerald-600/30"
  if (score >= 60) return "from-amber-500/20 to-amber-600/30"
  return "from-red-500/20 to-red-600/30"
}

// Helper function to get color based on score
const getScoreColor = (score: number): string => {
  if (score >= 80) return "text-emerald-500"
  if (score >= 60) return "text-amber-500"
  return "text-red-500"
}

// Updated type definition for Next.js params
interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function FeedbackDetailPage({ params }: PageProps) {
  // Unwrap params Promise with React.use()
  const { id } = React.use(params)
  
  const [feedback, setFeedback] = useState<FeedbackWithMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        setLoading(true)
        const feedbackData = await getFeedback(id)
        
        if (!feedbackData) {
          setError("Feedback not found")
        } else {
          setFeedback(feedbackData)
        }
      } catch (err) {
        setError("Error loading feedback")
        console.error("Error loading feedback:", err)
      } finally {
        setLoading(false)
      }
    }

    loadFeedback()
  }, [id])

  // Handle loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h3 className="text-lg font-medium">Loading Feedback</h3>
          <p className="text-muted-foreground text-sm max-w-md text-center">
            Please wait while we retrieve your interview feedback...
          </p>
        </div>
      </div>
    )
  }

  // Handle error state
  if (error || !feedback) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h3 className="text-lg font-medium">Error Loading Feedback</h3>
          <p className="text-muted-foreground text-sm">
            {error || "There was a problem loading your feedback. Please try again later."}
          </p>
          <Button asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Format date for display
  const formattedDate = feedback.created_at ? formatDate(new Date(feedback.created_at)) : "Unknown"

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 pb-20">
        {/* Back button */}
        <div className="mb-6 flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1" aria-label="Back to dashboard">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        {/* Hero section with interview details and score */}
        <div className={`rounded-xl bg-gradient-to-br ${getScoreGradient(feedback.overall_score)} p-4 sm:p-6 md:p-8 mb-8 shadow-sm overflow-hidden`}>
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 justify-between">
            <div className="space-y-3 md:space-y-4 w-full">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Badge className="px-2 py-1">
                  Interview Feedback
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {formattedDate}
                </span>
                {feedback.interview_sessions?.job_title && (
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    {feedback.interview_sessions.job_title}
                  </span>
                )}
              </div>
              
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Interview Performance</h1>
                {feedback.interview_sessions?.job_title && (
                  <p className="text-lg font-medium flex items-center gap-2 mb-4">
                    <Briefcase className="h-5 w-5" aria-hidden="true" />
                    {feedback.interview_sessions.interview_type} Interview
                  </p>
                )}
                <p className="text-muted-foreground line-clamp-3">
                  {feedback.feedback_summary}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full lg:w-auto lg:min-w-[250px]">
              <div className="bg-card rounded-lg p-4 sm:p-6 shadow-sm border border-border/50">
                <div className="flex flex-col items-center mb-3">
                  <h3 className="text-xl font-bold mb-2 sm:mb-4">Performance Score</h3>
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center mb-2">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        className="text-muted/20" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        strokeDasharray={`${feedback.overall_score * 2.83} 283`} 
                        strokeDashoffset="0" 
                        strokeLinecap="round" 
                        className={getScoreColor(feedback.overall_score)} 
                        transform="rotate(-90 50 50)" 
                      />
                      <text 
                        x="50" 
                        y="55" 
                        textAnchor="middle" 
                        fontSize="22" 
                        fontWeight="bold" 
                        fill="currentColor"
                      >
                        {feedback.overall_score}%
                      </text>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-medium">Overall Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Breakdown */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Skills Assessment</CardTitle>
            <CardDescription>Breakdown of your performance by skill category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedback.skills_breakdown.map((skill, index) => (
                <Collapsible key={index} className="w-full border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <BarChart className={cn("h-5 w-5", getScoreColor(skill.score))} />
                      <div>
                        <p className="font-medium">{skill.skill}</p>
                        <div className="flex items-center mt-1">
                          <Progress value={skill.score} className="h-2 w-48" />
                          <span className="ml-3 text-sm text-muted-foreground">{skill.score}/100</span>
                        </div>
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Toggle</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-4">
                    <div className="text-sm text-muted-foreground">{skill.feedback}</div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvement Suggestions */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Areas to Improve</CardTitle>
            <CardDescription>Points to focus on for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedback.areas_for_improvement.map((area, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-0.5">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{area.topic}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strengths */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Key Strengths</CardTitle>
            <CardDescription>Areas where you performed well</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedback.strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-0.5">
                    <Award className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{strength.trait}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{strength.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}