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
            .select('*')
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