import { IconChartBar, IconStar } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function FeedbackOverviewCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            83%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconChartBar className="h-3.5 w-3.5 mr-1" />
              +5% improvement
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Consistent improvement across interviews
          </div>
          <div className="text-muted-foreground">
            Based on your last 8 interviews
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top Skill</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Communication
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconStar className="h-3.5 w-3.5 mr-1" />
              92% proficiency
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Exceptional verbal communication skills
          </div>
          <div className="text-muted-foreground">
            Clear explanations and structured responses
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}