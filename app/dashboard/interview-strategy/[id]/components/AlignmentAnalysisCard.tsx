import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Lightbulb, 
  Award,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import type { StrategyAnalysis } from "@/types/strategy"

interface AlignmentAnalysisCardProps {
  strategy: StrategyAnalysis
}

export function AlignmentAnalysisCard({ strategy }: AlignmentAnalysisCardProps) {
  const [isStrengthsOpen, setIsStrengthsOpen] = useState(true)
  const [isWeaknessesOpen, setIsWeaknessesOpen] = useState(true)

  return (
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
            <Collapsible open={isStrengthsOpen} onOpenChange={setIsStrengthsOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="px-5 py-4 border-b bg-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                    <h3 className="font-medium">Your Strengths</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border-green-200">
                      {strategy.strengths.length} Strengths
                    </Badge>
                    {isStrengthsOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-5">
                  <div className="space-y-3">
                    {strategy.strengths.map((strength, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div className="text-muted-foreground">{strength}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {/* Weaknesses */}
          <div className="rounded-lg border">
            <Collapsible open={isWeaknessesOpen} onOpenChange={setIsWeaknessesOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="px-5 py-4 border-b bg-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                    <h3 className="font-medium">Areas for Improvement</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-red-200">
                      {strategy.weaknesses.length} Areas
                    </Badge>
                    {isWeaknessesOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-5">
                  <div className="space-y-3">
                    {strategy.weaknesses.map((weakness, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div className="text-muted-foreground">{weakness}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
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
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills</h4>
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
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Experience</h4>
                <div className="space-y-2">
                  {strategy.key_alignments.experience.map((exp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <div className="text-muted-foreground">{exp}</div>
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
                  <div className="text-muted-foreground">{challenge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
