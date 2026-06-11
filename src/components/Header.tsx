import React, { useState } from 'react';
import { ShoppingBag, Heart, User, Search, Menu, X, Sparkles, ShieldCheck, HelpCircle, FileSearch, HelpCircle as HelpIcon } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onSearch: (query: string) => void;
  onOpenAIStylist: () => void;
  onOpenAdmin: () => void;
  onOpenSEO: () => void;
  onSelectCategory: (cat: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onSearch,
  onOpenAIStylist,
  onOpenAdmin,
  onOpenSEO,
  onSelectCategory,
}: HeaderProps) {
  const [searchVal, setSearchVal] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
    setActiveTab('shop');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'offers', label: 'Deals & Coupons' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleCategoryNav = (cat: string) => {
    onSelectCategory(cat);
    setActiveTab('shop');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* Top micro-banner */}
      {isAlertVisible && (
        <div id="top-announcement-banner" className="flex items-center justify-between bg-linear-to-r from-indigo-900 to-indigo-950 px-4 py-1.5 text-center text-white">
          <div className="flex-1 text-center font-sans text-xxs font-semibold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <span className="rounded bg-amber-500 text-slate-900 px-1 py-0.2 select-none">FESTIVE PROMO</span>
            Enjoy Free Shipping Worldwide + Dynamic AI Styling Assistance! Use code: <span className="font-extrabold text-amber-300">ETHELEGANCE20</span>
          </div>
          <button id="close-top-banner" onClick={() => setIsAlertVisible(false)} className="text-white/75 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Main Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 border-b border-slate-100">
          
          {/* Logo Area */}
          <div className="flex items-center gap-2">
            <button
              id="brand-logo-btn"
              onClick={() => setActiveTab('home')}
              className="flex items-center text-left"
            >
              <span className="font-sans text-lg font-black uppercase tracking-wider text-indigo-900 md:text-xl lg:text-2xl">
                The Ethnic <span className="text-amber-500 font-medium">Edit</span>
              </span>
            </button>
          </div>

          {/* Search bar desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden max-w-md flex-1 relative md:block"
          >
            <input
              id="search-input"
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search smartphones, designer lehengas, tea sets..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-4 pr-11 text-xs font-sans text-slate-800 transition focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
            <button
              id="search-action-btn"
              type="submit"
              className="absolute right-1 text-indigo-600 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition hover:bg-indigo-50"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Action Navigation Buttons & Triggers */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* AI Personal Concierge Shortcut */}
            <button
              id="ai-concierge-shortcut"
              onClick={onOpenAIStylist}
              className="flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 font-sans text-xxs font-semibold text-indigo-700 hover:bg-indigo-100 hover:shadow-xs transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-bounce" />
              <span className="hidden sm:inline">AI Stylist</span>
            </button>

            {/* Quick SEO Portal */}
            <button
              id="seo-portal-direct-btn"
              onClick={onOpenSEO}
              title="SEO Strategies & Metadata Views"
              className={`flex items-center gap-1 rounded-md px-2 py-1.5 font-sans text-xxs font-medium border ${
                activeTab === 'seo'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-100 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileSearch className="h-3.5 w-3.5" />
              <span className="hidden md:inline">SEO Config</span>
            </button>

            {/* Admin Dashboard shortcut */}
            <button
              id="admin-portal-shortcut"
              onClick={onOpenAdmin}
              title="Interactive Merchant Dashboard"
              className={`flex items-center gap-1 rounded-md px-2 py-1.5 font-sans text-xxs font-medium border ${
                activeTab === 'admin'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-105 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden md:inline">Admin Portal</span>
            </button>

            {/* Wishlist Icon */}
            <button
              id="wishlist-trigger-btn"
              onClick={() => setActiveTab('account')}
              className="relative p-1.5 text-slate-600 hover:text-indigo-600 rounded-full hover:bg-slate-50"
              title="My Account / Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              id="cart-trigger-btn"
              onClick={() => setActiveTab('cart')}
              className="relative p-1.5 text-slate-600 hover:text-indigo-600 rounded-full hover:bg-slate-50"
              title="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Profile Icon */}
            <button
              id="profile-trigger-btn"
              onClick={() => setActiveTab('account')}
              className="p-1.5 text-slate-600 hover:text-indigo-600 rounded-full hover:bg-slate-50"
              title="My Account"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-indigo-600 md:hidden rounded-full hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Categories Bar (Subheader Desktop) */}
        <div className="hidden border-b border-slate-50 py-2.5 md:flex md:items-center md:justify-between">
          <nav className="flex items-center gap-7">
            {navItems.map((n) => (
              <button
                key={n.id}
                id={`nav-${n.id}`}
                onClick={() => {
                  setActiveTab(n.id);
                  if (n.id === 'shop') onSearch(''); // reset search query
                }}
                className={`font-sans text-xs font-semibold uppercase tracking-wider relative transition-colors ${
                  activeTab === n.id
                    ? 'text-indigo-600 font-bold'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {n.label}
                {activeTab === n.id && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-indigo-650" />
                )}
              </button>
            ))}
          </nav>

          {/* Categories Quick Tags */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fast Search:</span>
            {['Fashion', 'Electronics', 'Lifestyle', 'Accessories', 'Beauty'].map((cat) => (
              <button
                key={cat}
                id={`header-cat-${cat}`}
                onClick={() => handleCategoryNav(cat)}
                className="rounded-full bg-slate-100 hover:bg-indigo-50 border border-slate-150 px-2.5 py-0.5 font-sans text-xxs font-medium text-slate-600 hover:text-indigo-700 transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="border-t border-slate-100 bg-white p-4 space-y-4 md:hidden shadow-lg">
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              id="search-input-mobile"
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search category, brand or product..."
              className="w-full rounded-lg border border-slate-250 bg-slate-50 py-2 pl-3 pr-10 text-xs font-sans text-slate-800"
            />
            <button
              id="search-action-btn-mobile"
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-indigo-600"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Navigation Links list */}
          <div className="grid grid-cols-2 gap-2.5">
            {navItems.map((n) => (
              <button
                key={n.id}
                id={`mobile-nav-${n.id}`}
                onClick={() => {
                  setActiveTab(n.id);
                  setMobileMenuOpen(false);
                }}
                className={`rounded-lg border px-3 py-2.5 text-left font-sans text-xs font-semibold ${
                  activeTab === n.id
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                    : 'border-slate-100 bg-slate-50 text-slate-700'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Instant Categories:</p>
            <div className="flex flex-wrap gap-1.5">
              {['Fashion', 'Electronics', 'Lifestyle', 'Accessories', 'Beauty'].map((cat) => (
                <button
                  key={cat}
                  id={`mobile-header-cat-${cat}`}
                  onClick={() => {
                    handleCategoryNav(cat);
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-full bg-slate-100 border border-slate-150 px-3 py-1 font-sans text-xxs font-semibold text-slate-600"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
