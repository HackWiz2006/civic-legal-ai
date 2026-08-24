'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SideNavBar from '@/components/SideNavBar';
import Header from '@/components/Header';
import EmergencyBanner from '@/components/EmergencyBanner';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
];

const DISPUTE_TYPES = [
  { icon: 'flight_takeoff', label: 'Airline / Travel', type: 'airline' },
  { icon: 'shopping_cart', label: 'E-Commerce / Online', type: 'ecommerce' },
  { icon: 'account_balance', label: 'Banking / Finance', type: 'banking' },
  { icon: 'phone_android', label: 'Telecom / Mobile', type: 'telecom' },
  { icon: 'home', label: 'Real Estate', type: 'realestate' },
  { icon: 'medical_services', label: 'Healthcare', type: 'medical' },
  { icon: 'local_shipping', label: 'Logistics / Delivery', type: 'logistics' },
  { icon: 'info', label: 'Other', type: 'other' },
];

export default function IntakePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedType, setSelectedType] = useState('');
  const [narrative, setNarrative] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [step, setStep] = useState<'lang' | 'type' | 'narrate'>('lang');

  return (
    <div className="flex h-screen w-full">
      <SideNavBar />
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header caseTitle="Screen 1: Narrative Intake & Triage" caseRef="NEW" />

        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-10">
          <div className="max-w-2xl mx-auto">
            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-10 animate-fade-up">
              {(['lang', 'type', 'narrate'] as const).map((s, i) => (
                <React.Fragment key={s}>
                  <div
                    className={`flex items-center gap-2 cursor-pointer`}
                    onClick={() => s !== 'narrate' && setStep(s)}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === s
                          ? 'bg-primary text-on-primary shadow-primary-sm'
                          : ['lang', 'type'].indexOf(s) < ['lang', 'type', 'narrate'].indexOf(step)
                          ? 'bg-success/20 text-success'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      {['lang', 'type'].indexOf(s) < ['lang', 'type', 'narrate'].indexOf(step) ? (
                        <span className="material-symbols-outlined filled text-[13px]">check</span>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${step === s ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {s === 'lang' ? 'Language' : s === 'type' ? 'Dispute Type' : 'Narrate'}
                    </span>
                  </div>
                  {i < 2 && <div className="flex-1 h-px bg-glass-stroke" />}
                </React.Fragment>
              ))}
            </div>

            {/* ── Step 1: Language ── */}
            {step === 'lang' && (
              <div className="animate-fade-up">
                <h1 className="text-2xl font-bold text-on-surface mb-2">Select Your Language</h1>
                <p className="text-sm text-on-surface-variant mb-8">
                  Narrate your dispute in any language. We'll translate and structure it.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang.code)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        selectedLang === lang.code
                          ? 'bg-primary/8 border-primary/30 shadow-primary-sm'
                          : 'glass border-glass-stroke hover:bg-primary/4'
                      }`}
                    >
                      <p className="text-lg font-bold text-on-surface mb-1">{lang.native}</p>
                      <p className="text-xs text-on-surface-variant">{lang.label}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep('type')}
                  className="btn-primary w-full"
                >
                  Continue
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            )}

            {/* ── Step 2: Dispute Type ── */}
            {step === 'type' && (
              <div className="animate-fade-up">
                <h1 className="text-2xl font-bold text-on-surface mb-2">What's Your Dispute About?</h1>
                <p className="text-sm text-on-surface-variant mb-8">
                  Select the category that best describes your issue.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {DISPUTE_TYPES.map((dt) => (
                    <button
                      key={dt.type}
                      onClick={() => setSelectedType(dt.type)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        selectedType === dt.type
                          ? 'bg-primary/8 border-primary/30 shadow-primary-sm'
                          : 'glass border-glass-stroke hover:bg-primary/4'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[28px] mb-2 block ${selectedType === dt.type ? 'text-primary filled' : 'text-on-surface-variant'}`}>
                        {dt.icon}
                      </span>
                      <p className="text-xs font-semibold text-on-surface">{dt.label}</p>
                    </button>
                  ))}
                </div>

                {/* Emergency check */}
                {(selectedType === 'banking') && (
                  <EmergencyBanner type="cyber_fraud" />
                )}
                {selectedType === 'medical' && (
                  <EmergencyBanner type="medical_negligence" />
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep('lang')} className="btn-secondary flex-1">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Back
                  </button>
                  <button
                    onClick={() => setStep('narrate')}
                    disabled={!selectedType}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    Continue
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Narrate ── */}
            {step === 'narrate' && (
              <div className="animate-fade-up">
                <h1 className="text-2xl font-bold text-on-surface mb-2">What Happened to You?</h1>
                <p className="text-sm text-on-surface-variant mb-2">
                  Describe the incident in detail — dates, amounts, what was promised, what was delivered.
                </p>
                <div className="flex items-center gap-2 mb-6 p-2.5 rounded-xl bg-success/5 border border-success/20">
                  <span className="material-symbols-outlined text-success text-[16px]">security</span>
                  <p className="text-xs text-success font-medium">
                    PII Sanitization Active: Aadhaar, card numbers, OTPs will be automatically redacted before processing.
                  </p>
                </div>

                {/* Text input */}
                <div className="glass rounded-2xl border-2 border-outline-variant focus-within:border-primary transition-all shadow-input p-5 mb-4">
                  <textarea
                    value={narrative}
                    onChange={(e) => setNarrative(e.target.value)}
                    placeholder="E.g., On 15 January 2026, I purchased flight tickets (Booking Ref: XXX) from IndiGo Airlines for Rs. 12,499. On 14 January, the airline cancelled my flight without any prior notice or alternate arrangement..."
                    className="input-field w-full resize-none"
                    rows={8}
                  />
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-glass-stroke">
                    <span className="text-xs text-on-surface-variant">{narrative.length} characters</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`pill ${isRecording ? 'pill-primary bg-error' : 'pill-outline'}`}
                      >
                        <span className="material-symbols-outlined text-[14px]">{isRecording ? 'stop_circle' : 'mic'}</span>
                        {isRecording ? 'Stop Recording' : 'Record Voice'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep('type')} className="btn-secondary">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Back
                  </button>
                  <Link
                    href="/evidence"
                    className={`btn-primary flex-1 ${!narrative.trim() ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    Proceed to Evidence Upload
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
