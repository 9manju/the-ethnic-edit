import React, { useState } from 'react';
import { User, Package, Heart, MapPin, Bell, Trash2, ArrowRight } from 'lucide-react';
import { Order, Product } from '../types';

interface AccountViewProps {
  orders: Order[];
  wishlist: Product[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  setActiveTab: (tab: string) => void;
  onSelectProduct: (p: Product) => void;
}

export default function AccountView({
  orders,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  setActiveTab,
  onSelectProduct,
}: AccountViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses' | 'notifications'>('profile');

  // Profiles mock parameters
  const [name, setName] = useState('Manjusha Repalle');
  const [email, setEmail] = useState('repallemanjusha18@gmail.com');
  const [phone, setPhone] = useState('+91 94945 92400');
  const [address, setAddress] = useState('Flat 404, Galleria Crescent, Bandra West');
  const [city, setCity] = useState('Mumbai, Maharashtra');
  const [zip, setZip] = useState('400050');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Notifications
  const notificationsList = [
    { id: 1, title: '🚚 Order Dispatched', text: 'Your Premium Kundan Peacock Choker Set has left the Jaipur facility.', time: '1 hour ago' },
    { id: 2, title: '⚡ Secret 25% Coupon Claimed', text: 'You claimed the ETHICVIP25 voucher on the offers scratcher.', time: '12 hours ago' },
    { id: 3, title: '✨ Welcome to The Ethnic Edit', text: 'Your luxury shopping catalog is active. Feel free to interact with our AI Stylist.', time: 'June 11, 2026' }
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2500);
  };

