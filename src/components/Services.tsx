"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card3DTilt from "./Card3DTilt";
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
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
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
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const getCardImage = (id: string) => {
    switch (id) {
      case "lead-gen":
        return "/media/card-leadgen.png";
      case "outbound-seq":
        return "/media/card-outbound.png";
      case "crm-enrich":
        return "/media/card-crm.png";
      default:
        return "/media/card-n8n.png";
    }
  };

  const getBadgeColor = (accent: string) => {
    switch (accent) {
      case "mint":
        return "bg-mint/10 border-mint/30 text-mint";
      case "violet":
        return "bg-violet/10 border-violet/30 text-violet";
      default:
        return "bg-coral/10 border-coral/30 text-coral";
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-28 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full glow-spot-violet opacity-30 blur-3xl -translate-y-1/2 -z-10" />

      {/* Header Info */}
      <div className="max-w-2xl mb-16">
        <span className="text-mint uppercase tracking-wider text-xs md:text-sm font-bold font-sans block mb-3">
          Our 3D Core Services
        </span>
        <h2 className="font-display font-bold leading-tight tracking-tight text-[clamp(30px,3.6vw,44px)] text-text mb-6">
          Automated sales & revenue engines built on n8n.
        </h2>
        <p className="font-sans font-medium text-text-muted text-base md:text-[17px] leading-relaxed">
          We construct custom lead pipelines, real-time enrichment vaults, and intent signal sequence loaders to fill your pipeline 24/7.
        </p>
      </div>

      {/* Grid container with 3D Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {servicesData.map((service, idx) => (
          <div
            key={service.id}
            ref={(el) => {
              if (el) cardsRef.current[idx] = el;
            }}
            className="opacity-0"
          >
            <Card3DTilt maxTilt={10} className="h-full rounded-card">
              <div className="bg-surface rounded-card border border-border/80 p-8 flex flex-col justify-between h-full shadow-2xl group hover:border-coral/40 transition-colors duration-300">
                
                {/* 3D Render Image Container */}
                <div className="relative w-full h-[220px] rounded-2xl overflow-hidden mb-6 border border-border/60 bg-bg/50">
                  <Image
                    src={getCardImage(service.id)}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

                  {/* 3D Badge Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-btn font-sans font-bold text-xs uppercase tracking-wider border backdrop-blur-md ${getBadgeColor(
                        service.accent
                      )}`}
                    >
                      3D Module
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display font-bold text-2xl text-text mb-3 group-hover:text-coral transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-sans font-medium text-text-muted text-sm md:text-[15px] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom line separator */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mt-4 group-hover:via-coral/40 transition-all duration-500" />
              </div>
            </Card3DTilt>
          </div>
        ))}
      </div>

    </section>
  );
}
