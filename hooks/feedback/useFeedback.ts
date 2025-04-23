"use client"

import { useState, useEffect } from "react"
import { getAllFeedback } from "@/services/database/feedback/getAllFeedback"
import type { FeedbackWithMetadata } from "@/types/interview-feedback"

interface UseFeedbackReturn {
  feedbackData: FeedbackWithMetadata[]
  isLoading: boolean
  hasFeedback: boolean
  fetchFeedback: (userId: string) => Promise<void>
  improvementAreas: Array<{
    skill: string
    score: number
    action: string
  }>
}

export function useFeedback(initialUserId?: string): UseFeedbackReturn {
  const [feedbackData, setFeedbackData] = useState<FeedbackWithMetadata[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasFeedback, setHasFeedback] = useState(false)

  const fetchFeedback = async (userId: string) => {
    if (!userId) return
    
    setIsLoading(true)
    try {
      const data = await getAllFeedback(userId)
      
      if (data && data.length > 0) {
        setFeedbackData(data)
        setHasFeedback(true)
      } else {
        setHasFeedback(false)
      }
    } catch (err) {
      console.error("Failed to fetch feedback:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Get improvement areas from all feedback
  const improvementAreas = feedbackData
    .flatMap(feedback => feedback.areas_for_improvement || [])
    .slice(0, 3)
    .map(area => ({
      skill: area.topic,
      score: Math.round(Math.random() * 20) + 60, // Generate a score between 60-80 for visualization
      action: area.description
    }))

  useEffect(() => {
    if (initialUserId) {
      fetchFeedback(initialUserId)
    }
  }, [initialUserId])

  return {
    feedbackData,
    isLoading,
    hasFeedback,
    fetchFeedback,
    improvementAreas
  }
}