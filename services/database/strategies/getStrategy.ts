"use server"

import { createClient } from "@/utils/supabase/server"
import type { StrategyAnalysis } from "@/types/strategy"

/**
 * Retrieves a specific strategy by its ID
 * @param id - The ID of the strategy to retrieve
 * @returns The strategy with the specified ID, or null if not found
 */
export const getStrategyById = async (id: string): Promise<StrategyAnalysis | null> => {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase
      .from('interview_strategies')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      throw error
    }
    
    return data as StrategyAnalysis
  } catch (error) {
    console.error("Error retrieving strategy:", error)
    return null
  }
}

/**
 * Retrieves all strategies for a specific user
 * @param userId - The ID of the user
 * @returns An array of strategies for the user
 */
export const getStrategiesByUserId = async (userId: string): Promise<StrategyAnalysis[]> => {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase
      .from('interview_strategies')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data as StrategyAnalysis[]
  } catch (error) {
    console.error("Error retrieving strategies:", error)
    return []
  }
}
