import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Izzy",
  description: "Izzy is an AI-powered platform that helps job seekers practice and ace their interviews with realistic mock interviews, instant feedback, and personalized preparation tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", geistSans.variable, geistMono.variable)}>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
