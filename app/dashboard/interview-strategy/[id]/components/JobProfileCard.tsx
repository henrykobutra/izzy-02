import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Briefcase, ChevronUp, ChevronDown } from "lucide-react"
import type { StrategyAnalysis } from "@/types/strategy"
import { useStrategyUtils } from "../hooks/useStrategyUtils"

interface JobProfileCardProps {
  strategy: StrategyAnalysis
}

export function JobProfileCard({ strategy }: JobProfileCardProps) {
  const { getExperienceLevelDisplay } = useStrategyUtils()
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  return (
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
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Industry Experience(s)</h4>
            <p className="font-medium">{strategy.job_industry}</p>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {strategy.job_description_key_points.required_skills.map((skill, i) => (
              <Badge key={i} variant="secondary" className="px-2 py-1">
                {skill.length > 80 ? `${skill.substring(0, 80)}...` : skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Responsibilities</h4>
          <div className="space-y-2.5">
            {strategy.job_description_key_points.responsibilities.map((resp, i) => (
              <div key={i} className="flex items-start gap-2.5">
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
            <div className="p-4 rounded-md bg-muted/50 text-sm whitespace-pre-line overflow-x-auto max-h-96 text-muted-foreground break-words">
              {strategy.job_description}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardFooter>
    </Card>
  )
}
