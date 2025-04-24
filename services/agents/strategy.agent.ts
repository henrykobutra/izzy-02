'use server'

import { ProfileAnalysis } from "@/types/profile"
import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import { retry } from "@/utils/retry"

/**
 * Analyzes a job description and compares it with a candidate profile to generate
 * an interview strategy with match rates and recommendations
 * @param rawJobDescriptionText - Raw text of the job description
 * @param candidateProfile - Structured candidate profile analysis
 * @returns Generated strategy analysis object
 */
export const getStrategyAnalysis = async (rawJobDescriptionText: string, candidateProfile: ProfileAnalysis) => {
    return retry(async () => {
        const results = await generateObject({
            model: google('gemini-2.5-flash-preview-04-17', {
                structuredOutputs: true
            }),
            schema: z.object({
                job_description_summary: z.string(),
                job_company: z.string(),
                job_industry: z.string(),
                job_title: z.string(),
                job_experience_level: z.enum(["junior", "mid", "senior", "principal"]),
                job_description_key_points: z.object({
                    required_skills: z.array(z.string()),
                    experience_level: z.string(),
                    responsibilities: z.array(z.string())
                }),
                interview_strategy: z.object({
                    preparation_tips: z.array(z.string()),
                    questions_to_ask: z.array(z.string()),
                    common_questions: z.array(z.object({
                        question: z.string(),
                        suggested_answer: z.string()
                    }))
                }),
                match_rate: z.number().int().min(0).max(100),
                strengths: z.array(z.string()),
                weaknesses: z.array(z.string()),
                focus_points: z.array(z.string()),
                key_alignments: z.object({
                    skills: z.array(z.string()),
                    experience: z.array(z.string())
                }),
                potential_challenges: z.array(z.string()),
                alignment_summary: z.string(),
                is_job_description: z.boolean()
            }),
            temperature: 0.7,
            maxTokens: 5000,
            messages: [
                {
                    role: 'system',
                    content: `You're an AI assistant that helps creating an interview strategy. You'll receive an interviewer's structured profile, as well as the raw text of the job description. You provide a structured output with precise and consistent evaluations.

VALIDATION RULES:
- If the provided raw text is not a job description, set is_job_description to false and provide simple valid values for all fields rather than nullish values:
  * Use "Not a job description" for text fields like job_description_summary, job_company, job_title, etc.
  * Use "mid" for job_experience_level
  * Use empty arrays [] for array fields or arrays with a single generic item ["Not applicable"]
  * Use 0 for match_rate
  * For nested objects, populate with simple generic values
  * Include a note in alignment_summary explaining this is not a valid job description

SCORING GUIDELINES:
- For match_rate:
  * Use a scale of 0-100 where:
    - 0-20: Poor match
    - 21-40: Below average match
    - 41-60: Average match
    - 61-80: Above average match
    - 81-100: Excellent match
  * Provide precise scores by avoiding numbers that end in 0 or 5 (e.g., use 73 instead of 75, 82 instead of 80)
  * Base your assessment on concrete evidence from the profile and job description
  * Be consistent in your scoring approach

CONTENT GUIDELINES:
- For all arrays (strengths, weaknesses, focus_points, etc.), limit entries to 5 items maximum that are most relevant
- Make the alignment_summary concise but insightful, focusing on actionable information
- When information is unknown:
  * Company: Use "Unknown" if not mentioned
  * Industry: Make reasonable inference based on context, use "Unknown" only as last resort
  * Job title: Infer from responsibilities and requirements
- All skills and experiences evaluations should be evidence-based, referring to specific aspects of the profile and job description`
                },
                {
                    role: 'system',
                    content: `here is the candidate profile: ${JSON.stringify(candidateProfile)}`
                },
                {
                    role: 'system',
                    content: `here is the job description: ${rawJobDescriptionText}`
                }
            ]
        })

        return results.object
    }, 3, 2000);
}