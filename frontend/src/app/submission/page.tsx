import type { Metadata } from 'next';
import Link from 'next/link';
import SideNavBar from '@/components/SideNavBar';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Screen 7: Submission Guide — Lexis Counsel',
};

const STEPS = [
  {
    step: 1,
    icon: 'cloud_download',
    title: 'Download PDF Bundle',
    desc: 'Download the compiled petition bundle from Screen 6. Verify total file size is under 25MB.',
    action: { label: 'Download Bundle', href: '/petition' },
  },
  {
    step: 2,
    icon: 'person_add',
    title: 'Register on e-Daakhil Portal',
    desc: 'Visit edaakhil.nic.in and register as a Party-in-Person. Use your Aadhaar-linked mobile for OTP.',
    action: { label: 'Go to e-Daakhil', href: 'https://edaakhil.nic.in' },
  },
  {
    step: 3,
    icon: 'upload_file',
    title: 'Upload Petition Bundle',
    desc: 'Select "File New Consumer Complaint". Upload the PDF bundle (Index + All Sections + Exhibits).',
    action: null,
  },
  {
    step: 4,
    icon: 'payments',
    title: 'Pay Court Fee (if applicable)',
    desc: 'For claims under ₹5L, court fee is ₹0. For ₹5L–₹10L, pay ₹200 via net banking/UPI.',
    action: null,
  },
  {
    step: 5,
    icon: 'confirmation_number',
    title: 'Note Your Diary Number',
    desc: 'After successful submission, note the Diary Number. This is your case reference for all future hearings.',
    action: null,
  },
  {
    step: 6,
    icon: 'notifications',
    title: 'Track Hearing Dates',
    desc: 'Login to e-Daakhil regularly to check Next Date of Hearing (NDH). Respond to all system notifications promptly.',
    action: { label: 'eCourts NJDG', href: 'https://njdg.ecourts.gov.in/' },
  },
];

const TIPS = [
  'Keep physical copies of all documents. Bring originals on the first hearing date.',
  'The District Commission cannot charge any registration fee if you appear Party-in-Person.',
  'If the Opposite Party fails to appear, apply for an ex-parte order on Day 2.',
  'After order, if Opposite Party does not comply in 30 days, file an Execution Petition under Section 71 CPA 2019.',
  'You can file Execution Petition at the same District Commission — no separate fee for execution up to ₹5L.',
];

export default function SubmissionPage() {
  return (
    <div className="flex h-screen w-full">
      <SideNavBar />
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header caseTitle="Screen 7: Submission Guide & Diary Tracker" />

        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-10">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-10 animate-fade-up">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-primary">Step 7 of 7</span>
                <span className="badge badge-success">Final Step</span>
              </div>
              <h1 className="text-3xl font-extrabold text-on-surface mb-3">
                You're Ready to File.
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Follow these steps to submit your petition at the e-Daakhil Consumer Commission portal. Your rights are protected by the Consumer Protection Act, 2019.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-10">
              {STEPS.map((s, i) => (
                <div
                  key={s.step}
                  className="glass rounded-2xl p-6 shadow-glass-sm animate-fade-up hover:shadow-glass-md transition-shadow"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-primary-sm">
                      <span className="material-symbols-outlined filled text-on-primary text-[22px]">{s.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Step {s.step}</span>
                      </div>
                      <h3 className="text-base font-bold text-on-surface mb-1">{s.title}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                      {s.action && (
                        <a
                          href={s.action.href}
                          target={s.action.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-3 pill-outline text-xs"
                        >
                          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                          {s.action.label}
                        </a>
                      )}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-surface-variant/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-on-surface-variant">{s.step}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="glass rounded-2xl p-6 shadow-glass-sm mb-8 animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
                <h2 className="text-sm font-bold text-on-surface">Pro Tips for Party-in-Person</h2>
              </div>
              <ul className="space-y-3">
                {TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-on-surface-variant leading-relaxed">
                    <span className="text-primary font-extrabold flex-shrink-0 mt-0.5">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful links */}
            <div className="glass rounded-2xl p-6 shadow-glass-sm mb-8 animate-fade-up">
              <h2 className="text-sm font-bold text-on-surface mb-4">Useful Official Portals</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'e-Daakhil Filing Portal', href: 'https://edaakhil.nic.in', icon: 'gavel' },
                  { label: 'National Consumer Helpline (1915)', href: 'https://consumerhelpline.gov.in/', icon: 'call' },
                  { label: 'eCourts National Judicial Data Grid', href: 'https://njdg.ecourts.gov.in/', icon: 'account_balance' },
                  { label: 'DGCA Passenger Grievance Portal', href: 'https://dgca.gov.in/', icon: 'flight' },
                  { label: 'RBI Integrated Ombudsman (CMS)', href: 'https://rbi.org.in/commonman/English/scripts/OmbudsmanRBI.aspx', icon: 'account_balance_wallet' },
                  { label: 'RTI Online Portal', href: 'https://rtionline.gov.in/', icon: 'info' },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl glass border border-glass-stroke hover:border-primary/20 hover:bg-primary/4 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <span className="material-symbols-outlined text-primary text-[16px]">{link.icon}</span>
                    </div>
                    <span className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">{link.label}</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[14px] ml-auto">open_in_new</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Final actions */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up">
              <Link href="/petition" className="btn-secondary flex-1">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Back to Petition Builder
              </Link>
              <Link href="/" className="btn-primary flex-1">
                <span className="material-symbols-outlined filled text-[18px]">home</span>
                Start New Case
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 rounded-xl bg-surface-variant/20 border border-glass-stroke text-center animate-fade-up">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Lexis Counsel operates as an algorithmic procedural assistant pursuant to Section 35(1) of the Consumer Protection Act, 2019. This platform does not provide legal representation in court. For complex cases, engagement of a licensed Advocate-on-Record is recommended.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
