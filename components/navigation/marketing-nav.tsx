import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function MarketingNav() {
  return (
    <header className="container mx-auto py-6">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="IZZY Home">
          <Image
            src="/logo.png"
            alt="IZZY Logo"
            width={40}
            height={40}
            className="object-contain h-10 w-10"
            priority
          />
          <span className="text-2xl font-bold tracking-tighter text-white select-none">Izzy AI</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="#how-it-works" className="text-sm font-medium hover:text-primary transition px-4 py-2">
                How it works
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#pricing" className="text-sm font-medium hover:text-primary transition px-4 py-2">
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#about" className="text-sm font-medium hover:text-primary transition px-4 py-2">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link href="/login">
          <Button className="rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-primary/50 px-8 py-6 text-base font-semibold cursor-pointer transition">
            Get Started
          </Button>
        </Link>
      </nav>
    </header>
  );
}
