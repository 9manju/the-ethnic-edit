import React from 'react';
import { Mail, Phone, Clock, MapPin, Shield, RotateCcw, Truck, MessageSquare } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const trustBadges = [
    { icon: <Shield className="h-6 w-6 text-amber-500" />, title: 'Secure Payments', desc: 'PCI-DSS certified encrypted gateway checkout' },
    { icon: <RotateCcw className="h-6 w-6 text-teal-500" />, title: 'Easy 30-Day Returns', desc: 'No questions asked instant prepaid return label' },
    { icon: <Truck className="h-6 w-6 text-indigo-500" />, title: 'Fast Global Shipping', desc: 'Tracked premium shipping directly to your doorstep' },
    { icon: <MessageSquare className="h-6 w-6 text-emerald-500" />, title: '24/7 Expert Support', desc: 'Chat live with our elite luxury design coordinators' }
  ];

  return (
    <footer className="mt-auto bg-slate-900 text-slate-350 select-text">
      
      {/* 4-Column Trust Indicators Section */}
      <div className="border-b border-slate-800 bg-slate-950 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex gap-4 p-2">
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-2.5 h-fit shadow-inner">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm tracking-wide text-white">{badge.title}</h4>
                  <p className="font-sans text-xs text-slate-400 mt-1 leading-snug">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Company Details */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Presentation */}
          <div className="space-y-4">
            <span className="font-sans text-lg font-black uppercase tracking-wider text-white">
              The Ethnic <span className="text-amber-500 font-medium">Edit</span>
            </span>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Curating preeminent clothing styles, state-of-the-art consumer audio setups, exquisite sand-cast home collectibles, and plant-derived skincare elixirs. 
            </p>
            <div className="flex gap-3 pt-2">
              {['facebook', 'instagram', 'pinterest', 'twitter'].map((social) => (
                <span
                  key={social}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition cursor-pointer"
                  title={`Follow us on ${social}`}
                >
                  <span className="font-mono text-xs font-bold uppercase">{social[0]}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white mb-4 border-l-2 border-amber-500 pl-2">Corporate Office</h4>
            <ul className="space-y-3 font-sans text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>The Ethnic Edit Atrium, Suite 404, Galleria Crescent, Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>+91 22 4965 2400 (India)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>concierge@theethnicedit.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
              </li>
            </ul>
          </div>

          {/* Shop Categories navigation links */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white mb-4 border-l-2 border-amber-500 pl-2">Elite Collections</h4>
            <ul className="space-y-2.5 font-sans text-xs text-slate-400">
              {['Fashion', 'Electronics', 'Lifestyle', 'Accessories', 'Beauty'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setActiveTab('shop');
                    }}
                    className="hover:text-indigo-400 transition"
                  >
                    {cat} Exclusive Range
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => setActiveTab('offers')} className="text-amber-400 font-semibold hover:underline">
                  ★ Secret Coupons & Seasonal Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care column */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white mb-4 border-l-2 border-amber-500 pl-2">Information Portal</h4>
            <ul className="space-y-2.5 font-sans text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-indigo-400 transition">
                  About the Ateliers & Vision
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-indigo-400 transition">
                  Fashion Editorial & Smart Guides
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-indigo-400 transition">
                  Contact Support & Foyer Maps
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('seo')} className="hover:text-indigo-400 transition text-slate-500 font-mono text-[10px]">
                  &bull; Technical SEO Sitemap Verification
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-indigo-450 transition text-slate-500 font-mono text-[10px]">
                  &bull; Merchant Inventory Monitor
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copy area */}
      <div className="border-t border-slate-800 bg-slate-950 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xxs text-slate-500 text-center md:text-left">
            &copy; 2026 The Ethnic Edit Ltd. All Designs and Materials Reservable. Designed for optimal customer retention.
          </p>
          <div className="flex gap-2">
            {['Visa', 'Mastercard', 'Amex', 'UPI', 'PayPal', 'CoD'].map((pay) => (
              <span key={pay} className="rounded border border-slate-800 bg-slate-900 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-400 hover:text-white transition">
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
