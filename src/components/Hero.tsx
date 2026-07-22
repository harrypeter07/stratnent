"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import HeroDashboardMock from "./HeroDashboardMock";

// Dynamically import Hero3DScene to avoid SSR canvas mismatches
const Hero3DScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-xs font-sans text-mint font-bold uppercase tracking-wider">
      Loading 3D Engine...
    </div>
  ),
});

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const counterValRef1 = useRef<HTMLSpanElement>(null);
  const counterValRef2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch && glow) {
      glow.style.display = "none";
    } else if (glow) {
      const xTo = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left - 150;
        const y = e.clientY - rect.top - 150;
        xTo(x);
        yTo(y);
      };

      hero.addEventListener("mousemove", handleMouseMove);
      return () => {
        hero.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      eyebrowRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        statsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

    const countObj = { num1: 0, num2: 0 };
    
    tl.to(countObj, {
      num1: 10,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if (counterValRef1.current) {
          counterValRef1.current.innerText = String(Math.floor(countObj.num1));
        }
      }
    }, "-=0.8");

    tl.to(countObj, {
      num2: 24,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if (counterValRef2.current) {
          counterValRef2.current.innerText = String(Math.floor(countObj.num2));
        }
      }
    }, "-=1.2");

    return () => {
      tl.kill();
    };
  }, []);

  const handleScrollToProcess = (e: React.MouseEvent) => {
    e.preventDefault();
    const processSection = document.getElementById("process");
    if (processSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = processSection.getBoundingClientRect().top;
      const offsetPos = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[95vh] pt-32 pb-20 flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12"
    >
      {/* Background Glow blob */}
      <div
        ref={glowRef}
        className="hero-glow-container absolute w-[350px] h-[350px] rounded-full glow-spot-coral pointer-events-none z-0 opacity-80 blur-3xl transition-opacity duration-300"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-center relative z-10">
        
        {/* Left Copy Container */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Eyebrow */}
          <span
            ref={eyebrowRef}
            className="inline-flex items-center text-mint uppercase tracking-[0.15em] font-sans font-bold text-xs md:text-sm mb-5 opacity-0"
          >
            <span className="w-4 h-[1px] bg-mint mr-2" />
            Automation Studio
          </span>

          {/* Heading */}
          <h1
            ref={titleRef}
            className="font-display font-bold leading-[1.05] tracking-tight text-[clamp(42px,5.6vw,68px)] text-text mb-6 opacity-0"
          >
            We build the <span className="text-coral">engine</span> behind your growth.
          </h1>

          {/* Paragraph */}
          <p
            ref={subheadRef}
            className="font-sans font-medium text-text-muted text-base md:text-[18px] leading-relaxed max-w-xl mb-8 opacity-0"
          >
            Startnent designs automated sales and lead-gen systems on n8n — so your
            pipeline fills itself while your team focuses on closing.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-4 mb-12 opacity-0"
          >
            <MagneticButton range={0.25}>
              <a
                href="https://calendly.com/startnent"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-coral text-bg px-8 py-3.5 rounded-btn font-sans font-bold text-[15px] hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300 shadow-xl shadow-coral/30"
              >
                Book a call
              </a>
            </MagneticButton>

            <MagneticButton range={0.15}>
              <button
                onClick={handleScrollToProcess}
                className="px-6 py-3.5 rounded-btn font-sans font-semibold text-[15px] text-text border border-border hover:bg-surface-2 transition-colors duration-300"
              >
                See how it works
              </button>
            </MagneticButton>
          </div>

          {/* Stat Row */}
          <div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-border/80 w-full max-w-xl opacity-0"
          >
            <div>
              <div className="font-display font-bold text-3xl md:text-4xl text-text mb-1">
                <span ref={counterValRef1}>0</span>+
              </div>
              <div className="font-sans font-medium text-xs md:text-[13px] text-text-muted uppercase tracking-wider">
                Workflows shipped
              </div>
            </div>
            <div>
              <div className="font-display font-semibold text-xl md:text-2xl text-mint mb-1 flex items-center h-10">
                n8n core
              </div>
              <div className="font-sans font-medium text-xs md:text-[13px] text-text-muted uppercase tracking-wider">
                Automation engine
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-3xl md:text-4xl text-text mb-1">
                <span ref={counterValRef2}>0</span>/7
              </div>
              <div className="font-sans font-medium text-xs md:text-[13px] text-text-muted uppercase tracking-wider">
                Active pipelines
              </div>
            </div>
          </div>

        </div>

        {/* Right Live 3D Model WebGL Scene + SaaS Dashboard */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          {/* Live Interactive 3D Model WebGL Canvas */}
          <div className="relative w-full h-[280px] md:h-[340px] rounded-2xl overflow-hidden border border-border/80 bg-surface shadow-2xl backdrop-blur-xl">
            <Hero3DScene />
          </div>

          {/* Interactive SaaS Dashboard Mockup */}
          <HeroDashboardMock />
        </div>

      </div>
    </section>
  );
}
