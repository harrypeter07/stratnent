// Startnent Website Configuration Details
// IMPORTANT: The case study metrics below are placeholders.
// Swap these with real client numbers before deploying to production.

export interface CaseStudy {
  id: string;
  title: string;
  clientDescription: string;
  metrics: {
    label: string;
    value: string;
    animateTo: number; // For stat counting animations
    suffix?: string;
  }[];
  tags: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  accent: "coral" | "mint" | "violet";
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  frameRange: [number, number]; // Frame mapping for scroll sequence
}

export const servicesData: ServiceItem[] = [
  {
    id: "lead-gen",
    title: "Lead Generation",
    description: "Automated prospecting that finds and qualifies leads while you sleep — no manual list-building.",
    accent: "coral",
  },
  {
    id: "outbound-seq",
    title: "Outbound & Sequencing",
    description: "Personalized outreach at scale, triggered by live signals instead of stale spreadsheets.",
    accent: "mint",
  },
  {
    id: "crm-enrich",
    title: "CRM Enrichment",
    description: "Every record cleaned, scored, and enriched automatically — your CRM finally stays current.",
    accent: "violet",
  },
  {
    id: "n8n-builds",
    title: "n8n Workflow Builds",
    description: "Custom automations connecting your CRM, inbox, sheets, and AI tools into one working system.",
    accent: "coral",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    stepNumber: "01",
    title: "Discover",
    description: "Audit your current manual lead pipelines and mapping out the automation blueprint.",
    frameRange: [0, 20],
  },
  {
    id: "design",
    stepNumber: "02",
    title: "Design",
    description: "Wireframing the database structures, AI-scoring models, and flow topologies.",
    frameRange: [21, 45],
  },
  {
    id: "build",
    stepNumber: "03",
    title: "Build",
    description: "Assembling the n8n workflows, setting up system integrations, and live sandbox dry-runs.",
    frameRange: [46, 70],
  },
  {
    id: "scale",
    stepNumber: "04",
    title: "Scale",
    description: "Launching production runs, fine-tuning data quality, and setting up system health checks.",
    frameRange: [71, 90],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "outbound-engine",
    title: "Outbound engine for a B2B SaaS team",
    clientDescription: "Automated lead discovery and intent-based sequence loader triggered by active hiring signals.",
    metrics: [
      { label: "Pipeline capacity", value: "3.5x", animateTo: 350, suffix: "%" },
      { label: "List qualification accuracy", value: "94%", animateTo: 94, suffix: "%" },
    ],
    tags: ["n8n", "Clay", "HubSpot", "Smartlead"],
  },
  {
    id: "auto-scoring",
    title: "Auto-scoring for an agency's inbound flow",
    clientDescription: "AI enrichment agent routing high-intent deals straight to AE booking links.",
    metrics: [
      { label: "Average response time", value: "2.4 hrs", animateTo: 24, suffix: " hrs" },
      { label: "Lead routing accuracy", value: "99%", animateTo: 99, suffix: "%" },
    ],
    tags: ["n8n", "OpenAI", "Airtable", "Slack"],
  },
];

export const techStack = [
  "n8n",
  "OpenAI",
  "HubSpot",
  "Airtable",
  "Slack",
  "Google Sheets",
  "Clay",
  "Zapier",
  "Notion",
];
