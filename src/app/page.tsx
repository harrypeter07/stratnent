import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NodeGraphStrip from "@/components/NodeGraphStrip";
import Services from "@/components/Services";
import ProcessHorizontal from "@/components/ProcessHorizontal";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import CTAPanel from "@/components/CTAPanel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 overflow-hidden">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Services Section with 3D Render Glass Cards */}
        <div className="relative">
          <Services />
          {/* Animated node strip at transition area */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-b border-border/40">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-text-muted/60 text-center block mb-6">
              Active Workflow Simulation (n8n Engine Map)
            </span>
            <NodeGraphStrip />
          </div>
        </div>

        {/* 3. Horizontal Side-Scroll Delivery Pipeline */}
        <ProcessHorizontal />

        {/* 4. Case Studies Showcase */}
        <Work />

        {/* 5. Integrations Stack Section */}
        <div className="border-t border-border/40 bg-bg-alt/25">
          <Stack />
        </div>

        {/* 6. Call To Action Panel */}
        <CTAPanel />
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
