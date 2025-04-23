'use client'

import { useState, useCallback } from 'react'
import { processInterviewFeedback } from '@/services/feedback/process-interview'
import { createClient } from '@/utils/supabase/client'
import type { InterviewFeedback } from '@/types/interview-feedback'

/**
 * Hook for managing interview feedback generation and retrieval
 * @param userId - ID of the current user
 */
export function useFeedback(userId: string) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null)

  /**
   * Generates feedback for an interview session
   * @param sessionId - ID of the interview session
   */
  const generateFeedback = useCallback(
    async (sessionId: string) => {
      if (!userId || !sessionId) {
        setError(new Error('Missing user ID or session ID'))
        return { success: false }
      }

      setIsGenerating(true)
      setError(null)

      try {
        const result = await processInterviewFeedback(userId, sessionId)

        if (!result.success) {
          throw result.error
        }

        if (result.feedback) {
          setFeedback(result.feedback)
        }
        return result
      } catch (err) {
        setError(err)
        return { success: false, error: err }
      } finally {
        setIsGenerating(false)
      }
    },
    [userId]
  )

  /**
   * Fetches existing feedback for an interview session
   * @param sessionId - ID of the interview session
   */
  const getFeedback = useCallback(
    async (sessionId: string) => {
      if (!userId || !sessionId) {
        setError(new Error('Missing user ID or session ID'))
        return { success: false }
      }

      setIsLoading(true)
      setError(null)

      try {
        const supabase = createClient()

        const { data, error } = await supabase
          .from('interview_feedback')
          .select('*')
          .eq('user_id', userId)
          .eq('session_id', sessionId)
          .single()

        if (error) {
          throw error
        }

        if (data) {
          const feedbackData = {
            overall_score: data.overall_score,
            skills_breakdown: data.skills_breakdown,
            strengths: data.strengths,
            weaknesses: data.weaknesses,
            areas_for_improvement: data.areas_for_improvement,
            feedback_summary: data.feedback_summary,
            confidence_score: data.confidence_score
          }

          setFeedback(feedbackData as InterviewFeedback)
          return { success: true, feedback: feedbackData }
        } else {
          setFeedback(null)
          return { success: true, feedback: null }
        }
      } catch (err) {
        setError(err)
        return { success: false, error: err }
      } finally {
        setIsLoading(false)
      }
    },
    [userId]
  )

  return {
    isGenerating,
    isLoading,
    error,
    feedback,
    generateFeedback,
    getFeedback
  }
}
