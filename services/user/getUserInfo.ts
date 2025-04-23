import { userService } from "@/services/user.service"
import type { User } from "@/types/user"

/**
 * Get current user information including derived fields like firstName
 * @returns Object containing the user and firstName (if available)
 */
export async function getUserInfo() {
  try {
    const user = await userService.getCurrentUser()
    
    // Extract first name from full name if user exists
    let firstName = ""
    if (user && user.name) {
      firstName = user.name.split(" ")[0]
    }
    
    return {
      user,
      firstName
    }
  } catch (error) {
    console.error("Failed to get user info:", error)
    return {
      user: null,
      firstName: ""
    }
  }
}