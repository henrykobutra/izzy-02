import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import AgentCard from "@/components/marketing/agent-card";
import { HowItWorks } from "@/components/marketing/how-it-works/HowItWorks";
import { FaqSection } from "@/components/marketing/faq";
import CTASection from "@/components/marketing/CTA";
import Link from "next/link";
import { WaveSeparator } from "@/components/ui/wave-separator";

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
              <Button className="text-2xl p-8 cursor-pointer" variant="ghost" effect="expandIcon" icon={IconArrowRight} iconPlacement="right">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        {/* Wave Separator - Moved outside container for full width */}
        <div className="w-full my-8">
          <WaveSeparator height={123} />
        </div>

        <section className="-mt-20 container mx-auto text-center flex flex-col items-center">
          {/* Agent Visualizer Component */}
          <div className="w-full max-w-5xl mx-auto">
            <AgentCard />
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
