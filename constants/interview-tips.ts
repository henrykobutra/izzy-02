/**
 * Collection of interview tips to be displayed randomly
 */

export type InterviewTip = {
  id: number;
  category: 'preparation' | 'technical' | 'behavioral' | 'follow-up' | 'general';
  title: string;
  content: string;
}

export const interviewTips: InterviewTip[] = [
  {
    id: 1,
    category: 'preparation',
    title: 'Research the Company',
    content: 'Thoroughly research the company\'s mission, products, services, and recent news. This demonstrates your genuine interest and helps tailor your responses.'
  },
  {
    id: 2,
    category: 'preparation',
    title: 'Practice Your Responses',
    content: 'Prepare answers to common questions, but avoid memorizing them word-for-word. Aim for natural delivery that showcases your experience and skills.'
  },
  {
    id: 3,
    category: 'technical',
    title: 'Think Aloud',
    content: 'During technical problems, explain your thought process. Interviewers are often more interested in how you approach problems than the final solution.'
  },
  {
    id: 4,
    category: 'technical',
    title: 'Clarify Requirements',
    content: 'Before solving a technical problem, ask clarifying questions to ensure you understand the requirements fully. This shows attention to detail and thoroughness.'
  },
  {
    id: 5,
    category: 'behavioral',
    title: 'Use the STAR Method',
    content: 'Structure your behavioral responses with the STAR method: Situation, Task, Action, and Result. This ensures comprehensive, focused answers.'
  },
  {
    id: 6,
    category: 'behavioral',
    title: 'Showcase Growth Mindset',
    content: 'When discussing challenges, emphasize how you\'ve learned and grown from them. This demonstrates resilience and continuous improvement.'
  },
  {
    id: 7,
    category: 'follow-up',
    title: 'Send a Thank-You Note',
    content: 'Within 24 hours of your interview, send a personalized thank-you email referencing specific topics discussed. This reinforces your interest and keeps you top-of-mind.'
  },
  {
    id: 8,
    category: 'general',
    title: 'Prepare Thoughtful Questions',
    content: 'Have 3-5 insightful questions ready for the interviewer about the role, team, and company culture. This shows genuine interest and engagement.'
  },
  {
    id: 9,
    category: 'general',
    title: 'Mind Your Body Language',
    content: 'Maintain good posture, make appropriate eye contact, and offer a firm handshake. Positive body language conveys confidence and professionalism.'
  },
  {
    id: 10,
    category: 'technical',
    title: 'Review Fundamentals',
    content: 'Brush up on fundamental concepts in your field before the interview. Strong foundations often matter more than knowledge of specific technologies.'
  },
  {
    id: 11,
    category: 'preparation',
    title: 'Prepare Your Introduction',
    content: 'Craft a concise, compelling personal introduction that highlights relevant experience and why you\'re interested in the role.'
  },
  {
    id: 12,
    category: 'behavioral',
    title: 'Quantify Your Achievements',
    content: 'When discussing accomplishments, use specific metrics and numbers whenever possible. This adds credibility and impact to your examples.'
  },
  {
    id: 13,
    category: 'general',
    title: 'Dress Appropriately',
    content: 'Research the company culture and dress one level above what employees typically wear. When in doubt, business professional is usually a safe choice.'
  },
  {
    id: 14,
    category: 'preparation',
    title: 'Test Your Tech',
    content: 'For virtual interviews, test your camera, microphone, and internet connection beforehand. Have a backup plan in case of technical difficulties.'
  },
  {
    id: 15,
    category: 'follow-up',
    title: 'Reflect on the Interview',
    content: 'After each interview, note what went well and areas for improvement. This iterative process enhances your interviewing skills over time.'
  },
  {
    id: 16,
    category: 'technical',
    title: 'Practice Problem-Solving',
    content: 'Regularly practice coding problems or technical scenarios to build confidence and develop a structured approach to problem-solving.'
  },
  {
    id: 17,
    category: 'general',
    title: 'Be Authentic',
    content: 'While presenting your best self, remain genuine. Authenticity builds trust and helps assess if the role and culture are right for you.'
  },
  {
    id: 18,
    category: 'preparation',
    title: 'Understand the Job Description',
    content: 'Analyze the job description to identify key skills and experiences the employer seeks, then prepare examples that demonstrate your fit.'
  },
  {
    id: 19,
    category: 'behavioral',
    title: 'Prepare for "Weakness" Questions',
    content: 'When discussing weaknesses, choose genuine areas for growth that aren\'t critical to the role, and emphasize how you\'re actively improving.'
  },
  {
    id: 20,
    category: 'follow-up',
    title: 'Follow Up Appropriately',
    content: 'If you haven\'t heard back within the timeframe specified, send a polite follow-up email reiterating your interest in the position.'
  }
];
