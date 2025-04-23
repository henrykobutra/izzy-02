"use server"

import { createClient } from "@/utils/supabase/server"

export const deleteStrategy = async (strategyId: string) => {
    const supabase = await createClient()

    try {
        const { error } = await supabase
            .from('interview_strategies')
            .update({ is_removed: true })
            .eq('id', strategyId)

        if (error) {
            throw error
        }

        return true
    } catch (error) {
        console.error('Error deleting strategy:', error)
        return false
    }
}
