'use server'

import { getReadyForFeedback } from '@/services/database/feedback/getReadyForFeedback'
import { getAllFeedback } from '@/services/database/feedback/getAllFeedback'
import type { FeedbackWithMetadata } from '@/types/interview-feedback'
import type { InterviewSession } from '@/types/interview-session'

/**
 * Server action to fetch all interview sessions that require feedback
 * @param userId The user ID to fetch feedback-ready sessions for
 * @returns Array of interview sessions that need feedback
 */
export async function fetchReadyForFeedback(userId: string): Promise<InterviewSession[]> {
  if (!userId) {
    return []
  }

  try {
    return await getReadyForFeedback(userId)
  } catch (error) {
    console.error('Server action error fetching ready for feedback sessions:', error)
    return []
  }
}

/**
 * Server action to fetch all feedback for a user
 * @param userId The user ID to fetch feedback for
 * @returns Array of feedback with metadata
 */
export async function fetchAllFeedback(userId: string): Promise<FeedbackWithMetadata[]> {
  if (!userId) {
    return []
  }

  try {
    return await getAllFeedback(userId)
  } catch (error) {
    console.error('Server action error fetching all feedback:', error)
    return []
  }
}
