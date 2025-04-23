'use server'

import { createClient } from '@/utils/supabase/server'
import type { InterviewFeedback, FeedbackWithMetadata } from '@/types/interview-feedback'

/**
 * Retrieves all feedback entries for a user
 * 
 * @param userId - The ID of the user whose feedback to retrieve
 * @returns Array of feedback entries with their IDs and creation dates, or empty array if none found
 */
export const getAllFeedback = async (
    userId: string
): Promise<FeedbackWithMetadata[]> => {
    if (!userId) {
        return []
    }

    try {
        const supabase = await createClient()

        const response = await supabase
            .from('interview_feedback')
            .select(`
                *,
                interview_sessions (
                    job_title,
                    interview_type
                )
            `)
            .eq('user_id', userId)
            .eq('is_removed', false)
            .order('created_at', { ascending: false })

        const { data, error } = response

        if (error) {
            console.error('Error retrieving feedback:', error)
            return []
        }

        return (data || []) as FeedbackWithMetadata[]
    } catch (error) {
        console.error('Error in getAllFeedback:', error)
        return []
    }
}