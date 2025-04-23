-- Create the interview_feedback table
CREATE TABLE interview_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    session_id UUID NOT NULL,
    overall_score NUMERIC NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100), -- Overall score (0-100)
    skills_breakdown JSONB NOT NULL, -- e.g., [{"skill": "Python", "score": 85, "feedback": "Strong coding skills but missed edge cases"}]
    strengths JSONB NOT NULL, -- e.g., [{"trait": "Communication", "description": "Clear and concise responses"}]
    weaknesses JSONB NOT NULL, -- e.g., [{"trait": "Time Management", "description": "Took too long on some questions"}]
    areas_for_improvement JSONB NOT NULL, -- e.g., [{"topic": "SQL Queries", "description": "Practice complex joins"}]
    feedback_summary TEXT NOT NULL, -- e.g., "Performed well in technical areas but needs to improve behavioral responses"
    confidence_score NUMERIC NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100), -- Agent's confidence in feedback (0-100)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Foreign key to auth.users(id) with cascade delete
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    -- Foreign key to interview_sessions(id) with cascade delete
    CONSTRAINT fk_session_id FOREIGN KEY (session_id) REFERENCES interview_sessions(id) ON DELETE CASCADE,
    -- Ensure the referenced session is completed
    CONSTRAINT check_session_status CHECK (
        (SELECT status FROM interview_sessions WHERE id = session_id) = 'completed'
    )
);

-- Add indexes for faster lookups
CREATE INDEX idx_interview_feedback_user_id ON interview_feedback (user_id);
CREATE INDEX idx_interview_feedback_session_id ON interview_feedback (session_id);
CREATE INDEX idx_interview_feedback_created_at ON interview_feedback (created_at);

-- Enable Row-Level Security (RLS) on the interview_feedback table
ALTER TABLE interview_feedback ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to view their own feedback
CREATE POLICY user_view_own_feedback ON interview_feedback
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create a policy to allow users to insert their own feedback
CREATE POLICY user_insert_own_feedback ON interview_feedback
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create a policy to allow users to update their own feedback
CREATE POLICY user_update_own_feedback ON interview_feedback
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create a policy to allow users to delete their own feedback
CREATE POLICY user_delete_own_feedback ON interview_feedback
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a policy for admins to have full access
CREATE POLICY admin_all_access ON interview_feedback
    FOR ALL
    USING (auth.role() = 'admin')
    WITH CHECK (auth.role() = 'admin');

-- Allow authenticated users to access the table (required for RLS to work in Supabase)
GRANT ALL ON interview_feedback TO authenticated;