'use server'

import { createClient } from '@/utils/supabase/server'
import { FeedbackWithMetadata } from '@/types/interview-feedback'

/**
 * Retrieves a specific feedback entry by its ID
 * 
 * @param feedbackId - The ID of the feedback to retrieve
 * @returns The feedback entry with its metadata, or null if not found
 */
export const getFeedback = async (
    feedbackId: string
): Promise<FeedbackWithMetadata | null> => {
    if (!feedbackId) {
        return null
    }

    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('interview_feedback')
            .select(`
                *,
                interview_sessions (
                    job_title,
                    interview_type,
                    interview_strategy_id,
                    interview_question_amount
                )
            `)
            .eq('id', feedbackId)
            .eq('is_removed', false)
            .single()

        if (error) {
            console.error('Error retrieving feedback:', error)
            return null
        }

        return data as FeedbackWithMetadata
    } catch (error) {
        console.error('Error in getFeedback:', error)
        return null
    }
}

/**
 * Retrieves feedback entries by interview session ID
 * 
 * @param sessionId - The ID of the interview session
 * @returns Array of feedback entries with metadata, or empty array if none found
 */
export const getFeedbackBySessionId = async (
    sessionId: string
): Promise<FeedbackWithMetadata[] | null> => {
    if (!sessionId) {
        return null
    }

    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('interview_feedback')
            .select(`
                *,
                interview_sessions (
                    job_title,
                    interview_type,
                    interview_strategy_id,
                    interview_question_amount,
                    transcript
                )
            `)
            .eq('session_id', sessionId)
            .eq('is_removed', false)

        if (error) {
            console.error('Error retrieving feedback by session ID:', error)
            return null
        }

        return data as FeedbackWithMetadata[]
    } catch (error) {
        console.error('Error in getFeedbackBySessionId:', error)
        return null
    }
}