"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Plus, Search, Briefcase, Eye, Play, Trash2, UserSquare2, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function InterviewStrategyPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { profile, loading: profileLoading, exists: profileExists } = useProfiles();
  const { strategies, loading: strategiesLoading, hasStrategies } = useStrategies();
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);
  const [highlightJobCard, setHighlightJobCard] = useState(false);
  const jobCardRef = useRef<HTMLDivElement>(null);
  
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
  
  const handleAnalyzeJob = () => {
    if (!jobDescription.trim()) return
    
    setIsAnalyzing(true)
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      window.scrollTo({ top: document.getElementById("saved-jobs")?.offsetTop || 0, behavior: "smooth" })
    }, 2000)
  }
  
  const handleRemoveJob = (id: string) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
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

      {/* Saved Jobs Table */}
      <div id="saved-jobs" className="px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Your Interview Strategies</h2>
          <div className="flex items-center gap-2">
            {hasStrategies && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
            )}
            <Button 
              onClick={handleHighlightJobCard}
              size="sm" 
              className="gap-1.5 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Analysis</span>
            </Button>
          </div>
        </div>

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
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Position</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {strategies.map((strategy) => (
                  <TableRow key={strategy.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium">{strategy.job_title}</div>
                        <div className="text-sm text-muted-foreground">{strategy.job_company}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          strategy.match_rate >= 85 ? "success" : 
                          strategy.match_rate >= 70 ? "default" : 
                          "secondary"
                        }
                        className="gap-1 items-center"
                      >
                        {strategy.match_rate}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {strategy.created_at ? new Date(strategy.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/interview-strategy/${strategy.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}