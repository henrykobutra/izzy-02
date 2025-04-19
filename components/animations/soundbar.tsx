"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export default function AgentVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = 180 * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = "180px"
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Define agent colors
    const colors = [
      "#9333ea", // purple
      "#06b6d4", // cyan
      "#10b981", // emerald
      "#f97316", // orange
      "#ec4899", // pink
    ]

    // Create bars data
    const barCount = 60
    const bars: { height: number; targetHeight: number; color: string; speed: number }[] = []

    for (let i = 0; i < barCount; i++) {
      const randomHeight = Math.random() * 80 + 10
      bars.push({
        height: randomHeight,
        targetHeight: randomHeight,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.05 + Math.random() * 0.1,
      })
    }

    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.getBoundingClientRect().width / barCount

      // Update and draw bars
      bars.forEach((bar, index) => {
        // Update target height periodically
        if (Math.random() < 0.03) {
          bar.targetHeight = Math.random() * 80 + 10
        }

        // Smoothly animate to target height
        bar.height += (bar.targetHeight - bar.height) * bar.speed

        // Draw bar
        ctx.fillStyle = bar.color
        const x = index * barWidth
        const y = 180 - bar.height
        const height = bar.height

        ctx.beginPath()
        ctx.roundRect(x + 2, y, barWidth - 4, height, 4)
        ctx.fill()
      })

      if (isAnimating) {
        requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      setIsAnimating(false)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="w-full h-[180px] relative">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button className="bg-white text-black font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition flex items-center gap-2">
          TALK TO PREPI
          <Mic className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function Mic(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}
