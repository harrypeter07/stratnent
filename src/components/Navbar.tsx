"use client";

import React, { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-bold text-2xl tracking-tight text-text hover:opacity-90 transition-opacity"
        >
          startn<span className="text-coral">ent</span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["Services", "Process", "Work", "Stack"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-[15px] font-sans font-medium text-text-muted hover:text-coral transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div>
          <MagneticButton range={0.25}>
            <a
              href="https://calendly.com/startnent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-coral text-bg px-6 py-2.5 rounded-btn font-sans font-semibold text-[14px] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              Book a call
            </a>
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
}
