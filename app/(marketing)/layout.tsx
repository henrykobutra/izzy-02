import MarketingNav from "@/components/navigation/marketing-nav";
import MarketingFooter from "@/components/navigation/marketing-footer";
import { cn } from "@/lib/utils";

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
