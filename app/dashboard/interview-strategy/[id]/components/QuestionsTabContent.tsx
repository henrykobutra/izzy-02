import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import type { StrategyAnalysis } from "@/types/strategy"

interface QuestionsTabContentProps {
  strategy: StrategyAnalysis
}

export function QuestionsTabContent({ strategy }: QuestionsTabContentProps) {
  return (
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
                  <div 
                    className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium">{question}</p>
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
              Questions you&apos;re likely to be asked with suggested answers
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
                    <p className="text-sm text-muted-foreground">{item.suggested_answer}</p>
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
  )
}
