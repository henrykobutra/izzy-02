"use client";

import { IconCalendar, IconBrain, IconMessageCircle, IconCode, IconPuzzle, IconStar, IconClock, IconList } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProcessedFeedback } from "@/utils/processFeedback";
import { useUser } from "@/hooks/users/useUser";
import { formatDistanceToNow } from "date-fns";

// Map of skills to their visual properties
const skillColors = {
  "Technical Knowledge": { color: "#8884d8", icon: IconCode },
  "Problem Solving": { color: "#f97316", icon: IconPuzzle },
  "Communication": { color: "#10b981", icon: IconMessageCircle },
  "Critical Thinking": { color: "#6366f1", icon: IconBrain }
};

interface FeedbackMetricsProps {
  feedbackMetrics: ProcessedFeedback;
}

export function FeedbackMetrics({ feedbackMetrics }: FeedbackMetricsProps) {
  const { averages, best, latest } = feedbackMetrics;
  const { createdAt, isLoading } = useUser();
  
  // Create metrics array from the averages
  const skillMetrics = Object.entries(averages).map(([skill, score]) => ({
    skill,
    score,
    ...skillColors[skill as keyof typeof skillColors]
  }));

  // Format the time since account creation
  const formattedTimeSince = createdAt 
    ? `Since ${formatDistanceToNow(new Date(createdAt))} ago`
    : "Since account creation";

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Tabs defaultValue="best" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="best">
                <IconStar className="h-4 w-4 mr-1" />
                Best
              </TabsTrigger>
              <TabsTrigger value="latest">
                <IconClock className="h-4 w-4 mr-1" />
                Latest
              </TabsTrigger>
              <TabsTrigger value="all">
                <IconList className="h-4 w-4 mr-1" />
                All
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <IconCalendar className="h-4 w-4 mr-2" />
              <span>{isLoading ? "Loading..." : formattedTimeSince}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillMetrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg bg-card">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: `${metric.color}15` }}>
                <metric.icon style={{ color: metric.color }} className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{metric.skill}</span>
                  <span className="font-bold">{metric.score}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}