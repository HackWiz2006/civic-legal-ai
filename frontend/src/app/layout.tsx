import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Lexis Counsel — AI Legal Consultant | CivicLegal-AI India',
  description:
    'Autonomous Multi-Agent Civic & Legal Empowerment Platform. Navigate Indian consumer disputes, RTI petitions, and regulatory ombudsmen without legal jargon.',
  keywords: [
    'consumer protection india',
    'legal notice generator',
    'e-daakhil',
    'consumer court',
    'RTI petition',
    'CPA 2019',
    'legal AI india',
  ],
  authors: [{ name: 'Lexis Counsel' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Lexis Counsel — AI Legal Consultant',
    description: 'Empowering Indian citizens with autonomous multi-agent legal assistance.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#903f00',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-parchment-surface text-on-surface font-body antialiased overflow-hidden h-screen">
        {/* ── Ambient Golden Hour Background Glows ── */}
        <div className="ambient-glow-top-right" aria-hidden="true" />
        <div className="ambient-glow-bottom-left" aria-hidden="true" />

        {/* ── App Root ── */}
        <div className="flex h-screen relative z-10 w-full max-w-[1440px] mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
