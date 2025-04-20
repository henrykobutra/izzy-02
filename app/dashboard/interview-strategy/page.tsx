"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Plus, Search, Briefcase, Eye, Play, Trash2, UserSquare2, ArrowRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useProfiles } from "@/hooks/profile/useProfiles"
import { useStrategies } from "@/hooks/strategies/useStrategies"
import Link from "next/link"
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
import { saveStrategy } from "@/services/database/strategies/saveStrategy"
import { deleteStrategy } from "@/services/database/strategies/deleteStrategy"
import { userService } from "@/services/user.service"
import { toast } from "sonner"
import type { StrategyAnalysis } from "@/types/strategy"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"

export default function InterviewStrategyPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { profile, loading: profileLoading, exists: profileExists } = useProfiles();
  const { strategies, loading: strategiesLoading, hasStrategies, refetch } = useStrategies();
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);
  const [highlightJobCard, setHighlightJobCard] = useState(false);
  const [deletingStrategy, setDeletingStrategy] = useState<string | null>(null);
  const [strategyToDelete, setStrategyToDelete] = useState<string | null>(null);
  const jobCardRef = useRef<HTMLDivElement>(null);
  
  // Define loading states for the job analysis process
  const jobAnalysisLoadingStates = [
    { text: "Initializing job analysis engine..." },
    { text: "Reading job description..." },
    { text: "Extracting job title and requirements..." },
    { text: "Analyzing key technical requirements..." },
    { text: "Identifying soft skills needed..." },
    { text: "Retrieving your profile data..." },
    { text: "Matching your hard skills to requirements..." },
    { text: "Evaluating your soft skills alignment..." },
    { text: "Identifying experience alignment..." },
    { text: "Calculating potential experience gaps..." },
    { text: "Evaluating company culture indicators..." },
    { text: "Formulating culture fit talking points..." },
    { text: "Generating behavioral question predictions..." },
    { text: "Crafting tailored interview response structures..." },
    { text: "Preparing technical question strategy..." },
    { text: "Analyzing company interview patterns..." },
    { text: "Prioritizing your key strengths to highlight..." },
    { text: "Finalizing your interview strategy..." }
  ];
  
  const handleHighlightJobCard = () => {
    // Scroll to job card
    jobCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Highlight card temporarily
    setHighlightJobCard(true);
    setTimeout(() => setHighlightJobCard(false), 1500);
  };
  
  // Mock data for saved job descriptions
  const [savedJobs, setSavedJobs] = useState([
    {
      id: "job-1",
      title: "Senior Frontend Engineer",
      company: "TechCorp Inc.",
      date: "April 15, 2025",
      match: 85
    },
    {
      id: "job-2",
      title: "Full Stack Developer",
      company: "InnovateSoft",
      date: "April 10, 2025",
      match: 92
    },
    {
      id: "job-3",
      title: "React Developer",
      company: "WebSolutions Ltd.",
      date: "April 5, 2025",
      match: 78
    }
  ])
  
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
        // Scroll to strategies section
        window.scrollTo({ top: document.getElementById("saved-jobs")?.offsetTop || 0, behavior: "smooth" })
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

  const handleRemoveJob = (id: string) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id))
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

  return (
    <div className="flex flex-col gap-6">
      {/* MultiStepLoader for job analysis */}
      <MultiStepLoader 
        loadingStates={jobAnalysisLoadingStates}
        loading={isAnalyzing}
        duration={1500}
        loop={false}
      />
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Interview Strategy</h1>
        <p className="text-muted-foreground mb-6">
          Analyze job descriptions to create tailored interview preparation
        </p>
      </div>

      {/* Profile Summary Card */}
      <Card className={`mx-4 lg:mx-6 ${!profileExists ? 'border-dashed border-primary/30 bg-primary/5' : 'bg-slate-50 dark:bg-slate-900/40'}`}>
        <CardContent className="pt-6 pb-4">
          <div className="flex flex-col gap-4">
            {/* Header and CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`${!profileExists ? 'bg-primary/20' : 'bg-primary/10'} p-2 rounded-full`}>
                  <UserSquare2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {profileLoading ? (
                      "Loading profile..."
                    ) : profileExists ? (
                      "Profile Ready"
                    ) : (
                      "Profile Setup Required"
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profileLoading ? (
                      "Retrieving your profile data..."
                    ) : profileExists ? (
                      "Your profile information is optimized for interview preparation"
                    ) : (
                      "Complete your profile to get personalized interview recommendations"
                    )}
                  </p>
                </div>
              </div>
              <Link href="/dashboard/profile-analysis" className="w-full sm:w-auto">
                <Button variant={profileExists ? "outline" : "default"} className="gap-2 w-full sm:w-auto" size={profileExists ? "sm" : "default"}>
                  {profileExists ? "View Profile" : "Set Up Profile"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Empty profile guidance */}
            {!profileLoading && !profileExists && (
              <div className="mt-1 pt-3 border-t border-dashed border-primary/30">
                <div className="rounded-md bg-primary/10 p-3">
                  <div className="flex gap-2 text-sm items-start">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary-foreground">Why create a profile?</p>
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                        <li>Get personalized interview strategies based on your experience</li>
                        <li>Receive tailored job match scores for better targeting</li>
                        <li>Automatically highlight your strengths for each job opportunity</li>
                      </ul>
                      <div className="mt-3">
                        <Link href="/dashboard/profile-analysis">
                          <Button size="sm">Create Your Profile Now</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Profile Details (only shown when profile exists) */}
            {!profileLoading && profileExists && profile && (
              <Collapsible 
                open={isProfileDetailsOpen} 
                onOpenChange={setIsProfileDetailsOpen}
                className="mt-1"
              >
                <CollapsibleTrigger asChild>
                  <div className="w-full border-t pt-3 flex justify-between items-center cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/20 px-2 py-1 rounded-md transition-colors">
                    <span className="text-xs font-medium text-secondary-foreground">Profile Details</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      {isProfileDetailsOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="space-y-3 pt-2">
                    {/* Last Analyzed */}
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Last analyzed: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                        {profile.is_resume ? "From Resume" : "Manual Entry"}
                      </Badge>
                    </div>
                    
                    {/* Experience Level */}
                    {profile.experience_level && (
                      <div className="flex gap-2 items-start">
                        <Badge 
                          variant="secondary" 
                          className="px-2 py-0.5 capitalize"
                        >
                          {profile.experience_level} Level
                        </Badge>
                        <p className="text-xs text-muted-foreground leading-normal flex-1">
                          {profile.experience_level_summary}
                        </p>
                      </div>
                    )}
                    
                    {/* Industry Experience */}
                    {profile.industries && profile.industries.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">Industry Experience(s):</span>
                        {profile.industries.map((industry, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="px-1.5 py-0 text-xs whitespace-nowrap"
                          >
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Full Professional Summary */}
                    {profile.professional_summary && (
                      <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        <span className="font-medium text-xs text-secondary-foreground">Professional Summary:</span>
                        <p className="mt-1">{profile.professional_summary}</p>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </CardContent>
      </Card>

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
                      <TableHead className="w-[30%] py-3 font-medium pl-6">Position</TableHead>
                      <TableHead className="w-[20%] py-3 font-medium">Experience</TableHead>
                      <TableHead className="w-[30%] py-3 font-medium">Match Rating</TableHead>
                      <TableHead className="py-3 text-right font-medium pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {strategies.map((strategy) => (
                      <TableRow 
                        key={strategy.id} 
                        className="hover:bg-muted/30 group/row border-b last:border-0"
                      >
                        <TableCell className="py-4 pl-6">
                          <div className="space-y-2">
                            <div className="font-medium text-base">{strategy.job_title}</div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Briefcase className="h-4 w-4" />
                              <span>{strategy.job_company}</span>
                            </div>
                            <div>
                              <Badge variant="outline" className="bg-muted/30 text-xs">
                                {strategy.job_industry}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="space-y-2">
                            <Badge 
                              variant="secondary" 
                              className="capitalize px-2 py-1 text-xs"
                            >
                              {strategy.job_experience_level || "Not specified"}
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                              {strategy.job_description_key_points?.required_skills?.length || 0} required skills
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium
                                ${strategy.match_rate >= 85 ? 'bg-green-500' : 
                                strategy.match_rate >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                              >
                                {strategy.match_rate}%
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm font-medium">
                                {strategy.match_rate >= 85 ? 'Excellent Alignment' : 
                                  strategy.match_rate >= 70 ? 'Good Alignment' : 'Challenging Interview'}
                              </div>
                              <div className="flex gap-3 text-sm">
                                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle className="h-4 w-4" />
                                  <span>{strategy.strengths?.length || 0} strengths</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <span>{strategy.focus_points?.length || 0} focus points</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/dashboard/interview-strategy/${strategy.id}`}>
                              <Button variant="outline" size="sm" className="h-9 px-3">
                                <Eye className="h-4 w-4 mr-1.5" />
                                <span>View</span>
                              </Button>
                            </Link>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                                <Play className="h-4 w-4" />
                                <span className="sr-only">Practice</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-9 w-9 p-0 text-destructive border-destructive/20 hover:bg-destructive/10"
                                onClick={() => strategy.id && setStrategyToDelete(strategy.id)}
                                disabled={deletingStrategy === strategy.id}
                              >
                                {deletingStrategy === strategy.id ? (
                                  <div className="h-4 w-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="py-4 bg-muted/20 border-t flex items-center justify-between px-6">
                  <div className="text-sm text-muted-foreground">
                    {strategies.length} {strategies.length === 1 ? 'strategy' : 'strategies'} available
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