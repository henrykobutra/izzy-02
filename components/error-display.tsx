import Link from "next/link";
import Image from "next/image";
import { IconAlertTriangle, IconRefresh, IconHome } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ErrorDisplayProps = {
  onReset: () => void;
};

export function ErrorDisplay({ onReset }: ErrorDisplayProps) {
  // Fun error messages (primary)
  const errorMessages = [
    "Oops! Our servers are having an existential crisis.",
    "Houston, we have a problem.",
    "Error 42: The meaning of life got lost.",
    "Looks like our code took an unexpected vacation.",
    "The hamsters powering our servers need a nap.",
    "Our AI overlords have temporarily rebelled.",
    "We've hit a digital pothole on the superhighway.",
    "This page is playing hide and seek. And winning.",
  ];
  
  // Fun secondary messages
  const secondaryMessages = [
    "But it's our problem, not yours.",
    "We're on it faster than you can say 'refresh'.",
    "Our engineers are frantically googling the solution.",
    "We promise we're not just taking a coffee break.",
    "Don't worry, no ones getting fired... probably.",
    "The good news? It's definitely not your fault.",
    "We blame cosmic rays. Or Dave from Engineering.",
    "At least it's not a blue screen of death, right?",
  ];
  
  // Fun descriptions of what to do
  const descriptions = [
    "While we sort this out, maybe try turning it off and on again?",
    "Take a deep breath. Count to ten. Or just click one of these buttons.",
    "You could refresh, go home, or stare at this error in stunned disbelief.",
    "Stick around for the fix, or make a strategic retreat. Your call.",
    "Our digital cleanup crew is on the way. Hang tight or head home.",
    "We suggest a tactical retreat or a brave second attempt.",
    "This too shall pass. Or refresh. Whichever comes first.",
    "In the meantime, have you tried hitting the keyboard harder?",
  ];
  
  // Using a fixed seed for server-side rendering to maintain consistency
  const date = new Date();
  const seed = date.getDate() + date.getMonth() + date.getFullYear();
  const randomIndex = seed % errorMessages.length;
  
  const randomMessage = errorMessages[randomIndex];
  const randomSecondary = secondaryMessages[randomIndex];
  const randomDescription = descriptions[randomIndex];
  
  return (
    <div className="flex min-h-svh flex-col justify-between">
      <main className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/30 animate-pulse">
              <IconAlertTriangle size={32} />
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
            <Button onClick={() => window.location.reload()} className="flex items-center justify-center">
              <IconRefresh className="mr-2" size={18} />
              Try Again
            </Button>
            
            <Button variant="outline" onClick={onReset} className="flex items-center justify-center">
              <IconHome className="mr-2" size={18} />
              Go Home
            </Button>
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
