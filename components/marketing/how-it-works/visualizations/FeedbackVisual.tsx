"use client";

import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";

export function FeedbackVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Feedback Report Card */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white rounded-lg shadow-xl overflow-hidden"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Report Header */}
          <motion.div
            className="bg-amber-600 p-4 flex items-center justify-between"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className="text-white font-medium">Interview Evaluation</div>
            <BarChart2 className="h-5 w-5 text-white" />
          </motion.div>

          <div className="p-4">
            {/* Overall Score */}
            <motion.div
              className="mb-6 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-sm text-gray-500 mb-1">
                Overall Performance
              </div>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 * (1 - 0.78) }}
                    transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <motion.div
                  className="absolute text-2xl font-bold text-amber-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                >
                  78%
                </motion.div>
              </div>
            </motion.div>

            {/* Metrics */}
            <div className="space-y-4">
              {[
                { label: "Communication", score: 0.82, color: "#10b981" },
                { label: "Technical Knowledge", score: 0.65, color: "#f59e0b" },
                { label: "Problem Solving", score: 0.9, color: "#6366f1" },
                { label: "Cultural Fit", score: 0.75, color: "#ec4899" },
              ].map((metric, i) => (
                <motion.div
                  key={`metric-${i}`}
                  className="space-y-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + i * 0.2 }}
                >
                  <div className="flex justify-between text-sm">
                    <div>{metric.label}</div>
                    <div className="font-medium">
                      {Math.round(metric.score * 100)}%
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: metric.color }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${metric.score * 100}%` }}
                      transition={{
                        delay: 1.5 + i * 0.2,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feedback Notes */}
            <motion.div
              className="mt-6 pt-4 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              <div className="text-sm text-gray-500 mb-2">Key Feedback</div>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`feedback-${i}`}
                  className="flex items-start gap-2 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + i * 0.2 }}
                >
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-amber-600" />
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full w-full" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Analysis Elements */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          {/* Background Analysis Grid */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={`grid-h-${i}`}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              stroke="rgba(245, 158, 11, 0.1)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            />
          ))}

          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={`grid-v-${i}`}
              x1={i * 40}
              y1="0"
              x2={i * 40}
              y2="400"
              stroke="rgba(245, 158, 11, 0.1)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            />
          ))}

          {/* Data Points */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.circle
              key={`data-point-${i}`}
              cx={50 + Math.random() * 300}
              cy={50 + Math.random() * 300}
              r={2 + Math.random() * 3}
              fill="#f59e0b"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                r: [2, 4, 2],
              }}
              transition={{
                delay: 1 + Math.random() * 3,
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: Math.random() * 5,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
