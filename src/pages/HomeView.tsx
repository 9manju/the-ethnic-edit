import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingCart, Percent, Zap, Star, Sparkles, Mail, Check, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

interface HomeViewProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  setActiveTab: (tab: string) => void;
  onSelectCategory: (cat: string) => void;
}

export default function HomeView({
  onSelectProduct,
  onAddToCart,
  setActiveTab,
  onSelectCategory
}: HomeViewProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [emailValue, setEmailValue] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 14, minutes: 32, seconds: 45 }; // reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setSubscribed(true);
      setEmailValue('');
    }
  };

  const categories = [
    { name: 'Fashion', keyword: 'Fashion', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600', description: 'Designer kurtas, sherwanis, and luxury footwear' },
    { name: 'Electronics', keyword: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', description: 'Premium ANC headphones, soundbars, and smart devices' },
    { name: 'Accessories', keyword: 'Accessories', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600', description: 'Heritage Kundan jewels and automatic chronographs' },
    { name: 'Lifestyle', keyword: 'Lifestyle', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600', description: 'Moradabadi brass items and artisanal clay tea utilities' },
    { name: 'Beauty', keyword: 'Beauty', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=600', description: 'Plant-derived serums and Kashmiri saffron essences' }
  ];

  const bestSellers = INITIAL_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const flashSaleItems = INITIAL_PRODUCTS.filter((p) => p.isFlashSale).slice(0, 3);
  const newArrivals = INITIAL_PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  const testimonials = [
    { name: 'Aarohan Mukherjee', role: 'Premium Member', text: 'The Jaipuri Anarkali is spectacular. Heavy, authentic silk and pristine hand embroidery. Unmatched luxury feel!', rating: 5 },
    { name: 'Nisha Sundaram', role: 'Verified Customer', text: 'Stunning customer desk support. They helped me customize my jewel sizes. The brass urli looks divine in our foyer.', rating: 5 },
    { name: 'Jonathan Pierce', role: 'Vocal Musician', text: 'I am blown away by the noise isolation on the AuraSound headphones. Soundstaging is clean and warm.', rating: 5 }
  ];

  const instagramPosts = [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=300'
  ];

  return (
    <div id="home-view-wrapper" className="space-y-16 pb-16 animate-fade-in font-sans">
      
      {/* 1. Hero Section */}
      <section id="hero-banner" className="relative overflow-hidden bg-slate-900 text-white">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/85 to-indigo-950/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=100&w=1500"
          alt="Luxury Lifestyle Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />

        <div className="relative z-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 font-mono text-xxs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles className="h-3.5 w-3.5" /> High-End Curated Shopping
            </span>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Discover Style, <br/>
              <span className="text-linear-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Technology & Lifestyle</span> <br/>
              in One Place
            </h1>
            <p className="font-sans text-sm text-slate-300 leading-relaxed md:text-base max-w-lg">
              Shop the latest artisanal apparel, state-of-the-art noise isolation gadgets, hand-cast home treasures, and organic skincare elixirs at unmatched prices.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="hero-shop-btn"
                onClick={() => setActiveTab('shop')}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-sans text-sm font-semibold hover:bg-indigo-700 hover:scale-101 shadow-lg transition"
              >
                <span>Shop Now Range</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                className="rounded-lg border border-slate-700 bg-slate-950/60 px-6 py-3 font-sans text-sm font-semibold text-slate-200 hover:bg-slate-900 transition"
                onClick={() => {
                  const target = document.getElementById('featured-categories-section');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Collections
              </button>
            </div>
          </div>

          {/* Side Hero visual card */}
          <div className="hidden lg:block w-96 relative shrink-0 z-10">
            <div className="relative rounded-2xl border border-slate-700 bg-slate-950/80 p-4.5 shadow-2xl backdrop-blur-md">
              <div className="absolute -top-4 -right-4 rounded-full bg-amber-500 px-3 py-1 text-slate-950 font-mono text-xxxs font-black animate-bounce">
                HIGHLIGHT
              </div>
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400"
                alt="Product Showcase"
                referrerPolicy="no-referrer"
                className="h-56 w-full rounded-xl object-cover"
              />
              <div className="mt-4">
                <span className="font-mono text-[9px] font-bold text-amber-400 tracking-widest uppercase">Elite Heritage Collection</span>
                <h4 className="font-sans text-sm font-extrabold text-white mt-1">Gilded Kundan Peacock Choker</h4>
                <div className="mt-1.5 flex items-center justify-between">
                  <div>
                    <span className="font-sans text-sm font-black text-white">$135</span>
                    <span className="ml-1.5 font-sans text-xxs text-slate-400 line-through">$199</span>
                  </div>
                  <span className="rounded-sm bg-teal-500/15 px-2 py-0.5 font-mono text-xxs font-bold text-teal-400">
                    32% OFF
                  </span>
                </div>
                <button
                  id="hero-quick-view-btn"
                  onClick={() => {
                    const showcase = INITIAL_PRODUCTS.find(p => p.id === 'acc-002');
                    if (showcase) onSelectProduct(showcase);
                  }}
                  className="mt-4 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-center text-xs font-semibold py-2.5 transition text-white"
                >
                  Quick View Heirloom
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section id="featured-categories-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-8">
          <div>
            <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest">Preeminent Curation</span>
            <h2 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-1">Featured Collections</h2>
          </div>
          <button onClick={() => setActiveTab('shop')} className="hidden md:flex items-center gap-1.5 font-sans text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition">
            <span>Scan Entire Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              id={`cat-card-${cat.name}`}
              onClick={() => onSelectCategory(cat.keyword)}
              className="group relative h-72 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xs hover:shadow-lg cursor-pointer transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent p-4 flex flex-col justify-end text-white" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 space-y-1">
                <span className="font-mono text-[9px] font-black tracking-widest text-amber-400 uppercase">COLLECTION</span>
                <h3 className="font-sans font-bold text-base text-white group-hover:text-amber-300 transition-colors">{cat.name}</h3>
                <p className="font-sans text-xxs text-slate-300 line-clamp-2 leading-snug">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Flash Sale Section */}
      <section id="flash-sale-banner" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-amber-200 bg-linear-to-r from-amber-500/10 via-amber-50 to-indigo-50 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Ticking Ticker Left Side */}
          <div className="space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 border border-amber-200 text-amber-800 px-3 py-1 font-mono text-xxxs font-extrabold uppercase tracking-wide">
              <Zap className="h-3 w-3 fill-amber-500 stroke-none" /> LIMITED DEAL TICKER &bull; HURRY
            </span>
            <h3 className="font-sans text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">The Midnight Gold Rush Deals</h3>
            <p className="font-sans text-xs text-slate-600 leading-relaxed max-w-md">
              A carefully hand-curated tier of ancestral designs, elite smart timepieces, and solid brass collectibles at 35% discount for the next few hours.
            </p>
            
            {/* Live Count clock */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-1 font-mono">
              <div className="flex flex-col items-center">
                <span className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-bold text-amber-400 shadow-md">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-sans font-semibold text-slate-500 mt-1 uppercase">Hours</span>
              </div>
              <span className="text-slate-500 font-bold">:</span>
              <div className="flex flex-col items-center">
                <span className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-bold text-amber-400 shadow-md">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-sans font-semibold text-slate-500 mt-1 uppercase">Mins</span>
              </div>
              <span className="text-slate-500 font-bold">:</span>
              <div className="flex flex-col items-center">
                <span className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-bold text-amber-400 shadow-md">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-sans font-semibold text-slate-500 mt-1 uppercase">Secs</span>
              </div>
            </div>
          </div>

          {/* Flash sale items list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:max-w-xl">
            {flashSaleItems.map((p) => {
              // Simulating progress level bar: 12 left of 20 total
              const percentageLeft = (p.stock / (p.stock + 12)) * 100;
              return (
                <div
                  key={p.id}
                  id={`flash-product-${p.id}`}
                  onClick={() => onSelectProduct(p)}
                  className="rounded-xl border border-white bg-white/70 p-3 shadow-xs hover:shadow-md transition cursor-pointer select-none relative group"
                >
                  <span className="absolute top-2.5 right-2.5 rounded bg-rose-500 text-white px-2 py-0.5 font-mono text-[9px] font-black z-10">
                    -{p.discount}%
                  </span>
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="h-32 w-full rounded-lg object-cover group-hover:scale-101 transition-transform"
                  />
                  <h4 className="font-sans text-xs font-bold text-slate-900 mt-2.5 truncate">{p.title}</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="font-sans text-xs font-extrabold text-slate-900">${p.price}</span>
                    <span className="font-sans text-xxs text-slate-400 line-through">${p.originalPrice}</span>
                  </div>
                  {/* Stock left state */}
                  <div className="mt-2.5">
                    <div className="flex justify-between items-center text-[10px] font-medium text-slate-500">
                      <span>Only {p.stock} units left</span>
                      <span className="font-bold text-rose-650">Urgent</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-205 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${percentageLeft}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Best Sellers Section */}
      <section id="bestsellers-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-2">
          <div>
            <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest">Highly Deserved Tags</span>
            <h2 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-1">Our Top Best Sellers</h2>
          </div>
          <button onClick={() => setActiveTab('shop')} className="rounded-lg bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 font-sans text-xs font-bold text-indigo-700 px-4 py-2 transition">
            Explore All Best Sellers
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <div
              key={p.id}
              id={`best-seller-${p.id}`}
              onClick={() => onSelectProduct(p)}
              className="group relative flex flex-col rounded-xl border border-slate-100 bg-white p-3 shadow-xs hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-slate-50 h-56">
                <span className="absolute top-2 left-2 z-10 rounded bg-slate-900 text-amber-400 px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wide">
                  BEST SELLER
                </span>
                <img
                  src={p.images[0]}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between mt-3">
                <div>
                  <span className="font-mono text-[10px] font-semibold text-indigo-600 uppercase tracking-widest">
                    {p.category} &bull; {p.subcategory}
                  </span>
                  <h3 className="font-sans text-sm font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {p.title}
                  </h3>
                  {/* Rating inline */}
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-3 w-3 ${s <= Math.floor(p.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 font-bold">({p.reviewCount} Reviews)</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
                  <div>
                    <span className="font-sans text-sm font-black text-slate-900">${p.price}</span>
                    <span className="ml-1.5 font-sans text-xxs text-slate-400 line-through">${p.originalPrice}</span>
                  </div>
                  <button
                    id={`add-to-cart-best-${p.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(p);
                    }}
                    className="flex items-center gap-1 rounded bg-slate-800 px-3 py-1.5 font-sans text-xxs font-bold text-white hover:bg-indigo-600 transition"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. New Arrivals Section */}
      <section id="new-arrivals-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-2">
          <div>
            <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest">Recent Ateliers drop</span>
            <h2 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-1">Brand New Arrivals</h2>
          </div>
          <span className="font-sans text-xs text-slate-500 font-medium">✨ Refreshed with 5 elite models just this hour</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <div
              key={p.id}
              id={`new-arrival-${p.id}`}
              onClick={() => onSelectProduct(p)}
              className="group relative flex flex-col rounded-xl border border-slate-100 bg-white p-3 shadow-xs hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-slate-50 h-56">
                <span className="absolute top-2 left-2 z-10 rounded bg-teal-500 text-white px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wide">
                  RECENT ARRIVAL
                </span>
                <img
                  src={p.images[0]}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between mt-3">
                <div>
                  <span className="font-mono text-[10px] font-semibold text-indigo-600 uppercase tracking-widest">
                    {p.category} &bull; {p.subcategory}
                  </span>
                  <h3 className="font-sans text-sm font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-3 w-3 ${s <= Math.floor(p.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 font-bold">({p.reviewCount})</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
                  <div>
                    <span className="font-sans text-sm font-black text-slate-900">${p.price}</span>
                    <span className="ml-1.5 font-sans text-xxs text-slate-400 line-through">${p.originalPrice}</span>
                  </div>
                  <button
                    id={`add-to-cart-new-${p.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(p);
                    }}
                    className="flex items-center gap-1 rounded bg-slate-800 px-3 py-1.5 font-sans text-xxs font-bold text-white hover:bg-indigo-600 transition"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section id="testimonials-section" className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest">Trust & Credentials</span>
            <h2 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-1">What Luxury Aficionados Say</h2>
            <p className="font-sans text-xs text-slate-500 mt-2">Connecting preeminent artisanal designs with pristine customer satisfaction metrics.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div key={idx} className="rounded-xl border border-slate-100 bg-white p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-500 mb-3">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                  <p className="font-sans text-xs text-slate-600 italic leading-relaxed">"{t.text}"</p>
                </div>
                <div className="border-t border-slate-50 pt-4 mt-5 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold font-sans text-indigo-700 text-xs shadow-inner">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-slate-950">{t.name}</h4>
                    <span className="font-mono text-[9px] text-slate-400 font-semibold uppercase">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Subscription & Exit coupon link */}
      <section id="newsletter-bar" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-900 to-indigo-950 p-6 md:p-10 text-white shadow-xl">
          {/* subtle gold ambient circle */}
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl text-center lg:text-left">
              <span className="font-mono text-xxxs font-bold text-amber-300 uppercase tracking-widest">Atelier Membership</span>
              <h3 className="font-sans text-xl font-extrabold sm:text-2xl tracking-tight">Unlock an immediate 20% Discount Code</h3>
              <p className="font-sans text-xs text-indigo-200 leading-normal max-w-md">
                Register to our design newsletter. We send occasional, highly-curated luxury style releases, and flash tech coupon discounts.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 rounded-lg bg-teal-500/20 border border-teal-500/30 p-4 text-emerald-300">
                <Check className="h-5 w-5" />
                <span className="font-sans text-xs font-semibold">Joined successfully! Use code ETHELEGANCE20 in your current cart checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="Enter your personal email address..."
                  className="w-full rounded-lg border border-indigo-700/65 bg-indigo-950/65 px-3.5 py-2 text-xs font-sans text-white focus:outline-hidden focus:ring-1 focus:ring-amber-500 font-sans"
                  required
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="rounded-lg bg-amber-500 hover:bg-amber-600 px-5 py-2 font-sans text-xs font-bold text-indigo-950 hover:scale-101 transition shrink-0"
                >
                  Join Membership
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. Instagram Lifestyle Gallery */}
      <section id="instagram-gallery" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest">Curated Social proof</span>
          <h2 className="font-sans text-2xl font-black text-slate-900 tracking-tight mt-1">Lifestyle Moments #TheEthnicEdit</h2>
          <p className="font-sans text-xs text-slate-500 mt-2">Follow our dynamic styling journey on Instagram for daily organic inspirations.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((src, idx) => (
            <div
              key={idx}
              className="group relative aspect-square overflow-hidden rounded-lg bg-slate-100 border border-slate-50 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={src}
                alt={`Instagram lifestyle model ${idx}`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-black/40 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1 font-sans">
                <MessageSquare className="h-4 w-4" />
                <span>Interact</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
