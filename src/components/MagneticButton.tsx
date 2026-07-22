"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  range?: number;
}

export default function MagneticButton({ children, range = 0.35 }: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // quickTo is optimal for high-performance mouse following transitions
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power4.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power4.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = el.getBoundingClientRect();
      const x = clientX - (rect.left + rect.width / 2);
      const y = clientY - (rect.top + rect.height / 2);

      xTo(x * range);
      yTo(y * range);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
