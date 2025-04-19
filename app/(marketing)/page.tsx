import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import AgentVisualizer from "@/components/animations/soundbar";
import { HowItWorks } from "@/components/marketing/how-it-works/HowItWorks";
import { FaqSection } from "@/components/marketing/faq";
import CTASection from "@/components/marketing/CTA";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto py-24 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mx-auto leading-tight">
            AI Interview Agents
            <span className="block">for job seekers</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Our AI agents work together to understand your profile, analyze job
            requirements, strategize, conduct mock interviews, and provide
            detailed evaluations.
          </p>
          <div className="mt-12">
            <Link href="/login">
              <Button className="text-2xl p-8 cursor-pointer" variant="default" effect="expandIcon" icon={IconArrowRight} iconPlacement="right">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Agent Visualizer Component */}
          <div className="mt-16 w-full max-w-5xl mx-auto">
            <AgentVisualizer />
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works">
          <div className="container mx-auto">
            <HowItWorks />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container mx-auto">
            <FaqSection />
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta">
          <div className="container mx-auto">
            <CTASection />
          </div>
        </section>

      </main>
    </>
  );
}
