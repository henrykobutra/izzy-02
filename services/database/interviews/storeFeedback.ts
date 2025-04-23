'use server'

import { createClient } from '@/utils/supabase/server'
import type { InterviewFeedback } from '@/types/interview-feedback'

/**
 * Stores the generated feedback in the database
 * @param userId - User ID
 * @param sessionId - Interview session ID
 * @param feedback - Generated feedback data
 * @returns Object indicating success/failure and the stored data
 */
export const storeFeedback = async (
  userId: string,
  sessionId: string,
  feedback: InterviewFeedback
) => {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('interview_feedback')
      .upsert({
        user_id: userId,
        session_id: sessionId,
        overall_score: feedback.overall_score,
        skills_breakdown: feedback.skills_breakdown,
        strengths: feedback.strengths,
        weaknesses: feedback.weaknesses,
        areas_for_improvement: feedback.areas_for_improvement,
        feedback_summary: feedback.feedback_summary,
        confidence_score: feedback.confidence_score,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error storing interview feedback:', error)
      throw error
    }
    
    return {
      success: true,
      data
    }
  } catch (error) {
    console.error('Error in storeFeedback:', error)
    return {
      success: false,
      error
    }
  }
}
