'use server'

import { createClient } from '@/utils/supabase/server'
import type { FeedbackWithMetadata } from '@/types/interview-feedback'

/**
 * Saves interview feedback to the database
 * @param sessionId - ID of the interview session
 * @param userId - ID of the user
 * @param feedbackData - The feedback data to save
 * @returns The ID of the saved feedback
 */
export const saveFeedback = async (
  sessionId: string,
  userId: string,
  feedbackData: any
): Promise<string> => {
  const supabase = await createClient()

  // Create feedback record with metadata
  const feedbackWithMetadata: FeedbackWithMetadata = {
    ...feedbackData,
    session_id: sessionId,
    user_id: userId,
    created_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('interview_feedback')
    .insert(feedbackWithMetadata)
    .select('id')
    .single()

  if (error) {
    console.error('Error saving feedback:', error)
    throw new Error(`Failed to save feedback: ${error.message}`)
  }

  return data.id
}
