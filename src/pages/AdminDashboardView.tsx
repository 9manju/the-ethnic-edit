import React, { useState } from 'react';
import { ShieldAlert, BarChart3, Package, Users, Tag, Check, ArrowRight, RefreshCcw, TrendingUp } from 'lucide-react';
import { Product, Order, Coupon } from '../types';

interface AdminDashboardViewProps {
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  onUpdateOrderStatus: (id: string, status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned') => void;
  onUpdateProductStock: (id: string, newStock: number) => void;
  onCreateCoupon: (coupon: Coupon) => void;
}

export default function AdminDashboardView({
  products,
  orders,
  coupons,
  onUpdateOrderStatus,
  onUpdateProductStock,
  onCreateCoupon,
}: AdminDashboardViewProps) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'analytics' | 'orders' | 'inventory' | 'coupons'>('analytics');

  // Coupon creator input form state
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(15);
  const [couponMinAmount, setCouponMinAmount] = useState(50);
  const [couponDesc, setCouponDesc] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  const totalSales = orders.reduce((acc, curr) => acc + curr.total, 0);

  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;

    const newCoupon: Coupon = {
      code: couponCode.trim().toUpperCase(),
      discountPercentage: couponDiscount,
      minAmount: couponMinAmount,
      description: couponDesc || `Take ${couponDiscount}% off orders over $${couponMinAmount}`,
      expiryDate: '2026-12-31',
    };

