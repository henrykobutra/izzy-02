import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {

  const milestones = [
    {
      year: "March 2025",
      title: "Project Assignment",
      description: "Project inception as part of HCCS Deep Learning class final assignment in Spring 2025 term."
    },
    {
      year: "April 2025",
      title: "Development Phase",
      description: "Design and implementation of the AI interview agent system and user interface."
    },
    {
      year: "May 2025",
      title: "Educational Preview Launch",
      description: "Release of Izzy AI as an Educational Preview for the Deep Learning course final project."
    }
  ];

  const values = [
    {
      title: "Educational Impact",
      description: "Our primary mission is to make interview preparation accessible to all learners."
    },
    {
      title: "Ethical AI Development",
      description: "We build AI systems with transparency, fairness, and user privacy as core principles."
    },
    {
      title: "Continuous Improvement",
      description: "We're constantly refining our agents based on educational research and user feedback."
    }
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="container mx-auto py-24 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mx-auto leading-tight">
          Our Mission
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          At Izzy AI, we&apos;re building intelligent interview preparation tools to help job seekers develop their skills, build confidence, and succeed in their career journeys.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1">
              <h2 className="text-4xl font-bold tracking-tight">
                Our Story
              </h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-lg mb-6">
                Izzy AI began as a finals project for the Deep Learning class at Houston Community College System (HCCS), Spring 2025 term. It represents an opportunity to apply theoretical deep learning concepts to a practical application that can help real people.
              </p>
              <p className="text-lg mb-6">
                As a student in Prof. McManus&apos;s deep learning course, I identified interview preparation as a critical skill that many job seekers struggle with. This project allowed me to create an accessible, personalized solution using the latest advances in AI while demonstrating my understanding of course concepts.
              </p>
              <p className="text-lg">
                Izzy AI represents an Educational Preview of what&apos;s possible when deep learning meets career readiness. While I cannot guarantee continued maintenance beyond the course requirements, this project showcases the potential of AI to democratize access to quality interview preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-12">
            About the Developer
          </h2>
          
          {/* Developer Card */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="bg-card/50 border-none overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <Image 
                      src="/faces/henry.png" 
                      alt="Henry Kobutra" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold">Henry Kobutra</h3>
                    <p className="text-primary font-medium mb-2">Solo Developer</p>
                    <p className="text-gray-400 mb-4">
                      Full-stack problem solver with 15+ years experience across agencies, finance, SaaS, and e-commerce. 
                      AI and cybersecurity enthusiast.
                    </p>
                    <div className="flex space-x-4 justify-center sm:justify-start">
                      <a href="https://github.com/henrykobutra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/henrykobutra/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Acknowledgment */}
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-medium mb-4">Acknowledgment</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
                <Image 
                  src="/faces/profpatricia.jpeg" 
                  alt="Prof. Patricia McManus" 
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-lg font-medium">Prof. Patricia McManus</p>
              <p className="text-primary text-sm mb-2">AI Professor, Houston Community College System</p>
              <p className="text-gray-400 text-sm max-w-lg mx-auto">
                Special thanks to Prof. McManus for instructing the Spring 2025 Deep Learning course
                at HCCS for which this project was created as the final assignment.
              </p>
              <div className="flex space-x-3 mt-3">
                <a href="https://github.com/patitimoner" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/patriciatmcmanus/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-12">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative pl-10 pb-10 border-l border-border last:pb-0">
                <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-primary -translate-x-1/2" />
                <div className="mb-1 text-sm text-primary font-medium">{milestone.year}</div>
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-gray-400">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-4">
            Our Values
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto text-center mb-12">
            The principles that guide our work in AI education and career development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-card/50 border-none">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-1">
                <h2 className="text-4xl font-bold tracking-tight">
                  About Izzy AI
                </h2>
              </div>
              <div className="md:col-span-2">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">What is Izzy AI?</AccordionTrigger>
                    <AccordionContent>
                      Izzy AI is an Educational Preview of an AI-powered interview preparation system developed as part of a deep learning coursework final project at Houston Community College System (HCCS) for the Spring 2025 term. It helps users prepare for job interviews through a personalized, step-by-step process including profile analysis, interview strategy, practice sessions, feedback, and continuous improvement.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">Is this a commercial product?</AccordionTrigger>
                    <AccordionContent>
                      No, Izzy AI is strictly an educational project developed for learning purposes as part of HCCS coursework. As a student project, continued maintenance cannot be guaranteed beyond the course requirements. The system demonstrates the application of AI in educational tools and career development, but is not a commercial product.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">How can I provide feedback on Izzy AI?</AccordionTrigger>
                    <AccordionContent>
                      We welcome feedback on your experience with Izzy AI! As an educational project, user insights help improve the learning experience. You can share your thoughts through the feedback form in your dashboard after using the interview preparation features, or by reaching out to the developer directly via the GitHub profile linked above.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">What technologies power Izzy AI?</AccordionTrigger>
                    <AccordionContent>
                      Izzy AI is built using Next.js for the frontend and modern deep learning techniques for natural language processing, including transformer-based language models specialized for conversational AI. The system uses a multi-agent approach where different AI components work together to deliver a comprehensive interview preparation experience. This project demonstrates practical applications of the deep learning concepts taught in the HCCS course.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}