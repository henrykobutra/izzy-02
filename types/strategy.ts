export type StrategyAnalysis = {
    id?: string;
    user_id?: string;
    created_at?: string;
    job_description_summary: string;
    job_company: string;
    job_industry: string;
    job_title: string;
    job_experience_level: "junior" | "mid" | "senior" | "principal";
    job_description_key_points: {
        required_skills: string[];
        experience_level: string;
        responsibilities: string[];
    };
    interview_strategy: {
        preparation_tips: string[];
        questions_to_ask: string[];
        common_questions: { question: string; suggested_answer: string }[];
    };
    match_rate: number;
    strengths: string[];
    weaknesses: string[];
    focus_points: string[];
    key_alignments: { skills: string[]; experience: string[] };
    potential_challenges: string[];
    alignment_summary: string;
    is_job_description: boolean;
}