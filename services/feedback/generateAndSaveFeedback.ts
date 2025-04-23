'use server'

import { generateInterviewFeedback } from '@/services/agents/feedback.agent'
import { saveFeedback } from '@/services/database/feedback/saveFeedback'
import { createClient } from '@/utils/supabase/server'
import { getInterviewTranscript } from '@/services/database/interviews/getTranscript'

/**
 * Generates feedback for an interview session and saves it to the database
 * @param sessionId - ID of the interview session
 * @param userId - ID of the user
 * @returns The ID of the generated feedback
 */
export async function generateAndSaveFeedback(sessionId: string, userId: string): Promise<string> {
  const supabase = await createClient()
  
  // Fetch session details and transcript
  const { data: session, error: sessionError } = await supabase
    .from('interview_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (sessionError || !session) {
    throw new Error(`Failed to fetch session: ${sessionError?.message || 'Session not found'}`)
  }

  // Fetch transcript data using the dedicated function
  const transcriptData = await getInterviewTranscript(sessionId)
  
  if (!transcriptData) {
    throw new Error('Failed to fetch transcript: Transcript not found')
  }

  // Generate feedback using the agent
  const positionTitle = session.job_title || 'Unspecified Position'
  const positionType = session.position_type || 'General'
  
  const feedbackData = await generateInterviewFeedback(
    sessionId,
    positionTitle,
    positionType,
    transcriptData.transcript
  )

  // Save feedback to database
  const feedbackId = await saveFeedback(sessionId, userId, feedbackData)
  
  return feedbackId
}
