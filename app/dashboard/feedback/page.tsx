"use client"

import { useState } from "react";
import { FeedbackOverviewCards } from "@/components/feedback/overview-cards";
import { FeedbackTable } from "@/components/feedback/feedback-table";
import { ReadyForFeedbackTable } from "@/components/feedback/ready-for-feedback-table";
import { FeedbackMetrics } from "@/components/feedback/metrics";
import { useUser } from "@/hooks/users/useUser";
import { useFeedback } from "@/hooks/feedback/useFeedback";
import { generateAndSaveFeedback } from "@/services/feedback/generateAndSaveFeedback";
import { useRouter } from "next/navigation";

import { RefreshCw, FileText, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function FeedbackPage() {

  const router = useRouter();
  const { userId } = useUser();
  const [generatingFeedback, setGeneratingFeedback] = useState<string | null>(null);
  const {
    feedbackData,
    isLoading,
    hasFeedback,
    improvementAreas,
    sessionsReadyForFeedback,
    loadingReadySessions,
    fetchFeedback,
    fetchReadyForFeedback
  } = useFeedback(userId);

  const handleGenerateFeedback = async (sessionId: string) => {
    if (!userId) return;

    try {
      setGeneratingFeedback(sessionId);
      toast.loading("Generating feedback...", {
        description: "Please wait while AI analyzes your interview",
        duration: 5000,
      });

      // Generate feedback and save to database
      const feedbackId = await generateAndSaveFeedback(sessionId, userId);

      // Refresh data
      await fetchFeedback(userId);
      await fetchReadyForFeedback(userId);

      toast.success("Feedback generated successfully!", {
        description: "Your interview feedback is ready to view",
      });

      // Navigate to the feedback detail page
      router.push(`/dashboard/feedback/${feedbackId}`);

    } catch (error) {
      console.error("Error generating feedback:", error);
      toast.error("Error generating feedback", {
        description: "There was a problem analyzing your interview. Please try again.",
      });
    } finally {
      setGeneratingFeedback(null);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Interview Feedback & Evaluation</h1>
        <p className="text-muted-foreground">
          Review detailed feedback and track your progress
        </p>
      </div>

      {sessionsReadyForFeedback.length > 0 && (
        <Card className="mx-4 lg:mx-6 border border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full">
                  <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></span>
                </div>
                <Sparkles className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">AI Feedback Available</CardTitle>
                <CardDescription>Completed interviews ready for AI-generated feedback</CardDescription>
              </div>
            </div>
          </CardHeader>
          <div>
            {loadingReadySessions ? (
              <div className="py-8 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ReadyForFeedbackTable
                data={sessionsReadyForFeedback}
                onProvideFeedback={handleGenerateFeedback}
              />
            )}
          </div>
        </Card>
      )}

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
            <FeedbackTable
              data={feedbackData}
              loading={isLoading}
              hasFeedback={hasFeedback}
              refetchFeedback={() => fetchFeedback(userId)}
            />
          )}
        </div>
      </Card>
    </div>
  );
}