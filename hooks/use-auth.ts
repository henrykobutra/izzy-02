'use client'

import { login, signup, forgotPassword, signOut } from "@/lib/auth/actions"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      setAuthError(null)
      const result = await signOut()
      if (result?.nextUrl) router.push(result.nextUrl)
      if (!result?.success) setAuthError(result?.error || null)
    } catch (error) {
      console.error('Error signing out:', error)
      setAuthError('An unexpected error occurred')
    } finally {
      setIsSigningOut(false)
    }
  }

  const handleLogin = async (formData: FormData) => {
    try {
      setIsLoggingIn(true)
      setAuthError(null)
      const result = await login(formData)
      if (result?.nextUrl) router.push(result.nextUrl)
      if (!result?.success) setAuthError(result?.error || null)
    } catch (error) {
      console.error('Error logging in:', error)
      setAuthError('An unexpected error occurred')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleSignup = async (formData: FormData) => {
    try {
      setIsSigningUp(true)
      setAuthError(null)
      const result = await signup(formData)
      if (result?.nextUrl) router.push(result.nextUrl)
      if (!result?.success) setAuthError(result?.error || null)
    } catch (error) {
      console.error('Error signing up:', error)
      setAuthError('An unexpected error occurred')
    } finally {
      setIsSigningUp(false)
    }
  }

  const handleForgotPassword = async (formData: FormData) => {
    try {
      setIsResettingPassword(true)
      setAuthError(null)
      const result = await forgotPassword(formData)
      if (result?.nextUrl) router.push(result.nextUrl)
      if (!result?.success) setAuthError(result?.error || null)
    } catch (error) {
      console.error('Error resetting password:', error)
      setAuthError('An unexpected error occurred')
    } finally {
      setIsResettingPassword(false)
    }
  }

  return {
    handleSignOut,
    isSigningOut,
    handleLogin,
    isLoggingIn,
    handleSignup,
    isSigningUp,
    handleForgotPassword,
    isResettingPassword,
    authError
  }
}