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
}
