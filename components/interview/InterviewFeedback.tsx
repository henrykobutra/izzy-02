'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Clock, SparkleIcon } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useFeedback } from '@/hooks/interview-sessions/useFeedback'
import { Badge } from '@/components/ui/badge'
import type { InterviewFeedback } from '@/types/interview-feedback'

interface InterviewFeedbackProps {
  userId: string
  sessionId: string
}

export function InterviewFeedback({ userId, sessionId }: InterviewFeedbackProps) {
  const { isGenerating, isLoading, error, feedback, generateFeedback, getFeedback } = useFeedback(userId)
  const [open, setOpen] = useState<{ [key: string]: boolean }>({
    skills: true,
    strengths: true,
    weaknesses: true,
    improvement: true
  })
  
  useEffect(() => {
    // Fetch feedback if it exists
    getFeedback(sessionId)
  }, [sessionId, getFeedback])
  
  const handleGenerateFeedback = async () => {
    await generateFeedback(sessionId)
  }
  
  const toggleSection = (section: string) => {
    setOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle>Interview Feedback</CardTitle>
          <CardDescription>Loading feedback...</CardDescription>
        </CardHeader>
      </Card>
    )
  }
  
  if (isGenerating) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle>Interview Feedback</CardTitle>
          <CardDescription>Generating comprehensive feedback...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4 py-6">
            <SparkleIcon className="h-12 w-12 text-primary animate-pulse" />
            <p className="text-center text-muted-foreground">
              Our AI is analyzing your interview performance. This may take a minute or two.
            </p>
            <Progress value={45} className="w-full max-w-md" />
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (error) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle>Interview Feedback</CardTitle>
          <CardDescription>An error occurred</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Unable to load or generate feedback. Please try again.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateFeedback}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    )
  }
  
  if (!feedback) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle>Interview Feedback</CardTitle>
          <CardDescription>Get detailed insights on your interview performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4 py-6">
            <p className="text-muted-foreground text-center">
              No feedback generated yet. Generate feedback to get insights on your interview performance.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateFeedback}>
            Generate Feedback
          </Button>
        </CardFooter>
      </Card>
    )
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Interview Feedback</CardTitle>
            <CardDescription>Detailed analysis of your interview performance</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex gap-1 items-center">
              <Clock className="h-3.5 w-3.5" />
              <span>Last analyzed</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Overall Performance</h3>
            <span className="text-sm font-medium">{feedback.overall_score}/100</span>
          </div>
          <Progress value={feedback.overall_score} className="h-2" />
          <p className="text-sm text-muted-foreground">{feedback.feedback_summary}</p>
        </div>
        
        <Separator />
        
        {/* Skills Breakdown */}
        <Collapsible open={open.skills} onOpenChange={() => toggleSection('skills')}>
          <CollapsibleTrigger className="flex w-full justify-between items-center">
            <h3 className="font-medium">Skills Assessment</h3>
            {open.skills ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-3">
            {feedback.skills_breakdown.map((skill: { skill: string; score: number; feedback: string }, index: number) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <span className="text-xs">{skill.score}/100</span>
                </div>
                <Progress value={skill.score} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{skill.feedback}</p>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        <Separator />
        
        {/* Strengths */}
        <Collapsible open={open.strengths} onOpenChange={() => toggleSection('strengths')}>
          <CollapsibleTrigger className="flex w-full justify-between items-center">
            <h3 className="font-medium">Strengths</h3>
            {open.strengths ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {feedback.strengths.map((strength: { trait: string; description: string }, index: number) => (
              <div key={index} className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">{strength.trait}</h4>
                  <p className="text-sm text-muted-foreground">{strength.description}</p>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        <Separator />
        
        {/* Weaknesses */}
        <Collapsible open={open.weaknesses} onOpenChange={() => toggleSection('weaknesses')}>
          <CollapsibleTrigger className="flex w-full justify-between items-center">
            <h3 className="font-medium">Areas to Improve</h3>
            {open.weaknesses ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {feedback.weaknesses.map((weakness: { trait: string; description: string }, index: number) => (
              <div key={index} className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">{weakness.trait}</h4>
                  <p className="text-sm text-muted-foreground">{weakness.description}</p>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        <Separator />
        
        {/* Improvement Plan */}
        <Collapsible open={open.improvement} onOpenChange={() => toggleSection('improvement')}>
          <CollapsibleTrigger className="flex w-full justify-between items-center">
            <h3 className="font-medium">Action Plan</h3>
            {open.improvement ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {feedback.areas_for_improvement.map((area: { topic: string; description: string }, index: number) => (
              <div key={index} className="flex gap-2">
                <SparkleIcon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">{area.topic}</h4>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={handleGenerateFeedback} disabled={isGenerating}>
          Regenerate Feedback
        </Button>
      </CardFooter>
    </Card>
  )
}
