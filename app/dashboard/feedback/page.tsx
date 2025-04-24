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
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { feedbackGenerationLoadingStates } from "@/constants/loadingStates";
import { processFeedback } from "@/utils/processFeedback";
import Link from "next/link";

import { FileText, Sparkles } from "lucide-react";
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
    sessionsReadyForFeedback,
    loadingReadySessions,
    fetchFeedback,
    fetchReadyForFeedback
  } = useFeedback(userId);

  // Process feedback data to get metrics
  const feedbackMetrics = processFeedback(feedbackData || []);

  const handleGenerateFeedback = async (sessionId: string) => {
    if (!userId) return;

    try {
      setGeneratingFeedback(sessionId);
      
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
      {/* Multi-Step Loader for feedback generation */}
      <MultiStepLoader 
        loadingStates={feedbackGenerationLoadingStates}
        loading={!!generatingFeedback}
        duration={1800} 
        loop={false}
      />

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

      {hasFeedback && (
        <>
          <FeedbackOverviewCards feedbackMetrics={feedbackMetrics} />

          <div className="px-4 lg:px-6">
            <div className="mb-3">
              <h2 className="text-lg font-semibold">Performance Metrics</h2>
              <p className="text-sm text-muted-foreground">Key interview skills assessment</p>
            </div>
            <FeedbackMetrics feedbackMetrics={feedbackMetrics} />
          </div>
        </>
      )}

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
                <div className="space-y-3">
                  <h3 className="font-medium text-lg">No Feedback Yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Complete practice interviews to receive detailed feedback on your performance.
                  </p>
                  <div className="pt-2">
                    <Link 
                      href="/dashboard/practice-interview" 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      Start Practice Interview
                    </Link>
                  </div>
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