"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/config/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const metricRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    // Reveal cards on scroll
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      }
    );

    // Animate stats for each case study
    caseStudies.forEach((study, studyIdx) => {
      study.metrics.forEach((metric, metricIdx) => {
        const refIndex = studyIdx * 2 + metricIdx;
        const element = metricRefs.current[refIndex];
        if (!element) return;

        const animObj = { val: 0 };
        gsap.to(animObj, {
          val: metric.animateTo,
          duration: 2.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[studyIdx],
            start: "top 80%",
          },
          onUpdate: () => {
            // Check if metric suffix is hrs or % and format
            if (metric.suffix === " hrs") {
              element.innerText = (animObj.val / 10).toFixed(1); // Translate e.g., 24 to 2.4
            } else {
              element.innerText = String(Math.floor(animObj.val));
            }
          },
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background soft lighting */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full glow-spot-coral opacity-15 blur-3xl z-0 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10">
        <div className="max-w-xl">
          <span className="text-mint uppercase tracking-wider text-xs md:text-sm font-bold font-sans block mb-3">
            Recent Builds
          </span>
          <h2 className="font-display font-bold leading-tight tracking-tight text-[clamp(30px,3.6vw,44px)] text-text mb-4 md:mb-0">
            Systems shipped & scaling in production.
          </h2>
        </div>
        <p className="font-sans font-medium text-text-muted text-base max-w-xs leading-relaxed">
          *Note: Metrics shown below represent benchmark targets. Real client data configurations are secured.
        </p>
      </div>

      {/* Case studies list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {caseStudies.map((study, studyIdx) => (
          <div
            key={study.id}
            ref={(el) => {
              if (el) cardRefs.current[studyIdx] = el;
            }}
            className="group bg-surface hover:bg-surface-2 p-8 md:p-10 rounded-card border border-border transition-all duration-300 flex flex-col justify-between h-full opacity-0"
          >
            {/* Upper row: title and redirect icon */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display font-bold text-xl md:text-2xl text-text group-hover:text-coral transition-colors duration-300 max-w-[85%]">
                  {study.title}
                </h3>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:text-text group-hover:border-coral transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              
              <p className="font-sans font-medium text-text-muted text-sm md:text-[15px] leading-relaxed mb-8">
                {study.clientDescription}
              </p>
            </div>

            {/* Metrics and labels */}
            <div>
              <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-border/60 mb-8">
                {study.metrics.map((metric, metricIdx) => {
                  const refIndex = studyIdx * 2 + metricIdx;
                  return (
                    <div key={metricIdx}>
                      <div className="font-display font-bold text-3xl md:text-4xl text-text mb-1">
                        <span
                          ref={(el) => {
                            if (el) metricRefs.current[refIndex] = el;
                          }}
                        >
                          0
                        </span>
                        {metric.suffix && metric.suffix !== " hrs" ? metric.suffix : ""}
                        {metric.suffix === " hrs" ? " hrs" : ""}
                      </div>
                      <div className="font-sans font-medium text-xs text-text-muted uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Technologies used tags */}
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans font-semibold text-[11px] uppercase tracking-wider text-mint bg-mint/5 border border-mint/10 px-3 py-1 rounded-btn"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
