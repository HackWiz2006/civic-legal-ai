'use client';
import React from 'react';

type EmergencyType = 'cyber_fraud' | 'medical_negligence' | 'tenancy' | null;

interface EmergencyBannerProps {
  type: EmergencyType;
  onDismiss?: () => void;
}

const EMERGENCY_CONFIG = {
  cyber_fraud: {
    icon: 'security',
    title: 'Cyber / Banking Fraud Detected',
    severity: 'critical',
    steps: [
      'Call 1930 (National Cyber Crime Reporting Portal) immediately',
      'Contact your bank to freeze the account under RBI Zero Liability Rules',
      'File at cybercrime.gov.in within 24 hours',
      'Request account freeze letter (auto-generated below)',
    ],
    ctaLabel: 'Generate Account Freeze Letter',
    ctaIcon: 'document_scanner',
    links: [
      { label: 'cybercrime.gov.in', href: 'https://cybercrime.gov.in/' },
      { label: 'RBI Zero Liability Rules', href: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11040&Mode=0' },
    ],
  },
  medical_negligence: {
    icon: 'medical_services',
    title: 'Medical Negligence Case',
    severity: 'warning',
    steps: [
      'Expert medical opinion required per Jacob Mathew v. State of Punjab (2005) 6 SCC 1',
      'Consult a certified Medico-Legal Counsel before filing',
      'Obtain IMA or State Medical Council certified opinion',
      'This case type has special evidentiary requirements',
    ],
    ctaLabel: 'Find Medico-Legal Counsel',
    ctaIcon: 'person_search',
    links: [
      { label: 'District Legal Services Authority (DLSA)', href: '#' },
    ],
  },
  tenancy: {
    icon: 'home',
    title: 'Tenancy / Eviction Matter',
    severity: 'warning',
    steps: [
      'This matter falls under Rent Control Act / Civil Court exclusive jurisdiction',
      'Consumer Commission cannot adjudicate pure tenancy disputes',
      'Contact District Legal Services Authority (DLSA) for emergency legal aid',
      'Seek interim stay from Civil Court if facing immediate eviction',
    ],
    ctaLabel: 'Contact DLSA',
    ctaIcon: 'gavel',
    links: [
      { label: 'DLSA Emergency Legal Aid', href: '#' },
    ],
  },
};

export default function EmergencyBanner({ type, onDismiss }: EmergencyBannerProps) {
  if (!type || !EMERGENCY_CONFIG[type]) return null;

  const config = EMERGENCY_CONFIG[type];
  const isCritical = config.severity === 'critical';

  return (
    <div
      className={`rounded-2xl border-l-4 p-5 animate-fade-up shadow-glass-sm ${
        isCritical
          ? 'bg-error/5 border-error'
          : 'bg-secondary-container/8 border-secondary-container'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isCritical ? 'bg-error/15' : 'bg-secondary-container/20'
            }`}
          >
            <span
              className={`material-symbols-outlined filled text-[22px] ${
                isCritical ? 'text-error animate-pulse' : 'text-on-secondary-container'
              }`}
            >
              {config.icon}
            </span>
          </div>
          <div>
            <p
              className={`text-sm font-bold ${isCritical ? 'text-error' : 'text-on-secondary-container'}`}
            >
              {config.title}
            </p>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {isCritical ? '⚠️ Immediate action required' : 'Special handling required'}
            </p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Urgent call-out for cyber fraud */}
      {type === 'cyber_fraud' && (
        <div className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-error text-on-error">
          <span className="material-symbols-outlined filled text-[22px]">call</span>
          <div>
            <p className="text-sm font-extrabold tracking-wider">CALL 1930 NOW</p>
            <p className="text-xs opacity-80">National Cyber Crime Reporting Helpline</p>
          </div>
        </div>
      )}

      {/* Steps */}
      <ul className="space-y-2 mb-4">
        {config.steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-on-surface leading-relaxed">
            <span
              className={`text-[13px] font-bold flex-shrink-0 mt-0.5 ${isCritical ? 'text-error' : 'text-secondary-container'}`}
            >
              {i + 1}.
            </span>
            {step}
          </li>
        ))}
      </ul>

      {/* Links */}
      <div className="flex flex-wrap gap-2 mb-4">
        {config.links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-outline text-[11px]"
          >
            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button className={isCritical ? 'btn-primary text-sm' : 'btn-secondary text-sm'}>
        <span className="material-symbols-outlined text-[16px]">{config.ctaIcon}</span>
        {config.ctaLabel}
      </button>
    </div>
  );
}
