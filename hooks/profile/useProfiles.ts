'use client'

import { useState, useCallback, useEffect } from 'react'
import { getProfile } from '@/services/database/profiles/getProfile'
import type { ProfileAnalysis } from '@/types/profile'
import { userService } from '@/services/user.service'

export function useProfiles() {
    const [profiles, setProfiles] = useState<ProfileAnalysis[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)

    const fetchProfiles = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const userData = await userService.getCurrentUser()
            if (!userData) {
                return
            }
            const profileData = await getProfile(userData.id)
            setProfiles(profileData)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProfiles()
    }, [fetchProfiles])

    return { profiles, loading, error }
}