-- Enable the UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    professional_summary TEXT NOT NULL,
    experience_level_summary TEXT NOT NULL, -- e.g., "Mid-level with 4 years of relevant experience"
    experience_level TEXT NOT NULL, -- e.g., "Mid-level with 4 years of relevant experience"
    skills JSONB NOT NULL, -- e.g., {"primary": {"Public Speaking": 90, "Digital Marketing": 85, "SEO": 80, "Branding": 75}, "secondary": {"Analytics": 70, "Content Creation": 65, "Social Media": 60, "Graphic Design": 55}, "other": ["Team Leadership", "Event Planning"]}
    experience JSONB NOT NULL, -- e.g., [{"title": "Marketing Manager", "company": "ABC Corp", "years": 3, "description": "Led campaigns…"}]
    achievements JSONB NOT NULL, -- e.g., ["Increased sales by 20%", "Published 3 research papers"]
    education JSONB NOT NULL, -- e.g., ["Bachelor of Arts, XYZ University, 2018", "High School Diploma, ABC School, 2014"]
    certifications JSONB NOT NULL, -- e.g., ["Certified Digital Marketer", "PMP"]
    industries JSONB NOT NULL, -- e.g., ["Marketing", "Education"]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Define the foreign key relationship to auth.users(id) with cascade delete
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add an index on user_id for faster lookups
CREATE INDEX idx_profiles_user_id ON profiles (user_id);
CREATE INDEX idx_profiles_created_at ON profiles (created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the update_timestamp function
CREATE TRIGGER update_profiles_timestamp
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Enable Row-Level Security (RLS) on the profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to view their own profiles
CREATE POLICY user_view_own_profile ON profiles
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create a policy to allow users to insert their own profiles
CREATE POLICY user_insert_own_profile ON profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create a policy to allow users to update their own profiles
CREATE POLICY user_update_own_profile ON profiles
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create a policy to allow users to delete their own profiles
CREATE POLICY user_delete_own_profile ON profiles
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a policy for admins to have full access (assuming a role-based system)
CREATE POLICY admin_all_access ON profiles
    FOR ALL
    USING (auth.role() = 'admin')
    WITH CHECK (auth.role() = 'admin');

-- Allow authenticated users to access the table (required for RLS to work in Supabase)
GRANT ALL ON profiles TO authenticated;