'use client'

import { useRef, useEffect, useState } from 'react'

export default function SpeechVisualizer() {
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
      canvas.height = 100 * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = "100px"
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Define colors - matching the original AgentVisualizer
    const colors = [
      "#9333ea", // purple
      "#06b6d4", // cyan
      "#10b981", // emerald
      "#f97316", // orange
      "#ec4899", // pink
    ]

    // Create bars data - fewer bars as requested
    const barCount = 25
    const bars: { height: number; targetHeight: number; color: string; speed: number }[] = []

    for (let i = 0; i < barCount; i++) {
      const randomHeight = Math.random() * 50 + 10
      bars.push({
        height: randomHeight,
        targetHeight: randomHeight,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.1 + Math.random() * 0.15,
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
        if (Math.random() < 0.05) {
          bar.targetHeight = Math.random() * 50 + 10
        }

        // Smoothly animate to target height
        bar.height += (bar.targetHeight - bar.height) * bar.speed

        // Draw bar
        ctx.fillStyle = bar.color
        const x = index * barWidth
        const y = 100 - bar.height
        const height = bar.height

        // Using bigger gaps between bars
        ctx.beginPath()
        if (typeof ctx.roundRect === 'function') {
          // For browsers that support roundRect
          ctx.roundRect(x + 2, y, barWidth - 4, height, 4)
        } else {
          // Fallback for browsers that don't support roundRect
          ctx.rect(x + 2, y, barWidth - 4, height)
        }
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
  }, [isAnimating])

  return (
    <div className="w-full h-[100px] relative bg-muted/30 rounded-md overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  )
}
