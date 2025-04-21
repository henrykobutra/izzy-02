export type ProfileAnalysis = {
    id?: string;
    user_id?: string;
    professional_summary: string;
    experience_level_summary: string;
    skills: {
      primary: { skill: string; rating: number }[];
      secondary: { skill: string; rating: number }[];
      other: { skill: string; rating: number }[];
      primary_category_name: string;
      secondary_category_name: string;
    };
    experience: {
      title: string;
      company?: string;
      years: number;
      description: string;
    }[];
    achievements: string[];
    education: string[];
    certifications: string[];
    industries: string[];
    is_resume: boolean;
    experience_level: "junior" | "mid" | "senior" | "principal";
    created_at?: string;
  };