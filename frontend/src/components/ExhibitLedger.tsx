'use client';
import React from 'react';

interface Exhibit {
  exhibit_id: string;
  file_name: string;
  doc_type: string;
  timestamp: string;
  amount: number;
  is_pii_redacted: boolean;
}

interface ExhibitLedgerProps {
  exhibits: Exhibit[];
  onRemove?: (id: string) => void;
}

const DOC_ICONS: Record<string, string> = {
  Invoice: 'receipt_long',
  'Tax Invoice': 'receipt_long',
  WhatsApp: 'chat',
  Email: 'email',
  'Bank Receipt': 'account_balance',
  SpeedPost: 'local_post_office',
  SMS: 'sms',
  default: 'description',
};

export default function ExhibitLedger({ exhibits = [], onRemove }: ExhibitLedgerProps) {
  if (exhibits.length === 0) {
    return (
      <div className="glass rounded-2xl p-5 shadow-glass-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-[18px]">folder_open</span>
          <h3 className="text-sm font-bold text-on-surface">Exhibit Ledger</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-surface-variant/50 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-on-surface-variant text-[22px]">attach_file</span>
          </div>
          <p className="text-xs font-semibold text-on-surface-variant">No exhibits uploaded yet</p>
          <p className="text-[11px] text-on-surface-variant opacity-60 mt-1">
            Upload invoices, chats, or receipts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5 shadow-glass-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[18px]">folder_open</span>
        <h3 className="text-sm font-bold text-on-surface">Exhibit Ledger</h3>
        <span className="ml-auto badge badge-primary">{exhibits.length} docs</span>
      </div>

      <div className="space-y-2">
        {exhibits.map((ex, i) => {
          const icon = DOC_ICONS[ex.doc_type] || DOC_ICONS.default;
          return (
            <div
              key={ex.exhibit_id}
              className="exhibit-item group animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center border border-glass-stroke flex-shrink-0 group-hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined text-primary text-[16px]">{icon}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    {ex.exhibit_id}
                  </span>
                  {ex.is_pii_redacted && (
                    <span className="badge badge-success text-[9px] py-0">PII ✓</span>
                  )}
                </div>
                <p className="text-xs font-semibold text-on-surface truncate">{ex.file_name}</p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  {ex.doc_type}
                  {ex.amount > 0 && (
                    <span className="ml-2 font-semibold text-primary">
                      ₹{ex.amount.toLocaleString('en-IN')}
                    </span>
                  )}
                </p>
              </div>

              {/* Remove */}
              {onRemove && (
                <button
                  onClick={() => onRemove(ex.exhibit_id)}
                  className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-all flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Total Value */}
      {exhibits.some((e) => e.amount > 0) && (
        <div className="mt-4 pt-4 border-t border-glass-stroke flex items-center justify-between">
          <span className="text-xs text-on-surface-variant font-medium">Total Consideration</span>
          <span className="text-sm font-extrabold text-primary">
            ₹
            {exhibits
              .reduce((sum, e) => sum + e.amount, 0)
              .toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}
    </div>
  );
}
