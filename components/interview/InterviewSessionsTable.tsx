import React, { useState, useEffect, useMemo } from "react"
import { format } from "date-fns"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Play, Eye, RefreshCw, FileText, Code, MessageSquare, CompassIcon, CheckCircle, Clock, XCircle, Mic, Trash } from "lucide-react"
import { toast } from "sonner"
import type { InterviewSession } from "@/types/interview-session"
import type { StrategyAnalysis } from "@/types/strategy"
import { getStrategyById } from "@/services/database/strategies/getStrategy"

interface InterviewSessionsTableProps {
  sessions: InterviewSession[]
  loading: boolean
  hasSessions: boolean
  refetchSessions: () => void
}

export function InterviewSessionsTable({
  sessions,
  loading,
  hasSessions,
  refetchSessions
}: InterviewSessionsTableProps) {
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [strategies, setStrategies] = useState<Record<string, StrategyAnalysis>>({});

  // Calculate summary counts for the table footer
  const summaryCounts = useMemo(() => {
    const counts = {
      types: {
        behavioral: 0,
        technical: 0,
        comprehensive: 0
      },
      status: {
        created: 0,
        canceled: 0,
        completed: 0
      }
    };

    if (sessions.length > 0) {
      sessions.forEach(session => {
        // Count by type
        if (session.interview_type === 'behavioral') {
          counts.types.behavioral++;
        } else if (session.interview_type === 'technical') {
          counts.types.technical++;
        } else if (session.interview_type === 'comprehensive') {
          counts.types.comprehensive++;
        }

        // Count by status
        if (session.status === 'created') {
          counts.status.created++;
        } else if (session.status === 'canceled') {
          counts.status.canceled++;
        } else if (session.status === 'completed') {
          counts.status.completed++;
        }
      });
    }

    return counts;
  }, [sessions]);

  // Fetch strategy information for sessions that have a strategy ID
  useEffect(() => {
    const fetchStrategies = async () => {
      const strategiesMap: Record<string, StrategyAnalysis> = {};
      
      // Only process sessions with a strategy ID
      const sessionsWithStrategy = sessions.filter(
        session => session.interview_strategy_id
      );
      
      // Fetch all strategy data in parallel
      const strategiesPromises = sessionsWithStrategy.map(async (session) => {
        if (session.interview_strategy_id) {
          try {
            const strategy = await getStrategyById(session.interview_strategy_id);
            if (strategy) {
              strategiesMap[session.interview_strategy_id] = strategy;
            }
          } catch (error) {
            console.error("Error fetching strategy:", error);
          }
        }
      });
      
      await Promise.all(strategiesPromises);
      setStrategies(strategiesMap);
    };

    if (sessions.length > 0) {
      fetchStrategies();
    }
  }, [sessions]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Your Interview Sessions</CardTitle>
            <CardDescription>History of your practice interview sessions</CardDescription>
          </div>
          <Button
            onClick={refetchSessions}
            size="sm"
            variant="outline"
            className="gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <div>
        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-medium">Loading sessions...</h3>
            <p className="text-muted-foreground mt-1">Please wait while we retrieve your interview sessions</p>
          </div>
        ) : !hasSessions ? (
          <CardContent className="py-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-6">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">No Interview Sessions Yet</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Start your first practice interview to prepare for your job interviews with personalized questions.
                </p>
              </div>
            </div>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <Table className="border-collapse w-full">
              <TableHeader>
                <TableRow className="border-b bg-muted/30">
                  <TableHead className="w-[25%] py-2 font-medium pl-6">Position</TableHead>
                  <TableHead className="w-[15%] py-2 font-medium">Type</TableHead>
                  <TableHead className="w-[15%] py-2 font-medium">Date</TableHead>
                  <TableHead className="w-[15%] py-2 font-medium">Status</TableHead>
                  <TableHead className="py-2 text-right font-medium pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => {
                  const isCreated = session.status === 'created';
                  const isCanceled = session.status === 'canceled';
                  const isComplete = session.status === 'completed';

                  const statusBadge = () => {
                    if (isCreated) {
                      return (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          Created
                        </Badge>
                      );
                    }
                    if (isComplete) {
                      return (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          Completed
                        </Badge>
                      );
                    }
                    if (isCanceled) {
                      return (
                        <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                          Canceled
                        </Badge>
                      );
                    }

                    // Default case - show the actual status value
                    return (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                        <span className="capitalize">{session.status}</span>
                      </Badge>
                    );
                  };

                  return (
                    <TableRow
                      key={session.id}
                      className="hover:bg-muted/30 group/row border-b last:border-0"
                    >
                      <TableCell className="py-3 pl-6">
                        <div className="space-y-1">
                          <div className="font-medium">
                            {session.job_title || "Generic Interview"}
                          </div>
                          {session.interview_strategy_id ? (
                            <div className="text-xs text-muted-foreground">
                              {strategies[session.interview_strategy_id]?.job_company || "Loading company..."}
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground">
                              Generic Interview
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge
                          variant="outline"
                          className="px-1.5 py-0.5 text-xs flex items-center gap-1"
                        >
                          {session.interview_type === 'behavioral' && (
                            <>
                              <MessageSquare className="h-3 w-3" />
                              Behavioral
                            </>
                          )}
                          {session.interview_type === 'technical' && (
                            <>
                              <Code className="h-3 w-3" />
                              Technical
                            </>
                          )}
                          {session.interview_type === 'comprehensive' && (
                            <>
                              <CompassIcon className="h-3 w-3" />
                              Comprehensive
                            </>
                          )}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {session.interview_question_amount} questions
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="text-sm">
                          {session.created_at && format(new Date(session.created_at), 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {session.created_at && format(new Date(session.created_at), 'h:mm a')}
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          {statusBadge()}
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-right pr-6">
                        <div className="flex items-center justify-end space-x-2 transition-opacity">
                          {isCreated && (
                            <Button
                              variant="default"
                              size="sm"
                              className="h-8 gap-1"
                              asChild
                            >
                              <Link href={`/dashboard/practice-interview/${session.id}`}>
                                <Mic className="h-3.5 w-3.5" />
                                <span>Start</span>
                              </Link>
                            </Button>
                          )}

                          {isCanceled && (
                            <Button
                              variant="default"
                              size="sm"
                              className="h-8 gap-1"
                              asChild
                            >
                              <Link href={`/dashboard/practice-interview/${session.id}`}>
                                <Mic className="h-3.5 w-3.5" />
                                <span>Restart</span>
                              </Link>
                            </Button>
                          )}

                          {isComplete && (
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="default"
                                size="sm"
                                className="h-8 gap-1"
                                asChild
                              >
                                <Link href={`/dashboard/practice-interview/${session.id}`}>
                                  <FileText className="h-3.5 w-3.5" />
                                  <span>View</span>
                                </Link>
                              </Button>
                              
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => {
                                      toast.success("Creating new interview session...");
                                      refetchSessions();
                                    }}
                                  >
                                    <RefreshCw className="h-3.5 w-3.5" />
                                    <span className="sr-only">Retry</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>Retry Interview</p>
                                </TooltipContent>
                              </Tooltip>
                              
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => session.id ? setSessionToDelete(session.id) : null}
                                  >
                                    <Trash className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>Delete Session</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          )}
                          
                          {!isComplete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 ml-1"
                              onClick={() => session.id ? setSessionToDelete(session.id) : null}
                            >
                              <span className="sr-only">Delete</span>
                              <Trash className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter className="bg-muted/10 text-xs border-t">
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={5} className="py-2 pl-6 pr-6">
                    <div className="flex flex-wrap items-center gap-3 justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-medium">Types:</span>
                        <Badge variant="outline" className="px-1.5 py-0 h-5 text-xs">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {summaryCounts.types.behavioral}
                        </Badge>
                        <Badge variant="outline" className="px-1.5 py-0 h-5 text-xs">
                          <Code className="h-3 w-3 mr-1" />
                          {summaryCounts.types.technical}
                        </Badge>
                        <Badge variant="outline" className="px-1.5 py-0 h-5 text-xs">
                          <CompassIcon className="h-3 w-3 mr-1" />
                          {summaryCounts.types.comprehensive}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-medium">Status:</span>
                        <Badge variant="outline" className="px-1.5 py-0 h-5 text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {summaryCounts.status.created}
                        </Badge>
                        <Badge variant="outline" className="px-1.5 py-0 h-5 text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {summaryCounts.status.completed}
                        </Badge>
                        <Badge variant="outline" className="px-1.5 py-0 h-5 text-xs bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                          <XCircle className="h-3 w-3 mr-1" />
                          {summaryCounts.status.canceled}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </div>

      {/* Delete session confirmation dialog */}
      <AlertDialog open={!!sessionToDelete} onOpenChange={(open) => !open && setSessionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Interview Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this interview session? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                toast.success("Interview session deleted successfully");
                // In a real implementation, we would call an API to delete the session
                setSessionToDelete(null);
                refetchSessions();
              }}
            >
              Delete Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
