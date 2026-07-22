"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techStack } from "@/config/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Stack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const pills = pillRefs.current.filter(Boolean);
    if (pills.length === 0) return;

    // Staggered scale-in with back.out(2) ease
    gsap.fromTo(
      pills,
      { scale: 0.3, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full glow-spot-violet opacity-25 blur-3xl -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <span className="text-mint uppercase tracking-wider text-xs md:text-sm font-bold font-sans block mb-3">
          Our Integrations
        </span>
        <h2 className="font-display font-bold leading-tight tracking-tight text-[clamp(30px,3.6vw,44px)] text-text mb-6">
          Wired into your modern growth stack.
        </h2>
        <p className="font-sans font-medium text-text-muted text-base">
          We connect outbound scrapers, enrichment databases, inboxes, and AI models straight into your core CRM.
        </p>
      </div>

      {/* Pill grid row */}
      <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto relative z-10">
        {techStack.map((tool, idx) => (
          <div
            key={tool}
            ref={(el) => {
              if (el) pillRefs.current[idx] = el;
            }}
            className="px-6 py-3.5 rounded-btn bg-surface hover:bg-surface-2 border border-border font-sans font-bold text-sm md:text-base text-text transition-all duration-300 hover:border-coral/50 cursor-default flex items-center space-x-2.5 opacity-0 select-none"
          >
            {/* Color signal dot for branding */}
            <span
              className={`w-2 h-2 rounded-full ${
                tool === "n8n"
                  ? "bg-coral animate-pulse"
                  : tool === "OpenAI"
                  ? "bg-violet"
                  : "bg-mint"
              }`}
            />
            <span>{tool}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
