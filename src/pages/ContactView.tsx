import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Styling Query');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Showroom Map details
  const [activeCity, setActiveCity] = useState<'mumbai' | 'delhi' | 'bengaluru'>('mumbai');

  const cities = {
    mumbai: { name: 'Mumbai Elite Atrium', address: 'The Ethnic Edit Atrium, Suite 404, Galleria Crescent, Bandra West, Mumbai 400050', phone: '+91 22 4965 2400', hours: '9:00 AM - 7:00 PM IST', coords: { x: '35%', y: '65%' } },
    delhi: { name: 'Imperial Delhi Flagship', address: 'Block C-1, Inner Circle, Connaught Place, New Delhi 110001', phone: '+91 11 3960 1200', hours: '10:00 AM - 8:00 PM IST', coords: { x: '42%', y: '32%' } },
    bengaluru: { name: 'Silicon Bengaluru Gallery', address: 'Ground Floor, 100 Feet Rd, Indiranagar, Bengaluru 560038', phone: '+91 80 4960 9900', hours: '10:00 AM - 7:30 PM IST', coords: { x: '45%', y: '85%' } }
  };

  const faqs = [
    { q: 'How do I care for my mulberry silk or handcrafted zardozi garments?', a: 'All our silk fabrics, heavily embroidered bandhgalas, and Zardozi work are strictly dry-clean only. Please preserve them using cotton apparel envelopes rather than plastic bag wraps to retain silk breathe levels.' },
    { q: 'What is the standard warranty parameter on AuraSound audio tech?', a: 'All our Electronics models, including the AuraSound ANC Headphones and smartwatches, are backed by an elite 1-Year replacement warranty coverage. If you experience processing friction, file a ticket or contact our help desk support.' },
    { q: 'Do you offer custom tailored fitting services?', a: 'Yes! If you reside in Mumbai, Delhi, or Bengaluru, you can schedule an appointment to visit our showrooms where master tailors will take physical measurements for complete bespoke fitments.' },
    { q: 'Is global worldwide shipping active?', a: 'We offer tracked premium courier delivery worldwide using DHL express. Standard transit duration averages 4-7 business days depending on customs clearances.' }
  ];

  const [faqOpenState, setFaqOpenState] = useState<{ [key: number]: boolean }>({ 0: true });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSuccess(true);
    // Real clear
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => {
      setSuccess(false);
    }, 4500);
  };

  return (
    <div id="contact-view-container" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <span className="font-mono text-xs font-bold text-indigo-650 uppercase tracking-widest pl-1">Worldwide Reach</span>
        <h1 className="font-sans text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Connect With Our Concierge</h1>
        <p className="font-sans text-xs text-slate-500">Seeking outfit fitting, high-res audio setups specs, or bulk gifting schedules? Let our master staff guide your journey.</p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        
        {/* ================= LEFT SIDE: FORM PANE ================= */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-105 bg-white p-6 shadow-xs">
            <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5 mb-4">
              Design Inquiry Ticket
            </h3>

            {success ? (
              <div className="rounded-lg bg-teal-50 border border-teal-150 p-6 text-center text-teal-700 animate-fade-in font-sans space-y-2">
                <CheckCircle className="mx-auto h-10 w-10 text-teal-600 animate-bounce" />
                <h5 className="font-bold text-sm">Design Ticket Lodged successfully</h5>
                <p className="text-xs text-teal-600 font-sans">We have logged your coordinate questions. An elite design consultant will reach out within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-205 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav S."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-455 mb-1">Email Coordinates *</label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-slate-205 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-205 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 94945 92000"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-455 mb-1">Topic Classification</label>
                    <select
                      className="w-full rounded-lg border border-slate-205 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 font-sans focus:outline-hidden"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option value="General Styling Query">General Styling Query & Advice</option>
                      <option value="Audio Tech Support">Audio Tech Support & Warranty</option>
                      <option value="Fragrance / Serum Skincare">Fragrance / Serum Skincare</option>
                      <option value="Bespoke Wedding Tailoring">Bespoke Wedding Tailoring</option>
                      <option value="Custom order updates">Custom order updates</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1">Inquiry / Message Detail *</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-slate-205 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your design questions, size measurements queries, custom home accessories setups details..."
                    required
                  />
                </div>

                <button
                  id="send-message-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-slate-900 text-white font-sans text-xs font-bold py-3 shadow-md transition"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmit Ticket Code</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDE: INTERACTIVE SHOWROOM LOCATOR ================= */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-105 bg-white p-5.5 space-y-4 shadow-xs">
            <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
              Traditional Showroom Locators
            </h3>

            {/* Selector tabs */}
            <div className="flex gap-2 font-mono text-[10px]">
              {(['mumbai', 'delhi', 'bengaluru'] as const).map((cityKey) => (
                <button
                  key={cityKey}
                  id={`showroom-tab-${cityKey}`}
                  onClick={() => setActiveCity(cityKey)}
                  className={`flex-1 rounded-lg border px-3 py-2 font-sans font-bold capitalize transition-all ${
                    activeCity === cityKey
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-150 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cityKey}
                </button>
              ))}
            </div>

            {/* Active Showroom info cards */}
            <div className="rounded-xl bg-slate-50 border border-slate-150 p-4 space-y-3 font-sans text-xs text-slate-650 leading-relaxed">
              <p className="font-black font-sans text-slate-900 text-sm flex items-center gap-1">
                <MapPin className="h-4.5 w-4.5 text-indigo-600" />
                <span>{cities[activeCity].name}</span>
              </p>
              <p>{cities[activeCity].address}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xxs block font-mono">
                <div>
                  <span className="text-slate-400 font-sans block font-semibold">Concierge Line</span>
                  <a href={`tel:${cities[activeCity].phone}`} className="hover:underline font-bold text-slate-800">{cities[activeCity].phone}</a>
                </div>
                <div>
                  <span className="text-slate-400 font-sans block font-semibold font-mono">Atelier Hours</span>
                  <span className="font-bold text-slate-800">{cities[activeCity].hours}</span>
                </div>
              </div>
            </div>

            {/* PREMIUM INTERACTIVE VECTOR MAP CANVAS */}
            <div id="interactive-showroom-vector-map" className="relative h-56 rounded-xl border border-slate-150 bg-slate-950 overflow-hidden shadow-inner flex items-center justify-center">
              {/* grid pattern backgrounds */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
              
              <div className="relative text-center space-y-1 z-10 select-none">
                <span className="font-mono text-[9px] font-black text-amber-500 uppercase tracking-widest animate-pulse">Atelier Vector Radar</span>
                <h4 className="font-sans text-xs font-bold text-indigo-200">Showroom Regional Coordinates</h4>
              </div>

              {/* Vector pins mapped on raw layout coordinates */}
              {Object.entries(cities).map(([key, value]) => {
                const isActive = activeCity === key;
                return (
                  <button
                    key={key}
                    id={`vector-pin-${key}`}
                    onClick={() => setActiveCity(key as any)}
                    className="absolute group"
                    style={{ left: value.coords.x, top: value.coords.y }}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'animate-ping bg-amber-400' : 'bg-indigo-400 group-hover:scale-105'}`} />
                      <span className={`relative inline-flex rounded-full h-3 w-3 border border-white ${isActive ? 'bg-amber-500 shadow-md ring-2 ring-amber-300' : 'bg-indigo-600'}`} />
                    </span>
                    <span className="absolute left-4 -top-3.5 rounded bg-slate-900 border border-slate-700 px-1.5 py-0.2 font-sans text-[8px] font-bold text-white uppercase tracking-wider hidden group-hover:block z-25">
                      {key} Flagship
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* ================= FAQS ACCORDION SECTION ================= */}
      <section id="faqs-accordion-drawer" className="max-w-3xl mx-auto space-y-6 pt-10 border-t border-slate-100">
        <div className="text-center space-y-1.5">
          <span className="font-mono text-xs font-bold text-indigo-650 uppercase tracking-widest pl-1 font-mono">Curated Queries</span>
          <h2 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">Frequently Answered Queries</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpenState[idx];
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-150 bg-white shadow-2xs overflow-hidden transition"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => setFaqOpenState({ ...faqOpenState, [idx]: !isOpen })}
                  className="w-full px-5 py-4 text-left font-sans text-xs font-extrabold text-slate-900 flex justify-between items-center bg-slate-50 hover:bg-slate-100/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-indigo-600 font-bold font-mono text-sm">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 py-4 font-sans text-xs text-slate-600 leading-relaxed border-t border-slate-150 animate-fade-in whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
