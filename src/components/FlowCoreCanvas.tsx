"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FlowCoreCanvasProps {
  sectionId: string; // The container section ID to pin/trigger scroll animation
  className?: string;
}

export default function FlowCoreCanvas({ sectionId, className = "" }: FlowCoreCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 300;
      const height = rect.height || 300;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 1. Try to test if heartbeat frames exist (try to load frame-001.jpg)
    const testImage = new Image();
    testImage.src = "/media/heartbeat-frames/frame-001.jpg";

    testImage.onload = () => {
      // Frames exist! Setup frame preloader and scrub sequence
      setUseFallback(false);
      setupFrameSequence(canvas, ctx);
    };

    testImage.onerror = () => {
      // Frames do not exist yet. Use custom procedural canvas fallback
      setUseFallback(true);
      setupProceduralAnimation(canvas, ctx);
    };

    // --- (A) FRAME SEQUENCE METHOD ---
    function setupFrameSequence(c: HTMLCanvasElement, cxElement: CanvasRenderingContext2D) {
      const frameCount = 90; // Standard sequence size
      const images: HTMLImageElement[] = [];
      const imageSequence = { frame: 0 };

      // Preload images
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/media/heartbeat-frames/frame-${String(i).padStart(3, "0")}.jpg`;
        images.push(img);
      }

      const drawFrame = (index: number) => {
        const img = images[index];
        if (img && img.complete) {
          cxElement.clearRect(0, 0, c.width, c.height);
          // Maintain aspect ratio cover
          const canvasWidth = c.width / (window.devicePixelRatio || 1);
          const canvasHeight = c.height / (window.devicePixelRatio || 1);
          const imgRatio = img.width / img.height;
          const canvasRatio = canvasWidth / canvasHeight;

          let drawWidth = canvasWidth;
          let drawHeight = canvasHeight;
          let offsetX = 0;
          let offsetY = 0;

          if (imgRatio > canvasRatio) {
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
          } else {
            drawHeight = canvasWidth / imgRatio;
            offsetY = (canvasHeight - drawHeight) / 2;
          }

          cxElement.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
      };

      // Draw initial frame once first image is loaded
      images[0].onload = () => drawFrame(0);

      // GSAP ScrollTrigger to scrub frame index
      gsap.to(imageSequence, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: `#${sectionId}`,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
            drawFrame(Math.floor(imageSequence.frame));
          },
        },
      });
    }

    // --- (B) PROCEDURAL ANIMATION FALLBACK ---
    function setupProceduralAnimation(c: HTMLCanvasElement, cxElement: CanvasRenderingContext2D) {
      let animationId: number;
      let time = 0;

      // Thread configuration
      interface Thread {
        startX: number;
        startY: number;
        cp1x: number;
        cp1y: number;
        cp2x: number;
        cp2y: number;
        color: string;
        speed: number;
        progress: number;
      }

      const threads: Thread[] = [
        { startX: -20, startY: 80, cp1x: 100, cp1y: 50, cp2x: 150, cp2y: 180, color: "#6EE7C9", speed: 0.008, progress: 0 },
        { startX: -20, startY: 280, cp1x: 120, cp1y: 250, cp2x: 180, cp2y: 200, color: "#B79CFF", speed: 0.006, progress: 0.3 },
        { startX: 100, startY: -20, cp1x: 80, cp1y: 120, cp2x: 180, cp2y: 150, color: "#FF6B4A", speed: 0.007, progress: 0.6 },
        { startX: 450, startY: 80, cp1x: 350, cp1y: 50, cp2x: 250, cp2y: 180, color: "#6EE7C9", speed: 0.009, progress: 0.15 },
        { startX: 450, startY: 320, cp1x: 380, cp1y: 280, cp2x: 280, cp2y: 220, color: "#B79CFF", speed: 0.005, progress: 0.45 },
        { startX: 280, startY: 420, cp1x: 320, cp1y: 300, cp2x: 250, cp2y: 250, color: "#6EE7C9", speed: 0.007, progress: 0.8 },
      ];

      // Setup ScrollTrigger simply to track scroll progress
      gsap.to({}, {
        scrollTrigger: {
          trigger: `#${sectionId}`,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      const draw = () => {
        time += 0.015;
        const canvasWidth = c.width / (window.devicePixelRatio || 1);
        const canvasHeight = c.height / (window.devicePixelRatio || 1);

        cxElement.clearRect(0, 0, canvasWidth, canvasHeight);

        // Center coordinates of core
        const cx = canvasWidth * 0.52;
        const cy = canvasHeight * 0.5;

        // Dynamic metrics based on scroll
        const scrollImpact = scrollProgressRef.current * 1.5; // Scale and speed modifier
        const baseRadius = 85 + Math.sin(time * 4) * (2 + scrollProgressRef.current * 3);
        const activeRadius = baseRadius * (1 + scrollProgressRef.current * 0.25);

        // 1. Draw connecting threads
        threads.forEach((t) => {
          // Adjust start/end positions based on screen dimensions
          const startX = t.startX < 0 ? 0 : t.startX > 400 ? canvasWidth : t.startX;
          const startY = t.startY < 0 ? 0 : t.startY > 400 ? canvasHeight : t.startY;

          // Drawing thread path
          cxElement.beginPath();
          cxElement.moveTo(startX, startY);
          cxElement.bezierCurveTo(t.cp1x, t.cp1y, t.cp2x, t.cp2y, cx, cy);
          cxElement.strokeStyle = t.color === "#6EE7C9" ? "rgba(110,231,201,0.18)" : "rgba(183,156,255,0.18)";
          cxElement.lineWidth = 1.5;
          cxElement.stroke();

          // Flow particle
          // Increase flow speed on scroll
          t.progress += t.speed * (1 + scrollImpact * 3.5);
          if (t.progress > 1) t.progress = 0;

          // Find coordinates along Bezier curve
          const nt = t.progress;
          const mt = 1 - nt;
          const px = mt * mt * mt * startX + 3 * mt * mt * nt * t.cp1x + 3 * mt * nt * nt * t.cp2x + nt * nt * nt * cx;
          const py = mt * mt * mt * startY + 3 * mt * mt * nt * t.cp1y + 3 * mt * nt * nt * t.cp2y + nt * mt * mt * cy; // Keep it simple

          // Draw glow trail
          const grad = cxElement.createRadialGradient(px, py, 0, px, py, 12);
          grad.addColorStop(0, t.color);
          grad.addColorStop(0.3, t.color + "88");
          grad.addColorStop(1, "transparent");

          cxElement.beginPath();
          cxElement.arc(px, py, 12, 0, Math.PI * 2);
          cxElement.fillStyle = grad;
          cxElement.fill();

          cxElement.beginPath();
          cxElement.arc(px, py, 4, 0, Math.PI * 2);
          cxElement.fillStyle = "#F4EFE6";
          cxElement.fill();
        });

        // 2. Draw organic morphing core (a liquid glossy shape)
        cxElement.beginPath();
        const steps = 90;
        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2;
          const ripple =
            Math.sin(angle * 6 + time * 2) * (5 + scrollProgressRef.current * 8) +
            Math.cos(angle * 3 - time * 1.5) * 4;
          const r = activeRadius + ripple;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          if (i === 0) {
            cxElement.moveTo(x, y);
          } else {
            cxElement.lineTo(x, y);
          }
        }
        cxElement.closePath();

        // 3D Spherical/glossy radial gradient
        const gradient = cxElement.createRadialGradient(
          cx - activeRadius * 0.25,
          cy - activeRadius * 0.25,
          activeRadius * 0.05,
          cx,
          cy,
          activeRadius
        );
        gradient.addColorStop(0, "#FFAE9B"); 
        gradient.addColorStop(0.35, "#FF6B4A"); 
        gradient.addColorStop(0.8, "#B03E26"); 
        gradient.addColorStop(1, "#18141F"); 

        cxElement.fillStyle = gradient;
        cxElement.fill();

        // Add soft rim glowing stroke
        cxElement.strokeStyle = "rgba(110, 231, 201, 0.4)"; 
        cxElement.lineWidth = 1.5 + scrollProgressRef.current * 2;
        cxElement.stroke();

        // 3. Highlight gloss (specular reflection)
        cxElement.beginPath();
        const glossRadiusX = activeRadius * 0.35;
        const glossRadiusY = activeRadius * 0.2;
        cxElement.ellipse(
          cx - activeRadius * 0.25,
          cy - activeRadius * 0.25,
          glossRadiusX,
          glossRadiusY,
          -Math.PI / 6,
          0,
          Math.PI * 2
        );
        const glossGrad = cxElement.createRadialGradient(
          cx - activeRadius * 0.25,
          cy - activeRadius * 0.25,
          0,
          cx - activeRadius * 0.25,
          cy - activeRadius * 0.25,
          glossRadiusX
        );
        glossGrad.addColorStop(0, "rgba(244, 239, 230, 0.55)"); 
        glossGrad.addColorStop(1, "transparent");
        cxElement.fillStyle = glossGrad;
        cxElement.fill();

        // 4. Subtle violet rim glow
        cxElement.beginPath();
        const glowGrad = cxElement.createRadialGradient(
          cx + activeRadius * 0.35,
          cy + activeRadius * 0.35,
          0,
          cx + activeRadius * 0.35,
          cy + activeRadius * 0.35,
          activeRadius * 0.6
        );
        glowGrad.addColorStop(0, "rgba(183, 156, 255, 0.3)");
        glowGrad.addColorStop(1, "transparent");
        cxElement.arc(cx, cy, activeRadius, 0, Math.PI * 2);
        cxElement.fillStyle = glowGrad;
        cxElement.fill();

        animationId = requestAnimationFrame(draw);
      };

      draw();

      return () => {
        cancelAnimationFrame(animationId);
      };
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [sectionId]);

  return (
    <div ref={containerRef} className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Background radial soft light-glows */}
      <div className="absolute inset-0 glow-spot-coral opacity-40 blur-2xl z-0 scale-90" />
      <div className="absolute inset-0 glow-spot-violet opacity-30 blur-2xl z-0 translate-x-12 translate-y-12" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain relative z-10"
        style={{ pointerEvents: "none" }}
      />

      <span className="hidden opacity-0 text-[10px] text-text-muted absolute bottom-2 right-2 z-20">
        {useFallback ? "Procedural Core Fallback Active" : "Heart Frame sequence Active"}
      </span>
    </div>
  );
}
