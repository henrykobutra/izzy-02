import { LoginForm } from "@/components/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Log In",
  description: "Sign in to your Izzy AI account to access your interview preparation tools and mock interview sessions."
}

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
