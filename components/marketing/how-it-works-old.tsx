"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Target, MessageSquare, BarChart2, RefreshCw, Users } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Profile Analysis",
    description: "You provide your profile and the AI understands your background, experience, and skills.",
    icon: FileText,
    color: "bg-purple-600",
    lightColor: "bg-purple-500/10",
  },
  {
    id: 2,
    title: "Interview Strategy",
    description:
      "You provide a target job description or job title, and the agent creates a customized interview plan.",
    icon: Target,
    color: "bg-cyan-600",
    lightColor: "bg-cyan-500/10",
  },
  {
    id: 3,
    title: "Practice Interview",
    description: "You practice with an interviewer agent that simulates real interview scenarios and questions.",
    icon: MessageSquare,
    color: "bg-emerald-600",
    lightColor: "bg-emerald-500/10",
  },
  {
    id: 4,
    title: "Feedback & Evaluation",
    description: "An evaluator agent analyzes your responses and provides detailed feedback to improve.",
    icon: BarChart2,
    color: "bg-amber-600",
    lightColor: "bg-amber-500/10",
  },
  {
    id: 5,
    title: "Iterate & Improve",
    description: "Rinse and repeat the process to continuously improve your interview skills.",
    icon: RefreshCw,
    color: "bg-pink-600",
    lightColor: "bg-pink-500/10",
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)

  // Auto-advance through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= steps.length ? 1 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="how-it-works" className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-6">
          How Our AI Agents Work Together
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Our intelligent AI agents collaborate to provide a comprehensive interview preparation experience tailored to
          your specific needs.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Steps */}
          <div className="space-y-6">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className={`flex gap-4 p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeStep === step.id ? step.lightColor : "bg-gray-900"
                }`}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ scale: 1.02 }}
                animate={{
                  y: activeStep === step.id ? 0 : 0,
                  opacity: activeStep === step.id ? 1 : 0.7,
                }}
              >
                <div className={`h-12 w-12 rounded-full ${step.color} flex items-center justify-center shrink-0`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-lg font-semibold ${activeStep === step.id ? "text-white" : "text-gray-300"}`}
                    >
                      {step.title}
                    </span>
                    {activeStep === step.id && (
                      <motion.div
                        className="h-2 w-2 rounded-full bg-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </div>
                  <p className={`mt-1 ${activeStep === step.id ? "text-gray-300" : "text-gray-500"}`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side: Visualization */}
          <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 flex items-center justify-center">
            <AnimatedVisualization activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  )
}

function AnimatedVisualization({ activeStep }: { activeStep: number }) {
  // Different visualizations based on active step
  const renderVisualization = () => {
    switch (activeStep) {
      case 1:
        return <ProfileAnalysisVisual />
      case 2:
        return <StrategyVisual />
      case 3:
        return <InterviewVisual />
      case 4:
        return <FeedbackVisual />
      case 5:
        return <IterateVisual />
      default:
        return <ProfileAnalysisVisual />
    }
  }

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
  )
}

function ProfileAnalysisVisual() {
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
                className={`h-3 rounded-full bg-gray-200 ${i === 0 ? "w-3/4" : i === 1 ? "w-1/2" : "w-full"}`}
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
              d={`M ${280} ${100} C ${240 - i * 10} ${150 + i * 20}, ${220} ${180 - i * 10}, ${200 - i * 5} ${200 + i * 10}`}
              stroke="rgba(147, 51, 234, 0.5)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
            />
          ))}
        </svg>

        {/* Data Points */}
        {Array.from({ length: 8 }).map((_, i) => (
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
  )
}

function StrategyVisual() {
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
              <div className="text-xs text-white text-opacity-70 mb-2">REQUIREMENTS</div>
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
                  {i === 0 ? "TECHNICAL SKILLS" : i === 1 ? "EXPERIENCE" : "SOFT SKILLS"}
                </div>
                {Array.from({ length: 2 }).map((_, j) => (
                  <motion.div
                    key={`plan-item-${i}-${j}`}
                    className="h-2 rounded-full bg-gray-200 mb-1"
                    style={{ width: `${90 - (j % 2) * 20}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${90 - (j % 2) * 20}%` }}
                    transition={{ delay: 1.1 + i * 0.2 + j * 0.1, duration: 0.3 }}
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
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
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
  )
}

function InterviewVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* AI Interviewer */}
        <motion.div
          className="absolute left-12 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`ai-particle-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-white"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${i * 45}deg) translateY(-30px)`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.25,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            ))}
          </motion.div>

          <MessageSquare className="h-12 w-12 text-white" />
        </motion.div>

        {/* User */}
        <motion.div
          className="absolute right-12 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Users className="h-12 w-12 text-white" />
        </motion.div>

        {/* Speech Bubbles */}
        <div className="absolute inset-0">
          {[
            {
              from: "ai",
              text: "Tell me about your experience with React.",
              delay: 1.0,
            },
            {
              from: "user",
              text: "I've built several production applications...",
              delay: 2.5,
            },
            {
              from: "ai",
              text: "How would you handle state management?",
              delay: 4.0,
            },
            {
              from: "user",
              text: "It depends on the complexity of the app...",
              delay: 5.5,
            },
          ].map((bubble, i) => (
            <motion.div
              key={`bubble-${i}`}
              className={`absolute top-0 w-40 p-3 rounded-lg ${
                bubble.from === "ai" ? "bg-emerald-600 text-white left-24" : "bg-indigo-600 text-white right-24"
              }`}
              style={{ top: `${25 + i * 20}%` }}
              initial={{
                opacity: 0,
                x: bubble.from === "ai" ? -20 : 20,
                y: 0,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{ delay: bubble.delay, duration: 0.5 }}
            >
              <div className="text-xs">{bubble.text}</div>
              <div
                className={`absolute w-3 h-3 ${bubble.from === "ai" ? "bg-emerald-600 -left-1" : "bg-indigo-600 -right-1"}`}
                style={{
                  top: "40%",
                  transform: "rotate(45deg)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Audio Waves */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          {/* AI Audio Waves */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              delay: 1.0,
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 2,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.path
                key={`ai-wave-${i}`}
                d={`M ${80 - i * 3} ${200 - 20 - i * 3} Q ${100} ${200 - 40 - Math.random() * 20} ${120 + i * 3} ${200 - 20 - i * 3}`}
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.0 + i * 0.05, duration: 0.3 }}
              />
            ))}
          </motion.g>

          {/* User Audio Waves */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              delay: 2.5,
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 2,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.path
                key={`user-wave-${i}`}
                d={`M ${280 - i * 3} ${200 - 20 - i * 3} Q ${300} ${200 - 40 - Math.random() * 20} ${320 + i * 3} ${200 - 20 - i * 3}`}
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.5 + i * 0.05, duration: 0.3 }}
              />
            ))}
          </motion.g>

          {/* Connection Line */}
          <motion.path
            d="M 130,200 C 160,170 240,170 270,200"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeDasharray="6 4"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />

          {/* Data Transfer */}
          <motion.circle
            r="4"
            fill="#10b981"
            initial={{ cx: 130, cy: 200, opacity: 0 }}
            animate={{
              cx: [130, 200, 270],
              cy: [200, 170, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              delay: 1.0,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 2,
            }}
          />

          <motion.circle
            r="4"
            fill="#6366f1"
            initial={{ cx: 270, cy: 200, opacity: 0 }}
            animate={{
              cx: [270, 200, 130],
              cy: [200, 170, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              delay: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 2,
            }}
          />
        </svg>
      </div>
    </div>
  )
}

