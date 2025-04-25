"use client";

import { Laptop2 } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import confetti from 'canvas-confetti';

export default function MobileConfettiButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Get a randomized origin point near the button
  const getRandomOrigin = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return { x: 0.5, y: 0.5 };

    const rect = button.getBoundingClientRect();
    
    // Base coordinates (center of button)
    const centerX = (rect.left + rect.width / 2) / window.innerWidth;
    const centerY = (rect.top + rect.height / 2) / window.innerHeight;
    
    // Get random offset within the button boundaries
    const offsetX = (Math.random() - 0.5) * (rect.width / window.innerWidth);
    const offsetY = (Math.random() - 0.5) * (rect.height / window.innerHeight);
    
    return { 
      x: centerX + offsetX * 0.8, // 80% of random offset to keep it mostly within button
      y: centerY + offsetY * 0.8  // Slight adjustment to Y to keep it near button
    };
  }, []);

  // Specifically optimized for mobile taps
  const showTapConfetti = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Use the Izzy color theme for confetti
    const colors = [
      '#673AB7', // primary (deep purple)
      '#FF5722', // secondary (vibrant orange)
      '#FFEB3B'  // accent (bright yellow)
    ];

    // Create multiple confetti bursts from different parts of the button
    // First burst
    const origin1 = getRandomOrigin();
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: origin1.x, y: origin1.y },
      colors,
      disableForReducedMotion: true,
      startVelocity: 30,
      gravity: 1.2,
      shapes: ['square', 'circle'],
      scalar: 1.2,
      angle: 90 + (Math.random() - 0.5) * 30 // Random angle generally pointing upward
    });

    // Second burst with slight delay
    setTimeout(() => {
      const origin2 = getRandomOrigin();
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { x: origin2.x, y: origin2.y },
        colors,
        disableForReducedMotion: true,
        startVelocity: 25,
        gravity: 1,
        ticks: 200,
        angle: 90 + (Math.random() - 0.5) * 40 // More random angle
      });
    }, 150);

    // Third burst with another delay
    setTimeout(() => {
      const origin3 = getRandomOrigin();
      confetti({
        particleCount: 30,
        spread: 120,
        origin: { x: origin3.x, y: origin3.y },
        colors,
        disableForReducedMotion: true,
        startVelocity: 35,
        gravity: 1.1,
        ticks: 200,
        angle: 90 + (Math.random() - 0.5) * 25 // Another random angle
      });
    }, 250);
  }, [getRandomOrigin]);

  const showHoverConfetti = useCallback(() => {
    if (!isHovering) return;

    // Use the Izzy color theme for confetti
    const colors = [
      '#673AB7', // primary (deep purple)
      '#FF5722', // secondary (vibrant orange)
      '#FFEB3B'  // accent (bright yellow)
    ];

    // Randomized origin for hover effect
    const origin = getRandomOrigin();
    
    // Smaller hover-based confetti effect
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: origin.x, y: origin.y },
      colors,
      disableForReducedMotion: true,
      startVelocity: 20,
      gravity: 0.8,
      angle: 90 + (Math.random() - 0.5) * 20 // Mostly upward angle
    });

    // Schedule another burst if still hovering
    if (isHovering) {
      timerRef.current = setTimeout(showHoverConfetti, 800);
    }
  }, [isHovering, getRandomOrigin]);

  const handleMouseEnter = () => {
    // Only activate hover effects on devices that support hover
    if (window.matchMedia('(hover: hover)').matches) {
      setIsHovering(true);
      showHoverConfetti();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const handleClick = () => {
    // Optimized for tap interaction
    showTapConfetti();
  };

  return (
    <button
      ref={buttonRef}
      className="w-full text-lg py-3 font-semibold transition-all bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group active:scale-95 touch-manipulation"
      aria-disabled="true"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {}} // Empty handler to enable active states on iOS
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 animate-gradient-text opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <Laptop2 className="h-5 w-5" />
      <span className="relative z-10">Use a Larger Device</span>
    </button>
  );
}
