'use client';
import React from 'react';
import Link from 'next/link';

interface NextBestActionCardProps {
  currentStep: number;
  readinessScore: number;
  daysRemaining: number;
  pecuniaryTier: string;
  onDownloadNotice?: () => void;
  onEscalate?: () => void;
}

const STEPS = [
  { label: 'Narrative Intake', href: '/intake', icon: 'mic' },
  { label: 'Evidence Upload', href: '/evidence', icon: 'attach_file' },
  { label: 'Case Diagnosis', href: '/diagnosis', icon: 'analytics' },
  { label: '15-Day Notice', href: '/notice', icon: 'edit_document' },
  { label: 'Notice Tracker', href: '/tracker', icon: 'timer' },
  { label: 'Petition Builder', href: '/petition', icon: 'gavel' },
  { label: 'Submission Guide', href: '/submission', icon: 'send' },
];

export default function NextBestActionCard({
  currentStep = 1,
  readinessScore = 0,
  daysRemaining = 15,
  pecuniaryTier = 'District Consumer Disputes Redressal Commission',
  onDownloadNotice,
  onEscalate,
}: NextBestActionCardProps) {
  const isReadyToFile = readinessScore >= 80;
  const noticeExpired = daysRemaining <= 0 && currentStep >= 4;

  return (
    <div className="glass rounded-2xl p-5 shadow-glass-md animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[18px] filled">auto_awesome</span>
        <h3 className="text-sm font-bold text-on-surface">Next Best Action</h3>
      </div>

      {/* Active Case Card */}
      <div className="mb-4 p-3 rounded-xl bg-primary/5 border border-primary/15">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="badge badge-primary text-[9px]">Active Case</span>
          <span className="text-[10px] text-on-surface-variant">
            {pecuniaryTier.replace('Consumer Disputes Redressal Commission', 'Commission')}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-[10px] text-on-surface-variant">Readiness</p>
            <p className="text-sm font-extrabold text-primary">{readinessScore}%</p>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant">Days Left</p>
            <p className={`text-sm font-extrabold ${daysRemaining <= 3 ? 'text-error' : 'text-on-surface'}`}>
              {daysRemaining > 0 ? daysRemaining : 'Expired'}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant">Step</p>
            <p className="text-sm font-extrabold text-on-surface">{currentStep}/7</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-4 space-y-1">
        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div
              key={stepNum}
              className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors ${
                isActive ? 'bg-primary/8 border border-primary/15' : ''
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                  isDone
                    ? 'bg-success/20 text-success'
                    : isActive
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-variant/50 text-on-surface-variant'
                }`}
              >
                {isDone ? (
                  <span className="material-symbols-outlined filled text-[11px]">check</span>
                ) : (
                  stepNum
                )}
              </div>
              <Link
                href={step.href}
                className={`text-xs font-medium flex-1 transition-colors ${
                  isActive ? 'text-primary font-bold' : isDone ? 'text-success' : 'text-on-surface-variant'
                } hover:text-primary`}
              >
                {step.label}
              </Link>
              {isActive && (
                <span className="material-symbols-outlined text-primary text-[14px]">chevron_right</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <div className="space-y-2">
        {currentStep === 3 && isReadyToFile && (
          <Link href="/notice" className="btn-primary w-full">
            <span className="material-symbols-outlined text-[18px]">edit_document</span>
            Generate 15-Day Notice
          </Link>
        )}

        {currentStep === 4 && (
          <button onClick={onDownloadNotice} className="btn-primary w-full">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download Notice PDF
          </button>
        )}

        {(noticeExpired || currentStep === 5) && (
          <button
            onClick={onEscalate}
            className="btn-primary w-full"
            style={{ background: '#ba1a1a' }}
          >
            <span className="material-symbols-outlined filled text-[18px]">gavel</span>
            Escalate to e-Daakhil
          </button>
        )}

        {currentStep < 3 && (
          <Link
            href={STEPS[currentStep]?.href || '/intake'}
            className="btn-primary w-full"
          >
            <span className="material-symbols-outlined text-[18px]">
              {STEPS[currentStep]?.icon || 'arrow_forward'}
            </span>
            Continue: {STEPS[currentStep]?.label || 'Next Step'}
          </Link>
        )}
      </div>
    </div>
  );
}
