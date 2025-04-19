import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const faqItems = [
    {
      question: "What is the purpose of this AI agent system?",
      answer:
        "This AI agent system is designed to help users prepare for job interviews by offering a personalized, step-by-step process. It analyzes your profile, creates a tailored interview strategy, provides mock interview practice, delivers feedback, and helps you improve over time—all as part of an Educational Preview for a deep learning project at HCCS.",
    },
    {
      question: "How does the Profile Analysis work?",
      answer:
        "You share details about your background, experience, and skillset (like React, Node.js, Python, etc.), and the AI agent processes this information to understand your strengths and customize the interview preparation process for you.",
    },
    {
      question: "What happens during the Interview Strategy step?",
      answer:
        "The AI agent asks about your dream job or target role and uses that information to craft a personalized interview roadmap, ensuring the preparation aligns with your career goals.",
    },
    {
      question: "How realistic are the Practice Interviews?",
      answer:
        "The Practice Interview feature simulates real-world interview scenarios with the AI acting as an interviewer. It asks relevant questions based on your target role and provides an authentic experience to help build your confidence.",
    },
    {
      question: "What kind of Feedback & Evaluation will I receive?",
      answer:
        "After each practice session, the AI evaluator provides detailed, actionable feedback, highlighting your strengths and identifying areas for improvement to help you grow with each round.",
    },
    {
      question: "How does the Iterate & Improve step work?",
      answer:
        "Using feedback from previous rounds, the AI helps you refine your skills through targeted practice. You can apply the insights, practice again, and track your progress as your interview skills improve.",
    },
    {
      question: "Is this system part of a course project?",
      answer:
        "Yes, this AI agent system is an Educational Preview developed as part of a deep learning coursework project at Houston Community College System (HCCS). It's designed to demonstrate the application of AI in educational tools.",
    },
    {
      question: "Can I use this system for real job interviews?",
      answer:
        "While the system is built to help with interview preparation, it's currently an educational project for learning purposes. It can assist with practice and feedback, but you should complement it with other resources for real-world interviews.",
    },
    {
      question: "What skills does the AI support for interview preparation?",
      answer:
        "The system currently supports preparation for skills like React, Node.js, Python, and more. You can specify your skillset during the Profile Analysis step to ensure relevant practice questions.",
    },
    {
      question: "Is my data safe with this system?",
      answer:
        "As this is an educational project, the system is designed with basic data handling for demonstration purposes. For real-world use, additional security measures would be needed, but for now, it's intended for educational preview only.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <h2 className="text-4xl font-bold tracking-tight">
            Your questions,
            <br />
            answered.
          </h2>
        </div>
        <div className="md:col-span-2">
          <Accordion type="multiple" className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
