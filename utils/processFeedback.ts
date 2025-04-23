import { Database } from "@/types/supabase";
import { FeedbackWithMetadata } from "@/types/interview-feedback";

// Key skills we want to track
const KEY_SKILLS = [
  "Technical Knowledge",
  "Problem Solving",
  "Communication",
  "Critical Thinking"
] as const;

type KeySkill = typeof KEY_SKILLS[number];

// Interface for skill metrics
interface SkillMetric {
  skill: string;
  score: number;
  feedback?: string;
}

// Interface for top skill with commentary
interface TopSkill {
  skill: string;
  score: number;
  feedback: string;
}

// Interface for processed feedback summary
export interface ProcessedFeedback {
  best: {
    id: string;
    overall_score: number;
    skills: SkillMetric[];
    created_at: string;
  } | null;
  latest: {
    id: string;
    overall_score: number;
    skills: SkillMetric[];
    created_at: string;
  } | null;
  averages: {
    [key in KeySkill]: number;
  };
  topSkill: TopSkill | null;
  averageScore: number;
  feedbackCount: number;
}

/**
 * Processes feedback data to extract best feedback, latest feedback, and average metrics
 * @param feedbackData Array of feedback data
 * @returns Processed feedback metrics
 */
export function processFeedback(feedbackData: FeedbackWithMetadata[]): ProcessedFeedback {
  // If no feedback, return default structure
  if (!feedbackData.length) {
    return {
      best: null,
      latest: null,
      averages: {
        "Technical Knowledge": 0,
        "Problem Solving": 0,
        "Communication": 0,
        "Critical Thinking": 0
      },
      topSkill: null,
      averageScore: 0,
      feedbackCount: 0
    };
  }

  // Sort feedback by overall score (descending) to find the best
  const sortedByScore = [...feedbackData].sort((a, b) => b.overall_score - a.overall_score);
  const bestFeedback = sortedByScore[0];

  // Sort feedback by creation date (descending) to find the latest
  const sortedByDate = [...feedbackData].sort((a, b) => {
    return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
  });
  const latestFeedback = sortedByDate[0];

  // Calculate averages for key skills
  const skillTotals: Record<string, { total: number; count: number }> = {};
  let overallScoreTotal = 0;
  let topSkillCandidate: TopSkill | null = null;
  let highestSkillScore = 0;

  // Initialize skill totals
  KEY_SKILLS.forEach(skill => {
    skillTotals[skill] = { total: 0, count: 0 };
  });

  // Process each feedback
  feedbackData.forEach(feedback => {
    // Add to overall score total
    overallScoreTotal += feedback.overall_score;

    // Process skills breakdown
    const skillsBreakdown = feedback.skills_breakdown as { 
      skill: string; 
      score: number; 
      feedback: string;
    }[];

    if (Array.isArray(skillsBreakdown)) {
      skillsBreakdown.forEach(skillItem => {
        // Check if this is a key skill we're tracking
        if (KEY_SKILLS.includes(skillItem.skill as KeySkill)) {
          // Add to skill totals
          if (!skillTotals[skillItem.skill]) {
            skillTotals[skillItem.skill] = { total: 0, count: 0 };
          }
          
          skillTotals[skillItem.skill].total += skillItem.score;
          skillTotals[skillItem.skill].count += 1;

          // Check if this is potentially the top skill
          if (skillItem.score > highestSkillScore) {
            highestSkillScore = skillItem.score;
            topSkillCandidate = {
              skill: skillItem.skill,
              score: skillItem.score,
              feedback: skillItem.feedback
            };
          }
        }
      });
    }
  });

  // Calculate average for each skill
  const averages: Record<KeySkill, number> = {} as Record<KeySkill, number>;
  KEY_SKILLS.forEach(skill => {
    const { total, count } = skillTotals[skill] || { total: 0, count: 0 };
    averages[skill] = count > 0 ? Math.round(total / count) : 0;
  });

  // Calculate overall average score
  const averageScore = Math.round(overallScoreTotal / feedbackData.length);

  // Extract skill metrics from best and latest feedback
  const extractSkillMetrics = (feedback: FeedbackWithMetadata): SkillMetric[] => {
    const skillsBreakdown = feedback.skills_breakdown as { 
      skill: string; 
      score: number; 
      feedback: string;
    }[];

    if (!Array.isArray(skillsBreakdown)) {
      return [];
    }

    return skillsBreakdown
      .filter(item => KEY_SKILLS.includes(item.skill as KeySkill))
      .map(item => ({
        skill: item.skill,
        score: item.score,
        feedback: item.feedback
      }));
  };

  return {
    best: bestFeedback ? {
      id: bestFeedback.id,
      overall_score: bestFeedback.overall_score,
      skills: extractSkillMetrics(bestFeedback),
      created_at: bestFeedback.created_at
    } : null,
    latest: latestFeedback ? {
      id: latestFeedback.id,
      overall_score: latestFeedback.overall_score,
      skills: extractSkillMetrics(latestFeedback),
      created_at: latestFeedback.created_at
    } : null,
    averages,
    topSkill: topSkillCandidate,
    averageScore,
    feedbackCount: feedbackData.length
  };
}
