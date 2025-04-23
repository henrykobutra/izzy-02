"use client"

import { useProfiles } from "@/hooks/profile/useProfiles"
import Link from "next/link"
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronRight, 
  CheckCircle, 
  AlertCircle,
  Award,
  Briefcase,
  Clock
} from "lucide-react"

export function ProfileStatusCard() {
  const { profile, exists: profileExists, loading } = useProfiles()

  // Get the first industry and count remaining ones
  const primaryIndustry = profile?.industries && profile.industries.length > 0 
    ? profile.industries[0] 
    : null
  
  const additionalIndustriesCount = profile?.industries && profile.industries.length > 1
    ? profile.industries.length - 1
    : 0

  // Calculate total years of experience
  const totalYearsOfExperience = profile?.experience?.reduce((total, exp) => total + (exp.years || 0), 0) || 0
  
  // Format years of experience text
  const getExperienceText = () => {
    if (totalYearsOfExperience === 0) return "< 1 year of experience"
    if (totalYearsOfExperience === 1) return "1 year of experience"
    return `${totalYearsOfExperience} years of experience`
  }

  return (
    <Card className="@container flex flex-col">
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
      <CardContent className="pt-0 pb-0 flex-grow">
        {profileExists && !loading && profile && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                <span className="font-medium">{profile.experience_level.charAt(0).toUpperCase() + profile.experience_level.slice(1)}</span>
              </span>
            </div>
            
            {primaryIndustry && (
              <div className="flex items-center gap-1">
                <Briefcase className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {primaryIndustry}
                  {additionalIndustriesCount > 0 && 
                    <span className="text-xs text-muted-foreground/70">
                      {`, and ${additionalIndustriesCount} more ${additionalIndustriesCount === 1 ? 'industry' : 'industries'}`}
                    </span>
                  }
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {getExperienceText()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-3 pb-3">
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href="/dashboard/profile-analysis" className="flex items-center justify-center gap-1">
            {profileExists ? "View Profile" : "Create Profile"}
            <ChevronRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
