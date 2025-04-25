import Link from "next/link";
import Image from "next/image";
import { IconSearch, IconHome } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";

export default function NotFound() {
  // Fun primary messages
  const notFoundMessages = [
    "Page Not Found",
    "Whoops! Lost in Cyberspace",
    "404: Digital Wilderness",
    "This Page is Playing Hide and Seek",
    "You've Reached the Edge of the Internet",
    "Houston, We Can't Find That Page",
    "Hmm, That's Not Supposed to Happen",
    "Well This is Awkward..."
  ];
  
  // Fun secondary messages
  const secondaryMessages = [
    "We looked everywhere, even under the digital sofa.",
    "Even our best detective couldn't find this page.",
    "It might be on vacation. Or deleted. Probably deleted.",
    "Maybe try clicking your heels three times?",
    "This URL has gone where no URL has gone before.",
    "Our team of trained monkeys found nothing here.",
    "Either you made a typo or we broke something. Let's blame the typo.",
    "Looks like this link is about as real as a unicorn."
  ];
  
  // Fun description messages
  const descriptions = [
    "The page you're looking for has either moved, been abducted by aliens, or never existed in the first place.",
    "You can return home safely or go back to where you came from. Choose wisely.",
    "Legend says if you hit the back button at exactly midnight, the page might appear.",
    "We've dispatched our finest digital bloodhounds, but in the meantime, try these options.",
    "Don't panic! There are approximately 1.9 billion other pages on the internet to explore.",
    "This is just the internet's way of saying 'not today, friend'.",
    "On the bright side, you've discovered our super secret 404 page. Congratulations?",
    "Perhaps the page is just shy and needs some encouragement. Or a different URL."
  ];
  
  // Using a fixed seed for server-side rendering to maintain consistency
  const date = new Date();
  const seed = date.getDate() + date.getMonth() + date.getFullYear();
  const randomIndex = seed % notFoundMessages.length;
  
  const randomMessage = notFoundMessages[randomIndex];
  const randomSecondary = secondaryMessages[randomIndex];
  const randomDescription = descriptions[randomIndex];
  
  return (
    <div className="flex min-h-svh flex-col justify-between">
      <main className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 animate-pulse">
              <IconSearch size={32} />
            </div>
          </div>
          
          <h1 className="mb-2 text-2xl font-bold">{randomMessage}</h1>
          
          <Badge variant="outline" className="mb-4 bg-primary/10 dark:bg-primary/20 text-primary-foreground px-3 py-1 text-sm">
            {randomSecondary}
          </Badge>
          
          <p className="mb-8 text-sm text-muted-foreground">
            {randomDescription}
          </p>
          
          <div className="flex flex-col gap-4">
            <Button asChild>
              <Link href="/" className="flex items-center justify-center">
                <IconHome className="mr-2" size={18} />
                Go Home
              </Link>
            </Button>
            
            <BackButton />
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border/20 py-3 px-6">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground/40">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Izzy Logo" width={24} height={24} className="mr-2" />
            <span>&copy; Izzy AI {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/terms" className="hover:text-muted-foreground transition-colors">Terms</Link>
            <span className="text-border/30">•</span>
            <Link href="/privacy" className="hover:text-muted-foreground transition-colors">Privacy</Link>
            <span className="text-border/30">•</span>
            <Link href="/about" className="hover:text-muted-foreground transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
