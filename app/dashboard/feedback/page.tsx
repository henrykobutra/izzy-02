"use client"

import { useEffect, useState } from "react";
import { FeedbackOverviewCards } from "@/components/feedback/overview-cards";
import { FeedbackTable } from "@/components/feedback/feedback-table";
import { FeedbackMetrics } from "@/components/feedback/metrics";
import { useUser } from "@/hooks/users/useUser";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { InterviewFeedback } from "@/types/interview-feedback";

export default function FeedbackPage() {
  const { userId } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState<Array<InterviewFeedback & { id: string; session_id: string; created_at: string }>>([]);
  const [hasFeedback, setHasFeedback] = useState(false);

  const fetchFeedback = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const supabase = createClient();
      
      // Fetch all feedback for the current user
      const { data, error } = await supabase
        .from('interview_feedback')
        .select(`
          id, 
          session_id,
          overall_score, 
          skills_breakdown, 
          strengths, 
          weaknesses, 
          areas_for_improvement, 
          feedback_summary,
          confidence_score,
          created_at,
          interview_sessions(position, interview_type)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching feedback:", error);
        return;
      }
      
      if (data && data.length > 0) {
        setFeedbackData(data);
        setHasFeedback(true);
      } else {
        setHasFeedback(false);
      }
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get improvement areas from all feedback
  const improvementAreas = feedbackData
    .flatMap(feedback => feedback.areas_for_improvement || [])
    .slice(0, 3)
    .map(area => ({
      skill: area.topic,
      score: Math.round(Math.random() * 20) + 60, // Generate a score between 60-80 for visualization
      action: area.description
    }));

  useEffect(() => {
    if (userId) {
      fetchFeedback();
    }
  }, [userId]);

  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Interview Feedback & Evaluation</h1>
        <p className="text-muted-foreground">
          Review detailed feedback and track your progress
        </p>
      </div>
      
      <FeedbackOverviewCards />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 lg:px-6">
        <div className="md:col-span-2">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">Performance Metrics</h2>
            <p className="text-sm text-muted-foreground">Key interview skills assessment</p>
          </div>
          <FeedbackMetrics />
        </div>
        
        <div className="bg-card rounded-lg p-4 shadow">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">Improvement Areas</h2>
            <p className="text-sm text-muted-foreground">Focus on these skills</p>
          </div>
          {improvementAreas.length > 0 ? (
            <div className="space-y-4">
              {improvementAreas.map((area, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{area.skill}</span>
                    <span className="text-sm text-muted-foreground">{area.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-primary" 
                      style={{ width: `${area.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{area.action}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground py-4 text-center">
              No improvement areas found. Complete interviews to get recommendations.
            </div>
          )}
        </div>
      </div>

      <Card className="mx-4 lg:mx-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-medium">Feedback History</CardTitle>
              <CardDescription>Detailed feedback from your interview sessions</CardDescription>
            </div>
            <Button
              onClick={fetchFeedback}
              size="sm"
              variant="outline"
              className="gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </Button>
          </div>
        </CardHeader>
        <div>
          {isLoading ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-medium">Loading feedback...</h3>
              <p className="text-muted-foreground mt-1">Please wait while we retrieve your interview feedback</p>
            </div>
          ) : !hasFeedback ? (
            <CardContent className="py-6">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-6">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">No Feedback Yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Complete practice interviews to receive detailed feedback on your performance.
                  </p>
                </div>
              </div>
            </CardContent>
          ) : (
            <FeedbackTable data={feedbackData} />
          )}
        </div>
      </Card>
    </div>
  );
}