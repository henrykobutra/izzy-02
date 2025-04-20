-- Enable the UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the interview_strategies table
CREATE TABLE interview_strategies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    profile_id UUID NOT NULL,
    job_description TEXT NOT NULL, -- Raw job description text
    job_description_summary TEXT NOT NULL, -- Summary of the job description
    job_company TEXT NOT NULL, -- Company name
    job_industry TEXT NOT NULL, -- Industry name
    job_title TEXT NOT NULL, -- Job title
    job_experience_level TEXT NOT NULL, -- Experience level
    job_description_key_points JSONB NOT NULL, -- e.g., {"required_skills": ["Python", "SQL"], "experience_level": "3-5 years", "responsibilities": ["Develop backend systems"]}
    interview_strategy JSONB NOT NULL, -- e.g., {"preparation_tips": ["Review Python basics"], "questions_to_ask": ["What’s the team’s workflow?"], "common_questions": [{"question": "Tell me about yourself", "answer": "I have 4 years of experience…"}]}
    match_rate NUMERIC NOT NULL CHECK (match_rate >= 0 AND match_rate <= 100), -- Match score (e.g., 85.5 for 85.5%)
    strengths JSONB NOT NULL, -- e.g., ["Strong Python skills", "Experience in backend development"]
    weaknesses JSONB NOT NULL, -- e.g., ["Limited experience with frontend", "No cloud certification"]
    focus_points JSONB NOT NULL, -- e.g., ["Brush up on SQL queries", "Prepare examples of teamwork"]
    key_alignments JSONB NOT NULL, -- e.g., {"skills": ["Python matches job requirement"], "experience": ["3 years matches 3-5 years required"]}
    potential_challenges JSONB NOT NULL, -- e.g., ["Lacks experience with Agile", "May need to learn new tools"]
    alignment_summary TEXT NOT NULL, -- e.g., "User has strong Python skills and 3 years of backend experience, matching the job’s requirements, but lacks Agile experience."
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Foreign key to auth.users(id) with cascade delete
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    -- Foreign key to profiles(id) with cascade delete
    CONSTRAINT fk_profile_id FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Add indexes for faster lookups
CREATE INDEX idx_interview_strategies_user_id ON interview_strategies (user_id);
CREATE INDEX idx_interview_strategies_profile_id ON interview_strategies (profile_id);
CREATE INDEX idx_interview_strategies_created_at ON interview_strategies (created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the update_timestamp function
CREATE TRIGGER update_interview_strategies_timestamp
    BEFORE UPDATE ON interview_strategies
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Enable Row-Level Security (RLS) on the interview_strategies table
ALTER TABLE interview_strategies ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to view their own interview strategies
CREATE POLICY user_view_own_strategy ON interview_strategies
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create a policy to allow users to insert their own interview strategies
CREATE POLICY user_insert_own_strategy ON interview_strategies
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create a policy to allow users to update their own interview strategies
CREATE POLICY user_update_own_strategy ON interview_strategies
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create a policy to allow users to delete their own interview strategies
CREATE POLICY user_delete_own_strategy ON interview_strategies
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a policy for admins to have full access
CREATE POLICY admin_all_access ON interview_strategies
    FOR ALL
    USING (auth.role() = 'admin')
    WITH CHECK (auth.role() = 'admin');

-- Allow authenticated users to access the table (required for RLS to work in Supabase)
GRANT ALL ON interview_strategies TO authenticated;