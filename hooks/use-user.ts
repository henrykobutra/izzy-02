'use client'

import { useEffect, useState } from 'react'
import { userService } from '@/services/user.service'
import type { User } from '@/types/user'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await userService.getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error('Error in useUser hook:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading }
}