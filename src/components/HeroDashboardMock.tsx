"use client";

import React, { useState } from "react";
import { Filter, Sparkles, Send, Database, ArrowUpRight, CheckSquare, Square } from "lucide-react";

export default function HeroDashboardMock() {
  const [activeTab, setActiveTab] = useState("outbound");
  const [selectedLeads, setSelectedLeads] = useState<number[]>([1, 2]);

  const tabs = [
    { id: "inbound", label: "Automated Inbound" },
    { id: "scoring", label: "Lead Scoring" },
    { id: "outbound", label: "Automated Outbound" },
    { id: "enrichment", label: "CRM Enrichment" },
  ];

  const leadDatasets: Record<string, { name: string; company: string; title: string; score: string; status: string; signal: string }[]> = {
    outbound: [
      { name: "Jenna Johnson", company: "Northstar Health", title: "VP of Revenue Ops", score: "98/100", status: "Sequence Loaded", signal: "Hiring Signal" },
      { name: "Marcus Vance", company: "Apex Technologies", title: "Director of Demand Gen", score: "94/100", status: "Enriched", signal: "Funding Signal" },
      { name: "Sarah Chen", company: "Luminous Labs", title: "Head of Growth", score: "91/100", status: "Synced to CRM", signal: "Tech Stack Match" },
    ],
    inbound: [
      { name: "Alexander Wright", company: "Vanta Systems", title: "Chief Marketing Officer", score: "99/100", status: "Instant Routing", signal: "High Intent Form" },
      { name: "Elena Rostova", company: "Fintech Core", title: "Head of GTM", score: "96/100", status: "AE Assigned", signal: "Pricing Visit" },
      { name: "David Kim", company: "SaaS Rocket", title: "VP Sales", score: "92/100", status: "Calendar Booked", signal: "Demo Request" },
    ],
    scoring: [
      { name: "Rachel Adams", company: "CloudScale Inc", title: "Sales Ops Manager", score: "95/100", status: "AI Verified", signal: "ICP Score > 90" },
      { name: "Michael Croft", company: "DataPulse", title: "Director RevOps", score: "93/100", status: "AI Scored", signal: "SOC2 Signal" },
      { name: "Sophia Martinez", company: "Nexus AI", title: "Head of Operations", score: "89/100", status: "Enriching", signal: "Series B Signal" },
    ],
    enrichment: [
      { name: "Brandon Taylor", company: "Starlight Security", title: "VP Infrastructure", score: "97/100", status: "Updated in HubSpot", signal: "Email Verified" },
      { name: "Chloe Bennett", company: "ScaleForce", title: "Growth Director", score: "94/100", status: "Phone Enriched", signal: "LinkedIn Signal" },
      { name: "Jonathan Reed", company: "Pulse Analytics", title: "Chief Revenue Officer", score: "90/100", status: "Synced to Slack", signal: "Org Chart Mapped" },
    ],
  };

  const currentLeads = leadDatasets[activeTab] || leadDatasets.outbound;

  const toggleLead = (idx: number) => {
    if (selectedLeads.includes(idx)) {
      setSelectedLeads(selectedLeads.filter((id) => id !== idx));
    } else {
      setSelectedLeads([...selectedLeads, idx]);
    }
  };

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
            className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-coral/15 text-coral border border-coral/30 shadow-sm"
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <div>
            <div className="text-sm font-display font-bold text-text flex items-center space-x-2">
              <span>Warm leads at Tier 1 Accounts</span>
              <span className="text-xs font-sans font-normal text-text-muted">(672,423 matched)</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-sans font-semibold text-text flex items-center space-x-1.5 hover:border-coral/50">
              <Filter className="w-3.5 h-3.5 text-coral" />
              <span>Filters ({selectedLeads.length} active)</span>
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-coral text-bg text-xs font-sans font-bold flex items-center space-x-1.5 hover:opacity-90 transition-opacity">
              <Send className="w-3.5 h-3.5" />
              <span>Run Sequence</span>
            </button>
          </div>
        </div>

        {/* Lead Table Rows */}
        <div className="space-y-2.5">
          {currentLeads.map((lead, idx) => {
            const isSelected = selectedLeads.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => toggleLead(idx)}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-surface-2 border-mint/40 shadow-sm"
                    : "bg-bg-alt/60 border-border/60 hover:border-border"
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <button className="text-mint">
                    {isSelected ? <CheckSquare className="w-4 h-4 text-mint" /> : <Square className="w-4 h-4 text-text-muted" />}
                  </button>
                  <div className="w-8 h-8 rounded-lg bg-coral/10 border border-coral/20 flex items-center justify-center font-display font-bold text-xs text-coral">
                    {lead.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-sans font-bold text-text">
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
                  <span className="text-[11px] font-sans font-medium text-text-muted bg-surface px-2.5 py-1 rounded-md border border-border">
                    {lead.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overlaid Intent Filter Popup Card */}
        <div className="mt-4 p-4 rounded-xl bg-surface-2 border border-border/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-mint/10 border border-mint/20 text-mint">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-sans font-bold text-text">
                Live n8n Signal Trigger Rules Active
              </div>
              <div className="text-[11px] text-text-muted font-sans">
                Mode: <span className="text-mint font-semibold uppercase">{activeTab}</span> • <span className="text-coral font-semibold">Real-time Sync Enabled</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs font-sans font-bold text-coral hover:underline cursor-pointer">
            <span>Configure Engine</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

    </div>
  );
}
