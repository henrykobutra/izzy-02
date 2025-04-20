'use client'

import { useState, useCallback } from "react";
import { getStrategyAnalysis } from "@/services/agents/strategy.agent";
import type { ProfileAnalysis } from "@/types/profile";
import type { StrategyAnalysis } from "@/types/strategy";

export function useGenerateStrategy() {
  const [data, setData] = useState<StrategyAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const generateStrategy = useCallback(async (rawJobDescriptionText: string, candidateProfile: ProfileAnalysis) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getStrategyAnalysis(rawJobDescriptionText, candidateProfile);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, generateStrategy };
}
