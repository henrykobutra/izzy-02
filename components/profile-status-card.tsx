"use client"

import { useProfiles } from "@/hooks/profile/useProfiles"
import Link from "next/link"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCircle, ChevronRight, CheckCircle, AlertCircle } from "lucide-react"

export function ProfileStatusCard() {
  const { exists: profileExists, loading } = useProfiles()

  return (
    <Card className="@container">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardDescription>Profile Status</CardDescription>
          <Badge variant={profileExists ? "secondary" : "outline"} className={profileExists ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "text-amber-800 dark:text-amber-400"}>
            {profileExists ? "Ready" : "Action Needed"}
          </Badge>
        </div>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {loading ? (
            "Checking..."
          ) : profileExists ? (
            <>
              <span>Profile Created</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </>
          ) : (
            <>
              <span>Profile Missing</span>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <Button variant="outline" size="sm" asChild className="mt-2">
          <Link href="/dashboard/profile-analysis" className="flex items-center gap-1">
            {profileExists ? "View Profile" : "Create Profile"}
            <ChevronRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