function FeedbackVisual() {
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
              <div className="text-sm text-gray-500 mb-1">Overall Performance</div>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
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
                    <div className="font-medium">{Math.round(metric.score * 100)}%</div>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: metric.color }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${metric.score * 100}%` }}
                      transition={{ delay: 1.5 + i * 0.2, duration: 0.7, ease: "easeOut" }}
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
  )
}

function IterateVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Circular Process Path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          {/* Background Circle */}
          <motion.circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="rgba(236, 72, 153, 0.2)"
            strokeWidth="6"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Process Steps */}
          {[
            { angle: 0, color: "#9333ea", icon: "📋", label: "Profile" },
            { angle: 72, color: "#0891b2", icon: "🎯", label: "Strategy" },
            { angle: 144, color: "#10b981", icon: "💬", label: "Practice" },
            { angle: 216, color: "#f59e0b", icon: "📊", label: "Feedback" },
            { angle: 288, color: "#ec4899", icon: "🔄", label: "Improve" },
          ].map((step, i) => {
            const x = 200 + 120 * Math.cos((step.angle * Math.PI) / 180)
            const y = 200 + 120 * Math.sin((step.angle * Math.PI) / 180)

            return (
              <g key={`step-${i}`}>
                {/* Step Circle */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="30"
                  fill={step.color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
                />

                {/* Step Icon */}
                <motion.text
                  x={x}
                  y={y + 8}
                  textAnchor="middle"
                  fontSize="20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.2 }}
                >
                  {step.icon}
                </motion.text>

                {/* Step Label */}
                <motion.text
                  x={x}
                  y={y + 50}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                >
                  {step.label}
                </motion.text>

                {/* Connection Line to Center */}
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
            )
          })}

          {/* Moving Dot */}
          <motion.circle
            cx="200"
            cy="80"
            r="10"
            fill="#ec4899"
            initial={{ pathOffset: 0 }}
            animate={{
              cx: [
                200 + 120 * Math.cos((0 * Math.PI) / 180),
                200 + 120 * Math.cos((72 * Math.PI) / 180),
                200 + 120 * Math.cos((144 * Math.PI) / 180),
                200 + 120 * Math.cos((216 * Math.PI) / 180),
                200 + 120 * Math.cos((288 * Math.PI) / 180),
                200 + 120 * Math.cos((360 * Math.PI) / 180),
              ],
              cy: [
                200 + 120 * Math.sin((0 * Math.PI) / 180),
                200 + 120 * Math.sin((72 * Math.PI) / 180),
                200 + 120 * Math.sin((144 * Math.PI) / 180),
                200 + 120 * Math.sin((216 * Math.PI) / 180),
                200 + 120 * Math.sin((288 * Math.PI) / 180),
                200 + 120 * Math.sin((360 * Math.PI) / 180),
              ],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />

          {/* Trailing Effect */}
          <motion.circle
            cx="200"
            cy="80"
            r="10"
            fill="#ec4899"
            initial={{ opacity: 0 }}
            animate={{
              cx: [
                200 + 120 * Math.cos((0 * Math.PI) / 180),
                200 + 120 * Math.cos((72 * Math.PI) / 180),
                200 + 120 * Math.cos((144 * Math.PI) / 180),
                200 + 120 * Math.cos((216 * Math.PI) / 180),
                200 + 120 * Math.cos((288 * Math.PI) / 180),
              ],
              cy: [
                200 + 120 * Math.sin((0 * Math.PI) / 180),
                200 + 120 * Math.sin((72 * Math.PI) / 180),
                200 + 120 * Math.sin((144 * Math.PI) / 180),
                200 + 120 * Math.sin((216 * Math.PI) / 180),
                200 + 120 * Math.sin((288 * Math.PI) / 180),
              ],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8],
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.1,
            }}
          />

          {/* Center Hub */}
          <motion.circle
            cx="200"
            cy="200"
            r="40"
            fill="#ec4899"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />

          <motion.text
            x="200"
            y="205"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            REPEAT
          </motion.text>

          {/* Rotating Outer Ring */}
          <motion.circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="rgba(236, 72, 153, 0.1)"
            strokeWidth="10"
            strokeDasharray="20 20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.5,
              rotate: 360,
            }}
            transition={{
              opacity: { delay: 2, duration: 1 },
              rotate: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
            style={{ transformOrigin: "center" }}
          />

          {/* Particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={200 + 80 * Math.cos((i * 45 * Math.PI) / 180)}
              cy={200 + 80 * Math.sin((i * 45 * Math.PI) / 180)}
              r="3"
              fill="#ec4899"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                r: [2, 4, 2],
              }}
              transition={{
                delay: 2 + i * 0.2,
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: i * 0.3,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

function Brain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  )
}
