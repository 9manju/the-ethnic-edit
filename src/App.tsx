import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AIPersonalShopper from './components/AIPersonalShopper';
import ToastNotification from './components/ToastNotification';
import ExitIntentModal from './components/ExitIntentModal';

// Views
import HomeView from './pages/HomeView';
import ShopView from './pages/ShopView';
import ProductDetailsView from './pages/ProductDetailsView';
import OffersView from './pages/OffersView';
import CartView from './pages/CartView';
import CheckoutView from './pages/CheckoutView';
import AccountView from './pages/AccountView';
import AboutView from './pages/AboutView';
import ContactView from './pages/ContactView';
import BlogView from './pages/BlogView';
import AdminDashboardView from './pages/AdminDashboardView';
import SEOView from './pages/SEOView';

// Data / Types
import { Product, CartItem, Order, Coupon } from './types';
import { INITIAL_PRODUCTS } from './data/products';

const INITIAL_COUPONS: Coupon[] = [
  { code: 'ETHELEGANCE20', discountPercentage: 20, minAmount: 0, description: 'Enjoy 20% Off site-wide on The Ethnic Edit catalog.', expiryDate: '2026-12-31' },
  { code: 'MONSOONGALA', discountPercentage: 15, minAmount: 100, description: 'Claim 15% Off Monsoon collections above $100.', expiryDate: '2026-10-31' },
  { code: 'BRASSGLOW', discountPercentage: 10, minAmount: 50, description: 'Extra 10% on handcast brass & ceramic lifestyle edits.', expiryDate: '2026-09-30' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentProducts, setCurrentProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  // Filter conditions from Header or Interactive grids
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Selection detail tracking
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Marketing automation elements
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [aiStylistOpen, setAiStylistOpen] = useState(false);

  // Auto scroll top when view shifts to enhance e-commerce luxury feeling
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProduct]);

  // Cart operations
  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (idx > -1) {
        const copy = [...prev];
        const newQty = Math.min(product.stock, copy[idx].quantity + 1);
        copy[idx] = { ...copy[idx], quantity: newQty };
        return copy;
      }
      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) => prev.map(item => {
      if (item.product.id === productId) {
        const safeQty = Math.min(item.product.stock, quantity);
        return { ...item, quantity: safeQty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter(item => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const isAlreadyIn = prev.some(item => item.id === product.id);
      if (isAlreadyIn) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Admin Sandbox modifiers
  const handleUpdateOrderStatus = (orderId: string, status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned') => {
    setOrders((prev) => prev.map(ord => ord.id === orderId ? { ...ord, status } : ord));
  };

  const handleUpdateProductStock = (productId: string, newStock: number) => {
    setCurrentProducts((prev) => prev.map(prod => prod.id === productId ? { ...prod, stock: newStock } : prod));
  };

  const handleCreateCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const handleAddOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleSearchAction = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('All');
  };

  const handleAddReview = (productId: string, review: any) => {
    setCurrentProducts((prev) => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          reviews: [review, ...(p.reviews || [])],
          reviewCount: p.reviewCount + 1,
          rating: parseFloat(((p.rating * p.reviewCount + review.rating) / (p.reviewCount + 1)).toFixed(1))
        };
      }
      return p;
    }));
  };

  return (
    <div id="application-layout-frame" className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-805">
      
      {/* Dynamic top header bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
        }}
        cartCount={cartItems.reduce((acc, c) => acc + c.quantity, 0)}
        wishlistCount={wishlist.length}
        onSearch={handleSearchAction}
        onOpenAIStylist={() => setAiStylistOpen(true)}
        onOpenAdmin={() => {
          setActiveTab('admin');
          setSelectedProduct(null);
        }}
        onOpenSEO={() => {
          setActiveTab('seo');
          setSelectedProduct(null);
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
          setActiveTab('shop');
          setSelectedProduct(null);
        }}
      />

      {/* Main viewport block */}
      <main id="primary-content-viewport" className="flex-1">
        
        {/* VIEW CONDITIONAL DISPATCHER */}
        {selectedProduct ? (
          <ProductDetailsView
            product={currentProducts.find(p => p.id === selectedProduct.id) || selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map(w => w.id)}
            onBackToShop={() => setSelectedProduct(null)}
            onAddReview={handleAddReview}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p)}
                setActiveTab={setActiveTab}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setSearchQuery('');
                  setActiveTab('shop');
                }}
              />
            )}

            {activeTab === 'shop' && (
              <ShopView
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlist.map(w => w.id)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {activeTab === 'offers' && (
              <OffersView
                onApplyCoupon={(code) => setAppliedCoupon(code || null)}
                appliedCoupon={appliedCoupon}
              />
            )}

            {activeTab === 'cart' && (
              <CartView
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                appliedCoupon={appliedCoupon}
                onApplyCoupon={(code) => setAppliedCoupon(code || null)}
                onProceedToCheckout={() => setActiveTab('checkout')}
                onBackToShop={() => setActiveTab('shop')}
              />
            )}

            {activeTab === 'checkout' && (
              <CheckoutView
                cartItems={cartItems}
                appliedCoupon={appliedCoupon}
                onClearCart={() => setCartItems([])}
                onAddOrder={handleAddOrder}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'account' && (
              <AccountView
                orders={orders}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                setActiveTab={setActiveTab}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            )}

            {activeTab === 'about' && (
              <AboutView />
            )}

            {activeTab === 'contact' && (
              <ContactView />
            )}

            {activeTab === 'blog' && (
              <BlogView />
            )}

            {activeTab === 'admin' && (
              <AdminDashboardView
                products={currentProducts}
                orders={orders}
                coupons={coupons}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onUpdateProductStock={handleUpdateProductStock}
                onCreateCoupon={handleCreateCoupon}
              />
            )}

            {activeTab === 'seo' && (
              <SEOView />
            )}
          </>
        )}

      </main>

      {/* Global Brand Footer */}
      <Footer setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedProduct(null);
      }} />

      {/* ================= OPTIONAL MARKETING SLIDES & TOASTERS ================= */}
      
      {/* Secret VIP Exit Intent popup discount voucher */}
      <ExitIntentModal onApplyCoupon={(code) => setAppliedCoupon(code)} />

      {/* Smart conversion-driver Toast purchase and stock level alerts */}
      <ToastNotification />

      {/* AI Personal Concierge Chatbox drawer */}
      <AIPersonalShopper
        isOpen={aiStylistOpen}
        onClose={() => setAiStylistOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setAiStylistOpen(false);
        }}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
