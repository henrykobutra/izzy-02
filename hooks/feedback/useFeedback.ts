'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'

import { processInterviewFeedback } from '@/services/feedback/process-interview'
import { getAllFeedback } from '@/services/database/feedback/getAllFeedback'
import { getFeedback } from '@/services/database/feedback/getFeedback'
import { deleteFeedback } from '@/services/database/feedback/deleteFeedback'
import { getReadyForFeedback } from '@/services/database/feedback/getReadyForFeedback'

import type { FeedbackWithMetadata } from '@/types/interview-feedback'
import type { InterviewSession } from '@/types/interview-session'

interface FeedbackState {
  allFeedback: FeedbackWithMetadata[]
  currentFeedback: FeedbackWithMetadata | null
  sessionsReadyForFeedback: InterviewSession[]
}

interface LoadingState {
  isLoadingAll: boolean
  isLoadingCurrent: boolean
  isProcessing: boolean
  isDeleting: boolean
  isLoadingReady: boolean
}

interface FeedbackResult<T> {
  success: boolean
  data?: T
  error?: Error | unknown
}

export function useFeedback(userId: string) {
  // States
  const [feedbackState, setFeedbackState] = useState<FeedbackState>({
    allFeedback: [],
    currentFeedback: null,
    sessionsReadyForFeedback: []
  })

  const [loading, setLoading] = useState<LoadingState>({
    isLoadingAll: false,
    isLoadingCurrent: false,
    isProcessing: false,
    isDeleting: false,
    isLoadingReady: false
  })

  // Load all feedback for a user
  const loadAllFeedback = useCallback(async (): Promise<FeedbackResult<FeedbackWithMetadata[]>> => {
    if (!userId) {
      return { success: false, error: new Error('User ID is required') }
    }

    setLoading(prev => ({ ...prev, isLoadingAll: true }))
    
    try {
      const data = await getAllFeedback(userId)
      setFeedbackState(prev => ({ ...prev, allFeedback: data }))
      return { success: true, data }
    } catch (error) {
      toast.error('Unable to load your feedback history')
      return { success: false, error }
    } finally {
      setLoading(prev => ({ ...prev, isLoadingAll: false }))
    }
  }, [userId])

  // Load a specific feedback by ID
  const loadFeedback = useCallback(async (feedbackId: string): Promise<FeedbackResult<FeedbackWithMetadata | null>> => {
    if (!feedbackId) {
      return { success: false, error: new Error('Feedback ID is required') }
    }

    setLoading(prev => ({ ...prev, isLoadingCurrent: true }))
    
    try {
      const data = await getFeedback(feedbackId)
      setFeedbackState(prev => ({ ...prev, currentFeedback: data }))
      return { success: true, data }
    } catch (error) {
      toast.error('Unable to load the selected feedback')
      return { success: false, error }
    } finally {
      setLoading(prev => ({ ...prev, isLoadingCurrent: false }))
    }
  }, [])

  // Process interview feedback
  const processFeedback = useCallback(async (sessionId: string): Promise<FeedbackResult<any>> => {
    if (!userId || !sessionId) {
      return { success: false, error: new Error('User ID and Session ID are required') }
    }

    setLoading(prev => ({ ...prev, isProcessing: true }))
    
    try {
      const result = await processInterviewFeedback(userId, sessionId)
      
      if (!result.success) {
        throw result.error
      }
      
      // Refresh the feedback list after processing
      await loadAllFeedback()
      
      toast.success('Your interview feedback has been successfully generated')
      
      return { success: true, data: result.feedback }
    } catch (error) {
      toast.error('Unable to generate feedback for this interview')
      return { success: false, error }
    } finally {
      setLoading(prev => ({ ...prev, isProcessing: false }))
    }
  }, [userId, loadAllFeedback])

  // Delete feedback
  const removeFeedback = useCallback(async (feedbackId: string): Promise<FeedbackResult<boolean>> => {
    if (!feedbackId) {
      return { success: false, error: new Error('Feedback ID is required') }
    }

    setLoading(prev => ({ ...prev, isDeleting: true }))
    
    try {
      const success = await deleteFeedback(feedbackId)
      
      if (success) {
        // Update the state by removing the deleted feedback
        setFeedbackState(prev => ({
          ...prev,
          allFeedback: prev.allFeedback.filter(feedback => feedback.id !== feedbackId),
          currentFeedback: prev.currentFeedback?.id === feedbackId ? null : prev.currentFeedback
        }))
        
        toast.success('The feedback has been successfully removed')
      } else {
        throw new Error('Failed to delete feedback')
      }
      
      return { success }
    } catch (error) {
      toast.error('Unable to remove the selected feedback')
      return { success: false, error }
    } finally {
      setLoading(prev => ({ ...prev, isDeleting: false }))
    }
  }, [])

  // Get sessions ready for feedback
  const loadSessionsReadyForFeedback = useCallback(async (): Promise<FeedbackResult<InterviewSession[]>> => {
    if (!userId) {
      return { success: false, error: new Error('User ID is required') }
    }

    setLoading(prev => ({ ...prev, isLoadingReady: true }))
    
    try {
      const sessions = await getReadyForFeedback(userId)
      setFeedbackState(prev => ({ ...prev, sessionsReadyForFeedback: sessions }))
      return { success: true, data: sessions }
    } catch (error) {
      toast.error('Unable to load interview sessions ready for feedback')
      return { success: false, error }
    } finally {
      setLoading(prev => ({ ...prev, isLoadingReady: false }))
    }
  }, [userId])

  return {
    // State
    feedback: feedbackState.allFeedback,
    currentFeedback: feedbackState.currentFeedback,
    sessionsReadyForFeedback: feedbackState.sessionsReadyForFeedback,
    
    // Loading states
    isLoadingFeedback: loading.isLoadingAll,
    isLoadingCurrentFeedback: loading.isLoadingCurrent,
    isProcessingFeedback: loading.isProcessing,
    isDeletingFeedback: loading.isDeleting,
    isLoadingReadySessions: loading.isLoadingReady,
    
    // Actions
    loadAllFeedback,
    loadFeedback,
    processFeedback,
    removeFeedback,
    loadSessionsReadyForFeedback
  }
}