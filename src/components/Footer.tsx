"use client";

import React from "react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPos = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPos, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border/80 bg-bg-alt/40 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left column: Logo & claim */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-bold text-2xl tracking-tight text-text hover:opacity-90 transition-opacity mb-2"
          >
            startn<span className="text-coral">ent</span>
          </button>
          <p className="font-sans font-medium text-text-muted text-xs md:text-sm">
            Automating lead-generation systems on n8n.
          </p>
        </div>

        {/* Center column: Section links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {["Services", "Process", "Work", "Stack"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-[13px] font-sans font-medium text-text-muted hover:text-coral transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right column: Copyright */}
        <div className="font-sans font-medium text-text-muted text-[13px] text-center md:text-right">
          © 2026 Startnent. Built to automate.
        </div>

      </div>
    </footer>
  );
}
