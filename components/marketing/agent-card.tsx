import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

export default function AgentCard() {
    return (
        <div className="bg-accent shadow-lg flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto p-8 rounded-3xl">
            {/* Avatar with online indicator */}
            <div className="relative flex-shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden relative border-4 border-background shadow-md">
                    <Image
                        src="/faces/izzy-avatar.png"
                        alt="Izzy AI Agent"
                        width={144}
                        height={144}
                        className="object-cover"
                    />
                </div>
                {/* Online indicator with ping animation */}
                <div className="absolute bottom-1 right-1 md:bottom-3 md:right-3">
                    <span className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border border-background"></span>
                    </span>
                </div>
            </div>

            {/* Text content */}
            <div className="flex-grow space-y-3 text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-accent-foreground">
                    Meet Izzy
                </h2>
                <p className="text-lg text-accent-foreground/80 max-w-2xl font-medium">
                    Your AI interview coach, ready to help you prepare for your next job interview. Start a conversation now.
                </p>
            </div>

            {/* CTA Button */}
            <div className="mt-4 md:mt-0 flex-shrink-0">
                <Button
                    size="lg"
                    className="text-lg px-8 py-6 font-semibold transition-all hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg cursor-pointer"
                    variant="default"
                    effect="expandIcon"
                    icon={PhoneCall}
                    iconPlacement="right"
                >
                    Talk to Izzy
                </Button>
            </div>
        </div>
    );
}