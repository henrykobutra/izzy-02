import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Sparkles, Heart, Rocket } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free AI interview preparation during our educational preview. No credit card required. Prepare for job interviews with AI agents today."
};

export default function PricingPage() {
  return (
    <main className="flex-1">
      {/* Pricing Hero */}
      <section className="container mx-auto py-24 text-center flex flex-col items-center">
        <span className="inline-flex items-center rounded-full border border-primary px-4 py-1 text-sm font-medium text-primary mb-4">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          Educational Preview
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mx-auto leading-tight">
          Simple Pricing
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Izzy AI is currently free as part of our educational preview. No credit card required.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Educational Preview */}
          <Card className="md:col-span-4 relative overflow-hidden border-primary/20 transition-all duration-300 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60"></div>
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl">Educational Preview</CardTitle>
              <CardDescription>
                Free while it lasts
              </CardDescription>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                $0
                <span className="ml-1 text-xl text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="pb-8">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>AI-powered mock interviews</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Custom interview strategy</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Detailed feedback &amp; evaluation</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Available until credits run out</span>
                </li>
              </ul>
              <div className="mt-6 rounded-lg bg-muted/50 p-4 text-sm">
                <div className="flex items-start">
                  <Sparkles className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Educational Project</p>
                    <p className="mt-1 text-muted-foreground">
                      This is a student project for the Spring 2025 Deep Learning course at HCCS. 
                      Services will remain free until AI credits are depleted.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button className="w-full cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Potential Future */}
          <Card className="md:col-span-8 relative overflow-hidden border-muted transition-all duration-300 bg-muted/30">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/10"></div>
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Heart className="h-5 w-5 text-primary" />
                Sponsor This Project
              </CardTitle>
              <CardDescription>
                Support the development of Izzy AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    Interested in sponsoring?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    If you&apos;re interested in supporting this educational project or implementing it for your organization, 
                    I&apos;d be happy to discuss potential partnerships and customizations.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    As a student project, Izzy AI demonstrates what&apos;s possible with modern AI, but with your support, 
                    it could evolve into a sustainable tool with enhanced features and ongoing maintenance.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Potential enhancements:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Industry-specific interview preparation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Integrated payment gateway of your choice</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Custom pricing schemes for your needs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Ongoing maintenance and improvements</span>
                    </li>
                  </ul>
                  <div className="flex gap-4 pt-2">
                    <Link href="https://github.com/henrykobutra" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        GitHub
                      </Button>
                    </Link>
                    <Link href="https://www.linkedin.com/in/henrykobutra/" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        LinkedIn
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-24 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Is Izzy AI really free?</h3>
              <p className="text-muted-foreground">
                Yes! As an educational project for the Spring 2025 Deep Learning course at HCCS, 
                Izzy AI is completely free to use during the educational preview period. 
                No credit card is required.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">How long will the free preview last?</h3>
              <p className="text-muted-foreground">
                The educational preview will remain available until the allocated AI credits are depleted. 
                As this is a student project, we cannot guarantee long-term availability beyond the course requirements.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Why offer sponsorship options?</h3>
              <p className="text-muted-foreground">
                While Izzy AI is primarily an educational project, there&apos;s potential for it to grow with the right support. 
                Sponsorship could help extend its lifespan, add new features, and ensure ongoing maintenance.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">How can I contact the developer?</h3>
              <p className="text-muted-foreground">
                You can reach out to Henry Kobutra via GitHub or LinkedIn using the links provided above. 
                He&apos;s open to discussing potential partnerships, customizations, or improvements to the project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}