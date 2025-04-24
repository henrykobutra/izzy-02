"use client"

import React from "react"
import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  MessageSquare,
  Code,
  Compass as CompassIcon,
  FileText,
  User,
  FileEdit,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { getFeedbackBySessionId } from "@/services/database/feedback/getFeedback"
import type { FeedbackWithMetadata } from "@/types/interview-feedback"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { getScoreBarColor, getScoreLabel, getScoreGradient } from "@/utils/score-utils"
import { getSkillIconComponent, getSkillColor, feedbackIcons, itemIndicatorIcons, metadataIcons } from "@/utils/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/hooks/users/useUser"
import { Badge } from "@/components/ui/badge"
import { getSessionById } from "@/services/database/interviews/getSessions"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
import { feedbackGenerationLoadingStates } from "@/constants/loadingStates"
import { generateAndSaveFeedback } from "@/services/feedback/generateAndSaveFeedback"
import { toast } from "sonner"
import type { InterviewSession } from "@/types/interview-session"

/**
 * Formats a date into a readable string
 * @param date The date to format
 * @returns Formatted date string (e.g. "April 23, 2025")
 */
// Removed custom formatDate function

// Updated type definition for Next.js params
interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function FeedbackDetailPage({ params }: PageProps) {
  // Unwrap params Promise with React.use()
  const { id } = React.use(params)

  const [feedbackList, setFeedbackList] = useState<FeedbackWithMetadata[]>([])
  const [currentFeedback, setCurrentFeedback] = useState<FeedbackWithMetadata | null>(null)
  const [sessionData, setSessionData] = useState<InterviewSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [generatingFeedback, setGeneratingFeedback] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<Record<string, unknown> | null>(null)
  const { userId, firstName } = useUser()

  const loadFeedback = useCallback(async () => {
    try {
      setLoading(true)
      // We're now using the session ID to fetch feedback
      const feedbackData = await getFeedbackBySessionId(id)

      if (!feedbackData || feedbackData.length === 0) {
        // If no feedback found, try to get the session data
        const session = await getSessionById(id)

        if (!session) {
          setError("No interview session found with this ID")
        } else {
          setSessionData(session)
          setError(null) // Clear error since we found a session
        }
      } else {
        setFeedbackList(feedbackData)
        // Set the first feedback as the current one by default
        setCurrentFeedback(feedbackData[0])

        // We don't need to separately fetch the transcript anymore
        // as it's included in the interview_sessions data
        if (feedbackData[0].interview_sessions?.transcript) {
          setTranscript(feedbackData[0].interview_sessions.transcript)
        }
      }
    } catch (err) {
      setError("Error loading feedback")
      console.error("Error loading feedback:", err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadFeedback()
  }, [id, loadFeedback])

  // Function to select a specific feedback
  const selectFeedback = (feedback: FeedbackWithMetadata) => {
    setCurrentFeedback(feedback)
    if (feedback.interview_sessions?.transcript) {
      setTranscript(feedback.interview_sessions.transcript)
    }
  }

  // Function to handle feedback generation
  const handleGenerateFeedback = async () => {
    if (!userId || !sessionData) return

    try {
      setGeneratingFeedback(true)

      // Generate feedback and save to database
      await generateAndSaveFeedback(id, userId)

      toast.success("Feedback generated successfully!", {
        description: "Your interview feedback is ready to view",
      })

      // Reload feedback data
      await loadFeedback()

    } catch (error) {
      console.error("Error generating feedback:", error)
      toast.error("Error generating feedback", {
        description: "There was a problem analyzing your interview. Please try again.",
      })
    } finally {
      setGeneratingFeedback(false)
    }
  }

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

  // Handle case where we have session data but no feedback yet
  if (sessionData && !currentFeedback) {
    return (
      <div className="flex flex-col w-full overflow-x-hidden">
        <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 pb-20">
          {/* Multi-Step Loader for feedback generation */}
          <MultiStepLoader
            loadingStates={feedbackGenerationLoadingStates}
            loading={generatingFeedback}
            duration={1800}
            loop={false}
          />

          {/* Back button */}
          <div className="mb-6 flex items-center">
            <Link href="/dashboard/feedback">
              <Button variant="ghost" size="sm" className="gap-1 cursor-pointer" aria-label="Back to Feedback & Evaluation">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Feedback & Evaluation</span>
              </Button>
            </Link>
          </div>

          <Card className="mx-auto max-w-3xl border border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full">
                    <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></span>
                  </div>
                  <Sparkles className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-medium">Generate AI Feedback</CardTitle>
                  <CardDescription>Interview session ready for AI-generated feedback</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="mb-6 border rounded-lg p-4 bg-muted/20">
                <p className="text-sm font-medium mb-2">Interview Details:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <metadataIcons.jobTitle className="h-4 w-4 text-muted-foreground" />
                    <span>Position: <span className="font-medium">{sessionData.job_title || 'Unnamed Position'}</span></span>
                  </li>
                  {sessionData.created_at && (
                    <li className="flex items-center gap-2">
                      <metadataIcons.date className="h-4 w-4 text-muted-foreground" />
                      <span>Date: <span className="font-medium">{format(new Date(sessionData.created_at), 'MMMM d, yyyy')}</span></span>
                    </li>
                  )}
                  {sessionData.interview_type && (
                    <li className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>Type: <span className="font-medium">{sessionData.interview_type.charAt(0).toUpperCase() + sessionData.interview_type.slice(1)} Interview</span></span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-5 mx-auto w-fit">
                  <FileEdit className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Ready for AI Feedback</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                    Your interview session is ready for AI analysis. Generate detailed feedback on your performance including strengths, areas for improvement, and actionable recommendations.
                  </p>
                  <Button
                    onClick={handleGenerateFeedback}
                    disabled={generatingFeedback}
                    className="gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  >
                    {generatingFeedback ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    <span>Generate AI Feedback</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Handle error state
  if (error || !currentFeedback) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h3 className="text-lg font-medium">Error Loading Feedback</h3>
          <p className="text-muted-foreground text-sm">
            {error || "There was a problem loading your feedback. Please try again later."}
          </p>
          <Button asChild className="cursor-pointer">
            <Link href="/dashboard/feedback">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Feedback & Evaluation
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Format date for display
  const formattedDate = currentFeedback.created_at ? format(new Date(currentFeedback.created_at), 'MMMM d, yyyy') : "Unknown"

  // Get the appropriate icon for the interview type
  const getInterviewTypeIcon = () => {
    switch (currentFeedback.interview_sessions?.interview_type) {
      case 'behavioral':
        return <MessageSquare className="h-5 w-5" aria-hidden="true" />;
      case 'technical':
        return <Code className="h-5 w-5" aria-hidden="true" />;
      case 'comprehensive':
        return <CompassIcon className="h-5 w-5" aria-hidden="true" />;
      default:
        return <metadataIcons.interviewType className="h-5 w-5" aria-hidden="true" />;
    }
  };

  // Capitalize the interview type
  const capitalizeInterviewType = (type: string | null | undefined) => {
    if (!type) return 'Generic';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 pb-20">
        {/* Back button */}
        <div className="mb-6 flex items-center">
          <Link href="/dashboard/feedback">
            <Button variant="ghost" size="sm" className="gap-1 cursor-pointer" aria-label="Back to Feedback & Evaluation">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Feedback & Evaluation</span>
            </Button>
          </Link>
        </div>

        {/* Hero section with interview details and score */}
        <div className={`rounded-xl bg-gradient-to-br ${getScoreGradient(currentFeedback.overall_score)} p-4 sm:p-6 md:p-8 mb-8 shadow-sm overflow-hidden`}>
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 justify-between">
            <div className="space-y-3 md:space-y-4 w-full">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Badge variant="outline" className="px-2 py-1 text-muted-foreground">
                  Interview Feedback
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <metadataIcons.date className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="text-muted-foreground flex items-center gap-1.5">
                  {getInterviewTypeIcon()}
                  {capitalizeInterviewType(currentFeedback.interview_sessions?.interview_type)} Interview
                </span>
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Interview Performance</h1>
                {currentFeedback.interview_sessions?.job_title && (
                  <p className="text-lg font-medium flex items-center gap-2 mb-4">
                    <metadataIcons.jobTitle className="h-5 w-5" aria-hidden="true" />
                    {currentFeedback.interview_sessions.job_title}
                  </p>
                )}

                {/* Display feedback selector if multiple feedbacks exist */}
                {feedbackList.length > 1 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Multiple feedback entries available:</p>
                    <div className="flex flex-wrap gap-2">
                      {feedbackList.map((feedback, index) => (
                        <Button
                          key={feedback.id}
                          size="sm"
                          variant={currentFeedback.id === feedback.id ? "default" : "outline"}
                          onClick={() => selectFeedback(feedback)}
                        >
                          Feedback {index + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-muted-foreground">
                  {currentFeedback.feedback_summary}
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
                        stroke={getScoreBarColor(currentFeedback.overall_score)}
                        strokeWidth="8"
                        strokeDasharray={`${currentFeedback.overall_score * 2.83} 283`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        fontSize="22"
                        fontWeight="bold"
                        fill="currentColor"
                        dominantBaseline="middle"
                      >
                        {currentFeedback.overall_score}%
                      </text>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <metadataIcons.performance className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-medium">
                      {getScoreLabel(currentFeedback.overall_score)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Feedback and Transcript */}
        <Tabs defaultValue="feedback" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="feedback">
              <MessageSquare className="h-4 w-4 mr-2" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="transcript">
              <FileText className="h-4 w-4 mr-2" />
              Transcript
            </TabsTrigger>
          </TabsList>

          {/* Feedback Content */}
          <TabsContent value="feedback" className="space-y-8">
            {/* Skills Breakdown */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <feedbackIcons.skillsAssessment className="h-5 w-5 text-primary" />
                  <CardTitle>Skills Assessment</CardTitle>
                </div>
                <CardDescription>
                  Detailed breakdown of performance across key interview skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {currentFeedback.skills_breakdown?.map((skill) => (
                    <Collapsible key={skill.skill} className="border rounded-md px-4 py-3.5 hover:bg-muted/20 transition-colors">
                      <CollapsibleTrigger className="flex justify-between items-center w-full group">
                        <div className="flex items-center gap-2.5">
                          {(() => {
                            const SkillIcon = getSkillIconComponent(skill.skill);
                            const skillColorClass = getSkillColor(skill.skill);
                            return <SkillIcon className={cn("h-5 w-5", skillColorClass)} />;
                          })()}
                          <span className="font-medium">{skill.skill}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "font-mono font-medium text-sm px-1.5 py-0.5 rounded",
                              skill.score > 90 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" :
                                skill.score >= 80 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                                  skill.score >= 60 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                    skill.score >= 40 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                                      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            )}
                          >
                            {skill.score}%
                          </span>
                          <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors pr-1">
                            Read more
                          </span>
                          <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180">
                              <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <div className="pt-3 pb-1">
                        <div className="overflow-hidden rounded-full bg-secondary h-2.5">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              skill.score > 90 ? "bg-emerald-500 dark:bg-emerald-600" :
                                skill.score >= 80 ? "bg-green-500 dark:bg-green-600" :
                                  skill.score >= 60 ? "bg-yellow-500 dark:bg-yellow-600" :
                                    skill.score >= 40 ? "bg-amber-500 dark:bg-amber-600" :
                                      "bg-red-500 dark:bg-red-600"
                            )}
                            style={{
                              width: `${skill.score}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <CollapsibleContent className="pt-2 text-sm text-muted-foreground">
                        <p className="pb-1.5">{skill.feedback}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strengths and weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <feedbackIcons.strengths className="h-5 w-5 text-green-500" />
                    <CardTitle>Strengths</CardTitle>
                  </div>
                  <CardDescription>
                    Key areas where you demonstrated strong performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    {currentFeedback.strengths?.map((strength, index) => (
                      <div key={index} className="pb-3 space-y-1">
                        <div className="flex items-center gap-2">
                          <itemIndicatorIcons.strength className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">{strength.trait}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{strength.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weaknesses */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <feedbackIcons.areasToImprove className="h-5 w-5 text-amber-500" />
                    <CardTitle>Areas to Improve</CardTitle>
                  </div>
                  <CardDescription>
                    Opportunities for growth in your interview performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    {currentFeedback.weaknesses?.map((weakness, index) => (
                      <div key={index} className="pb-3 space-y-1">
                        <div className="flex items-center gap-2">
                          <itemIndicatorIcons.weakness className="h-4 w-4 text-amber-500" />
                          <h4 className="font-medium">{weakness.trait}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{weakness.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Improvement action items */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <feedbackIcons.actionPlan className="h-5 w-5 text-primary" />
                  <CardTitle>Action Plan</CardTitle>
                </div>
                <CardDescription>
                  Specific steps to improve your interview performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentFeedback.areas_for_improvement?.map((area, index) => (
                    <div key={index} className="flex gap-4 pb-4 last:pb-0 last:border-0">
                      <div className="flex items-center justify-center rounded-full bg-primary/10 h-8 w-8 flex-shrink-0 mt-0.5">
                        <itemIndicatorIcons.actionItem className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{area.topic}</h4>
                        <p className="text-sm text-muted-foreground">{area.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transcript Content */}
          <TabsContent value="transcript">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Interview Transcript</CardTitle>
                </div>
                <CardDescription>
                  Complete transcript of your interview session
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transcript ? (
                  <div className="space-y-4">
                    {Array.isArray(transcript) ? (
                      <div className="space-y-6">
                        {transcript
                          .filter(entry => entry.role !== "system")
                          .map((entry, index) => (
                            <div
                              key={index}
                              className={cn(
                                "flex gap-3",
                                entry.role === "assistant" ? "flex-row" : "flex-row-reverse"
                              )}
                            >
                              {/* Avatar */}
                              {entry.role === "assistant" ? (
                                <div className="h-9 w-9 overflow-hidden rounded-full relative">
                                  <Image
                                    src="/faces/izzy-avatar.png"
                                    alt="Izzy Avatar"
                                    fill
                                    sizes="36px"
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-9 w-9 bg-muted-foreground/20 text-muted-foreground flex items-center justify-center rounded-full">
                                  <User className="h-5 w-5" />
                                </div>
                              )}

                              {/* Message Content */}
                              <div className={cn(
                                "flex-1 max-w-[80%] px-4 py-3 rounded-lg",
                                entry.role === "assistant"
                                  ? "bg-primary/10 border border-primary/20 rounded-tl-none"
                                  : "bg-muted/70 border border-muted/30 rounded-tr-none self-end"
                              )}>
                                <div className="flex items-center justify-between mb-1">
                                  <div className="font-medium text-sm">
                                    {entry.role === "assistant" ? "Izzy" : firstName || "You"}
                                  </div>
                                  {entry.timestamp && (
                                    <div className="text-xs text-muted-foreground ml-2">
                                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                  )}
                                </div>
                                <div className="text-sm whitespace-pre-wrap">{entry.content}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm">
                          {JSON.stringify(transcript, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Transcript Available</h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      The transcript for this interview session could not be found or is not available.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}