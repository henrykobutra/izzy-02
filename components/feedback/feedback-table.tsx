"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFileText,
} from "@tabler/icons-react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { InterviewFeedback } from "@/types/interview-feedback";

type FeedbackTableData = InterviewFeedback & { 
  id: string; 
  session_id: string; 
  created_at: string;
  interview_sessions?: {
    position: string;
    interview_type: string;
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-emerald-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-red-500";
};

export function FeedbackTable({ data }: { data: FeedbackTableData[] }) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<FeedbackTableData>[] = [
    {
      accessorKey: "position",
      header: "Interview",
      cell: ({ row }) => {
        const position = row.original.interview_sessions?.position || "Interview Session";
        const date = row.original.created_at ? format(new Date(row.original.created_at), "MMM d, yyyy") : "";
        
        return (
          <div className="max-w-[220px] pr-2">
            <div className="font-medium line-clamp-1">{position}</div>
            <div className="text-xs text-muted-foreground">{date}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "interview_type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground whitespace-nowrap">
          {row.original.interview_sessions?.interview_type || "Interview"}
        </Badge>
      ),
    },
    {
      accessorKey: "overall_score",
      header: "Score",
      cell: ({ row }) => (
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium" 
             style={{ backgroundColor: getScoreColor(row.original.overall_score) }}>
          {Math.round(row.original.overall_score)}
        </div>
      ),
    },
    {
      accessorKey: "strengths",
      header: "Strengths",
      cell: ({ row }) => {
        const strengths = row.original.strengths || [];
        
        return (
          <div className="max-w-[200px]">
            {strengths.slice(0, 1).map((strength, i) => (
              <div key={i} className="text-sm line-clamp-1">• {strength.trait}</div>
            ))}
            {strengths.length > 1 && (
              <div className="text-xs text-muted-foreground">+ {strengths.length - 1} more</div>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            variant="ghost" 
            className="h-8 w-8 p-0" 
            onClick={() => router.push(`/dashboard/feedback/${row.original.id}`)}
          >
            <span className="sr-only">View details</span>
            <IconChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Sort data by created_at in descending order before feeding it to the table
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [data]);

  const table = useReactTable({
    data: sortedData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b bg-muted/30">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-3 font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(`/dashboard/feedback/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No feedback found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-3 px-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IconChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <IconChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}