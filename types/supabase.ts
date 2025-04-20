export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      interview_feedback: {
        Row: {
          areas_for_improvement: Json
          confidence_score: number
          created_at: string | null
          feedback_summary: string
          id: string
          overall_score: number
          session_id: string
          skills_breakdown: Json
          strengths: Json
          updated_at: string | null
          user_id: string
          weaknesses: Json
        }
        Insert: {
          areas_for_improvement: Json
          confidence_score: number
          created_at?: string | null
          feedback_summary: string
          id?: string
          overall_score: number
          session_id: string
          skills_breakdown: Json
          strengths: Json
          updated_at?: string | null
          user_id: string
          weaknesses: Json
        }
        Update: {
          areas_for_improvement?: Json
          confidence_score?: number
          created_at?: string | null
          feedback_summary?: string
          id?: string
          overall_score?: number
          session_id?: string
          skills_breakdown?: Json
          strengths?: Json
          updated_at?: string | null
          user_id?: string
          weaknesses?: Json
        }
        Relationships: [
          {
            foreignKeyName: "fk_session_id"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "interview_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_preferences: {
        Row: {
          created_at: string | null
          feedback_detail_level: Database["public"]["Enums"]["feedback_detail_level"]
          id: string
          language_preference: Database["public"]["Enums"]["language_preference"]
          seniority_level: Database["public"]["Enums"]["seniority_level"] | null
          seniority_level_source: Database["public"]["Enums"]["setting_source"]
          target_industry: string | null
          target_industry_source: Database["public"]["Enums"]["setting_source"]
          target_position: string | null
          target_position_source: Database["public"]["Enums"]["setting_source"]
          toughness_level: Database["public"]["Enums"]["toughness_level"] | null
          toughness_level_source: Database["public"]["Enums"]["setting_source"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          feedback_detail_level?: Database["public"]["Enums"]["feedback_detail_level"]
          id?: string
          language_preference?: Database["public"]["Enums"]["language_preference"]
          seniority_level?:
            | Database["public"]["Enums"]["seniority_level"]
            | null
          seniority_level_source?: Database["public"]["Enums"]["setting_source"]
          target_industry?: string | null
          target_industry_source?: Database["public"]["Enums"]["setting_source"]
          target_position?: string | null
          target_position_source?: Database["public"]["Enums"]["setting_source"]
          toughness_level?:
            | Database["public"]["Enums"]["toughness_level"]
            | null
          toughness_level_source?: Database["public"]["Enums"]["setting_source"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          feedback_detail_level?: Database["public"]["Enums"]["feedback_detail_level"]
          id?: string
          language_preference?: Database["public"]["Enums"]["language_preference"]
          seniority_level?:
            | Database["public"]["Enums"]["seniority_level"]
            | null
          seniority_level_source?: Database["public"]["Enums"]["setting_source"]
          target_industry?: string | null
          target_industry_source?: Database["public"]["Enums"]["setting_source"]
          target_position?: string | null
          target_position_source?: Database["public"]["Enums"]["setting_source"]
          toughness_level?:
            | Database["public"]["Enums"]["toughness_level"]
            | null
          toughness_level_source?: Database["public"]["Enums"]["setting_source"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      interview_sessions: {
        Row: {
          created_at: string | null
          id: string
          interview_strategy_id: string | null
          interview_type: Database["public"]["Enums"]["interview_type"]
          job_title: string | null
          profile_id: string
          session_end: string | null
          session_source: Database["public"]["Enums"]["session_source"]
          session_start: string
          status: Database["public"]["Enums"]["session_status"]
          topics_covered: Json
          transcript: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interview_strategy_id?: string | null
          interview_type: Database["public"]["Enums"]["interview_type"]
          job_title?: string | null
          profile_id: string
          session_end?: string | null
          session_source: Database["public"]["Enums"]["session_source"]
          session_start?: string
          status?: Database["public"]["Enums"]["session_status"]
          topics_covered?: Json
          transcript?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interview_strategy_id?: string | null
          interview_type?: Database["public"]["Enums"]["interview_type"]
          job_title?: string | null
          profile_id?: string
          session_end?: string | null
          session_source?: Database["public"]["Enums"]["session_source"]
          session_start?: string
          status?: Database["public"]["Enums"]["session_status"]
          topics_covered?: Json
          transcript?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_interview_strategy_id"
            columns: ["interview_strategy_id"]
            isOneToOne: false
            referencedRelation: "interview_strategies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_profile_id"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_strategies: {
        Row: {
          alignment_summary: string
          created_at: string | null
          focus_points: Json
          id: string
          interview_strategy: Json
          job_company: string
          job_description: string
          job_description_key_points: Json
          job_description_summary: string
          job_experience_level: string
          job_industry: string
          job_title: string
          key_alignments: Json
          match_rate: number
          potential_challenges: Json
          profile_id: string
          strengths: Json
          updated_at: string | null
          user_id: string
          weaknesses: Json
        }
        Insert: {
          alignment_summary: string
          created_at?: string | null
          focus_points: Json
          id?: string
          interview_strategy: Json
          job_company: string
          job_description: string
          job_description_key_points: Json
          job_description_summary: string
          job_experience_level: string
          job_industry: string
          job_title: string
          key_alignments: Json
          match_rate: number
          potential_challenges: Json
          profile_id: string
          strengths: Json
          updated_at?: string | null
          user_id: string
          weaknesses: Json
        }
        Update: {
          alignment_summary?: string
          created_at?: string | null
          focus_points?: Json
          id?: string
          interview_strategy?: Json
          job_company?: string
          job_description?: string
          job_description_key_points?: Json
          job_description_summary?: string
          job_experience_level?: string
          job_industry?: string
          job_title?: string
          key_alignments?: Json
          match_rate?: number
          potential_challenges?: Json
          profile_id?: string
          strengths?: Json
          updated_at?: string | null
          user_id?: string
          weaknesses?: Json
        }
        Relationships: [
          {
            foreignKeyName: "fk_profile_id"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          achievements: Json
          certifications: Json
          created_at: string | null
          education: Json
          experience: Json
          experience_level: string
          experience_level_summary: string
          id: string
          industries: Json
          is_resume: boolean
          professional_summary: string
          skills: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          achievements: Json
          certifications: Json
          created_at?: string | null
          education: Json
          experience: Json
          experience_level: string
          experience_level_summary: string
          id?: string
          industries: Json
          is_resume: boolean
          professional_summary: string
          skills: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          achievements?: Json
          certifications?: Json
          created_at?: string | null
          education?: Json
          experience?: Json
          experience_level?: string
          experience_level_summary?: string
          id?: string
          industries?: Json
          is_resume?: boolean
          professional_summary?: string
          skills?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      feedback_detail_level: "standard" | "detailed"
      interview_type: "technical" | "behavioral" | "comprehensive"
      language_preference: "english"
      seniority_level: "junior" | "mid_level" | "senior"
      session_source: "specific" | "generic"
      session_status: "canceled" | "completed"
      setting_source: "dynamic" | "override"
      toughness_level: "easy" | "medium" | "hard"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      feedback_detail_level: ["standard", "detailed"],
      interview_type: ["technical", "behavioral", "comprehensive"],
      language_preference: ["english"],
      seniority_level: ["junior", "mid_level", "senior"],
      session_source: ["specific", "generic"],
      session_status: ["canceled", "completed"],
      setting_source: ["dynamic", "override"],
      toughness_level: ["easy", "medium", "hard"],
    },
  },
} as const
