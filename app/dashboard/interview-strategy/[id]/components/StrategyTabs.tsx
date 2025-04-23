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
      <TabsList className="mb-4">
        <TabsTrigger value="overview">
          <BookOpen className="h-4 w-4 mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="preparation">
          <FileText className="h-4 w-4 mr-2" />
          Preparation
        </TabsTrigger>
        <TabsTrigger value="questions">
          <MessagesSquare className="h-4 w-4 mr-2" />
          Questions
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="animate-in fade-in-50 duration-300">
        <div className="space-y-8">
          <JobProfileCard strategy={strategy} />
          <AlignmentAnalysisCard strategy={strategy} />
        </div>
      </TabsContent>
      
      <TabsContent value="preparation" className="animate-in fade-in-50 duration-300">
        <PreparationTabContent strategy={strategy} />
      </TabsContent>
      
      <TabsContent value="questions" className="animate-in fade-in-50 duration-300">
        <QuestionsTabContent strategy={strategy} />
      </TabsContent>
    </Tabs>
  )
}
