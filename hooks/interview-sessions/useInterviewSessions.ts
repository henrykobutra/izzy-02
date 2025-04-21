'use client'

import { useState, useCallback, useEffect } from 'react'
import { getSessions, getSessionById } from '@/services/database/interviews/getSessions'
import type { InterviewSession } from '@/types/interview-session'
import { userService } from '@/services/user.service'

export function useInterviewSessions() {
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
            
            // Fetch all sessions for the user
            const sessionsData = await getSessions(userData.id)
            
            setSessions(sessionsData)
            setHasSessions(sessionsData.length > 0)
        } catch (error) {
            setError(error)
            setHasSessions(false)
            setSessions([])
        } finally {
            setLoading(false)
        }
    }, [])

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

export function useInterviewSession(sessionId: string) {
    const [session, setSession] = useState<InterviewSession | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)

    const fetchSession = useCallback(async () => {
        if (!sessionId) {
            setSession(null)
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)
        try {
            const sessionData = await getSessionById(sessionId)
            setSession(sessionData)
        } catch (error) {
            setError(error)
            setSession(null)
        } finally {
            setLoading(false)
        }
    }, [sessionId])

    useEffect(() => {
        fetchSession()
    }, [fetchSession])

    return {
        session,
        loading,
        error,
        refetch: fetchSession
    }
}