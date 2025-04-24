import AgentCard from "@/components/marketing/agent-card";
import { HowItWorks } from "@/components/marketing/how-it-works/HowItWorks";
import { FaqSection } from "@/components/marketing/faq";
import CTASection from "@/components/marketing/CTA";
import Link from "next/link";
import { WaveSeparator } from "@/components/ui/wave-separator";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

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
          <div className="mt-12 flex gap-6 justify-center">
            <Link href="/about">
              <InteractiveHoverButton
                className="border-accent text-accent font-medium bg-transparent"
                dotColorClass="bg-accent"
                expandedTextColorClass="text-accent-foreground"
                size="xl"
              >
                Learn More
              </InteractiveHoverButton>
            </Link>
            <Link href="/signup">
              <InteractiveHoverButton
                className="border-primary bg-primary text-primary-foreground font-medium"
                dotColorClass="bg-accent"
                expandedTextColorClass="text-background"
                size="xl"
              >
                Sign Up
              </InteractiveHoverButton>
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
