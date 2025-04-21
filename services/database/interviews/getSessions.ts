"use server"

import { createClient } from "@/utils/supabase/server"
import type { InterviewSession } from "@/types/interview-session"

/**
 * Fetches all interview sessions for a specific user
 * @param userId The ID of the user whose sessions to retrieve
 * @returns Array of interview sessions or empty array on error
 */
export const getSessions = async (userId: string) => {
    const supabase = await createClient()
    
    try {
        const { data, error } = await supabase
            .from('interview_sessions')
            .select(`
                *,
                profiles:profile_id (
                    id,
                    name,
                    summary,
                    experience_level,
                    experience_level_description,
                    industry_experience,
                    last_analyzed
                )
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
        
        if (error) {
            throw error
        }
        
        return data as InterviewSession[]
    } catch (error) {
        console.error('Error fetching interview sessions:', error)
        return []
    }
}

/**
 * Fetches a specific interview session by ID
 * @param id The ID of the session to retrieve
 * @returns The interview session or null on error
 */
export const getSessionById = async (id: string) => {
    const supabase = await createClient()
    
    try {
        const { data, error } = await supabase
            .from('interview_sessions')
            .select(`
                *,
                profiles:profile_id (
                    id,
                    name,
                    summary,
                    experience_level,
                    experience_level_description,
                    industry_experience,
                    last_analyzed
                )
            `)
            .eq('id', id)
            .single()
        
        if (error) {
            throw error
        }
        
        return data as InterviewSession
    } catch (error) {
        console.error('Error fetching interview session:', error)
        return null
    }
}

/**
 * Fetches all interview sessions for a specific profile
 * @param profileId The ID of the profile whose sessions to retrieve
 * @returns Array of interview sessions or empty array on error
 */
export const getSessionsByProfileId = async (profileId: string) => {
    const supabase = await createClient()
    
    try {
        const { data, error } = await supabase
            .from('interview_sessions')
            .select(`
                *,
                profiles:profile_id (
                    id,
                    name,
                    summary,
                    experience_level,
                    experience_level_description,
                    industry_experience,
                    last_analyzed
                )
            `)
            .eq('profile_id', profileId)
            .order('created_at', { ascending: false })
        
        if (error) {
            throw error
        }
        
        return data as InterviewSession[]
    } catch (error) {
        console.error('Error fetching profile interview sessions:', error)
        return []
    }
}
