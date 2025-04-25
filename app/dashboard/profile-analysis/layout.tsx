import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile Analysis | Izzy AI",
  description: "Analyze your professional profile and get personalized interview advice",
}

export default function ProfileAnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
