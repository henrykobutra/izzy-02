import MarketingNav from "@/components/navigation/marketing-nav";
import MarketingFooter from "@/components/navigation/marketing-footer";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Izzy AI | AI Interview Preparation",
    template: "%s | Izzy AI"
  },
  description: "Prepare for job interviews with AI agents that analyze your profile, create customized interview strategies, and provide detailed feedback.",
  keywords: ["interview preparation", "AI interview", "job interview", "career prep", "mock interview", "interview practice"],
  authors: [{ name: "Henry Kobutra" }],
  creator: "Henry Kobutra",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Izzy AI"
  }
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={cn("flex flex-col")}>
                <MarketingNav />
                {children}
                <MarketingFooter />
              </div>;
}
