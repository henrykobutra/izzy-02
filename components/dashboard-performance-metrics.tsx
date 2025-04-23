"use client";

import { useFeedback } from "@/hooks/feedback/useFeedback";
import { useUser } from "@/hooks/users/useUser";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { IconBrain, IconCode, IconMessageCircle, IconPuzzle } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { processFeedback } from "@/utils/processFeedback";

// Map of skills to their visual properties
const skillColors = {
  "Technical Knowledge": { color: "#8884d8", icon: IconCode },
  "Problem Solving": { color: "#f97316", icon: IconPuzzle },
  "Communication": { color: "#10b981", icon: IconMessageCircle },
  "Critical Thinking": { color: "#6366f1", icon: IconBrain }
};

export function DashboardPerformanceMetrics() {
  const { userId } = useUser();
  const { feedbackData, isLoading, hasFeedback } = useFeedback(userId);
  
  // Process feedback data to get metrics
  const metrics = processFeedback(feedbackData || []);
  
  // Select top 2 skills based on average scores
  const topSkills = hasFeedback 
    ? Object.entries(metrics.averages)
        .sort(([, scoreA], [, scoreB]) => (scoreB as number) - (scoreA as number))
        .slice(0, 2)
        .map(([skill, score]) => ({
          skill,
          score: score as number,
          ...skillColors[skill as keyof typeof skillColors]
        }))
    : [];

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Interview Performance</CardTitle>
            <CardDescription>Key skill metrics from your practice sessions</CardDescription>
          </div>
          {hasFeedback && (
            <Link 
              href="/dashboard/feedback" 
              className="text-sm font-medium text-primary hover:underline"
            >
              View all metrics
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        ) : !hasFeedback ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-muted-foreground mb-2">
              Complete practice interviews to see your performance metrics
            </p>
            <Link 
              href="/dashboard/practice-interview"
              className="text-sm font-medium text-primary hover:underline"
            >
              Start a practice interview
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Overall Score</span>
                <div className="text-2xl font-bold">{metrics.averageScore}%</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Based on {metrics.feedbackCount} {metrics.feedbackCount === 1 ? 'interview' : 'interviews'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topSkills.map((metric, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg bg-card">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: `${metric.color}15` }}
                  >
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
        )}
      </CardContent>
    </Card>
  );
}
