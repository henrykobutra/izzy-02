'use client'

import { useState, useCallback, useEffect } from 'react'
import { getSessionById } from '@/services/database/interviews/getSessions'
import { deleteSession } from '@/services/database/interviews/deleteSession'
import type { InterviewSession } from '@/types/interview-session'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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

export function useDeleteInterviewSession(sessionId: string) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = useCallback(async () => {
    if (!sessionId) return

    setDeleting(true)
    try {
      await deleteSession(sessionId)
      toast.success('Interview session deleted successfully')
      router.push('/dashboard/practice-interview')
    } catch (error) {
      console.error('Error deleting interview session:', error)
      toast.error('Failed to delete interview session')
      setDeleting(false)
    }
  }, [sessionId, router])

  return { deleting, handleDelete }
}
