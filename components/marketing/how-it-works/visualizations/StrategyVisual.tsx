"use client";

import { motion } from "framer-motion";

export function StrategyVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Job Description */}
        <motion.div
          className="absolute left-12 top-1/2 -translate-y-1/2 w-48 h-64 bg-cyan-600 rounded-lg shadow-lg overflow-hidden"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-4">
            <motion.div
              className="w-full h-6 bg-white bg-opacity-20 rounded mb-3"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />

            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`jd-line-${i}`}
                className="h-2 rounded-full bg-white bg-opacity-20 mb-2"
                style={{ width: `${100 - (i % 3) * 20}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${100 - (i % 3) * 20}%` }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
              />
            ))}

            {/* Requirements */}
            <motion.div
              className="mt-4 pt-2 border-t border-white border-opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="text-xs text-white text-opacity-70 mb-2">
                REQUIREMENTS
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`req-${i}`}
                  className="flex items-center gap-1 mb-1"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6 + i * 0.1 }}
                >
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <div className="h-2 w-24 bg-white bg-opacity-30 rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Strategy Plan */}
        <motion.div
          className="absolute right-12 top-1/2 -translate-y-1/2 w-48 h-64 bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="h-12 bg-cyan-600 flex items-center justify-center">
            <motion.div
              className="text-white font-medium text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              INTERVIEW PLAN
            </motion.div>
          </div>

          <div className="p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`plan-section-${i}`}
                className="mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.2 }}
              >
                <div className="text-xs text-cyan-600 font-medium mb-1">
                  {i === 0
                    ? "TECHNICAL SKILLS"
                    : i === 1
                    ? "EXPERIENCE"
                    : "SOFT SKILLS"}
                </div>
                {Array.from({ length: 2 }).map((_, j) => (
                  <motion.div
                    key={`plan-item-${i}-${j}`}
                    className="h-2 rounded-full bg-gray-200 mb-1"
                    style={{ width: `${90 - (j % 2) * 20}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${90 - (j % 2) * 20}%` }}
                    transition={{
                      delay: 1.1 + i * 0.2 + j * 0.1,
                      duration: 0.3,
                    }}
                  />
                ))}
              </motion.div>
            ))}

            {/* Strategy Checkpoints */}
            <motion.div
              className="mt-4 pt-2 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`checkpoint-${i}`}
                  className="flex items-center gap-2 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.9 + i * 0.1 }}
                >
                  <div className="w-3 h-3 rounded-full bg-cyan-600 flex items-center justify-center">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-white"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        delay: 2 + i * 0.5,
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        repeatDelay: 2,
                      }}
                    />
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Connection Arrows */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#0891b2" />
            </marker>
          </defs>

          <motion.path
            d="M 120,200 C 150,200 170,180 200,200 C 230,220 250,200 280,200"
            stroke="#0891b2"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />

          {/* Data flow particles */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              r="4"
              fill="#0891b2"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cx: [120, 200, 280],
                cy: [200, 200, 200],
              }}
              transition={{
                duration: 1.5,
                delay: 1.5 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: i * 0.2,
              }}
            />
          ))}
        </svg>

        {/* Glowing effect */}
        <motion.div
          className="absolute right-12 top-1/2 -translate-y-1/2 w-48 h-64 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            boxShadow: [
              "0 0 0 0 rgba(8, 145, 178, 0)",
              "0 0 0 10px rgba(8, 145, 178, 0.3)",
              "0 0 0 20px rgba(8, 145, 178, 0)",
            ],
          }}
          transition={{
            delay: 2.5,
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </div>
    </div>
  );
}
