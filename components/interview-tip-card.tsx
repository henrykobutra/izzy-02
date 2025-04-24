"use client";

import { useState, useEffect } from "react";
import { LightbulbIcon, RefreshCwIcon as RefreshCw } from "lucide-react";
import { interviewTips, InterviewTip } from "@/constants/interview-tips";
import { Button } from "@/components/ui/button";
import { IconBrain, IconMessageCircle, IconCode, IconClipboardCheck, IconNotebook } from "@tabler/icons-react";
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from "framer-motion";

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
 * Gets the color for a tip category
 */
function getCategoryColor(category: string): string {
  return categoryMap[category as keyof typeof categoryMap]?.color || "#64748b";
}

// Custom hook for typewriter effect with improved timing
function useTypewriter(text: string, speed: number = 20) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Start typing effect with a new text input
  useEffect(() => {
    if (!text) return;
    
    // Reset state immediately to avoid stale references
    setIsTyping(true);
    setDisplayText("");
    
    // Track if the component is still mounted
    let isMounted = true;
    
    // Process the entire text in sequence with explicit state updates
    const processText = async () => {
      // Small initial delay before starting
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Type each character with appropriate delays
      let result = "";
      
      // Using a local copy to avoid dependency issues
      const currentText = text;
      
      for (let i = 0; i < currentText.length; i++) {
        if (!isMounted) return; // Stop if unmounted
        
        // Add next character
        result += currentText.charAt(i);
        
        // Update state with current result
        setDisplayText(result);
        
        // Wait before next character
        const lastChar = currentText.charAt(i);
        const delay = ['.', '!', '?', ',', ';', ':'].includes(lastChar)
          ? speed * (Math.random() * 2 + 1.2)
          : speed * (Math.random() * 0.4 + 0.7);
          
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      // Done typing
      if (isMounted) {
        setIsTyping(false);
      }
    };
    
    // Start typing
    processText();
    
    return () => {
      // Cleanup on unmount or when text changes
      isMounted = false;
      setIsTyping(false);
    };
  }, [text, speed]);
  
  return { displayText, isTyping };
}

export function InterviewTipCard() {
  const [tip, setTip] = useState<InterviewTip | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [nextConfettiClick, setNextConfettiClick] = useState(1); // Start with 1 to guarantee first click confetti
  const [animationKey, setAnimationKey] = useState(0); // Key to trigger animations
  const [displayedTips, setDisplayedTips] = useState<Set<number>>(new Set()); // Track shown tips
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  
  // Get the content with typewriter effect (only use this if tip exists)
  const { displayText, isTyping } = useTypewriter(tip?.content || "", 20);

  useEffect(() => {
    // Set the tip on the client side to ensure consistent date handling
    const initialTip = getRandomTipForToday();
    setTip(initialTip);
    setDisplayedTips(new Set([initialTip.id])); // Add the initial tip to displayed set
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

  // Function to get a random tip that hasn't been displayed yet
  const getNextRandomTip = (): InterviewTip => {
    // If we've shown all tips, reset the tracking
    if (displayedTips.size >= interviewTips.length) {
      setDisplayedTips(new Set());
    }
    
    // Filter out tips that have already been displayed
    const availableTips = interviewTips.filter(tip => !displayedTips.has(tip.id));
    
    // Get a random tip from available ones
    const randomIndex = Math.floor(Math.random() * availableTips.length);
    const newTip = availableTips[randomIndex];
    
    // Update the displayed tips set
    setDisplayedTips(prevDisplayed => new Set([...prevDisplayed, newTip.id]));
    
    return newTip;
  };

  useEffect(() => {
    if (tip && !isTyping) {
      // Set a small timeout to ensure the content has rendered
      const timer = setTimeout(() => {
        const textElement = document.getElementById('tip-content');
        if (textElement) {
          setContentHeight(textElement.scrollHeight);
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [tip, isTyping]);

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
    
    // Increment animation key to trigger new animation
    setAnimationKey(prevKey => prevKey + 1);
    
    // Short delay to make animation noticeable
    setTimeout(() => {
      setTip(getNextRandomTip());
      setIsLoading(false);
    }, 100);
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
              <div className="flex items-center justify-center p-1 rounded-full bg-amber-100 dark:bg-amber-950">
                <LightbulbIcon className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
              </div>
              <span>Interview Tip #
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`tip-id-${animationKey}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tip.id}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            <div
              className="px-2.5 py-1 text-xs rounded-full capitalize font-medium flex items-center gap-1.5 justify-center transition-colors duration-300"
              style={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`category-${animationKey}`}
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <CategoryIcon />
                  </div>
                  <span>{tip.category}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-end">
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-8 px-3 gap-1.5 text-xs font-medium transition-all hover:shadow-sm overflow-hidden ${isTyping ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  onClick={handleRefreshTip}
                  disabled={isLoading || isTyping}
                >
                  <div>
                    <RefreshCw />
                  </div>
                  <span>New Tip</span>
                </Button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.h3
              key={`title-${animationKey}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-base text-center font-medium my-3 text-foreground"
            >
              {tip.title}
            </motion.h3>
          </AnimatePresence>
        </div>

        <div
          className="pt-4 pb-6 px-6 bg-gradient-to-br transition-all duration-500"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${categoryColor}95, ${categoryColor}85)`
          }}
        >
          <div 
            className="relative"
            style={{ minHeight: contentHeight ? `${contentHeight}px` : 'auto' }}
          >
            <p
              id="tip-content"
              className="text-lg text-white leading-relaxed font-serif"
              style={{
                fontFamily: "'Georgia', serif",
                letterSpacing: "0.01em",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {displayText}
              {isTyping && (
                <span 
                  className="inline-block w-0.5 h-[1.2em] ml-1 bg-white opacity-70 animate-blink align-middle"
                  aria-hidden="true"
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
