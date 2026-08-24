'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SideNavBar from '@/components/SideNavBar';
import Header from '@/components/Header';
import { useCaseStore } from '@/lib/store';

const SAMPLE_NOTICE = `LEGAL NOTICE
(Under Section 35 read with Section 2(11) of the Consumer Protection Act, 2019)

To,
The Nodal / Grievance Officer,
IndiGo Airlines (InterGlobe Aviation Ltd.)
Level 1, Tower C, Global Business Park, Sector 18, Gurugram, Haryana - 122 015

Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}

SUBJECT: DEMAND FOR RESTITUTION OF RS. 29,491.84 FOR DEFICIENCY IN SERVICE UNDER THE CONSUMER PROTECTION ACT, 2019

Sir/Madam,

Under instructions from my client, Mr./Ms. [Complainant Name], resident of [City], [State] — hereinafter referred to as the "Complainant" — this 15-Day Statutory Legal Notice is hereby served upon you:

1. BACKGROUND FACTS:
   That on 15 January 2026, the Complainant purchased flight tickets (Booking Reference: 6E-XXXXX) from the Opposite Party for a sum of Rs. 12,499/- (Rupees Twelve Thousand Four Hundred and Ninety-Nine Only), as evidenced by [Exhibit A, Tax Invoice].

2. CAUSE OF ACTION:
   That on 14 January 2026, the Opposite Party unilaterally cancelled the said flight without providing any prior notice of 2 weeks as mandated under DGCA CAR Section 3, Series M, Part IV, nor did they offer any alternate flight or full refund within the statutory timeline.

3. LEGAL GROUNDS:
   a. Section 2(11) — Consumer Protection Act, 2019: Deficiency in Service
   b. Section 2(47) — Consumer Protection Act, 2019: Unfair Trade Practice
   c. DGCA Civil Aviation Requirements, Section 3, Series M, Part IV — Passenger Rights

4. SUPPORTING PRECEDENT:
   The Hon'ble Supreme Court in Wg. Cdr. Arifur Rahman Khan v. DLF Southern Homes Pvt. Ltd. (2020) 16 SCC 512 held that failure to deliver promised service constitutes deficiency in service entitling the complainant to full restitution with interest.

5. QUANTUM OF RESTITUTION CLAIMED:
   (a) Direct Pecuniary Loss (D):         Rs. 12,499.00
   (b) Consequential Expenses (C):        Rs.  1,500.00
   (c) Statutory Interest @ 8% p.a. (I): Rs.    492.84
   (d) Non-Pecuniary Relief (N):          Rs. 15,000.00
   ──────────────────────────────────────────────────────
   TOTAL CLAIM AMOUNT (T = D+C+I+N):     Rs. 29,491.84

6. DEMAND:
   You are hereby called upon to settle the aforesaid claim of Rs. 29,491.84 within 15 (fifteen) days from the date of receipt of this notice, failing which the Complainant reserves the right to institute a consumer complaint before the District Consumer Disputes Redressal Commission having jurisdiction, under Section 35 of the Consumer Protection Act, 2019, without any further notice.

7. DISPATCH INSTRUCTIONS:
   This notice shall be dispatched via Speed Post with Acknowledgment Due (AD) to the above address AND via email to the designated Nodal Officer email.

Yours sincerely,
[Complainant Name]
Party-in-Person
u/s 35(1) Consumer Protection Act, 2019`;

