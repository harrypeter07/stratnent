"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlowCoreCanvas from "./FlowCoreCanvas";
import { processSteps } from "@/config/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const rows = rowsRef.current.filter(Boolean);
    if (rows.length === 0) return;

    // Slide-in rows from left on scroll
    gsap.fromTo(
      rows,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Track scroll progress of Process section to determine active row
    ScrollTrigger.create({
      trigger: container,
      start: "top 25%",
      end: "bottom 75%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Determine active step index based on progress range
        if (progress <= 0.25) {
          setActiveStep(0);
        } else if (progress > 0.25 && progress <= 0.5) {
          setActiveStep(1);
        } else if (progress > 0.5 && progress <= 0.75) {
          setActiveStep(2);
        } else {
          setActiveStep(3);
        }
      },
    });

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
      id="process"
      ref={containerRef}
      className="bg-bg-alt py-28 relative overflow-hidden"
    >
      {/* Visual top/bottom separator line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border" />

      {/* Decorative glows */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full glow-spot-mint opacity-20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Numbered Checklist */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="mb-12">
            <span className="text-mint uppercase tracking-wider text-xs md:text-sm font-bold font-sans block mb-3">
              How We Work
            </span>
            <h2 className="font-display font-bold leading-tight tracking-tight text-[clamp(30px,3.6vw,44px)] text-text mb-6">
              Our 4-step delivery pipeline
            </h2>
            <p className="font-sans font-medium text-text-muted text-base max-w-xl">
              We align our design directly with your internal operations. Move from discovery to automated scale in weeks.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    if (el) rowsRef.current[idx] = el;
                  }}
                  className={`border-l-2 p-6 md:p-8 rounded-r-2xl transition-all duration-500 opacity-0 ${
                    isActive
                      ? "border-coral bg-surface/40 translate-x-2"
                      : "border-border bg-transparent"
                  }`}
                >
                  <div className="flex items-start space-x-6">
                    <span
                      className={`font-display font-extrabold text-2xl md:text-3xl transition-colors duration-500 ${
                        isActive ? "text-coral" : "text-text-muted/40"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <div>
                      <h3
                        className={`font-display font-bold text-lg md:text-xl mb-2 transition-colors duration-500 ${
                          isActive ? "text-text" : "text-text-muted"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="font-sans font-medium text-text-muted text-sm md:text-[15px] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Scrubbed Flow Core Canvas */}
        <div className="lg:col-span-5 h-[400px] lg:h-[550px] relative flex items-center justify-center border border-border/40 rounded-card bg-surface/20 backdrop-blur-sm overflow-hidden p-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-bg via-transparent to-bg-alt opacity-50" />
          <FlowCoreCanvas
            sectionId="process"
            className="w-full h-full scale-100"
          />
        </div>

      </div>
    </section>
  );
}
