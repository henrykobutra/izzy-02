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
        // Check if the user already has a profile
        const { data: existingProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user_id)
            .single()
        
        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
            console.error('Error checking for existing profile:', fetchError)
            return null
        }
        
        // If profile exists, delete it
        if (existingProfile) {
            const { error: deleteError } = await supabase
                .from('profiles')
                .delete()
                .eq('user_id', user_id)
            
            if (deleteError) {
                console.error('Error deleting existing profile:', deleteError)
                return null
            }
        }
        
        // Create a new profile record
        const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{user_id: user_id, ...profile}])
            .select()
            .single()
        
        if (insertError) {
            console.error('Error creating new profile:', insertError)
            return null
        }
        
        return newProfile
    } catch (error) {
        console.error('Error saving profile:', error)
        return null
    }
}