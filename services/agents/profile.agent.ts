'use server'

import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import { retry } from "@/utils/retry"

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
            temperature: 0.9,
            maxTokens: 5000,
            messages: [
                {
                    role: 'system',
                    content: `You're an assistant that takes parsed text from a resume and turns them into an output that can be inserted into a row of a supabase table. Here are some instructions for the structured output:
- achievements are an array of concise sentences
- certifications are an array of concise sentences and do not need to include years
- educations are an array of concise sentences and do not include years or months
- ratings are integers between 1-100 (try to be precise with the rating as inferred from the whole doc, and do not end in 0 or 5)
- years are nearest whole number
- primary skills always need to be only 4 skills
- secondary skills always need to be only 4 skills
- other skills have no cap
- professional summary: provide a very concise analysis
- experience level summary should be very concise (e.g. Experienced professional with 4 years of experience in [industry or skill]
- experience description should be a concise analysis
- limit achievements to only top 10 notable achievements
- limit skills to only top 20 notable skills
- is_resume simply refers to if the provided raw text is or can be used as a resume or not
- primary and secondary skills should be categorized and appropriate categories should be provided`
                },
                {
                    role: 'user',
                    content: rawResumeText
                }
            ]
        })

        console.log(results.object)

        return results.object
    }, 3, 2000);
}