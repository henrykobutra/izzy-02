export function useStrategyUtils() {
  const getMatchRateGradient = (rate: number) => {
    if (rate > 90) return "from-violet-100 via-blue-100 to-emerald-100 dark:from-violet-800/30 dark:via-blue-800/30 dark:to-emerald-700/40"
    if (rate >= 80) return "from-green-50 to-green-100 dark:from-green-800/30 dark:to-green-700/40"
    if (rate >= 60) return "from-yellow-50 to-yellow-100 dark:from-yellow-800/30 dark:to-yellow-700/40"
    if (rate >= 40) return "from-amber-50 to-amber-100 dark:from-amber-800/30 dark:to-amber-700/40"
    return "from-red-50 to-red-100 dark:from-red-800/30 dark:to-red-700/40"
  }
  
  const getMatchRateColor = (rate: number) => {
    if (rate > 90) return "text-emerald-600 dark:text-emerald-300"
    if (rate >= 80) return "text-green-600 dark:text-green-400"
    if (rate >= 60) return "text-yellow-600 dark:text-yellow-400"
    if (rate >= 40) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }
  
  const getMatchRateBg = (rate: number) => {
    if (rate > 90) return "bg-emerald-500 dark:bg-emerald-600"
    if (rate >= 80) return "bg-green-500 dark:bg-green-600"
    if (rate >= 60) return "bg-yellow-500 dark:bg-yellow-600"
    if (rate >= 40) return "bg-amber-500 dark:bg-amber-600"
    return "bg-red-500 dark:bg-red-600"
  }
  
  const getExperienceLevelDisplay = (level: string) => {
    switch(level.toLowerCase()) {
      case "junior": return "Junior Level"
      case "mid": return "Mid Level"
      case "senior": return "Senior Level"
      case "principal": return "Principal Level"
      default: return level
    }
  }
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  return {
    getMatchRateGradient,
    getMatchRateColor,
    getMatchRateBg,
    getExperienceLevelDisplay,
    formatDate
  }
}
