'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SideNavBar from '@/components/SideNavBar';
import Header from '@/components/Header';
import { useCaseStore } from '@/lib/store';

const PETITION_SECTIONS = [
  {
    id: 'index',
    title: 'Index of Documents & Court Fee',
    icon: 'list_alt',
    content: `INDEX OF DOCUMENTS

1. Synopsis & List of Dates
2. Memo of Parties (Complainant vs. Opposite Party)
3. Statement of Facts & Grounds
4. Prayer Clause
5. Verification Affidavit (Solemn Affirmation)
6. Exhibit A — Tax Invoice (₹12,499)
7. Exhibit B — Bank Transaction Receipt
8. Exhibit C — Speed Post Delivery Receipt

COURT FEE CALCULATION:
Total Claim: ₹29,491.84 (below ₹5 Lakhs)
Court Fee Payable: ₹0 (NIL)
Mode: e-Daakhil Online Portal (edaakhil.nic.in)`,
  },
  {
    id: 'synopsis',
    title: 'List of Dates & Synopsis',
    icon: 'event_note',
    content: `CHRONOLOGICAL SYNOPSIS OF EVENTS

15-Jan-2026: Complainant purchased flight ticket (Booking 6E-XXXXX) for ₹12,499 from IndiGo Airlines. [Exhibit A, Tax Invoice]

14-Jan-2026: Opposite Party unilaterally cancelled flight without prior 2-week notice mandated under DGCA CAR Section 3, Series M, Part IV.

14-Jan-2026: No alternate flight or refund offered within statutory 7-day timeline.

20-Jan-2026: Complainant sent written complaint via email. No satisfactory response received.

[Current Date]: Issuance of 15-Day Pre-Litigation Legal Notice to Opposite Party.`,
  },
  {
    id: 'memo',
    title: 'Memo of Parties',
    icon: 'people',
    content: `MEMO OF PARTIES

COMPLAINANT:
[Full Name], Party-in-Person
[Address], [City], [State] — [PIN]
Email: [complainant@email.com]
(Operating under Section 35(1) Consumer Protection Act, 2019)

OPPOSITE PARTY NO. 1:
InterGlobe Aviation Ltd. (IndiGo Airlines)
Through its Nodal/Grievance Officer
Level 1, Tower C, Global Business Park,
Sector 18, Gurugram, Haryana — 122 015`,
  },
  {
    id: 'grounds',
    title: 'Statement of Facts & Grounds',
    icon: 'gavel',
    content: `STATEMENT OF FACTS & GROUNDS

1. The Complainant is a consumer as defined under Section 2(7) of the Consumer Protection Act, 2019, having availed air travel services from the Opposite Party.

2. That vide Tax Invoice dated 15-Jan-2026 [Exhibit A], the Complainant purchased flight tickets for ₹12,499.

3. That the Opposite Party unilaterally cancelled the flight in contravention of DGCA CAR, Section 3, Series M, Part IV without providing the mandatory 2-week prior notice.

4. LEGAL GROUNDS:
   (a) Section 2(11) CPA 2019 — Deficiency in Service
   (b) Section 2(47) CPA 2019 — Unfair Trade Practice
   (c) DGCA CAR Section 3, Series M, Part IV — Passenger Rights Violation

5. PRECEDENT: The Hon'ble Supreme Court in Wg. Cdr. Arifur Rahman Khan v. DLF Southern Homes (2020) 16 SCC 512 held that failure to deliver promised service constitutes deficiency in service entitling full restitution with interest.`,
  },
  {
    id: 'prayer',
    title: 'Prayer Clause',
    icon: 'balance',
    content: `PRAYER

In view of the foregoing facts and circumstances, the Complainant most respectfully prays that this Hon'ble District Consumer Disputes Redressal Commission may be pleased to:

(a) Direct the Opposite Party to pay Rs. 29,491.84 (Rupees Twenty-Nine Thousand Four Hundred and Ninety-One and Paise Eighty-Four) towards total restitution;

(b) Direct the Opposite Party to pay further interest @ 9% per annum on the principal amount of Rs. 12,499 from the date of payment till actual realization;

(c) Direct the Opposite Party to pay costs of this litigation;

(d) Pass such other and further orders as this Hon'ble Commission may deem fit and proper in the facts and circumstances of this case.`,
  },
  {
    id: 'affidavit',
    title: 'Verification Affidavit',
    icon: 'verified_user',
    content: `VERIFICATION AFFIDAVIT
(On Solemn Affirmation — Order XIX CPC Norms)

I, [Full Name], the Complainant herein, do hereby solemnly affirm and state on oath as follows:

1. That I am the Complainant in the above case and am fully conversant with the facts of this case.

2. That the facts stated in the foregoing complaint are true and correct to the best of my knowledge and belief.

3. That no part of the complaint is false and nothing material has been concealed therefrom.

DEPONENT: [Full Name]
DATE: [Current Date]
PLACE: [City], [State]

VERIFIED at [City] on this ___ day of _____, 2026.
Solemnly affirmed before me.`,
  },
];

