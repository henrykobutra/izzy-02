'use server'

import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import { retry } from "@/utils/retry"
import { formatTranscriptForAnalysis } from '@/utils/transcript'

/**
 * Generates feedback for an interview based on the transcript
 * @param sessionId - ID of the interview session
 * @param positionTitle - The position title for the interview
 * @param positionType - The type of position (technical, non-technical, etc.)
 * @param transcript - The interview transcript data
 * @returns Generated feedback object
 */
export const generateInterviewFeedback = async (
    sessionId: string,
    positionTitle: string,
    positionType: string,
    transcript: any[]
) => {
    return retry(async () => {
        const formattedTranscript = formatTranscriptForAnalysis(transcript)

        const results = await generateObject({
            model: google('gemini-2.5-flash-preview-04-17', {
                structuredOutputs: true
            }),
            schema: z.object({
                overall_score: z.number().int().min(0).max(100),
                skills_breakdown: z.array(z.object({
                    skill: z.enum([
                        "Technical Knowledge", 
                        "Problem Solving", 
                        "Communication", 
                        "Critical Thinking",
                        "Leadership",
                        "Adaptability",
                        "Teamwork",
                        "Domain Expertise",
                        "Time Management",
                        "Attention to Detail"
                    ]),
                    score: z.number().int().min(0).max(100),
                    feedback: z.string()
                })).min(4),
                strengths: z.array(z.object({
                    trait: z.string(),
                    description: z.string()
                })),
                weaknesses: z.array(z.object({
                    trait: z.string(),
                    description: z.string()
                })),
                areas_for_improvement: z.array(z.object({
                    topic: z.string(),
                    description: z.string()
                })),
                feedback_summary: z.string(),
                confidence_score: z.number().int().min(0).max(100)
            }),
            temperature: 0.7,
            maxTokens: 5000,
            messages: [
                {
                    role: 'system',
                    content: `You are an expert interview feedback analyzer. You'll review an interview transcript and provide structured feedback.
          
Your task is to evaluate how well the candidate performed in the interview for a ${positionTitle} position.

Please analyze the following aspects:
1. Technical/professional competency related to the position
2. Communication skills and clarity
3. Problem-solving approach
4. Critical thinking abilities
5. Overall interview performance

For the skills breakdown, you MUST include assessments for these specific skills (with exact spelling and capitalization):
- Technical Knowledge
- Problem Solving
- Communication
- Critical Thinking

You may also include any of these additional skills in your assessment as appropriate for the position:
- Leadership
- Adaptability
- Teamwork
- Domain Expertise
- Time Management
- Attention to Detail

All scores should be on a scale of 0-100, where:
- 0-20: Poor performance
- 21-40: Below average performance
- 41-60: Average performance
- 61-80: Above average performance
- 81-100: Excellent performance

Important: When assigning scores, avoid scores that end in 0 or 5 (e.g., avoid 70, 75, 80, etc.). Instead, provide more precise scores (e.g., 72, 83, 94, etc.) to reflect nuanced assessment.

Provide a fair and balanced assessment with actionable feedback. Your analysis should be:
- Specific and evidence-based (citing examples from the transcript)
- Balanced (noting both strengths and areas for improvement)
- Constructive (offering specific suggestions for improvement)
- Professional (avoiding personal judgments)`
                },
                {
                    role: 'user',
                    content: `Position: ${positionTitle}
Position Type: ${positionType}

Interview Transcript:
${formattedTranscript}

Please provide comprehensive feedback on this interview.`
                }
            ]
        })

        console.log("Generated feedback for session:", sessionId)

        return results.object
    }, 3, 2000);
}
