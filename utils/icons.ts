import {
  AlertCircle,
  Award,
  BarChart,
  Brain,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  FileText,
  GanttChart,
  Lightbulb,
  MessageSquare,
  Pencil,
  Puzzle,
  RefreshCw,
  Shuffle,
  Sparkles,
  Target,
  Users
} from "lucide-react"
import { LucideIcon } from "lucide-react"

/**
 * Maps skill categories to their respective Lucide React icons
 */
export const getSkillIconComponent = (skill: string): LucideIcon => {
  switch (skill) {
    case "Technical Knowledge":
      return Code
    case "Problem Solving":
      return Puzzle
    case "Communication":
      return MessageSquare
    case "Critical Thinking":
      return Brain
    case "Leadership":
      return Users
    case "Adaptability":
      return Shuffle
    case "Teamwork":
      return Users
    case "Domain Expertise":
      return Briefcase
    case "Time Management":
      return GanttChart
    case "Attention to Detail":
      return Pencil
    default:
      return Sparkles
  }
}

/**
 * Icons for feedback sections
 */
export const feedbackIcons = {
  skillsAssessment: BarChart,
  strengths: CheckCircle,
  areasToImprove: AlertCircle,
  actionPlan: Target
}

/**
 * Icons for item indicators
 */
export const itemIndicatorIcons = {
  strength: Sparkles,
  weakness: RefreshCw,
  actionItem: FileText
}

/**
 * Icons for metadata display
 */
export const metadataIcons = {
  date: Clock,
  jobTitle: Briefcase,
  interviewType: Briefcase,
  performance: Target
}