export default function PetitionPage() {
  const store = useCaseStore();
  const [activeSection, setActiveSection] = useState('index');
  const [isExporting, setIsExporting] = useState(false);

  const activeContent = PETITION_SECTIONS.find((s) => s.id === activeSection);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.location.href = '/submission';
    }, 2000);
  };

  return (
    <div className="flex h-screen w-full">
      <SideNavBar />
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header caseTitle="Screen 6: Court Petition Builder (e-Daakhil)" caseRef={store.caseRef} onDownload={handleExport} />

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Section navigator + content */}
          <div className="flex-1 md:w-[60%] flex flex-col overflow-hidden md:border-r border-glass-stroke">
            {/* Section tabs */}
            <div className="overflow-x-auto border-b border-glass-stroke glass/30 flex-shrink-0">
              <div className="flex items-center gap-1 px-4 py-2 min-w-max">
                {PETITION_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      activeSection === sec.id
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant hover:bg-primary/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">{sec.icon}</span>
                    {sec.title.split('&')[0].split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Section content */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
              {activeContent && (
                <div className="max-w-2xl mx-auto animate-fade-up">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[20px]">{activeContent.icon}</span>
                    </div>
                    <h2 className="text-lg font-bold text-on-surface">{activeContent.title}</h2>
                    <span className="ml-auto badge badge-success">Agent 4 Drafted</span>
                  </div>

                  <div className="glass rounded-2xl p-7 shadow-glass-sm">
                    <pre className="legal-prose whitespace-pre-wrap font-body text-xs leading-[1.9] text-on-surface">
                      {activeContent.content}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom action bar */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-glass-stroke glass/40">
              <div className="max-w-2xl mx-auto flex gap-3">
                <button
                  onClick={handleExport}
                  className="btn-primary flex-1"
                >
                  {isExporting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-on-primary/30 border-t-on-primary animate-spin" />
                      Compiling PDF Bundle...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                      Export PDF Bundle ({'<'}25MB)
                    </>
                  )}
                </button>
                <Link href="/tracker" className="btn-secondary">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Petition overview */}
          <div className="hidden md:flex flex-col w-[40%] h-full bg-surface-variant/8 overflow-y-auto p-6 space-y-4">
            {/* Packet overview */}
            <div className="glass rounded-2xl p-5 shadow-glass-sm animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-[18px]">folder_open</span>
                <h3 className="text-sm font-bold text-on-surface">Petition Packet</h3>
                <span className="ml-auto badge badge-success">Agent 5 ✓</span>
              </div>
              <div className="space-y-2">
                {PETITION_SECTIONS.map((sec, i) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      activeSection === sec.id ? 'bg-primary/8 border border-primary/15' : 'hover:bg-surface-variant/30'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined filled text-success text-[12px]">check</span>
                    </div>
                    <span className={`text-xs font-medium flex-1 text-left ${activeSection === sec.id ? 'text-primary font-bold' : 'text-on-surface'}`}>
                      {i + 1}. {sec.title}
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[14px]">chevron_right</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filing guide */}
            <div className="glass rounded-2xl p-5 shadow-glass-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-[18px]">upload</span>
                <h3 className="text-sm font-bold text-on-surface">e-Daakhil Filing Summary</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-glass-stroke">
                  <span className="text-on-surface-variant">Portal</span>
                  <a href="https://edaakhil.nic.in" target="_blank" rel="noreferrer" className="text-primary font-semibold underline">edaakhil.nic.in</a>
                </div>
                <div className="flex justify-between py-1.5 border-b border-glass-stroke">
                  <span className="text-on-surface-variant">Forum</span>
                  <span className="font-semibold text-on-surface">District Commission</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-glass-stroke">
                  <span className="text-on-surface-variant">Court Fee</span>
                  <span className="font-bold text-success">₹0 (NIL)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-glass-stroke">
                  <span className="text-on-surface-variant">Max File Size</span>
                  <span className="font-semibold text-on-surface">25 MB</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-on-surface-variant">Expected Timeline</span>
                  <span className="font-semibold text-on-surface">6–18 months</span>
                </div>
              </div>
            </div>

            <Link href="/submission" className="btn-primary w-full">
              <span className="material-symbols-outlined text-[18px]">send</span>
              View Submission Guide
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
