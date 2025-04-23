"use client"

import { ProfileStatusCard } from "@/components/profile-status-card"
import { InterviewStrategyCard } from "@/components/interview-strategy-card"
import { PracticeInterviewCard } from "@/components/practice-interview-card"
import { FeedbackCard } from "@/components/feedback-card"
import { DashboardPerformanceMetrics } from "@/components/dashboard-performance-metrics"
import { InterviewTipCard } from "@/components/interview-tip-card"

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Your Interview Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Track your progress and prepare for your next interview
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <ProfileStatusCard />
        <InterviewStrategyCard />
        <PracticeInterviewCard />
        <FeedbackCard />
      </div>

      <div className="px-4 lg:px-6">
        <DashboardPerformanceMetrics />
      </div>
      
      <div className="px-4 lg:px-6">
        <InterviewTipCard />
      </div>
    </div>
  )
}