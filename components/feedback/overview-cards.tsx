"use client"

import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconChartBar, IconStar } from "@tabler/icons-react";
import { ProcessedFeedback } from "@/utils/processFeedback";

interface FeedbackOverviewCardsProps {
  feedbackMetrics: ProcessedFeedback;
}

// Get a relevant comment based on the skill type
const getSkillComment = (skill: string): { short: string; description: string } => {
  switch (skill) {
    case "Technical Knowledge":
      return {
        short: "Strong technical foundation",
        description: "Solid grasp of core concepts and their applications"
      };
    case "Problem Solving":
      return {
        short: "Excellent problem solver",
        description: "Methodical approach with effective solutions"
      };
    case "Communication":
      return {
        short: "Clear communicator",
        description: "Well-structured responses with concise explanations"
      };
    case "Critical Thinking":
      return {
        short: "Analytical thinker",
        description: "Thoughtful evaluation from multiple perspectives"
      };
    case "Leadership":
      return {
        short: "Natural leader",
        description: "Guides discussions with confident decision-making"
      };
    case "Adaptability":
      return {
        short: "Highly adaptable",
        description: "Adjusts well to changing scenarios and requirements"
      };
    case "Teamwork":
      return {
        short: "Team collaborator",
        description: "Contributes effectively to shared discussions"
      };
    case "Domain Expertise":
      return {
        short: "Subject matter expert",
        description: "Deep knowledge in specialized field or industry"
      };
    case "Time Management":
      return {
        short: "Efficient time manager",
        description: "Smart prioritization with well-allocated responses"
      };
    case "Attention to Detail":
      return {
        short: "Detail-oriented",
        description: "Catches important specifics others might miss"
      };
    default:
      return {
        short: "Standout performance",
        description: "Excellent abilities in this area"
      };
  }
};

export function FeedbackOverviewCards({ feedbackMetrics }: FeedbackOverviewCardsProps) {
  const { averageScore, topSkill, feedbackCount } = feedbackMetrics;
  
  // Determine if there's improvement by checking if the latest score is higher than the average
  const hasImprovement = feedbackMetrics.latest && feedbackMetrics.latest.overall_score > averageScore;
  
  // Get relevant comment for the top skill if it exists
  const topSkillComment = topSkill ? getSkillComment(topSkill.skill) : null;
  
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {averageScore || 0}%
          </CardTitle>
          {hasImprovement && (
            <CardAction>
              <Badge variant="outline">
                <IconChartBar className="h-3.5 w-3.5 mr-1" />
                +{(feedbackMetrics.latest?.overall_score || 0) - averageScore}% improvement
              </Badge>
            </CardAction>
          )}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {hasImprovement ? 'Consistent improvement across interviews' : 'Based on your interview performance'}
          </div>
          <div className="text-muted-foreground">
            {feedbackCount > 0 ? 
              `Based on your last ${feedbackCount} interview${feedbackCount === 1 ? '' : 's'}` : 
              'No interview feedback yet'}
          </div>
        </CardFooter>
      </Card>
      
      {topSkill && topSkillComment && (
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Top Skill</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {topSkill.skill}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconStar className="h-3.5 w-3.5 mr-1" />
                {topSkill.score}% proficiency
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {topSkillComment.short}
            </div>
            <div className="text-muted-foreground">
              {topSkillComment.description}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}