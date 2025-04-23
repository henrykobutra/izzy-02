'use server'

import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/types/supabase'

export type UpdateTranscriptParams = {
  sessionId: string
  transcript: Record<string, any> | null
  sessionStart?: string
  sessionEnd?: boolean
}

/**
 * Updates the transcript for an interview session and manages session timing
 * @param params - Parameters containing sessionId, transcript data, session start time, and whether to mark session as ended
 * @returns Object indicating success/failure and the updated data
 */
export const updateTranscript = async (params: UpdateTranscriptParams) => {
  try {
    const supabase = await createClient()
    
    const updateData: {
      transcript: Record<string, any> | null;
      session_start?: string;
      session_end?: string;
      status?: Database['public']['Enums']['session_status'];
    } = {
      transcript: params.transcript
    }
    
    // Set session start time if provided
    if (params.sessionStart) {
      updateData.session_start = params.sessionStart
    }
    
    // If this is the end of the session, add the end timestamp and mark as completed
    if (params.sessionEnd) {
      updateData.session_end = new Date().toISOString()
      updateData.status = 'completed'
    }
    
    const { data, error } = await supabase
      .from('interview_sessions')
      .update(updateData)
      .eq('id', params.sessionId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating interview transcript:', error)
      throw error
    }
    
    return {
      success: true,
      data
    }
  } catch (error) {
    console.error('Error in updateTranscript:', error)
    return {
      success: false,
      error
    }
  }
}