/**
 * Utility functions for handling score colors and labels
 */

/**
 * Returns the appropriate CSS background color class based on the score value
 * @param score - A number between 0-100
 */
export const getScoreColor = (score: number): string => {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-emerald-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-red-500";
};

/**
 * Returns the appropriate hex color for progress bars based on the score value
 * @param score - A number between 0-100
 */
export const getScoreBarColor = (score: number): string => {
  if (score >= 90) return "#22c55e"; // green-500
  if (score >= 80) return "#10b981"; // emerald-500
  if (score >= 70) return "#f59e0b"; // amber-500
  return "#ef4444"; // red-500
};

/**
 * Returns a descriptive label based on the score value
 * @param score - A number between 0-100
 */
export const getScoreLabel = (score: number): string => {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Good";
  if (score >= 70) return "Satisfactory";
  if (score >= 60) return "Needs Improvement";
  return "Poor";
};

/**
 * Returns the appropriate gradient class for background styling based on the score value
 * @param score - A number between 0-100
 */
export const getScoreGradient = (score: number): string => {
  if (score >= 90) return "from-green-500/20 to-green-600/30";
  if (score >= 80) return "from-emerald-500/20 to-emerald-600/30";
  if (score >= 70) return "from-amber-500/20 to-amber-600/30";
  return "from-red-500/20 to-red-600/30";
};
