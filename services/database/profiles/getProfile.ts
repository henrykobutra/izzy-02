//TODO: Get profile by user id
"use server"

import {createClient} from "@/utils/supabase/server"

export const getProfile = async (userId: string) => {
    const supabase = await createClient()
    
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single()
        
        if (error) {
            throw error
        }
        
        return data
    } catch (error) {
        console.error('Error fetching profile:', error)
        return null
    }
}