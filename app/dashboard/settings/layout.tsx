import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings | Izzy AI",
  description: "Customize your Izzy experience and preferences",
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
