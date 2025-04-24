"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import type { StrategyAnalysis } from "@/types/strategy"

type Position = {
  id: string
  title: string
  company: string
  date: string
  match: number
  experience?: string
  industry?: string
  strengths?: string[]
  alignments?: string[]
}

interface StrategyParamHandlerProps {
  specificPositions: Position[]
  strategiesLoading: boolean
  strategies: StrategyAnalysis[] | null
  onSelectStrategy: (tab: string, position: Position | null) => void
}

export function StrategyParamHandler({
  specificPositions,
  strategiesLoading,
  strategies,
  onSelectStrategy,
}: StrategyParamHandlerProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const strategyId = searchParams.get('strategyId')

    if (strategyId && !strategiesLoading && strategies && strategies.length > 0) {
      // Find the matching strategy in specificPositions
      const matchingPosition = specificPositions.find(position => position.id === strategyId)

      if (matchingPosition) {
        onSelectStrategy('specific', matchingPosition)
      } else {
        console.warn(`Strategy with ID ${strategyId} not found`)
      }
    }
  }, [searchParams, strategies, strategiesLoading, specificPositions, onSelectStrategy])

  return null
}
