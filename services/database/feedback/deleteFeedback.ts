'use server'

import { createClient } from '@/utils/supabase/server'

/**
 * Soft deletes a feedback entry by marking it as removed
 * 
 * @param feedbackId - The ID of the feedback to mark as removed
 * @returns A boolean indicating whether the operation was successful
 */
export const deleteFeedback = async (
    feedbackId: string
): Promise<boolean> => {
    if (!feedbackId) {
        return false
    }

    try {
        const supabase = await createClient()

        const { error } = await supabase
            .from('interview_feedback')
            .update({ is_removed: true })
            .eq('id', feedbackId)

        if (error) {
            console.error('Error soft deleting feedback:', error)
            return false
        }

        return true
    } catch (error) {
        console.error('Error in deleteFeedback:', error)
        return false
    }
}