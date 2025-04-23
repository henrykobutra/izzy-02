"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { InterviewSession } from "@/types/interview-session"
import { format } from "date-fns"
import { formatDistanceToNow } from "date-fns"
import { Clock, FileEdit } from "lucide-react"

interface ReadyForFeedbackTableProps {
  data: InterviewSession[]
  onProvideFeedback: (sessionId: string) => void
}

export function ReadyForFeedbackTable({ data, onProvideFeedback }: ReadyForFeedbackTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse w-full">
        <TableHeader>
          <TableRow className="border-b bg-muted/30">
            <TableHead className="w-[40%] py-2 font-medium pl-6">Interview Position</TableHead>
            <TableHead className="w-[20%] py-2 font-medium">Date</TableHead>
            <TableHead className="w-[20%] py-2 font-medium">Duration</TableHead>
            <TableHead className="py-2 text-right font-medium pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((session) => (
            <TableRow key={session.id} className="hover:bg-muted/50">
              <TableCell className="font-medium pl-6">{session.job_title || 'Unnamed Position'}</TableCell>
              <TableCell>
                {session.created_at ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help">
                        {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {format(new Date(session.created_at), "PPP 'at' p")}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  'Unknown date'
                )}
              </TableCell>
              <TableCell>
                {session.session_start && session.session_end ? (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {Math.round((new Date(session.session_end).getTime() - new Date(session.session_start).getTime()) / 60000)} minutes
                  </Badge>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell className="text-right pr-6">
                <Button 
                  size="sm" 
                  onClick={() => onProvideFeedback(session.id as string)}
                  className="gap-1.5"
                >
                  <FileEdit className="h-3.5 w-3.5" />
                  <span>Generate Feedback</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
