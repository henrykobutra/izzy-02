"use client"

import React, { useState, useEffect, useRef } from "react"
import { useInterviewSession } from "./hooks/useInterviewSession"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowLeft, Mic, MicOff, MessageSquare, Code, CompassIcon, Loader2, UserRound, Play } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userService } from "@/services/user.service"
import { cn } from "@/lib/utils"
import SpeechVisualizer from "./components/SpeechVisualizer"
import { vapi } from "@/lib/vapi/vapi.sdk"
import { startVapiAssistant, setupVapiEventListeners } from "@/lib/vapi/vapi.utils"

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

  // Vapi interview management
  const [vapiCall, setVapiCall] = useState<any>(null)
  const [speakerVolume, setSpeakerVolume] = useState<number>(0)
  const cleanupEventListeners = useRef<(() => void) | null>(null)

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

  // Cleanup Vapi event listeners when component unmounts
  useEffect(() => {
    return () => {
      if (cleanupEventListeners.current) {
        cleanupEventListeners.current();
      }
    };
  }, []);

  // Handle start interview with Vapi
  const handleStartInterview = async () => {
    try {
      // Start in processing state
      setInterviewState("processing");

      // Start the Vapi assistant
      const call = await startVapiAssistant(session, true);
      setVapiCall(call);

      // Setup event listeners to control UI
      const cleanup = setupVapiEventListeners({
        onCallStart: () => {
          console.log("Interview call started");
          setInterviewState("interviewer_speaking");
        },
        onCallEnd: () => {
          console.log("Interview call ended");
          setInterviewState("completed");
        },
        onSpeechStart: () => {
          //TODO: Debounce state changes between who's speaking
          console.log("Interviewer is speaking");
          setInterviewState("interviewer_speaking");
        },
        onSpeechEnd: () => {
          console.log("Interviewer stopped speaking");
          // Transition to candidate speaking after the interviewer is done
          setInterviewState("candidate_speaking");
        },
        onVolumeLevel: (volume) => {
          setSpeakerVolume(volume);
        },
        onError: (error) => {
          console.error("Vapi error:", error);
          // Handle error state if needed
        }
      });

      // Save cleanup function for unmounting
      cleanupEventListeners.current = cleanup;
    } catch (error) {
      console.error("Failed to start interview:", error);
      setInterviewState("before_start");
    }
  };

  // Handle ending the interview
  const handleEndInterview = () => {
    // End the Vapi call if active
    if (vapiCall) {
      try {
        // Use vapi.stop() to end the call - this is the correct method according to the Vapi docs
        vapi.stop();
      } catch (error) {
        console.error("Error stopping Vapi call:", error);
      }
    }

    setInterviewState("completed");
  };

  // Handle toggling mute/unmute
  const toggleMute = async () => {
    if (!vapiCall) return;

    try {
      // Get current mute state
      const isMuted = vapiCall.isMuted();

      // Toggle mute state
      vapiCall.setMuted(!isMuted);
    } catch (error) {
      console.error("Error toggling mute:", error);
    }
  };

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
                      <AvatarImage src="/faces/izzy-avatar.png" alt="Izzy" />
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
                      You&apos;ll have a real-time conversation with Izzy, your AI interviewer.
                      Speak clearly into your microphone when it&apos;s your turn.
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
                      Listen carefully to Izzy&apos;s question before responding.
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
                      You&apos;ve successfully completed your practice interview. What would you like to do next?
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          {/* Action buttons */}
          <CardFooter className="flex justify-center border-t pt-6">
            {interviewState === "before_start" && (
              <Button
                className="mt-6 gap-2"
                onClick={handleStartInterview}
              >
                <Play className="h-4 w-4" />
                Start Interview
              </Button>
            )}

            {(interviewState === "interviewer_speaking" || interviewState === "candidate_speaking" || interviewState === "processing") && (
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleMute}
                >
                  {interviewState === "candidate_speaking" ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  variant="destructive"
                  className="gap-2"
                  onClick={handleEndInterview}
                >
                  End Interview
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
        {/* Debug button */}
        <div className="mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              console.log("Interview Session Data:", session);
              try {
                const call = await startVapiAssistant(session, true);
                console.log("Vapi Assistant Started:", call);

                // Set up event listeners for debugging
                const cleanup = setupVapiEventListeners({
                  onCallStart: () => console.log("Debug: Call started"),
                  onCallEnd: () => console.log("Debug: Call ended"),
                  onSpeechStart: () => console.log("Debug: Speech started"),
                  onSpeechEnd: () => console.log("Debug: Speech ended"),
                  onVolumeLevel: (vol) => console.log("Debug: Volume level", vol),
                  onMessage: (msg) => console.log("Debug: Message received", msg),
                  onError: (err) => console.error("Debug: Error occurred", err)
                });

                // Store the cleanup function
                setTimeout(() => {
                  console.log("Debug: Cleaning up event listeners");
                  cleanup();
                }, 30000); // Cleanup after 30 seconds for debug purposes
              } catch (error) {
                console.error("Error starting Vapi assistant:", error);
              }
            }}
            className="gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Debug Vapi Session
          </Button>
        </div>
      </div>
    </div>
  )
}
