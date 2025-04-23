export interface InterviewFeedback {
  overall_score: number
  skills_breakdown: Array<{
    skill: string
    score: number
    feedback: string
  }>
  strengths: Array<{
    trait: string
    description: string
  }>
  weaknesses: Array<{
    trait: string
    description: string
  }>
  areas_for_improvement: Array<{
    topic: string
    description: string
  }>
  feedback_summary: string
  confidence_score: number
  id?: string
  session_id?: string
  is_removed?: boolean
  user_id?: string
}

export type FeedbackWithMetadata = InterviewFeedback & {
  id: string
  session_id: string
  created_at: string
  updated_at: string | null
  interview_sessions?: {
    job_title: string | null
    interview_type: string
    interview_strategy_id?: string | null
    interview_question_amount?: number
  }
}

export interface FeedbackTableProps {
  data: FeedbackWithMetadata[];
  loading: boolean;
  hasFeedback: boolean;
  refetchFeedback: () => void;
}
