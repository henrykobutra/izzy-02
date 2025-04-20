"use server"

import {createClient} from "@/utils/supabase/server"
import type { ProfileAnalysis } from "@/types/profile"
import {userService} from "@/services/user.service"

export const saveProfile = async (profile: ProfileAnalysis, user_id: string) => {
    
    if (!user_id) {
        return null
    }

    const supabase = await createClient()
    
    try {
        const { data, error } = await supabase
            .from('profiles')
            .upsert([{user_id: user_id, ...profile}])
            .single()
        
        if (error) {
            throw error
        }
        
        return data
    } catch (error) {
        console.error('Error saving profile:', error)
        return null
    }
}