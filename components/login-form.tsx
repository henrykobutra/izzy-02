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
import { LoginFormValues, loginSchema } from "@/lib/auth/client-schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export function LoginForm({
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
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Izzy account
                </p>
              </div>
              <FormContent />
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <div className="absolute inset-0">
              <Image
                src="/decorative/interview.jpg"
                alt="Interview scene"
                fill
                className="object-cover dark:brightness-[0.8]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-white bg-black/30 p-1 rounded z-10">
              Photo by <a href="https://unsplash.com/@charlesdeluvio?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="hover:underline">charlesdeluvio</a> on <a href="https://unsplash.com/photos/person-sitting-in-a-chair-in-front-of-a-man-rRWiVQzLm7k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="hover:underline">Unsplash</a>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking login, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy">Privacy Policy</a>.
      </div>
    </div>
  )
}

function FormContent() {
  const { handleLogin, isLoggingIn, authError } = useAuth()
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    await handleLogin(formData)
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
                  placeholder="career.rockstar@gmail.com" 
                  disabled={isLoggingIn}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className={cn(
                    "text-sm underline-offset-2 hover:underline",
                    isLoggingIn ? "pointer-events-none opacity-50" : ""
                  )}
                  tabIndex={isLoggingIn ? -1 : undefined}
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password" 
                  placeholder="your secret interview weapon"
                  disabled={isLoggingIn}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoggingIn}>
          {isLoggingIn ? (
            <>
              <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link 
            href="/signup" 
            className={cn(
              "underline underline-offset-4",
              isLoggingIn ? "pointer-events-none opacity-50" : ""
            )}
            tabIndex={isLoggingIn ? -1 : undefined}
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  )
}