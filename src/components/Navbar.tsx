"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
          ? "bg-bg/90 backdrop-blur-xl border-b border-border/80 py-4 shadow-xl"
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["Services", "Process", "Work", "Stack"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-[15px] font-sans font-semibold text-text-muted hover:text-coral transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <MagneticButton range={0.25}>
              <a
                href="https://calendly.com/startnent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-coral text-bg px-6 py-2.5 rounded-btn font-sans font-bold text-[14px] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-md shadow-coral/20"
              >
                Book a call
              </a>
            </MagneticButton>
          </div>

          {/* Hamburger button for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-surface border border-border text-text hover:text-coral transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-bg/95 backdrop-blur-2xl border-b border-border/80 p-6 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          {["Services", "Process", "Work", "Stack"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-left font-display font-bold text-lg text-text hover:text-coral transition-colors py-2 border-b border-border/40 flex items-center justify-between"
            >
              <span>{item}</span>
              <ArrowUpRight className="w-4 h-4 text-text-muted" />
            </button>
          ))}
          <a
            href="https://calendly.com/startnent"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-coral text-bg py-3.5 rounded-btn font-sans font-bold text-base shadow-lg shadow-coral/20 mt-2"
          >
            Book a call
          </a>
        </div>
      )}
    </nav>
  );
}
