'use client'

import { useState, useCallback } from "react";
import { getProfileAnalysis } from "@/services/agents/profile.agent";
import type { ProfileAnalysis } from "@/types/profile";
import { saveProfile } from "@/services/database/profiles/saveProfile";
import { userService } from "@/services/user.service";

export function useGenerateProfile() {
  const [data, setData] = useState<ProfileAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const generateProfile = useCallback(async (rawResumeText: string) => {
    setLoading(true);
    setError(null);
    setAttemptCount(0);

    try {
      // The retry logic is implemented in the getProfileAnalysis function
      // but we can track when it's being called here for UI feedback
      const result = await getProfileAnalysis(rawResumeText);

      if (!result.is_resume) {
        setError("This doesn't look like a resume. Please try again.")
        return null
      }

      const userId = (await userService.getCurrentUser())?.id
      if (!userId) {
        setError("User not authenticated. Please sign in and try again.");
        return null
      }

      await saveProfile({ ...result, is_removed: false }, userId);

      setData({ ...result, is_removed: false });
      return result;
    } catch (err) {
      // Provide more detailed error message
      if (err instanceof Error) {
        setError(`Failed to generate profile after multiple attempts: ${err.message}`);
      } else {
        setError(`Failed to generate profile after multiple attempts: ${err as string}`);
      }
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, attemptCount, generateProfile };
}