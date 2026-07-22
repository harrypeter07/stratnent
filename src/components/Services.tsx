"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Mail, ShieldAlert, GitFork } from "lucide-react";
import { servicesData } from "@/config/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Trigger reveal of all cards staggered
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const getIcon = (id: string, accent: string) => {
    const iconClass = "w-6 h-6 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]";
    
    switch (id) {
      case "lead-gen":
        return <Target className={`${iconClass} text-coral`} />;
      case "outbound-seq":
        return <Mail className={`${iconClass} text-mint`} />;
      case "crm-enrich":
        return <ShieldAlert className={`${iconClass} text-violet`} />;
      default:
        return <GitFork className={`${iconClass} text-coral`} />;
    }
  };

  const getAccentClass = (accent: string) => {
    switch (accent) {
      case "mint":
        return "border-mint/20 hover:border-mint/60 hover:shadow-[0_0_20px_rgba(110,231,201,0.04)]";
      case "violet":
        return "border-violet/20 hover:border-violet/60 hover:shadow-[0_0_20px_rgba(183,156,255,0.04)]";
      default:
        return "border-coral/20 hover:border-coral/60 hover:shadow-[0_0_20px_rgba(255,107,74,0.04)]";
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full glow-spot-violet opacity-30 blur-3xl -translate-y-1/2 -z-10" />

      {/* Header Info */}
      <div className="max-w-2xl mb-16">
        <span className="text-mint uppercase tracking-wider text-xs md:text-sm font-bold font-sans block mb-3">
          Our Services
        </span>
        <h2 className="font-display font-bold leading-tight tracking-tight text-[clamp(30px,3.6vw,44px)] text-text mb-6">
          Everything you need to automate your outbound machine.
        </h2>
        <p className="font-sans font-medium text-text-muted text-base md:text-[17px] leading-relaxed">
          We take the heavy lifting of lead research, scoring, sequencing, and syncing off your plate by writing custom pipelines that live in the cloud.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {servicesData.map((service, idx) => (
          <div
            key={service.id}
            ref={(el) => {
              if (el) cardsRef.current[idx] = el;
            }}
            className={`group bg-surface p-8 rounded-card border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between items-start opacity-0 ${getAccentClass(
              service.accent
            )}`}
          >
            {/* Icon circle chip */}
            <div className="bg-bg-alt w-12 h-12 rounded-xl flex items-center justify-center border border-border mb-6 group-hover:scale-105 transition-transform duration-300">
              {getIcon(service.id, service.accent)}
            </div>

            {/* Contents */}
            <div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-text mb-4">
                {service.title}
              </h3>
              <p className="font-sans font-medium text-text-muted text-sm md:text-[16px] leading-relaxed">
                {service.description}
              </p>
            </div>
            
            {/* Card visual connector line effect */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mt-8 group-hover:via-coral/30 transition-all duration-500" />
          </div>
        ))}
      </div>

    </section>
  );
}
