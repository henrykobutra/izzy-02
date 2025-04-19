"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Brain } from "../icons/Brain";

interface ProfileAnalysisVisualProps {
  isAutoplayEnabled: boolean;
}

export function ProfileAnalysisVisual({
  isAutoplayEnabled,
}: ProfileAnalysisVisualProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Resume Document */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Resume Header */}
          <div className="h-16 bg-purple-600 flex items-center justify-center">
            <motion.div
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <FileText className="h-6 w-6 text-purple-600" />
            </motion.div>
          </div>

          {/* Resume Content */}
          <div className="p-4 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className={`h-3 rounded-full bg-gray-200 ${
                  i === 0 ? "w-3/4" : i === 1 ? "w-1/2" : "w-full"
                }`}
                initial={{ width: 0 }}
                animate={{ width: i === 0 ? "75%" : i === 1 ? "50%" : "100%" }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
              />
            ))}

            {/* Skills Section */}
            <motion.div
              className="mt-6 pt-4 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className="text-xs text-gray-500 mb-2">SKILLS</div>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "Python", "UI/UX"].map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* AI Analysis Effect */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            boxShadow: [
              "0 0 0 0 rgba(147, 51, 234, 0)",
              "0 0 0 20px rgba(147, 51, 234, 0.3)",
              "0 0 0 40px rgba(147, 51, 234, 0)",
            ],
          }}
          transition={{
            delay: 2,
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />

        {/* AI Brain */}
        <motion.div
          className="absolute right-8 top-8 w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Brain className="h-10 w-10 text-white" />
        </motion.div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.path
              key={`path-${i}`}
              d={`M ${280} ${100} C ${240 - i * 10} ${150 + i * 20}, ${220} ${
                180 - i * 10
              }, ${200 - i * 5} ${200 + i * 10}`}
              stroke="rgba(147, 51, 234, 0.5)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
            />
          ))}
        </svg>

        {/* Data Points - Only show when autoplay is disabled */}
        {!isAutoplayEnabled &&
          Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`point-${i}`}
              className="absolute w-2 h-2 rounded-full bg-purple-400"
              style={{
                left: `${30 + Math.random() * 60}%`,
                top: `${30 + Math.random() * 60}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: 2 + Math.random() * 2,
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          ))}
      </div>
    </div>
  );
}
