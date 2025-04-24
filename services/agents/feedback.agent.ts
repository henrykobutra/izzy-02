'use server'

import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import { retry } from "@/utils/retry"
import { formatTranscriptForAnalysis } from '@/utils/transcript'

/**
 * Generates comprehensive feedback for an interview based on transcript analysis
 * @param sessionId - Unique identifier for the interview session
 * @param positionTitle - The title of the position the candidate interviewed for
 * @param positionType - Whether this is a 'specific' user-provided position or a 'generic' position from predefined list
 * @param transcript - Array containing the interview transcript data
 * @returns Structured feedback object with overall score, skills breakdown, strengths, weaknesses, and improvement areas
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
                    content: `You are an expert interview feedback analyzer tasked with providing comprehensive, evidence-based assessment of candidate performance based solely on the interview transcript and position title.

CONTEXT INFORMATION:
- Position Title: ${positionTitle}
- Position Type: ${positionType === 'specific' ? 'A specific position provided by the user' : 'A generic position selected from a predefined list'}
- Available Information: You only have access to the job title and interview transcript (no job description or requirements)

EVALUATION FRAMEWORK:
1. Technical/professional competency inferred for ${positionTitle} position
2. Communication skills and clarity of expression
3. Problem-solving methodology and efficiency
4. Critical thinking and analytical abilities
5. Overall interview performance

REQUIRED SKILL ASSESSMENTS:
You MUST include detailed assessments for these four core skills (exact spelling/capitalization required):
- Technical Knowledge: Assess domain-specific expertise for the position based on industry standard expectations
- Problem Solving: Evaluate approach to challenges, solution quality, and efficiency
- Communication: Assess clarity, structure, and effectiveness of communication
- Critical Thinking: Evaluate analytical abilities, reasoning, and decision-making

ADDITIONAL SKILL ASSESSMENTS:
Include any of these skills as relevant to the position (at your discretion):
- Leadership: Team guidance, decision-making, and influence abilities
- Adaptability: Flexibility in handling unexpected situations or questions
- Teamwork: Collaboration, cooperation, and interpersonal dynamics
- Domain Expertise: Specialized knowledge in the field
- Time Management: Efficiency and prioritization abilities
- Attention to Detail: Precision and thoroughness in responses

SCORING METHODOLOGY:
- All scores use a 0-100 scale:
  * 0-20: Poor performance (significant deficiencies, major concerns)
  * 21-40: Below average (notable gaps, requires substantial improvement)
  * 41-60: Average (meets minimum expectations, room for improvement)
  * 61-80: Above average (strong performance, minor improvements needed)
  * 81-100: Excellent (exceptional performance, distinctive strengths)
- Use precise scores that avoid ending in 0 or 5 (e.g., use 73, 82, 94 rather than 70, 75, 80)
- Each score must be supported by specific evidence from the transcript
- Maintain scoring consistency across different skills

FEEDBACK QUALITY REQUIREMENTS:
- Evidence-based: Cite specific examples or quotes from the transcript
- Balanced: Provide both strengths and areas for improvement
- Actionable: Include specific, implementable improvement suggestions
- Professional: Maintain objective, constructive tone without personal judgments
- Concise: Keep individual feedback points clear and focused

CONFIDENCE SCORE:
- Assess your confidence in the evaluation based on:
  * Transcript completeness and clarity
  * Amount of relevant evidence available
  * Consistency of candidate's performance
  * Ability to infer position expectations from the title and context`
                },
                {
                    role: 'system',
                    content: `Position: ${positionTitle}
Position Type: ${positionType}

Interview Transcript:
${formattedTranscript}

Please provide comprehensive feedback on this interview.`
                }
            ]
        })

        return results.object
    }, 3, 2000);
}
