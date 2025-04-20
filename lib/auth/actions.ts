'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Add a small delay to show loading state (optional)
  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    // Get form values
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate inputs
    if (!email || !password) {
      return { success: false, error: 'Please provide both email and password', nextUrl: '/error?message=Please+provide+both+email+and+password' }
    }

    // Attempt login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message, nextUrl: `/error?message=${encodeURIComponent(error.message)}` }
    }

    revalidatePath('/', 'layout')
    return { success: true, nextUrl: '/dashboard' }
  } catch (err) {
    console.error('Login error:', err)
    return { success: false, error: 'An unexpected error occurred', nextUrl: '/error?message=An+unexpected+error+occurred' }
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Add a small delay to show loading state (optional)
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Get form values
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validate inputs
  if (!name || !email || !password || !confirmPassword) {
    return { success: false, error: 'All fields are required', nextUrl: '/error?message=All+fields+are+required' }
  }

  if (password !== confirmPassword) {
    return { success: false, error: 'Passwords do not match', nextUrl: '/error?message=Passwords+do+not+match' }
  }

  try {
    // Create user
    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      },
    })

    if (error) {
      return { success: false, error: error.message, nextUrl: `/error?message=${encodeURIComponent(error.message)}` }
    }

    revalidatePath('/', 'layout')
    
    // Check if email confirmation is required
    if (userData?.user?.identities?.length === 0) {
      return { success: true, nextUrl: `/auth/confirm?email=${encodeURIComponent(email)}` }
    }
    
    return { success: true, nextUrl: '/dashboard' }
  } catch (err) {
    console.error('Signup error:', err)
    return { success: false, error: 'An unexpected error occurred', nextUrl: '/error?message=An+unexpected+error+occurred' }
  }
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()

  // Add a small delay to show loading state
  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    // Get form values
    const email = formData.get('email') as string

    // Validate inputs
    if (!email) {
      return { success: false, error: 'Please provide your email address', nextUrl: '/error?message=Please+provide+your+email+address' }
    }

    // Send password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
    })

    if (error) {
      return { success: false, error: error.message, nextUrl: `/error?message=${encodeURIComponent(error.message)}` }
    }

    // Redirect to confirmation page
    return { success: true, nextUrl: `/auth/confirm?email=${encodeURIComponent(email)}&type=reset` }
  } catch (err) {
    console.error('Password reset error:', err)
    return { success: false, error: 'An unexpected error occurred', nextUrl: '/error?message=An+unexpected+error+occurred' }
  }
}

export async function signOut() {
  const supabase = await createClient()
  
  try {
    // Sign out the user
    await supabase.auth.signOut()
    
    // Revalidate the layout
    revalidatePath('/', 'layout')
    
    // Return success
    return { success: true, nextUrl: '/login' }
  } catch (err) {
    console.error('Sign out error:', err)
    return { success: false, error: 'Failed to sign out', nextUrl: '/error?message=Failed+to+sign+out' }
  }
}