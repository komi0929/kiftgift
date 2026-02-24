'use client';

import { useEffect, useRef } from 'react';
import { useGratitudeStore } from '@/hooks/useGratitudeStore';

export default function RippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const showRipple = useGratitudeStore((s) => s.showRipple);
  const rippleChainCount = useGratitudeStore((s) => s.rippleChainCount);
  const dismissRipple = useGratitudeStore((s) => s.dismissRipple);

  useEffect(() => {
    if (!showRipple || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circles: { x: number; y: number; r: number; maxR: number; alpha: number }[] = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const count = Math.min(rippleChainCount, 5);
    for (let i = 0; i < count; i++) {
      circles.push({
        x: cx,
        y: cy,
        r: 0,
        maxR: 200 + i * 60,
        alpha: 0.5 - i * 0.1,
      });
    }

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let allDone = true;

      for (const c of circles) {
        if (c.r < c.maxR) {
          c.r += 3;
          c.alpha = Math.max(0, c.alpha - 0.005);
          allDone = false;
        }

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74, 191, 221, ${c.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (!allDone) {
        frame = requestAnimationFrame(animate);
      } else {
        dismissRipple();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [showRipple, rippleChainCount, dismissRipple]);

  if (!showRipple) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
}
