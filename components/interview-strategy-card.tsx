"use client"

import { useStrategies } from "@/hooks/strategies/useStrategies"
import Link from "next/link"
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Plus, Building, BarChart, Target, Briefcase } from "lucide-react"

export function InterviewStrategyCard() {
  const { hasStrategies, strategies, loading } = useStrategies()
  
  const strategiesCount = strategies.length
  
  // Get unique companies
  const uniqueCompanies = [...new Set(strategies.map(s => s.job_company))].filter(Boolean)
  
  // Get average match rate across all strategies
  const avgMatchRate = strategies.length > 0
    ? Math.round(strategies.reduce((sum, s) => sum + (s.match_rate || 0), 0) / strategies.length) 
    : 0
  
  // Count total focus points across all strategies
  const totalFocusPoints = strategies.reduce((sum, s) => sum + (s.focus_points?.length || 0), 0)
  
  // Count unique job titles
  const uniqueJobTitles = [...new Set(strategies.map(s => s.job_title))].filter(Boolean)

  return (
    <Card className="@container flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardDescription>Interview Strategy</CardDescription>
          {hasStrategies && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {strategiesCount} {strategiesCount === 1 ? 'Strategy' : 'Strategies'}
            </Badge>
          )}
        </div>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {loading ? (
            "Loading..."
          ) : hasStrategies ? (
            <>Job-Tailored Strategies</>
          ) : (
            <>Create Your First Strategy</>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-0 flex-grow">
        {!loading && hasStrategies && (
          <div className="flex flex-col gap-1.5">
            {uniqueJobTitles.length > 0 && (
              <div className="flex items-center gap-1">
                <Briefcase className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {uniqueJobTitles.length === 1 
                    ? uniqueJobTitles[0]
                    : `${uniqueJobTitles.length} different positions`}
                </span>
              </div>
            )}
            
            {uniqueCompanies.length > 0 && (
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {uniqueCompanies.length === 1 
                    ? uniqueCompanies[0]
                    : `${uniqueCompanies.length} different companies`}
                </span>
              </div>
            )}
            
            {avgMatchRate > 0 && (
              <div className="flex items-center gap-1">
                <BarChart className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {strategiesCount === 1 ? `${avgMatchRate}% match rate` : `${avgMatchRate}% average match rate`}
                </span>
              </div>
            )}
            
            {totalFocusPoints > 0 && (
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {totalFocusPoints} focus point{totalFocusPoints !== 1 ? 's' : ''} to prepare
                </span>
              </div>
            )}
          </div>
        )}
        
        {!loading && !hasStrategies && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            Analyze job postings to get customized interview guidance
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-3 pb-3">
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link 
            href="/dashboard/interview-strategy" 
            className="flex items-center justify-center gap-1"
          >
            {hasStrategies ? (
              <>
                <span>View Strategies</span>
                <ChevronRight className="h-3 w-3" />
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" />
                <span>Create Strategy</span>
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
