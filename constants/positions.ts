import type { LucideIcon } from "lucide-react"
import {
  MonitorIcon,
  ServerIcon,
  GanttChartIcon,
  Layers,
  ShieldCheck,
  Smartphone,
  Cloud,
  PenToolIcon,
  MousePointerClick,
  Paintbrush,
  BarChart3,
  Database,
  Brain,
  LineChart,
  Building2,
  GraduationCap,
  HeartPulse,
  Scale,
  Microscope,
  Landmark,
  DollarSign,
  Users,
  Eye,
  MessageSquare
} from "lucide-react"

/**
 * Generic position definitions for the application
 */

/**
 * Position entry type definition
 */
export type GenericPositionEntry = {
  id: string
  title: string
  icon: LucideIcon
  count: number
}

/**
 * Type for position categories
 */
export type GenericPositionCategory = {
  [key: string]: GenericPositionEntry[]
}

/**
 * Categorized generic positions for job selection
 * Icons are imported from lucide-react
 */
export const genericPositions: GenericPositionCategory = {
  popular: [
    { id: "frontend", title: "Frontend Developer", icon: MonitorIcon, count: 28 },
    { id: "backend", title: "Backend Developer", icon: ServerIcon, count: 24 },
    { id: "fullstack", title: "Full Stack Developer", icon: Layers, count: 32 },
    { id: "pm", title: "Product Manager", icon: GanttChartIcon, count: 18 },
  ],
  engineering: [
    { id: "devops", title: "DevOps Engineer", icon: Cloud, count: 15 },
    { id: "qa", title: "QA Engineer", icon: ShieldCheck, count: 12 },
    { id: "mobile", title: "Mobile Developer", icon: Smartphone, count: 14 },
    { id: "security", title: "Security Engineer", icon: ShieldCheck, count: 9 },
    { id: "sre", title: "Site Reliability Engineer", icon: ServerIcon, count: 13 },
  ],
  design: [
    { id: "ux", title: "UX Designer", icon: MousePointerClick, count: 16 },
    { id: "ui", title: "UI Designer", icon: Paintbrush, count: 14 },
    { id: "product", title: "Product Designer", icon: PenToolIcon, count: 13 },
  ],
  data: [
    { id: "data", title: "Data Scientist", icon: BarChart3, count: 20 },
    { id: "data-engineer", title: "Data Engineer", icon: Database, count: 17 },
    { id: "ml-engineer", title: "ML Engineer", icon: Brain, count: 15 },
    { id: "analyst", title: "Data Analyst", icon: LineChart, count: 19 },
  ],
  ai: [
    { id: "ai-engineer", title: "AI Engineer", icon: Brain, count: 22 },
    { id: "robotics", title: "Robotics Engineer", icon: Brain, count: 14 },
    { id: "cv-engineer", title: "Computer Vision Engineer", icon: Eye, count: 10 },
    { id: "nlp-engineer", title: "NLP Engineer", icon: MessageSquare, count: 13 },
  ],
  nontech: [
    { id: "marketing", title: "Marketing Manager", icon: Building2, count: 26 },
    { id: "teacher", title: "Teacher / Educator", icon: GraduationCap, count: 18 },
    { id: "healthcare", title: "Healthcare Professional", icon: HeartPulse, count: 22 },
    { id: "legal", title: "Legal Professional", icon: Scale, count: 15 },
    { id: "research", title: "Research Scientist", icon: Microscope, count: 12 },
    { id: "finance", title: "Finance Analyst", icon: DollarSign, count: 19 },
    { id: "hr", title: "HR Professional", icon: Users, count: 17 },
    { id: "government", title: "Government Official", icon: Landmark, count: 9 },
  ]
}
