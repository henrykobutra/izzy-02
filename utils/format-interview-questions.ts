/**
 * Formats an array of interview questions into a numbered list string
 * suitable for passing to AI agents
 */

export interface InterviewQuestion {
  topic: string;
  question: string;
}

/**
 * Formats interview questions into a numbered list string
 * @param questions Array of interview question objects
 * @returns Formatted string with numbered questions
 */
export function formatInterviewQuestionsForAI(
  questions: InterviewQuestion[]
): string {
  if (!questions || !questions.length) {
    return "";
  }

  return questions
    .map((q, index) => `${index + 1}. ${q.question}`)
    .join("\n");
}