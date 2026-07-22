"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlowCoreCanvas from "./FlowCoreCanvas";
import Card3DTilt from "./Card3DTilt";
import { processSteps } from "@/config/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessHorizontal() {
  const targetSectionRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetSection = targetSectionRef.current;
    const scrollTrack = scrollTrackRef.current;
    if (!targetSection || !scrollTrack) return;

    // Calculate total horizontal scroll width
    const totalScrollWidth = scrollTrack.scrollWidth - window.innerWidth;

    // Horizontal Scrub Timeline
    const tween = gsap.to(scrollTrack, {
      x: -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: targetSection,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${totalScrollWidth + 600}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === targetSection) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="process"
      ref={targetSectionRef}
      className="bg-bg-alt h-screen relative overflow-hidden flex flex-col justify-between py-12"
    >
      {/* Background visual accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full glow-spot-coral opacity-15 blur-3xl -translate-y-1/2 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between z-10">
        <div>
          <span className="text-mint uppercase tracking-wider text-xs md:text-sm font-bold font-sans block mb-2">
            Horizontal Delivery Engine
          </span>
          <h2 className="font-display font-bold leading-none tracking-tight text-[clamp(28px,3.2vw,40px)] text-text">
            Our 4-step delivery pipeline
          </h2>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-text-muted text-xs uppercase tracking-widest font-sans font-semibold">
          <span>Scroll down to navigate</span>
          <span className="w-8 h-[1px] bg-coral inline-block animate-pulse" />
        </div>
      </div>

      {/* Main Track with Pinned Horizontal Panels */}
      <div
        ref={scrollTrackRef}
        className="flex items-center space-x-8 px-6 md:px-12 w-max h-[70vh] z-10 my-auto"
      >
        {/* Intro Panel with Canvas */}
        <div className="w-[320px] md:w-[420px] h-full flex flex-col justify-between p-8 rounded-panel bg-surface/50 border border-border/80 backdrop-blur-md shrink-0">
          <div>
            <span className="text-coral uppercase font-bold text-xs tracking-widest block mb-3">
              Interactive System
            </span>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-text mb-4">
              Watch workflow nodes converge in real-time
            </h3>
            <p className="font-sans font-medium text-text-muted text-sm leading-relaxed">
              Every row transition synchronizes data streams straight into the central automation engine.
            </p>
          </div>

          <div className="relative w-full h-[220px] border border-border/40 rounded-card overflow-hidden bg-bg/40">
            <FlowCoreCanvas sectionId="process" className="w-full h-full scale-110" />
          </div>
        </div>

        {/* 4 Process Cards horizontally arranged */}
        {processSteps.map((step) => (
          <Card3DTilt
            key={step.id}
            maxTilt={14}
            className="w-[340px] md:w-[460px] h-full shrink-0"
          >
            <div className="w-full h-full p-8 md:p-10 rounded-panel bg-surface border border-border flex flex-col justify-between shadow-2xl relative group">
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 glow-spot-mint opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display font-extrabold text-4xl md:text-5xl text-coral tracking-tight">
                    {step.stepNumber}
                  </span>
                  <span className="px-4 py-1.5 rounded-btn bg-coral/10 border border-coral/20 text-coral font-sans font-semibold text-xs uppercase tracking-wider">
                    Phase {step.stepNumber}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl md:text-3xl text-text mb-4 group-hover:text-coral transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-sans font-medium text-text-muted text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Decorative 3D badge wireframe */}
              <div className="pt-6 border-t border-border/60 flex items-center justify-between text-xs text-text-muted font-sans font-semibold uppercase tracking-wider">
                <span>Status: Active Pipeline</span>
                <span className="w-2 h-2 rounded-full bg-mint animate-ping" />
              </div>
            </div>
          </Card3DTilt>
        ))}
      </div>
    </section>
  );
}
