import React, { useState } from 'react';
import { INITIAL_BLOGS } from '../data/blogs';
import { Blog } from '../types';
import { Clock, User, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogView() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Fashion Trends' | 'Electronics Guides' | 'Lifestyle Tips' | 'Product Reviews'>('All');

  const filteredBlogs = INITIAL_BLOGS.filter(b => {
    if (activeCategory === 'All') return true;
    return b.category === activeCategory;
  });

  return (
    <div id="blog-view-container" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-fade-in font-sans">
      
      {selectedBlog ? (
        // ================= SINGLE BLOG ARTICLE VIEW =================
        <div id="single-blog-article" className="max-w-3xl mx-auto space-y-6">
          <button
            id="back-to-blogs-btn"
            onClick={() => setSelectedBlog(null)}
            className="flex items-center gap-1.5 font-sans text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Editorial Collection</span>
          </button>

          <div className="space-y-4">
            <span className="rounded bg-indigo-105 text-indigo-700 font-mono text-[9px] font-bold px-2.5 py-1 uppercase tracking-wide">
              {selectedBlog.category}
            </span>
            <h1 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3.5xl">
              {selectedBlog.title}
            </h1>
            
            {/* Authoring line */}
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4 text-slate-405" /> {selectedBlog.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-slate-405" /> {selectedBlog.date} ({selectedBlog.readTime})
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-105 overflow-hidden h-72">
            <img src={selectedBlog.image} alt={selectedBlog.title} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
          </div>

          {/* Article content */}
          <div className="font-sans text-sm text-slate-650 leading-relaxed space-y-4 whitespace-pro-line select-text font-sans">
            {selectedBlog.content}
          </div>

          {/* Bottom sign off */}
          <div className="rounded-xl border border-dashed border-slate-200 p-5 bg-slate-50 font-sans text-xs text-slate-500 leading-normal max-w-xl">
            💡 <strong>Disclaimer:</strong> Editorial tips represent creative design guidance by The Ethnic Edit staff. Product suggestions can be obtained by consultation with our dynamic AI Stylist at the top right header panel.
          </div>
        </div>
      ) : (
        // ================= EDITORIAL LISTING GRID =================
        <>
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="font-mono text-xs font-bold text-indigo-650 uppercase tracking-widest pl-1 font-mono">Atelier Journal</span>
            <h1 className="font-sans text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">The Design & Style Gazette</h1>
            <p className="font-sans text-xs text-slate-500">Expertly curated guidance on luxury apparel coordinates, ambient home layout setups, and technical ANC guides.</p>
          </div>

          {/* Category Tabs selectors */}
          <div className="flex justify-center flex-wrap gap-2.5 max-w-xl mx-auto font-sans text-xs">
            {['All', 'Fashion Trends', 'Electronics Guides', 'Lifestyle Tips', 'Product Reviews'].map((catKey) => (
              <button
                key={catKey}
                id={`blog-category-filter-${catKey}`}
                onClick={() => setActiveCategory(catKey as any)}
                className={`rounded-full border px-3.5 py-1.5 font-sans font-bold transition-all ${
                  activeCategory === catKey
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-slate-150 bg-slate-50 text-slate-650 hover:bg-slate-100'
                }`}
              >
                {catKey === 'All' ? 'View All Journals' : catKey}
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                id={`blog-card-${blog.id}`}
                className="group rounded-2xl border border-slate-105 bg-white overflow-hidden shadow-2xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden bg-slate-50 relative">
                  <span className="absolute top-3 left-3 z-15 rounded bg-slate-900 text-white px-2 py-0.5 font-mono text-[8px] font-bold uppercase">
                    {blog.category}
                  </span>
                  <img src={blog.image} alt={blog.title} referrerPolicy="no-referrer" className="h-full w-full object-cover group-hover:scale-101 transition-transform" />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-slate-400 font-bold block">{blog.date} &bull; {blog.readTime}</span>
                    <h3 className="font-sans font-black text-xs uppercase text-slate-950 group-hover:text-indigo-650 line-clamp-2 transition-colors leading-tight">
                      {blog.title}
                    </h3>
                    <p className="font-sans text-xxs text-slate-500 line-clamp-3 leading-normal font-sans">
                      {blog.excerpt}
                    </p>
                  </div>

                  <button
                    id={`read-article-action-${blog.id}`}
                    onClick={() => setSelectedBlog(blog)}
                    className="flex items-center gap-1 font-sans text-[11px] font-extrabold text-indigo-605 group-hover:text-indigo-805 transition-colors text-left uppercase tracking-wider"
                  >
                    <span>Read Full Critique</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
