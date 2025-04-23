'use server'

import { getInterviewTranscript } from '@/services/database/interviews/getTranscript'
import { storeFeedback } from '@/services/database/interviews/storeFeedback'
import { generateInterviewFeedback } from '@/services/agents/feedback.agent'

/**
 * Main function to process an interview and generate feedback
 * @param userId - User ID
 * @param sessionId - Interview session ID
 * @returns Object indicating success/failure and the generated feedback
 */
export const processInterviewFeedback = async (
  userId: string,
  sessionId: string
) => {
  try {
    // Get the interview transcript
    const interviewData = await getInterviewTranscript(sessionId)
    
    if (!interviewData || !interviewData.transcript) {
      throw new Error('No transcript available for this session')
    }
    
    // Generate feedback from the transcript
    const feedback = await generateInterviewFeedback(
      sessionId,
      interviewData.position_title || 'Unknown Position',
      interviewData.position_type || 'general',
      interviewData.transcript
    )
    
    // Store the feedback in the database
    const result = await storeFeedback(userId, sessionId, feedback)
    
    if (!result.success) {
      throw result.error
    }
    
    return {
      success: true,
      feedback,
      data: result.data
    }
  } catch (error) {
    console.error('Error processing interview feedback:', error)
    return {
      success: false,
      error
    }
  }
}