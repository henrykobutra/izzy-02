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
    
    // interviewData should include position_title and position_type for type safety
    type InterviewData = { transcript: any; job_title: any; position_title?: string; position_type?: string };
    const safeInterviewData = interviewData as InterviewData;
    
    if (!safeInterviewData || !safeInterviewData.transcript) {
      throw new Error('No transcript available for this session')
    }
    
    // Generate feedback from the transcript
    const feedback = await generateInterviewFeedback(
      sessionId,
      safeInterviewData.position_title || 'Unknown Position',
      safeInterviewData.position_type || 'general',
      safeInterviewData.transcript
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