'use client'

import { useState, useCallback, useEffect } from 'react'
import { getProfile } from '@/services/database/profiles/getProfile'
import type { ProfileAnalysis } from '@/types/profile'
import { userService } from '@/services/user.service'

export function useProfiles() {
    const [profile, setProfile] = useState<ProfileAnalysis | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)
    const [exists, setExists] = useState(false)

    const fetchProfile = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const userData = await userService.getCurrentUser()
            if (!userData) {
                setExists(false)
                return
            }
            const profileData = await getProfile(userData.id)
            setProfile(profileData)
            setExists(!!profileData)
        } catch (error) {
            setError(error)
            setExists(false)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    return { profile, loading, error, exists }
}