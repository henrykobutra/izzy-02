"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/actions";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const signOutSteps = [
  { text: "Signing you out..." },
  { text: "Clearing your session" },
  { text: "Redirecting to login" },
];

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await signOut();
      if (result?.nextUrl) {
        router.push(result.nextUrl);
      } else {
        router.push("/login");
      }
    })();
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <MultiStepLoader loadingStates={signOutSteps} loading={true} duration={1200} loop={false} />
    </div>
  );
}
