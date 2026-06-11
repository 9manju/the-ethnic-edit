import React, { useState, useMemo } from 'react';
import { Filter, Star, Heart, Grid, List, RefreshCw, X, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

interface ShopViewProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlistIds: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export default function ShopView({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: ShopViewProps) {
  // Filters State
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Available unique brands, colors and sizes for filter parsing
  const uniqueBrands = ['All', ...Array.from(new Set(INITIAL_PRODUCTS.map((p) => p.brand)))];
  const uniqueColors = ['All', 'Royal Crimson', 'Teal Peacock', 'Amber Gold', 'Ivory Gold', 'Obsidian Black', 'Titanium Slate', 'Mint Sage', 'Saddle Tan'];
  const uniqueSizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10'];

  // Clear filters
  const resetFilters = () => {
    setMaxPrice(1000);
    setSelectedBrand('All');
    setSelectedColor('All');
    setSelectedSize('All');
    setMinRating(0);
    setOnlyInStock(false);
    setMinDiscount(0);
    setSortBy('featured');
    setSearchQuery('');
    setSelectedCategory('All');
  };

  // Real-time product filtration matrix
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // 1. Text Search matching title, brand, category, subcategory, description
      if (searchQuery.trim()) {
        const needle = searchQuery.toLowerCase();
        const haystack = [
          product.title,
          product.brand,
          product.category,
          product.subcategory,
          product.description,
        ].join(' ').toLowerCase();

        if (!haystack.includes(needle)) return false;
      }

      // 2. Category matching
      if (selectedCategory && selectedCategory !== 'All') {
        if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }

      // 3. Price boundary
      if (product.price > maxPrice) return false;

      // 4. Brand matching
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) return false;

      // 5. Colors matching
      if (selectedColor !== 'All') {
        const hasColor = product.colors?.some((c) => c.name === selectedColor);
        if (!hasColor) return false;
      }

      // 6. Sizes matching
      if (selectedSize !== 'All') {
        const hasSize = product.sizes?.includes(selectedSize);
        if (!hasSize) return false;
      }

      // 7. Core ratings
      if (product.rating < minRating) return false;

      // 8. In-stock parameter
      if (onlyInStock && product.stock === 0) return false;

      // 9. Minimum discounts
      if (product.discount < minDiscount) return false;

      return true;
    }).sort((a, b) => {
      // Sorting Options
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discount - a.discount;
      if (sortBy === 'newest') return b.isNewArrival === a.isNewArrival ? 0 : b.isNewArrival ? 1 : -1;
      return 0; // featured/default
    });
  }, [
    searchQuery,
    selectedCategory,
    maxPrice,
    selectedBrand,
    selectedColor,
    selectedSize,
    minRating,
    onlyInStock,
    minDiscount,
    sortBy,
  ]);

  return (
    <div id="shop-view-wrapper" className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 animate-fade-in font-sans">
      
      {/* Top Breadcrumb & Quick Filter overview bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-5 mb-6 gap-4">
        <div>
          <span className="font-mono text-xxs font-bold text-slate-400 uppercase tracking-widest">The Ethnic Edit Catalog</span>
          <h1 className="font-sans text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
            {selectedCategory && selectedCategory !== 'All' ? `${selectedCategory} Collection` : 'All Premium Collections'}
          </h1>
          <p className="font-sans text-xs text-slate-400 mt-1">
            Displaying <strong className="text-slate-800">{filteredProducts.length}</strong> luxurious matches of 14 models
          </p>
        </div>

        {/* Search status / active tags filter summary */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Mobile Filter toggle */}
          <button
            id="mobile-filters-trigger"
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 font-sans text-xs font-semibold text-slate-700 md:hidden hover:bg-slate-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>

          {/* Sort selection dropdown */}
          <div className="flex items-center gap-1.5 ml-auto md:ml-0 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
            <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1 font-mono">Sort:</span>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none font-sans text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="featured">Featured / Best Selection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Highest Discount</option>
              <option value="newest">Recent New Arrivals</option>
            </select>
          </div>

          <button
            id="reset-all-filters-btn"
            onClick={resetFilters}
            title="Reset Filters to defaults"
            className="rounded-lg bg-slate-100 hover:bg-indigo-50 border border-slate-150 p-2 text-slate-500 hover:text-indigo-600 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        
        {/* ================= DESKTOP SIDEBAR FILTERS ================= */}
        <aside id="desktop-filters-sidebar" className="hidden lg:block w-64 shrink-0 space-y-7 pr-4 border-r border-slate-100">
          
          {/* Filter Group: Categories List */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-indigo-600" />
              <span>Category</span>
            </h4>
            <div className="flex flex-col gap-1.5 font-sans text-xs">
              {['All', 'Fashion', 'Electronics', 'Lifestyle', 'Accessories', 'Beauty'].map((cat) => (
                <button
                  key={cat}
                  id={`filter-cat-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left py-1 px-2 rounded-lg font-semibold transition ${
                    (selectedCategory === cat || (cat === 'All' && !selectedCategory))
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' ? 'View Entire Catalog' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Group: Price Slider */}
          <div className="space-y-2.5 border-t border-slate-100 pt-5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">Price Ceiling</h4>
            <div className="space-y-2 font-sans">
              <input
                id="price-range-slider"
                type="range"
                min="30"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full select-none accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-slate-500 text-[11px] font-semibold">
                <span>$30 min</span>
                <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">up to ${maxPrice}</span>
              </div>
            </div>
          </div>

          {/* Filter Group: Brand selects */}
          <div className="space-y-2.5 border-t border-slate-100 pt-5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">Luxury Brand</h4>
            <select
              id="brand-filter-select"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-sans text-xs text-slate-700"
            >
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Filter Group: Color selection bubbles */}
          <div className="space-y-2.5 border-t border-slate-100 pt-5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">Color Palette</h4>
            <div className="flex flex-wrap gap-1.5">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  id={`filter-color-${color}`}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-full border px-2.5 py-1 font-sans text-xxs font-semibold transition ${
                    selectedColor === color
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-150 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Group: Size selection panel */}
          <div className="space-y-2.5 border-t border-slate-100 pt-5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">Size Matrix</h4>
            <div className="flex flex-wrap gap-1">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  id={`filter-size-${size}`}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded border h-8 min-w-8 flex items-center justify-center font-mono text-xs font-bold transition ${
                    selectedSize === size
                      ? 'border-indigo-650 bg-indigo-50 text-indigo-700'
                      : 'border-slate-150 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Group: Star ratings filters */}
          <div className="space-y-2.5 border-t border-slate-100 pt-5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">Minimum Rating</h4>
            <div className="flex flex-col gap-1.5 font-sans">
              {[4.7, 4.5, 4.0].map((star) => (
                <button
                  key={star}
                  id={`filter-rating-${star}`}
                  onClick={() => setMinRating(minRating === star ? 0 : star)}
                  className={`flex items-center gap-1.5 py-1 px-1.5 rounded-md hover:bg-slate-50 text-xs text-left ${
                    minRating === star ? 'font-bold text-indigo-600 bg-indigo-50/50' : 'text-slate-600'
                  }`}
                >
                  <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400 shrink-0" />
                  <span>{star}+ Stars Verified</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Group: Special discounts filters */}
          <div className="space-y-2.5 border-t border-slate-100 pt-5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">Minimum Discount</h4>
            <div className="flex flex-wrap gap-1">
              {[0, 20, 25, 30].map((discount) => (
                <button
                  key={discount}
                  id={`filter-discount-${discount}`}
                  onClick={() => setMinDiscount(discount)}
                  className={`rounded-full border px-3 py-1 font-sans text-xxs font-semibold transition ${
                    minDiscount === discount
                      ? 'border-indigo-650 bg-indigo-50 text-indigo-700 font-bold'
                      : 'border-slate-150 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {discount === 0 ? 'All' : `${discount}%+ Off`}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Switch */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-sans">
            <span className="text-xs font-bold text-slate-700">Display In-Stock Only</span>
            <input
              id="in-stock-only-toggle"
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="h-4 w-4 accent-indigo-600 select-none cursor-pointer"
            />
          </div>

        </aside>

        {/* ================= PRODUCTS GRID MAIN AREA ================= */}
        <main className="flex-1">
          {searchQuery && (
            <div id="search-result-header" className="mb-4 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 font-sans flex items-center justify-between">
              <span>
                Search results for: <span className="font-extrabold text-indigo-600">"{searchQuery}"</span>
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="font-semibold text-indigo-700 underline flex items-center gap-1"
              >
                Clear Search
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div id="no-products-found" className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-100 max-w-xl mx-auto space-y-4">
              <span className="font-sans text-3xl">🔍</span>
              <h3 className="font-sans text-lg font-bold text-slate-900">No Premium Models Found</h3>
              <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                We couldn't locate any items matching your selected filtration values. Try clearing some filters or searching for standard tags like "kurtas", "anc headphones" or "tea set"
              </p>
              <button
                id="clear-filters-no-results-btn"
                onClick={resetFilters}
                className="rounded-lg bg-indigo-600 text-white font-sans text-xs font-semibold px-4.5 py-2.5 shadow-md hover:bg-indigo-700 transition"
              >
                Clear All Filter Options
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => {
                const isWishlisted = wishlistIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    id={`shop-product-card-${p.id}`}
                    className="group relative flex flex-col rounded-xl border border-slate-105 bg-white p-3 shadow-xs hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => onSelectProduct(p)}
                  >
                    {/* Top image box */}
                    <div className="relative overflow-hidden rounded-lg bg-slate-50 h-52">
                      <span className="absolute top-2 left-2 z-10 rounded bg-slate-900 text-white px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-wide">
                        {p.subcategory}
                      </span>
                      {p.discount > 0 && (
                        <span className="absolute top-2 right-2 z-10 rounded bg-rose-500 text-white px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-wide">
                          -{p.discount}%
                        </span>
                      )}
                      
                      {/* Heart Wishlist toggler */}
                      <button
                        id={`wishlist-toggle-${p.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(p);
                        }}
                        className={`absolute bottom-2.5 right-2.5 z-10 rounded-full bg-white p-1.5 shadow-md hover:scale-105 transition-transform ${
                          isWishlisted ? 'text-rose-500' : 'text-slate-400 hover:text-rose-550'
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>

                      <img
                        src={p.images[0]}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                      />
                    </div>

                    {/* Bottom detail specs */}
                    <div className="flex-1 flex flex-col justify-between mt-3 space-y-3">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="font-sans text-[10px] text-slate-400 font-bold tracking-wide uppercase">
                            {p.brand}
                          </span>
                          <span className="font-mono text-xxxs text-emerald-600 font-bold">
                            SKU &bull; {p.id}
                          </span>
                        </div>
                        <h3 className="font-sans text-xs font-bold text-slate-900 mt-1 leading-snug line-clamp-2 uppercase min-h-8 group-hover:text-indigo-600 transition-colors">
                          {p.title}
                        </h3>

                        {/* Stars ratings */}
                        <div className="flex items-center gap-1 mt-1">
                          <span className="font-mono text-[10px] text-amber-500 font-bold bg-amber-50 border border-amber-100 rounded px-1.5 py-0.3 flex items-center gap-0.5">
                            ★ {p.rating}
                          </span>
                          <span className="text-slate-400 text-[10px]">({p.reviewCount} Ratings)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-auto">
                        <div>
                          <span className="font-sans text-sm font-black text-slate-900">${p.price}</span>
                          <span className="ml-1.5 font-sans text-xxs text-slate-400 line-through">${p.originalPrice}</span>
                        </div>
                        <button
                          id={`quick-add-${p.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(p);
                          }}
                          className="rounded bg-slate-900 px-3 py-1.5 font-sans text-xxs font-bold text-white hover:bg-indigo-600 hover:scale-101 transition"
                        >
                          Quick Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* ================= MOBILE FILTERS DRAWER MODAL ================= */}
      {showMobileFilters && (
        <div id="mobile-filter-backdrop" className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs">
          <div id="mobile-filter-container" className="h-full w-full max-w-sm bg-white p-5 overflow-y-auto space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-indigo-600" />
                <span>Filters options</span>
              </h3>
              <button
                id="close-mobile-filters"
                onClick={() => setShowMobileFilters(false)}
                className="rounded-full bg-slate-50 p-1.5 text-slate-650 hover:bg-slate-100"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Price section */}
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800">Price Ceiling</h4>
              <input
                type="range"
                min="30"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600 select-none cursor-pointer"
              />
              <div className="flex justify-between text-slate-500 font-sans text-xxs font-semibold">
                <span>$30 min</span>
                <span>up to ${maxPrice}</span>
              </div>
            </div>

            {/* Category selection */}
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800">Category list</h4>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Fashion', 'Electronics', 'Lifestyle', 'Accessories', 'Beauty'].map((cat) => (
                  <button
                    key={cat}
                    id={`mobile-filter-cat-${cat}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg border px-3 py-1.5 font-sans text-xs font-semibold ${
                      selectedCategory === cat
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-150 bg-slate-50 text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand filter selection */}
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800">Luxury Brand</h4>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-sans text-xs text-slate-700 focus:outline-hidden"
              >
                {uniqueBrands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div className="flex items-center justify-between font-sans border-t border-slate-100 pt-4">
              <span className="text-xs font-semibold text-slate-700">Display In-Stock Only</span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="h-4.5 w-4.5 accent-indigo-600 select-none cursor-pointer"
              />
            </div>

            <button
              id="apply-mobile-filters-btn"
              onClick={() => setShowMobileFilters(false)}
              className="w-full rounded-lg bg-indigo-650 text-center text-sm font-semibold py-3 text-white shadow-md hover:bg-indigo-750"
            >
              Apply Filter Values
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
