import { createClient } from '@/utils/supabase/server'
import type { InterviewSession } from '@/types/interview-session'
import { getAllFeedback } from './getAllFeedback'

/**
 * Fetches all completed interview sessions that don't have feedback yet
 * @param userId The ID of the user whose sessions to retrieve
 * @returns Array of interview sessions ready for feedback or empty array on error
 */
export const getReadyForFeedback = async (userId: string): Promise<InterviewSession[]> => {
    const supabase = await createClient()

    try {
        // 1. Get all completed sessions
        const { data: sessions, error } = await supabase
            .from('interview_sessions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'completed') // Only completed sessions
            .eq('is_removed', false)
            .order('created_at', { ascending: false })

        if (error) {
            throw error
        }

        if (!sessions || sessions.length === 0) {
            return []
        }

        // 2. Get all feedback for this user
        const feedback = await getAllFeedback(userId)
        
        // 3. Create a set of session IDs that already have feedback
        const sessionIdsWithFeedback = new Set(
            feedback.map(item => item.session_id)
        )
        
        // 4. Filter sessions to only include those without feedback
        const sessionsReadyForFeedback = sessions.filter((session: InterviewSession) => 
            !sessionIdsWithFeedback.has(session.id as string)
        )

        return sessionsReadyForFeedback as InterviewSession[]
    } catch (error) {
        console.error('Error fetching sessions ready for feedback:', error)
        return []
    }
}