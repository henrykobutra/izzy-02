"use client";

import Image from "next/image";
import { Laptop2, Smartphone, ArrowLeftRight } from "lucide-react";
import MobileConfettiButton from "./confetti-button";

export default function MobileWarning() {
  return (
    <div className="sm:hidden fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-background/98 backdrop-blur-md">
      {/* Logo at the top */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt="Izzy Logo" 
          width={60} 
          height={60} 
          className="w-auto h-10"
        />
        <div className="flex flex-col">
          <span className="font-bold text-lg text-foreground">Izzy AI</span>
          <span className="text-xs text-muted-foreground">AI Interview Practice</span>
        </div>
      </div>
      
      {/* Main content area with accent background similar to agent-card */}
      <div className="w-full max-w-sm bg-accent shadow-lg rounded-3xl p-6 flex flex-col items-center">
        {/* Avatar with effect */}
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden relative border-4 border-background shadow-md">
            <Image
              src="/faces/izzy-avatar.png"
              alt="Izzy AI Agent"
              width={112}
              height={112}
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive border border-background"></span>
            </span>
          </div>
        </div>
        
        {/* Devices icons */}
        <div className="flex items-center gap-3 mb-4 mt-2">
          <Smartphone className="h-10 w-10 text-destructive animate-phone-shake" />
          <ArrowLeftRight className="h-6 w-6 text-primary mx-1 animate-bounce" />
          <Laptop2 className="h-10 w-10 text-primary animate-pulse" />
        </div>
        
        {/* Title with gradient */}
        <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-text bg-clip-text text-transparent">
          Oops! Not for Mobile
        </h2>
        
        {/* Message styled like agent-card */}
        <p className="text-center text-accent-foreground/80 mb-5 font-medium">
          Izzy needs a bigger screen to help with your interview prep! Please visit us on a desktop or laptop.
        </p>
        
        {/* CTA button styled like the agent-card button with confetti */}
        <div className="mt-3 w-full">
          <MobileConfettiButton />
          <div className="text-xs text-center mt-3 text-accent-foreground/70">
            Your future career success will thank you! 🚀
          </div>
        </div>
      </div>
    </div>
  );
}
