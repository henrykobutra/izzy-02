"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Plus, Briefcase, Eye, Mic, Trash2, UserSquare2, ArrowRight, ChevronDown, ChevronUp, RefreshCw, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { useProfiles } from "@/hooks/profile/useProfiles"
import { useStrategies } from "@/hooks/strategies/useStrategies"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getStrategyAnalysis } from "@/services/agents/strategy.agent"
import { saveStrategy, updateStrategy } from "@/services/database/strategies/saveStrategy"
import { deleteStrategy } from "@/services/database/strategies/deleteStrategy"
import { userService } from "@/services/user.service"
import { toast } from "sonner"
import type { StrategyAnalysis } from "@/types/strategy"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
import { jobAnalysisLoadingStates, synchronizationLoadingStates } from "@/constants/loadingStates"
import { ProfileSummaryCard } from "@/components/profile/ProfileSummaryCard"

export default function InterviewStrategyPage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { profile, loading: profileLoading, exists: profileExists } = useProfiles();
  const { strategies, loading: strategiesLoading, hasStrategies, refetch } = useStrategies();
  const [highlightJobCard, setHighlightJobCard] = useState(false);
  const [deletingStrategy, setDeletingStrategy] = useState<string | null>(null);
  const [strategyToDelete, setStrategyToDelete] = useState<string | null>(null);
  const [synchronizingStrategy, setSynchronizingStrategy] = useState<string | null>(null);
  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const jobCardRef = useRef<HTMLDivElement>(null);
  
  const handleHighlightJobCard = () => {
    // Scroll to job card
    jobCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Highlight card temporarily
    setHighlightJobCard(true);
    setTimeout(() => setHighlightJobCard(false), 1500);
  };
  
  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) return
    
    setIsAnalyzing(true)
    
    try {
      // Get current user
      const userData = await userService.getCurrentUser()
      if (!userData) {
        toast.error("You must be logged in to analyze jobs")
        return
      }
      
      // Get profile data
      if (!profile) {
        toast.error("Please complete your profile before analyzing jobs")
        handleHighlightJobCard()
        return
      }
      
      // Generate strategy using AI agent
      const strategyData = await getStrategyAnalysis(jobDescription, profile)
      
      if (!strategyData.is_job_description) {
        toast.error("The text you provided doesn't appear to be a job description. Please try again with a valid job description.")
        return
      }
      
      // Prepare the strategy object to save
      const strategyToSave: StrategyAnalysis = {
        ...strategyData,
        user_id: userData.id,
        profile_id: profile.id,
        job_description: jobDescription
      }
      
      // Save strategy to database
      const savedStrategy = await saveStrategy(strategyToSave)
      
      if (savedStrategy) {
        toast.success("Job analyzed successfully! Your interview strategy is ready.")
        // Refresh strategies list
        await refetch()
        // Redirect to the strategy details page
        router.push(`/dashboard/interview-strategy/${savedStrategy.id}`)
        // Clear the job description input
        setJobDescription("")
      } else {
        toast.error("Failed to save your strategy. Please try again.")
      }
    } catch (error) {
      console.error("Error analyzing job:", error)
      toast.error("An error occurred while analyzing the job description")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDeleteStrategy = async (strategyId: string) => {
    setDeletingStrategy(strategyId);
    
    try {
      const success = await deleteStrategy(strategyId);
      
      if (success) {
        toast.success("Interview strategy deleted successfully");
        await refetch();
      } else {
        toast.error("Failed to delete interview strategy");
      }
    } catch (error) {
      console.error("Error deleting strategy:", error);
      toast.error("An error occurred while deleting the interview strategy");
    } finally {
      setDeletingStrategy(null);
      setStrategyToDelete(null);
    }
  };

  const handleSynchronizeStrategy = async (strategyId: string) => {
    setSynchronizingStrategy(strategyId);
    setIsSynchronizing(true);
    
    try {
      // Get current user
      const userData = await userService.getCurrentUser()
      if (!userData) {
        toast.error("You must be logged in to synchronize strategies")
        return
      }
      
      // Get profile data
      if (!profile) {
        toast.error("Your profile is required to synchronize strategies")
        return
      }
      
      // Find the strategy to synchronize
      const strategyToSync = strategies.find(s => s.id === strategyId)
      if (!strategyToSync) {
        toast.error("Strategy not found")
        return
      }
      
      // Generate new strategy using AI agent with existing job description but current profile
      const jobDescription = strategyToSync.job_description
      if (!jobDescription) {
        toast.error("This strategy doesn't have a job description to analyze")
        return
      }
      
      // Show toast to indicate the process has started
      toast.info("Synchronizing strategy with your current profile...")
      
      // Get new analysis
      const strategyData = await getStrategyAnalysis(jobDescription, profile)
      
      if (!strategyData.is_job_description) {
        toast.error("The stored job description appears to be invalid. Please delete this strategy and create a new one.")
        return
      }
      
      // Prepare the strategy object to update
      const strategyToUpdate: Partial<StrategyAnalysis> = {
        ...strategyData,
        profile_id: profile.id,
        // Keep the original job description and user_id
        // We're only updating the analysis and linking to the current profile
      }
      
      // Update the strategy in database
      const updatedStrategy = await updateStrategy(strategyId, strategyToUpdate)
      
      if (updatedStrategy) {
        toast.success("Strategy synchronized successfully with your current profile!")
        // Refresh strategies list
        await refetch()
      } else {
        toast.error("Failed to synchronize strategy. Please try again.")
      }
    } catch (error) {
      console.error("Error synchronizing strategy:", error)
      toast.error("An error occurred while synchronizing the strategy")
    } finally {
      setSynchronizingStrategy(null)
      setIsSynchronizing(false)
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-6">
      {/* MultiStepLoader for job analysis */}
      <MultiStepLoader 
        loadingStates={jobAnalysisLoadingStates}
        loading={isAnalyzing}
        duration={1500}
        loop={false}
      />

      {/* MultiStepLoader for synchronization */}
      <MultiStepLoader 
        loadingStates={synchronizationLoadingStates}
        loading={isSynchronizing}
        duration={1200}
        loop={false}
      />
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Interview Strategy</h1>
        <p className="text-muted-foreground mb-6">
          Analyze job descriptions to create tailored interview preparation
        </p>
      </div>

      {/* Profile Summary Card */}
      <ProfileSummaryCard 
        profileExists={profileExists}
        profileLoading={profileLoading}
        profile={profile}
        className="mx-4 lg:mx-6"
      />

      <Card className={`mx-4 lg:mx-6 transition-all ${highlightJobCard ? 'ring-2 ring-primary ring-offset-2 animate-pulse' : ''}`} ref={jobCardRef}>
        <CardHeader>
          <CardTitle>Add New Job Target</CardTitle>
          <CardDescription>
            Paste a job description to analyze and create a tailored interview strategy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Paste Job Description</h3>
            </div>
            <Textarea 
              placeholder="Paste the job description here..." 
              className="h-[180px] font-mono text-sm"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isAnalyzing}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleAnalyzeJob}
                disabled={!jobDescription.trim() || isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Job"}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-slate-50 dark:bg-slate-900/40 p-4">
            <h3 className="text-sm font-medium mb-3">More Options</h3>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center text-sm bg-white dark:bg-slate-800 border rounded-lg px-3 py-1.5 gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>Link to Job Post</span>
                <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0">Coming Soon</Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              We&apos;re working on more ways to add job descriptions, including direct links to job posts.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Strategies Table */}
      <div id="saved-jobs" className="px-4 lg:px-6">

        {strategiesLoading ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-medium">Loading strategies...</h3>
            <p className="text-muted-foreground mt-1">Please wait while we retrieve your interview strategies</p>
          </div>
        ) : !hasStrategies ? (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle>No Interview Strategies Yet</CardTitle>
              </div>
              <CardDescription>
                Create your first strategy to get personalized interview preparation guidance.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-6">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Create Your First Strategy</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Analyze job descriptions to get personalized interview preparation strategies tailored to your profile and the position.
                  </p>
                </div>
                <Button 
                  onClick={handleHighlightJobCard}
                  className="gap-2 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Your First Strategy</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Your Interview Strategies</CardTitle>
                  <CardDescription>Personalized strategies for different job opportunities</CardDescription>
                </div>
                <Button 
                  onClick={handleHighlightJobCard}
                  size="sm" 
                  className="gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add New</span>
                </Button>
              </div>
            </CardHeader>
            <div>
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="border-b bg-muted/30">
                      <TableHead className="w-[30%] py-2 font-medium pl-6">Position</TableHead>
                      <TableHead className="w-[20%] py-2 font-medium">Experience</TableHead>
                      <TableHead className="w-[30%] py-2 font-medium">Match Rating</TableHead>
                      <TableHead className="py-2 text-right font-medium pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {strategies.map((strategy) => {
                      const isOutOfSync = strategy.profile_id === null;
                      
                      return (
                      <TableRow 
                        key={strategy.id} 
                        className={`hover:bg-muted/30 group/row border-b last:border-0 ${isOutOfSync ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                      >
                        <TableCell className="py-3 pl-6">
                          <div className="space-y-1">
                            <div className="font-medium">
                              {isOutOfSync && (
                                <div className="flex items-center gap-1.5 mb-1">
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                  <span className="text-amber-600 text-sm">Strategy out of sync</span>
                                </div>
                              )}
                              {strategy.job_title}
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Briefcase className="h-3.5 w-3.5" />
                              <span>{strategy.job_company}</span>
                            </div>
                            {isOutOfSync && (
                              <div className="mt-1 text-xs text-muted-foreground italic">
                                Profile has been updated since strategy creation
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          {isOutOfSync ? (
                            <Badge 
                              variant="outline" 
                              className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 px-1.5 py-0.5 text-xs"
                            >
                              Needs update
                            </Badge>
                          ) : (
                            <Badge 
                              variant="secondary" 
                              className="capitalize px-1.5 py-0.5 text-xs"
                            >
                              {strategy.job_experience_level ? 
                                strategy.job_experience_level.toLowerCase() === "entry" ? "Entry Level" :
                                strategy.job_experience_level.toLowerCase() === "mid" ? "Mid Level" :
                                strategy.job_experience_level.toLowerCase() === "senior" ? "Senior Level" :
                                strategy.job_experience_level.toLowerCase() === "executive" ? "Executive Level" :
                                strategy.job_experience_level
                                : "Not specified"}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="py-3">
                          {isOutOfSync ? (
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 text-amber-600 border border-amber-200 dark:border-amber-800">
                                <AlertTriangle className="h-5 w-5" />
                              </div>
                              <div className="text-xs font-medium text-amber-600">
                                Match score unavailable
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm
                                  ${strategy.match_rate >= 85 ? 'bg-green-500' : 
                                  strategy.match_rate >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                                >
                                  {strategy.match_rate}%
                                </div>
                              </div>
                              <div className="text-xs font-medium">
                                {strategy.match_rate >= 85 ? 'Excellent Alignment' : 
                                  strategy.match_rate >= 70 ? 'Good Alignment' : 'Challenging Interview'}
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="py-3 text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            {isOutOfSync ? (
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 px-2.5 border-amber-200 dark:border-amber-800 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                                  onClick={() => strategy.id && handleSynchronizeStrategy(strategy.id)}
                                  disabled={synchronizingStrategy === strategy.id}
                                >
                                  {synchronizingStrategy === strategy.id ? (
                                    <div className="h-3.5 w-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mr-1" />
                                  ) : (
                                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                                  )}
                                  <span className="text-xs">Synchronize</span>
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="h-8 px-2.5 text-destructive border-destructive/20 hover:bg-destructive/10"
                                  onClick={() => strategy.id && setStrategyToDelete(strategy.id)}
                                  disabled={deletingStrategy === strategy.id}
                                >
                                  {deletingStrategy === strategy.id ? (
                                    <div className="h-3.5 w-3.5 border-2 border-destructive border-t-transparent rounded-full animate-spin mr-1" />
                                  ) : (
                                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                                  )}
                                  <span className="text-xs">Delete</span>
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Link href={`/dashboard/interview-strategy/${strategy.id}`}>
                                  <Button variant="outline" size="sm" className="h-8 px-2.5">
                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                    <span className="text-xs">View</span>
                                  </Button>
                                </Link>
                                <div className="flex flex-col sm:flex-row gap-1.5">
                                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                    <Mic className="h-3.5 w-3.5" />
                                    <span className="sr-only">Practice</span>
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-8 w-8 p-0 text-destructive border-destructive/20 hover:bg-destructive/10"
                                    onClick={() => strategy.id && setStrategyToDelete(strategy.id)}
                                    disabled={deletingStrategy === strategy.id}
                                  >
                                    {deletingStrategy === strategy.id ? (
                                      <div className="h-3.5 w-3.5 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <Trash2 className="h-3.5 w-3.5" />
                                    )}
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
                <div className="py-3 bg-muted/20 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6">
                  <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>{strategies.length} {strategies.length === 1 ? 'strategy' : 'strategies'} available</span>
                    
                    {/* Sync status summary */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs">
                          {strategies.filter(s => s.profile_id !== null).length} synced
                        </span>
                      </div>
                      
                      {strategies.some(s => s.profile_id === null) && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-xs text-amber-600">
                            {strategies.filter(s => s.profile_id === null).length} out of sync
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last analyzed: {new Date(Math.max(...strategies.map(s => s.created_at ? new Date(s.created_at).getTime() : 0))).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!strategyToDelete} onOpenChange={(open) => !open && setStrategyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Interview Strategy</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this interview strategy? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => strategyToDelete && handleDeleteStrategy(strategyToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={!!deletingStrategy}
            >
              {deletingStrategy ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}