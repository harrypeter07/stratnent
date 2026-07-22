"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Mail, ShieldAlert, GitFork, Check, Gauge, Terminal, ArrowUpRight } from "lucide-react";
import Card3DTilt from "./Card3DTilt";
import { servicesData } from "@/config/projects";

gsap.registerPlugin(ScrollTrigger);

export default function BentoServicesUI() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const renderServiceWidget = (id: string) => {
    switch (id) {
      case "lead-gen":
        return (
          <div className="p-4 rounded-xl bg-bg-alt/90 border border-border/80 text-left space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-sans font-bold text-mint uppercase tracking-wider">
              <span>Filter Criteria Active</span>
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            </div>
            <div className="space-y-1.5 font-sans text-xs">
              <div className="p-2 rounded-lg bg-surface border border-border flex items-center justify-between">
                <span className="text-text font-medium">Job Title = VP or Director</span>
                <Check className="w-3.5 h-3.5 text-mint" />
              </div>
              <div className="p-2 rounded-lg bg-surface border border-border flex items-center justify-between">
                <span className="text-text font-medium">Company Size = 50 - 500</span>
                <Check className="w-3.5 h-3.5 text-mint" />
              </div>
            </div>
          </div>
        );

      case "outbound-seq":
        return (
          <div className="p-4 rounded-xl bg-bg-alt/90 border border-border/80 text-left font-sans text-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <span className="font-bold text-text">Subject: Congrats on the new role!</span>
              <span className="text-[10px] text-coral font-mono font-bold">#1 Sequence</span>
            </div>
            <p className="text-text-muted text-[11px] leading-relaxed">
              Hi <span className="bg-coral/20 text-coral px-1 rounded">Jenna</span>, congrats on your promotion to{" "}
              <span className="bg-mint/20 text-mint px-1 rounded">VP of Revenue Ops</span> at Northstar Health. I noticed your team is actively scaling outbound...
            </p>
          </div>
        );

      case "crm-enrich":
        return (
          <div className="p-4 rounded-xl bg-bg-alt/90 border border-border/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-violet/10 border border-violet/20 text-violet">
                <Gauge className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-lg text-text">+24.8%</div>
                <div className="text-[11px] text-text-muted font-sans font-semibold">Data Accuracy Score</div>
              </div>
            </div>
            <span className="text-[11px] font-sans font-bold text-violet bg-violet/10 px-2.5 py-1 rounded-full border border-violet/20">
              Scored
            </span>
          </div>
        );

      default:
        return (
          <div className="p-3.5 rounded-xl bg-bg-alt/90 border border-border/80 text-left font-mono text-[11px] space-y-1.5">
            <div className="flex items-center space-x-2 text-mint font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>n8n Workflow Execution</span>
            </div>
            <div className="text-text-muted text-[10px]">
              [12:04:11] Webhook → OpenAI Scoring → HubSpot Sync [200 OK]
            </div>
          </div>
        );
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full glow-spot-violet opacity-25 blur-3xl -translate-y-1/2 -z-10 pointer-events-none" />

      {/* Header Info */}
      <div className="max-w-2xl mb-16">
        <span className="text-mint uppercase tracking-wider text-xs md:text-sm font-bold font-sans block mb-3">
          Enterprise Services
        </span>
        <h2 className="font-display font-bold leading-tight tracking-tight text-[clamp(30px,3.6vw,44px)] text-text mb-6">
          Everything you need to automate your outbound machine.
        </h2>
        <p className="font-sans font-medium text-text-muted text-base md:text-[17px] leading-relaxed">
          We build robust, professional automated pipelines that qualify leads, enrich CRM contacts, and trigger outreach automatically.
        </p>
      </div>

      {/* Grid container with 3D Bento UI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {servicesData.map((service, idx) => (
          <div
            key={service.id}
            ref={(el) => {
              if (el) cardsRef.current[idx] = el;
            }}
            className="opacity-0"
          >
            <Card3DTilt maxTilt={8} className="h-full rounded-card">
              <div className="bg-surface rounded-card border border-border/80 p-8 flex flex-col justify-between h-full shadow-2xl group hover:border-coral/40 transition-colors duration-300">
                
                <div>
                  {/* Top card header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-coral bg-coral/10 border border-coral/20 px-3 py-1 rounded-full">
                      0{idx + 1} • {service.title}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-coral transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-text mb-3 group-hover:text-coral transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-sans font-medium text-text-muted text-sm md:text-[15px] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Professional UI Widget Preview Component */}
                <div className="mt-4">
                  {renderServiceWidget(service.id)}
                </div>

              </div>
            </Card3DTilt>
          </div>
        ))}
      </div>

    </section>
  );
}
