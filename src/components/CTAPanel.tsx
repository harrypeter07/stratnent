"use client";

import React, { useEffect, useRef } from "react";
import MagneticButton from "./MagneticButton";

export default function CTAPanel() {
  const heartCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = heartCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = 120 * (window.devicePixelRatio || 1);
      canvas.height = 120 * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resize();

    // Loop animation for the heartbeat pulse
    const draw = () => {
      time += 0.045; // loop rate speed
      ctx.clearRect(0, 0, 120, 120);

      const cx = 60;
      const cy = 60;
      // Heartbeat pulse calculation
      const pulse = 1 + Math.sin(time) * 0.08 + (Math.sin(time * 2) > 0.8 ? 0.05 : 0);
      const radius = 25 * pulse;

      // Outer glow
      const outerGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, radius * 1.8);
      outerGrad.addColorStop(0, "rgba(255, 107, 74, 0.45)");
      outerGrad.addColorStop(0.5, "rgba(183, 156, 255, 0.15)");
      outerGrad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = outerGrad;
      ctx.fill();

      // Main core blob with organic offset waves
      ctx.beginPath();
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const ripple = Math.sin(angle * 4 + time * 1.5) * 2;
        const r = radius + ripple;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      const coreGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.25, 2, cx, cy, radius);
      coreGrad.addColorStop(0, "#FFAE9B");
      coreGrad.addColorStop(0.4, "#FF6B4A");
      coreGrad.addColorStop(0.8, "#B03E26");
      coreGrad.addColorStop(1, "#1F1A29");

      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Core rim highlight
      ctx.strokeStyle = "rgba(110, 231, 201, 0.35)"; // Mint glow
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="py-16 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] rounded-full glow-spot-coral opacity-25 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Main card panel (rounded 32px) */}
      <div className="relative bg-surface rounded-panel border border-border p-12 md:p-16 flex flex-col items-center text-center max-w-5xl mx-auto overflow-hidden">
        
        {/* Animated heart pulse element */}
        <div className="mb-6 relative w-[120px] h-[120px] flex items-center justify-center">
          <canvas ref={heartCanvasRef} className="w-[120px] h-[120px]" />
        </div>

        {/* Header */}
        <h2 className="font-display font-bold leading-tight tracking-tight text-[clamp(28px,3.5vw,42px)] text-text max-w-2xl mb-4">
          Ready to put growth on autopilot?
        </h2>

        {/* Subhead */}
        <p className="font-sans font-medium text-text-muted text-base md:text-lg max-w-md mb-8 leading-relaxed">
          Let’s build the custom workflow systems that fill your pipeline 24/7.
        </p>

        {/* Button */}
        <div>
          <MagneticButton range={0.25}>
            <a
              href="https://calendly.com/startnent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-coral text-bg px-8 py-4 rounded-btn font-sans font-bold text-[15px] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-coral/10 hover:shadow-coral/25"
            >
              Book a call
            </a>
          </MagneticButton>
        </div>

        {/* Decorative corner lines */}
        <div className="absolute top-0 left-0 w-8 h-[1px] bg-coral/20" />
        <div className="absolute top-0 left-0 w-[1px] h-8 bg-coral/20" />
        <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-coral/20" />
        <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-coral/20" />

      </div>
    </section>
  );
}
