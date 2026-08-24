'use client';
import React from 'react';
import Link from 'next/link';
import SideNavBar from '@/components/SideNavBar';
import Header from '@/components/Header';
import ReadinessMeter from '@/components/ReadinessMeter';
import DamagesCalculator from '@/components/DamagesCalculator';
import ForumComparator from '@/components/ForumComparator';
import PrecedentCard from '@/components/PrecedentCard';
import { useCaseStore } from '@/lib/store';

const STATUTORY_GROUNDS = [
  { section: 'Section 2(11) CPA 2019', title: 'Deficiency in Service', icon: 'gavel' },
  { section: 'Section 2(47) CPA 2019', title: 'Unfair Trade Practice', icon: 'balance' },
  { section: 'Rule 6 E-Commerce Rules 2020', title: 'Fallback Liability (Marketplace)', icon: 'shopping_cart' },
];

const SAMPLE_PRECEDENTS = [
  {
    caseTitle: 'Wg. Cdr. Arifur Rahman Khan v. DLF Southern Homes Pvt. Ltd.',
    citation: '(2020) 16 SCC 512',
    forum: 'Supreme Court of India',
    bench: 'Dr. D.Y. Chandrachud & K.M. Joseph, JJ.',
    appliedProvisions: ['Section 2(11) CPA 2019', 'Section 14 CPA 1986'],
    ratiodecidendi: 'Failure to deliver promised service constitutes deficiency in service; reasonable restitution with interest is mandatory.',
    awardedRelief: 'Full refund + 6–9% simple interest p.a.',
    sourceUrl: 'https://indiankanoon.org/doc/120098448/',
  },
  {
    caseTitle: 'Emaar MGF Land Ltd. v. Aftab Singh',
    citation: '(2019) 12 SCC 751',
    forum: 'Supreme Court of India',
    bench: 'Uday Umesh Lalit & Indu Malhotra, JJ.',
    appliedProvisions: ['Section 3 CPA 1986', 'Arbitration & Conciliation Act 1996'],
    ratiodecidendi: 'Consumer Commission jurisdiction cannot be ousted by arbitration clauses.',
    awardedRelief: 'Right to approach Consumer Commission upheld',
    sourceUrl: 'https://indiankanoon.org/doc/146637045/',
  },
];

export default function DiagnosisPage() {
  const store = useCaseStore();
  const readinessScore = store.readinessScore || 65;
  const damages = store.damages || { directLoss: 12499, consequential: 1500, interest: 492.84, nonPecuniary: 15000, total: 29491.84, daysElapsed: 180 };
  const isReady = readinessScore >= 80;

  return (
    <div className="flex h-screen w-full">
      <SideNavBar />
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header caseTitle="Screen 3: Case Diagnosis & Gap Meter" />

        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-fade-up">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary">Step 3 of 7</span>
                <span className="badge badge-success">Agent Pipeline Complete</span>
              </div>
              <h1 className="text-2xl font-bold text-on-surface mb-2">Case Diagnosis Complete</h1>
              <p className="text-sm text-on-surface-variant">
                All 5 agents have analyzed your case. Review the findings below before proceeding.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left col: Statutory Grounds + Precedents */}
              <div className="lg:col-span-2 space-y-5">
                {/* Statutory Grounds */}
                <div className="glass rounded-2xl p-6 shadow-glass-sm animate-fade-up">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary text-[18px]">library_books</span>
                    <h2 className="text-sm font-bold text-on-surface">Statutory Grounds Identified</h2>
                    <span className="ml-auto badge badge-primary">{STATUTORY_GROUNDS.length} grounds</span>
                  </div>
                  <div className="space-y-3">
                    {STATUTORY_GROUNDS.map((g, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/12 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-primary text-[16px]">{g.icon}</span>
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-primary uppercase tracking-wider">{g.section}</p>
                          <p className="text-sm font-semibold text-on-surface">{g.title}</p>
                        </div>
                        <span className="material-symbols-outlined text-success text-[18px] ml-auto filled">check_circle</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* InLegalNER Precedent Cards */}
                <div className="glass rounded-2xl p-6 shadow-glass-sm animate-fade-up">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary text-[18px]">gavel</span>
                    <h2 className="text-sm font-bold text-on-surface">InLegalNER Precedent Citations</h2>
                  </div>
                  <div className="space-y-3">
                    {SAMPLE_PRECEDENTS.map((p, i) => (
                      <PrecedentCard key={i} {...p} />
                    ))}
                  </div>
                </div>

                {/* Unsettled Law Warning */}
                <div className="glass rounded-2xl p-5 border-l-4 border-secondary-container animate-fade-up">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-secondary-container text-[18px]">warning</span>
                    <h3 className="text-sm font-bold text-on-secondary-container">Unsettled Legal Position</h3>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Conflict exists between <strong>Section 79 IT Act Safe Harbor</strong> and{' '}
                    <strong>Rule 6 Consumer Protection (E-Commerce) Rules 2020</strong> regarding marketplace fallback liability.
                    The draft will proactively plead Rule 6 to defeat the Safe Harbor defense.
                  </p>
                </div>

                {/* Forum Comparator */}
                <ForumComparator pecuniaryTier={store.pecuniaryTier} />
              </div>

              {/* Right col: Readiness + Damages + CTA */}
              <div className="space-y-4">
                <ReadinessMeter score={readinessScore} missingProofs={store.missingProofs} />
                <DamagesCalculator
                  directLoss={damages.directLoss}
                  consequential={damages.consequential}
                  interest={damages.interest}
                  nonPecuniary={damages.nonPecuniary}
                  total={damages.total}
                  daysElapsed={damages.daysElapsed}
                />

                {/* Primary CTA */}
                {isReady ? (
                  <Link href="/notice" className="btn-primary w-full">
                    <span className="material-symbols-outlined text-[18px]">edit_document</span>
                    Generate 15-Day Notice
                  </Link>
                ) : (
                  <>
                    <Link href="/evidence" className="btn-secondary w-full text-sm">
                      <span className="material-symbols-outlined text-[16px]">attach_file</span>
                      Upload Missing Proofs
                    </Link>
                    <div className="p-3 rounded-xl bg-secondary-container/8 border border-secondary-container/20 text-xs text-on-secondary-container text-center">
                      Readiness score must reach <strong>80%</strong> to generate a court-admissible notice.
                    </div>
                  </>
                )}

                <Link href="/evidence" className="btn-secondary w-full text-sm">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back to Evidence
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
