'use server'

import { ProfileAnalysis } from "@/types/profile"
import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"

export const getStrategyAnalysis = async (rawJobDescriptionText: string, candidateProfile: ProfileAnalysis) => {
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
        temperature: 0.9,
        maxTokens: 5000,
        messages: [
            {
                role: 'system',
                content: `You're an AI assistant that helps creating an interview strategy. You'll receive an interviewer's structured profile, as well as the raw text of the job description. You provide a structured output. Here are some guides to the structured outputs.
- if the provided raw job description is not a job description, you should return is_job_description false, and return nullish values for everything in the provided output and stop analyzing immediately
- for match rate, range is 0-100 and do not end with 0 or 5
- for string arrays, limit your entries to 5 entries
- for summaries, be super concise, but meaningful and insightful
- if company is unknown, say Unknown
- if industry is unknown, try to infer, and resort to Unknown as a last resort. Try to go for generic industries.
- if job title is unkown, take the nearest inference
- all objects should also be limited to 5`
            },
            {
                role: 'user',
                content: `here is the candidate profile: ${JSON.stringify(candidateProfile)}`
            },
            {
                role: 'user',
                content: `here is the job description: ${rawJobDescriptionText}`
            }
        ]
    })

    console.log(results.object)

    return results.object
}