'use client';
import React from 'react';

interface HeaderProps {
  caseTitle?: string;
  caseRef?: string;
  onDownload?: () => void;
  onMore?: () => void;
}

export default function Header({
  caseTitle = 'Grievance Setup: Consumer Dispute',
  caseRef = '2026-CPA-DCDRC-894',
  onDownload,
  onMore,
}: HeaderProps) {
  return (
    <header
      className="h-16 px-6 md:px-8 flex justify-between items-center border-b border-glass-stroke glass/60 backdrop-blur-sm z-20 flex-shrink-0"
      style={{ background: 'rgba(253, 250, 241, 0.70)' }}
    >
      {/* ── Left: Case Info ── */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-on-surface truncate leading-tight">
            {caseTitle}
          </h2>
          <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
            Ref:{' '}
            <span className="font-mono text-primary font-semibold">#{caseRef}</span>
          </p>
        </div>
      </div>

      {/* ── Right: Toolbar ── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Incognito badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-success text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          PII Redacted
        </div>

        {/* Download bundle */}
        <button
          onClick={onDownload}
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors border border-glass-stroke"
          title="Export PDF Bundle"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
        </button>

        {/* More options */}
        <button
          onClick={onMore}
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors border border-glass-stroke"
          title="Case Settings"
        >
          <span className="material-symbols-outlined text-[18px]">more_vert</span>
        </button>
      </div>
    </header>
  );
}
