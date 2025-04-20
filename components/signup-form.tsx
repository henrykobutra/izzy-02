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
import { SignupFormValues, signupSchema } from "@/lib/auth/client-schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export function SignupForm({
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
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up for your Izzy account to get started
                </p>
              </div>
              <FormContent />
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <div className="absolute inset-0">
              <Image
                src="/decorative/interview.2.jpg"
                alt="Interview scene"
                fill
                className="object-cover dark:brightness-[0.8]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking create account, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy">Privacy Policy</a>.
      </div>
    </div>
  )
}

function FormContent() {
  const { handleSignup, isSigningUp, authError } = useAuth()
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: SignupFormValues) {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("confirmPassword", data.confirmPassword)
    await handleSignup(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {authError && (
          <div className="text-red-600 text-sm text-center">{authError}</div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Future CEO Material"
                  disabled={isSigningUp}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="dream.job.hunter@gmail.com"
                  type="email"
                  disabled={isSigningUp}
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="interview ninja secrets"
                  type="password"
                  disabled={isSigningUp}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="one more time, with feeling"
                  type="password"
                  disabled={isSigningUp}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSigningUp}>
          {isSigningUp ? (
            <>
              <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className={cn(
              "underline underline-offset-4",
              isSigningUp ? "pointer-events-none opacity-50" : ""
            )}
            tabIndex={isSigningUp ? -1 : undefined}
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  )
}