'use server'

import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import type { ProfileAnalysis } from "@/types/profile"
import type { StrategyAnalysis } from "@/types/strategy"
import { retry } from "@/utils/retry"

/**
 * Request parameters for generating interview questions
 */
interface InterviewQuestionRequest {
    numberOfQuestions: number
    jobTitle: string
    positionType: "specific" | "generic"
    interviewType: "technical" | "behavioral" | "comprehensive"
    candidateProfile: ProfileAnalysis
    strategy?: StrategyAnalysis
}

/**
 * Generates tailored interview questions based on candidate profile and job details
 * @param questionsRequest - Parameters specifying the type and number of questions to generate
 * @returns Structured object containing questions and topics covered
 */
export const generateQuestions = async (questionsRequest: InterviewQuestionRequest) => {
    return retry(async () => {
        // Prepare messages array
        const messages = [
            {
                role: 'system' as const,
                content: `You are an expert interview question generator specialized in creating highly relevant questions tailored to specific job positions and candidate profiles.

CORE RESPONSIBILITIES:
- Generate exactly ${questionsRequest.numberOfQuestions} high-quality interview questions
- Create questions that specifically assess the candidate's fit for the target position
- Balance technical knowledge assessment with behavioral/soft skills evaluation as appropriate
- Ensure all questions are relevant to the position's requirements and the candidate's background

QUESTION TYPES:
${questionsRequest.interviewType === "comprehensive" ?
                        "- Include a balanced mix of both technical and behavioral questions" :
                        questionsRequest.interviewType === "technical" ?
                            "- Focus exclusively on technical questions that assess hard skills, technical knowledge, and problem-solving abilities" :
                            "- Focus exclusively on behavioral questions that evaluate soft skills, past experiences, and professional behaviors"}

QUESTION GUIDELINES:
- Begin with "Tell me about yourself" as the first question
- For technical questions: Focus on specific skills from the candidate's profile that align with job requirements
- For behavioral questions: Target experiences that demonstrate relevant competencies
- Adjust difficulty based on the candidate's experience level
- Ensure questions are clear, concise, and open-ended
- For each question, assign a relevant topic category that accurately reflects its focus area

TOPIC CATEGORIZATION:
- Technical topics should reflect specific skill domains (e.g., "JavaScript Development", "System Design")
- Behavioral topics should reflect specific competencies (e.g., "Team Leadership", "Problem Resolution")
- Categorize topics accurately to ensure comprehensive coverage of essential skills`
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
            temperature: 0.7,
            maxTokens: 5000,
            messages
        })

        return results.object
    }, 3, 2000);
}