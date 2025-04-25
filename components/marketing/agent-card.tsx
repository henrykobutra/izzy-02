"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PhoneCall, PhoneOff, UserRound, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { startDemoVapiAssistant, setupVapiEventListeners } from "@/lib/vapi/vapi.demo.utils";
import { vapi } from "@/lib/vapi/vapi.sdk";
import { toast } from "sonner";

// VisuallyHidden component for accessibility
function VisuallyHidden({ children }: { children: React.ReactNode }) {
    return (
        <span className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0">
            {children}
        </span>
    );
}

export default function AgentCard() {
    const [open, setOpen] = useState(false);
    const [callState, setCallState] = useState<"not_started" | "connecting" | "izzy_speaking" | "user_speaking" | "ended">("not_started");

    // Vapi call management
    const [vapiCall, setVapiCall] = useState<unknown>(null);
    const vapiCallRef = useRef<unknown>(null);
    const cleanupEventListeners = useRef<(() => void) | null>(null);
    const speechEndTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Update ref when vapiCall changes
    useEffect(() => {
        vapiCallRef.current = vapiCall;
    }, [vapiCall]);

    // Cleanup function that handles all Vapi resources
    const cleanupVapiResources = () => {
        // Clean up any active speech end timers
        if (speechEndTimerRef.current) {
            clearTimeout(speechEndTimerRef.current);
            speechEndTimerRef.current = null;
        }

        // Clean up event listeners
        if (cleanupEventListeners.current) {
            cleanupEventListeners.current();
            cleanupEventListeners.current = null;
        }

        // Stop Vapi call if active
        if (vapiCallRef.current) {
            try {
                vapi.stop();
            } catch (e) {
                console.error("Error stopping Vapi call:", e);
            }
            setVapiCall(null);
        }

        // Reset call state
        setCallState("not_started");
    };

    // Watch for dialog close and clean up resources
    useEffect(() => {
        if (!open && (callState !== "not_started" || vapiCall)) {
            cleanupVapiResources();
        }
    }, [open, callState, vapiCall]);

    // Cleanup Vapi event listeners and resources when component unmounts
    useEffect(() => {
        return () => {
            cleanupVapiResources();
        };
    }, []);

    // Start the call using Vapi
    const handleStartCall = async () => {
        setCallState("connecting");

        try {
            // Start the Vapi demo assistant
            const call = await startDemoVapiAssistant();
            setVapiCall(call);

            // Setup event listeners to control UI
            const cleanup = setupVapiEventListeners({
                onCallStart: () => {
                    setCallState("izzy_speaking");
                },
                onCallEnd: () => {
                    setCallState("ended");
                    setVapiCall(null);

                    // Reset after a delay
                    setTimeout(() => {
                        setCallState("not_started");
                        setOpen(false);
                    }, 2000);
                },
                onSpeechStart: () => {
                    setCallState("izzy_speaking");

                    // Clear any pending debounced state changes when interviewer starts speaking
                    if (speechEndTimerRef.current) {
                        clearTimeout(speechEndTimerRef.current);
                        speechEndTimerRef.current = null;
                    }
                },
                onSpeechEnd: () => {
                    // Clear any existing timeout first
                    if (speechEndTimerRef.current) {
                        clearTimeout(speechEndTimerRef.current);
                    }

                    // Set a new timeout with a short delay
                    speechEndTimerRef.current = setTimeout(() => {
                        setCallState("user_speaking");
                        speechEndTimerRef.current = null;
                    }, 300);
                },
                onError: () => {
                    toast.error("Call ended", {
                        description: "Feel free to try again later!",
                    });
                    handleEndCall();
                }
            });

            // Save cleanup function
            cleanupEventListeners.current = cleanup;
        } catch (error) {
            console.error("Failed to start Vapi call:", error);
            toast.error("Failed to start call", {
                description: "There was a problem starting the call. Please try again.",
            });
            setCallState("not_started");
        }
    };

    // End the call
    const handleEndCall = () => {
        cleanupVapiResources();

        setCallState("ended");

        // Reset after a delay
        setTimeout(() => {
            setCallState("not_started");
            setOpen(false);
        }, 2000);
    };

    // Helper to determine if participant is active
    const isIzzyActive = callState === "izzy_speaking";
    const isUserActive = callState === "user_speaking";

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

            {/* CTA Button with Dialog */}
            <div className="mt-4 md:mt-0 flex-shrink-0">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
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
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md md:max-w-xl lg:max-w-2xl">
                        {/* Visually hidden title for accessibility */}
                        <VisuallyHidden>
                            <DialogTitle>Chat with Izzy</DialogTitle>
                        </VisuallyHidden>

                        <div className="flex flex-col items-center p-4">
                            {/* Call status indicator */}
                            <div className="text-center mb-6 text-muted-foreground">
                                {callState === "not_started" && <span>Ready to start call with Izzy</span>}
                                {callState === "connecting" && <span>Connecting to Izzy...</span>}
                                {callState === "izzy_speaking" && <span>Izzy is speaking</span>}
                                {callState === "user_speaking" && <span>Your turn to speak</span>}
                                {callState === "ended" && <span>Call ended</span>}
                            </div>

                            {/* Video call participants */}
                            <div className="flex flex-col md:flex-row w-full gap-6 mb-8">
                                {/* Interviewer */}
                                <div
                                    className={cn(
                                        "flex-1 flex flex-col items-center p-6 rounded-xl border transition-all duration-500 ease-in-out h-[240px]",
                                        isIzzyActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                                    )}
                                >
                                    <div className="relative mb-3">
                                        <Avatar className="h-24 w-24">
                                            <AvatarImage src="/faces/izzy-avatar.png" alt="Izzy" />
                                            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                                                IZ
                                            </AvatarFallback>
                                        </Avatar>
                                        {isIzzyActive && (
                                            <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800">
                                                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-medium">Izzy</h3>
                                        <p className="text-xs text-muted-foreground">Interview Assistant</p>
                                    </div>
                                    <div className="mt-auto pt-3">
                                        {isIzzyActive && (
                                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                <span className="mr-1 relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                                Speaking
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* User */}
                                <div
                                    className={cn(
                                        "flex-1 flex flex-col items-center p-6 rounded-xl border transition-all duration-500 ease-in-out h-[240px]",
                                        isUserActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                                    )}
                                >
                                    <div className="relative mb-3">
                                        <Avatar className="h-24 w-24">
                                            <AvatarFallback className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-lg">
                                                <UserRound className="h-12 w-12" />
                                            </AvatarFallback>
                                        </Avatar>
                                        {isUserActive && (
                                            <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800">
                                                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-medium">You</h3>
                                        <p className="text-xs text-muted-foreground">Job Seeker</p>
                                    </div>
                                    <div className="mt-auto pt-3">
                                        {isUserActive && (
                                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                <span className="mr-1 relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                                Your Turn
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Call controls */}
                            <div className="flex flex-col items-center gap-3 mt-2">
                                {(callState === "not_started" || callState === "connecting") && (
                                    <div className="inline-block mx-auto py-2 px-4 rounded-lg bg-amber-100/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-200 shadow-sm mb-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                            <p className="text-sm font-medium">Allow microphone access when prompted for voice interaction</p>
                                        </div>
                                    </div>
                                )}
                                {callState === "not_started" ? (
                                    <Button
                                        onClick={handleStartCall}
                                        size="lg"
                                        className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                                    >
                                        <PhoneCall className="h-5 w-5" />
                                        Start Call
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleEndCall}
                                        size="lg"
                                        variant="destructive"
                                        className="cursor-pointer gap-2"
                                        disabled={callState === "ended" || callState === "connecting"}
                                    >
                                        <PhoneOff className="h-5 w-5" />
                                        {callState === "connecting" ? "Connecting..." : "End Call"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}