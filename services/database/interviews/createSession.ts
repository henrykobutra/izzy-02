'use server'

import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/supabase'

export type CreateSessionParams = {
  interview_type: Database['public']['Enums']['interview_type']
  job_title: string | null
  interview_question_amount: number
  interview_strategy_id: string | null
  profile_id: string
  session_source: Database['public']['Enums']['session_source']
  suggested_interview_questions: any
  topics_covered: any
  user_id: string
}

export const createSession = async (params: CreateSessionParams) => {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('interview_sessions')
      .insert({
        interview_type: params.interview_type,
        job_title: params.job_title,
        interview_question_amount: params.interview_question_amount,
        interview_strategy_id: params.interview_strategy_id,
        profile_id: params.profile_id,
        session_source: params.session_source,
        suggested_interview_questions: params.suggested_interview_questions,
        topics_covered: params.topics_covered,
        user_id: params.user_id,
        status: 'created',
        session_start: new Date().toISOString(),
        transcript: null
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating interview session:', error)
      throw error
    }
    
    return {
      success: true,
      data
    }
  } catch (error) {
    console.error('Error in createSession:', error)
    return {
      success: false,
      error
    }
  }
}