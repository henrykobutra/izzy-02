import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, MessagesSquare } from "lucide-react"
import { JobProfileCard } from "./JobProfileCard"
import { AlignmentAnalysisCard } from "./AlignmentAnalysisCard"
import { PreparationTabContent } from "./PreparationTabContent"
import { QuestionsTabContent } from "./QuestionsTabContent"
import type { StrategyAnalysis } from "@/types/strategy"

interface StrategyTabsProps {
  strategy: StrategyAnalysis
  initialTab?: string
}

export function StrategyTabs({ strategy, initialTab = "overview" }: StrategyTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab)

  return (
    <Tabs 
      defaultValue={initialTab} 
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
          <JobProfileCard strategy={strategy} />
          <AlignmentAnalysisCard strategy={strategy} />
        </div>
      </TabsContent>
      
      <TabsContent value="preparation" className="mt-0 animate-in fade-in-50 duration-300">
        <PreparationTabContent strategy={strategy} />
      </TabsContent>
      
      <TabsContent value="questions" className="mt-0 animate-in fade-in-50 duration-300">
        <QuestionsTabContent strategy={strategy} />
      </TabsContent>
    </Tabs>
  )
}
