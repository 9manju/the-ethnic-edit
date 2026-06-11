import React from 'react';
import { Sparkles, Trophy, ShieldCheck, HeartPulse, User } from 'lucide-react';

export default function AboutView() {
  const values = [
    { icon: <Sparkles className="h-6 w-6 text-amber-500" />, title: 'Artisanal Rigor', desc: 'Working directly with award-winning master craftsmen in Jaipur and Murshidabad to ensure authentic weaves.' },
    { icon: <Trophy className="h-6 w-6 text-teal-500" />, title: 'Uncompromising Quality', desc: 'From pure Mulberry Silk and hand-forged heavy brass urlis to standard components certifications.' },
    { icon: <ShieldCheck className="h-6 w-6 text-indigo-500" />, title: 'Merchant Integrity', desc: 'Secure payment lines, transparent returns logging, and fair wages directly settled to weavers.' },
    { icon: <HeartPulse className="h-6 w-6 text-rose-500" />, title: 'Sensory Well-being', desc: 'Curating skincare serums and room collectibles that elevate local domestic atmospheres.' }
  ];

  return (
    <div id="about-view-container" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 animate-fade-in font-sans">
      
      {/* Brand Intro & Story */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-5">
          <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest pl-1 border-l-2 border-indigo-600">The Atelier Story</span>
          <h1 className="font-sans text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Honoring Heritage, Perfecting Modern Living</h1>
          <p className="font-sans text-sm text-slate-650 leading-relaxed">
            Founded with a vision to preserve traditional arts and design, **The Ethnic Edit** serves as an interactive boutique merging preeminent classical handcraft with dynamic smart lifestyles. 
          </p>
          <p className="font-sans text-sm text-slate-650 leading-relaxed">
            Whether you seek cashmere silk embroideries Zardozi, automated chronograph timepieces, or plant-derived Kashmiri Saffron elixirs, each model in our directory is curated with absolute visual and physical discipline. 
          </p>
        </div>

        {/* Story Visual card representation */}
        <div className="flex-1 max-w-md relative">
          <div className="absolute -bottom-6 -left-6 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600"
            alt="Artisan sewing"
            referrerPolicy="no-referrer"
            className="rounded-2xl border border-slate-105 shadow-2xl object-cover h-96 w-full relative z-10"
          />
        </div>
      </section>

      {/* Corporate Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-slate-100">
        <div className="rounded-2xl bg-slate-50 border border-slate-150 p-6 space-y-3">
          <h3 className="font-sans font-bold text-sm uppercase tracking-wide text-indigo-705">Atelier Mission Statement</h3>
          <p className="font-sans text-xs text-slate-600 leading-relaxed font-sans">
            To connect ancient Indian weavers, metal artists, and wellness traditionalists with the international creative class. By combining classic materials with modern structures, we maintain historic crafts in contemporary economies.
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 border border-slate-150 p-6 space-y-3">
          <h3 className="font-sans font-bold text-sm uppercase tracking-wide text-amber-600">Our Future Vision</h3>
          <p className="font-sans text-xs text-slate-600 leading-relaxed font-sans">
            To establish **The Ethnic Edit** as the preeminent luxury hub for infusing smart living accessories with heritage craft, backed by 100% traceabilities of materials and zero-carbon shipping profiles.
          </p>
        </div>
      </section>

      {/* Atelier Values Grid */}
      <section className="space-y-8 pt-10 border-t border-slate-100">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest block font-mono">Our Pillars</span>
          <h2 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">Our Guiding Atelier Values</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, idx) => (
            <div key={idx} className="rounded-xl border border-slate-100 bg-white p-5.5 space-y-3.5 shadow-2xs">
              <div className="rounded-lg bg-slate-50 border p-2 h-fit w-fit">
                {v.icon}
              </div>
              <div className="space-y-1.5">
                <h4 className="font-sans font-extrabold text-xs text-slate-900 uppercase tracking-wide">{v.title}</h4>
                <p className="font-sans text-xxs text-slate-500 leading-normal">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team sections */}
      <section className="space-y-8 pt-10 border-t border-slate-100">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest block font-mono">Creative Custodians</span>
          <h2 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">Atelier Design Coordinators</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto font-sans text-xs">
          {[
            { name: 'Dr. Devendar S.', role: 'Chief Textile Historian', extra: '32 years documenting Deccan silk directories.' },
            { name: 'Rhea Kapoor', role: 'Head of Contemporary Fashion', extra: 'Parsons Alum. Perfects Zardozi coordinates under Western silhouettes.' },
            { name: 'Sameer Sen', role: 'Smart Devices Coordinator', extra: 'Audio systems architect. Integrates ANC chipsets into classic walnut styles.' }
          ].map((member, idx) => (
            <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold font-sans text-indigo-700 text-sm mx-auto shadow-sm">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-slate-900 text-xs">{member.name}</h4>
                <span className="font-mono text-[9px] text-indigo-600 font-semibold uppercase">{member.role}</span>
                <p className="font-sans text-xxs text-slate-400 mt-2 leading-relaxed">{member.extra}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
