import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, FileText, Brain } from "lucide-react"
import AgentVisualizer from "@/components/animations/soundbar"
import ClientLogos from "@/components/common/client-logos"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Navigation */}
      <header className="container mx-auto py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter">PREPI</div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-medium hover:text-purple-400 transition">
              HOW IT WORKS
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-purple-400 transition">
              FEATURES
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-purple-400 transition">
              TESTIMONIALS
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-purple-400 transition">
              PRICING
            </Link>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
          >
            OPEN DASHBOARD
          </Button>
        </nav>
      </header>

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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-16">
              How Our AI Agents Work Together
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900 p-8 rounded-xl">
                <div className="h-12 w-12 rounded-full bg-purple-900 flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Profile Analysis</h3>
                <p className="text-gray-400">
                  Our AI analyzes your resume, experience, and skills to understand your professional background.
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-xl">
                <div className="h-12 w-12 rounded-full bg-purple-900 flex items-center justify-center mb-6">
                  <Brain className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Interview Strategy</h3>
                <p className="text-gray-400">
                  Based on job requirements and your profile, we create a personalized interview strategy.
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-xl">
                <div className="h-12 w-12 rounded-full bg-purple-900 flex items-center justify-center mb-6">
                  <Mic className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Mock Interviews</h3>
                <p className="text-gray-400">
                  Practice with realistic interview simulations and receive immediate feedback.
                </p>
              </div>
            </div>
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
              TRY PREPI NOW
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

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold tracking-tighter mb-4 md:mb-0">PREPI</div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white">
                Terms
              </Link>
              <Link href="#" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm mt-6">
            © {new Date().getFullYear()} PREPI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
