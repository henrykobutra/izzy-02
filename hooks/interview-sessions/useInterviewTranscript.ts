'use client'

import { useState, useCallback } from 'react'
import { updateTranscript } from '@/services/database/interviews/updateTranscript'

interface ConversationMessage {
  type: string
  conversation: Array<{
    role: string
    content: string
  }>
  messages?: Array<{
    role: string
    message: string
    time: number
    secondsFromStart: number
    duration?: number
    endTime?: number
    source?: string
  }>
  messagesOpenAIFormatted?: any[]
  message?: {
    conversation?: any
  }
}

/**
 * Hook for managing interview session transcripts and session timing
 * @param sessionId - ID of the current interview session
 */
export function useInterviewTranscript(sessionId: string) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [lastUpdateStatus, setLastUpdateStatus] = useState<'success' | 'error' | null>(null)

  /**
   * Records the session start time in the database
   * @param startTime - ISO string timestamp for session start
   */
  const recordSessionStart = useCallback(
    async (startTime: string) => {
      if (!sessionId) {
        setError(new Error('No session ID provided'))
        setLastUpdateStatus('error')
        return { success: false }
      }

      setIsUpdating(true)
      setError(null)

      try {
        const result = await updateTranscript({
          sessionId,
          transcript: null,
          sessionStart: startTime
        })

        if (!result.success) {
          throw result.error
        }

        setLastUpdateStatus('success')
        return result
      } catch (err) {
        setError(err)
        setLastUpdateStatus('error')
        return { success: false, error: err }
      } finally {
        setIsUpdating(false)
      }
    },
    [sessionId]
  )

  /**
   * Updates the session transcript with the latest conversation
   * @param conversationMessages - Array of conversation messages
   * @param endSession - Whether to mark the session as ended (defaults to false)
   */
  const updateSessionTranscript = useCallback(
    async (conversationMessages: ConversationMessage[], endSession = false) => {
      if (!sessionId) {
        setError(new Error('No session ID provided'))
        setLastUpdateStatus('error')
        return { success: false }
      }

      setIsUpdating(true)
      setError(null)

      try {
        const lastConversationUpdate = conversationMessages
          .filter(msg => msg.type === 'conversation-update')
          .pop()

        if (!lastConversationUpdate) {
          const error = new Error('No conversation update messages found');
          setError(error);
          setLastUpdateStatus('error');
          return { success: false, error };
        }

        if (!lastConversationUpdate.conversation) {
          const error = new Error('Missing conversation property in update message');
          setError(error);
          setLastUpdateStatus('error');
          return { success: false, error };
        }

        const transcript = lastConversationUpdate.conversation;

        const result = await updateTranscript({
          sessionId,
          transcript,
          sessionEnd: endSession
        })

        if (!result.success) {
          throw result.error
        }

        setLastUpdateStatus('success')
        return result
      } catch (err) {
        setError(err)
        setLastUpdateStatus('error')
        return { success: false, error: err }
      } finally {
        setIsUpdating(false)
      }
    },
    [sessionId]
  )

  /**
   * Ends the interview session and saves the final transcript
   * @param conversationMessages - Array of conversation messages
   */
  const endInterviewSession = useCallback(
    async (conversationMessages: ConversationMessage[]) => {
      return updateSessionTranscript(conversationMessages, true)
    },
    [updateSessionTranscript]
  )

  return {
    isUpdating,
    error,
    lastUpdateStatus,
    recordSessionStart,
    updateSessionTranscript,
    endInterviewSession
  }
}
