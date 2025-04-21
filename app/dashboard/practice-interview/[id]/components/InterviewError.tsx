"use client"

import React from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface InterviewErrorProps {
  error: unknown
}

export function InterviewError({ error }: InterviewErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-lg font-medium">Failed to Load Interview Session</h3>
        <p className="text-muted-foreground text-sm">
          We encountered an error while trying to load your interview session. The session may have been deleted or you may not have permission to view it.
        </p>
        <p className="text-xs text-destructive/80 font-mono p-2 bg-destructive/10 rounded-md w-full overflow-x-auto">
          {error instanceof Error ? error.message : String(error)}
        </p>
        <div className="flex gap-3 mt-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/practice-interview">Go Back</Link>
          </Button>
          <Button>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
