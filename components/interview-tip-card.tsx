"use client";

import { useState, useEffect } from "react";
import { LightbulbIcon, RefreshCwIcon as RefreshCw } from "lucide-react";
import { interviewTips, InterviewTip } from "@/constants/interview-tips";
import { Button } from "@/components/ui/button";
import { IconBrain, IconMessageCircle, IconCode, IconClipboardCheck, IconNotebook } from "@tabler/icons-react";
import confetti from 'canvas-confetti';

// Map of categories to their visual properties
const categoryMap = {
  "preparation": { icon: IconNotebook, color: "#6366f1" },
  "technical": { icon: IconCode, color: "#8884d8" },
  "behavioral": { icon: IconMessageCircle, color: "#10b981" },
  "follow-up": { icon: IconClipboardCheck, color: "#f97316" },
  "general": { icon: IconBrain, color: "#ec4899" }
};

/**
 * Get a seeded random number based on the current date
 * This ensures the same tip is shown throughout the day
 */
function getSeededRandom(seed: number): () => number {
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

/**
 * Get a random tip using the current date as a seed
 */
function getRandomTipForToday(): InterviewTip {
  // Create date string in format YYYYMMDD to use as seed
  const today = new Date();
  const dateString = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Create seeded random function
  const seededRandom = getSeededRandom(dateString);

  // Get random index
  const randomIndex = Math.floor(seededRandom() * interviewTips.length);

  return interviewTips[randomIndex];
}

/**
 * Get a completely random tip (not seeded by date)
 */
function getRandomTip(): InterviewTip {
  const randomIndex = Math.floor(Math.random() * interviewTips.length);
  return interviewTips[randomIndex];
}

/**
 * Gets the color for a tip category
 */
function getCategoryColor(category: string): string {
  return categoryMap[category as keyof typeof categoryMap]?.color || "#64748b";
}

export function InterviewTipCard() {
  const [tip, setTip] = useState<InterviewTip | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [nextConfettiClick, setNextConfettiClick] = useState(1); // Start with 1 to guarantee first click confetti

  useEffect(() => {
    // Set the tip on the client side to ensure consistent date handling
    setTip(getRandomTipForToday());
  }, []);

  // Function to get a random number between min and max (inclusive)
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to trigger confetti from a specific element
  const triggerConfetti = (buttonElement: HTMLElement) => {
    const rect = buttonElement.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    // Create a colorful confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#6366f1', '#8884d8', '#10b981', '#f97316', '#ec4899'],
      zIndex: 1000,
      disableForReducedMotion: true,
    });
  };

  const handleRefreshTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Increment click count
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    // Check if confetti should be displayed
    if (newClickCount === nextConfettiClick) {
      // Trigger confetti effect from the button
      triggerConfetti(e.currentTarget);
      
      // Set the next click number for confetti (between 3-7 clicks from now)
      setNextConfettiClick(newClickCount + getRandomNumber(3, 7));
    }
    
    setIsLoading(true);
    
    // Add a small delay to make the animation more visible
    setTimeout(() => {
      setTip(getRandomTip());
      setIsLoading(false);
    }, 400);
  };

  if (!tip) {
    return null; // Return null during SSR or while loading
  }

  // Get the appropriate icon based on category
  const CategoryIcon = categoryMap[tip.category].icon;
  const categoryColor = getCategoryColor(tip.category);

  return (
    <div className="col-span-full">
      {/* Keep the card stationary, only animate the content */}
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="pb-2 px-6 pt-4 bg-card">
          <div className="grid grid-cols-3 items-center">
            <div className="flex items-center gap-2 font-medium col-span-1 text-sm text-muted-foreground">
              <div 
                className="flex items-center justify-center p-1 rounded-full bg-amber-100 dark:bg-amber-950"
              >
                <LightbulbIcon className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
              </div>
              <span>Interview Tip #{tip.id}</span>
            </div>

            <div
              className="px-2.5 py-1 text-xs rounded-full capitalize font-medium flex items-center gap-1.5 justify-center"
              style={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor
              }}
            >
              <div>
                <CategoryIcon />
              </div>
              <span>{tip.category}</span>
            </div>

            <div className="flex justify-end">
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 gap-1.5 text-xs font-medium transition-all hover:shadow-sm cursor-pointer overflow-hidden"
                  onClick={handleRefreshTip}
                  style={{ borderColor: `${categoryColor}30`, color: categoryColor }}
                  disabled={isLoading}
                >
                  <div>
                    <RefreshCw />
                  </div>
                  <span>New Tip</span>
                </Button>
              </div>
            </div>
          </div>

          <h3 
            className="text-base text-center font-medium my-3 text-foreground"
          >
            {tip.title}
          </h3>
        </div>
        
        <div
          className="pt-4 pb-6 px-6 bg-gradient-to-br"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${categoryColor}95, ${categoryColor}85)`
          }}
        >
          <p 
            className="text-lg text-white leading-relaxed font-serif" 
            style={{
              fontFamily: "'Georgia', serif",
              letterSpacing: "0.01em",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)"
            }}
          >
            {tip.content}
          </p>
        </div>
      </div>
    </div>
  );
}
