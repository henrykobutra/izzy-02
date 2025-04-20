import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { CheckCircle, Circle, Mic, FileText, BookOpen } from "lucide-react"
import type { StrategyAnalysis } from "@/types/strategy"

interface PreparationTabContentProps {
  strategy: StrategyAnalysis
}

export function PreparationTabContent({ strategy }: PreparationTabContentProps) {
  return (
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
                    className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-muted-foreground">{point}</p>
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
                    <p className="text-muted-foreground">{tip}</p>
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
              <div className="flex items-start gap-3 p-2 bg-primary/5 rounded-sm">
                <div className="mt-0.5 text-primary">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-medium">Review job description</span>
                  <div className="text-xs text-muted-foreground mt-0.5">Recommended first step</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-2 rounded-sm">
                <div className="mt-0.5 text-muted-foreground">
                  <Mic className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-medium">Practice interview questions</span>
                  <div className="text-xs text-muted-foreground mt-0.5">Suggested preparation</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-2 rounded-sm">
                <div className="mt-0.5 text-muted-foreground">
                  <Circle className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-medium">Research company background</span>
                  <div className="text-xs text-muted-foreground mt-0.5">Important for interview</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-2 rounded-sm">
                <div className="mt-0.5 text-muted-foreground">
                  <Circle className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-medium">Prepare questions to ask</span>
                  <div className="text-xs text-muted-foreground mt-0.5">Shows initiative</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-2 rounded-sm">
                <div className="mt-0.5 text-muted-foreground">
                  <Mic className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-medium">Practice with mock interview</span>
                  <div className="text-xs text-muted-foreground mt-0.5">Builds confidence</div>
                </div>
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
  )
}
