'use client';
import React from 'react';
import ReadinessMeter from './ReadinessMeter';
import CountdownTimer from './CountdownTimer';
import PrecedentCard from './PrecedentCard';
import ExhibitLedger from './ExhibitLedger';
import ForumComparator from './ForumComparator';
import DamagesCalculator from './DamagesCalculator';
import NextBestActionCard from './NextBestActionCard';

interface ContextPanelProps {
  currentStep?: number;
  readinessScore?: number;
  dispatchDate?: string;
  daysRemaining?: number;
  pecuniaryTier?: string;
  exhibits?: any[];
  precedents?: any[];
  damages?: {
    directLoss: number;
    consequential: number;
    interest: number;
    nonPecuniary: number;
    total: number;
  };
  showForums?: boolean;
  showDamages?: boolean;
  onDownloadNotice?: () => void;
  onEscalate?: () => void;
}

const SAMPLE_PRECEDENTS = [
  {
    caseTitle: 'Wg. Cdr. Arifur Rahman Khan v. DLF Southern Homes Pvt. Ltd.',
    citation: '(2020) 16 SCC 512',
    forum: 'Supreme Court of India',
    bench: 'Dr. D.Y. Chandrachud & K.M. Joseph, JJ.',
    appliedProvisions: ['Section 2(11) CPA 2019', 'Section 14 CPA 1986'],
    ratiodecidendi:
      'Failure to deliver promised service constitutes deficiency in service; reasonable restitution with interest is mandatory.',
    awardedRelief: 'Full refund + 6–9% simple interest p.a.',
    sourceUrl: 'https://indiankanoon.org/doc/120098448/',
  },
  {
    caseTitle: 'Emaar MGF Land Ltd. v. Aftab Singh',
    citation: '(2019) 12 SCC 751',
    forum: 'Supreme Court of India',
    bench: 'Uday Umesh Lalit & Indu Malhotra, JJ.',
    appliedProvisions: ['Section 3 CPA 1986', 'Arbitration & Conciliation Act 1996'],
    ratiodecidendi:
      'Consumer Commission jurisdiction cannot be ousted by arbitration clauses in sale agreements.',
    awardedRelief: 'Right to approach Consumer Commission upheld',
    sourceUrl: 'https://indiankanoon.org/doc/146637045/',
  },
];

export default function ContextPanel({
  currentStep = 1,
  readinessScore = 65,
  dispatchDate,
  daysRemaining = 15,
  pecuniaryTier = 'District Consumer Disputes Redressal Commission',
  exhibits = [],
  precedents = SAMPLE_PRECEDENTS,
  damages,
  showForums = true,
  showDamages = false,
  onDownloadNotice,
  onEscalate,
}: ContextPanelProps) {
  return (
    <aside className="hidden md:flex flex-col w-[40%] h-full bg-surface-variant/8 overflow-y-auto p-6 space-y-4 border-l border-glass-stroke">
      {/* Next Best Action */}
      <NextBestActionCard
        currentStep={currentStep}
        readinessScore={readinessScore}
        daysRemaining={daysRemaining}
        pecuniaryTier={pecuniaryTier}
        onDownloadNotice={onDownloadNotice}
        onEscalate={onEscalate}
      />

      {/* Readiness Meter */}
      <ReadinessMeter score={readinessScore} />

      {/* 15-Day Countdown */}
      <CountdownTimer dispatchDate={dispatchDate} />

      {/* Damages Calculator */}
      {showDamages && damages && (
        <DamagesCalculator {...damages} />
      )}

      {/* Forum Comparator */}
      {showForums && (
        <ForumComparator pecuniaryTier={pecuniaryTier} />
      )}

      {/* Exhibit Ledger */}
      <ExhibitLedger exhibits={exhibits} />

      {/* Precedent Cards */}
      {precedents.length > 0 && (
        <div className="glass rounded-2xl p-5 shadow-glass-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-[18px]">library_books</span>
            <h3 className="text-sm font-bold text-on-surface">Referenced Legal Materials</h3>
            <span className="ml-auto badge badge-primary">{precedents.length}</span>
          </div>
          <div className="space-y-2">
            {precedents.map((p, i) => (
              <PrecedentCard key={i} {...p} />
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pb-4 text-center">
        <p className="text-[10px] text-on-surface-variant/50 leading-relaxed px-2">
          Statutory grounding under Indian Bare Acts. Not a substitute for Advocate-on-Record representation u/s 35(1) CPA 2019.
        </p>
      </div>
    </aside>
  );
}
