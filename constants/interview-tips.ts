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
  },
  {
    id: 21,
    category: 'preparation',
    title: 'Create a Portfolio',
    content: 'Develop a portfolio showcasing your best work. Having tangible examples ready to share demonstrates your capabilities better than words alone.'
  },
  {
    id: 22,
    category: 'technical',
    title: 'Understand System Design',
    content: 'For senior technical roles, brush up on system design concepts. Being able to architect solutions shows higher-level thinking beyond coding.'
  },
  {
    id: 23,
    category: 'behavioral',
    title: 'Discuss Collaboration',
    content: 'Prepare examples of successful collaboration. Teams value members who work well with others and contribute positively to team dynamics.'
  },
  {
    id: 24,
    category: 'general',
    title: 'Arrive Early',
    content: 'Plan to arrive 10-15 minutes before your scheduled interview. This buffer time helps you compose yourself and avoid rushing.'
  },
  {
    id: 25,
    category: 'preparation',
    title: 'Study Industry Trends',
    content: 'Familiarize yourself with current industry trends and challenges. Demonstrating industry awareness shows you\'re forward-thinking and engaged.'
  },
  {
    id: 26,
    category: 'technical',
    title: 'Optimize Your Solutions',
    content: 'After solving a technical problem, discuss potential optimizations. This shows you understand the importance of efficiency and scalability.'
  },
  {
    id: 27,
    category: 'behavioral',
    title: 'Prepare Leadership Examples',
    content: 'Even for non-management roles, have examples of how you\'ve shown leadership. This demonstrates initiative and potential for growth.'
  },
  {
    id: 28,
    category: 'follow-up',
    title: 'Address Concerns',
    content: 'In follow-up communications, tactfully address any concerns that arose during the interview. This shows self-awareness and proactivity.'
  },
  {
    id: 29,
    category: 'general',
    title: 'Manage Interview Anxiety',
    content: 'Practice deep breathing techniques to manage nervousness. Remember that some anxiety is normal and can actually improve performance.'
  },
  {
    id: 30,
    category: 'preparation',
    title: 'Research Your Interviewers',
    content: 'If you know who will interview you, research their background. This helps establish rapport and tailor your responses to their perspective.'
  },
  {
    id: 31,
    category: 'technical',
    title: 'Know Your Technologies',
    content: 'Be prepared to discuss technologies listed on your resume in detail. Never claim expertise in areas where you have only surface knowledge.'
  },
  {
    id: 32,
    category: 'behavioral',
    title: 'Discuss Conflict Resolution',
    content: 'Prepare examples of how you\'ve successfully navigated workplace conflicts. This demonstrates emotional intelligence and maturity.'
  },
  {
    id: 33,
    category: 'follow-up',
    title: 'Provide Additional Materials',
    content: 'If relevant, send additional work samples or information mentioned during the interview with your follow-up. This reinforces your qualifications.'
  },
  {
    id: 34,
    category: 'general',
    title: 'Be Mindful of Time',
    content: 'Keep responses concise and relevant. Rambling answers can suggest disorganized thinking or poor communication skills.'
  },
  {
    id: 35,
    category: 'preparation',
    title: 'Prepare Salary Expectations',
    content: 'Research industry salary ranges for the position. Have a clear but flexible compensation expectation based on market rates and your experience.'
  },
  {
    id: 36,
    category: 'technical',
    title: 'Handle Edge Cases',
    content: 'When solving technical problems, proactively address edge cases. This demonstrates thoroughness and attention to detail.'
  },
  {
    id: 37,
    category: 'behavioral',
    title: 'Discuss Remote Work Skills',
    content: 'If applicable, highlight your self-discipline, communication skills, and ability to collaborate virtually—crucial competencies for remote roles.'
  },
  {
    id: 38,
    category: 'follow-up',
    title: 'Request Feedback',
    content: 'If you don\'t get the position, politely request constructive feedback. This shows growth mindset and can provide valuable insights for future interviews.'
  },
  {
    id: 39,
    category: 'general',
    title: 'Stay Positive',
    content: 'Maintain a positive attitude throughout the interview. Enthusiasm and optimism are contagious and leave a favorable impression.'
  },
  {
    id: 40,
    category: 'preparation',
    title: 'Bring Essential Items',
    content: 'Prepare a professional folder with extra resumes, a notepad, and a pen. Having these items ready demonstrates preparedness and organization.'
  },
  {
    id: 41,
    category: 'technical',
    title: 'Discuss Testing Strategies',
    content: 'Be prepared to explain how you test your code. A strong testing approach demonstrates professionalism and commitment to quality.'
  },
  {
    id: 42,
    category: 'behavioral',
    title: 'Share Adaptation Examples',
    content: 'Prepare stories about how you\'ve adapted to change. Adaptability is increasingly valued in today\'s rapidly evolving workplace.'
  },
  {
    id: 43,
    category: 'follow-up',
    title: 'Connect on LinkedIn',
    content: 'After the interview, connect with your interviewers on LinkedIn with a personalized message. This maintains the professional relationship regardless of outcome.'
  },
  {
    id: 44,
    category: 'general',
    title: 'Practice Active Listening',
    content: 'Demonstrate engagement by nodding, maintaining eye contact, and referencing previous points in your responses. This builds rapport and shows attentiveness.'
  },
  {
    id: 45,
    category: 'preparation',
    title: 'Practice With a Friend',
    content: 'Conduct mock interviews with a friend or colleague. External feedback can identify blind spots in your interview performance.'
  },
  {
    id: 46,
    category: 'technical',
    title: 'Explain Your Approach',
    content: 'When tackling technical questions, explicitly state any assumptions you\'re making. This demonstrates careful, methodical thinking.'
  },
  {
    id: 47,
    category: 'behavioral',
    title: 'Discuss Learning Experiences',
    content: 'Prepare examples of how you\'ve pursued professional development. Continuous learning demonstrates dedication to your craft.'
  },
  {
    id: 48,
    category: 'follow-up',
    title: 'Be Patient',
    content: 'Understand that hiring decisions often take time. While following up is important, respect the timeline provided and avoid excessive contact.'
  },
  {
    id: 49,
    category: 'general',
    title: 'Address Employment Gaps',
    content: 'If you have gaps in your employment history, prepare honest, concise explanations that focus on any skills developed during those periods.'
  },
  {
    id: 50,
    category: 'preparation',
    title: 'Review Common Industry Problems',
    content: 'Familiarize yourself with common challenges in your industry and prepare thoughtful perspectives on how to address them.'
  },
  {
    id: 51,
    category: 'technical',
    title: 'Understand Code Maintainability',
    content: 'Be prepared to discuss how you write maintainable code. Employers value developers who consider the long-term implications of their work.'
  },
  {
    id: 52,
    category: 'behavioral',
    title: 'Describe Your Ideal Work Environment',
    content: 'Reflect on what work environments bring out your best performance. This helps both you and the interviewer assess cultural fit.'
  },
  {
    id: 53,
    category: 'follow-up',
    title: 'Maintain Professional Communications',
    content: 'Ensure all follow-up communications are professional in tone and free of errors. Every interaction contributes to the overall impression you make.'
  },
  {
    id: 54,
    category: 'general',
    title: 'Show Cultural Awareness',
    content: 'For international or diverse organizations, demonstrate cultural sensitivity and global awareness. This is increasingly valued in interconnected workplaces.'
  },
  {
    id: 55,
    category: 'preparation',
    title: 'Prepare for Video Interviews',
    content: 'For video interviews, ensure your background is professional and well-lit. Test your setup beforehand to present yourself in the best light possible.'
  },
  {
    id: 56,
    category: 'technical',
    title: 'Discuss Code Reviews',
    content: 'Be ready to explain how you approach giving and receiving code reviews. This demonstrates collaboration and commitment to code quality.'
  },
  {
    id: 57,
    category: 'behavioral',
    title: 'Handle Pressure Questions',
    content: 'Prepare for stress-inducing questions by practicing calm responses. How you handle pressure during an interview reflects how you\'ll perform under workplace stress.'
  },
  {
    id: 58,
    category: 'follow-up',
    title: 'Express Continued Interest',
    content: 'If the hiring process extends longer than expected, send a brief email expressing your continued interest. This keeps you in consideration without being pushy.'
  },
  {
    id: 59,
    category: 'general',
    title: 'Be Prepared for Curveballs',
    content: 'Expect unexpected questions or scenarios. Showing adaptability when faced with surprises demonstrates valuable real-world problem-solving skills.'
  },
  {
    id: 60,
    category: 'preparation',
    title: 'Align With Company Values',
    content: 'Research the company\'s values and consider how your own values align. Authentic value alignment leads to higher job satisfaction and performance.'
  }
];
