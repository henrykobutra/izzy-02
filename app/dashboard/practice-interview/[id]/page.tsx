"use client"

import React, { useState, useEffect } from "react"
import { useInterviewSession } from "./hooks/useInterviewSession"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowLeft, Mic, MicOff, MessageSquare, Code, CompassIcon, Loader2, User, UserRound } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userService } from "@/services/user.service"
import { cn } from "@/lib/utils"
import SpeechVisualizer from "./components/SpeechVisualizer"

// Updated type definition for Next.js 15.3.1 params
interface PageProps {
  params: Promise<{
    id: string
  }>
}

// Interview state enum
type InterviewState = 
  | "before_start" 
  | "interviewer_speaking" 
  | "candidate_speaking" 
  | "processing"
  | "completed";

export default function InterviewDetailPage({ params }: PageProps) {
  // Unwrap params Promise with React.use()
  const { id } = React.use(params)
  
  // Use custom hook for data fetching
  const { session, loading, error } = useInterviewSession(id)

  // Interview state management
  const [interviewState, setInterviewState] = useState<InterviewState>("before_start")
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [userName, setUserName] = useState<string>("")
  
  // Fetch user info
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await userService.getCurrentUser();
        if (user && user.name) {
          // Extract first name
          const firstName = user.name.split(' ')[0];
          setUserName(firstName);
        }
      } catch (error) {
        console.error("Failed to get user info:", error);
      }
    };
    
    getUserInfo();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h3 className="text-lg font-medium">Loading Interview Session</h3>
          <p className="text-muted-foreground text-sm max-w-md text-center">
            Please wait while we retrieve your interview session data...
          </p>
        </div>
      </div>
    )
  }
  
  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-medium">Failed to Load Interview Session</h3>
          <p className="text-muted-foreground text-sm">
            We encountered an error while trying to load your interview session. The session may have been deleted or you may not have permission to view it.
          </p>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/practice-interview">Go Back</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  // Null check for session
  if (!session) return null

  // Determine which participant is active based on interview state
  const isInterviewerActive = interviewState === "interviewer_speaking";
  const isCandidateActive = interviewState === "candidate_speaking";
  
  // Helper to render appropriate interview type badge
  const renderInterviewTypeBadge = () => {
    switch (session.interview_type) {
      case 'behavioral':
        return (
          <Badge variant="outline" className="px-1.5 py-0.5 text-xs flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            Behavioral
          </Badge>
        );
      case 'technical':
        return (
          <Badge variant="outline" className="px-1.5 py-0.5 text-xs flex items-center gap-1">
            <Code className="h-3 w-3" />
            Technical
          </Badge>
        );
      case 'comprehensive':
        return (
          <Badge variant="outline" className="px-1.5 py-0.5 text-xs flex items-center gap-1">
            <CompassIcon className="h-3 w-3" />
            Comprehensive
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 pb-20">
        {/* Info card with interview session details */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl">{session?.job_title || "Practice Interview"}</CardTitle>
                <CardDescription>
                  {session?.interview_strategy_id ? "Specific Interview" : "Generic Interview"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{session?.interview_question_amount}</div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </div>
                <div>
                  {session && renderInterviewTypeBadge()}
                </div>
              </div>
            </div>
          </CardHeader>
          
          {/* Video call-like interface */}
          <CardContent>
            <div className="flex flex-col items-center my-6">
              {/* Video call participants */}
              <div className="flex flex-col md:flex-row w-full max-w-3xl gap-6 mb-8">
                {/* Interviewer */}
                <div 
                  className={cn(
                    "flex-1 flex flex-col items-center p-6 rounded-xl border transition-all duration-500 ease-in-out h-[240px]",
                    isInterviewerActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                  )}
                >
                  <div className="relative mb-3">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/images/izzy-avatar.png" alt="Izzy" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        IZ
                      </AvatarFallback>
                    </Avatar>
                    {isInterviewerActive && (
                      <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800">
                        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">Izzy</h3>
                    <p className="text-xs text-muted-foreground">Interview Assistant</p>
                  </div>
                  <div className="mt-auto pt-3">
                    {isInterviewerActive ? (
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 transition-all duration-300 ease-in-out opacity-100">
                        <span className="mr-1 relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Speaking
                      </div>
                    ) : (
                      <div className="h-6 opacity-0 transition-opacity duration-300 ease-in-out"></div>
                    )}
                  </div>
                </div>
                
                {/* Candidate (User) */}
                <div 
                  className={cn(
                    "flex-1 flex flex-col items-center p-6 rounded-xl border transition-all duration-500 ease-in-out h-[240px]",
                    isCandidateActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                  )}
                >
                  <div className="relative mb-3">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-lg">
                        <UserRound className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                    {isCandidateActive && (
                      <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800">
                        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">{userName || "Candidate"}</h3>
                    <p className="text-xs text-muted-foreground">You</p>
                  </div>
                  <div className="mt-auto pt-3">
                    {isCandidateActive ? (
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 transition-all duration-300 ease-in-out opacity-100">
                        <span className="mr-1 relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Speaking
                      </div>
                    ) : (
                      <div className="h-6 opacity-0 transition-opacity duration-300 ease-in-out"></div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Interview content based on state */}
              <div className="w-full max-w-xl text-center transition-all duration-500 ease-in-out flex items-center justify-center" 
                style={{
                  height: interviewState === "before_start" ? "200px" : 
                         interviewState === "interviewer_speaking" ? "180px" :
                         interviewState === "candidate_speaking" ? "180px" :
                         interviewState === "processing" ? "160px" : 
                         interviewState === "completed" ? "200px" : "180px"
                }}>
                {interviewState === "before_start" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Ready to Start Your Practice Interview?</h2>
                    <p className="text-muted-foreground">
                      You'll have a real-time conversation with Izzy, your AI interviewer. 
                      Speak clearly into your microphone when it's your turn.
                    </p>
                  </div>
                )}
                
                {interviewState === "interviewer_speaking" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <MessageSquare className="h-12 w-12 text-primary mb-2" />
                        <p className="text-sm font-medium">Izzy is asking a question</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Listen carefully to Izzy's question before responding.
                    </p>
                  </div>
                )}
                
                {interviewState === "candidate_speaking" && (
                  <div className="space-y-4 w-full">
                    <p className="text-muted-foreground">
                      Speak clearly into your microphone. Take your time to think about your answer.
                    </p>
                    <div className="py-2">
                      <SpeechVisualizer />
                    </div>
                  </div>
                )}
                
                {interviewState === "processing" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Processing Your Interview</h2>
                    <p className="text-muted-foreground">
                      Please wait while we analyze your responses...
                    </p>
                  </div>
                )}
                
                {interviewState === "completed" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Interview Completed!</h2>
                    <p className="text-muted-foreground">
                      You've successfully completed your practice interview. What would you like to do next?
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          
          {/* Action buttons */}
          <CardFooter className="flex justify-center border-t pt-6">
            {interviewState === "before_start" && (
              <div className="flex gap-3">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/practice-interview">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go Back
                  </Link>
                </Button>
                <Button 
                  onClick={() => setInterviewState("interviewer_speaking")}
                  className="gap-2"
                >
                  <Mic className="h-4 w-4" />
                  Start Interview
                </Button>
              </div>
            )}
            
            {interviewState === "interviewer_speaking" && (
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setInterviewState("before_start")}
                  className="gap-2"
                >
                  <MicOff className="h-4 w-4" />
                  Cancel Interview
                </Button>
                <Button 
                  onClick={() => setInterviewState("candidate_speaking")}
                  className="gap-2"
                >
                  <Mic className="h-4 w-4" />
                  Answer Question
                </Button>
              </div>
            )}
            
            {interviewState === "candidate_speaking" && (
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setInterviewState("before_start")}
                  className="gap-2"
                >
                  <MicOff className="h-4 w-4" />
                  Cancel Interview
                </Button>
                <Button 
                  onClick={() => setInterviewState("interviewer_speaking")}
                  className="gap-2"
                >
                  Done Speaking
                </Button>
              </div>
            )}
            
            {interviewState === "processing" && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </div>
            )}
            
            {interviewState === "completed" && (
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setInterviewState("before_start")}
                  className="gap-2"
                >
                  Retry Interview
                </Button>
                <Button 
                  onClick={() => {
                    setIsGeneratingSummary(true);
                    // Simulate generating a summary
                    setTimeout(() => {
                      setIsGeneratingSummary(false);
                      // Handle viewing summary
                    }, 2000);
                  }}
                  disabled={isGeneratingSummary}
                  className="gap-2"
                >
                  {isGeneratingSummary ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating Summary...
                    </>
                  ) : (
                    <>Generate Summary</>
                  )}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
