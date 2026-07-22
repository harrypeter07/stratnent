"use client";

import React, { useState } from "react";
import { Filter, CheckCircle2, Sparkles, Send, Database, ArrowUpRight } from "lucide-react";

export default function HeroDashboardMock() {
  const [activeTab, setActiveTab] = useState("outbound");

  const tabs = [
    { id: "inbound", label: "Automated Inbound" },
    { id: "scoring", label: "Lead Scoring" },
    { id: "outbound", label: "Automated Outbound" },
    { id: "enrichment", label: "CRM Enrichment" },
  ];

  const leads = [
    { id: 1, name: "Jenna Johnson", company: "Northstar Health", title: "VP of Revenue Ops", score: "98/100", status: "Sequence Loaded", signal: "Hiring Signal" },
    { id: 2, name: "Marcus Vance", company: "Apex Technologies", title: "Director of Demand Gen", score: "94/100", status: "Enriched", signal: "Funding Signal" },
    { id: 3, name: "Sarah Chen", company: "Luminous Labs", title: "Head of Growth", score: "91/100", status: "Synced to CRM", signal: "Tech Stack Match" },
  ];

  return (
    <div className="w-full bg-surface/95 border border-border/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-coral/40">
      
      {/* Top Window Bar */}
      <div className="bg-bg-alt/90 px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="text-xs text-text-muted font-mono ml-2">app.startnent.io/audiences</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center text-[11px] font-sans font-semibold text-mint bg-mint/10 px-2.5 py-0.5 rounded-full border border-mint/20">
            <span className="w-1.5 h-1.5 rounded-full bg-mint mr-1.5 animate-pulse" />
            n8n Active Engine
          </span>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="px-6 pt-4 pb-2 border-b border-border/60 flex items-center space-x-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-coral/15 text-coral border border-coral/30"
                : "text-text-muted hover:text-text hover:bg-surface-2"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Table Content Area */}
      <div className="p-6 relative min-h-[300px]">
        {/* Table Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-display font-bold text-text flex items-center space-x-2">
              <span>Warm leads at Tier 1 Accounts</span>
              <span className="text-xs font-sans font-normal text-text-muted">(672,423 matched)</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-sans font-semibold text-text flex items-center space-x-1.5 hover:border-coral/50">
              <Filter className="w-3.5 h-3.5 text-coral" />
              <span>Filters</span>
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-coral text-bg text-xs font-sans font-bold flex items-center space-x-1.5 hover:opacity-90">
              <Send className="w-3.5 h-3.5" />
              <span>Run Sequence</span>
            </button>
          </div>
        </div>

        {/* Lead Table Rows */}
        <div className="space-y-2.5">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="p-3.5 rounded-xl bg-bg-alt/60 border border-border/60 flex items-center justify-between hover:border-mint/40 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg bg-coral/10 border border-coral/20 flex items-center justify-center font-display font-bold text-xs text-coral">
                  {lead.name[0]}
                </div>
                <div>
                  <div className="text-xs font-sans font-bold text-text group-hover:text-mint transition-colors">
                    {lead.name}
                  </div>
                  <div className="text-[11px] text-text-muted font-sans">
                    {lead.title} • <span className="text-text/80">{lead.company}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-[11px] font-sans font-semibold text-mint bg-mint/10 px-2.5 py-1 rounded-md border border-mint/20 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1 text-mint" />
                  {lead.signal}
                </span>
                <span className="text-[11px] font-mono font-bold text-coral bg-coral/10 px-2 py-1 rounded-md border border-coral/20">
                  {lead.score}
                </span>
                <span className="text-[11px] font-sans font-medium text-text-muted bg-surface-2 px-2.5 py-1 rounded-md border border-border">
                  {lead.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Overlaid Intent Filter Popup Card (matching reference screenshot 3) */}
        <div className="mt-4 p-4 rounded-xl bg-surface-2 border border-border/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-mint/10 border border-mint/20 text-mint">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-sans font-bold text-text">
                Live Intent Trigger Rules Active
              </div>
              <div className="text-[11px] text-text-muted font-sans">
                Where <span className="text-mint font-semibold">Title contains VP/Director</span> and <span className="text-coral font-semibold">Hiring Signal = True</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs font-sans font-bold text-coral hover:underline cursor-pointer">
            <span>Edit Logic</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

    </div>
  );
}
