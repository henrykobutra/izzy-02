'use client';

import { useEffect, useRef } from 'react';

interface WaveSeparatorProps {
  className?: string;
  height?: number;
  colors?: string[];
  lineWidth?: number;
}

export function WaveSeparator({
  className = '',
  height = 60,
  colors = ['#673AB7', '#FF5722', '#FFEB3B'], // Default colors based on user preference
  lineWidth = 2,
}: WaveSeparatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const waveNodesRef = useRef<Array<{ nodes: number[][], color: string }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const width = Math.max(window.innerWidth, 1920);
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize waves
    const nodes = 6;
    waveNodesRef.current = colors.map(color => {
      const waveNodes = [];
      for (let i = 0; i <= nodes + 2; i++) {
        waveNodes.push([(i - 1) * canvas.width / nodes, 0, Math.random() * 200, 0.3]);
      }
      return { nodes: waveNodes, color };
    });

    const bounce = (nodeArr: number[]) => {
      nodeArr[1] = height / 2 * Math.sin(nodeArr[2] / 20) + canvas.height / 2;
      nodeArr[2] = nodeArr[2] + nodeArr[3];
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
  }, [colors, height, lineWidth]);

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
