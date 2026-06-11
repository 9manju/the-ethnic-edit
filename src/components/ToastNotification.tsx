import React, { useState, useEffect } from 'react';
import { ShoppingBag, Zap, Flame } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/products';

interface SocialNotification {
  city: string;
  name: string;
  productName: string;
  timeAgo: string;
  type: 'purchase' | 'stock' | 'view';
}

const mockSocials: SocialNotification[] = [
  { city: 'Mumbai', name: 'Aarav S.', productName: 'Royal Jaipuri Embroidered Anarkali Set', timeAgo: '2 minutes ago', type: 'purchase' },
  { city: 'New Delhi', name: 'Kabir B.', productName: 'Imperial Banarasi Silk Sherwani', timeAgo: '6 minutes ago', type: 'purchase' },
  { city: 'Bengaluru', name: 'Ananya R.', productName: 'Kumkumadi Radiance Elixir Serum', timeAgo: 'Just now', type: 'purchase' },
  { city: 'Kolkata', name: 'Preeti D.', productName: 'Gilded Kundan Peacock Choker Set', timeAgo: '12 minutes ago', type: 'purchase' },
  { city: 'Pune', name: 'Vikram J.', productName: 'Elite Heritage Chronograph Watch', timeAgo: '15 minutes ago', type: 'purchase' },
  { city: 'Chennai', name: 'Meenakshi N.', productName: 'Handmade Jaipur Ceramics Premium Tea Set', timeAgo: '4 minutes ago', type: 'purchase' },
  { city: 'Ahmedabad', name: 'Hardik P.', productName: 'Mulberry Indigo Cotton Linen Kurta', timeAgo: '1 minute ago', type: 'purchase' }
];

const mockStockAlerts = [
  '🔥 Only 4 units left of "Golden Aura Handcarved Brass Urli"!',
  '⚡ FLASH DEAL: 33% off on "Floral Silk Fusion Kurti" ending soon!',
  '👀 18 people are viewing "ProBook Multi-Core Slate Ultra" right now!'
];

export default function ToastNotification() {
  const [currentNotification, setCurrentNotification] = useState<string | SocialNotification | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const triggerNotification = () => {
      // Alternate between a purchase social proof and an urgency stock/view badge
      const isPurchase = Math.random() > 0.4;
      if (isPurchase) {
        const randomItem = mockSocials[Math.floor(Math.random() * mockSocials.length)];
        setCurrentNotification(randomItem);
      } else {
        const randomAlert = mockStockAlerts[Math.floor(Math.random() * mockStockAlerts.length)];
        setCurrentNotification(randomAlert);
      }
      setVisible(true);

      // Hide after 6 seconds
      setTimeout(() => {
        setVisible(false);
      }, 6000);
    };

    // First trigger after 8 seconds
    const initialTimeout = setTimeout(triggerNotification, 8000);

    // Repeat every 22 seconds
    const interval = setInterval(triggerNotification, 22000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!visible || !currentNotification) return null;

  return (
    <div
      id="social-toast-container"
      className="fixed bottom-16 left-4 z-40 max-w-sm rounded-xl border border-slate-100 bg-white p-3.5 shadow-xl transition-all duration-500 transform animate-bounce-subtle md:bottom-6"
    >
      <div className="flex items-start gap-3">
        {typeof currentNotification === 'string' ? (
          <>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 border border-amber-150">
              <Flame className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <div className="flex-1">
              <span className="font-mono text-[10px] font-bold text-amber-600 tracking-wider uppercase">Urgency Alert</span>
              <p className="font-sans text-xs font-semibold text-slate-800 mt-0.5">{currentNotification}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 border border-teal-150">
              <ShoppingBag className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[10px] font-bold text-teal-600 tracking-wider uppercase">Verified Purchase</span>
              <p className="font-sans text-xs text-slate-800 mt-1">
                <strong>{currentNotification.name}</strong> from {currentNotification.city} bought:
              </p>
              <p className="font-sans text-xs font-semibold text-indigo-600 truncate">{currentNotification.productName}</p>
              <span className="font-sans text-[10px] text-slate-400 mt-1 block">{currentNotification.timeAgo}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
