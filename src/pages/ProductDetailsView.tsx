import React, { useState, useMemo } from 'react';
import { ShoppingCart, Heart, ArrowLeft, Star, Shield, RefreshCw, Send, CheckCircle, PackageOpen } from 'lucide-react';
import { Product, Review } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

interface ProductDetailsViewProps {
  product: Product;
  onBackToShop: () => void;
  onAddToCart: (p: Product, size?: string, color?: string) => void;
  onToggleWishlist: (p: Product) => void;
  wishlistIds: string[];
  onAddReview: (productId: string, review: Review) => void;
  onSelectProduct: (p: Product) => void;
}

export default function ProductDetailsView({
  product,
  onBackToShop,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onAddReview,
  onSelectProduct,
}: ProductDetailsViewProps) {
  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0].name : '');
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });

  // Reviews input state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Active reviews list
  const reviewsList = product.reviews || [];

  const isWishlisted = wishlistIds.includes(product.id);

  // Generate related products
  const relatedProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 3);
  }, [product]);

  // Frequently bought together bundle item (e.g. 1 matching accessory or beauty product under $150)
  const bundleItem = useMemo(() => {
    return INITIAL_PRODUCTS.find(
      (p) => p.category !== product.category && p.price < 150
    ) || INITIAL_PRODUCTS[0];
  }, [product]);

  const [includeBundleItem, setIncludeBundleItem] = useState(true);

  // Combine sizes or colors changes when product switches
  React.useEffect(() => {
    setActiveImage(product.images[0]);
    if (product.sizes) setSelectedSize(product.sizes[0]);
    if (product.colors) setSelectedColor(product.colors[0].name);
    setSubmitSuccess(false);
  }, [product]);

  // Image Zoom simulation on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    
    // Percent calculation
    const px = (x / width) * 100;
    const py = (y / height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${activeImage})`,
      backgroundPosition: `${px}% ${py}%`,
      backgroundSize: '250%',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: reviewName,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment,
      verified: true,
    };

    onAddReview(product.id, newRev);
    setSubmitSuccess(true);
    setReviewName('');
    setReviewComment('');
  };

  const handleBundleCheckout = () => {
    onAddToCart(product, selectedSize, selectedColor);
    if (includeBundleItem) {
      onAddToCart(bundleItem);
    }
  };

  return (
    <div id="product-detail-wrapper" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in font-sans">
      
      {/* Back to catalog button */}
      <button
        id="back-to-shop-btn"
        onClick={onBackToShop}
        className="mb-6 flex items-center gap-1.5 font-sans text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Catalog List</span>
      </button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        
        {/* ================= LEFT SIDE: IMAGE GALLERY ================= */}
        <div className="space-y-4">
          <div className="flex gap-3">
            {/* Thumbnails array list */}
            <div className="flex flex-col gap-2 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  id={`thumb-image-${idx}`}
                  onClick={() => setActiveImage(img)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border bg-slate-50 transition-all ${
                    activeImage === img ? 'border-indigo-600 shadow-xs ring-1 ring-indigo-500' : 'border-slate-150 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb detail ${idx}`} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Large interactive Canvas Image with hover zoom feature */}
            <div
              id="main-interactive-image-pane"
              className="relative flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 aspect-square cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={activeImage}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              
              {/* Dynamic Zoom Loupe overlay */}
              <div
                id="image-zoom-overlay"
                className="pointer-events-none absolute inset-0 rounded-2xl bg-no-repeat shadow-inner border border-indigo-100 bg-white"
                style={zoomStyle}
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-lg p-3 text-[11px] text-slate-500 font-sans">
            <span className="flex items-center gap-1">⚡ Hover on main image to zoom details</span>
            <span>SKU Code Reference: {product.sku}</span>
          </div>
        </div>

        {/* ================= RIGHT SIDE: SPECS & BUY PANEL ================= */}
        <div className="space-y-6">
          {/* Brand and category info */}
          <div>
            <span className="font-mono text-xs font-bold text-indigo-650 uppercase tracking-widest">{product.category} &bull; {product.subcategory}</span>
            <h1 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-1 uppercase leading-tight">
              {product.title}
            </h1>
            <p className="font-sans text-xs text-slate-400 mt-1">Design Handcraft at: <strong className="text-slate-700">{product.brand}</strong> &bull; Verified Merchant</p>
          </div>

          {/* Pricing tier */}
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Exclusive Price Offer</span>
              <div className="flex items-baseline gap-2.5">
                <span className="font-sans text-2xl font-black text-slate-900">${product.price}</span>
                <span className="font-sans text-xs text-slate-400 line-through">${product.originalPrice}</span>
                <span className="rounded-sm bg-teal-50 px-2 py-0.5 font-mono text-xs font-black text-teal-605">
                  {product.discount}% OFF COUPE
                </span>
              </div>
            </div>

            {/* Stars rating average */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-amber-500 font-bold font-sans text-sm">
                <span>★ {product.rating}</span>
                <div className="flex font-normal">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`h-3 w-3 ${s <= Math.floor(product.rating) ? 'fill-current' : ''}`} />)}
                </div>
              </div>
              <span className="font-sans text-xxs text-slate-400 mt-1 block">Based on {reviewsList.length} verified ratings</span>
            </div>
          </div>

          {/* Description summary */}
          <p className="font-sans text-sm text-slate-650 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Interactive attributes selection standard fields */}
          <div className="space-y-3.5 border-t border-slate-100 pt-5">
            {/* Color swatches selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-1.5">
                <span className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider block">Select Atelier Shade: <span className="text-indigo-600 font-semibold">{selectedColor}</span></span>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      id={`detail-color-btn-${c.name}`}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-7.5 w-7.5 rounded-full border flex items-center justify-center p-0.5 ${
                        selectedColor === c.name ? 'border-slate-900 ring-2 ring-indigo-500 shadow-sm' : 'border-slate-200'
                      }`}
                      title={c.name}
                    >
                      <span className="h-full w-full rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size standard selectors */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-1.5 pt-1.5">
                <span className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider block">Atelier Size: <span className="text-indigo-650 font-semibold">{selectedSize}</span></span>
                <div className="flex gap-1.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      id={`detail-size-btn-${sz}`}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-9 min-w-9 rounded border font-mono text-xs font-extrabold flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 text-slate-650 hover:border-slate-350'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Urgent Stock Availability Alert & Security tags */}
          <div className="space-y-2 pt-3">
            <div className="flex items-center gap-1 text-slate-500 font-sans text-xs">
              <Shield className="h-4.5 w-4.5 text-teal-500" />
              <span>Available in warehouse:</span>
              <span className={`font-extrabold ${product.stock <= 6 ? 'text-rose-500 font-extrabold animate-pulse' : 'text-emerald-600'}`}>
                {product.stock <= 6 ? `Only ${product.stock} pieces remaining! (High Demand)` : `${product.stock} items verified`}
              </span>
            </div>
          </div>

          {/* Add to cart / Buy Now CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-3">
            <button
              id="add-to-cart-detail-btn"
              onClick={() => onAddToCart(product, selectedSize, selectedColor)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-sans text-sm font-semibold py-3 text-white shadow-lg transition"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              <span>Add to Shopping Cart</span>
            </button>
            <button
              id="wishlist-toggle-detail-btn"
              onClick={() => onToggleWishlist(product)}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border transition-all ${
                isWishlisted ? 'border-rose-200 bg-rose-50 text-rose-500 shadow-sm' : 'border-slate-200 text-slate-500 hover:border-indigo-350'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* ================= FREQUENTLY BOUGHT TOGETHER ================= */}
      <section id="frequently-bought-together" className="mt-16 border border-indigo-100 bg-indigo-50/20 rounded-2xl p-6">
        <h3 className="font-sans font-black text-sm uppercase tracking-wide text-slate-900 mb-5 flex items-center gap-2">
          <span>Frequently Bought Together Coordinates</span>
          <span className="rounded bg-indigo-600 text-white font-mono text-[9px] font-black uppercase px-2 py-0.5">BUNDLE OFFER</span>
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center flex-wrap gap-4">
            
            {/* Main Product Card */}
            <div className="flex gap-3 items-center bg-white border border-slate-100 rounded-xl p-2.5 max-w-xs shrink-0 shadow-2xs">
              <img src={product.images[0]} alt={product.title} referrerPolicy="no-referrer" className="h-14 w-14 object-cover rounded-md" />
              <div className="min-w-0">
                <h4 className="truncate font-sans text-xxs font-extrabold text-slate-900 leading-snug">{product.title}</h4>
                <p className="font-sans text-xs text-slate-500 mt-0.5">${product.price}</p>
              </div>
            </div>

            <span className="font-bold text-lg text-slate-400 font-sans">+</span>

            {/* Coordinate product card */}
            <div
              id="coordinate-product-box"
              onClick={() => onSelectProduct(bundleItem)}
              className="flex gap-3 items-center bg-white border border-slate-100 rounded-xl p-2.5 max-w-xs shrink-0 shadow-2xs cursor-pointer hover:border-indigo-300 transition"
            >
              <input
                type="checkbox"
                checked={includeBundleItem}
                onChange={(e) => {
                  e.stopPropagation();
                  setIncludeBundleItem(e.target.checked);
                }}
                className="h-4.5 w-4.5 accent-indigo-650 cursor-pointer"
              />
              <img src={bundleItem.images[0]} alt={bundleItem.title} referrerPolicy="no-referrer" className="h-14 w-14 object-cover rounded-md" />
              <div className="min-w-0">
                <span className="font-mono text-[8px] font-bold text-indigo-500 uppercase">SUGGESTION</span>
                <h4 className="truncate font-sans text-xxs font-extrabold text-slate-900 leading-snug">{bundleItem.title}</h4>
                <p className="font-sans text-xs text-slate-500 mt-0.5">${bundleItem.price}</p>
              </div>
            </div>

          </div>

          {/* Bundle purchase value checker */}
          <div className="text-center md:text-right space-y-2 shrink-0 md:border-l md:border-slate-200 md:pl-8">
            <div className="font-sans">
              <p className="text-xs text-slate-500">Total Bundle Cost:</p>
              <p className="text-2xl font-black text-slate-900">
                ${product.price + (includeBundleItem ? bundleItem.price : 0)}
              </p>
              {includeBundleItem && (
                <span className="text-[10px] font-mono font-bold text-emerald-600 block">✓ Included extra bundle coupon 5% saving!</span>
              )}
            </div>
            <button
              id="add-bundle-to-cart"
              onClick={handleBundleCheckout}
              className="rounded-lg bg-slate-900 hover:bg-indigo-650 text-white font-sans text-xs font-bold px-5 py-2.5 shadow-md transition"
            >
              Add Selected Coordinates to Cart
            </button>
          </div>
        </div>
      </section>

      {/* ================= SPECIFICATIONS & CUSTOMER REVIEWS TABS ================= */}
      <section id="specification-reviews-section" className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 pt-10 border-t border-slate-100">
        
        {/* Specifications layout block */}
        <div className="space-y-4">
          <h3 className="font-sans font-black text-sm uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">Technical Specifications</h3>
          <div className="overflow-hidden border border-slate-150 rounded-xl">
            <table className="min-w-full divide-y divide-slate-150 font-sans text-xs">
              <tbody className="bg-white divide-y divide-slate-100">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <tr key={key}>
                    <td className="px-4 py-3 bg-slate-50 font-bold text-slate-500 max-w-xs">{key}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews Layout block */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-sans font-black text-sm uppercase tracking-wider text-slate-900">Customer Queries ({reviewsList.length})</h3>
            <span className="font-mono text-xs font-bold text-amber-500">★ {product.rating} / 5</span>
          </div>

          {/* List of customer reviews */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="rounded-xl border border-slate-100 bg-white p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans font-extrabold text-slate-900 text-xs">{rev.userName}</span>
                    {rev.verified && (
                      <span className="rounded bg-teal-50 border border-teal-150 text-teal-600 px-1.5 py-0.2 font-mono text-[8px] font-bold">
                        VERIFIED BUYER
                      </span>
                    )}
                  </div>
                  <span className="font-sans text-[10px] text-slate-400">{rev.date}</span>
                </div>
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`h-3 w-3 ${s <= rev.rating ? 'fill-current' : ''}`} />)}
                </div>
                <p className="font-sans text-xs text-slate-600 leading-normal">{rev.comment}</p>
              </div>
            ))}
          </div>

          {/* Form to submit review */}
          <div className="rounded-2xl bg-slate-50 border border-slate-150 p-5 mt-6">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 mb-3.5">Submit Your Experience</h4>
            {submitSuccess ? (
              <div className="rounded-lg bg-teal-50 border border-teal-150 p-4 text-center text-teal-700 animate-fade-in font-sans">
                <CheckCircle className="mx-auto h-8 w-8 text-teal-600 mb-2" />
                <h5 className="font-sans font-bold text-sm">Review Submitted Successfully!</h5>
                <p className="text-xs text-teal-600 mt-1">Thank you. Your experience will assist thousands of future stylish collectors.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3.5 font-sans">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      className="w-full rounded border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Priyanth S."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Star Rating</label>
                    <select
                      className="w-full rounded border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-hidden"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                    >
                      <option value="5">★★★★★ Outstanding 5/5</option>
                      <option value="4">★★★★☆ Very Good 4/5</option>
                      <option value="3">★★★☆☆ Satisfactory 3/5</option>
                      <option value="2">★★☆☆☆ Needs Tuning 2/5</option>
                      <option value="1">★☆☆☆☆ Poor quality 1/5</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Experience Review</label>
                  <textarea
                    rows={3}
                    className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-hidden"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Provide details of the silk quality, post-wash experience, noise cancelling, or brass density..."
                    required
                  />
                </div>
                <button
                  id="submit-review-action"
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 rounded bg-slate-900 py-2.5 font-sans text-xs font-bold text-white hover:bg-indigo-650 transition"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Verified Review</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ================= RELATED PRODUCTS GRID ================= */}
      {relatedProducts.length > 0 && (
        <section id="related-products-section" className="mt-16 pt-10 border-t border-slate-100">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest">Selected Coordinates</span>
              <h3 className="font-sans text-lg font-black text-slate-900 tracking-tight sm:text-2xl mt-0.5">Related Design Coordinates</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                id={`related-product-${p.id}`}
                onClick={() => onSelectProduct(p)}
                className="group relative flex gap-3 items-center rounded-xl border border-slate-100 bg-white p-2.5 shadow-xs hover:border-indigo-300 transition cursor-pointer"
              >
                <img src={p.images[0]} alt={p.title} referrerPolicy="no-referrer" className="h-16 w-16 object-cover rounded-lg bg-slate-50" />
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[9px] font-bold text-indigo-500 uppercase">{p.subcategory}</span>
                  <h4 className="truncate font-sans text-xs font-bold text-slate-900 mt-0.5 group-hover:text-indigo-650 transition-colors">
                    {p.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="font-sans text-xs font-bold text-slate-900">${p.price}</span>
                    <span className="rounded bg-teal-50 px-1 py-0.2 font-mono text-[8px] font-bold text-teal-605">
                      -{p.discount}% OFF
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