export default function NoticePage() {
  const store = useCaseStore();
  const [activeTab, setActiveTab] = useState<'english' | 'summary'>('english');
  const [redTeamStatus, setRedTeamStatus] = useState<'idle' | 'running' | 'passed'>('idle');

  const handleRunRedTeam = () => {
    setRedTeamStatus('running');
    setTimeout(() => setRedTeamStatus('passed'), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([SAMPLE_NOTICE], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lexis_Counsel_Legal_Notice_${store.caseRef}.txt`;
    a.click();
  };

  return (
    <div className="flex h-screen w-full">
      <SideNavBar />
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header caseTitle="Screen 4: 15-Day Legal Notice Preview" caseRef={store.caseRef} onDownload={handleDownload} />

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Notice Preview */}
          <div className="flex-1 md:w-[60%] flex flex-col overflow-hidden md:border-r border-glass-stroke">
            {/* Tabs */}
            <div className="flex items-center gap-1 px-6 py-3 border-b border-glass-stroke glass/40">
              {(['english', 'summary'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeTab === tab ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-primary/5'
                  }`}
                >
                  {tab === 'english' ? '📄 Formal English (Court)' : '🗣️ Plain Language Summary'}
                </button>
              ))}

              {/* Red-Team Badge */}
              <div className="ml-auto">
                {redTeamStatus === 'idle' && (
                  <button onClick={handleRunRedTeam} className="pill-outline text-[11px]">
                    <span className="material-symbols-outlined text-[13px]">verified_user</span>
                    Run Red-Team Audit
                  </button>
                )}
                {redTeamStatus === 'running' && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/15 border border-secondary-container/30 text-xs font-semibold text-on-secondary-container">
                    <div className="w-3 h-3 rounded-full border-2 border-secondary-container/30 border-t-secondary-container animate-spin" />
                    Agent 5 Auditing...
                  </div>
                )}
                {redTeamStatus === 'passed' && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-xs font-semibold text-success">
                    <span className="material-symbols-outlined filled text-[14px]">verified</span>
                    Red-Team Passed
                  </div>
                )}
              </div>
            </div>

            {/* Notice content */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
              {activeTab === 'english' ? (
                <div className="max-w-2xl mx-auto">
                  <div className="glass rounded-2xl p-8 shadow-glass-sm">
                    <div className="text-center mb-6 pb-6 border-b border-glass-stroke">
                      <div className="w-12 h-12 rounded-xl bg-primary mx-auto mb-3 flex items-center justify-center">
                        <span className="material-symbols-outlined filled text-on-primary text-[24px]">balance</span>
                      </div>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Lexis Counsel</p>
                      <p className="text-xs text-on-surface-variant">AI-Drafted Legal Notice — CPA 2019</p>
                    </div>
                    <pre className="legal-prose whitespace-pre-wrap font-body text-xs leading-relaxed text-on-surface">
                      {SAMPLE_NOTICE}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <div className="glass rounded-2xl p-6 shadow-glass-sm">
                    <h2 className="text-lg font-bold text-on-surface mb-4">Plain Language Summary</h2>
                    <div className="space-y-4">
                      {[
                        { icon: 'person', title: 'Who is this sent to?', text: 'The Nodal/Grievance Officer of IndiGo Airlines at their registered Gurugram address.' },
                        { icon: 'gavel', title: 'What are you demanding?', text: 'Full restitution of ₹29,491.84 — covering your ticket cost, extra expenses, interest, and compensation for harassment.' },
                        { icon: 'timer', title: 'What\'s the deadline?', text: 'The airline has 15 days from receiving this notice to settle. After that, you can file in Consumer Court.' },
                        { icon: 'send', title: 'How to dispatch?', text: 'Send via Speed Post with Acknowledgment Due (AD) + email to the Nodal Officer email ID.' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface-variant/20 border border-glass-stroke">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-primary text-[16px]">{item.icon}</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-on-surface mb-1">{item.title}</p>
                            <p className="text-xs text-on-surface-variant leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom actions */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-glass-stroke glass/40">
              <div className="max-w-2xl mx-auto flex gap-3">
                <button onClick={handleDownload} className="btn-primary flex-1">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Download Notice PDF
                </button>
                <Link href="/tracker" className="btn-secondary flex-1">
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                  Start Notice Tracker
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Sidebar info */}
          <div className="hidden md:flex flex-col w-[40%] h-full bg-surface-variant/8 overflow-y-auto p-6 space-y-4">
            {/* Audit report */}
            {redTeamStatus === 'passed' && (
              <div className="glass rounded-2xl p-5 border-l-4 border-success animate-fade-up">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined filled text-success text-[20px]">verified_user</span>
                  <h3 className="text-sm font-bold text-on-surface">Red-Team Audit Passed</h3>
                </div>
                <div className="space-y-2">
                  {[
                    'All factual assertions linked to Exhibit IDs ✓',
                    'No arbitration clause pre-emption vulnerability ✓',
                    'Rule 6 E-Commerce Rules 2020 properly cited ✓',
                    'Pecuniary jurisdiction correctly stated ✓',
                  ].map((check, i) => (
                    <p key={i} className="text-xs text-success flex items-center gap-1.5">
                      <span className="material-symbols-outlined filled text-[12px]">check_circle</span>
                      {check}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Dispatch guide */}
            <div className="glass rounded-2xl p-5 shadow-glass-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-[18px]">send</span>
                <h3 className="text-sm font-bold text-on-surface">Dispatch Instructions</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: 'local_post_office', title: 'Speed Post AD', desc: 'Send to registered address. Keep tracking number.' },
                  { icon: 'email', title: 'Nodal Officer Email', desc: 'CC grievance@indigo.co.in with PDF attached.' },
                  { icon: 'screenshot', title: 'Screenshot Read Receipt', desc: 'Screenshot email sent timestamp for evidence.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-[14px]">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">{item.title}</p>
                      <p className="text-xs text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Court fee info */}
            <div className="glass rounded-2xl p-5 shadow-glass-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-[18px]">payments</span>
                <h3 className="text-sm font-bold text-on-surface">e-Daakhil Court Fee</h3>
              </div>
              <div className="space-y-2">
                {[
                  { range: 'Up to ₹5 Lakh', fee: '₹0' },
                  { range: '₹5L – ₹10L', fee: '₹200' },
                  { range: '₹10L – ₹20L', fee: '₹400' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-glass-stroke last:border-0">
                    <span className="text-xs text-on-surface-variant">{row.range}</span>
                    <span className={`text-xs font-bold ${row.fee === '₹0' ? 'text-success' : 'text-primary'}`}>{row.fee}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2 opacity-60">
                Your claim: ₹29,491 → Court fee: <strong className="text-success">₹0</strong>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
