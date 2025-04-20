-- Enable the UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types for various settings
CREATE TYPE setting_source AS ENUM ('dynamic', 'override');
CREATE TYPE toughness_level AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE seniority_level AS ENUM ('junior', 'mid_level', 'senior');
CREATE TYPE feedback_detail_level AS ENUM ('standard', 'detailed');
CREATE TYPE language_preference AS ENUM ('english');

-- Create the interview_preferences table
CREATE TABLE interview_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    toughness_level_source setting_source NOT NULL DEFAULT 'dynamic',
    toughness_level toughness_level, -- Nullable if source is dynamic
    seniority_level_source setting_source NOT NULL DEFAULT 'dynamic',
    seniority_level seniority_level, -- Nullable if source is dynamic
    target_industry_source setting_source NOT NULL DEFAULT 'dynamic',
    target_industry TEXT, -- Nullable if source is dynamic
    target_position_source setting_source NOT NULL DEFAULT 'dynamic',
    target_position TEXT, -- Nullable if source is dynamic
    feedback_detail_level feedback_detail_level NOT NULL DEFAULT 'standard',
    language_preference language_preference NOT NULL DEFAULT 'english',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Foreign key to auth.users(id) with cascade delete
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    -- Constraints to ensure values are provided only when source is override
    CONSTRAINT check_toughness_level CHECK (
        (toughness_level_source = 'dynamic' AND toughness_level IS NULL) OR
        (toughness_level_source = 'override' AND toughness_level IS NOT NULL)
    ),
    CONSTRAINT check_seniority_level CHECK (
        (seniority_level_source = 'dynamic' AND seniority_level IS NULL) OR
        (seniority_level_source = 'override' AND seniority_level IS NOT NULL)
    ),
    CONSTRAINT check_target_industry CHECK (
        (target_industry_source = 'dynamic' AND target_industry IS NULL) OR
        (target_industry_source = 'override' AND target_industry IS NOT NULL)
    ),
    CONSTRAINT check_target_position CHECK (
        (target_position_source = 'dynamic' AND target_position IS NULL) OR
        (target_position_source = 'override' AND target_position IS NOT NULL)
    )
);

-- Add indexes for faster lookups
CREATE INDEX idx_interview_preferences_user_id ON interview_preferences (user_id);
CREATE INDEX idx_interview_preferences_created_at ON interview_preferences (created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the update_timestamp function
CREATE TRIGGER update_interview_preferences_timestamp
    BEFORE UPDATE ON interview_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Enable Row-Level Security (RLS) on the interview_preferences table
ALTER TABLE interview_preferences ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to view their own preferences
CREATE POLICY user_view_own_preferences ON interview_preferences
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create a policy to allow users to insert their own preferences
CREATE POLICY user_insert_own_preferences ON interview_preferences
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create a policy to allow users to update their own preferences
CREATE POLICY user_update_own_preferences ON interview_preferences
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create a policy to allow users to delete their own preferences
CREATE POLICY user_delete_own_preferences ON interview_preferences
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a policy for admins to have full access
CREATE POLICY admin_all_access ON interview_preferences
    FOR ALL
    USING (auth.role() = 'admin')
    WITH CHECK (auth.role() = 'admin');

-- Allow authenticated users to access the table (required for RLS to work in Supabase)
GRANT ALL ON interview_preferences TO authenticated;