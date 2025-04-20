"use server"

import { createClient } from "@/utils/supabase/server"
import type { StrategyAnalysis } from "@/types/strategy"

export const getStrategies = async (userId: string) => {
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
        console.error('Error fetching strategies:', error)
        return []
    }
}

export const getStrategyById = async (id: string) => {
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
        console.error('Error fetching strategy:', error)
        return null
    }
}