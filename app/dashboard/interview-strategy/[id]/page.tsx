"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, CheckCircle, XCircle, AlertTriangle, ChevronDown, 
  ChevronUp, FileText, Briefcase, UserSquare2, Mic 
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { getStrategyById } from "@/services/database/strategies/getStrategy"
import type { StrategyAnalysis } from "@/types/strategy"

export default function StrategyViewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [strategy, setStrategy] = useState<StrategyAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const [isStrengthsOpen, setIsStrengthsOpen] = useState(true)
  const [isWeaknessesOpen, setIsWeaknessesOpen] = useState(true)
  
  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        setLoading(true)
        const data = await getStrategyById(params.id)
        
        if (!data) {
          toast.error("Strategy not found")
          router.push("/dashboard/interview-strategy")
          return
        }
        
        setStrategy(data)
      } catch (error) {
        console.error("Error fetching strategy:", error)
        toast.error("Failed to load interview strategy")
      } finally {
        setLoading(false)
      }
    }
    
    fetchStrategy()
  }, [params.id, router])
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-medium">Loading strategy...</h3>
        <p className="text-muted-foreground mt-1">Please wait while we retrieve your interview strategy</p>
      </div>
    )
  }
  
  if (!strategy) return null
  
  const getMatchRateColor = (rate: number) => {
    if (rate >= 85) return "text-green-600"
    if (rate >= 70) return "text-amber-600"
    return "text-red-600"
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
  
  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="px-4 lg:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard/interview-strategy">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Strategies</span>
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{strategy.job_title}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>{strategy.job_company}</span>
            <span className="text-xs">•</span>
            <Badge variant="secondary" className="capitalize px-1.5 py-0.5 text-xs">
              {getExperienceLevelDisplay(strategy.job_experience_level)}
            </Badge>
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-md font-medium ${getMatchRateColor(strategy.match_rate)} bg-opacity-10 border`}>
            <div className="flex items-center gap-2">
              <span className="text-sm">Match Score: <span className="font-bold">{strategy.match_rate}%</span></span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Mic className="h-4 w-4" />
            <span>Practice</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="mx-4 lg:mx-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Job Description Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Job Summary</CardTitle>
              <CardDescription>
                Key information extracted from the job description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div className="min-w-[180px] text-sm font-medium">Company:</div>
                  <div>{strategy.job_company}</div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div className="min-w-[180px] text-sm font-medium">Industry:</div>
                  <div>{strategy.job_industry}</div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div className="min-w-[180px] text-sm font-medium">Experience Level:</div>
                  <div className="capitalize">{getExperienceLevelDisplay(strategy.job_experience_level)}</div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <div className="min-w-[180px] text-sm font-medium">Required Skills:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {strategy.job_description_key_points.required_skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="px-2 py-0.5 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <div className="min-w-[180px] text-sm font-medium">Responsibilities:</div>
                  <div className="space-y-1.5">
                    {strategy.job_description_key_points.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <div className="mt-1 bg-primary/10 w-1 h-1 rounded-full"></div>
                        <div>{resp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Collapsible 
                open={isDescriptionOpen} 
                onOpenChange={setIsDescriptionOpen}
                className="mt-2 pt-3 border-t"
              >
                <CollapsibleTrigger className="flex justify-between items-center w-full">
                  <span className="text-sm font-medium">Full Job Description</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isDescriptionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  <div className="p-3 rounded-md bg-muted/50 text-sm whitespace-pre-wrap">
                    {strategy.job_description}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
          
          {/* Match Analysis */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Alignment Analysis</CardTitle>
              <CardDescription>
                How your profile matches with the job requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium mb-2">Overall Alignment</h3>
                <p className="text-sm text-muted-foreground">{strategy.alignment_summary}</p>
              </div>
              
              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <Collapsible 
                  open={isStrengthsOpen} 
                  onOpenChange={setIsStrengthsOpen}
                  className="border rounded-lg p-4"
                >
                  <CollapsibleTrigger className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Your Strengths</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      {isStrengthsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-2">
                    <div className="space-y-2">
                      {strategy.strengths.map((strength, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <div>{strength}</div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Weaknesses */}
                <Collapsible 
                  open={isWeaknessesOpen} 
                  onOpenChange={setIsWeaknessesOpen}
                  className="border rounded-lg p-4"
                >
                  <CollapsibleTrigger className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium">Areas for Improvement</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      {isWeaknessesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-2">
                    <div className="space-y-2">
                      {strategy.weaknesses.map((weakness, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                          <div>{weakness}</div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              {/* Key Alignments */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Key Alignments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {strategy.key_alignments.skills.map((skill, i) => (
                        <Badge key={i} className="px-2 py-0.5 text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Experience */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Experience</h4>
                    <div className="space-y-1.5">
                      {strategy.key_alignments.experience.map((exp, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <div className="mt-1 bg-primary w-1 h-1 rounded-full"></div>
                          <div>{exp}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Potential Challenges */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Potential Challenges</h3>
                </div>
                <div className="space-y-2">
                  {strategy.potential_challenges.map((challenge, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <div>{challenge}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preparation" className="space-y-6">
          {/* Focus Points */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Focus Points</CardTitle>
              <CardDescription>
                Key areas to focus on in your interview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategy.focus_points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="text-sm">{point}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Preparation Tips */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Preparation Tips</CardTitle>
              <CardDescription>
                Specific recommendations to prepare for this interview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategy.interview_strategy.preparation_tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div className="text-sm">{tip}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions" className="space-y-6">
          {/* Questions to Ask */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Questions to Ask the Interviewer</CardTitle>
              <CardDescription>
                Strategic questions to demonstrate your interest and research
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategy.interview_strategy.questions_to_ask.map((question, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="text-sm">{question}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Common Interview Questions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Common Interview Questions</CardTitle>
              <CardDescription>
                Questions you're likely to be asked with suggested answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strategy.interview_strategy.common_questions.map((item, i) => (
                  <div key={i} className="pb-5 border-b last:border-0 last:pb-0">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        Q
                      </div>
                      <h4 className="font-medium">{item.question}</h4>
                    </div>
                    <div className="ml-9 pl-3 border-l-2 border-muted text-sm text-muted-foreground">
                      {item.suggested_answer}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
