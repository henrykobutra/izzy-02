"use client";

import { motion } from "framer-motion";
import { IconMicrophone } from "@tabler/icons-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function InterviewVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Chat Messages */}
        <div className="absolute inset-0 flex flex-col justify-center space-y-4">
          {[
            {
              from: "ai",
              text: "Tell me about your experience with React.",
              delay: 0.2,
            },
            {
              from: "user",
              text: "I've built several production applications using React, including a large-scale e-commerce platform.",
              delay: 0.8,
            },
            {
              from: "ai",
              text: "How do you handle state management in complex applications?",
              delay: 1.4,
            },
            {
              from: "user",
              text: "I typically use Redux for global state and React Context for component-specific state.",
              delay: 2.0,
            },
          ].map((bubble, i) => (
            <motion.div
              key={`bubble-${i}`}
              className={`flex items-start gap-2 ${
                bubble.from === "ai" ? "justify-start" : "justify-end"
              }`}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: bubble.delay,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {bubble.from === "ai" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: bubble.delay, duration: 0.3 }}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/faces/izzy-avatar.png" alt="Izzy" />
                    <AvatarFallback className="bg-emerald-600">IZ</AvatarFallback>
                  </Avatar>
                </motion.div>
              )}
              {bubble.from === "user" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: bubble.delay, duration: 0.3 }}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/faces/henry.png" alt="Henry" />
                    <AvatarFallback className="bg-indigo-600">
                      <IconMicrophone className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              )}
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${
                  bubble.from === "ai"
                    ? "bg-emerald-600 text-white rounded-tl-none"
                    : "bg-indigo-600 text-white rounded-tr-none"
                }`}
              >
                <div className="text-sm leading-relaxed">{bubble.text}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection Line */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <motion.path
            d="M 130,200 C 160,170 240,170 270,200"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            strokeDasharray="6 4"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />

          {/* Data Transfer */}
          <motion.circle
            r="3"
            fill="#10b981"
            initial={{ cx: 130, cy: 200, opacity: 0 }}
            animate={{
              cx: [130, 200, 270],
              cy: [200, 170, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 1.0,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 3,
            }}
          />

          <motion.circle
            r="3"
            fill="#6366f1"
            initial={{ cx: 270, cy: 200, opacity: 0 }}
            animate={{
              cx: [270, 200, 130],
              cy: [200, 170, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 3,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
