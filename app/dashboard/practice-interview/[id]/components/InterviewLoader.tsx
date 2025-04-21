"use client"

import React from "react"
import { Loader2 } from "lucide-react"

export function InterviewLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h3 className="text-lg font-medium">Loading Interview Session</h3>
        <p className="text-muted-foreground text-sm max-w-md text-center">
          Please wait while we retrieve your interview session data...
        </p>
      </div>
    </div>
  )
}
