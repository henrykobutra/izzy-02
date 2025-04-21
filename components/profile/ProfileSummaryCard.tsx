import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible"
import { UserSquare2, ArrowRight, ChevronUp, ChevronDown, CheckCircle } from "lucide-react"
import type { ProfileAnalysis } from "@/types/profile"

interface ProfileSummaryCardProps {
  profileExists: boolean
  profileLoading: boolean
  profile?: ProfileAnalysis | null
  className?: string
}

export function ProfileSummaryCard({ 
  profileExists, 
  profileLoading, 
  profile,
  className = ""
}: ProfileSummaryCardProps) {
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false)

  return (
    <Card className={`${!profileExists ? 'border-dashed border-primary/30 bg-primary/5' : 'bg-slate-50 dark:bg-slate-900/40'} ${className}`}>
      <CardContent className="pt-6 pb-4">
        <div className="flex flex-col gap-4">
          {/* Header and CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`${!profileExists ? 'bg-primary/20' : 'bg-primary/10'} p-2 rounded-full`}>
                <UserSquare2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">
                  {profileLoading ? (
                    "Loading profile..."
                  ) : profileExists ? (
                    "Profile Ready"
                  ) : (
                    "Profile Setup Required"
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {profileLoading ? (
                    "Retrieving your profile data..."
                  ) : profileExists ? (
                    "Your profile information is optimized for interview preparation"
                  ) : (
                    "Complete your profile to get personalized interview recommendations"
                  )}
                </p>
              </div>
            </div>
            <Link href="/dashboard/profile-analysis" className="w-full sm:w-auto">
              <Button variant={profileExists ? "outline" : "default"} className="gap-2 w-full sm:w-auto" size={profileExists ? "sm" : "default"}>
                {profileExists ? "View Profile" : "Set Up Profile"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Empty profile guidance */}
          {!profileLoading && !profileExists && (
            <div className="mt-1 pt-3 border-t border-dashed border-primary/30">
              <div className="rounded-md bg-primary/10 p-3">
                <div className="flex gap-2 text-sm items-start">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary-foreground">Why create a profile?</p>
                    <ul className="mt-1 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                      <li>Get personalized interview strategies based on your experience</li>
                      <li>Receive tailored job match scores for better targeting</li>
                      <li>Automatically highlight your strengths for each job opportunity</li>
                    </ul>
                    <div className="mt-3">
                      <Link href="/dashboard/profile-analysis">
                        <Button size="sm">Create Your Profile Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Profile Details (only shown when profile exists) */}
          {!profileLoading && profileExists && profile && (
            <Collapsible 
              open={isProfileDetailsOpen} 
              onOpenChange={setIsProfileDetailsOpen}
              className="mt-1"
            >
              <CollapsibleTrigger asChild>
                <div className="w-full border-t pt-3 flex justify-between items-center cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/20 px-2 py-1 rounded-md transition-colors">
                  <span className="text-xs font-medium text-secondary-foreground">Profile Details</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    {isProfileDetailsOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="space-y-3 pt-2">
                  {/* Last Analyzed */}
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Last analyzed: {profile.created_at 
                      ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                      : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    }</span>
                    <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                      {profile.is_resume ? "From Resume" : "Manual Entry"}
                    </Badge>
                  </div>
                  
                  {/* Experience Level */}
                  {profile.experience_level && (
                    <div className="flex gap-2 items-start">
                      <Badge 
                        variant="secondary" 
                        className="px-2 py-0.5 capitalize"
                      >
                        {profile.experience_level} Level
                      </Badge>
                      <p className="text-xs text-muted-foreground leading-normal flex-1">
                        {profile.experience_level_summary}
                      </p>
                    </div>
                  )}
                  
                  {/* Industry Experience */}
                  {profile.industries && profile.industries.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">Industry Experience(s):</span>
                      {profile.industries.map((industry, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="px-1.5 py-0 text-xs whitespace-nowrap"
                        >
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Full Professional Summary */}
                  {profile.professional_summary && (
                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      <span className="font-medium text-xs text-secondary-foreground">Professional Summary:</span>
                      <p className="mt-1">{profile.professional_summary}</p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
