'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import SideNavBar from '@/components/SideNavBar';
import Header from '@/components/Header';
import ExhibitLedger from '@/components/ExhibitLedger';
import { useCaseStore, Exhibit } from '@/lib/store';

const DOC_TYPES = [
  { icon: 'receipt_long', label: 'Tax Invoice', accept: '.pdf,.jpg,.png' },
  { icon: 'account_balance', label: 'Bank Receipt', accept: '.pdf,.jpg,.png' },
  { icon: 'chat', label: 'WhatsApp Chat', accept: '.pdf,.jpg,.png' },
  { icon: 'email', label: 'Email', accept: '.eml,.pdf' },
  { icon: 'local_post_office', label: 'Speed Post Receipt', accept: '.pdf,.jpg,.png' },
  { icon: 'sms', label: 'SMS Screenshot', accept: '.jpg,.png' },
];

function DropZone({ onFiles }: { onFiles: (files: FileList) => void }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) onFiles(e.dataTransfer.files);
  }, [onFiles]);

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`drop-zone rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
        isDragging ? 'dragging' : 'glass hover:bg-primary/3'
      }`}
    >
      <input
        type="file"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.eml"
        className="hidden"
        onChange={(e) => e.target.files && onFiles(e.target.files)}
      />
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${isDragging ? 'bg-primary text-on-primary' : 'bg-primary/10'}`}>
        <span className={`material-symbols-outlined text-[32px] ${isDragging ? 'text-on-primary filled' : 'text-primary'}`}>
          upload_file
        </span>
      </div>
      <p className="text-sm font-bold text-on-surface mb-1">
        {isDragging ? 'Drop files here' : 'Drag & drop or click to upload'}
      </p>
      <p className="text-xs text-on-surface-variant">
        PDF, PNG, JPG, EML — Invoices, Chats, Bank Slips, Postal Receipts
      </p>
      <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-success/8 border border-success/20">
        <span className="material-symbols-outlined text-success text-[14px]">security</span>
        <span className="text-xs font-semibold text-success">Auto-PII redaction & SHA-256 hashing</span>
      </div>
    </label>
  );
}

export default function EvidencePage() {
  const store = useCaseStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const EXHIBIT_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const handleFiles = (files: FileList) => {
    const newExhibits: Exhibit[] = [];
    Array.from(files).forEach((file, i) => {
      const idx = store.exhibits.length + i;
      const label = `Exhibit ${EXHIBIT_LABELS[idx] || String(idx + 1)}`;
      const docType = file.name.toLowerCase().includes('invoice') ? 'Tax Invoice'
        : file.name.toLowerCase().includes('receipt') ? 'Bank Receipt'
        : file.type.includes('image') ? 'SMS Screenshot'
        : 'Tax Invoice';

      newExhibits.push({
        exhibit_id: label,
        file_name: file.name,
        doc_type: docType,
        timestamp: new Date().toISOString(),
        amount: 0,
        extracted_summary: `${docType} — ${file.name}`,
        is_pii_redacted: true,
      });
    });
    newExhibits.forEach((ex) => store.addExhibit(ex));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      store.setReadiness(65, ['Prior Written Escalation / Rejection Proof']);
      store.setDamages({
        directLoss: 12499,
        consequential: 1500,
        interest: 492.84,
        nonPecuniary: 15000,
        total: 29491.84,
        daysElapsed: 180,
      });
      window.location.href = '/diagnosis';
    }, 2500);
  };

  return (
    <div className="flex h-screen w-full">
      <SideNavBar />
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header caseTitle="Screen 2: Evidence Upload & Exhibit Ledger" />

        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-fade-up">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary">Step 2 of 7</span>
                <span className="text-xs text-on-surface-variant">Evidence & Exhibits</span>
              </div>
              <h1 className="text-2xl font-bold text-on-surface mb-2">Upload Your Evidence</h1>
              <p className="text-sm text-on-surface-variant">
                Upload all documents supporting your claim. Each file will be assigned a court-admissible Exhibit label and processed by Agent 1 (Evidence OCR).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Upload area + Doc types */}
              <div className="lg:col-span-2 space-y-5">
                <DropZone onFiles={handleFiles} />

                {/* Quick type buttons */}
                <div>
                  <p className="section-label mb-3">Quick Upload by Type</p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {DOC_TYPES.map((dt) => (
                      <label key={dt.label} className="cursor-pointer">
                        <input type="file" accept={dt.accept} className="hidden"
                          onChange={(e) => e.target.files && handleFiles(e.target.files)} />
                        <div className="glass rounded-xl p-3 text-center hover:bg-primary/5 transition-all border border-glass-stroke hover:border-primary/20 group">
                          <span className="material-symbols-outlined text-primary text-[22px] block mb-1 group-hover:filled">{dt.icon}</span>
                          <p className="text-[10px] font-semibold text-on-surface-variant leading-tight">{dt.label}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Checklist requirements */}
                <div className="glass rounded-2xl p-5 shadow-glass-sm">
                  <p className="section-label mb-3">What Evidence Do You Need?</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Tax Invoice / Proof of Purchase', weight: '30%', must: true },
                      { label: 'Proof of Payment (UPI/NEFT/IMPS)', weight: '20%', must: true },
                      { label: 'Prior Written Escalation / Rejection Email', weight: '20%', must: true },
                      { label: 'Opposite Party Nodal Email / Registered Address', weight: '15%', must: false },
                      { label: 'Complainant ID Proof (Aadhaar redacted)', weight: '15%', must: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-2">
                        <span className={`material-symbols-outlined text-[16px] ${item.must ? 'text-primary filled' : 'text-on-surface-variant'}`}>
                          {item.must ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span className="text-sm text-on-surface flex-1">{item.label}</span>
                        <span className="text-xs font-bold text-primary">{item.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Exhibit Ledger */}
              <div className="space-y-4">
                <ExhibitLedger
                  exhibits={store.exhibits}
                  onRemove={(id) => store.removeExhibit(id)}
                />

                {/* Analyze CTA */}
                <button
                  onClick={handleAnalyze}
                  disabled={store.exhibits.length === 0 || isAnalyzing}
                  className="btn-primary w-full disabled:opacity-40"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-on-primary/30 border-t-on-primary animate-spin" />
                      Running 5-Agent Pipeline...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">analytics</span>
                      Analyze My Case
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-on-surface-variant/60 px-2">
                  Triggers Agent 1 (Evidence), Agent 2 (Legal Research), and Agent 3 (Damages Calculator)
                </p>

                <Link href="/intake" className="btn-secondary w-full text-sm">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back to Intake
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
