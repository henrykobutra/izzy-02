import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Practice Interview | Izzy AI",
  description: "Practice with AI-powered mock interviews tailored to your target roles",
}

export default function PracticeInterviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
