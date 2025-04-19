import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, FileText, Brain } from "lucide-react"
import AgentVisualizer from "@/components/animations/soundbar"
import ClientLogos from "@/components/common/client-logos"
import HowItWorks from "@/components/marketing/how-it-works-old"

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
            Our AI agents work together to understand your profile, analyze job requirements, strategize, conduct mock
            interviews, and provide detailed evaluations.
          </p>
          <div className="mt-12">
            <Button className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
              START INTERVIEW PREP <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Agent Visualizer Component */}
          <div className="mt-16 w-full max-w-5xl mx-auto">
            <AgentVisualizer />
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-black">
          <div className="container mx-auto">
            <HowItWorks />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-black to-purple-950">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Ready to ace your next interview?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
              Join thousands of job seekers who have improved their interview performance with our AI-powered platform.
            </p>
            <Button className="rounded-full bg-white text-purple-900 hover:bg-gray-100 px-8 py-6 text-lg">
              TRY IZZY NOW
            </Button>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-16 bg-black">
          <div className="container mx-auto">
            <p className="text-center text-gray-500 mb-10 text-sm tracking-wider">TRUSTED BY GRADUATES FROM</p>
            <ClientLogos />
          </div>
        </section>
      </main>
    </>
  )
}
