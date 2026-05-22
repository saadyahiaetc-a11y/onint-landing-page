"use client";

import React, { useEffect } from "react";
import { X, Calendar } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export default function DemoModal({ 
  isOpen, 
  onClose, 
  initialEmail = "" 
}: DemoModalProps) {
  
  // Manage body overflow when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Prefill the email if provided by the user in a CTA field
  const calendlyUrl = initialEmail
    ? `https://calendly.com/onintrecovery/30min?hide_event_type_details=1&hide_gdpr_banner=1&email=${encodeURIComponent(initialEmail)}`
    : "https://calendly.com/onintrecovery/30min?hide_event_type_details=1&hide_gdpr_banner=1";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050810]/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-white/5 bg-[#0a0d18] shadow-2xl transition-all duration-300 flex flex-col h-[85vh] max-h-[700px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#5d1fe2] via-[#a855f7] to-[#5d1fe2]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 flex flex-col justify-between h-full overflow-hidden">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#c084fc] bg-[#5d1fe2]/15 border border-[#5d1fe2]/20 rounded-full mb-3">
              <Calendar className="w-3.5 h-3.5" /> RECOVERY WALKTHROUGH
            </span>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              Schedule your Denial Recovery Analysis
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Select a time slot below to connect with our team and review your reimbursement backlog.
            </p>
          </div>

          {/* Embedded Calendly Scheduler Widget */}
          <div className="w-full flex-grow rounded-lg overflow-hidden border border-white/5 bg-[#050810] h-0 min-h-[350px]">
            <iframe
              src={calendlyUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Calendly Scheduler"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
