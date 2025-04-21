'use server'

import { createClient } from "@/utils/supabase/server"

/**
 * Deletes an interview session by its ID
 * @param sessionId The ID of the session to delete
 * @returns Object indicating success or failure of the operation
 */
export const deleteSession = async (sessionId: string) => {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('interview_sessions')
      .delete()
      .eq('id', sessionId)
    
    if (error) {
      console.error('Error deleting interview session:', error)
      throw error
    }
    
    return {
      success: true
    }
  } catch (error) {
    console.error('Error in deleteSession:', error)
    return {
      success: false,
      error
    }
  }
}