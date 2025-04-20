"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Briefcase, 
  Award,
  Mic, 
  AlertCircle,
  Share2,
  Download,
  Trash2,
  Play,
  BookOpen,
  FileText,
  MessagesSquare,
  PenSquare,
  Lightbulb,
  Building,
  Target
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { getStrategyById } from "@/services/database/strategies/getStrategy"
import type { StrategyAnalysis } from "@/types/strategy"

// Mock delete function - replace with actual implementation
const deleteStrategy = async (id: string) => {
  // This would call a server action to delete the strategy
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 1000)
  })
}

export default function StrategyViewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [strategy, setStrategy] = useState<StrategyAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const [isStrengthsOpen, setIsStrengthsOpen] = useState(true)
  const [isWeaknessesOpen, setIsWeaknessesOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  
  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getStrategyById(params.id)
        
        if (!data) {
          setError("Strategy not found")
          toast.error("Strategy not found")
          router.push("/dashboard/interview-strategy")
          return
        }
        
        setStrategy(data)
      } catch (error) {
        console.error("Error fetching strategy:", error)
        setError("Failed to load interview strategy")
        toast.error("Failed to load interview strategy")
      } finally {
        setLoading(false)
      }
    }
    
    fetchStrategy()
  }, [params.id, router])
  
  const handleDelete = async () => {
    try {
      setDeleting(true)
      await deleteStrategy(params.id)
      toast.success("Strategy deleted successfully")
      router.push("/dashboard/interview-strategy")
    } catch (error) {
      console.error("Error deleting strategy:", error)
      toast.error("Failed to delete strategy")
    } finally {
      setDeleting(false)
    }
  }
  
  const getMatchRateGradient = (rate: number) => {
    if (rate >= 85) return "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900"
    if (rate >= 70) return "from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900"
    return "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900"
  }
  
  const getMatchRateColor = (rate: number) => {
    if (rate >= 85) return "text-green-700 dark:text-green-400"
    if (rate >= 70) return "text-amber-700 dark:text-amber-400"
    return "text-red-700 dark:text-red-400"
  }
  
  const getMatchRateBg = (rate: number) => {
    if (rate >= 85) return "bg-green-500"
    if (rate >= 70) return "bg-amber-500"
    return "bg-red-500"
  }
  
  const getExperienceLevelDisplay = (level: string) => {
    switch(level.toLowerCase()) {
      case "junior": return "Junior Level"
      case "mid": return "Mid Level"
      case "senior": return "Senior Level"
      case "principal": return "Principal Level"
      default: return level
    }
  }
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  if (loading) {
    return (
      <div className="flex flex-col max-w-screen-xl mx-auto px-4 pb-20">
        <div className="mb-8 flex items-center">
          <Link href="/dashboard/interview-strategy">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Strategies</span>
            </Button>
          </Link>
        </div>
        
        <div className="rounded-xl bg-gradient-to-br from-muted/50 to-muted p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            <div className="space-y-4">
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-24 w-48" />
            </div>
          </div>
        </div>
        
        <Skeleton className="h-12 w-72 mb-8" />
        
        <div className="grid grid-cols-1 gap-8">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center max-w-md text-center mb-6">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold tracking-tight mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link href="/dashboard/interview-strategy">
            <Button variant="default" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Strategies
            </Button>
          </Link>
        </div>
      </div>
    )
  }
  
  if (!strategy) return null
  
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto px-4 pb-20">
      {/* Back button */}
      <div className="mb-6 flex items-center">
        <Link href="/dashboard/interview-strategy">
          <Button variant="ghost" size="sm" className="gap-1" aria-label="Back to strategies list">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Strategies</span>
          </Button>
        </Link>
      </div>
      
      {/* Hero section with job details */}
      <div className={`rounded-xl bg-gradient-to-br ${getMatchRateGradient(strategy.match_rate)} p-8 mb-8 shadow-sm`}>
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge className="px-2 py-1">
                {getExperienceLevelDisplay(strategy.job_experience_level)}
              </Badge>
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(strategy.created_at)}
              </span>
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Building className="h-4 w-4" />
                {strategy.job_industry}
              </span>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{strategy.job_title}</h1>
              <p className="text-lg font-medium flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5" aria-hidden="true" />
                {strategy.job_company}
              </p>
              <p className="text-muted-foreground line-clamp-3">
                {strategy.job_description_summary}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {strategy.job_description_key_points.required_skills.slice(0, 5).map((skill, i) => (
                <Badge key={i} variant="secondary" className="px-2 py-1">
                  {skill}
                </Badge>
              ))}
              {strategy.job_description_key_points.required_skills.length > 5 && (
                <Badge variant="outline" className="px-2 py-1">
                  +{strategy.job_description_key_points.required_skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-4 min-w-[250px]">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <div className="flex flex-col items-center mb-3">
                <h3 className="text-xl font-bold mb-4">Match Score</h3>
                <div className="relative w-32 h-32 flex items-center justify-center mb-2">
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
                      strokeDasharray={`${strategy.match_rate * 2.83} 283`} 
                      strokeDashoffset="0" 
                      strokeLinecap="round" 
                      className={getMatchRateColor(strategy.match_rate)} 
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
                      {strategy.match_rate}%
                    </text>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-medium">Profile Alignment</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-6">
                <Link href={`/dashboard/practice-interview?strategyId=${params.id}`}>
                  <Button className="w-full gap-1.5">
                    <Play className="h-4 w-4" />
                    Practice
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-1.5" disabled={deleting}>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this strategy?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the interview
                        strategy for {strategy.job_title} at {strategy.job_company}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                        {deleting ? "Deleting..." : "Delete Strategy"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            
            <div className="flex justify-between gap-2">
              <Button variant="outline" size="sm" className="w-full gap-1.5">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-1.5">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content tabs */}
      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="border-b pb-px mb-6">
          <TabsList className="p-0 bg-transparent h-12 w-full justify-start">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground bg-transparent px-4 pb-3 h-12 rounded-none"
            >
              <BookOpen className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="preparation" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground bg-transparent px-4 pb-3 h-12 rounded-none"
            >
              <FileText className="h-4 w-4" />
              Preparation
            </TabsTrigger>
            <TabsTrigger 
              value="questions" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground bg-transparent px-4 pb-3 h-12 rounded-none"
            >
              <MessagesSquare className="h-4 w-4" />
              Questions
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="mt-0 animate-in fade-in-50 duration-300">
          <div className="space-y-8">
            {/* Job Description */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Job Profile</CardTitle>
                    <CardDescription>
                      Essential information about the position
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="px-2 py-1.5 flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    {getExperienceLevelDisplay(strategy.job_experience_level)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Company</h4>
                    <p className="font-medium">{strategy.job_company}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Industry</h4>
                    <p className="font-medium">{strategy.job_industry}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {strategy.job_description_key_points.required_skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="px-2 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Responsibilities</h4>
                  <div className="space-y-2.5">
                    {strategy.job_description_key_points.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-xs font-medium">{i+1}</span>
                        </div>
                        <p className="text-sm">{resp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col border-t pt-6 pb-2 px-6">
                <Collapsible 
                  open={isDescriptionOpen} 
                  onOpenChange={setIsDescriptionOpen}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center justify-center gap-2 w-full border border-dashed"
                      aria-expanded={isDescriptionOpen}
                      aria-controls="job-description-content"
                    >
                      <span>Full Job Description</span>
                      {isDescriptionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent 
                    id="job-description-content" 
                    className="mt-4 animate-in slide-in-from-top-5 duration-300"
                  >
                    <div className="p-4 rounded-md bg-muted/50 text-sm whitespace-pre-wrap overflow-auto max-h-96">
                      {strategy.job_description}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardFooter>
            </Card>
            
            {/* Alignment Analysis */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Alignment Analysis</CardTitle>
                <CardDescription>
                  How your profile compares to the job requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/20 rounded-lg p-5 border">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Overall Assessment
                  </h3>
                  <p className="text-sm text-muted-foreground">{strategy.alignment_summary}</p>
                </div>
                
                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 gap-8">
                  {/* Strengths */}
                  <div className="rounded-lg border">
                    <div className="px-5 py-4 border-b bg-muted/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                        <h3 className="font-medium">Your Strengths</h3>
                      </div>
                      <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border-green-200">
                        {strategy.strengths.length} Strengths
                      </Badge>
                    </div>
                    <div className="p-5">
                      <div className="space-y-3">
                        {strategy.strengths.map((strength, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                            <div>{strength}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Weaknesses */}
                  <div className="rounded-lg border">
                    <div className="px-5 py-4 border-b bg-muted/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                        <h3 className="font-medium">Areas for Improvement</h3>
                      </div>
                      <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-red-200">
                        {strategy.weaknesses.length} Areas
                      </Badge>
                    </div>
                    <div className="p-5">
                      <div className="space-y-3">
                        {strategy.weaknesses.map((weakness, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
                            <div>{weakness}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Key Alignments */}
                <div className="rounded-lg border">
                  <div className="px-5 py-4 border-b bg-muted/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                      <h3 className="font-medium">Key Matches</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Skills */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {strategy.key_alignments.skills.map((skill, i) => (
                            <Badge 
                              key={i} 
                              className="px-2 py-1 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border-green-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Experience */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Experience</h4>
                        <div className="space-y-2">
                          {strategy.key_alignments.experience.map((exp, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                              <div>{exp}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Potential Challenges */}
                <div className="rounded-lg border">
                  <div className="px-5 py-4 border-b bg-muted/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                      <h3 className="font-medium">Potential Challenges</h3>
                    </div>
                    <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 border-amber-200">
                      {strategy.potential_challenges.length} Challenges
                    </Badge>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3">
                      {strategy.potential_challenges.map((challenge, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
                          <div>{challenge}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="preparation" className="mt-0 animate-in fade-in-50 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Focus Points */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Priority Focus Areas</CardTitle>
                  <CardDescription>
                    Key areas to emphasize in your interview preparation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {strategy.focus_points.map((point, i) => (
                      <div key={i} className="flex items-start gap-4 pb-5 border-b last:border-0 last:pb-0">
                        <div 
                          className="bg-primary/10 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p>{point}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Preparation Tips */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Preparation Strategies</CardTitle>
                  <CardDescription>
                    Tailored recommendations for this specific position
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {strategy.interview_strategy.preparation_tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-4 pb-5 border-b last:border-0 last:pb-0">
                        <div className="flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <div>
                          <p>{tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Preparation Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded border-2 border-primary flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">Review job description</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded border-2 border-muted-foreground flex items-center justify-center">
                      </div>
                      <span className="text-sm">Practice interview questions</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded border-2 border-muted-foreground flex items-center justify-center">
                      </div>
                      <span className="text-sm">Research company background</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded border-2 border-muted-foreground flex items-center justify-center">
                      </div>
                      <span className="text-sm">Prepare questions to ask</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded border-2 border-muted-foreground flex items-center justify-center">
                      </div>
                      <span className="text-sm">Practice with mock interview</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Recommended Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary/60" />
                        <div>
                          <h4 className="text-sm font-medium">Company Profile</h4>
                          <p className="text-xs text-muted-foreground">Learn about {strategy.job_company}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-primary/60" />
                        <div>
                          <h4 className="text-sm font-medium">Industry Guide</h4>
                          <p className="text-xs text-muted-foreground">{strategy.job_industry} trends</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-3">
                        <Mic className="h-8 w-8 text-primary/60" />
                        <div>
                          <h4 className="text-sm font-medium">Interview Practice</h4>
                          <p className="text-xs text-muted-foreground">30-minute simulation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="questions" className="mt-0 animate-in fade-in-50 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Questions to Ask */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Questions to Ask the Interviewer</CardTitle>
                  <CardDescription>
                    Strategic questions to demonstrate your interest and research
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {strategy.interview_strategy.questions_to_ask.map((question, i) => (
                      <div key={i} className="flex items-start gap-4 pb-5 border-b last:border-0 last:pb-0">
                        <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="font-medium">{i + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{question}</p>
                          {/* Could add rationale here */}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Common Interview Questions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Expected Interview Questions</CardTitle>
                  <CardDescription>
                    Questions you're likely to be asked with suggested answers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {strategy.interview_strategy.common_questions.map((item, i) => (
                      <div key={i} className="space-y-3 pb-6 border-b last:border-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                            Q
                          </div>
                          <h4 className="font-medium text-lg">{item.question}</h4>
                        </div>
                        <div className="ml-12 p-4 bg-muted/40 rounded-md border-l-4 border-primary/30">
                          <h5 className="font-medium text-sm mb-2 text-muted-foreground">Suggested Answer:</h5>
                          <p className="text-sm">{item.suggested_answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Question Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Technical</span>
                      <Badge variant="outline">
                        {Math.floor(strategy.interview_strategy.common_questions.length * 0.4)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Behavioral</span>
                      <Badge variant="outline">
                        {Math.floor(strategy.interview_strategy.common_questions.length * 0.35)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Experience</span>
                      <Badge variant="outline">
                        {Math.floor(strategy.interview_strategy.common_questions.length * 0.25)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Question Frameworks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border p-3">
                    <h4 className="text-sm font-medium mb-1">STAR Method</h4>
                    <p className="text-xs text-muted-foreground">Situation, Task, Action, Result - For behavioral questions</p>
                  </div>
                  
                  <div className="rounded-md border p-3">
                    <h4 className="text-sm font-medium mb-1">PAR Technique</h4>
                    <p className="text-xs text-muted-foreground">Problem, Action, Result - For challenge questions</p>
                  </div>
                  
                  <div className="rounded-md border p-3">
                    <h4 className="text-sm font-medium mb-1">5 Whys Analysis</h4>
                    <p className="text-xs text-muted-foreground">For technical problem-solving questions</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-muted rounded-lg p-5 border">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Quick Tip
                </h3>
                <p className="text-sm text-muted-foreground">
                  When answering technical questions, start with fundamental concepts before diving into specifics. This shows depth of understanding and lets interviewers follow your thought process.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
