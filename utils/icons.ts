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
 * Maps skill categories to their respective colors
 * @param skill The skill name to get color for
 * @returns Tailwind color class name
 */
export const getSkillColor = (skill: string): string => {
  switch (skill) {
    case "Technical Knowledge":
      return "text-indigo-500"
    case "Problem Solving":
      return "text-orange-500"
    case "Communication":
      return "text-emerald-500"
    case "Critical Thinking":
      return "text-blue-500"
    case "Leadership":
      return "text-purple-500"
    case "Adaptability":
      return "text-cyan-500"
    case "Teamwork":
      return "text-violet-500"
    case "Domain Expertise":
      return "text-amber-500"
    case "Time Management":
      return "text-rose-500"
    case "Attention to Detail":
      return "text-teal-500"
    default:
      return "text-primary"
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
