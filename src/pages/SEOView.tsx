import React, { useState } from 'react';
import { Search, Globe, ShieldCheck, AlertCircle, FileText } from 'lucide-react';

export default function SEOView() {
  // Input parameters for Google Search snippet simulator
  const [metaTitle, setMetaTitle] = useState('The Ethnic Edit | Buy Indian Artisanal Heritage Garments & Smart Audio Tech');
  const [metaDescription, setMetaDescription] = useState('Explore silk bandhgalas, premium heavy brass urlis, Ayurvedic wellness, AuraSound audio noise-cancelling gadgets, and traditional Mughal ceramics with quick express shipping.');
  const [canonicalUrl, setCanonicalUrl] = useState('https://the-ethnic-edit.ai.studio/shop');

  // Robots togglers
  const [allowIndexing, setAllowIndexing] = useState(true);
  const [blockAdminDirectory, setBlockAdminDirectory] = useState(true);

  // Sitemap simulated list
  const sitemapUrls = [
    { loc: 'https://the-ethnic-edit.ai.studio/', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://the-ethnic-edit.ai.studio/shop', priority: '0.9', changefreq: 'daily' },
    { loc: 'https://the-ethnic-edit.ai.studio/offers', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://the-ethnic-edit.ai.studio/blog', priority: '0.7', changefreq: 'weekly' },
    { loc: 'https://the-ethnic-edit.ai.studio/about', priority: '0.6', changefreq: 'monthly' },
    { loc: 'https://the-ethnic-edit.ai.studio/contact', priority: '0.6', changefreq: 'monthly' }
  ];

  return (
    <div id="seo-view-container" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <span className="font-mono text-xs font-bold text-teal-600 uppercase tracking-widest pl-1 font-mono">Organic Visibility</span>
        <h1 className="font-sans text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Technical SEO Command Panel</h1>
        <p className="font-sans text-xs text-slate-500">Monitor canonical indexing, structure search engine bots instructions, and audit Google Rich Snippets in raw previews.</p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        
        {/* ================= LEFT SIDE: SIMULATOR INPUTS ================= */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-105 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
              Meta Tags Header Configurations
            </h3>

            <div className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1">Snippet title (&lt;title&gt;)</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-205 px-3 py-2 text-xs text-slate-805 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
                <span className="font-mono text-[9px] text-slate-400 mt-1 block font-semibold">Length recommendation tracker: <strong className={metaTitle.length <= 60 ? 'text-emerald-600' : 'text-rose-500'}>{metaTitle.length} characters</strong> (ideal format: &lt; 60)</span>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1">Meta Description content</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-slate-205 px-3.5 py-2 text-xs text-slate-805 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
                <span className="font-mono text-[9px] text-slate-400 mt-1 block font-semibold">Length recommendation tracker: <strong className={metaDescription.length >= 120 && metaDescription.length <= 160 ? 'text-emerald-600' : 'text-amber-500'}>{metaDescription.length} characters</strong> (ideal format: 120 - 160)</span>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1">Canonical Tag url</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-205 px-3 py-2 text-xs text-slate-805 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Robots parameters panel */}
          <div className="rounded-2xl border border-slate-105 bg-white p-5.5 shadow-xs space-y-4">
            <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
              Robots.txt Crawling Directives
            </h3>

            <div className="space-y-3 font-sans text-xs">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-205 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  checked={allowIndexing}
                  onChange={(e) => setAllowIndexing(e.target.checked)}
                />
                <div>
                  <span className="font-bold text-slate-805 block">Enable Standard Crawler Indexing</span>
                  <p className="text-xxs text-slate-500">Allow Googlebots, Bingbots, and Yahoo index listings.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-205 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  checked={blockAdminDirectory}
                  onChange={(e) => setBlockAdminDirectory(e.target.checked)}
                />
                <div>
                  <span className="font-bold text-slate-850 block">Restrict Admin Dashboard Crawling</span>
                  <p className="text-xxs text-slate-500">Appends `/admin` coordinates block list to keep merchant parameters invisible.</p>
                </div>
              </label>
            </div>

            {/* Generated Robots.txt Code logs previews */}
            <div className="rounded-xl border border-slate-150 p-4.5 bg-slate-900 text-slate-200 mt-2">
              <span className="font-mono text-[9px] font-bold text-indigo-400 block pb-2.5 border-b border-slate-800 uppercase">GENERATED ROBOTS.TXT STREAM</span>
              <pre className="font-mono text-xxs leading-snug pt-2.5 space-y-1 block max-h-24 overflow-y-auto">
                {`User-agent: *\n`}
                {allowIndexing ? `Allow: /\n` : `Disallow: /\n`}
                {blockAdminDirectory ? `Disallow: /admin\n` : ''}
                {`Sitemap: https://the-ethnic-edit.ai.studio/sitemap.xml`}
              </pre>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: GOOGLE SNIPPET PREVIEW & SITEMAP ================= */}
        <div className="space-y-6">
          {/* GOOGLE ORGANIC SNIPPET PREVIEW */}
          <div className="rounded-2xl border border-slate-105 bg-white p-5.5 shadow-xs space-y-4">
            <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-1">
              <Search className="h-4.5 w-4.5 text-indigo-600" />
              <span>Google Desktop Search Preview</span>
            </h3>

            {/* Google container style mockup */}
            <div className="rounded-xl border border-slate-150 p-4 font-sans bg-white leading-normal space-y-1 mt-2">
              <div className="flex items-center gap-2 text-xxs text-slate-500">
                <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{canonicalUrl}</span>
                <span className="text-slate-405">&bull; ...</span>
              </div>
              <h4 className="font-sans text-[15px] font-medium text-indigo-800 hover:underline cursor-pointer tracking-tight leading-snug">
                {metaTitle || 'The Ethnic Edit Boutique'}
              </h4>
              <p className="font-sans text-[11px] text-slate-650 max-w-lg leading-relaxed line-clamp-2">
                {metaDescription || 'No description supplied. Add meta keywords inside configurations.'}
              </p>
            </div>
          </div>

          {/* REAL TIME CANONICAL SITEMAP.XML IN-MEMORY TREE */}
          <div className="rounded-2xl border border-slate-105 bg-white p-5.5 shadow-xs space-y-4">
            <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-indigo-605" />
              <span>XML Sitemap Registry &bull; sitemap.xml</span>
            </h3>

            {/* Sitemap grid logs */}
            <div className="rounded-xl border border-slate-150 overflow-hidden bg-slate-50 text-[10px] font-mono font-bold">
              <table className="min-w-full divide-y divide-slate-150 text-slate-700">
                <thead className="bg-slate-100 text-slate-500 uppercase tracking-widest text-[9px]">
                  <tr>
                    <th className="px-3.5 py-2 text-left">Location Routing (loc)</th>
                    <th className="px-3.5 py-2 text-center">Weight</th>
                    <th className="px-3.5 py-2 text-right">Cadence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 divide-solid">
                  {sitemapUrls.map((site, index) => (
                    <tr key={index}>
                      <td className="px-3.5 py-2 text-left text-slate-800 truncate max-w-[200px]">{site.loc}</td>
                      <td className="px-3.5 py-2 text-center text-teal-650 font-bold">{site.priority}</td>
                      <td className="px-3.5 py-2 text-right text-indigo-650 font-sans uppercase tracking-tight text-[8px]">{site.changefreq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-xxs block text-slate-405 flex items-center gap-1 font-sans">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Registered indexing blocks are compliant with modern crawler standards.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
