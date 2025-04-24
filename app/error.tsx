"use client";

import Link from "next/link";
import Image from "next/image";
import { IconAlertTriangle, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

// Next.js App Router error boundary signature
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <Image src="/logo.png" alt="Izzy Logo" width={120} height={36} priority />
        </div>
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/30">
            <IconAlertTriangle size={32} />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold">Error</h1>
        <p className="mb-8 text-muted-foreground">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex flex-col gap-4">
          <Button asChild>
            <Link href="/login">
              <IconArrowLeft className="mr-2" size={18} />
              Back to Login
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button variant="ghost" onClick={reset}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
