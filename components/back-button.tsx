"use client";

import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

export function BackButton() {
  return (
    <Button 
      variant="outline" 
      onClick={() => window.history.back()} 
      className="flex items-center justify-center w-full"
    >
      <IconArrowLeft className="mr-2" size={18} />
      Go Back
    </Button>
  );
}
