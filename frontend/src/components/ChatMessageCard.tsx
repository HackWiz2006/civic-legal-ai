'use client';
import React from 'react';

interface ToolAction {
  label: string;
  icon: string;
  primary?: boolean;
  onClick: () => void;
}

interface ChatMessageProps {
  sender: 'user' | 'assistant';
  content: string;
  statuteQuote?: string;
  analysisText?: string;
  precedentName?: string;
  precedentUrl?: string;
  toolActions?: ToolAction[];
  isLoading?: boolean;
  timestamp?: string;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 p-6">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-primary-sm flex-shrink-0">
        <span className="material-symbols-outlined filled text-on-primary text-[16px]">balance</span>
      </div>
      <div className="glass-sm rounded-2xl rounded-tl-sm px-5 py-4">
        <div className="typing-indicator flex items-center gap-1">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default function ChatMessageCard({
  sender,
  content,
  statuteQuote,
  analysisText,
  precedentName,
  precedentUrl,
  toolActions = [],
  isLoading = false,
  timestamp,
}: ChatMessageProps) {
  if (isLoading) return <TypingIndicator />;

  // ── User Message ──────────────────────────────────────────
  if (sender === 'user') {
    return (
      <div className="flex flex-col items-end w-full mb-6 chat-message">
        <span className="text-[11px] font-semibold text-on-surface-variant mb-1.5 mr-2 uppercase tracking-wide">
          You {timestamp && <span className="font-normal normal-case tracking-normal opacity-60 ml-1">{timestamp}</span>}
        </span>
        <div className="bg-surface-variant/50 rounded-[20px] rounded-tr-sm px-5 py-4 max-w-[80%] text-on-surface text-sm leading-relaxed shadow-sm border border-glass-stroke/50">
          {content}
        </div>
      </div>
    );
  }

  // ── AI Consultant Message ─────────────────────────────────
  return (
    <div className="flex flex-col items-start w-full mb-8 chat-message">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-2 ml-1">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-primary-sm">
          <span className="material-symbols-outlined filled text-[16px]">balance</span>
        </div>
        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
          Lexis Counsel
          {timestamp && (
            <span className="text-on-surface-variant font-normal normal-case tracking-normal opacity-60 ml-2">
              {timestamp}
            </span>
          )}
        </span>
      </div>

      {/* Message Card */}
      <div className="ai-card p-6 md:p-7 max-w-[97%] w-full">
        <div className="space-y-4 text-on-surface text-sm leading-relaxed">
          {/* Main Content */}
          <p className="leading-[1.8]">{content}</p>

          {/* Statutory Blockquote */}
          {statuteQuote && (
            <blockquote className="statute-quote">
              "{statuteQuote}"
            </blockquote>
          )}

          {/* Analysis */}
          {analysisText && (
            <div className="bg-primary/4 rounded-xl p-4 border border-primary/10">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">analytics</span>
                Legal Analysis
              </p>
              <p className="text-sm text-on-surface leading-relaxed">{analysisText}</p>
            </div>
          )}

          {/* Precedent Reference */}
          {precedentName && precedentUrl && (
            <div className="flex items-start gap-3 bg-surface-variant/30 rounded-xl p-3 border border-glass-stroke">
              <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-glass-stroke flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[16px]">gavel</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-0.5">Supported by precedent</p>
                <a
                  href={precedentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:text-primary-container underline decoration-dotted transition-colors"
                >
                  {precedentName}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Tool Action Pills */}
        {toolActions.length > 0 && (
          <div className="mt-5 pt-4 border-t border-glass-stroke flex flex-wrap gap-2">
            {toolActions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className={action.primary ? 'pill-primary' : 'pill-outline'}
              >
                <span className="material-symbols-outlined text-[14px]">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
