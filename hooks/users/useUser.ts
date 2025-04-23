"use client"

import { useEffect, useState } from "react"
import { getUserInfo } from "@/services/user/getUserInfo"
import type { User } from "@/types/user"

interface UseUserResult {
  firstName: string
  fullName: string
  email: string
  avatar: string
  userId: string
  createdAt: string
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * React hook for accessing current user data
 * Provides firstName, fullName, email, avatar, and loading state
 */
export function useUser(): UseUserResult {
  const [firstName, setFirstName] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState("")
  const [userId, setUserId] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchUserData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const { user, firstName: extractedFirstName } = await getUserInfo()
      
      if (user) {
        setFirstName(extractedFirstName)
        setFullName(user.name)
        setEmail(user.email)
        setAvatar(user.avatar)
        setUserId(user.id || "")
        setCreatedAt(user.createdAt || "")
      } else {
        // Reset values if no user
        setFirstName("")
        setFullName("")
        setEmail("")
        setAvatar("")
        setUserId("")
        setCreatedAt("")
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user data"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return {
    firstName,
    fullName,
    email,
    avatar,
    userId,
    createdAt,
    isLoading,
    error,
    refetch: fetchUserData
  }
}