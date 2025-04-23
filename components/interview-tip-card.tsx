"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { interviewTips, InterviewTip } from "@/constants/interview-tips";
import { LightbulbIcon } from "lucide-react";
import { IconBrain, IconMessageCircle, IconCode, IconClipboardCheck, IconNotebook } from "@tabler/icons-react";

// Map of categories to their visual properties
const categoryIcons = {
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

export function InterviewTipCard() {
  const [tip, setTip] = useState<InterviewTip | null>(null);
  
  useEffect(() => {
    // Set the tip on the client side to ensure consistent date handling
    setTip(getRandomTipForToday());
  }, []);
  
  if (!tip) {
    return null; // Return null during SSR or while loading
  }
  
  // Get the appropriate icon based on category
  const CategoryIcon = categoryIcons[tip.category].icon;
  const categoryColor = categoryIcons[tip.category].color;
  
  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardDescription className="flex items-center gap-1.5">
            <LightbulbIcon className="h-4 w-4 text-yellow-500" />
            <span>Daily Interview Tip</span>
          </CardDescription>
          <div 
            className="px-2 py-0.5 text-xs rounded-full capitalize"
            style={{ 
              backgroundColor: `${categoryColor}15`,
              color: categoryColor
            }}
          >
            {tip.category}
          </div>
        </div>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <CategoryIcon className="h-4 w-4" style={{ color: categoryColor }} />
          {tip.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <p className="text-sm text-muted-foreground">{tip.content}</p>
      </CardContent>
    </Card>
  );
}
