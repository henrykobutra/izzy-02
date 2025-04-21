"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  Play,
  BriefcaseIcon,
  Loader2,
  Check,
  MessageSquare,
  Code,
  CompassIcon,
  ChevronsUpDown,
  FileSearch,
  PlusCircle,
  AlertCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import { useProfiles } from "@/hooks/profile/useProfiles"
import { ProfileSummaryCard } from "@/components/profile/ProfileSummaryCard"
import { toast } from "sonner"
import { useInterviewSessions } from "@/hooks/interview-sessions/useInterviewSessions"
import { InterviewSessionsTable } from "@/components/interview/InterviewSessionsTable"
import { useStrategies } from "@/hooks/strategies/useStrategies"
import { useCreateSession } from "@/hooks/agents/useCreateSession"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Database } from "@/types/supabase"
import { useSearchParams } from "next/navigation"

import { genericPositions } from "@/constants/positions"

type Position = {
  id: string
  title: string
  company: string
  date: string
  match: number
  experience?: string
  industry?: string
  strengths?: string[]
  alignments?: string[]
}

type InterviewType = {
  id: string
  label: string
  icon: React.ReactNode
}

export default function PracticeInterviewPage() {
  const [selectedTab, setSelectedTab] = useState<string>("generic")
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [genericPosition, setGenericPosition] = useState<string | null>(null)
  const [interviewType, setInterviewType] = useState<string>("comprehensive")
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(3)
  const [openPositionCombobox, setOpenPositionCombobox] = useState(false)
  const [openGenericCombobox, setOpenGenericCombobox] = useState(false)
  const { profile, loading: profileLoading, exists: profileExists } = useProfiles();
  const { sessions, loading: sessionsLoading, hasSessions, refetch: refetchSessions } = useInterviewSessions();
  const { strategies, loading: strategiesLoading, hasStrategies } = useStrategies()
  const { createInterviewSession, isLoading: isCreatingSession, error: createSessionError } = useCreateSession();
  const searchParams = useSearchParams();

  const interviewTypes: InterviewType[] = [
    { id: "technical", label: "Technical", icon: <Code className="h-4 w-4 mr-2" /> },
    { id: "behavioral", label: "Behavioral", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { id: "comprehensive", label: "Comprehensive", icon: <CompassIcon className="h-4 w-4 mr-2" /> },
  ]

  const specificPositions = useMemo(() => {
    if (!strategies || strategies.length === 0) return []

    return strategies.map(strategy => ({
      id: strategy.id || `strategy-${Math.random().toString(36).substring(2, 9)}`,
      title: strategy.job_title,
      company: strategy.job_company || 'Target Company',
      date: strategy.created_at || new Date().toISOString(),
      match: strategy.match_rate || 100,
      experience: strategy.job_experience_level || 'mid',
      industry: strategy.job_industry || '',
      strengths: strategy.strengths || [],
      alignments: strategy.key_alignments?.skills?.slice(0, 3) || []
    }))
  }, [strategies])

  // Reset selections when tab changes
  useEffect(() => {
    if (selectedTab === "generic") {
      setSelectedPosition(null)
    } else {
      setGenericPosition(null)
    }
  }, [selectedTab])

  // Handle strategy ID from URL query parameter
  useEffect(() => {
    const strategyId = searchParams.get('strategyId');

    if (strategyId && !strategiesLoading && strategies && strategies.length > 0) {
      // Switch to the specific tab
      setSelectedTab('specific');

      // Find the matching strategy in specificPositions
      const matchingPosition = specificPositions.find(position => position.id === strategyId);

      if (matchingPosition) {
        setSelectedPosition(matchingPosition);
      } else {
        console.warn(`Strategy with ID ${strategyId} not found`);
      }
    }
  }, [searchParams, strategies, strategiesLoading, specificPositions]);

  useEffect(() => {
    if (createSessionError) {
      toast.error(`Failed to create interview session: ${createSessionError.message}`);
    }
  }, [createSessionError]);

  useEffect(() => {
    // Check if we can enable the start button
    const canStart =
      (selectedTab === "generic" && genericPosition !== null) ||
      (selectedTab === "specific" && selectedPosition !== null);
    setCanStartInterview(canStart);
  }, [selectedTab, genericPosition, selectedPosition, sessions]);

  const handleStartInterview = async () => {
    // In a real app, this would navigate to the interview session or launch the interview
    if (selectedTab === "generic" && !genericPosition) {
      return // Can't start without selecting a generic position
    }

    if (selectedTab === "specific" && !selectedPosition) {
      return // Can't start without selecting a specific position
    }

    if (!profileExists || !profile) {
      toast.error("Please complete your profile before starting an interview")
      return
    }

    const positionId = selectedTab === "generic"
      ? genericPosition // This is already the generic job ID
      : selectedPosition?.id // This is the strategy ID

    try {
      // Find the position title
      const positionTitle = selectedTab === "generic"
        ? Object.values(genericPositions).flat().find(p => p.id === genericPosition)?.title || ""
        : selectedPosition?.title || "";

      if (!positionTitle) {
        toast.error("Invalid position selected");
        return;
      }

      // Ensure profile has the required fields
      if (!profile.id || !profile.user_id) {
        toast.error("Profile information is incomplete");
        return;
      }

      await createInterviewSession({
        positionType: selectedTab === "generic" ? "generic" : "specific",
        position: positionTitle,
        company: selectedTab === "specific" && selectedPosition?.company ? selectedPosition.company : undefined,
        interviewType: interviewType as Database['public']['Enums']['interview_type'],
        numberOfQuestions,
        profileId: profile.id,
        userId: profile.user_id,
        interviewStrategyId: selectedTab === "specific" && positionId ? positionId : null
      });

      // Refresh the sessions list after creating a new one
      refetchSessions();
    } catch (err) {
      console.error("Error creating interview session:", err);
      toast.error("Failed to create interview session. Please try again.");
    }
  }

  const [canStartInterview, setCanStartInterview] = useState(false);

  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Practice Interview</h1>
        <p className="text-muted-foreground mb-6">
          Prepare for your next interview with targeted practice sessions
        </p>
      </div>

      {/* Profile Summary Card */}
      <ProfileSummaryCard
        profileExists={profileExists}
        profileLoading={profileLoading}
        profile={profile}
        className="mx-4 lg:mx-6"
      />

      <Card className={cn("mx-4 lg:mx-6", !profileExists && !profileLoading && "opacity-70")}>
        <div className={cn("relative", !profileExists && !profileLoading && "pointer-events-none")}>
          {profileLoading ? (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/70 rounded-lg backdrop-blur-[1px]">
              <div className="text-center p-4">
                <Loader2 className="h-6 w-6 text-primary mx-auto mb-2 animate-spin" />
                <h3 className="font-medium text-sm">Loading Profile</h3>
                <p className="text-xs text-muted-foreground mt-1">Please wait while we retrieve your profile data</p>
              </div>
            </div>
          ) : !profileExists && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/70 rounded-lg backdrop-blur-[1px]">
              <div className="text-center p-4">
                <AlertCircle className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium text-sm">Profile Required</h3>
                <p className="text-xs text-muted-foreground mt-1">Complete your profile to start practicing</p>
              </div>
            </div>
          )}
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-primary" />
              Configure Your Practice Interview
            </CardTitle>
            <CardDescription>
              Select position type, specific role, and interview format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Choose position type */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Step 1: Select Position Type</Label>
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="generic">Generic Position</TabsTrigger>
                  <TabsTrigger value="specific">Target Position</TabsTrigger>
                </TabsList>
                <TabsContent value="generic" className="pt-4">
                  <Label className="text-sm mb-2 block">Select a generic position type:</Label>
                  <Popover open={openGenericCombobox} onOpenChange={setOpenGenericCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openGenericCombobox}
                        className="w-full justify-between"
                      >
                        {genericPosition
                          ? Object.values(genericPositions).flat().find((position) => position.id === genericPosition)?.title
                          : "Select position..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start" side="bottom">
                      <Command className="w-full">
                        <CommandInput placeholder="Search position..." className="w-full" />
                        <CommandEmpty>No position found.</CommandEmpty>
                        <CommandList className="w-full max-h-[300px] overflow-auto">
                          <CommandGroup heading="Most Popular">
                            {genericPositions.popular.map((position) => (
                              <CommandItem
                                key={position.id}
                                value={position.id}
                                onSelect={(currentValue) => {
                                  setGenericPosition(currentValue)
                                  setOpenGenericCombobox(false)
                                }}
                                className="w-full"
                              >
                                <div className="flex items-center w-full">
                                  <div className="mr-2 text-primary">
                                    {React.createElement(position.icon, { className: "h-4 w-4" })}
                                  </div>
                                  <span className="flex-1">{position.title}</span>
                                  <span className="ml-auto text-xs text-muted-foreground">
                                    {position.count} interviews
                                  </span>
                                  {genericPosition === position.id && (
                                    <Check className="ml-2 h-4 w-4 text-primary" />
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />

                          <CommandGroup heading="Engineering">
                            {genericPositions.engineering.map((position) => (
                              <CommandItem
                                key={position.id}
                                value={position.id}
                                onSelect={(currentValue) => {
                                  setGenericPosition(currentValue)
                                  setOpenGenericCombobox(false)
                                }}
                              >
                                <div className="flex items-center w-full">
                                  <div className="mr-2 text-blue-500">
                                    {React.createElement(position.icon, { className: "h-4 w-4" })}
                                  </div>
                                  <span className="flex-1">{position.title}</span>
                                  {genericPosition === position.id && (
                                    <Check className="ml-2 h-4 w-4 text-primary" />
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />

                          <CommandGroup heading="AI & Robotics">
                            {genericPositions.ai.map((position) => (
                              <CommandItem
                                key={position.id}
                                value={position.id}
                                onSelect={(currentValue) => {
                                  setGenericPosition(currentValue)
                                  setOpenGenericCombobox(false)
                                }}
                              >
                                <div className="flex items-center w-full">
                                  <div className="mr-2 text-purple-500">
                                    {React.createElement(position.icon, { className: "h-4 w-4" })}
                                  </div>
                                  <span className="flex-1">{position.title}</span>
                                  {genericPosition === position.id && (
                                    <Check className="ml-2 h-4 w-4 text-primary" />
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />

                          <CommandGroup heading="Design">
                            {genericPositions.design.map((position) => (
                              <CommandItem
                                key={position.id}
                                value={position.id}
                                onSelect={(currentValue) => {
                                  setGenericPosition(currentValue)
                                  setOpenGenericCombobox(false)
                                }}
                              >
                                <div className="flex items-center w-full">
                                  <div className="mr-2 text-amber-500">
                                    {React.createElement(position.icon, { className: "h-4 w-4" })}
                                  </div>
                                  <span className="flex-1">{position.title}</span>
                                  {genericPosition === position.id && (
                                    <Check className="ml-2 h-4 w-4 text-primary" />
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />

                          <CommandGroup heading="Data & Analytics">
                            {genericPositions.data.map((position) => (
                              <CommandItem
                                key={position.id}
                                value={position.id}
                                onSelect={(currentValue) => {
                                  setGenericPosition(currentValue)
                                  setOpenGenericCombobox(false)
                                }}
                              >
                                <div className="flex items-center w-full">
                                  <div className="mr-2 text-green-500">
                                    {React.createElement(position.icon, { className: "h-4 w-4" })}
                                  </div>
                                  <span className="flex-1">{position.title}</span>
                                  {genericPosition === position.id && (
                                    <Check className="ml-2 h-4 w-4 text-primary" />
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />

                          <CommandGroup heading="Non-Tech Positions">
                            {genericPositions.nontech.map((position) => (
                              <CommandItem
                                key={position.id}
                                value={position.id}
                                onSelect={(currentValue) => {
                                  setGenericPosition(currentValue)
                                  setOpenGenericCombobox(false)
                                }}
                              >
                                <div className="flex items-center w-full">
                                  <div className="mr-2 text-orange-500">
                                    {React.createElement(position.icon, { className: "h-4 w-4" })}
                                  </div>
                                  <span className="flex-1">{position.title}</span>
                                  {genericPosition === position.id && (
                                    <Check className="ml-2 h-4 w-4 text-primary" />
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </TabsContent>
                <TabsContent value="specific" className="pt-4">
                  <Label className="text-sm mb-2 block">Select one of your target positions:</Label>
                  <Popover open={openPositionCombobox} onOpenChange={setOpenPositionCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openPositionCombobox}
                        className="w-full justify-between"
                      >
                        {selectedPosition
                          ? `${selectedPosition.title} (${selectedPosition.company})`
                          : "Select position..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start" side="bottom">
                      <Command className="w-full">
                        <CommandInput
                          placeholder="Search target positions..."
                          className="w-full"
                          disabled={specificPositions.length === 0 || strategiesLoading}
                        />
                        <CommandEmpty></CommandEmpty>
                        <CommandList className="w-full max-h-[300px] overflow-auto">
                          <CommandGroup>
                            {strategiesLoading ? (
                              <div className="py-3 px-2 text-sm text-center">
                                <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                                Loading your target positions...
                              </div>
                            ) : hasStrategies && specificPositions.length > 0 ? (
                              specificPositions.map((position) => (
                                <CommandItem
                                  key={position.id}
                                  value={position.id}
                                  onSelect={() => {
                                    setSelectedPosition(position)
                                    setOpenPositionCombobox(false)
                                  }}
                                >
                                  <div className="flex items-center w-full">
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedPosition?.id === position.id ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <div>
                                      <span className="font-medium">{position.title}</span>
                                      {position.company && (
                                        <span className="text-muted-foreground text-xs ml-1">
                                          ({position.company})
                                        </span>
                                      )}
                                    </div>
                                    <span className="ml-auto">
                                      <span
                                        className={cn(
                                          "text-xs rounded-full px-1.5 py-0.5 font-medium",
                                          position.match >= 80 ? "bg-green-100 text-green-800" :
                                            position.match >= 60 ? "bg-yellow-100 text-yellow-800" :
                                              "bg-gray-100 text-gray-800"
                                        )}
                                      >
                                        {position.match}%
                                      </span>
                                    </span>
                                  </div>
                                </CommandItem>
                              ))
                            ) : (
                              <div className="py-6 px-4 text-sm text-center flex flex-col items-center gap-3">
                                <div className="rounded-full bg-blue-100 dark:bg-blue-900/40 p-2 mb-1">
                                  <FileSearch className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div className="font-medium">No target positions available</div>
                                <p className="text-xs text-muted-foreground max-w-[260px]">
                                  You need to create an interview strategy with a target job position to practice with.
                                </p>
                                <Link href="/dashboard/interview-strategy">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-1 border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                  >
                                    <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                                    Create Interview Strategy
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </CommandGroup>
                          <CommandSeparator />
                          <div className="py-1.5 px-2 text-xs text-muted-foreground italic">
                            These positions are from your Interview Strategy section.
                          </div>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </TabsContent>
              </Tabs>
            </div>

            {/* Step 2: Interview Type */}
            <div className="pt-4 border-t">
              <Label className="text-sm font-medium mb-3 block">Step 2: Select Interview Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {interviewTypes.map(type => (
                  <div
                    key={type.id}
                    className={`flex items-center p-3 rounded-md border cursor-pointer hover:bg-muted/50 ${interviewType === type.id ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => setInterviewType(type.id)}
                  >
                    <div className="flex items-center">
                      {type.icon}
                      <span className="font-medium">{type.label}</span>
                    </div>
                    {type.id === "comprehensive" && (
                      <Badge variant="outline" className="ml-auto text-xs">Recommended</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Number of Questions */}
            <div className="pt-4 border-t">
              <Label className="text-sm font-medium mb-3 block">Step 3: Number of Interview Questions</Label>
              <div className="grid grid-cols-7 gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <div
                    key={num}
                    className={`flex items-center justify-center p-3 rounded-md border cursor-pointer hover:bg-muted/50 ${numberOfQuestions === num ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => setNumberOfQuestions(num)}
                  >
                    <span className="font-medium">{num}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-primary font-medium">Note:</span> &quot;Tell me about yourself&quot; will always be included as the first question (standard interview practice).
              </p>
            </div>

            {/* Step 4: Start Button */}
            <div className="pt-4 border-t">
              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleStartInterview}
                disabled={!canStartInterview || isCreatingSession}
              >
                {isCreatingSession ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Session...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    Start Interview Session
                  </>
                )}
              </Button>
              {!canStartInterview && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Please select a position to start the interview
                </p>
              )}
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Interview Sessions Table */}
      <div className="px-4 lg:px-6 mb-6">
        <InterviewSessionsTable
          sessions={sessions}
          loading={sessionsLoading}
          hasSessions={hasSessions}
          refetchSessions={refetchSessions}
        />
      </div>
    </div>
  )
}