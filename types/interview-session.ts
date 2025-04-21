import { ProfileAnalysis } from "./profile";

export type InterviewSession = {
  id?: string;
  user_id: string;
  profile_id: string;
  interview_type: "behavioral" | "technical" | "comprehensive";
  interview_question_amount: number;
  interview_strategy_id?: string | null;
  job_title?: string | null;
  session_source: "user" | "ai" | "recruiter";
  status: "created" | "canceled" | "completed";
  session_start?: string | null;
  session_end?: string | null;
  suggested_interview_questions: any[]; // JSON array
  topics_covered: string[]; // JSON array
  transcript?: Record<string, any> | null; // JSON object
  created_at?: string;
  updated_at?: string | null;

  // Additional fields for UI state or relationships
  profile?: ProfileAnalysis;
};

// Helper type for creating a new session
export type CreateInterviewSession = Omit<InterviewSession, "id" | "created_at" | "updated_at" | "profile">;