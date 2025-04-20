'use client'

import { useState, useCallback, useEffect } from 'react'
import { getStrategies } from '@/services/database/strategies/getStrategies'
import type { StrategyAnalysis } from '@/types/strategy'
import { userService } from '@/services/user.service'

export function useStrategies() {
    const [strategies, setStrategies] = useState<StrategyAnalysis[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)
    const [hasStrategies, setHasStrategies] = useState(false)

    const fetchStrategies = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const userData = await userService.getCurrentUser()
            if (!userData) {
                setHasStrategies(false)
                setStrategies([])
                return
            }
            const strategiesData = await getStrategies(userData.id)
            setStrategies(strategiesData)
            setHasStrategies(strategiesData.length > 0)
        } catch (error) {
            setError(error)
            setHasStrategies(false)
            setStrategies([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStrategies()
    }, [fetchStrategies])

    return { 
        strategies, 
        loading, 
        error, 
        hasStrategies, 
        refetch: fetchStrategies 
    }
}