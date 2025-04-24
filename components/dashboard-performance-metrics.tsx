"use client";

import { useFeedback } from "@/hooks/feedback/useFeedback";
import { useUser } from "@/hooks/users/useUser";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IconArrowRight, IconBrain, IconCode, IconMessageCircle, IconPuzzle, IconTargetArrow } from "@tabler/icons-react";
import Link from "next/link";
import { processFeedback } from "@/utils/processFeedback";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Map of skills to their visual properties with descriptions
const skillColors = {
  "Technical Knowledge": { 
    color: "#8884d8", 
    icon: IconCode, 
    skillDescription: "Coding and technical concept mastery" 
  },
  "Problem Solving": { 
    color: "#f97316", 
    icon: IconPuzzle, 
    skillDescription: "Analytical and solution-oriented thinking" 
  },
  "Communication": { 
    color: "#10b981", 
    icon: IconMessageCircle, 
    skillDescription: "Clear and effective communication" 
  },
  "Critical Thinking": { 
    color: "#6366f1", 
    icon: IconBrain, 
    skillDescription: "Analytical reasoning and evaluation" 
  }
};

export function DashboardPerformanceMetrics() {
  const { userId } = useUser();
  const { feedbackData, isLoading, hasFeedback } = useFeedback(userId);
  
  // Process feedback data to get metrics
  const metrics = processFeedback(feedbackData || []);
  
  // Calculate improvement trend (comparing latest with previous if available)
  const calcImprovementTrend = () => {
    if (!hasFeedback || !feedbackData || feedbackData.length < 2) return 0;
    
    // Get the two most recent feedback items
    const sortedByDate = [...feedbackData].sort((a, b) => {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    });
    
    if (sortedByDate.length >= 2) {
      const latest = sortedByDate[0];
      const previous = sortedByDate[1];
      return latest.overall_score - previous.overall_score;
    }
    
    return 0;
  };
  
  const improvementTrend = calcImprovementTrend();
  
  // Select top 2 skills based on average scores
  const topSkills = hasFeedback 
    ? Object.entries(metrics.averages)
        .sort(([, scoreA], [, scoreB]) => (scoreB as number) - (scoreA as number))
        .slice(0, 2)
        .map(([skill, score]) => {
          const skillKey = skill as keyof typeof skillColors;
          return {
            skill,
            score: score as number,
            color: skillColors[skillKey].color,
            icon: skillColors[skillKey].icon,
            skillDescription: skillColors[skillKey].skillDescription
          };
        })
    : [];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className="col-span-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-semibold">Interview Performance</CardTitle>
              {hasFeedback && improvementTrend > 0 && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Improving
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm">Key skill metrics from your practice sessions</CardDescription>
          </div>
          {hasFeedback && (
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link href="/dashboard/feedback">
                View all metrics
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        {isLoading ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
        ) : !hasFeedback ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-8 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="mb-4 p-4 rounded-full bg-primary/5">
              <IconTargetArrow className="h-12 w-12 text-primary/70" />
            </div>
            <h3 className="text-lg font-medium mb-2">No performance data yet</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Complete practice interviews to track your skills and identify areas for improvement
            </p>
            <Button asChild>
              <Link href="/dashboard/practice-interview">
                Start a practice interview
              </Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/30">
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Overall Performance</span>
                <div className="flex items-baseline gap-2">
                  <span className={cn("text-3xl font-bold", scoreColor(metrics.averageScore))}>
                    {metrics.averageScore}%
                  </span>
                  {improvementTrend !== 0 && (
                    <span className={cn("text-sm", 
                      improvementTrend > 0 ? "text-green-600" : "text-red-500"
                    )}>
                      {improvementTrend > 0 ? "+" : ""}{improvementTrend}%
                    </span>
                  )}
                </div>
              </div>
              <div className="px-4 py-2 rounded-full bg-background border text-sm text-muted-foreground">
                Based on {metrics.feedbackCount} {metrics.feedbackCount === 1 ? 'interview' : 'interviews'}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Your Strongest Skills</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {topSkills.map((metric, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-4 p-4 border rounded-lg bg-card hover:shadow-sm transition-shadow duration-200"
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                      style={{ backgroundColor: `${metric.color}15` }}
                    >
                      <metric.icon style={{ color: metric.color }} className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{metric.skill}</span>
                          <span className={cn("font-bold", scoreColor(metric.score))}>
                            {metric.score}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{metric.skillDescription}</p>
                      </div>
                      <div className="space-y-1.5">
                        <Progress 
                          value={metric.score} 
                          className="h-2"
                          style={{ 
                            backgroundColor: `${metric.color}30`
                          }}
                        >
                          <div 
                            className="h-full transition-all duration-500 rounded-full"
                            style={{
                              width: `${metric.score}%`,
                              backgroundColor: metric.color
                            }}
                          />
                        </Progress>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
