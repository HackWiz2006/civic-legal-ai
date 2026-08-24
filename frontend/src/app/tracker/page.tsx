'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SideNavBar from '@/components/SideNavBar';
import Header from '@/components/Header';
import CountdownTimer from '@/components/CountdownTimer';
import { useCaseStore } from '@/lib/store';

export default function TrackerPage() {
  const store = useCaseStore();
  const [trackingId, setTrackingId] = useState('');
  const [dispatchDate, setDispatchDate] = useState('');
  const [dispatchMethod, setDispatchMethod] = useState<'speedpost' | 'email' | 'both'>('both');
  const [isTracking, setIsTracking] = useState(false);
  const [settlementMode, setSettlementMode] = useState(false);
  const [settlementOffer, setSettlementOffer] = useState('');

  const handleStartTracking = () => {
    if (!dispatchDate) return;
    store.setDispatchDate(dispatchDate);
    setIsTracking(true);
  };

  const totalClaim = store.damages?.total || 29491.84;
  const offerAmount = parseFloat(settlementOffer) || 0;
  const offerPercentage = totalClaim > 0 ? Math.round((offerAmount / totalClaim) * 100) : 0;
  const isGoodOffer = offerPercentage >= 80;

  return (
    <div className="flex h-screen w-full">
      <SideNavBar />
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header caseTitle="Screen 5: Notice Tracker & 15-Day Countdown" caseRef={store.caseRef} />

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Tracker controls */}
          <div className="flex-1 md:w-[60%] overflow-y-auto px-6 md:px-10 py-8 md:border-r border-glass-stroke">
            <div className="max-w-xl mx-auto">
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-primary">Step 5 of 7</span>
                </div>
                <h1 className="text-2xl font-bold text-on-surface mb-2">15-Day Statutory Notice Tracker</h1>
                <p className="text-sm text-on-surface-variant">
                  Enter your dispatch details to activate the statutory countdown. The Opposite Party has 15 days to comply.
                </p>
              </div>

              {/* Dispatch form */}
              {!isTracking ? (
                <div className="space-y-5 animate-fade-up">
                  {/* Dispatch method */}
                  <div>
                    <p className="section-label mb-3">Dispatch Method</p>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { val: 'speedpost', icon: 'local_post_office', label: 'Speed Post AD' },
                        { val: 'email', icon: 'email', label: 'Nodal Email' },
                        { val: 'both', icon: 'sync', label: 'Both (Recommended)' },
                      ] as const).map((m) => (
                        <button
                          key={m.val}
                          onClick={() => setDispatchMethod(m.val)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            dispatchMethod === m.val
                              ? 'bg-primary/8 border-primary/30'
                              : 'glass border-glass-stroke hover:bg-primary/4'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[22px] block mb-1 ${dispatchMethod === m.val ? 'text-primary filled' : 'text-on-surface-variant'}`}>
                            {m.icon}
                          </span>
                          <p className="text-[10px] font-semibold text-on-surface">{m.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dispatch date */}
                  <div>
                    <label className="section-label block mb-2">Date of Dispatch</label>
                    <input
                      type="date"
                      value={dispatchDate}
                      onChange={(e) => setDispatchDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full glass rounded-xl border border-glass-stroke px-4 py-3 text-sm text-on-surface focus:border-primary outline-none transition-colors"
                    />
                  </div>

                  {/* Postal tracking */}
                  {(dispatchMethod === 'speedpost' || dispatchMethod === 'both') && (
                    <div>
                      <label className="section-label block mb-2">Speed Post Tracking Number (optional)</label>
                      <input
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="E.g., EE123456789IN"
                        className="w-full glass rounded-xl border border-glass-stroke px-4 py-3 text-sm text-on-surface focus:border-primary outline-none transition-colors"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleStartTracking}
                    disabled={!dispatchDate}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">timer</span>
                    Activate Countdown Clock
                  </button>
                </div>
              ) : (
                /* Active tracking view */
                <div className="space-y-5 animate-fade-up">
                  {/* Dispatch summary */}
                  <div className="glass rounded-2xl p-5 border border-success/20">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined filled text-success text-[18px]">check_circle</span>
                      <h3 className="text-sm font-bold text-success">Notice Dispatched & Tracking Active</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-on-surface-variant mb-0.5">Dispatch Date</p>
                        <p className="font-bold text-on-surface">
                          {new Date(dispatchDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-on-surface-variant mb-0.5">Method</p>
                        <p className="font-bold text-on-surface capitalize">{dispatchMethod}</p>
                      </div>
                      {trackingId && (
                        <div className="col-span-2">
                          <p className="text-on-surface-variant mb-0.5">Tracking ID</p>
                          <p className="font-mono font-bold text-primary">{trackingId}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Settlement offer evaluator */}
                  <div className="glass rounded-2xl p-5 shadow-glass-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-primary text-[18px]">handshake</span>
                      <h3 className="text-sm font-bold text-on-surface">Settlement Offer Evaluator</h3>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-4">
                      If the Opposite Party makes a settlement offer, enter it below to evaluate against your statutory 4-part claim.
                    </p>
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1">
                        <label className="text-xs text-on-surface-variant block mb-1">Offer Amount (₹)</label>
                        <input
                          type="number"
                          value={settlementOffer}
                          onChange={(e) => { setSettlementOffer(e.target.value); setSettlementMode(true); }}
                          placeholder="Enter offer amount..."
                          className="w-full glass rounded-xl border border-glass-stroke px-3 py-2.5 text-sm text-on-surface focus:border-primary outline-none"
                        />
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-xs text-on-surface-variant mb-1">Your Claim</p>
                        <p className="text-sm font-extrabold text-primary">₹{totalClaim.toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    {settlementMode && offerAmount > 0 && (
                      <div className={`p-4 rounded-xl border ${isGoodOffer ? 'bg-success/5 border-success/20' : 'bg-error/5 border-error/20'} animate-fade-up`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`material-symbols-outlined filled text-[18px] ${isGoodOffer ? 'text-success' : 'text-error'}`}>
                            {isGoodOffer ? 'thumb_up' : 'thumb_down'}
                          </span>
                          <p className={`text-sm font-bold ${isGoodOffer ? 'text-success' : 'text-error'}`}>
                            {isGoodOffer ? 'Acceptable Settlement Offer' : 'Inadequate Settlement Offer'}
                          </p>
                        </div>
                        <p className="text-xs text-on-surface-variant">
                          Offer covers <strong>{offerPercentage}%</strong> of your ₹{totalClaim.toLocaleString('en-IN')} statutory claim.
                          {!isGoodOffer && ' This falls below the 80% threshold. Consider rejecting and escalating.'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Escalation CTA */}
                  <div className="glass rounded-2xl p-5 border border-error/15">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-error text-[18px]">gavel</span>
                      <h3 className="text-sm font-bold text-on-surface">If 15 Days Elapse Without Resolution</h3>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-4">
                      If the Opposite Party does not settle or ignores this notice, you can file directly at the Consumer Commission via e-Daakhil.
                    </p>
                    <Link href="/petition" className="btn-primary w-full" style={{ background: '#ba1a1a' }}>
                      <span className="material-symbols-outlined filled text-[18px]">gavel</span>
                      Escalate to e-Daakhil
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Countdown + info */}
          <div className="hidden md:flex flex-col w-[40%] h-full bg-surface-variant/8 overflow-y-auto p-6 space-y-4">
            <CountdownTimer
              dispatchDate={isTracking ? dispatchDate : undefined}
              totalDays={15}
            />

            {/* What happens next */}
            <div className="glass rounded-2xl p-5 shadow-glass-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-[18px]">timeline</span>
                <h3 className="text-sm font-bold text-on-surface">What Happens Next?</h3>
              </div>
              <div className="space-y-3">
                {[
                  { day: 'Day 1–15', icon: 'timer', text: 'Active notice window. Opposite Party must acknowledge and resolve.', color: 'text-success' },
                  { day: 'Day 16+', icon: 'gavel', text: 'e-Daakhil Escalation unlocked. File consumer complaint at District Commission.', color: 'text-error' },
                  { day: 'Settled', icon: 'handshake', text: 'If offer ≥ 80% of claim, consider accepting. Use evaluator above.', color: 'text-primary' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-variant/20 border border-glass-stroke">
                    <span className={`material-symbols-outlined text-[16px] flex-shrink-0 mt-0.5 ${item.color}`}>{item.icon}</span>
                    <div>
                      <p className={`text-xs font-bold mb-0.5 ${item.color}`}>{item.day}</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/notice" className="btn-secondary w-full text-sm">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Notice
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