    onCreateCoupon(newCoupon);
    setCouponSuccess(true);
    setCouponCode('');
    setCouponDesc('');
    setTimeout(() => setCouponSuccess(false), 2500);
  };

  // SVG Chart Mock data representing weeks operations
  const salesChartData = [
    { label: 'W1', sales: 1200 },
    { label: 'W2', sales: 1850 },
    { label: 'W3', sales: 900 },
    { label: 'W4', sales: 2400 },
    { label: 'W5', sales: 3105 },
    { label: 'W6', sales: (totalSales > 0 ? (totalSales + 1200) : 1500) } // Dynamic updates when they buy!
  ];

  const maxChartValue = Math.max(...salesChartData.map(d => d.sales));

  return (
    <div id="admin-view-wrapper" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in font-sans">
      
      {/* Alert Header indicator */}
      <div className="rounded-xl bg-slate-900 text-white p-5 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-emerald-500/15 border border-emerald-500/30 p-2 text-emerald-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-sans font-bold tracking-wide text-white">Merchant Sandbox Center</h2>
            <p className="font-sans text-xxs text-slate-400">Verify inventory levels, update pending order shipping logs, and monitor SVG transaction analytics.</p>
          </div>
        </div>

        {/* Quick status dots */}
        <div className="flex gap-4 font-mono text-[10px]">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> SYSTEM ACTIVE</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" /> DEV PREVIEW MODE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* ================= ADMIN SELECTOR TAB COLUMN ================= */}
        <aside className="lg:col-span-1 space-y-1">
          {[
            { id: 'analytics', label: 'Operations Analytics', icon: <BarChart3 className="h-4 w-4" /> },
            { id: 'orders', label: `Fulfillment Orders [${orders.length}]`, icon: <Package className="h-4 w-4" /> },
            { id: 'inventory', label: 'Inventory Stock Room', icon: <Users className="h-4 w-4" /> },
            { id: 'coupons', label: `Promo Coupon Builder [${coupons.length}]`, icon: <Tag className="h-4 w-4" /> }
          ].map((subTab) => (
            <button
              key={subTab.id}
              id={`admin-tab-${subTab.id}`}
              onClick={() => setActiveAdminSubTab(subTab.id as any)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-3.5 py-3 text-xs font-semibold uppercase tracking-wider text-left transition ${
                activeAdminSubTab === subTab.id
                  ? 'bg-emerald-50 text-emerald-805 font-bold border border-emerald-200'
                  : 'text-slate-650 hover:bg-slate-50 border border-transparent'
              }`}
            >
              {subTab.icon}
              <span>{subTab.label}</span>
            </button>
          ))}
        </aside>

        {/* ================= ADMIN CONTENTS DISPLAY ================= */}
        <main className="lg:col-span-3 min-h-[50vh]">
          
          {/* TAB 1: OPERATIONS ANALYTICS CHART */}
          {activeAdminSubTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">Operations Analytics</h3>

              {/* Bento style card statistics indicators */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-150 bg-slate-50 p-4 space-y-1">
                  <span className="font-mono text-[9px] font-bold text-slate-405 block uppercase">COMBINED GROSS TURNOVER</span>
                  <p className="font-sans text-xl font-extrabold text-slate-905">${(9455 + totalSales).toFixed(2)}</p>
                  <span className="text-[10px] text-emerald-600 block">&uarr; 34% Increase standard indices</span>
                </div>
                <div className="rounded-xl border border-slate-150 bg-slate-50 p-4 space-y-1">
                  <span className="font-mono text-[9px] font-bold text-slate-405 block uppercase">TRANSACTION INVOICES LOGGED</span>
                  <p className="font-sans text-xl font-extrabold text-slate-905">{162 + orders.length}</p>
                  <span className="text-[10px] text-teal-600 block">✓ 100% gateway confirmation rates</span>
                </div>
                <div className="rounded-xl border border-slate-150 bg-slate-50 p-4 space-y-1">
                  <span className="font-mono text-[9px] font-bold text-slate-405 block uppercase">SAVED PROMO COUPON TICKETS</span>
                  <p className="font-sans text-xl font-extrabold text-slate-905">{coupons.length} Active</p>
                  <span className="text-[10px] text-indigo-600 block">⚡ Reveals secret VIP codes to users</span>
                </div>
              </div>

              {/* BEAUTIFUL CUSTOM INTERACTIVE SVG CHART */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold font-sans text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-emerald-500 animate-pulse" />
                    <span>Weekly Revenue Runrate ($)</span>
                  </span>
                  <span className="font-mono text-xxs text-slate-400">UPDATED REAL TIME WHEN YOU CHECKOUT</span>
                </div>

                {/* SVG Visual container */}
                <div className="h-56 w-full flex items-end justify-between pt-6 pr-2.5 pl-2 border-b border-l border-slate-150 pb-2 relative">
                  {salesChartData.map((d, index) => {
                    const heightPercent = (d.sales / maxChartValue) * 80; // scale limit for chart viewport
                    return (
                      <div key={index} className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer relative z-10">
                        {/* Hover values tooltip */}
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-1 rounded bg-slate-900 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 shadow transition-opacity">
                          ${d.sales.toFixed(0)}
                        </span>
                        
                        {/* Animated animated bar */}
                        <div
                          className="w-10 rounded-t-md bg-linear-to-t from-emerald-600 to-teal-400 hover:from-emerald-550 hover:to-teal-450 transition-all duration-700 shadow-xs"
                          style={{ height: `${heightPercent || 10}%` }}
                        />
                        
                        <span className="font-mono text-xxs text-slate-404 mt-2 font-bold">{d.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER FULFILLMENT LOGS */}
          {activeAdminSubTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">Fulfillment Orders Logs</h3>

              {orders.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 border border-slate-100 rounded-2xl max-w-sm mx-auto text-slate-800 space-y-4">
                  <span>📦</span>
                  <h4 className="font-sans text-xs font-bold">No active orders pending sandbox fulfillments</h4>
                  <p className="font-sans text-xxs text-slate-400 leading-normal">Place mock orders by adding items to your cart, completing a secure checkout form, and then return to this sandbox to ship or deliver them!</p>
                </div>
              ) : (
                <div className="space-y-4 font-sans text-xs">
                  {orders.map((ord) => (
                    <div key={ord.id} className="rounded-xl border border-slate-150 p-4 bg-white flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-extrabold text-slate-900">{ord.id}</span>
                          <span className="text-slate-400">&bull; {ord.date} &bull;</span>
                          <span className="rounded bg-indigo-100 text-indigo-700 font-mono text-[9px] font-bold px-1.5 py-0.2 uppercase">
                            {ord.status}
                          </span>
                        </div>
                        <ul className="space-y-1 text-slate-500 text-xxs block font-mono leading-normal">
                          {ord.items.map((it, idx) => (
                            <li key={idx}>&bull; {it.title} (x{it.quantity})</li>
                          ))}
                        </ul>
                        <p className="text-slate-600">📍 Destination Address: <strong className="text-slate-900 font-sans">{ord.shippingAddress}</strong></p>
                        <p className="text-slate-650 font-sans font-bold">Total gross invoice value: <strong className="text-emerald-705 font-sans">${ord.total}</strong></p>
                      </div>

                      {/* Interactive shipment controls */}
                      <div className="flex flex-row md:flex-col gap-2 shrink-0 justify-center">
                        {ord.status === 'Processing' && (
                          <button
                            id={`admin-ship-btn-${ord.id}`}
                            onClick={() => onUpdateOrderStatus(ord.id, 'Shipped')}
                            className="rounded bg-sky-600 hover:bg-sky-700 font-sans text-xxs font-bold text-white px-3 py-1.5 shadow"
                          >
                            Mark as Shipped 🚚
                          </button>
                        )}
                        {ord.status === 'Shipped' && (
                          <button
                            id={`admin-deliver-btn-${ord.id}`}
                            onClick={() => onUpdateOrderStatus(ord.id, 'Delivered')}
                            className="rounded bg-teal-650 hover:bg-teal-750 font-sans text-xxs font-bold text-white px-3 py-1.5 shadow"
                          >
                            Mark as Delivered ✓
                          </button>
                        )}
                        {ord.status === 'Delivered' && (
                          <span className="text-emerald-600 font-bold block text-xxs py-2 flex items-center gap-0.5">
                            ✓ Delivered and Settled
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: INVENTORY STOCK WATCH ROOM */}
          {activeAdminSubTab === 'inventory' && (
            <div className="space-y-6">
              <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">Inventory Stock Room</h3>

              <div className="font-sans border border-slate-150 rounded-xl overflow-hidden bg-white">
                <table className="min-w-full divide-y divide-slate-150 text-xs">
                  <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider text-[10px] font-mono">
                    <tr>
                      <th className="px-4 py-3 text-left">SKU & Product</th>
                      <th className="px-4 py-3 text-center">In-Stock Threshold</th>
                      <th className="px-4 py-3 text-right">Adjustment Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td className="px-4 py-3">
                          <div className="flex gap-2.5 items-center">
                            <img src={p.images[0]} alt={p.title} referrerPolicy="no-referrer" className="h-8 w-8 object-cover rounded border bg-slate-50 shadow-inner" />
                            <div>
                              <p className="font-extrabold text-slate-905">{p.title}</p>
                              <span className="font-mono text-xxs text-slate-400">SKU: {p.id} &bull; ${p.price}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center font-mono font-bold">
                          <span className={`px-2 py-0.5 rounded-full ${p.stock <= 6 ? 'bg-rose-50 text-rose-600 border border-rose-150' : 'bg-emerald-50 text-emerald-605'}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              id={`stock-reduce-${p.id}`}
                              onClick={() => onUpdateProductStock(p.id, Math.max(0, p.stock - 1))}
                              className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700 font-bold text-xs"
                            >
                              -1 Stock
                            </button>
                            <button
                              id={`stock-increase-${p.id}`}
                              onClick={() => onUpdateProductStock(p.id, p.stock + 1)}
                              className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-slate-750 font-bold text-xs"
                            >
                              +1 Stock
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COUPON MANAGEMENT BUILDER */}
          {activeAdminSubTab === 'coupons' && (
            <div className="space-y-6">
              <h3 className="font-sans font-black text-base uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">Promo Coupon Builder</h3>

              {couponSuccess && (
                <div className="rounded-lg bg-teal-50 border border-teal-150 p-3 text-center text-xs font-semibold text-teal-700 animate-fade-in">
                  ✓ Promotional voucher minted successfully! Added directly to list.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form creator */}
                <form onSubmit={handleCreateCouponSubmit} className="space-y-4 font-sans text-xs bg-slate-50 border border-slate-150 rounded-2xl p-5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">Mint New Coupon Code</h4>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Promo Code Name *</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-205 bg-white px-3.5 py-2 text-xs text-slate-800 font-mono focus:outline-hidden"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. MONSOON20"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Percent Discount (%) *</label>
                      <input
                        type="number"
                        className="w-full rounded-lg border border-slate-205 bg-white px-3 py-2 text-xs text-slate-800 font-mono"
                        min={5}
                        max={95}
                        value={couponDiscount}
                        onChange={(e) => setCouponDiscount(Number(e.target.value))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Mins Shopping Spent ($) *</label>
                      <input
                        type="number"
                        className="w-full rounded-lg border border-slate-205 bg-white px-3 py-2 text-xs text-slate-800 font-mono"
                        min={0}
                        max={1000}
                        value={couponMinAmount}
                        onChange={(e) => setCouponMinAmount(Number(e.target.value))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Descriptive Title</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-205 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-hidden"
                      value={couponDesc}
                      onChange={(e) => setCouponDesc(e.target.value)}
                      placeholder="e.g. Take 15% off orders over $50"
                    />
                  </div>

                  <button
                    id="mint-coupon-btn"
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 hover:bg-slate-900 text-white font-sans text-xs font-bold py-2.5 shadow transition-colors"
                  >
                    Mint & Broadcast Voucher
                  </button>
                </form>

                {/* Coupons list */}
                <div className="space-y-3">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 border-b pb-1.5">Broadcasting Coupons List</h4>
                  {coupons.map((c) => (
                    <div key={c.code} className="rounded-xl border border-slate-150 p-3 bg-white space-y-1 shadow-2xs relative">
                      {/* coupons notches */}
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-r-full bg-slate-50 border border-slate-150 h-4 w-2" />
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-l-full bg-slate-50 border border-slate-150 h-4 w-2" />
                      
                      <div className="flex justify-between items-baseline font-mono text-[10px]">
                        <span className="font-extrabold text-slate-900">{c.code}</span>
                        <span className="text-indigo-650 font-bold font-sans">Take {c.discountPercentage}% Off</span>
                      </div>
                      <p className="font-sans text-xxs text-slate-500 leading-snug">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
