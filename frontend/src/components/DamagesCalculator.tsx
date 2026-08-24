'use client';
import React from 'react';

interface DamagesProps {
  directLoss?: number;
  consequential?: number;
  interest?: number;
  nonPecuniary?: number;
  total?: number;
  daysElapsed?: number;
}

function formatINR(amount: number): string {
  return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function DamagesCalculator({
  directLoss = 0,
  consequential = 0,
  interest = 0,
  nonPecuniary = 15000,
  total = 0,
  daysElapsed = 180,
}: DamagesProps) {
  const calculatedTotal = total || directLoss + consequential + interest + nonPecuniary;
  const interestRate = 0.08;
  const interestCalc = directLoss * interestRate * (daysElapsed / 365);

  const rows = [
    {
      label: 'Direct Pecuniary Loss (D)',
      formula: 'Σ Verified Invoices / Debit Receipts',
      value: directLoss,
      icon: 'receipt_long',
    },
    {
      label: 'Consequential Expenses (C)',
      formula: 'Σ Documented Consequential Costs',
      value: consequential,
      icon: 'request_quote',
    },
    {
      label: 'Statutory Interest (I)',
      formula: `D × 8% p.a. × ${daysElapsed}d/365`,
      value: interestCalc,
      icon: 'trending_up',
    },
    {
      label: 'Non-Pecuniary Relief (N)',
      formula: 'NCDRC Precedent Cap: ₹10,000 – ₹50,000',
      value: nonPecuniary,
      icon: 'balance',
    },
  ];

  return (
    <div className="glass rounded-2xl p-5 shadow-glass-sm animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[18px]">calculate</span>
        <h3 className="text-sm font-bold text-on-surface">4-Part Restitution Calculator</h3>
      </div>

      {/* Formula tag */}
      <div className="mb-4 px-3 py-1.5 rounded-lg bg-surface-variant/30 border border-glass-stroke font-mono text-[11px] text-on-surface-variant">
        T = D + C + I + N
      </div>

      {/* Breakdown rows */}
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-[14px]">{row.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-on-surface">{row.label}</p>
              <p className="text-[10px] text-on-surface-variant">{row.formula}</p>
            </div>
            <span className="text-xs font-bold text-on-surface tabular-nums">
              ₹{formatINR(row.value)}
            </span>
          </div>
        ))}
      </div>

      {/* Divider + Total */}
      <div className="mt-4 pt-4 border-t-2 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-on-surface">Total Claim (T)</p>
            <p className="text-[10px] text-on-surface-variant">Subject to pecuniary jurisdiction</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-primary tabular-nums">
              ₹{formatINR(calculatedTotal)}
            </span>
          </div>
        </div>

        {/* Jurisdiction badge */}
        <div className="mt-3 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-[10px] text-primary font-semibold">
            {calculatedTotal <= 5000000
              ? '📍 District Consumer Commission (≤ ₹50L)'
              : calculatedTotal <= 20000000
              ? '📍 State Consumer Commission (₹50L – ₹2Cr)'
              : '📍 National Consumer Commission (> ₹2Cr)'}
          </p>
        </div>
      </div>
    </div>
  );
}
