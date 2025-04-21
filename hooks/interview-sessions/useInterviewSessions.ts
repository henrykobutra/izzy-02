'use client'

import { useState, useCallback, useEffect } from 'react'
import { getSessions, getSessionsByProfileId } from '@/services/database/interviews/getSessions'
import type { InterviewSession } from '@/types/interview-session'
import { userService } from '@/services/user.service'

export function useInterviewSessions(profileId?: string) {
    const [sessions, setSessions] = useState<InterviewSession[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)
    const [hasSessions, setHasSessions] = useState(false)

    const fetchSessions = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const userData = await userService.getCurrentUser()
            if (!userData) {
                setHasSessions(false)
                setSessions([])
                return
            }
            
            let sessionsData: InterviewSession[] = []
            
            if (profileId) {
                // Fetch sessions for a specific profile
                sessionsData = await getSessionsByProfileId(profileId)
            } else {
                // Fetch all sessions for the user
                sessionsData = await getSessions(userData.id)
            }
            
            setSessions(sessionsData)
            setHasSessions(sessionsData.length > 0)
        } catch (error) {
            setError(error)
            setHasSessions(false)
            setSessions([])
        } finally {
            setLoading(false)
        }
    }, [profileId])

    useEffect(() => {
        fetchSessions()
    }, [fetchSessions])

    return { 
        sessions, 
        loading, 
        error, 
        hasSessions, 
        refetch: fetchSessions 
    }
}