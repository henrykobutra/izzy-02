"use client";

import { motion } from "framer-motion";
import {
  BarChart2,
  Search,
  Target,
  Play,
  Eye,
  ArrowUpRight,
} from "lucide-react";

export function IterateVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-md h-[500px]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background Elements */}
          <motion.circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="rgba(236, 72, 153, 0.1)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Main Process Circle */}
          <motion.circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="rgba(236, 72, 153, 0.2)"
            strokeWidth="4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Process Steps */}
          {[
            { angle: 0, color: "#9333ea", label: "Analyze", icon: Search },
            { angle: 72, color: "#0891b2", label: "Plan", icon: Target },
            { angle: 144, color: "#10b981", label: "Execute", icon: Play },
            { angle: 216, color: "#f59e0b", label: "Review", icon: Eye },
            {
              angle: 288,
              color: "#ec4899",
              label: "Improve",
              icon: ArrowUpRight,
            },
          ].map((step, i) => {
            const x = 200 + 120 * Math.cos((step.angle * Math.PI) / 180);
            const y = 200 + 120 * Math.sin((step.angle * Math.PI) / 180);

            return (
              <g key={`step-${i}`}>
                {/* Step Circle */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="20"
                  fill={step.color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
                />

                {/* Step Icon */}
                <motion.foreignObject
                  x={x - 10}
                  y={y - 10}
                  width="20"
                  height="20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.2 }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <step.icon className="h-4 w-4 text-white" />
                  </div>
                </motion.foreignObject>

                {/* Step Label */}
                <motion.text
                  x={x}
                  y={y + 35}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.2 }}
                >
                  {step.label}
                </motion.text>

                {/* Connection Line */}
                <motion.line
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke={step.color}
                  strokeWidth="2"
                  strokeDasharray="5 3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.6 + i * 0.2 }}
                />
              </g>
            );
          })}

          {/* Animated Progress Line */}
          <motion.path
            d="M 200 80 A 120 120 0 1 1 200 80"
            fill="none"
            stroke="#ec4899"
            strokeWidth="4"
            strokeDasharray="10 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              rotate: 360,
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: 0.5 },
              rotate: {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
            style={{ transformOrigin: "center" }}
          />

          {/* Center Hub */}
          <motion.circle
            cx="200"
            cy="200"
            r="30"
            fill="#ec4899"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />

          {/* Chart Icon */}
          <motion.foreignObject
            x="180"
            y="180"
            width="40"
            height="40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-white" />
            </div>
          </motion.foreignObject>

          {/* Floating Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={200 + 100 * Math.cos((i * 30 * Math.PI) / 180)}
              cy={200 + 100 * Math.sin((i * 30 * Math.PI) / 180)}
              r="2"
              fill="#ec4899"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: i * 0.1,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
