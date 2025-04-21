'use client'

import { createSession, CreateSessionParams } from "@/services/database/interviews/createSession"
import { generateQuestions } from "@/services/agents/questions.agent"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Database } from "@/types/supabase"
import { getProfile } from "@/services/database/profiles/getProfile"
import { getStrategyById } from "@/services/database/strategies/getStrategy"

type SessionFormInput = {
  positionType: "generic" | "specific"
  position: string
  company?: string
  interviewType: Database['public']['Enums']['interview_type']
  numberOfQuestions: number
  profileId: string
  userId: string
  interviewStrategyId?: string | null
}

export function useCreateSession() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const createInterviewSession = useCallback(async (data: SessionFormInput) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Determine session source based on positionType
      const sessionSource: Database['public']['Enums']['session_source'] = 
        data.positionType === 'generic' ? 'generic' : 'specific'
      
      // Fetch the candidate profile data
      const profileData = await getProfile(data.userId)
      if (!profileData) {
        throw new Error('Failed to fetch candidate profile')
      }
      
      // Fetch the strategy data if available
      let strategyData = null
      if (data.interviewStrategyId) {
        strategyData = await getStrategyById(data.interviewStrategyId)
        if (!strategyData && data.interviewStrategyId) {
          console.warn('Strategy not found despite ID being provided')
        }
      }
      
      // Generate questions for the session using the questions agent
      const questionsResponse = await generateQuestions({
        numberOfQuestions: data.numberOfQuestions,
        jobTitle: data.position,
        positionType: data.positionType,
        interviewType: data.interviewType,
        candidateProfile: profileData,
        strategy: strategyData || undefined
      })
      
      // Create session params from the form input and generated questions
      const sessionParams: CreateSessionParams = {
        interview_type: data.interviewType,
        job_title: data.position,
        interview_question_amount: data.numberOfQuestions,
        interview_strategy_id: data.interviewStrategyId || null,
        profile_id: data.profileId,
        session_source: sessionSource,
        suggested_interview_questions: questionsResponse.questions,
        topics_covered: questionsResponse.topics_covered,
        user_id: data.userId
      }
      
      // Create the session in the database
      const result = await createSession(sessionParams)
      
      if (!result.success) {
        throw new Error('Failed to create interview session')
      }
      
      // Navigate to the interview session page upon successful creation
      router.push(`/dashboard/interview-session/${result.data.id}`)
      
      // Return the created session data
      return result.data
    } catch (err) {
      console.error('Error in useCreateSession:', err)
      setError(err instanceof Error ? err : new Error('An unknown error occurred'))
      return null
    } finally {
      setIsLoading(false)
    }
  }, [router])
  
  return {
    createInterviewSession,
    isLoading,
    error
  }
}