import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interview Strategy | Izzy AI",
  description: "Develop personalized strategies to excel in your interviews",
}

export default function InterviewStrategyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
