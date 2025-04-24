import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Building,
  Calendar,
  Briefcase,
  Trash2,
  Mic,
  ArrowLeft,
  Target
} from "lucide-react"
import type { StrategyAnalysis } from "@/types/strategy"
import { useStrategyUtils } from "../hooks/useStrategyUtils"

interface StrategyHeroProps {
  strategy: StrategyAnalysis
  id: string
  deleting: boolean
  onDelete: () => Promise<void>
}

export function StrategyHero({ strategy, id, deleting, onDelete }: StrategyHeroProps) {
  const {
    getMatchRateGradient,
    getMatchRateColor,
    getExperienceLevelDisplay,
    formatDate
  } = useStrategyUtils()

  return (
    <>
      {/* Back button */}
      <div className="mb-6 flex items-center">
        <Link href="/dashboard/interview-strategy">
          <Button variant="ghost" size="sm" className="gap-1" aria-label="Back to strategies list">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Strategies</span>
          </Button>
        </Link>
      </div>

      {/* Hero section with job details */}
      <div className={`rounded-xl bg-gradient-to-br ${getMatchRateGradient(strategy.match_rate)} p-4 sm:p-6 md:p-8 mb-8 shadow-sm overflow-hidden`}>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 justify-between">
          <div className="space-y-3 md:space-y-4 w-full">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge variant="outline" className="px-2 py-1 text-muted-foreground">
                {getExperienceLevelDisplay(strategy.job_experience_level)}
              </Badge>
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(strategy.created_at)}
              </span>
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Building className="h-4 w-4" />
                {strategy.job_industry}
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{strategy.job_title}</h1>
              <p className="text-lg font-medium flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5" aria-hidden="true" />
                {strategy.job_company}
              </p>
              <p className="text-muted-foreground line-clamp-3">
                {strategy.job_description_summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {strategy.job_description_key_points.required_skills.slice(0, 5).map((skill, i) => (
                <Badge key={i} variant="secondary" className="px-2 py-1">
                  {skill.length > 80 ? `${skill.substring(0, 80)}...` : skill}
                </Badge>
              ))}
              {strategy.job_description_key_points.required_skills.length > 5 && (
                <Badge variant="outline" className="px-2 py-1">
                  +{strategy.job_description_key_points.required_skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-auto lg:min-w-[250px]">
            <div className="bg-card rounded-lg p-4 sm:p-6 shadow-sm border border-border/50">
              <div className="flex flex-col items-center mb-3">
                <h3 className="text-xl font-bold mb-2 sm:mb-4">Match Score</h3>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center mb-2">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${strategy.match_rate * 2.83} 283`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      className={getMatchRateColor(strategy.match_rate)}
                      transform="rotate(-90 50 50)"
                    />
                    <text
                      x="50"
                      y="55"
                      textAnchor="middle"
                      fontSize="22"
                      fontWeight="bold"
                      fill="currentColor"
                    >
                      {strategy.match_rate}%
                    </text>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-medium">Profile Alignment</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 sm:mt-6">
                <Link href={`/dashboard/practice-interview?strategyId=${id}`}>
                  <Button className="w-full gap-1.5 cursor-pointer">
                    <Mic className="h-4 w-4" />
                    Practice
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-1.5 cursor-pointer" disabled={deleting}>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this strategy?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the interview
                        strategy for {strategy.job_title} at {strategy.job_company}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={onDelete}
                        disabled={deleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleting ? (
                          <>
                            <span className="mr-2">Deleting</span>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          </>
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
