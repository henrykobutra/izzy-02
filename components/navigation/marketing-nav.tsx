import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
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
          <span className="text-2xl font-bold tracking-tighter select-none">Izzy AI</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/#how-it-works" className={navigationMenuTriggerStyle()}>
                How it works
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link href="/login">
          <Button variant="outline" effect="ringHover" className="cursor-pointer">
            Open Dashboard
          </Button>
        </Link>
      </nav>
    </header>
  );
}
