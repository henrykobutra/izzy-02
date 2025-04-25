import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interview Feedback | Izzy AI",
  description: "Review and analyze your interview performance feedback",
}

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
