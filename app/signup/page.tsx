import { SignupForm } from "@/components/signup-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your free Izzy AI account to start preparing for job interviews with AI-powered mock interviews and personalized feedback."
}

export default function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  )
}