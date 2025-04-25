import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import MobileWarning from "@/components/mobile-warning";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default metadata for the application
export const metadata: Metadata = {
  title: {
    template: "%s | Izzy AI",
    default: "Izzy AI", // Used when no template is provided
  },
  description: "Izzy is an AI-powered platform that helps job seekers practice and ace their interviews with realistic mock interviews, instant feedback, and personalized preparation tools.",
  openGraph: {
    title: "Izzy AI - Ace Your Interviews with AI-Powered Practice",
    description: "Prepare for job interviews with Izzy's AI-powered mock interviews, real-time feedback, and personalized coaching. Level up your interview skills and land your dream job.",
    type: "website",
    siteName: "Izzy AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Izzy AI - Ace Your Interviews with AI-Powered Practice",
    description: "Prepare for job interviews with Izzy's AI-powered mock interviews, real-time feedback, and personalized coaching.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", geistSans.variable, geistMono.variable)}>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <MobileWarning />
        <main className="sm:block">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
