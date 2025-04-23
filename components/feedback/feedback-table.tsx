"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { FileText, Trash, Loader2 } from "lucide-react";
import { toast } from "sonner";

import type { InterviewFeedback } from "@/types/interview-feedback";

type FeedbackTableData = InterviewFeedback & { 
  id: string; 
  session_id: string; 
  created_at: string;
  interview_sessions?: {
    job_title: string | null;
    interview_type: string;
  }
};

interface FeedbackTableProps {
  data: FeedbackTableData[];
  loading: boolean;
  hasFeedback: boolean;
  refetchFeedback: () => void;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-emerald-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-red-500";
};

export function FeedbackTable({
  data,
  loading,
  hasFeedback,
  refetchFeedback
}: FeedbackTableProps) {
  const router = useRouter();
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sort data by created_at in descending order
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [data]);

  const handleDelete = async () => {
    if (!feedbackToDelete) return;
    
    setIsDeleting(true);
    try {
      // This would be replaced with your actual delete function
      // const result = await deleteFeedback(feedbackToDelete);
      const result = { success: true }; // Placeholder, replace with actual API call
      
      if (result.success) {
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
                  <TableHead className="w-[25%] py-2 font-medium pl-6">Job Position</TableHead>
                  <TableHead className="w-[15%] py-2 font-medium">Interview Type</TableHead>
                  <TableHead className="w-[15%] py-2 font-medium">Performance</TableHead>
                  <TableHead className="w-[20%] py-2 font-medium">Completed</TableHead>
                  <TableHead className="py-2 text-right font-medium pr-6">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((feedback) => (
                  <TableRow
                    key={feedback.id}
                    className="hover:bg-muted/30 group/row border-b last:border-0"
                  >
                    <TableCell className="py-3 pl-6">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {feedback.interview_sessions?.job_title || "Generic Interview"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge
                        variant="outline"
                        className="px-1.5 py-0.5 text-xs flex items-center gap-1"
                      >
                        {feedback.interview_sessions?.interview_type || "Interview"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium" 
                           style={{ backgroundColor: getScoreColor(feedback.overall_score) }}>
                        {Math.round(feedback.overall_score)}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
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
                    <TableCell className="py-3 text-right pr-6">
                      <div className="flex items-center justify-end space-x-2 transition-opacity">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2.5 cursor-pointer"
                          asChild
                        >
                          <Link href={`/dashboard/feedback/${feedback.id}`}>
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