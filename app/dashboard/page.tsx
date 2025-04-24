"use client"

import { ProfileStatusCard } from "@/components/profile-status-card"
import { InterviewStrategyCard } from "@/components/interview-strategy-card"
import { PracticeInterviewCard } from "@/components/practice-interview-card"
import { FeedbackCard } from "@/components/feedback-card"
import { DashboardPerformanceMetrics } from "@/components/dashboard-performance-metrics"
import { InterviewTipCard } from "@/components/interview-tip-card"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ListChecks, Target } from "lucide-react"
import { useProfiles } from "@/hooks/profile/useProfiles"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

export default function DashboardPage() {
  const { exists: profileExists, loading } = useProfiles()
  const router = useRouter()

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault()

    // Get the position of the click event relative to the viewport
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    // Calculate position as ratio of the viewport
    const originX = buttonCenterX / window.innerWidth
    const originY = buttonCenterY / window.innerHeight

    // Trigger confetti from the button position
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { x: originX, y: originY },
      colors: ['#5E5CE6', '#BF5AF2', '#30D158', '#0A84FF', '#FF375F', '#FF9F0A'],
      startVelocity: 30,
      gravity: 0.8,
      ticks: 200
    })

    // Navigate to profile analysis page after a short delay
    setTimeout(() => {
      router.push('/dashboard/profile-analysis')
    }, 234) // Slightly longer delay to enjoy the animation
  }

  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Your Interview Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          {profileExists
            ? "Track your progress and prepare for your next interview"
            : "Let&apos;s get you started on your interview preparation journey"}
        </p>
      </div>

      {!profileExists && !loading && (
        <div className="px-4 lg:px-6">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Welcome to Izzy!</CardTitle>
              <CardDescription>
                Complete these steps to get the most out of your interview preparation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Create your profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Tell us about your experience and what roles you&apos;re targeting to receive personalized guidance
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ListChecks className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Review interview tips</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn industry best practices that will help you communicate effectively during interviews
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Try a practice interview</h3>
                    <p className="text-sm text-muted-foreground">
                      Once your profile is complete, practice with AI-powered interviews tailored to your target roles
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGetStarted} className="flex items-center gap-1 cursor-pointer">
                Get Started <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {profileExists && (
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          <ProfileStatusCard />
          <InterviewStrategyCard />
          <PracticeInterviewCard />
          <FeedbackCard />
        </div>
      )}

      {profileExists && (
        <div className="px-4 lg:px-6">
          <DashboardPerformanceMetrics />
        </div>
      )}

      <div className="px-4 lg:px-6">
        <InterviewTipCard />
      </div>
    </div>
  )
}