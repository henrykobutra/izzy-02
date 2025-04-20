import { useState, useCallback } from "react";
import { getProfileAnalysis } from "@/services/agents/profile.agent";
import type { ProfileAnalysis } from "@/types/profile";

export function useGenerateProfile() {
  const [data, setData] = useState<ProfileAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const generateProfile = useCallback(async (rawResumeText: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProfileAnalysis(rawResumeText);
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

  return { data, loading, error, generateProfile };
}