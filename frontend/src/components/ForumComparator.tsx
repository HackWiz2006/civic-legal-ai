'use client';
import React from 'react';

interface ForumOption {
  name: string;
  fee: string;
  timeline: string;
  binding: string;
  recommended?: boolean;
}

const DEFAULT_FORUMS: ForumOption[] = [
  {
    name: 'National Consumer Helpline (NCH 1915)',
    fee: '₹0',
    timeline: '15–45 days',
    binding: 'Informal conciliation',
    recommended: false,
  },
  {
    name: 'RBI Integrated Ombudsman (CMS)',
    fee: '₹0',
    timeline: '30–90 days',
    binding: 'Binding award (statutory cap)',
    recommended: false,
  },
  {
    name: 'District Consumer Commission (e-Daakhil)',
    fee: '₹0 (up to ₹5L)',
    timeline: '6–18 months',
    binding: 'Judicial decree + penal enforcement',
    recommended: true,
  },
  {
    name: 'RTI Online Portal',
    fee: '₹10',
    timeline: '30 days (statutory)',
    binding: 'Mandatory information disclosure',
    recommended: false,
  },
];

interface ForumComparatorProps {
  forums?: ForumOption[];
  pecuniaryTier?: string;
}

export default function ForumComparator({
  forums = DEFAULT_FORUMS,
  pecuniaryTier = 'District Consumer Disputes Redressal Commission',
}: ForumComparatorProps) {
  return (
    <div className="glass rounded-2xl p-5 shadow-glass-sm animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[18px]">compare_arrows</span>
        <h3 className="text-sm font-bold text-on-surface">Forum Cost vs. Time</h3>
      </div>

      {/* Jurisdiction badge */}
      <div className="mb-4 px-3 py-2 rounded-xl bg-primary/6 border border-primary/12">
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5">Recommended Forum</p>
        <p className="text-xs font-semibold text-on-surface">{pecuniaryTier}</p>
      </div>

      {/* Forum cards */}
      <div className="space-y-2">
        {forums.map((forum, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl border transition-colors ${
              forum.recommended
                ? 'bg-primary/5 border-primary/20'
                : 'bg-surface-variant/15 border-glass-stroke hover:bg-surface-variant/30'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className={`text-xs font-bold leading-tight ${forum.recommended ? 'text-primary' : 'text-on-surface'}`}>
                {forum.name}
              </p>
              {forum.recommended && (
                <span className="badge badge-primary text-[9px] flex-shrink-0">Best</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mb-0.5">Fee</p>
                <p className={`text-xs font-bold ${forum.recommended ? 'text-primary' : 'text-on-surface'}`}>
                  {forum.fee}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mb-0.5">Timeline</p>
                <p className="text-xs font-semibold text-on-surface">{forum.timeline}</p>
              </div>
              <div>
                <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mb-0.5">Binding</p>
                <p className="text-[10px] text-on-surface-variant leading-snug">{forum.binding}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
