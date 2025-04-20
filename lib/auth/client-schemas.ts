'use client'

import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

export const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50, { message: 'Name must not exceed 50 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type SignupFormValues = z.infer<typeof signupSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>