import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, HelpCircle, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onProceedToCheckout: () => void;
  onBackToShop: () => void;
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onProceedToCheckout,
  onBackToShop,
}: CartViewProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  // Dynamic Coupon Discounter calculations
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === 'ETHELEGANCE20') return subtotal * 0.20;
    if (appliedCoupon === 'ETHICVIP25') return subtotal * 0.25;
    if (appliedCoupon === 'MONSOONGALA') return subtotal * 0.15;
    if (appliedCoupon === 'WELCOMEET') return subtotal > 50 ? 15 : 0;
    if (appliedCoupon === 'BRASSGLOW') return subtotal * 0.10;
    return 0;
  }, [appliedCoupon, subtotal]);

  const estimatedTax = (subtotal - discountAmount) * 0.08; // 8% average VAT
  const shippingFee = subtotal > 150 ? 0 : 12; // Free delivery threshold
  const orderTotal = subtotal - discountAmount + estimatedTax + shippingFee;

  const handleApplyCouponForm = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCoupon = couponInput.trim().toUpperCase();
    if (['ETHELEGANCE20', 'ETHICVIP25', 'MONSOONGALA', 'WELCOMEET', 'BRASSGLOW'].includes(cleanCoupon)) {
      onApplyCoupon(cleanCoupon);
      setCouponError('');
    } else {
      setCouponError('Invalid voucher code. Double check the spelling or claim some on our Deals page.');
    }
  };

  // Frequently bought together helper
  function useMemo<T>(fn: () => T, deps: any[]): T {
    return React.useMemo(fn, deps);
  }

  if (cartItems.length === 0) {
    return (
      <div id="empty-cart-container" className="mx-auto max-w-xl px-4 py-20 text-center animate-fade-in font-sans space-y-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-400 mx-auto">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <div className="space-y-1.5">
          <h2 className="font-sans text-xl font-bold text-slate-900">Your Shopping Cart is Empty</h2>
          <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            You haven't added any luxury styling garments or smart gadgets to your shopping cart. Explore our curated collections to get started!
          </p>
        </div>
        <button
          id="cart-shop-now-btn"
          onClick={onBackToShop}
          className="rounded-lg bg-indigo-600 font-sans text-xs font-bold text-white px-5 py-3 shadow-md hover:bg-indigo-700 transition"
        >
          Explore Catalog Now
        </button>
      </div>
    );
  }

  return (
    <div id="cart-view-container" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in font-sans">
      <h1 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        
        {/* ================= LEFT SIDE: PRODUCTS LIST SUMMARY ================= */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              id={`cart-item-${item.product.id}`}
              className="flex flex-col sm:flex-row gap-4 rounded-xl border border-slate-105 bg-white p-4 text-slate-800 shadow-2xs hover:shadow-xs transition"
            >
              {/* Product Thumbnail */}
              <img
                src={item.product.images[0]}
                alt={item.product.title}
                referrerPolicy="no-referrer"
                className="h-24 w-24 shrink-0 rounded-lg object-cover bg-slate-50 border border-slate-100"
              />

              {/* Specs & controls */}
              <div className="flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] font-bold text-indigo-600 uppercase tracking-widest">{item.product.category} &bull; {item.product.subcategory}</span>
                    <button
                      id={`remove-cart-item-${item.product.id}`}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-rose-500 rounded p-1 hover:bg-slate-50 transition"
                      title="Remove product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="font-sans text-xs font-extrabold text-slate-900 line-clamp-1">{item.product.title}</h3>
                  <div className="flex flex-wrap gap-2 text-[10px] text-slate-450 font-sans">
                    {item.selectedSize && <span>Size: <strong className="text-slate-755 font-mono">{item.selectedSize}</strong></span>}
                    {item.selectedColor && <span>Color: <strong className="text-slate-755 font-mono">{item.selectedColor}</strong></span>}
                    <span>SKU Code: <strong className="text-slate-755 font-mono">{item.product.sku}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-auto">
                  {/* Quantity adjustments */}
                  <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                    <button
                      id={`quant-minus-${item.product.id}`}
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-550 font-bold hover:text-indigo-650"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-mono text-xs font-bold text-slate-800">{item.quantity}</span>
                    <button
                      id={`quant-plus-${item.product.id}`}
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-550 font-bold hover:text-indigo-650"
                    >
                      +
                    </button>
                  </div>

                  {/* Pricing cost total */}
                  <div>
                    <span className="font-sans text-sm font-black text-slate-900 block">${item.product.price * item.quantity}</span>
                    {item.quantity > 1 && (
                      <span className="font-sans text-[10px] text-slate-400 font-medium block">(${item.product.price} each)</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}

          <button
            id="continue-shopping-btn"
            onClick={onBackToShop}
            className="font-sans text-xs font-bold text-indigo-600 hover:text-indigo-805 hover:underline flex items-center gap-1.5"
          >
            ← Continue Shopping across categories
          </button>
        </div>

        {/* ================= RIGHT SIDE: ORDER TOTALS SUMMARY ================= */}
        <div className="space-y-6">
          
          {/* Voucher input form box */}
          <div className="rounded-2xl border border-slate-105 bg-white p-5 space-y-3 shadow-2xs">
            <h3 className="font-sans font-black text-xs uppercase tracking-wider text-slate-900">Have a Promotional Voucher?</h3>
            <form onSubmit={handleApplyCouponForm} className="flex gap-2">
              <input
                id="cart-coupon-textbox"
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="e.g. ETHELEGANCE20"
                className="flex-1 rounded-lg border border-slate-205 px-3 py-2 text-xs font-mono text-slate-800 uppercase focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
              <button
                id="apply-coupon-form-btn"
                type="submit"
                className="rounded-lg bg-slate-900 hover:bg-indigo-600 px-4 py-2 font-sans text-xs font-bold text-white transition shrink-0"
              >
                Apply
              </button>
            </form>
            
            {couponError && (
              <p className="font-sans text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{couponError}</span>
              </p>
            )}

            {appliedCoupon && (
              <div className="rounded bg-teal-50 border border-teal-150 p-2 text-xxs font-semibold text-teal-700 flex items-center justify-between">
                <span>Code Active: <strong className="font-mono">{appliedCoupon}</strong></span>
                <button
                  id="remove-coupon-btn"
                  onClick={() => onApplyCoupon('')}
                  className="font-bold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Pricing Ledger Card */}
          <div className="rounded-2xl border border-slate-105 bg-slate-50 p-5 space-y-4 shadow-2xs">
            <h3 className="font-sans font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2.5">Order Invoice Breakdown</h3>

            <div className="space-y-2.5 font-sans text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-bold font-sans text-slate-900">${subtotal}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-teal-650 font-bold">
                  <span>Promo Voucher Saving:</span>
                  <span>-${Math.floor(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>8% Estimated State/VAT Tax:</span>
                <span className="font-bold font-sans text-slate-900">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Standard Insured Shipping:</span>
                <span className="font-bold font-sans text-slate-900">
                  {shippingFee === 0 ? (
                    <span className="text-teal-605 font-bold uppercase font-mono text-[10px]">FREE SHIPPING</span>
                  ) : (
                    `$${shippingFee}`
                  )}
                </span>
              </div>
              
              {shippingFee > 0 && (
                <p className="font-sans text-[10px] text-indigo-600 font-semibold block pt-0.5">
                  💡 Hint: Add ${(150 - subtotal)} more to qualify for FREE shipping!
                </p>
              )}
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline font-sans">
              <span className="font-black text-slate-900 text-sm">Grand Invoice Total:</span>
              <span className="font-sans text-xl font-extrabold text-slate-950">${orderTotal.toFixed(2)}</span>
            </div>

            <button
              id="proceed-to-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-sans text-sm font-semibold py-3 text-white shadow-lg transition"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>

            <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-sans">
              <ShieldCheck className="h-4 w-4 text-teal-500 shrink-0" />
              <span>Checkout protected with 256-bit AES protection</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
