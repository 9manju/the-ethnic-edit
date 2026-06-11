import React, { useState, useEffect } from 'react';
import { X, Gift, Sparkles, Check } from 'lucide-react';

interface ExitIntentModalProps {
  onApplyCoupon: (code: string) => void;
}

export default function ExitIntentModal({ onApplyCoupon }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Detect mouse leave viewport (typical exit intent action)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown) return;
      if (e.clientY < 20) { // mouse moved near the top of the browser screen close to navigation
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('ETHELEGANCE20');
    setCopied(true);
    onApplyCoupon('ETHELEGANCE20');
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div id="exit-intent-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 p-4 backdrop-blur-xs animate-fade-in">
      <div id="exit-intent-box" className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl border border-amber-100">
        
        {/* Top Decorative Banner */}
        <div className="bg-linear-to-r from-amber-500 via-indigo-600 to-indigo-900 py-6 px-4 text-center text-white relative">
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white p-2 shadow-md">
            <div className="rounded-full bg-amber-500 p-2 text-white">
              <Gift className="h-6 w-6 animate-pulse" />
            </div>
          </div>
          <button
            id="close-exit-popup-btn"
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 rounded-full bg-black/20 p-1 text-white hover:bg-black/40 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="font-mono text-xxs font-bold uppercase tracking-widest text-amber-200">WAIT! DON'T MISS OUT</span>
          <h3 className="font-sans text-xl font-extrabold mt-1 tracking-tight">Unlock Luxury For Less</h3>
        </div>

        {/* content body */}
        <div className="px-6 pb-6 pt-10 text-center">
          <p className="font-sans text-sm text-slate-600 leading-relaxed mb-4">
            We noticed you are exploring our exclusive collection. Complete your purchase today and enjoy an extra <span className="font-extrabold text-indigo-600">20% OFF</span> on your cart! No minimum spent required.
          </p>

          {/* Coupon Code Inner Card */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 border border-dashed border-indigo-200 p-4 mb-4">
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">EXCLUSIVE CODE</span>
            <span className="font-mono text-xl font-extrabold text-slate-900 tracking-wider mt-1 select-all">ETHELEGANCE20</span>
            <p className="font-sans text-[11px] text-teal-600 font-medium mt-1">✓ Valid across Fashion, Decor, and Accessories</p>
          </div>

          <button
            id="copy-exit-code-btn"
            onClick={handleCopyCode}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-sans text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition"
          >
            {copied ? (
              <>
                <Check className="h-4.5 w-4.5 text-emerald-300" />
                <span>Coupon Applied & Copied!</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4.5 w-4.5" />
                <span>Claim Offer & Autocopy Code</span>
              </>
            )}
          </button>

          <button
            id="decline-exit-popup-btn"
            onClick={() => setIsOpen(false)}
            className="mt-3.5 font-sans text-xxs font-semibold text-slate-400 hover:text-slate-600 underline tracking-wider uppercase"
          >
            No thanks, I prefer paying full price
          </button>
        </div>
      </div>
    </div>
  );
}
