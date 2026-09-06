import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export const DeveloperSignature = ({ 
  variant = 'compact',
  className = '' 
}: { 
  variant?: 'compact' | 'full' | 'stamp' | 'pdf';
  className?: string;
}) => {
  if (variant === 'compact') {
    return (
      <div className={`p-3 bg-white rounded-xl border border-slate-200/90 shadow-xs ${className}`}>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-extrabold text-indigo-700 tracking-wider uppercase flex items-center gap-1">
            <Award size={12} className="text-indigo-600" />
            System Architect
          </span>
          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
            Verified
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-slate-900 leading-none">SHAHID ALI</p>
            <p className="text-[10px] font-medium text-slate-500 mt-0.5">Developed by SHAHID Ali</p>
          </div>
          {/* Stylized Handwritten Calligraphy Signature */}
          <div className="h-7 w-20 text-indigo-900 opacity-90 flex items-center justify-end">
            <svg viewBox="0 0 160 50" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M10 35 C 25 15, 30 5, 40 20 C 45 30, 35 42, 50 35 C 65 28, 80 18, 95 24 C 110 30, 115 15, 130 18 C 145 20, 140 32, 155 30" 
                stroke="#4338ca" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M25 45 C 50 42, 110 40, 145 38" 
                stroke="#f97316" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
              />
              <circle cx="150" cy="28" r="2.5" fill="#f97316" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'stamp') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50/80 border border-indigo-200 rounded-xl ${className}`}>
        <ShieldCheck size={14} className="text-indigo-600 shrink-0" />
        <span className="text-xs font-bold text-slate-800">
          Developed by <strong className="text-indigo-950 font-black">SHAHID Ali</strong>
        </span>
      </div>
    );
  }

  // Full Executive Verification Badge
  return (
    <div className={`p-5 bg-gradient-to-br from-white to-indigo-50/30 border border-indigo-100 rounded-2xl shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/20 shrink-0">
            SA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-indigo-700 tracking-wider uppercase">Lead AI & Underwriting Architect</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                <ShieldCheck size={11} /> Certified
              </span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mt-0.5">Developed by SHAHID Ali</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Engineered with NexusCore 5Cs Underwriting Matrix & Multimodal Document Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-5">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Digital Sign-off</p>
            <p className="text-xs font-bold text-slate-700">Ref: SHA-NEXUS-2026</p>
          </div>
          <div className="h-10 w-28 text-indigo-900 flex items-center">
            <svg viewBox="0 0 160 50" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M10 35 C 25 15, 30 5, 40 20 C 45 30, 35 42, 50 35 C 65 28, 80 18, 95 24 C 110 30, 115 15, 130 18 C 145 20, 140 32, 155 30" 
                stroke="#3730a3" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M20 46 C 55 42, 115 40, 152 38" 
                stroke="#ea580c" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
              />
              <circle cx="154" cy="27" r="3" fill="#ea580c" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
