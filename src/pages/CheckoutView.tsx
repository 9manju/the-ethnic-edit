import React, { useState } from 'react';
import { CreditCard, ShieldCheck, ArrowRight, CheckCircle, Package, Truck, Wallet, AlertCircle } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  appliedCoupon: string | null;
  onClearCart: () => void;
  onAddOrder: (order: Order) => void;
  setActiveTab: (tab: string) => void;
}

export default function CheckoutView({
  cartItems,
  appliedCoupon,
  onClearCart,
  onAddOrder,
  setActiveTab,
}: CheckoutViewProps) {
  // Input fields state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('India');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'paypal' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  // Processing checkout statuses
  const [isProcessing, setIsProcessing] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

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

  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const shippingFee = subtotal > 150 ? 0 : 12;
  const grandTotal = subtotal - discountAmount + estimatedTax + shippingFee;

  function useMemo<T>(fn: () => T, deps: any[]): T {
    return React.useMemo(fn, deps);
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !address || !city) return;

    setIsProcessing(true);

    // Simulate luxury bank auth processing lag
    setTimeout(() => {
      const orderId = `TEE-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
        items: cartItems.map(item => ({
          productId: item.product.id,
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images[0]
        })),
        total: parseFloat(grandTotal.toFixed(2)),
        shippingAddress: `${address}, ${city}, ${zip}, ${country}`,
        paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? `UPI (${upiId})` : paymentMethod === 'paypal' ? 'PayPal Checkout' : 'Cash on Delivery'
      };

      onAddOrder(newOrder);
      setSuccessOrder(newOrder);
      setIsProcessing(false);
      onClearCart();
    }, 2500);
  };

  if (successOrder) {
    return (
      <div id="checkout-success-pane" className="mx-auto max-w-xl px-4 py-16 text-center animate-fade-in font-sans space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 border border-teal-150 text-teal-605 mx-auto">
          <CheckCircle className="h-9 w-9 text-teal-600 animate-pulse" />
        </div>
        <div className="space-y-2">
          <span className="font-mono text-xxs font-bold text-teal-600 uppercase tracking-widest block font-mono">Invoice Dispatched</span>
          <h2 className="font-sans text-2xl font-black text-slate-900">Order Placed Successfully!</h2>
          <p className="font-sans text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Thank you for purchasing with **The Ethnic Edit**. Your custom, high-end collection package is being prepared for express delivery.
          </p>
        </div>

        {/* Invoice Summary Card */}
        <div className="rounded-2xl border border-slate-150 bg-slate-50 p-5 text-left space-y-3.5">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2 flex-wrap">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">Order ID Code: <strong className="text-slate-950 font-sans">{successOrder.id}</strong></span>
            <span className="font-mono text-[10px] text-indigo-600 font-semibold">{successOrder.date}</span>
          </div>

          <div className="space-y-2 font-mono text-xxs border-b border-slate-200 pb-3 text-slate-600">
            {successOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="truncate max-w-[80%]">{item.title} (x{item.quantity})</span>
                <span className="font-bold text-slate-905">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1 text-slate-650 text-xs">
            <p>🚚 Delivery Address: <strong className="text-slate-900">{successOrder.shippingAddress}</strong></p>
            <p>💳 Payment Mode Selected: <strong className="text-slate-900">{successOrder.paymentMethod}</strong></p>
            <p>💰 Total Paid Amount: <strong className="text-indigo-650 font-black">${successOrder.total}</strong></p>
          </div>
        </div>

        <div className="flex justify-center gap-3 flex-wrap pt-3">
          <button
            id="success-track-orders-btn"
            onClick={() => setActiveTab('account')}
            className="rounded-lg bg-slate-900 font-sans text-xs font-bold text-white px-5 py-3 shadow hover:bg-slate-805 transition"
          >
            Track Order Progress
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className="rounded-lg border border-slate-200 bg-white font-sans text-xs font-bold text-slate-650 px-5 py-3 shadow-xs hover:bg-slate-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout-view-container" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in font-sans">
      
      {isProcessing && (
        <div id="processing-checkout-backdrop" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 p-4 text-white font-sans text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent mb-4" />
          <h3 className="font-sans font-bold text-lg text-white">Authorizing Encrypted PCI Gateway...</h3>
          <p className="font-sans text-xxs text-slate-400 max-w-xs mt-1.5 leading-snug">
            Establishing a secure 256-bit AES connection with your institution. Please do not close or refresh this view.
          </p>
        </div>
      )}

      <h1 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mb-8">Secure Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        
        {/* ================= LEFT SIDE: FORMS PANEL ================= */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* STEP 1: Billing and shipping details */}
          <div className="space-y-4">
            <h3 className="font-sans font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <span className="rounded-full bg-indigo-600 h-5 w-5 flex items-center justify-center text-[10px] text-white">1</span>
              <span>Shipping Consignee Location</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">First Name *</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-205 px-3.5 py-2 text-xs text-slate-800"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Aarav"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Last Name *</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-205 px-3.5 py-2 text-xs text-slate-800"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Sharma"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Address *</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-205 px-3.5 py-2 text-xs text-slate-800"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, suite, complex address details..."
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">City / Division *</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-205 px-3.5 py-2 text-xs text-slate-800"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Postal Code / Zip *</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-205 px-3.5 py-2 text-xs text-slate-800"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="e.g. 400050"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Contact Email *</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-205 px-3.5 py-2 text-xs text-slate-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. customer@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-slate-205 px-3.5 py-2 text-xs text-slate-800"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  required
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Payment details interactive frame */}
          <div className="space-y-4">
            <h3 className="font-sans font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <span className="rounded-full bg-indigo-600 h-5 w-5 flex items-center justify-center text-[10px] text-white">2</span>
              <span>Encrypted Settlement Options</span>
            </h3>

            {/* Methods selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                id="pm-card"
                onClick={() => setPaymentMethod('card')}
                className={`rounded-lg border px-3.5 py-3 text-center flex flex-col items-center justify-center gap-1.5 transition ${
                  paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold' : 'border-slate-150 bg-white text-slate-500'
                }`}
              >
                <CreditCard className="h-4.5 w-4.5" />
                <span className="font-sans text-xxs font-bold">Credit/Debit</span>
              </button>
              <button
                type="button"
                id="pm-upi"
                onClick={() => setPaymentMethod('upi')}
                className={`rounded-lg border px-3.5 py-3 text-center flex flex-col items-center justify-center gap-1.5 transition ${
                  paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold' : 'border-slate-150 bg-white text-slate-500'
                }`}
              >
                <Wallet className="h-4.5 w-4.5" />
                <span className="font-sans text-xxs font-bold">BHIM / UPI ID</span>
              </button>
              <button
                type="button"
                id="pm-paypal"
                onClick={() => setPaymentMethod('paypal')}
                className={`rounded-lg border px-3.5 py-3 text-center flex flex-col items-center justify-center gap-1.5 transition ${
                  paymentMethod === 'paypal' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold' : 'border-slate-150 bg-white text-slate-500'
                }`}
              >
                <Package className="h-4.5 w-4.5" />
                <span className="font-sans text-xxs font-bold">PayPal</span>
              </button>
              <button
                type="button"
                id="pm-cod"
                onClick={() => setPaymentMethod('cod')}
                className={`rounded-lg border px-3.5 py-3 text-center flex flex-col items-center justify-center gap-1.5 transition ${
                  paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold' : 'border-slate-150 bg-white text-slate-500'
                }`}
              >
                <Truck className="h-4.5 w-4.5" />
                <span className="font-sans text-xxs font-bold">Cash On Delivery</span>
              </button>
            </div>

            {/* Methods specifications internal inputs */}
            <div className="rounded-2xl border border-slate-150 p-4.5 bg-slate-50">
              {paymentMethod === 'card' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Standard Card Number</label>
                    <input
                      type="text"
                      className="w-full rounded border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 font-mono"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      required={paymentMethod === 'card'}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Expires End</label>
                    <input
                      type="text"
                      className="w-full rounded border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 font-mono"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="03 / 29"
                      maxLength={7}
                      required={paymentMethod === 'card'}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      className="w-full rounded border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 font-mono"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="***"
                      maxLength={4}
                      required={paymentMethod === 'card'}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-2 text-xs font-sans">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">UPI Identity Address</label>
                    <input
                      type="text"
                      className="w-full rounded border border-slate-205 bg-white px-3.5 py-2 text-xs text-slate-800 font-mono"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. standard@okaxis"
                      required={paymentMethod === 'upi'}
                    />
                  </div>
                  <p className="font-sans text-[10px] text-indigo-650 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="h-3 w-3 shrink-0 text-indigo-600" />
                    <span>Provide your registered UPI details. A payment collect note will be dished on your UPI provider app.</span>
                  </p>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="text-center py-4 font-sans text-xs text-slate-600">
                  <p className="font-bold">✓ Safe checkout redirection is authorized.</p>
                  <p className="text-[10px] text-slate-405 mt-1">PayPal pop-ups will be handled during processing triggers.</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="text-left font-sans text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-900">🔔 Cash on Delivery Policy:</p>
                  <p className="text-xxs text-slate-500 leading-snug">
                    An OTP confirmation note will be dispatched to your registered mobile coordinates before warehouse packaging begins. Please ensure exact change is ready at doorstep.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDE: CART OVERVIEW SUMMARY ================= */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-105 bg-white p-5 space-y-4.5 shadow-2xs">
            <h3 className="font-sans font-red-900 font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
              Invoice Summary ({cartItems.length})
            </h3>

            {/* List products */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-2.5 items-center">
                  <img src={item.product.images[0]} alt={item.product.title} referrerPolicy="no-referrer" className="h-10 w-10 object-cover rounded-md border border-slate-50 shadow-inner" />
                  <div className="flex-1 min-w-0 font-sans text-xxs">
                    <h4 className="truncate font-extrabold text-slate-905">{item.product.title}</h4>
                    <p className="text-slate-400 font-semibold mt-0.5">Quantity: {item.quantity} &bull; ${item.product.price} each</p>
                  </div>
                  <span className="font-semibold text-xs font-sans text-slate-950">${item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Calculations lines */}
            <div className="border-t border-slate-100 pt-3 space-y-2 font-sans text-xs text-slate-550">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-slate-900">${subtotal}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-teal-600 font-semibold">
                  <span>Voucher Discounter Applied:</span>
                  <span>-${Math.floor(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Insured Shipping:</span>
                <span className="font-bold text-slate-900">
                  {shippingFee === 0 ? <span className="font-bold text-teal-605 text-[9px] font-mono">FREE SHIPPING</span> : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated State/VAT Tax:</span>
                <span className="font-bold text-slate-900">${estimatedTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline font-sans border-b border-slate-100 pb-2.5">
              <span className="font-black text-slate-900 text-sm">Grand Consolidated Total:</span>
              <span className="font-sans text-lg font-black text-slate-950">${grandTotal.toFixed(2)}</span>
            </div>

            <button
              id="confirm-place-order-btn"
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-650 hover:bg-indigo-755 font-sans text-sm font-semibold py-3 text-white shadow-lg transition"
            >
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Confirm & Secure Checkout</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
