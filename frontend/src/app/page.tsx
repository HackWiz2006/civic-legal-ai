import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lexis Counsel — Civic & Legal AI for Indian Citizens',
  description:
    'Navigate consumer disputes, RTI petitions, and regulatory ombudsmen with AI-powered legal assistance grounded in Indian Bare Acts.',
};

const FEATURES = [
  {
    icon: 'gavel',
    title: 'Multi-Agent Legal Engine',
    desc: '5 specialized AI agents handle evidence, research, drafting, and red-team auditing — deterministically.',
  },
  {
    icon: 'task_alt',
    title: 'Zero-Trip Readiness Meter',
    desc: 'Know exactly which documents are missing before stepping into any court or tribunal.',
  },
  {
    icon: 'edit_document',
    title: 'Court-Ready Documents',
    desc: 'Auto-generates 15-day legal notices and e-Daakhil petition packets with statutory citations.',
  },
  {
    icon: 'shield',
    title: 'Airtight PII Protection',
    desc: 'Aadhaar, card numbers, OTPs redacted before any AI processing. Session purge on demand.',
  },
  {
    icon: 'translate',
    title: '10+ Indian Languages',
    desc: 'Narrate your dispute in Hindi, Kannada, Tamil, Telugu, Bengali, Marathi, and more.',
  },
  {
    icon: 'balance',
    title: 'Statutory Grounding Only',
    desc: 'Strictly cited to CPA 2019, RTI 2005, IT Act 2000, DGCA CAR, and RBI Ombudsman Scheme.',
  },
];

const FORUMS = [
  { name: 'National Consumer Helpline', dial: '1915', color: '#1a6e2e' },
  { name: 'RBI Integrated Ombudsman', dial: 'CMS', color: '#903f00' },
  { name: 'District Consumer Commission', dial: 'e-Daakhil', color: '#b45309' },
  { name: 'RTI Online Portal', dial: '₹10', color: '#575754' },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto">
      {/* ── Top Nav ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 glass-strong border-b border-glass-stroke">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center shadow-primary-sm">
            <span className="material-symbols-outlined filled text-on-primary text-[20px]">balance</span>
          </div>
          <div>
            <span className="font-headline font-bold text-primary text-[16px] leading-tight block">Lexis Counsel</span>
            <span className="text-[10px] text-on-surface-variant block">Civic Legal AI • India</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/workspace" className="hidden sm:block text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
            Workspace
          </Link>
          <Link href="/intake" className="btn-primary text-sm px-5 py-2.5">
            Start Intake
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/15 mb-8 animate-fade-up">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-semibold text-primary">Party-in-Person Empowerment Platform</span>
          <span className="text-xs text-on-surface-variant">• CPA 2019 • RTI 2005 • IT Act 2000</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface leading-tight tracking-tight mb-6 animate-fade-up max-w-4xl" style={{ animationDelay: '100ms' }}>
          Fight Back Against
          <br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #903f00 0%, #fe932c 50%, #b45309 100%)' }}>
            Corporate Negligence
          </span>
          <br />
          With Indian Law.
        </h1>

        {/* Subhead */}
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: '200ms' }}>
          Autonomous multi-agent AI that transforms your consumer dispute into court-ready legal documents — grounded in Indian Bare Acts, zero legal jargon, fully free.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <Link href="/intake" className="btn-primary text-base px-8 py-4 shadow-btn animate-pulse-amber">
            <span className="material-symbols-outlined text-[22px]">play_arrow</span>
            Start Intake Now — Free
          </Link>
          <Link href="/workspace" className="btn-secondary text-base px-8 py-4">
            <span className="material-symbols-outlined text-[20px]">preview</span>
            See the Workspace
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-xs text-on-surface-variant/60 animate-fade-up" style={{ animationDelay: '400ms' }}>
          No registration required • Aadhaar & PII never stored • Incognito session purge
        </p>
      </section>

      {/* ── 5-Agent Flow Visual ── */}
      <section className="px-6 md:px-16 py-12 bg-surface-variant/15 border-y border-glass-stroke">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-on-surface mb-2">
            5-Agent Deterministic Pipeline
          </h2>
          <p className="text-center text-sm text-on-surface-variant mb-10">
            Your dispute flows through specialized AI agents — each with a statutory mandate.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { n: 1, label: 'Evidence OCR & Exhibit Indexer', icon: 'document_scanner', color: '#903f00' },
              { n: 2, label: 'Statutory RAG & Jurisdiction', icon: 'library_books', color: '#b45309' },
              { n: 3, label: '4-Part Damages Calculator', icon: 'calculate', color: '#904d00' },
              { n: 4, label: 'Legal Drafter (Tier 1 & 2)', icon: 'edit_document', color: '#575754' },
              { n: 5, label: 'Red-Team QA Auditor', icon: 'verified_user', color: '#1a6e2e' },
            ].map((agent, i) => (
              <div key={agent.n} className="flex items-center gap-2">
                <div className="glass rounded-2xl p-4 text-center w-40 hover:shadow-glass-md transition-shadow animate-fade-up cursor-default"
                  style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${agent.color}15` }}>
                    <span className="material-symbols-outlined text-[22px]" style={{ color: agent.color }}>{agent.icon}</span>
                  </div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider mb-1" style={{ color: agent.color }}>
                    Agent {agent.n}
                  </p>
                  <p className="text-xs font-medium text-on-surface leading-snug">{agent.label}</p>
                </div>
                {i < 4 && (
                  <span className="material-symbols-outlined text-outline text-[20px] hidden sm:block">arrow_forward</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-on-surface mb-2">
            Everything You Need. Nothing You Don't.
          </h2>
          <p className="text-center text-sm text-on-surface-variant mb-12">
            Built for Indian citizens navigating procedural complexity alone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 hover:shadow-glass-md transition-all hover:-translate-y-1 animate-fade-up cursor-default"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-[22px]">{f.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-on-surface mb-2">{f.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Forum Comparison ── */}
      <section className="px-6 md:px-16 py-12 bg-surface-variant/15 border-y border-glass-stroke">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-on-surface mb-2">Choose Your Dispute Path</h2>
          <p className="text-sm text-on-surface-variant mb-8">We analyze your case and recommend the optimal forum.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FORUMS.map((f, i) => (
              <div key={i} className="glass rounded-2xl p-4 text-center animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${f.color}15` }}>
                  <span className="text-sm font-extrabold" style={{ color: f.color }}>{f.dial}</span>
                </div>
                <p className="text-xs font-semibold text-on-surface leading-snug">{f.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-6 md:px-16 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-4">
            Your Rights. Your Voice.
            <br />
            <span className="text-primary">Your Justice.</span>
          </h2>
          <p className="text-base text-on-surface-variant mb-8">
            Start your intake in under 2 minutes. No login, no fees, no legal jargon.
          </p>
          <Link href="/intake" className="btn-primary text-base px-10 py-4 shadow-btn inline-flex">
            <span className="material-symbols-outlined text-[22px]">gavel</span>
            Begin My Case — Free
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-glass-stroke px-6 py-6 text-center">
        <p className="text-xs text-on-surface-variant/60">
          Lexis Counsel operates as an algorithmic procedural assistant under Section 35(1) of the Consumer Protection Act, 2019. Not a substitute for licensed Advocate-on-Record representation.
        </p>
      </footer>
    </div>
  );
}
