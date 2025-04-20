'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconArrowLeft, IconLoader2 } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { ForgotPasswordFormValues, forgotPasswordSchema } from "@/lib/auth/client-schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="mb-2">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <IconArrowLeft className="mr-2" size={20} />
          Back to homepage
        </Link>
      </div>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <Image src="/logo.png" alt="Izzy Logo" width={100} height={28} />
                </div>
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>
              <FormContent />
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <div className="absolute inset-0">
              <Image
                src="/decorative/interview3.jpg"
                alt="Interview scene"
                fill
                className="object-cover dark:brightness-[0.8]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-white bg-black/30 p-1 rounded z-10">
              Photo by <a href="https://unsplash.com/@jasongoodman_youxventures?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="hover:underline">Jason Goodman</a> on <a href="https://unsplash.com/photos/smiling-man-beside-writing-person-ZJlfUi5rTDU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="hover:underline">Unsplash</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FormContent() {
  const { handleForgotPassword, isResettingPassword, authError } = useAuth()
  const [requestComplete, setRequestComplete] = useState(false)
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: ForgotPasswordFormValues) {
    const formData = new FormData()
    formData.append("email", data.email)
    await handleForgotPassword(formData)
    setRequestComplete(true)
  }

  if (requestComplete && !authError) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="text-green-700 text-center text-base font-medium">
          If your email is registered, a password reset link has been sent.
        </div>
        <Link href="/login" className="underline underline-offset-4 text-primary text-base">
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {authError && (
          <div className="text-red-600 text-sm text-center">{authError}</div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="oops.forgot.my.password@gmail.com"
                  type="email"
                  disabled={isResettingPassword}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isResettingPassword}>
          {isResettingPassword ? (
            <>
              <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending reset link...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link 
            href="/login" 
            className={cn(
              "underline underline-offset-4",
              isResettingPassword ? "pointer-events-none opacity-50" : ""
            )}
            tabIndex={isResettingPassword ? -1 : undefined}
          >
            Back to login
          </Link>
        </div>
      </form>
    </Form>
  )
}