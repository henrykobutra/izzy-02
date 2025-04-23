/**
 * Utility functions for handling score colors and labels
 */

/**
 * Returns the appropriate CSS background color class based on the score value
 * @param score - A number between 0-100
 */
export const getScoreColor = (score: number): string => {
  if (score > 90) return "bg-emerald-500";
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
};

/**
 * Returns the appropriate hex color for progress bars based on the score value
 * @param score - A number between 0-100
 */
export const getScoreBarColor = (score: number): string => {
  if (score > 90) return "#10b981"; // emerald-500
  if (score >= 80) return "#22c55e"; // green-500
  if (score >= 60) return "#eab308"; // yellow-500
  if (score >= 40) return "#f59e0b"; // amber-500
  return "#ef4444"; // red-500
};

/**
 * Returns a descriptive label based on the score value
 * @param score - A number between 0-100
 */
export const getScoreLabel = (score: number): string => {
  if (score > 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 60) return "Good";
  if (score >= 40) return "Satisfactory";
  return "Needs Improvement";
};

/**
 * Returns the appropriate gradient class for background styling based on the score value
 * @param score - A number between 0-100
 */
export const getScoreGradient = (score: number): string => {
  if (score > 90) return "from-violet-100 via-blue-100 to-emerald-100 dark:from-violet-800/30 dark:via-blue-800/30 dark:to-emerald-700/40";
  if (score >= 80) return "from-green-50 to-green-100 dark:from-green-800/30 dark:to-green-700/40";
  if (score >= 60) return "from-yellow-50 to-yellow-100 dark:from-yellow-800/30 dark:to-yellow-700/40";
  if (score >= 40) return "from-amber-50 to-amber-100 dark:from-amber-800/30 dark:to-amber-700/40";
  return "from-red-50 to-red-100 dark:from-red-800/30 dark:to-red-700/40";
};
