import { ForgotPasswordForm } from "@/components/forgot-password-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your Izzy AI account password to regain access to your interview preparation tools and saved progress."
}

export default function ForgotPasswordPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}