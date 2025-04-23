"use server"

import { createClient } from "@/utils/supabase/server"
import type { ProfileAnalysis } from "@/types/profile"

export const saveProfile = async (profile: ProfileAnalysis, user_id: string) => {

    if (!user_id) {
        return null
    }

    const supabase = await createClient()

    try {
        // Check if the user already has active profiles
        const { data: existingProfiles, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user_id)
            .eq('is_removed', false)

        if (fetchError) {
            console.error('Error checking for existing profiles:', fetchError)
            return null
        }

        // If profiles exist, mark them all as removed
        if (existingProfiles && existingProfiles.length > 0) {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ is_removed: true })
                .eq('user_id', user_id)
                .eq('is_removed', false)

            if (updateError) {
                console.error('Error marking existing profiles as removed:', updateError)
                return null
            }
        }

        // Create a new profile record with is_removed set to false
        const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{ user_id: user_id, ...profile, is_removed: false }])
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