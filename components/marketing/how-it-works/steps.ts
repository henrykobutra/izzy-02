import {
  IconFileText,
  IconTarget,
  IconMessage,
  IconTimeline,
} from "@tabler/icons-react";
import type { Step } from "./types";

export const steps: Step[] = [
  {
    id: 1,
    title: "Profile Analysis",
    description:
      "Share your profile, and our AI instantly gets to know your unique background, experience, and skillset—setting the stage for a truly personalized experience.",
    icon: IconFileText,
    color: "bg-purple-600",
    lightColor: "bg-purple-500/10",
  },
  {
    id: 2,
    title: "Interview Strategy",
    description:
      "Tell us your dream job or target role, and our intelligent agent crafts a tailored interview roadmap designed just for your goals.",
    icon: IconTarget,
    color: "bg-cyan-600",
    lightColor: "bg-cyan-500/10",
  },
  {
    id: 3,
    title: "Practice Interview",
    description:
      "Step into realistic mock interviews with our AI interviewer, simulating authentic scenarios and questions to build your confidence.",
    icon: IconMessage,
    color: "bg-emerald-600",
    lightColor: "bg-emerald-500/10",
  },
  {
    id: 4,
    title: "Feedback & Evaluation",
    description:
      "Receive in-depth, actionable feedback from our evaluator agent—highlighting strengths and pinpointing areas for growth.",
    icon: IconTimeline,
    color: "bg-amber-600",
    lightColor: "bg-amber-500/10",
  }
];
