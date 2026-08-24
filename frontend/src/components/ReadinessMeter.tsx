'use client';
import React, { useEffect, useRef } from 'react';

interface ReadinessMeterProps {
  score: number; // 0–100
  missingProofs?: string[];
  checklist?: { label: string; weight: number; checked: boolean }[];
}

const DEFAULT_CHECKLIST = [
  { label: 'Tax Invoice / Proof of Purchase', weight: 30, checked: true },
  { label: 'Proof of Payment / Transaction Reference', weight: 20, checked: true },
  { label: 'Prior Written Escalation / Rejection Proof', weight: 20, checked: false },
  { label: 'Opposite Party Registered Address / Nodal Email', weight: 15, checked: false },
  { label: 'Complainant Identity Proof with Redacted PII', weight: 15, checked: true },
];

const CIRCUMFERENCE = 2 * Math.PI * 42; // r=42

export default function ReadinessMeter({
  score = 65,
  missingProofs = [],
  checklist = DEFAULT_CHECKLIST,
}: ReadinessMeterProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const isReady = score >= 80;

  useEffect(() => {
    if (circleRef.current) {
      const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;
      circleRef.current.style.strokeDashoffset = String(offset);
    }
  }, [score]);

  const strokeColor = isReady ? '#1a6e2e' : score >= 50 ? '#b45309' : '#ba1a1a';

  return (
    <div className="glass rounded-2xl p-5 shadow-glass-sm animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[18px]">task_alt</span>
        <h3 className="text-sm font-bold text-on-surface">Zero-Trip Readiness Meter</h3>
        <span className={`ml-auto badge ${isReady ? 'badge-success' : 'badge-warning'}`}>
          {isReady ? 'Ready to File' : 'Incomplete'}
        </span>
      </div>

      {/* Radial Progress */}
      <div className="flex items-center justify-center my-4">
        <div className="relative">
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Track */}
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="rgba(180,83,9,0.10)"
              strokeWidth="8"
            />
            {/* Progress */}
            <circle
              ref={circleRef}
              cx="50" cy="50" r="42"
              fill="none"
              stroke={strokeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
                transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="radial-progress-circle"
            />
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-2xl font-extrabold leading-none"
              style={{ color: strokeColor }}
            >
              {score}%
            </span>
            <span className="text-[9px] font-semibold text-on-surface-variant uppercase tracking-wider mt-0.5">
              Readiness
            </span>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {checklist.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
              item.checked
                ? 'bg-success/5 border border-success/15'
                : 'bg-error/4 border border-error/15'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.checked ? 'bg-success/20' : 'bg-error/10'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[12px] ${
                  item.checked ? 'text-success filled' : 'text-error'
                }`}
              >
                {item.checked ? 'check' : 'close'}
              </span>
            </div>
            <span className="text-xs text-on-surface flex-1 leading-snug">{item.label}</span>
            <span
              className={`text-[10px] font-bold flex-shrink-0 ${
                item.checked ? 'text-success' : 'text-on-surface-variant'
              }`}
            >
              {item.weight}%
            </span>
          </div>
        ))}
      </div>

      {/* Warning / CTA */}
      {!isReady && missingProofs.length > 0 && (
        <div className="mt-4 p-3 rounded-xl bg-secondary-container/10 border border-secondary-container/25">
          <p className="text-xs font-semibold text-on-secondary-container flex items-center gap-1.5 mb-2">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            Missing evidence needed:
          </p>
          <ul className="space-y-1">
            {missingProofs.map((proof, i) => (
              <li key={i} className="text-xs text-on-surface-variant flex items-start gap-1.5">
                <span className="text-secondary-container mt-0.5">→</span>
                {proof}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isReady && (
        <div className="mt-4 p-3 rounded-xl bg-success/5 border border-success/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-success text-[18px] filled">verified</span>
          <p className="text-xs font-semibold text-success">
            Your case is ready for e-Daakhil filing.
          </p>
        </div>
      )}
    </div>
  );
}
