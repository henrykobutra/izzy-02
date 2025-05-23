'use client'

import type { User } from '@/types/user'
import { createClient } from '@/utils/supabase/client'

export const userService = {
  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    const supabase = createClient()
    
    try {
      // Get session data
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        return null
      }
      
      const { user: authUser } = session
      
      // Use user metadata for name, fallback to email if not available
      const name = authUser.user_metadata?.full_name || 
                  authUser.user_metadata?.name || 
                  authUser.email?.split('@')[0] || 
                  'User'
      
      return {
        id: authUser.id,
        name,
        email: authUser.email || '',
        // Use a default avatar if none is provided
        avatar: authUser.user_metadata?.avatar_url || '',
        // Include user creation date
        createdAt: authUser.created_at
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }
}