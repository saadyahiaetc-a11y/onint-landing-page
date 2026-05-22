"use client";

import React, { useState } from "react";
import { 
  Shield, 
  ArrowRight, 
  Activity, 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  Lock, 
  Building, 
  ClipboardList,
  Database,
  FileCheck
} from "lucide-react";
import DemoModal from "@/components/DemoModal";

// Interface for interactive ONINT Denial OS Mockup
interface ClaimEntry {
  id: string;
  payer: string;
  claimNo: string;
  category: string;
  carc: string;
  amount: number;
  expectedValue: number;
  deadline: string;
  isDeadlineCritical: boolean;
  operator: string;
  status: "Unresolved" | "Reviewing" | "Resolved";
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  priorityScore: number;
  appealTemplate: string;
  blockerDetails: string;
}

// Custom component to render the exact ONINT logo from the uploaded asset
function OnintLogo({ className = "", textClassName = "text-white" }: { className?: string; textClassName?: string }) {
  return (
    <svg
      viewBox="0 0 940 530"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-7 w-auto shrink-0 select-none ${className}`}
    >
      {/* Purple Logo Mark */}
      <path
        d="M 146 2 H 296 V 123 H 146 A 155 115 0 0 1 146 353 H 296 V 527 H 146 V 358 H 1 V 208 A 145 85 0 0 1 146 123 Z M 146 208 V 348 A 80 70 0 0 0 146 208 Z"
        fill="#5D1FE2"
        fillRule="evenodd"
      />

      {/* Navy/White Text "onint" */}
      <g fill="currentColor" className={textClassName}>
        {/* o */}
        <path d="M 419 222 A 64 67 0 1 0 419 356 A 64 67 0 1 0 419 222 Z M 419 252 A 34 37 0 1 1 419 326 A 34 37 0 1 1 419 252 Z" />
        
        {/* n (first) */}
        <path d="M 508 353 V 223 H 537 V 248 C 547 230 567 222 589 222 C 613 222 624 236 624 262 V 353 H 595 V 264 C 595 250 589 244 577 244 C 557 244 537 258 537 282 V 353 H 508 Z" />
        
        {/* i (stem & dot) */}
        <path d="M 655 227 H 684 V 353 H 655 Z M 655 180 H 684 V 207 H 655 Z" />
        
        {/* n (second) */}
        <path d="M 717 353 V 223 H 746 V 248 C 756 230 776 222 798 222 C 822 222 833 236 833 262 V 353 H 804 V 264 C 804 250 798 244 786 244 C 766 244 746 258 746 282 V 353 H 717 Z" />
        
        {/* t */}
        <path d="M 850 223 H 873 V 190 H 901 V 223 H 939 V 248 H 901 V 312 C 901 332 911 342 929 342 C 935 342 939 340 939 340 V 353 C 939 353 931 355 923 355 C 903 355 889 345 883 330 C 876 320 873 307 873 292 V 248 H 850 Z" />
      </g>
    </svg>
  );
}

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [modalInitialEmail, setModalInitialEmail] = useState("");
  const [selectedClaimId, setSelectedClaimId] = useState<string>("claim-1");
  const [activePreviewTab, setActivePreviewTab] = useState<"queue" | "scoring" | "ledger" | "rules">("queue");
  
  // States for final CTA low friction input
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaCompany, setCtaCompany] = useState("");

  const openDemoModal = (email: string = "") => {
    setModalInitialEmail(email);
    setIsDemoModalOpen(true);
  };

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openDemoModal(ctaEmail);
  };

  // Exact structured data for the ONINT reimbursement queue mockup
  const claimsList: ClaimEntry[] = [
    {
      id: "claim-1",
      payer: "UnitedHealthcare",
      claimNo: "08273510",
      category: "Prior Authorization Missing",
      carc: "CARC 197",
      amount: 2450.00,
      expectedValue: 1960.00,
      deadline: "2026-06-15",
      isDeadlineCritical: true,
      operator: "Op Alpha",
      status: "Reviewing",
      priority: "CRITICAL",
      priorityScore: 94,
      blockerDetails: "CPT-20610 authorized under pre-auth token #TX-9029. Carrier denied due to missing reference. Validate Block 24D modifier -59 override.",
      appealTemplate: "Procedure CPT-20610 was authorized under pre-auth token #TX-9029. Denial under CARC 197 represents payor administrative indexing error; secondary claim lines are separate and distinct. Patient charts attached verifying pre-authorization."
    },
    {
      id: "claim-2",
      payer: "Aetna",
      claimNo: "55321001",
      category: "Medical Necessity",
      carc: "CARC 50",
      amount: 1540.00,
      expectedValue: 1001.00,
      deadline: "2026-06-24",
      isDeadlineCritical: true,
      operator: "Unassigned",
      status: "Unresolved",
      priority: "HIGH",
      priorityScore: 88,
      blockerDetails: "Clinical chart notes require verification of physician signature on date of service prior to submission packet export.",
      appealTemplate: "The patient's clinical diagnosis (ICD-10 M17.11) satisfies local coverage determination (LCD) policy parameters. Treatment notes show conservative therapy failed. Request immediate administrative review."
    },
    {
      id: "claim-3",
      payer: "Blue Cross Blue Shield",
      claimNo: "77394020",
      category: "CPT Bundling Gate",
      carc: "CARC 97",
      amount: 320.00,
      expectedValue: 176.00,
      deadline: "2026-07-12",
      isDeadlineCritical: false,
      operator: "Op Beta",
      status: "Reviewing",
      priority: "MEDIUM",
      priorityScore: 53,
      blockerDetails: "Pending verification of primary insurance EOB details in administrative clearinghouse portal.",
      appealTemplate: "Procedure bundle rule excluded. Services are separate and distinct, executed during different clinical hours on date of service. Standard payment guidelines apply."
    },
    {
      id: "claim-4",
      payer: "Cigna",
      claimNo: "88291029",
      category: "Administrative Limit",
      carc: "CARC 18",
      amount: 1250.00,
      expectedValue: 850.00,
      deadline: "2026-08-27",
      isDeadlineCritical: false,
      operator: "Op Alpha",
      status: "Unresolved",
      priority: "HIGH",
      priorityScore: 81,
      blockerDetails: "Clearinghouse validation failed. Document attachment loop 2300 requires validated PDF file structure for expedited review.",
      appealTemplate: "Initial claim submission date met electronic data interchange protocols. Payer claim handling guidelines dictate 30-day resolution timeline. Secondary review packets enclosed."
    }
  ];

  const selectedClaim = claimsList.find(c => c.id === selectedClaimId) || claimsList[0];

  return (
    <div className="min-h-screen bg-[#050810] font-sans text-slate-300 selection:bg-[#5d1fe2]/30 selection:text-white bg-grid-pattern relative overflow-hidden">
      
      {/* Background Lighting Gradients - Calm, institutional, soft indigo and subtle cyan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-gradient-top pointer-events-none z-0" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-radial-gradient pointer-events-none z-0 opacity-40" />
      <div className="absolute bottom-[200px] left-0 w-[500px] h-[500px] bg-radial-cyan pointer-events-none z-0 opacity-30" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#050810]/85 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <OnintLogo className="h-6 w-auto" />
            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-6 text-xs text-slate-500 font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              REIMBURSEMENT INFRASTRUCTURE • SOC 2 TYPE II • HIPAA COMPLIANT
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => openDemoModal()}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer font-mono"
            >
              Submit a Sample Denial
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1 — HERO (Stage 1: Recognition) */}
      <section className="relative z-10 pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider font-mono text-[#5d1fe2] bg-[#5d1fe2]/10 border border-[#5d1fe2]/20 rounded-full mb-6 uppercase">
            Reimbursement Intelligence System
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Your denial backlog is trapped cash flow.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            ONINT helps billing teams identify, prioritize, and resolve high-value insurance denials before revenue expires.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => openDemoModal()}
              className="btn-primary px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center font-mono"
            >
              Submit a Sample Denial
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Visual: Mission Control for Reimbursement Operations */}
        <div className="glass-card rounded-xl border border-white/5 overflow-hidden shadow-2xl relative z-10 max-w-6xl mx-auto">
          {/* Mockup Toolbar */}
          <div className="bg-[#0a0d18] border-b border-white/5 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              </div>
              <span className="font-mono text-slate-500">SYSTEM: //onint.denial-os.internal</span>
            </div>
            
            {/* Live Telemetry metrics */}
            <div className="flex items-center gap-6 font-mono text-slate-400 text-[11px]">
              <div>
                <span className="text-slate-500 mr-1.5">LEDGER VALUE:</span>
                <span className="text-white font-semibold">$1,489,200</span>
              </div>
              <div>
                <span className="text-slate-500 mr-1.5">UNRESOLVED BACKLOG:</span>
                <span className="text-white font-semibold">142 claims</span>
              </div>
              <div>
                <span className="text-slate-500 mr-1.5">AVERAGE AGING:</span>
                <span className="text-amber-500 font-semibold">42 days</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Queue Panel */}
            <div className="lg:col-span-7 border-r border-white/5 bg-[#070912]/50 flex flex-col">
              <div className="p-4 border-b border-white/5 bg-[#0a0d18]/40 flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  Reimbursement Prioritization Queue
                </h4>
                <span className="text-[10px] bg-[#5d1fe2]/15 text-[#c084fc] px-2 py-0.5 rounded border border-[#5d1fe2]/20 font-mono">
                  ACTIVE FILTRATION
                </span>
              </div>

              {/* Claims List Table */}
              <div className="divide-y divide-white/5 overflow-y-auto flex-1">
                {claimsList.map((claim) => {
                  const isSelected = claim.id === selectedClaimId;
                  return (
                    <div
                      key={claim.id}
                      onClick={() => setSelectedClaimId(claim.id)}
                      className={`p-4 transition-colors cursor-pointer text-left ${
                        isSelected 
                          ? "bg-[#101424] border-l-2 border-[#5d1fe2]" 
                          : "hover:bg-[#0a0d18]/60 border-l-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-xs font-semibold text-white mr-2">{claim.payer}</span>
                          <span className="text-[10px] font-mono text-slate-500">#{claim.claimNo}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          claim.priority === "CRITICAL"
                            ? "bg-red-950/40 text-red-400 border border-red-900/30"
                            : claim.priority === "HIGH"
                            ? "bg-amber-950/40 text-amber-400 border border-amber-900/30"
                            : claim.priority === "MEDIUM"
                            ? "bg-blue-950/40 text-blue-400 border border-blue-900/30"
                            : "bg-slate-900 text-slate-500 border border-slate-800"
                        }`}>
                          {claim.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-slate-400 truncate max-w-[200px]">
                          {claim.carc} • <span className="text-slate-500">{claim.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-500 font-mono mr-1">EXPECTED VALUE:</span>
                          <span className="font-semibold text-white font-mono">${claim.expectedValue.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Micro Priority Score Bar */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              claim.priorityScore > 90 
                                ? "bg-red-500" 
                                : claim.priorityScore > 75 
                                ? "bg-amber-500" 
                                : "bg-blue-500"
                            }`} 
                            style={{ width: `${claim.priorityScore}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-slate-400 shrink-0">
                          SCORE: {claim.priorityScore}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Claim Detail Panel */}
            <div className="lg:col-span-5 bg-[#0a0d18]/20 flex flex-col">
              <div className="p-4 border-b border-white/5 bg-[#0a0d18]/40 flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  Claim Intelligence Detail
                </h4>
                <span className="text-[10px] font-mono text-slate-500">
                  {selectedClaim.operator}
                </span>
              </div>

              <div className="p-5 flex-1 space-y-5 text-left overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-[#0a0d18]/50 border border-white/5">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Expected Recovery Value</span>
                    <span className="text-lg font-mono font-semibold text-white">${selectedClaim.expectedValue.toLocaleString()}</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">Total Claim: ${selectedClaim.amount.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded bg-[#0a0d18]/50 border border-white/5">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Appeal Filing Limit</span>
                    <span className="text-lg font-mono font-semibold text-amber-500 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 shrink-0" />
                      {selectedClaim.isDeadlineCritical ? "Critical Action" : "Within Limit"}
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">{selectedClaim.deadline}</span>
                  </div>
                </div>

                {/* Denial Rules & CARC classification */}
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Denial Classification & Rule</span>
                  <div className="p-3.5 rounded bg-[#050810] border border-white/5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-semibold text-[#5d1fe2] bg-[#5d1fe2]/15 px-2 py-0.5 rounded border border-[#5d1fe2]/25">
                        {selectedClaim.carc}
                      </span>
                      <span className="text-xs font-medium text-white">{selectedClaim.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono">
                      {selectedClaim.blockerDetails}
                    </p>
                  </div>
                </div>

                {/* Draft appeal argument */}
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Structured Appeal Argument Draft</span>
                  <div className="p-4 rounded bg-[#050810] border border-slate-900 font-mono text-[11px] text-slate-300 leading-relaxed max-h-[140px] overflow-y-auto relative">
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0a0d18] border border-white/5 text-[9px] text-slate-500">
                      <Lock className="w-2.5 h-2.5" /> SECURE DRAFT
                    </div>
                    {selectedClaim.appealTemplate}
                  </div>
                </div>

                {/* Audit verification footer */}
                <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    Audit Log Signed: SHA-256
                  </span>
                  <span className="text-slate-400">READY FOR GATEWAY ENTRY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — OPERATIONAL REALITY (Stage 2: Financial Pain & Stage 3: Operational Overload) */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-[#070912]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#5d1fe2] uppercase block mb-3">
              Operational Reality
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-4">
              Where revenue leaks from the billing cycle
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Independent billing firms lose substantial margins due to unresolved claims, expiring appeals, and manual review overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-20">
            {/* Card 1 */}
            <div className="glass-card p-6 rounded-lg border border-white/5 text-left flex flex-col justify-between min-h-[220px] md:col-span-2">
              <div>
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Unresolved Denials</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Tens of thousands of dollars accumulate in the reimbursement backlog. Without automatic identification, hundreds of unresolved claims are written off or ignored as administrative noise.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-4 uppercase">Trapped Revenue Leakage</div>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-6 rounded-lg border border-white/5 text-left flex flex-col justify-between min-h-[220px] md:col-span-3">
              <div>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Expiring Appeal Deadlines</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Payers enforce strict, non-negotiable appeal deadlines. High-value claims sit in system queues, aging past filing limits, turning recoverable cash into permanent, non-collectible write-offs.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-4 uppercase">Appeal Filing Expirations</div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-6 rounded-lg border border-white/5 text-left flex flex-col justify-between min-h-[220px] md:col-span-3">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#5d1fe2]/10 border border-[#5d1fe2]/20 flex items-center justify-center mb-4 text-[#c084fc]">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Fragmented Workflows</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Billing staff lose hours switching between clearinghouse portals, specific payer platforms, and local clinical records. Re-keying identical administrative fields stalls operational efficiency.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-4 uppercase">Operational Overhead</div>
            </div>

            {/* Card 4 */}
            <div className="glass-card p-6 rounded-lg border border-white/5 text-left flex flex-col justify-between min-h-[220px] md:col-span-2">
              <div>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Manual Prioritization</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Claims are processed in order of date received, rather than recovery likelihood or cash value. High-yield billing disputes are neglected while staff waste hours on unrecoverable, low-yield appeals.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-4 uppercase">Recovery Prioritization</div>
            </div>

            {/* Card 5 */}
            <div className="glass-card p-6 rounded-lg border border-white/5 text-left flex flex-col justify-between min-h-[220px] md:col-span-5">
              <div>
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 text-violet-400">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Payer-Specific Documentation Burdens</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Each payer maintains separate, highly complex filing parameters and attachment restrictions. Navigating these variable standards requires billing teams to customize documentation packages manually for every single appeal.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-4 uppercase">Administrative Barriers</div>
            </div>
          </div>

          {/* Strong emotional operational line */}
          <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-xl bg-[#0a0d18]/50 border border-[#5d1fe2]/10 flex flex-col md:flex-row items-center gap-6 text-left">
            <div className="w-12 h-12 rounded-full bg-[#5d1fe2]/15 border border-[#5d1fe2]/30 flex items-center justify-center text-[#c084fc] shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white text-base font-medium leading-relaxed">
                “High-value claims sit unresolved while staff spend hours reviewing low-yield work.”
              </p>
              <span className="block text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-1">
                Typical operational bottleneck in manual recovery workflows
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — VISUAL TRUST / COMMAND CENTER (Stage 4: Relief) */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#5d1fe2] uppercase block mb-3">
              Operational Command Center
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-4">
              Designed for complex reimbursement operations
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Calm under pressure. ONINT structures operational chaos into a clean, financially intelligent interface built for auditing and recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls Column */}
            <div className="lg:col-span-4 space-y-3">
              <button
                onClick={() => setActivePreviewTab("queue")}
                className={`w-full p-4 rounded-lg text-left transition-all border ${
                  activePreviewTab === "queue"
                    ? "bg-[#101424] border-[#5d1fe2]/30 shadow-md text-white"
                    : "bg-transparent border-white/5 hover:border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ClipboardList className="w-4 h-4 shrink-0 text-[#c084fc]" />
                  <span className="text-sm font-semibold tracking-tight">Reimbursement Queue & Blocked Claims</span>
                </div>
                <p className="text-xs text-slate-500 pl-6 leading-relaxed">
                  View outstanding claims currently held back by payer denial gates, complete with estimated cash yields.
                </p>
              </button>

              <button
                onClick={() => setActivePreviewTab("scoring")}
                className={`w-full p-4 rounded-lg text-left transition-all border ${
                  activePreviewTab === "scoring"
                    ? "bg-[#101424] border-[#5d1fe2]/30 shadow-md text-white"
                    : "bg-transparent border-white/5 hover:border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span className="text-sm font-semibold tracking-tight">Algorithmic Recoverability Scores</span>
                </div>
                <p className="text-xs text-slate-500 pl-6 leading-relaxed">
                  Evaluate real recovery index scores calculated from historic payer yields, document validity, and filing deadlines.
                </p>
              </button>

              <button
                onClick={() => setActivePreviewTab("ledger")}
                className={`w-full p-4 rounded-lg text-left transition-all border ${
                  activePreviewTab === "ledger"
                    ? "bg-[#101424] border-[#5d1fe2]/30 shadow-md text-white"
                    : "bg-transparent border-white/5 hover:border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="text-sm font-semibold tracking-tight">Reimbursement Aging Ledger</span>
                </div>
                <p className="text-xs text-slate-500 pl-6 leading-relaxed">
                  Monitor the precise cash distribution of trapped revenue across standard aging buckets (0-90+ days).
                </p>
              </button>

              <button
                onClick={() => setActivePreviewTab("rules")}
                className={`w-full p-4 rounded-lg text-left transition-all border ${
                  activePreviewTab === "rules"
                    ? "bg-[#101424] border-[#5d1fe2]/30 shadow-md text-white"
                    : "bg-transparent border-white/5 hover:border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Database className="w-4 h-4 shrink-0 text-indigo-400" />
                  <span className="text-sm font-semibold tracking-tight">Payer Denial Classifications</span>
                </div>
                <p className="text-xs text-slate-500 pl-6 leading-relaxed">
                  Access structured carrier guidelines and validation parameters mapped to specific CARC codes.
                </p>
              </button>
            </div>

            {/* Right Screen Column (Dashboard Preview) */}
            <div className="lg:col-span-8 glass-card border border-white/5 rounded-xl overflow-hidden min-h-[420px] flex flex-col">
              <div className="bg-[#0a0d18] border-b border-white/5 px-4 py-2.5 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#5d1fe2] shrink-0" />
                  {activePreviewTab === "queue" && "ONINT://active-reimbursement-queue"}
                  {activePreviewTab === "scoring" && "ONINT://recoverability-scorecard"}
                  {activePreviewTab === "ledger" && "ONINT://aging-ledger-analysis"}
                  {activePreviewTab === "rules" && "ONINT://payer-classification-gates"}
                </span>
                <span>STATUS: STABLE_SYNC</span>
              </div>

              <div className="p-6 flex-1 text-left flex flex-col justify-between">
                
                {/* TAB 1: REIMBURSEMENT QUEUE */}
                {activePreviewTab === "queue" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">Blocked Claims Registry</h4>
                      <span className="font-mono text-xs text-[#c084fc] bg-[#5d1fe2]/10 border border-[#5d1fe2]/20 px-2 py-0.5 rounded">
                        4 Outstanding Items
                      </span>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono text-left">
                        <thead>
                          <tr className="border-b border-white/5 text-slate-500 pb-2">
                            <th className="pb-2 font-normal">PAYER / CLAIM</th>
                            <th className="pb-2 font-normal">DENIAL CODE</th>
                            <th className="pb-2 font-normal text-right">EXPECTED VALUE</th>
                            <th className="pb-2 font-normal text-right">AGING STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                          <tr>
                            <td className="py-2.5">
                              <div className="text-white font-medium">UnitedHealthcare</div>
                              <div className="text-[10px] text-slate-500">#08273510</div>
                            </td>
                            <td className="py-2.5">
                              <span className="text-red-400 bg-red-950/20 border border-red-900/30 px-1.5 py-0.5 rounded text-[10px]">CARC 197</span>
                              <span className="text-slate-500 ml-1.5">Pre-Auth Missing</span>
                            </td>
                            <td className="py-2.5 text-right text-white font-semibold">$1,960.00 <span className="text-[10px] text-slate-500 font-normal">/ $2.4k</span></td>
                            <td className="py-2.5 text-right text-red-400 font-semibold">42 Days (Critical)</td>
                          </tr>
                          <tr>
                            <td className="py-2.5">
                              <div className="text-white font-medium">Aetna RCM</div>
                              <div className="text-[10px] text-slate-500">#55321001</div>
                            </td>
                            <td className="py-2.5">
                              <span className="text-amber-400 bg-amber-950/20 border border-amber-900/30 px-1.5 py-0.5 rounded text-[10px]">CARC 50</span>
                              <span className="text-slate-500 ml-1.5">Necessity Audit</span>
                            </td>
                            <td className="py-2.5 text-right text-white font-semibold">$1,001.00 <span className="text-[10px] text-slate-500 font-normal">/ $1.5k</span></td>
                            <td className="py-2.5 text-right text-amber-400 font-semibold">34 Days (High)</td>
                          </tr>
                          <tr>
                            <td className="py-2.5">
                              <div className="text-white font-medium">BCBS State</div>
                              <div className="text-[10px] text-slate-500">#77394020</div>
                            </td>
                            <td className="py-2.5">
                              <span className="text-blue-400 bg-blue-950/20 border border-blue-900/30 px-1.5 py-0.5 rounded text-[10px]">CARC 97</span>
                              <span className="text-slate-500 ml-1.5">CPT Bundling</span>
                            </td>
                            <td className="py-2.5 text-right text-white font-semibold">$176.00 <span className="text-[10px] text-slate-500 font-normal">/ $320</span></td>
                            <td className="py-2.5 text-right text-blue-400">19 Days (Medium)</td>
                          </tr>
                          <tr>
                            <td className="py-2.5">
                              <div className="text-white font-medium">Cigna Admin</div>
                              <div className="text-[10px] text-slate-500">#88291029</div>
                            </td>
                            <td className="py-2.5">
                              <span className="text-amber-400 bg-amber-950/20 border border-amber-900/30 px-1.5 py-0.5 rounded text-[10px]">CARC 18</span>
                              <span className="text-slate-500 ml-1.5">Loop 2300 Hold</span>
                            </td>
                            <td className="py-2.5 text-right text-white font-semibold">$850.00 <span className="text-[10px] text-slate-500 font-normal">/ $1.2k</span></td>
                            <td className="py-2.5 text-right text-amber-400 font-semibold">58 Days (High)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 2: RECOVERABILITY SCORES */}
                {activePreviewTab === "scoring" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">Score Criteria & Priority Metrics</h4>
                      <span className="font-mono text-xs text-cyan-400">Recovery Score: 94/100</span>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Expected recovery index determines placement inside the prioritization queue by correlating historical payer success metrics against documentation.
                    </p>

                    <div className="space-y-4 font-mono text-xs">
                      <div>
                        <div className="flex justify-between mb-1.5 text-slate-500">
                          <span>HISTORICAL PAYER RECOVERY YIELD (UHC)</span>
                          <span className="text-white font-semibold">92%</span>
                        </div>
                        <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1.5 text-slate-500">
                          <span>CLINICAL DOCUMENT INTEGRITY INDEX</span>
                          <span className="text-white font-semibold">89%</span>
                        </div>
                        <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-[#5d1fe2] rounded-full" style={{ width: "89%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1.5 text-slate-500">
                          <span>FILING WINDOW CAPACITY (24 DAYS REMAINING)</span>
                          <span className="text-white font-semibold">98%</span>
                        </div>
                        <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: "98%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: AGING LEDGER */}
                {activePreviewTab === "ledger" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">Trapped Revenue Ledger Value</h4>
                      <span className="font-mono text-xs text-emerald-400">Total Backlog: $1,489,200</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Expected recovery value decays rapidly as claims age. Appeal deadlines enforce permanent cuts.
                    </p>

                    <div className="space-y-3 text-xs font-mono">
                      <div className="flex items-center justify-between p-2 rounded bg-white/[0.01] border border-white/5">
                        <span className="text-slate-400 font-semibold w-24">0 - 30 DAYS</span>
                        <div className="flex-1 max-w-[200px] h-2 bg-slate-900 rounded-full overflow-hidden mx-4 hidden sm:block">
                          <div className="h-full bg-emerald-500" style={{ width: "94%" }} />
                        </div>
                        <span className="text-white font-medium mr-4">$412,500</span>
                        <span className="text-emerald-400 text-[10px]">94% EXPECTATION</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded bg-white/[0.01] border border-white/5">
                        <span className="text-slate-400 font-semibold w-24">31 - 60 DAYS</span>
                        <div className="flex-1 max-w-[200px] h-2 bg-slate-900 rounded-full overflow-hidden mx-4 hidden sm:block">
                          <div className="h-full bg-emerald-500/80" style={{ width: "81%" }} />
                        </div>
                        <span className="text-white font-medium mr-4">$584,200</span>
                        <span className="text-emerald-500/80 text-[10px]">81% EXPECTATION</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded bg-white/[0.01] border border-white/5">
                        <span className="text-slate-400 font-semibold w-24">61 - 90 DAYS</span>
                        <div className="flex-1 max-w-[200px] h-2 bg-slate-900 rounded-full overflow-hidden mx-4 hidden sm:block">
                          <div className="h-full bg-amber-500" style={{ width: "52%" }} />
                        </div>
                        <span className="text-white font-medium mr-4">$310,000</span>
                        <span className="text-amber-500 text-[10px]">52% EXPECTATION</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded bg-white/[0.01] border border-white/5">
                        <span className="text-slate-400 font-semibold w-24">91+ DAYS</span>
                        <div className="flex-1 max-w-[200px] h-2 bg-slate-900 rounded-full overflow-hidden mx-4 hidden sm:block">
                          <div className="h-full bg-red-500" style={{ width: "15%" }} />
                        </div>
                        <span className="text-white font-medium mr-4">$182,500</span>
                        <span className="text-red-500 text-[10px]">15% EXPECTATION</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: DENIAL CLASSIFICATIONS */}
                {activePreviewTab === "rules" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">Active Payor Validation Gates</h4>
                      <span className="font-mono text-xs text-indigo-400">CARC/RARC Classifications</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded bg-[#0a0d18]/40 border border-white/5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-white font-semibold">CARC 197</span>
                          <span className="text-[10px] text-[#c084fc] bg-[#5d1fe2]/15 px-1.5 py-0.2 rounded">PRE-AUTH MISSING</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Requires validated pre-authorization token reference in Block 24D. Validate clinical necessity charts to enforce.
                        </p>
                      </div>
                      
                      <div className="p-3 rounded bg-[#0a0d18]/40 border border-white/5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-white font-semibold">CARC 50</span>
                          <span className="text-[10px] text-[#c084fc] bg-[#5d1fe2]/15 px-1.5 py-0.2 rounded">MEDICAL NECESSITY</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Requires validation against payer-specific local coverage determination (LCD) policy indexes prior to packet compilation.
                        </p>
                      </div>

                      <div className="p-3 rounded bg-[#0a0d18]/40 border border-white/5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-white font-semibold">CARC 97</span>
                          <span className="text-[10px] text-[#c084fc] bg-[#5d1fe2]/15 px-1.5 py-0.2 rounded">CPT BUNDLING</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Check for secondary outpatient lines on same date of service. Enforce modifier -59 or -25 attachment checks.
                        </p>
                      </div>

                      <div className="p-3 rounded bg-[#0a0d18]/40 border border-white/5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-white font-semibold">CARC 18</span>
                          <span className="text-[10px] text-[#c084fc] bg-[#5d1fe2]/15 px-1.5 py-0.2 rounded">DUPLICATE CLAIM</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Verify primary clearinghouse adjudication references. Identify and isolate secondary insurance EOB details.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Constant Verification Footer */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#c084fc]" />
                    End-to-End Encryption: TLS 1.3
                  </span>
                  <span>SECURE SYSTEM REGISTRY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS (Stage 5: Curiosity) */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-[#070912]/20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#5d1fe2] uppercase block mb-3">
              Operational Pathway
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-4">
              Structured to recover trapped revenue
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              ONINT integrations are designed around real denial management workflows, requiring minimal change to your existing billing environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative p-8 rounded-lg bg-[#0a0d18]/30 border border-white/5">
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-lg bg-[#5d1fe2]/15 border border-[#5d1fe2]/30 flex items-center justify-center text-xs font-mono font-semibold text-[#c084fc]">
                01
              </span>
              <h3 className="text-base font-semibold text-white mt-2 mb-2">Submit a denied claim</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Provide a redacted sample EOB or claim denial. Our system parses the underlying CARC codes and identifies filing restrictions.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-lg bg-[#0a0d18]/30 border border-white/5">
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-lg bg-[#5d1fe2]/15 border border-[#5d1fe2]/30 flex items-center justify-center text-xs font-mono font-semibold text-[#c084fc]">
                02
              </span>
              <h3 className="text-base font-semibold text-white mt-2 mb-2">Receive operational review</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Review calculations for expected recovery value, priority scores, and verified payor guidelines inside our secure portal.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-lg bg-[#0a0d18]/30 border border-white/5">
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-lg bg-[#5d1fe2]/15 border border-[#5d1fe2]/30 flex items-center justify-center text-xs font-mono font-semibold text-[#c084fc]">
                03
              </span>
              <h3 className="text-base font-semibold text-white mt-2 mb-2">Recover revenue faster</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Export structured, audit-ready appeal packages and submit them directly to specific payer queues for processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — TRUST / POSITIONING */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#5d1fe2] uppercase block mb-3">
              Operational Credibility
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-4">
              Designed around real denial management workflows
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              ONINT aligns directly with standard billing processes, providing security and reliability for teams managing complex reimbursement operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            <div className="p-6 rounded-lg border border-white/5 bg-[#0a0d18]/20">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-semibold text-white">Structured for Auditability</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every priority score, claim update, and appeal packet is signed and logged inside our audit ledger to ensure institutional accountability.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-white/5 bg-[#0a0d18]/20">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-semibold text-white">Built for complex operations</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Designed for teams managing complex reimbursement operations. ONINT layers onto existing systems to clear recovery bottlenecks.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-white/5 bg-[#0a0d18]/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-[#c084fc]" />
                <h4 className="text-sm font-semibold text-white">Prioritization & Review</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structured for auditability, prioritization, and operational review, enabling billing firms to target recoverable revenue immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA (Stage 6: Low-Friction Action) */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-[#070912]/50 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-3">
            See what your denial backlog is actually worth.
          </h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Provide your business email to receive an operational review link and securely submit a sample denial document.
          </p>

          {/* Low-friction inline input form */}
          <form onSubmit={handleCtaSubmit} className="space-y-4 max-w-md mx-auto text-left">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                Business Email
              </label>
              <input
                type="email"
                required
                value={ctaEmail}
                onChange={(e) => setCtaEmail(e.target.value)}
                placeholder="work@billingfirm.com"
                className="w-full px-4 py-3 rounded-lg bg-[#050810] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 text-sm transition-all font-mono"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={ctaCompany}
                onChange={(e) => setCtaCompany(e.target.value)}
                placeholder="Reimbursement Services LLC"
                className="w-full px-4 py-3 rounded-lg bg-[#050810] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 text-sm transition-all font-mono"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary py-3 rounded-lg text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                Submit a Sample Denial
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Compliance & security highlights */}
          <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              HIPAA SECURED
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#c084fc]" />
              TLS 1.3 ENCRYPTED
            </span>
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-cyan-400" />
              SOC 2 ALIGNED
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050810] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <OnintLogo className="h-5 w-auto" />
            <span className="text-slate-600 text-xs font-mono">| Reimbursement Intelligence System</span>
          </div>
          
          <div className="flex gap-6 text-xs text-slate-500 font-mono">
            <a href="#security" className="hover:text-slate-300 transition-colors">Security Registry</a>
            <a href="#audit" className="hover:text-slate-300 transition-colors">Documentation</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Operational Terms</a>
          </div>

          <div className="text-slate-600 text-[10px] font-mono">
            © 2026 ONINT. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Booking / Upload Modal */}
      <DemoModal 
        key={isDemoModalOpen ? `open-${modalInitialEmail}` : "closed"}
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
        initialEmail={modalInitialEmail}
      />
    </div>
  );
}
