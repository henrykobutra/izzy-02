"use server"

import { createClient } from "@/utils/supabase/server"

/**
 * Retrieves the transcript for a given interview session
 * @param sessionId - ID of the interview session
 * @returns The transcript data or null if not found
 */
export const getInterviewTranscript = async (sessionId: string) => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('interview_sessions')
      .select('transcript, job_title')
      .eq('id', sessionId)
      .eq('status', 'completed')
      .single()

    if (error) {
      console.error('Error fetching interview transcript:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in getInterviewTranscript:', error)
    return null
  }
}
