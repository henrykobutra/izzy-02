import Link from "next/link";
import Image from "next/image";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

type ErrorUIProps = {
  messageIndex: number;
  year: number;
};

export function ErrorUI({ messageIndex, year }: ErrorUIProps) {
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
  
  const randomMessage = errorMessages[messageIndex];
  const randomSecondary = secondaryMessages[messageIndex];
  const randomDescription = descriptions[messageIndex];
  
  return (
    <>
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
      
      <footer className="fixed bottom-0 left-0 right-0 border-t border-border/20 py-3 px-6">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground/40">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Izzy Logo" width={24} height={24} className="mr-2" />
            <span>&copy; Izzy AI {year}</span>
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
    </>
  );
}
