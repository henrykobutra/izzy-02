'use client';

import { useEffect, useRef, useState } from 'react';

interface WaveSeparatorProps {
  className?: string;
  height?: number;
  colors?: string[];
  lineWidth?: number;
}

export function WaveSeparator({
  className = '',
  height = 100,
  colors = [], // We'll generate colors dynamically if none provided
  lineWidth = 2,
}: WaveSeparatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const waveNodesRef = useRef<Array<{ nodes: number[][], color: string }>>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      canvas.width = width;
      canvas.height = height;
      setWindowWidth(width); // Store the window width to trigger re-initialization
    };

    // Initialize on first render
    if (windowWidth === 0) {
      resizeCanvas();
    }
    
    window.addEventListener('resize', resizeCanvas);

    // Generate colors if none provided
    const waveColors = colors.length > 0 ? colors : generateWaveColors(14);

    // Initialize waves - this will now happen on every width change
    const nodes = 6;
    waveNodesRef.current = waveColors.map(color => {
      const waveNodes = [];
      for (let i = 0; i <= nodes + 2; i++) {
        waveNodes.push([(i - 1) * canvas.width / nodes, 0, Math.random() * 200, 0.3]);
      }
      return { nodes: waveNodes, color };
    });

    const bounce = (nodeArr: number[]) => {
      // Calculate a safe amplitude that uses more of the available height
      // Use 45% of height to ensure waves stay within the canvas while having good motion
      const safeAmplitude = height * 0.45;
      
      // Center the waves vertically in the canvas
      const centerY = canvas.height / 2;
      
      // Apply sine wave motion with controlled amplitude
      nodeArr[1] = centerY + safeAmplitude * Math.sin(nodeArr[2] / 15);
      
      // Keep animation speed consistent
      nodeArr[2] = nodeArr[2] + nodeArr[3] * 1.2;
    };

    const drawWave = (obj: { nodes: number[][], color: string }) => {
      if (!ctx) return;

      const diff = (a: number, b: number) => {
        return (b - a) / 2 + a;
      };

      ctx.strokeStyle = obj.color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(obj.nodes[0][0], obj.nodes[0][1]);

      for (let i = 0; i < obj.nodes.length - 1; i++) {
        ctx.quadraticCurveTo(
          obj.nodes[i][0], obj.nodes[i][1],
          diff(obj.nodes[i][0], obj.nodes[i + 1][0]),
          diff(obj.nodes[i][1], obj.nodes[i + 1][1])
        );
      }

      ctx.stroke();
    };

    const update = () => {
      if (!ctx) return;

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < waveNodesRef.current.length; i++) {
        for (let j = 0; j < waveNodesRef.current[i].nodes.length; j++) {
          bounce(waveNodesRef.current[i].nodes[j]);
        }
        drawWave(waveNodesRef.current[i]);
      }

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [colors, height, lineWidth, windowWidth]); // Added windowWidth as dependency

  return (
    <div className={`wave-separator w-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}

// Helper function to generate an array of wave colors
function generateWaveColors(count: number): string[] {
  // Colors from the dark theme in globals.css (using actual values)
  const colorPalette = [
    '#673AB7',   // Deep purple (--primary)
    '#FF5722',   // Vibrant orange (--secondary)
    '#FFEB3B',   // Bright yellow (--accent)
    '#8844DD',   // Purple variation (--chart-4 approximation)
    '#FF6F39',   // Orange variation (--chart-5 approximation)
    '#404040',   // Subtle background shade (--muted approximation)
    '#4D4D4D'    // Border color (--border approximation)
  ];

  const colors: string[] = [];

  // First, add our main colors directly
  colors.push(colorPalette[0], colorPalette[1], colorPalette[2]);

  // Then fill the rest with variations using opacity
  for (let i = colors.length; i < count; i++) {
    // Cycle through our palette and apply varying opacities
    const baseColorIndex = i % colorPalette.length;
    const baseColor = colorPalette[baseColorIndex];

    // For the main colors, use higher opacity
    // For secondary colors, use lower opacity to make them more subtle
    const opacity = baseColorIndex < 3 ?
      0.6 + (0.4 * ((i % 3) / 3)) :  // Main colors (60-100% opacity)
      0.2 + (0.3 * ((i % 4) / 4));   // Secondary colors (20-50% opacity)

    // Convert hex to rgba
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);

    colors.push(`rgba(${r}, ${g}, ${b}, ${opacity.toFixed(2)})`);
  }

  return colors;
}
