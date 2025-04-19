"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  IconChevronLeft,
  IconChevronRight,
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

type FeedbackData = {
  id: number;
  interviewTitle: string;
  type: string;
  date: string;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  metrics: Record<string, number>;
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-emerald-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-red-500";
};

export function FeedbackTable({ data }: { data: FeedbackData[] }) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<FeedbackData>[] = [
    {
      accessorKey: "interviewTitle",
      header: "Interview",
      cell: ({ row }) => (
        <div className="max-w-[220px] pr-2">
          <div className="font-medium line-clamp-1">{row.original.interviewTitle}</div>
          <div className="text-xs text-muted-foreground">
            {format(new Date(row.original.date), "MMM d, yyyy")}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground whitespace-nowrap">
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "overallScore",
      header: "Score",
      cell: ({ row }) => (
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium" 
             style={{ backgroundColor: getScoreColor(row.original.overallScore) }}>
          {row.original.overallScore}
        </div>
      ),
    },
    {
      accessorKey: "strengths",
      header: "Strengths",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          {row.original.strengths.slice(0, 1).map((strength, i) => (
            <div key={i} className="text-sm line-clamp-1">• {strength}</div>
          ))}
          {row.original.strengths.length > 1 && (
            <div className="text-xs text-muted-foreground">+ {row.original.strengths.length - 1} more</div>
          )}
        </div>
      ),
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

  // Sort data by date in descending order before feeding it to the table
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
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
      <div className="rounded-md border mx-4 lg:mx-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-3">
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
                  className="cursor-pointer"
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
      <div className="flex items-center justify-end py-3 px-4 lg:px-6 space-x-2">
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