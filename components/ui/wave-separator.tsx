'use client';

import { useEffect, useRef } from 'react';

interface WaveSeparatorProps {
  className?: string;
  height?: number;
  colors?: string[];
}

export function WaveSeparator({
  className = '',
  height = 60,
  colors = ['#673AB7', '#FF5722', '#FFEB3B'], // Default colors based on user preference
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

      ctx.fillStyle = obj.color;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(obj.nodes[0][0], obj.nodes[0][1]);

      for (let i = 0; i < obj.nodes.length; i++) {
        if (obj.nodes[i + 1]) {
          ctx.quadraticCurveTo(
            obj.nodes[i][0], obj.nodes[i][1],
            diff(obj.nodes[i][0], obj.nodes[i + 1][0]), 
            diff(obj.nodes[i][1], obj.nodes[i + 1][1])
          );
        } else {
          ctx.lineTo(obj.nodes[i][0], obj.nodes[i][1]);
          ctx.lineTo(canvas.width, canvas.height);
        }
      }
      ctx.closePath();
      ctx.fill();
    };

    const update = () => {
      if (!ctx) return;
      
      // Get background color (we'll use transparent instead of getting computed style)
      ctx.fillStyle = 'rgba(24, 24, 24, 0)'; // Using transparent background
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';
      
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
  }, [colors, height]);

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
