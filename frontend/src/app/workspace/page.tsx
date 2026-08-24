'use client';
import React, { useState, useRef, useEffect } from 'react';
import SideNavBar from '@/components/SideNavBar';
import Header from '@/components/Header';
import ContextPanel from '@/components/ContextPanel';
import ChatMessageCard from '@/components/ChatMessageCard';
import EmergencyBanner from '@/components/EmergencyBanner';
import { useCaseStore } from '@/lib/store';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'mr', label: 'मराठी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'ml', label: 'മലയാളം' },
];

const WELCOME_MESSAGES = [
  {
    id: 'welcome-1',
    sender: 'assistant' as const,
    content:
      'Welcome to Lexis Counsel. I am your autonomous legal procedural assistant, grounded exclusively in Indian Bare Acts and verified regulatory circulars. Please narrate what happened to you — what did the company/service provider do or fail to do?',
    analysisText:
      'Your narrative will be processed by Agent 1 (PII Sanitizer) before any analysis. Aadhaar numbers, card details, and OTPs are automatically redacted.',
  },
];

export default function WorkspacePage() {
  const store = useCaseStore();
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messages = store.messages.length > 0 ? store.messages : WELCOME_MESSAGES;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, store.isLoading]);

  const handleTextareaResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setInputText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    store.addMessage({ sender: 'user', content: userMsg });
    store.setNarrative(userMsg);
    store.setLoading(true, 'Analyzing your narrative...');

    // Simulate agent response (replace with actual API call)
    setTimeout(() => {
      store.setLoading(false);
      store.addMessage({
        sender: 'assistant',
        content:
          'I have processed your narrative. Based on the facts provided, I can identify a potential deficiency in service under Section 2(11) of the Consumer Protection Act, 2019. The key elements are present: a consumer-business relationship, paid consideration, and a failure to deliver the promised service.',
        statuteQuote:
          '"Deficiency" means any fault, imperfection, shortcoming or inadequacy in the quality, nature and manner of performance which is required to be maintained by or under any law for the time being in force — Section 2(11), CPA 2019.',
        analysisText:
          'The Opposite Party\'s conduct constitutes both "Deficiency in Service" and "Unfair Trade Practice" u/s 2(47) CPA 2019. Pecuniary jurisdiction falls under the District Consumer Commission (consideration ≤ ₹50L).',
        precedentName: 'Wg. Cdr. Arifur Rahman Khan v. DLF Southern Homes (2020) 16 SCC 512',
        precedentUrl: 'https://indiankanoon.org/doc/120098448/',
        toolActions: [
          {
            label: 'Proceed to Evidence Upload',
            icon: 'attach_file',
            primary: true,
            onClick: () => (window.location.href = '/evidence'),
          },
          {
            label: 'Cite More Case Law',
            icon: 'library_books',
            onClick: () => {},
          },
          {
            label: 'Run Red-Team Audit',
            icon: 'verified_user',
            onClick: () => {},
          },
        ],
      });
      store.setReadiness(30, ['Valid Invoice / Payment Receipt', 'Proof of Written Grievance']);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen w-full">
      <SideNavBar />

      <main className="flex-1 flex flex-col h-full min-w-0">
        <Header
          caseTitle="Grievance Setup: Consumer Dispute"
          caseRef={store.caseRef}
        />

        {/* Emergency Banner */}
        {store.isEmergency && store.emergencyType && (
          <div className="px-6 pt-4">
            <EmergencyBanner
              type={store.emergencyType}
              onDismiss={() => store.setEmergency(null)}
            />
          </div>
        )}

        {/* 60/40 Split */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* ── Left Pane: Chat (60%) ── */}
          <div className="flex-1 md:w-[60%] flex flex-col h-full md:border-r border-glass-stroke">
            {/* Language Selector */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-glass-stroke bg-surface-variant/10">
              <span className="material-symbols-outlined text-primary text-[16px]">translate</span>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="text-xs font-semibold text-primary bg-transparent border-none outline-none cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
              <span className="ml-auto text-[10px] text-on-surface-variant/60">
                PII sanitization active
              </span>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
              <div className="max-w-3xl mx-auto flex flex-col gap-2">
                {messages.map((msg, i) => (
                  <ChatMessageCard key={msg.id || i} {...msg} />
                ))}
                {store.isLoading && (
                  <ChatMessageCard sender="assistant" content="" isLoading />
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* ── Bottom Input Bar ── */}
            <div className="flex-shrink-0 w-full pt-2 pb-4 px-4 md:px-8"
              style={{ background: 'linear-gradient(to top, #fdfaf1 80%, transparent)' }}>
              <div className="max-w-3xl mx-auto">
                <div className="glass rounded-2xl border-b-2 border-outline-variant focus-within:border-primary shadow-input transition-all flex items-end px-3 py-2 gap-2">
                  {/* Attach */}
                  <label className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">attach_file</span>
                    <input type="file" className="hidden" multiple accept=".pdf,.png,.jpg,.jpeg,.eml" />
                  </label>

                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => { setInputText(e.target.value); handleTextareaResize(); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Narrate what happened — in any Indian language..."
                    className="input-field flex-1 py-2 max-h-[160px] min-h-[44px]"
                    rows={1}
                  />

                  {/* Voice */}
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                      isRecording
                        ? 'bg-error text-on-error animate-pulse-amber'
                        : 'text-on-surface-variant hover:text-primary hover:bg-primary/10'
                    }`}
                    title={isRecording ? 'Stop recording' : 'Record voice'}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isRecording ? 'stop_circle' : 'mic'}
                    </span>
                  </button>

                  {/* Send */}
                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim() || store.isLoading}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-primary text-on-primary hover:bg-primary-container transition-all flex-shrink-0 shadow-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined filled text-[18px]">send</span>
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-[10px] text-on-surface-variant/50 mt-2 px-4">
                  AI procedural assistance grounded in Indian Bare Acts. Verified counsel review available u/s 35(1) CPA 2019.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right Pane: Context (40%) ── */}
          <ContextPanel
            currentStep={store.currentStep}
            readinessScore={store.readinessScore}
            daysRemaining={store.daysRemaining}
            exhibits={store.exhibits}
          />
        </div>

        {/* ── Mobile Bottom Tabs ── */}
        <div className="md:hidden flex border-t border-glass-stroke glass" style={{ height: 56 }}>
          {[
            { icon: 'chat', label: 'Chat', href: '/workspace' },
            { icon: 'analytics', label: 'Context', href: '#' },
            { icon: 'folder', label: 'Exhibits', href: '/evidence' },
          ].map((tab) => (
            <button key={tab.label} className="mobile-tab">
              <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
