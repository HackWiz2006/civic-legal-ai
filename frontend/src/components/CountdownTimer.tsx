'use client';
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  dispatchDate?: string; // ISO date string
  totalDays?: number;
  onExpired?: () => void;
}

const RING_CIRCUMFERENCE = 2 * Math.PI * 38;

export default function CountdownTimer({
  dispatchDate,
  totalDays = 15,
  onExpired,
}: CountdownTimerProps) {
  const [daysRemaining, setDaysRemaining] = useState(totalDays);
  const [isExpired, setIsExpired] = useState(false);
  const [isActive, setIsActive] = useState(!!dispatchDate);

  useEffect(() => {
    if (!dispatchDate) return;

    const calculate = () => {
      const dispatch = new Date(dispatchDate);
      const deadline = new Date(dispatch);
      deadline.setDate(deadline.getDate() + totalDays);
      const now = new Date();
      const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (diff <= 0) {
        setDaysRemaining(0);
        setIsExpired(true);
        onExpired?.();
      } else {
        setDaysRemaining(Math.min(diff, totalDays));
        setIsActive(true);
      }
    };

    calculate();
    const interval = setInterval(calculate, 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatchDate, totalDays, onExpired]);

  const progress = isActive ? (daysRemaining / totalDays) : 1;
  const dashOffset = RING_CIRCUMFERENCE - progress * RING_CIRCUMFERENCE;

  const ringColor = isExpired
    ? '#ba1a1a'
    : daysRemaining <= 3
    ? '#b45309'
    : '#1a6e2e';

  const statusLabel = isExpired
    ? 'e-Daakhil Escalation Unlocked'
    : isActive
    ? `Day ${totalDays - daysRemaining + 1} of ${totalDays} — Active Notice Window`
    : 'Notice Not Yet Dispatched';

  return (
    <div className="glass rounded-2xl p-5 shadow-glass-sm animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
        <h3 className="text-sm font-bold text-on-surface">15-Day Statutory Countdown</h3>
      </div>

      {/* Countdown Ring */}
      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg width="88" height="88" viewBox="0 0 88 88">
            {/* Track */}
            <circle
              cx="44" cy="44" r="38"
              fill="none"
              stroke="rgba(180,83,9,0.10)"
              strokeWidth="7"
            />
            {/* Animated ring */}
            <circle
              cx="44" cy="44" r="38"
              fill="none"
              stroke={ringColor}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
                transition: 'stroke-dashoffset 0.8s ease-in-out, stroke 0.3s ease',
              }}
            />
          </svg>
          {/* Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-2xl font-extrabold leading-none ${
                isExpired ? 'text-error animate-pulse' : ''
              }`}
              style={{ color: isExpired ? undefined : ringColor }}
            >
              {isExpired ? '0' : isActive ? daysRemaining : '—'}
            </span>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">
              {isActive || isExpired ? 'days' : 'left'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-xs font-semibold leading-snug mb-2 ${
              isExpired ? 'text-error' : daysRemaining <= 3 ? 'text-primary-container' : 'text-success'
            }`}
          >
            {statusLabel}
          </p>
          {isActive && !isExpired && (
            <div className="w-full bg-surface-variant rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-700"
                style={{
                  width: `${((totalDays - daysRemaining) / totalDays) * 100}%`,
                  backgroundColor: ringColor,
                }}
              />
            </div>
          )}
          {isExpired && (
            <button className="pill-primary text-[11px] mt-1">
              <span className="material-symbols-outlined text-[12px]">gavel</span>
              Escalate to e-Daakhil
            </button>
          )}
        </div>
      </div>

      {/* Status message */}
      {!isActive && !isExpired && (
        <div className="mt-4 p-3 rounded-xl bg-surface-variant/30 border border-glass-stroke">
          <p className="text-xs text-on-surface-variant">
            Countdown starts after you enter the postal tracking ID or email dispatch timestamp.
          </p>
        </div>
      )}

      {isActive && !isExpired && (
        <div className="mt-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>Notice dispatched</span>
            <span className="font-semibold text-on-surface">
              {dispatchDate ? new Date(dispatchDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>Compliance deadline</span>
            <span className="font-semibold text-error">
              {dispatchDate
                ? (() => {
                    const d = new Date(dispatchDate);
                    d.setDate(d.getDate() + totalDays);
                    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
                  })()
                : '—'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
