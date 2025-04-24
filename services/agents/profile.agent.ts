'use server'

import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import { retry } from "@/utils/retry"

/**
 * Analyzes a resume text to extract structured profile information
 * @param rawResumeText - The raw text content of a resume
 * @returns Structured profile analysis with skills, experience, and other relevant information
 */
export const getProfileAnalysis = async (rawResumeText: string) => {
    return retry(async () => {
        const results = await generateObject({
            model: google('gemini-2.5-flash-preview-04-17', {
                structuredOutputs: true
            }),
            schema: z.object({
                professional_summary: z.string(),
                experience_level_summary: z.string(),
                skills: z.object({
                    primary: z.array(z.object({
                        skill: z.string(),
                        rating: z.number().int().min(1).max(100)
                    })),
                    secondary: z.array(z.object({
                        skill: z.string(),
                        rating: z.number().int().min(1).max(100)
                    })),
                    other: z.array(z.object({
                        skill: z.string(),
                        rating: z.number().int().min(1).max(100)
                    })),
                    primary_category_name: z.string(),
                    secondary_category_name: z.string()
                }),
                experience: z.array(z.object({
                    title: z.string(),
                    company: z.string().optional(),
                    years: z.number().int(),
                    description: z.string()
                })),
                achievements: z.array(z.string()).max(10).optional(),
                education: z.array(z.string()).optional(),
                certifications: z.array(z.string()).optional(),
                industries: z.array(z.string()).optional(),
                is_resume: z.boolean(),
                experience_level: z.enum(["junior", "mid", "senior", "principal"])
            }),
            temperature: 0.7,
            maxTokens: 5000,
            messages: [
                {
                    role: 'system',
                    content: `You're an expert resume analyzer that transforms resume text into structured profile data for database storage. Provide detailed and accurate analysis following these guidelines:

VALIDATION RULES:
- If the provided text is not a resume or CV, set is_resume to false and provide simple valid values:
  * Use "Not a resume" for text fields
  * Use "mid" for experience_level
  * Use empty arrays [] for array fields or arrays with generic items
  * For skills, provide exactly 4 generic skills in primary and secondary categories
  * Include a note in professional_summary explaining this is not a valid resume

CONTENT STRUCTURE:
- PROFESSIONAL SUMMARY:
  * Provide a concise, insightful analysis (3-5 sentences)
  * Focus on career trajectory, core competencies, and professional identity

- EXPERIENCE LEVEL SUMMARY:
  * Very concise (1 sentence): "Experienced professional with X years in [industry/skill]"
  * Be specific about years and primary domain

- SKILLS ASSESSMENT:
  * REQUIREMENTS:
    - Primary skills: Exactly 4 most important skills (no more, no less)
    - Secondary skills: Exactly 4 supporting skills (no more, no less)
    - Other skills: Up to 12 additional relevant skills
    - Select distinct skills with minimal overlap between categories
    - Group related skills under meaningful category names

  * SKILL SELECTION METHODOLOGY:
    - Primary: Core technical/domain skills most critical to the candidate's profession
    - Secondary: Supporting technical/domain skills that complement primary skills
    - Other: Additional technical, domain, or transferable skills worth noting

  * RATING SCALE (1-100):
    - 1-20: Beginner/Rudimentary (mentioned but little evidence of practical application)
    - 21-40: Basic/Foundational (some evidence of use with limited complexity)
    - 41-60: Intermediate (clear evidence of practical application in professional context)
    - 61-80: Advanced (strong evidence of significant expertise and complex applications)
    - 81-100: Expert/Master (exceptional evidence of deep specialization and leadership)

  * RATING METHODOLOGY:
    - Base ratings on concrete evidence from the resume (projects, responsibilities, years of use)
    - Consider depth of usage, complexity of applications, and recency
    - Provide precise scores - avoid ratings ending in 0 or 5 (e.g., use 73 instead of 75)
    - Ensure consistency across skills (relative scores should reflect relative expertise)
    - For limited evidence, err on the side of moderation (41-60 range)

  * CATEGORY NAMING:
    - Use concise, industry-standard terminology for category names
    - Primary category should reflect the core professional identity
    - Secondary category should reflect a complementary skill domain

- EXPERIENCE ENTRIES:
  * Extract title, company, and years accurately
  * Years should be the nearest whole number based on dates in resume
  * Descriptions should be concise analyses of responsibilities and achievements

- ADDITIONAL ELEMENTS:
  * Achievements: Limited to top 10 notable accomplishments (concise sentences)
  * Education: Concise entries without years/months
  * Certifications: Concise without years
  * Industries: Identify 1-5 relevant industries based on experience

EXPERIENCE LEVEL CRITERIA:
- Junior: 0-2 years experience, entry-level positions
- Mid: 3-5 years experience, established professional
- Senior: 6-10 years experience, leadership roles
- Principal: 10+ years experience, strategic roles, executive positions`
                },
                {
                    role: 'system',
                    content: rawResumeText
                }
            ]
        })

        return results.object
    }, 3, 2000);
}