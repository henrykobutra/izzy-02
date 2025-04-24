'use server'

import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/types/supabase'

export type CancelInterviewParams = {
    sessionId: string
}

/**
 * Cancels an interview session and removes the transcript
 * @param params - Parameters containing sessionId of the interview to cancel
 * @returns Object indicating success/failure and the updated data
 */
export const cancelInterview = async (params: CancelInterviewParams) => {
    try {
        const supabase = await createClient()

        const updateData: {
            transcript: null;
            status: Database['public']['Enums']['session_status'];
            session_end: string;
        } = {
            transcript: null,
            status: 'canceled',
            session_end: new Date().toISOString()
        }

        const { data, error } = await supabase
            .from('interview_sessions')
            .update(updateData)
            .eq('id', params.sessionId)
            .select()
            .single()

        if (error) {
            console.error('Error cancelling interview:', error)
            throw error
        }

        return {
            success: true,
            data
        }
    } catch (error) {
        console.error('Error in cancelInterview:', error)
        return {
            success: false,
            error
        }
    }
}