  return (
    <div id="account-view-container" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in font-sans">
      <h1 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mb-8">My Atelier Account</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* ================= LEFT SIDEBAR SELECTOR ================= */}
        <nav className="flex flex-row overflow-x-auto gap-1 border-b border-slate-100 pb-3 lg:flex-col lg:border-b-0 lg:border-r lg:pr-5 scrollbar-thin">
          {[
            { id: 'profile', label: 'My Profile Controls', icon: <User className="h-4 w-4" /> },
            { id: 'orders', label: `My Order Records (${orders.length})`, icon: <Package className="h-4 w-4" /> },
            { id: 'wishlist', label: `My Liked Items (${wishlist.length})`, icon: <Heart className="h-4 w-4" /> },
            { id: 'addresses', label: 'Registered Addresses', icon: <MapPin className="h-4 w-4" /> },
            { id: 'notifications', label: 'Inbox Alerts', icon: <Bell className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`account-tab-${tab.id}`}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2.5 rounded-lg px-3.5 py-3 text-xs font-semibold uppercase tracking-wider text-left transition shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* ================= RIGHT SIDE CONTENT PANE ================= */}
        <div className="lg:col-span-3 min-h-[50vh]">
          
          {/* SUB-VIEW 1: PROFILES MANAGEMENT */}
          {activeSubTab === 'profile' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-baseline flex-wrap gap-2">
                <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900">My Profile Controls</h3>
                <span className="font-mono text-xxs font-bold text-slate-400">MEMBERSHIP: <strong className="text-amber-500 font-bold font-sans">ATELIER GOLD</strong></span>
              </div>

              {profileSuccess && (
                <div className="rounded-lg bg-teal-50 border border-teal-150 p-3 text-center text-xs font-semibold text-teal-700 animate-fade-in">
                  ✓ Profile coordinates synchronized successfully!
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-205 px-3 py-2 text-xs text-slate-800"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-slate-205 px-3 py-2 text-xs text-slate-800 focus:outline-hidden"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-205 px-3 py-2 text-xs text-slate-800"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  id="save-profile-btn"
                  type="submit"
                  className="rounded-lg bg-slate-900 hover:bg-indigo-650 text-white font-sans text-xs font-bold px-4.5 py-2.5 transition"
                >
                  Synchronize Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* SUB-VIEW 2: ORDER HISTORY */}
          {activeSubTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">My Order Records</h3>

              {orders.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 border border-slate-100 rounded-2xl max-w-md mx-auto space-y-4">
                  <span className="text-2xl">📦</span>
                  <h4 className="font-sans text-sm font-bold text-slate-800">No Purchase History Found</h4>
                  <p className="font-sans text-xxs text-slate-400">We couldn't locate any completed invoices. Purchases will appear immediately.</p>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="rounded bg-indigo-600 px-3 py-1.5 font-sans text-xxs font-bold text-white hover:bg-indigo-700 transition"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {orders.map((ord) => (
                    <div key={ord.id} id={`history-order-${ord.id}`} className="rounded-2xl border border-slate-150 overflow-hidden bg-white">
                      {/* Top bar details */}
                      <div className="bg-slate-50 border-b border-slate-150 px-4 py-3 flex justify-between items-center flex-wrap gap-2 text-xxs font-mono">
                        <div className="space-y-0.5">
                          <span className="font-sans font-bold text-slate-500">Invoice ID</span>
                          <p className="font-sans font-black text-slate-905">{ord.id}</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-sans font-bold text-slate-500">Date Dispatched</span>
                          <p className="font-sans font-semibold text-slate-800">{ord.date}</p>
                        </div>
                        <div className="space-y-0.5 text-right">
                          <span className="font-sans font-bold text-slate-550">Processing Status</span>
                          <span className="rounded bg-indigo-100 text-indigo-700 font-sans font-bold px-1.5 py-0.2 uppercase tracking-wide block text-center min-w-[70px]">
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      {/* Items details */}
                      <div className="p-4 divide-y divide-slate-100 space-y-3 font-sans text-xs text-slate-800">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center pt-2 first:pt-0">
                            <img src={item.image} alt={item.title} referrerPolicy="no-referrer" className="h-10 w-10 object-cover rounded border" />
                            <div className="flex-1 min-w-0">
                              <h4 className="truncate font-extrabold text-slate-900 leading-snug">{item.title}</h4>
                              <p className="text-slate-400 text-xxs">Quantity: {item.quantity} &bull; ${item.price} each</p>
                            </div>
                            <span className="font-bold text-slate-950">${item.price * item.quantity}</span>
                          </div>
                        ))}

                        <div className="pt-3 flex justify-between items-baseline font-sans text-xs border-t border-slate-100">
                          <span className="text-slate-500">Settled via: <strong className="text-slate-800 font-mono text-xxs">{ord.paymentMethod}</strong></span>
                          <span>Invoice Total: <strong className="text-indigo-650 font-black text-sm">${ord.total}</strong></span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SUB-VIEW 3: WISHLIST TRACKING */}
          {activeSubTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">My Liked Items</h3>

              {wishlist.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 border border-slate-100 rounded-2xl max-w-md mx-auto space-y-4 animate-fade-in text-slate-800">
                  <span className="text-2xl">❤️</span>
                  <h4 className="font-sans text-sm font-bold text-slate-805">No Liked Items Registered</h4>
                  <p className="font-sans text-xxs text-slate-400">Keep track of outstanding outfits or electronics across catalog pages.</p>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="rounded bg-indigo-650 px-3 py-1.5 font-sans text-xxs font-bold text-white hover:bg-indigo-755 transition"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {wishlist.map((p) => (
                    <div
                      key={p.id}
                      id={`liked-item-${p.id}`}
                      className="group rounded-xl border border-slate-150 p-2.5 bg-white relative hover:shadow-md transition cursor-pointer flex flex-col justify-between h-72 text-slate-800"
                      onClick={() => onSelectProduct(p)}
                    >
                      <button
                        id={`delete-liked-${p.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(p);
                        }}
                        className="absolute top-2 right-2 rounded-full p-1 bg-white/80 hover:bg-white text-slate-400 hover:text-rose-500 shadow-md z-10 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="relative h-36 overflow-hidden rounded-lg bg-slate-50">
                        <img src={p.images[0]} alt={p.title} referrerPolicy="no-referrer" className="h-full w-full object-cover group-hover:scale-101 transition-transform" />
                      </div>

                      <div className="mt-2 space-y-1">
                        <span className="font-mono text-[9px] font-bold text-indigo-505 uppercase block">{p.subcategory}</span>
                        <h4 className="truncate font-sans text-xs font-bold text-slate-900 group-hover:text-indigo-600 leading-snug">{p.title}</h4>
                        <div className="flex justify-between items-baseline pt-1">
                          <span className="font-sans text-xs font-extrabold text-slate-950">${p.price}</span>
                          <span className="font-sans text-xxxs text-slate-400 line-through">${p.originalPrice}</span>
                        </div>
                      </div>

                      <button
                        id={`wishlist-add-to-cart-${p.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(p);
                        }}
                        className="w-full mt-3 rounded bg-slate-905 hover:bg-indigo-600 font-sans text-xxs font-bold py-2 text-white transition-colors"
                      >
                        Add to Cart List
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SUB-VIEW 4: REGISTERED ADDRESSES */}
          {activeSubTab === 'addresses' && (
            <div className="space-y-6 font-sans text-xs text-slate-650 leading-relaxed">
              <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">Saved Addresses</h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/20 p-4 relative space-y-2.5">
                  <span className="absolute top-3 right-3 rounded bg-indigo-100 text-indigo-705 px-2 py-0.5 font-mono text-[8px] font-bold uppercase">
                    DEFAULT BILLING
                  </span>
                  <p className="font-bold font-sans text-slate-900 text-xs">Atelier HQ Residence</p>
                  <p className="text-slate-600">
                    Suite {zip}, Flat 404, Galleria Crescent, Bandra West <br/>
                    {city}, India
                  </p>
                  <span className="font-mono text-xxs block pt-2 text-slate-400">Mobile Phone Coordinate: {phone}</span>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 5: ALERTS INBOX */}
          {activeSubTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">Inbox Alerts</h3>
              
              <div className="space-y-3.5 max-w-xl">
                {notificationsList.map((not) => (
                  <div key={not.id} className="rounded-xl border border-slate-100 bg-white p-4 flex gap-3.5 shadow-2xs items-start font-sans text-xs">
                    <div className="h-2 w-2 rounded-full bg-indigo-500 mt-1.5 shrink-0 animate-ping" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-900">{not.title}</h4>
                        <span className="font-sans text-[10px] text-slate-400 shrink-0">{not.time}</span>
                      </div>
                      <p className="text-slate-500 text-xs mt-1 leading-normal">{not.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
