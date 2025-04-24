import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dotColorClass?: string;
  expandedTextColorClass?: string;
  size?: "default" | "sm" | "md" | "lg" | "xl";
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ 
  children, 
  className, 
  dotColorClass = "bg-accent", 
  expandedTextColorClass = "text-accent-foreground",
  size = "default",
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: "p-1 px-4 text-xs",
    default: "p-2 px-6 text-base",
    md: "p-2.5 px-7 text-base",
    lg: "p-3 px-8 text-lg",
    xl: "p-4 px-10 text-xl"
  };

  const dotSizeClasses = {
    sm: "h-1.5 w-1.5",
    default: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
    xl: "h-4 w-4"
  };

  const hoverTranslateClasses = {
    sm: "group-hover:translate-x-8",
    default: "group-hover:translate-x-12",
    md: "group-hover:translate-x-14",
    lg: "group-hover:translate-x-16",
    xl: "group-hover:translate-x-20"
  };

  const hoverTranslateBackClasses = {
    sm: "group-hover:-translate-x-3",
    default: "group-hover:-translate-x-5",
    md: "group-hover:-translate-x-6",
    lg: "group-hover:-translate-x-7",
    xl: "group-hover:-translate-x-9"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background font-semibold",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className={cn("rounded-full transition-all duration-300 group-hover:scale-[100.8]", dotSizeClasses[size], dotColorClass)}></div>
        <span className={cn("inline-block transition-all duration-300 group-hover:opacity-0", hoverTranslateClasses[size])}>
          {children}
        </span>
      </div>
      <div className={cn("absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100", hoverTranslateBackClasses[size], expandedTextColorClass)}>
        <span>{children}</span>
        <ArrowRight className={cn({
          "h-3 w-3": size === "sm",
          "h-4 w-4": size === "default",
          "h-5 w-5": size === "md",
          "h-6 w-6": size === "lg",
          "h-7 w-7": size === "xl",
        })} />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
