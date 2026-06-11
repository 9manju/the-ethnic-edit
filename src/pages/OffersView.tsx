import React, { useState } from 'react';
import { Gift, Percent, Copy, Check, Flame, Zap, Trophy, ShieldCheck } from 'lucide-react';

interface OffersViewProps {
  onApplyCoupon: (code: string) => void;
  appliedCoupon: string | null;
}

export default function OffersView({ onApplyCoupon, appliedCoupon }: OffersViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [scratched, setScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  const seasonalOffers = [
    { title: 'The Grand Monsoon Gala', banner: 'Celebrate the heavy rainfall season with premium lifestyle upgrades.', tag: 'Active Offer', saving: 'Up to 38% Off', code: 'MONSOONGALA' },
    { title: 'Atelier First Purchase', banner: 'Welcome to our premium shopping directory. Take a crisp discount on any Kurta or headphones.', tag: 'First Order', saving: 'Take $15 Flat Off', code: 'WELCOMEET' },
    { title: 'Golden Hour Collectibles', banner: 'Our solid brass Urlis and ceramic Mughal cups are flying out of stock. Claim your home tier.', tag: 'Flash Deal', saving: 'Take 10% Extra Off', code: 'BRASSGLOW' }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div id="offers-view-wrapper" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center justify-center gap-1">
          <Zap className="h-3.5 w-3.5 fill-amber-500 stroke-none" /> Elite Membership Deals
        </span>
        <h1 className="font-sans text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Exclusive Coupons & Rewards</h1>
        <p className="font-sans text-xs text-slate-500">Apply verified luxury coupon vouchers to claim discounts across our global boutique.</p>
      </div>

      {/* ================= SPECIAL MYSTERY REVEAL / SCRATCH CARD ================= */}
      <section id="scratch-mystery-coupon" className="max-w-2xl mx-auto rounded-3xl border border-amber-200 bg-linear-to-br from-amber-500/10 via-amber-50 to-indigo-50 p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 flex-1">
          <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 text-amber-805 px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wide">
            <Trophy className="h-3 w-3" /> Exclusive Mystery Game
          </span>
          <h3 className="font-sans text-xl font-extrabold text-slate-950 tracking-tight">Claim Your Secret VIP Voucher</h3>
          <p className="font-sans text-xs text-slate-650 leading-relaxed max-w-sm">
            Rub or click the scratch-card container on the right to reveal your premium status coupon code.
          </p>
        </div>

        {/* Scratch Card container simulation */}
        <div className="shrink-0 w-64 h-36 relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg cursor-pointer">
          {scratched ? (
            <div className="h-full w-full bg-white flex flex-col items-center justify-center p-4 text-center animate-fade-in">
              <span className="font-mono text-[10px] font-bold text-emerald-600 block uppercase">✓ VIP 25% DISCOUNT REVEALED!</span>
              <span className="font-mono text-2xl font-extrabold text-slate-900 tracking-widest mt-1 block select-all">ETHICVIP25</span>
              <button
                id="claim-scratched-code"
                onClick={() => handleCopyCode('ETHICVIP25')}
                className="mt-3.5 rounded bg-slate-905 hover:bg-indigo-600 font-sans text-xxs font-bold text-white px-4 py-1.5 shadow"
              >
                {copiedCode === 'ETHICVIP25' ? 'Applied Code!' : 'Copy & Apply Coupon'}
              </button>
            </div>
          ) : (
            <div
              id="scratch-card-gray-layer"
              onClick={() => {
                setScratched(true);
                setScratchProgress(100);
              }}
              className="h-full w-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 transition-colors flex flex-col items-center justify-center text-white text-center p-4 group select-none hover:brightness-105"
            >
              <Gift className="h-8 w-8 text-white animate-bounce mb-1" />
              <span className="font-sans text-xs font-bold uppercase tracking-wider block">SCRATCH TO REVEAL CODE</span>
              <span className="font-mono text-[9px] text-amber-100 block mt-1">(Click Here / Scratch to unlock)</span>
            </div>
          )}
        </div>
      </section>

      {/* ================= ACTIVE PROMOTION CARDS ================= */}
      <section id="seasonal-coupons" className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {seasonalOffers.map((offer, idx) => {
          const isApplied = appliedCoupon === offer.code;
          return (
            <div
              key={idx}
              id={`coupon-card-${offer.code}`}
              className={`rounded-2xl border bg-white p-5 space-y-4 shadow-2xs hover:shadow-xs transition relative overflow-hidden flex flex-col justify-between ${
                isApplied ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/5' : 'border-slate-100'
              }`}
            >
              {/* decorative side notch for coupon styling layout */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-3.5 rounded-r-full bg-slate-100 border border-slate-150" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-3.5 rounded-l-full bg-slate-100 border border-slate-150" />

              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="rounded bg-indigo-500 text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wide">
                    {offer.tag}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">-{offer.saving}</span>
                </div>
                <h3 className="font-sans font-bold text-sm tracking-tight text-slate-900">{offer.title}</h3>
                <p className="font-sans text-xs text-slate-500 leading-snug">{offer.banner}</p>
              </div>

              <div className="border-t border-dashed border-slate-150 pt-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase">USE VOUCHER CODE</span>
                  <span className="font-mono text-sm font-extrabold text-slate-900 tracking-wider block mt-0.5 select-all">{offer.code}</span>
                </div>
                <button
                  id={`apply-coupon-btn-${offer.code}`}
                  onClick={() => handleCopyCode(offer.code)}
                  className={`rounded-lg font-sans text-xs font-bold px-3 py-2 flex items-center gap-1 transition ${
                    isApplied 
                      ? 'bg-teal-500 text-white hover:bg-teal-600'
                      : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Code Active!</span>
                    </>
                  ) : copiedCode === offer.code ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Claim Coupon</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* ================= BUNDLE PACK DEALS & LIMITED PROMOTIONS ================= */}
      <section id="combo-bundles-gallery" className="rounded-2xl border border-slate-100 bg-slate-50 p-6 md:p-8 space-y-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest">High Conversion Multi-Buy</span>
          <h3 className="font-sans text-xl font-black text-slate-900">Premium Combo Bundle Offers</h3>
          <p className="font-sans text-xs text-slate-500">Coordinate and save! Purchase these designer edits in a single package list to claim auto-applied discounts.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Combo 1 */}
          <div className="rounded-xl border border-slate-150 bg-white p-5 flex gap-4 items-center relative">
            <span className="absolute -top-3.5 right-4 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-extrabold px-3 py-1 text-xs">
              SAVE 15% EXTRA
            </span>
            <div className="flex gap-2">
              <span className="rounded bg-slate-50 border border-slate-100 p-1 w-12 h-12 flex items-center justify-center font-bold text-sm">👘</span>
              <span className="rounded bg-slate-50 border border-slate-100 p-1 w-12 h-12 flex items-center justify-center font-bold text-sm">📿</span>
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs text-slate-950 uppercase tracking-wide">The Royal Trousseau Combination</h4>
              <p className="font-sans text-xxs text-slate-500 mt-0.5">Jaipuri Anarkali Suit + Kundan Peacock Choker Set. Autodetects on cart list checkouts.</p>
            </div>
          </div>

          {/* Combo 2 */}
          <div className="rounded-xl border border-slate-150 bg-white p-5 flex gap-4 items-center relative">
            <span className="absolute -top-3.5 right-4 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-extrabold px-3 py-1 text-xs">
              SAVE 10% EXTRA
            </span>
            <div className="flex gap-2">
              <span className="rounded bg-slate-50 border border-slate-100 p-1 w-12 h-12 flex items-center justify-center font-bold text-sm">💻</span>
              <span className="rounded bg-slate-50 border border-slate-100 p-1 w-12 h-12 flex items-center justify-center font-bold text-sm">🎧</span>
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs text-slate-950 uppercase tracking-wide">The Creative Workstation Combination</h4>
              <p className="font-sans text-xxs text-slate-500 mt-0.5">CoreTech Notebook model + AuraSound ANC headphones. Autodetects on cart list checkouts.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
