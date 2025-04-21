-- Enable the UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types for session_source, interview_type, and status
CREATE TYPE session_source AS ENUM ('specific', 'generic');
CREATE TYPE interview_type AS ENUM ('technical', 'behavioral', 'comprehensive');
CREATE TYPE session_status AS ENUM ('created','canceled', 'completed');

-- Create the interview_sessions table
CREATE TABLE interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    profile_id UUID NOT NULL,
    session_source session_source NOT NULL,
    interview_strategy_id UUID, -- Required for specific sessions
    job_title TEXT, -- Required for generic sessions
    interview_type interview_type NOT NULL,
    interview_question_amount INT NOT NULL DEFAULT 10, -- Number of questions to generate
    suggested_interview_questions JSONB NOT NULL DEFAULT '{}', -- Suggested interview questions
    topics_covered JSONB NOT NULL DEFAULT '{}', -- e.g., {"technical": ["Python programming"], "behavioral": ["Teamwork scenarios"]}
    status session_status NOT NULL DEFAULT 'completed',
    transcript JSONB, -- Nullable, e.g., {"interviewer": ["Tell me about yourself"], "user": ["I have 4 years of experience…"]}
    session_start TIMESTAMP WITH TIME ZONE,
    session_end TIMESTAMP WITH TIME ZONE, -- Nullable if session is canceled or ongoing
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Foreign key to auth.users(id) with cascade delete
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    -- Foreign key to profiles(id) with cascade delete
    CONSTRAINT fk_profile_id FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    -- Foreign key to interview_strategies(id) with cascade delete (nullable)
    CONSTRAINT fk_interview_strategy_id FOREIGN KEY (interview_strategy_id) REFERENCES interview_strategies(id) ON DELETE CASCADE,
);

-- Add indexes for faster lookups
CREATE INDEX idx_interview_sessions_user_id ON interview_sessions (user_id);
CREATE INDEX idx_interview_sessions_profile_id ON interview_sessions (profile_id);
CREATE INDEX idx_interview_sessions_interview_strategy_id ON interview_sessions (interview_strategy_id);
CREATE INDEX idx_interview_sessions_created_at ON interview_sessions (created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the update_timestamp function
CREATE TRIGGER update_interview_sessions_timestamp
    BEFORE UPDATE ON interview_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Enable Row-Level Security (RLS) on the interview_sessions table
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to view their own interview sessions
CREATE POLICY user_view_own_session ON interview_sessions
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create a policy to allow users to insert their own interview sessions
CREATE POLICY user_insert_own_session ON interview_sessions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create a policy to allow users to update their own interview sessions
CREATE POLICY user_update_own_session ON interview_sessions
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create a policy to allow users to delete their own interview sessions
CREATE POLICY user_delete_own_session ON interview_sessions
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a policy for admins to have full access
CREATE POLICY admin_all_access ON interview_sessions
    FOR ALL
    USING (auth.role() = 'admin')
    WITH CHECK (auth.role() = 'admin');

-- Allow authenticated users to access the table (required for RLS to work in Supabase)
GRANT ALL ON interview_sessions TO authenticated;