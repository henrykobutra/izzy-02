"use server"

import { createClient } from "@/utils/supabase/server"
import type { StrategyAnalysis } from "@/types/strategy"

export const saveStrategy = async (strategy: StrategyAnalysis) => {
    const supabase = await createClient()
    
    try {
        const { data, error } = await supabase
            .from('interview_strategies')
            .insert(strategy)
            .select()
            .single()
        
        if (error) {
            throw error
        }
        
        return data as StrategyAnalysis
    } catch (error) {
        console.error('Error saving strategy:', error)
        return null
    }
}

export const updateStrategy = async (id: string, strategy: Partial<StrategyAnalysis>) => {
    const supabase = await createClient()
    
    try {
        const { data, error } = await supabase
            .from('interview_strategies')
            .update(strategy)
            .eq('id', id)
            .select()
            .single()
        
        if (error) {
            throw error
        }
        
        return data as StrategyAnalysis
    } catch (error) {
        console.error('Error updating strategy:', error)
        return null
    }
}