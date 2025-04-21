'use server'

import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import type { ProfileAnalysis } from "@/types/profile"
import type { StrategyAnalysis } from "@/types/strategy"

interface InterviewQuestionRequest {
    numberOfQuestions: number
    jobTitle: string
    positionType: "specific" | "generic"
    interviewType: "technical" | "behavioral" | "comprehensive"
    candidateProfile: ProfileAnalysis
    strategy?: StrategyAnalysis
}

export const generateQuestions = async (questionsRequest: InterviewQuestionRequest) => {
    // Prepare messages array
    const messages = [
        {
            role: 'system' as const,
            content: `You are an AI agent that create relevent questions for an interview. 
            At minimum, you will receive a candidate's profile and a job title.
            Make the interview questions relevant to the job title and the candidate's profile.
            if the candidate provides more than the minimum, use it to make the questions more relevant.
            You will return exactly ${questionsRequest.numberOfQuestions} questions.
            You will ${questionsRequest.interviewType === "comprehensive" ? "include both technical and behavioral questions" : questionsRequest.interviewType === "technical" ? "only include technical questions" : "only include behavioral questions"}
            You will always start with the question "Tell me about yourself as the first question.
            `
        },
        {
            role: 'user' as const,
            content: `here is the candidate's profile: ${JSON.stringify(questionsRequest.candidateProfile)}`
        },
    ];

    // Conditionally add the strategy message
    if (questionsRequest.strategy) {
        messages.push({
            role: 'user' as const,
            content: `- here's the target job title: ${questionsRequest.strategy.job_title}
            - here's the job company: ${questionsRequest.strategy.job_company}
            - here's the job industry: ${questionsRequest.strategy.job_industry}
            - here's the experience level: ${questionsRequest.strategy.job_experience_level}
            - here's the job description summary: ${questionsRequest.strategy.job_description_summary}
            
            Key requirements:
            - Required skills: ${questionsRequest.strategy.job_description_key_points?.required_skills?.join(', ') || 'N/A'}
            - Experience level description: ${questionsRequest.strategy.job_description_key_points?.experience_level || 'N/A'}
            - Key responsibilities: ${questionsRequest.strategy.job_description_key_points?.responsibilities?.join(', ') || 'N/A'}`
        });
    } else {
        messages.push({
            role: 'user' as const,
            content: `here's the target job title: ${questionsRequest.jobTitle}`
        })
    }

    const results = await generateObject({
        model: google('gemini-2.5-flash-preview-04-17', {
            structuredOutputs: true
        }),
        schema: z.object({
            questions: z.array(z.object({
                question: z.string(),
                topic: z.string()
            })),
            topics_covered: z.object({
                technical: z.array(z.string()),
                behavioral: z.array(z.string())
            })
        }),
        temperature: 0.9,
        maxTokens: 5000,
        messages
    })

    console.log(results.object)

    return results.object
}