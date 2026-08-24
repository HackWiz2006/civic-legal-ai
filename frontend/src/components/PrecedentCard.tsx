'use client';
import React from 'react';

interface PrecedentCardProps {
  caseTitle: string;
  citation: string;
  forum: string;
  bench: string;
  appliedProvisions: string[];
  ratiodecidendi: string;
  awardedRelief: string;
  sourceUrl: string;
}

export default function PrecedentCard({
  caseTitle,
  citation,
  forum,
  bench,
  appliedProvisions,
  ratiodecidendi,
  awardedRelief,
  sourceUrl,
}: PrecedentCardProps) {
  return (
    <div className="precedent-card group animate-fade-up">
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-glass-stroke flex-shrink-0 group-hover:bg-primary/5 transition-colors">
        <span className="material-symbols-outlined text-primary text-[18px]">gavel</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title + Citation */}
        <p className="text-sm font-bold text-on-surface leading-tight mb-0.5 truncate">
          {caseTitle}
        </p>
        <p className="text-xs text-primary font-semibold mb-1">{citation}</p>

        {/* Forum + Bench */}
        <p className="text-[11px] text-on-surface-variant mb-2 leading-snug">
          {forum} • {bench}
        </p>

        {/* Ratio Decidendi */}
        <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed mb-2">
          {ratiodecidendi}
        </p>

        {/* Relief */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/8 border border-success/15 text-[10px] font-semibold text-success mb-2">
          <span className="material-symbols-outlined text-[10px]">payments</span>
          {awardedRelief}
        </div>

        {/* Provisions */}
        <div className="flex flex-wrap gap-1 mb-2">
          {appliedProvisions.slice(0, 2).map((p, i) => (
            <span key={i} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/6 text-primary border border-primary/10">
              {p}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-primary font-semibold hover:text-primary-container transition-colors underline decoration-dotted"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          Indian Kanoon
        </a>
      </div>
    </div>
  );
}
