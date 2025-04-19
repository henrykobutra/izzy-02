import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingNav() {
  return (
    <header className="container mx-auto py-6">
      <nav className="flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter">IZZY</div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm font-medium hover:text-purple-400 transition">
            HOW IT WORKS
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-purple-400 transition">
            FEATURES
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-purple-400 transition">
            TESTIMONIALS
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-purple-400 transition">
            PRICING
          </Link>
        </div>
        <Button
          variant="outline"
          className="rounded-full border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
        >
          OPEN DASHBOARD
        </Button>
      </nav>
    </header>
  );
}
