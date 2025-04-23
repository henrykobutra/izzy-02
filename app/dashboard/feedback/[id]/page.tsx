"use client"

import React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle, Award, Briefcase, BarChart, Clock } from "lucide-react"
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
    <div className="container max-w-5xl py-6 space-y-6">
      {/* Back button */}
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Interview Feedback</h1>
        <p className="text-muted-foreground">
          Review your detailed interview performance analysis
        </p>
      </div>

      {/* Overall Score Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Overall Performance</CardTitle>
              <CardDescription>Analysis of your interview performance</CardDescription>
            </div>
            <Badge 
              variant={feedback.overall_score >= 80 ? "success" : feedback.overall_score >= 60 ? "warning" : "destructive"}
              className="text-md px-3 py-1"
            >
              Score: {feedback.overall_score}/100
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="pt-4">
            <p className="text-muted-foreground pb-4">{feedback.feedback_summary}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Generated on {formattedDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Skills Assessment</CardTitle>
          <CardDescription>Breakdown of your performance by skill category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {feedback.skills_breakdown.map((skill, index) => (
              <Collapsible key={index} className="w-full border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <BarChart className="h-5 w-5 text-primary" />
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

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              <CardTitle>Strengths</CardTitle>
            </div>
            <CardDescription>Areas where you performed well</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedback.strengths.map((strength, index) => (
                <div key={index} className="border-l-2 border-green-500 pl-4 py-2">
                  <h4 className="font-medium">{strength.trait}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{strength.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <CardTitle>Areas to Improve</CardTitle>
            </div>
            <CardDescription>Points to focus on for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedback.weaknesses.map((weakness, index) => (
                <div key={index} className="border-l-2 border-amber-500 pl-4 py-2">
                  <h4 className="font-medium">{weakness.trait}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{weakness.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Improvement Plan */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            <CardTitle>Action Plan</CardTitle>
          </div>
          <CardDescription>Recommended steps to improve your interview performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {feedback.areas_for_improvement.map((area, index) => (
              <Collapsible key={index} className="w-full border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{area.topic}</h4>
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
                  <div className="text-sm text-muted-foreground">{area.description}</div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Confidence */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mt-4 border-t pt-4">
        <span>Analysis Confidence Score: {feedback.confidence_score}%</span>
        <span>Session ID: {feedback.session_id}</span>
      </div>
    </div>
  )
}