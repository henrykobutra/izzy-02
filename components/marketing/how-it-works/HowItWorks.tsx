"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { steps } from "./steps";
import { Progress } from "@/components/ui/progress";
import {
  ProfileAnalysisVisual,
  StrategyVisual,
  InterviewVisual,
  FeedbackVisual,
} from "./visualizations";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-advance through steps
  useEffect(() => {
    if (!isAutoplayEnabled) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= steps.length ? 1 : prev + 1));
      setProgress(0);
    }, 10000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + 1));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isAutoplayEnabled]);

  // Re-enable autoplay after 30 seconds of inactivity
  useEffect(() => {
    if (isAutoplayEnabled) return;

    const timeout = setTimeout(() => {
      setIsAutoplayEnabled(true);
      setProgress(0);
    }, 30000);

    return () => clearTimeout(timeout);
  }, [isAutoplayEnabled]);

  return (
    <section id="how-it-works" className="py-24 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-6">
          How Our AI Agents Work Together
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Our intelligent AI agents collaborate to provide a comprehensive
          interview preparation experience tailored to your specific needs.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Steps */}
          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex gap-4 p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeStep === step.id ? step.lightColor : "bg-gray-900"
                }`}
                onClick={() => {
                  setActiveStep(step.id);
                  setIsAutoplayEnabled(false);
                  setProgress(0);
                }}
              >
                <div
                  className={`h-12 w-12 rounded-full ${step.color} flex items-center justify-center shrink-0`}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-lg font-semibold ${
                        activeStep === step.id ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  <p
                    className={`mt-1 ${
                      activeStep === step.id ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {step.description}
                  </p>
                  {activeStep === step.id && (
                    <div className="mt-2">
                      {isAutoplayEnabled ? (
                        <Progress value={progress} className="h-1" />
                      ) : (
                        <div />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Visualization */}
          <div className="relative h-[500px] rounded-2xl p-6 flex items-center justify-center">
            <AnimatedVisualization
              activeStep={activeStep}
              isAutoplayEnabled={isAutoplayEnabled}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedVisualization({
  activeStep,
  isAutoplayEnabled,
}: {
  activeStep: number;
  isAutoplayEnabled: boolean;
}) {
  // Different visualizations based on active step
  const renderVisualization = () => {
    switch (activeStep) {
      case 1:
        return <ProfileAnalysisVisual isAutoplayEnabled={isAutoplayEnabled} />;
      case 2:
        return <StrategyVisual />;
      case 3:
        return <InterviewVisual />;
      case 4:
        return <FeedbackVisual />;
      case 5:
        return <FeedbackVisual />; // Fallback to FeedbackVisual
      default:
        return <ProfileAnalysisVisual isAutoplayEnabled={isAutoplayEnabled} />;
    }
  };

  return (
    <motion.div
      key={activeStep}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex items-center justify-center"
    >
      {renderVisualization()}
    </motion.div>
  );
}
