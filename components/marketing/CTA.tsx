import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">AI-Powered Interview Preparation</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">Master your next interview</h2>

          <p className="text-lg md:text-xl max-w-[700px] mx-auto">
            Personalized interview coaching with AI feedback to help you land your dream job in tech
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto mt-4 justify-center items-center">
            <Button asChild size="lg" effect="expandIcon" className="w-full sm:w-auto">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements inspired by the API workflow in the image */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-lg border border-current opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-lg border border-current opacity-20"></div>

        {/* Connection lines */}
        <div className="absolute top-1/3 left-1/3 w-1 h-20 bg-current opacity-20"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-1 bg-current opacity-20"></div>

        {/* Dots representing the workflow nodes */}
        <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-current"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-current"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-current"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-current"></div>
        <div className="absolute top-1/4 left-1/2 w-3 h-3 rounded-full bg-current"></div>
      </div>
    </section>
  )
}
