"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText, Trash, Loader2, MessageSquare, Code, CompassIcon } from "lucide-react";
import { toast } from "sonner";

import type { FeedbackTableProps } from "@/types/interview-feedback";
import type { StrategyAnalysis } from "@/types/strategy";
import { getStrategyById } from "@/services/database/strategies/getStrategy";
import { deleteFeedback } from "@/services/database/feedback/deleteFeedback";
import { getScoreBarColor, getScoreLabel } from "@/utils/score-utils";

export function FeedbackTable({
  data,
  loading,
  hasFeedback,
  refetchFeedback
}: FeedbackTableProps) {
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [strategies, setStrategies] = useState<Record<string, StrategyAnalysis>>({});

  // Sort data by created_at in descending order
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [data]);

  // Fetch strategy information for sessions that have a strategy ID
  React.useEffect(() => {
    const fetchStrategies = async () => {
      const strategiesMap: Record<string, StrategyAnalysis> = {};

      // Find unique strategy IDs from the feedback data
      const uniqueStrategyIds = new Set<string>();
      data.forEach(feedback => {
        if (feedback.interview_sessions?.interview_strategy_id) {
          uniqueStrategyIds.add(feedback.interview_sessions.interview_strategy_id);
        }
      });

      if (uniqueStrategyIds.size === 0) {
        return; // No strategy IDs to fetch
      }

      // Fetch all strategy data in parallel
      const strategiesPromises = Array.from(uniqueStrategyIds).map(async (strategyId) => {
        try {
          const strategy = await getStrategyById(strategyId);
          if (strategy) {
            strategiesMap[strategyId] = strategy;
          }
        } catch (error) {
          console.error("Error fetching strategy:", error);
        }
      });

      await Promise.all(strategiesPromises);
      setStrategies(strategiesMap);
    };

    if (data.length > 0) {
      fetchStrategies();
    }

    return () => {
      // Clean up strategies state when component unmounts
      setStrategies({});
    };
  }, [data]);

  const handleDelete = async () => {
    if (!feedbackToDelete) return;

    setIsDeleting(true);
    try {
      const success = await deleteFeedback(feedbackToDelete);

      if (success) {
        toast.success("Feedback deleted successfully");
        refetchFeedback();
      } else {
        toast.error("Failed to delete feedback");
      }
    } catch (error) {
      console.error("Error in delete handler:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
      setFeedbackToDelete(null);
    }
  };

  return (
    <>
      <div>
        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-medium">Loading feedback...</h3>
            <p className="text-muted-foreground mt-1">Please wait while we retrieve your interview feedback</p>
          </div>
        ) : !hasFeedback ? (
          <div className="py-6 px-4">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-6">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">No Feedback Yet</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Complete a practice interview to receive feedback on your performance.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="border-collapse w-full">
              <TableHeader>
                <TableRow className="border-b bg-muted/30">
                  <TableHead className="w-[25%] py-3 font-medium pl-6">Job Position</TableHead>
                  <TableHead className="w-[15%] py-3 font-medium">Interview Type</TableHead>
                  <TableHead className="w-[20%] py-3 font-medium">Performance</TableHead>
                  <TableHead className="w-[15%] py-3 font-medium">Evaluated</TableHead>
                  <TableHead className="py-3 text-right font-medium pr-6">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((feedback) => (
                  <TableRow
                    key={feedback.id}
                    className="hover:bg-muted/30 group/row border-b last:border-0"
                  >
                    <TableCell className="py-4 pl-6 align-middle">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {feedback.interview_sessions?.job_title || "Generic Interview"}
                        </div>
                        {feedback.interview_sessions?.interview_strategy_id ? (
                          <div className="text-xs text-muted-foreground">
                            {strategies[feedback.interview_sessions.interview_strategy_id]?.job_company || "Loading company..."}
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">
                            Generic Interview
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 align-middle">
                      <div className="space-y-1.5">
                        <Badge
                          variant="outline"
                          className="px-1.5 py-0.5 text-xs flex items-center gap-1"
                        >
                          {feedback.interview_sessions?.interview_type === 'behavioral' && (
                            <>
                              <MessageSquare className="h-3 w-3" />
                              Behavioral
                            </>
                          )}
                          {feedback.interview_sessions?.interview_type === 'technical' && (
                            <>
                              <Code className="h-3 w-3" />
                              Technical
                            </>
                          )}
                          {feedback.interview_sessions?.interview_type === 'comprehensive' && (
                            <>
                              <CompassIcon className="h-3 w-3" />
                              Comprehensive
                            </>
                          )}
                          {!feedback.interview_sessions?.interview_type && (
                            <>Generic</>
                          )}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {feedback.interview_sessions?.interview_question_amount || 0} questions
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 align-middle">
                      <div className="flex flex-col w-full">
                        <div className="flex flex-col mb-1.5">
                          <span className="text-sm font-medium">{getScoreLabel(feedback.overall_score)}</span>
                          <span className="text-xs text-muted-foreground">{Math.round(feedback.overall_score)}/100</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300 ease-in-out"
                            style={{
                              width: `${Math.round(feedback.overall_score)}%`,
                              backgroundColor: getScoreBarColor(feedback.overall_score),
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 align-middle">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(feedback.created_at), { addSuffix: true })}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{format(new Date(feedback.created_at), 'MMMM d, yyyy, h:mm a')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="py-4 text-right pr-6 align-middle">
                      <div className="flex items-center justify-end space-x-2 transition-opacity">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2.5 cursor-pointer"
                          asChild
                        >
                          <Link href={`/dashboard/feedback/${feedback.session_id}`}>
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">View</span>
                          </Link>
                        </Button>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-destructive border-destructive/20 hover:bg-destructive/10 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setFeedbackToDelete(feedback.id);
                              }}
                            >
                              <Trash className="h-3.5 w-3.5" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Delete Feedback</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Delete feedback confirmation dialog */}
      <AlertDialog open={!!feedbackToDelete} onOpenChange={(open) => !open && !isDeleting && setFeedbackToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Interview Feedback</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this feedback? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Feedback"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}