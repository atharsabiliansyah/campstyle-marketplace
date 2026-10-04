import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Layers,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  Store
} from 'lucide-react';
import { 
  Product, 
  ProductCategory, 
  AvailabilityStatus, 
  RentalDateRange, 
  CartItem, 
  RentalOrder, 
  DeliveryMethod, 
  OrderStatus 
} from './types';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { INITIAL_ORDERS } from './data/initialOrders';
import { getDefaultRentalDates } from './utils/formatters';

// Components structured exactly like the user's reference image
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryIconRow } from './components/CategoryIconRow';
import { ProductCard } from './components/ProductCard';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { CompareAndWhySection } from './components/CompareAndWhySection';
import { PromoSplitBanners } from './components/PromoSplitBanners';
import { TrustBadgesRow } from './components/TrustBadgesRow';
import { NewsletterBar } from './components/NewsletterBar';
import { MarketplaceHubBar } from './components/MarketplaceHubBar';
import { MarketplaceSellerBanner } from './components/MarketplaceSellerBanner';

// Operational Modals
import { ProductDetailModal } from './components/ProductDetailModal';
import { RentalDatePickerModal } from './components/RentalDatePickerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { RentalTrackingView } from './components/RentalTrackingView';
import { RentalRulesModal } from './components/RentalRulesModal';
import { MitraVendorModal } from './components/MitraVendorModal';
import { VendorChatModal } from './components/VendorChatModal';
import { RentalVendor } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'catalog' | 'tracking'>('catalog');

  // Global Rental Date Range (Crucial for rental app)
  const [rentalDateRange, setRentalDateRange] = useState<RentalDateRange>(() => {
    const saved = localStorage.getItem('campstyle_dates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return getDefaultRentalDates();
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('campstyle_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  // Orders State (Pre-loaded with active + completed sample orders)
  const [orders, setOrders] = useState<RentalOrder[]>(() => {
    const saved = localStorage.getItem('campstyle_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_ORDERS;
  });

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Checkout options
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup_basecamp');
  const [includeCleaningService, setIncludeCleaningService] = useState<boolean>(false);

  // Modals
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isMitraModalOpen, setIsMitraModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<RentalOrder | null>(null);

  // Marketplace Vendor / Basecamp Hub Filter
  const [selectedVendorFilter, setSelectedVendorFilter] = useState<string>('all');

  // Marketplace Chat State
  const [chatVendor, setChatVendor] = useState<RentalVendor | null>(null);
  const [chatProduct, setChatProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = (vendor: RentalVendor, product?: Product) => {
    setChatVendor(vendor);
    setChatProduct(product || null);
    setIsChatOpen(true);
  };

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('campstyle_dates', JSON.stringify(rentalDateRange));
  }, [rentalDateRange]);

  useEffect(() => {
    localStorage.setItem('campstyle_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('campstyle_orders', JSON.stringify(orders));
  }, [orders]);

  const cartTotalQuantity = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const activeRentalsCount = useMemo(() => {
    return orders.filter((o) => o.status === 'active_rented').length;
  }, [orders]);

  // Featured Equipment for Animated Carousel
  const featuredTents = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.category === 'tenda' ||
        p.id === 'prod-cookset-ds308' ||
        p.id === 'prod-lantern-vintage' ||
        p.id === 'prod-carrier-eiger60' ||
        p.id === 'prod-sb-polar'
    );
  }, []);

  // Top Selling Accessories (Second row like NovaPhone's Top Selling Accessories)
  const topAccessories = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) => p.category === 'alat-masak' || p.category === 'sleeping-gear' || p.category === 'penerangan'
    ).slice(0, 5);
  }, []);

  // Filtered products when user searches or clicks a category or basecamp vendor
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedVendorFilter !== 'all') {
        if (!product.vendor || !product.vendor.id.includes(selectedVendorFilter)) {
          return false;
        }
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchCat = product.categoryLabel.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchVendor = product.vendor ? product.vendor.name.toLowerCase().includes(query) || product.vendor.city.toLowerCase().includes(query) : false;
        if (!matchName && !matchBrand && !matchCat && !matchDesc && !matchVendor) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedVendorFilter, searchQuery]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.status !== 'ready') return;

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            dateRange: rentalDateRange,
          },
        ];
      }
    });

    showToast(`"${product.name}" masuk ke keranjang sewa (${rentalDateRange.totalDays} hari).`);
  };

  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order operations
  const handleOrderCreated = (newOrder: RentalOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setLastPlacedOrder(newOrder);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus, extra?: any) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus,
            ...extra,
          };
        }
        return order;
      })
    );
  };

  const handleExtendRental = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const currentEnd = new Date(order.dateRange.endDate + 'T00:00:00');
          currentEnd.setDate(currentEnd.getDate() + 1);
          const newEndStr = currentEnd.toISOString().split('T')[0];
          const newTotalDays = order.dateRange.totalDays + 1;
          const newNights = order.dateRange.nightsCount + 1;

          const updatedItems = order.items.map((item) => ({
            ...item,
            subtotal: item.pricePerDay * newTotalDays * item.quantity,
          }));
          const newSubtotal = updatedItems.reduce((acc, it) => acc + it.subtotal, 0);
          const newTotalAmount = newSubtotal + order.deliveryFee + order.cleaningServiceFee;

          return {
            ...order,
            dateRange: {
              ...order.dateRange,
              endDate: newEndStr,
              totalDays: newTotalDays,
              nightsCount: newNights,
            },
            items: updatedItems,
            totalAmount: newTotalAmount,
            returnDueTimestamp: `${newEndStr}T20:00:00+07:00`,
          };
        }
        return order;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans selection:bg-emerald-600 selection:text-white overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar with Search, Account, Cart & Subnav */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        rentalDateRange={rentalDateRange}
        onOpenDatePicker={() => setIsDatePickerOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMitraModal={() => setIsMitraModalOpen(true)}
        cartCount={cartTotalQuantity}
        activeRentalsCount={activeRentalsCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main View */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 space-y-10">
        {currentView === 'catalog' ? (
          <>
            {/* If user filtered by specific category or typed a search query or selected a vendor, show dedicated grid */}
            {selectedCategory !== 'all' || searchQuery.trim() !== '' || selectedVendorFilter !== 'all' ? (
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-heading">
                      {searchQuery
                        ? `Hasil Pencarian: "${searchQuery}"`
                        : selectedVendorFilter !== 'all'
                        ? `Toko Mitra: ${
                            filteredProducts[0]?.vendor?.name || 'Mitra Basecamp'
                          }`
                        : `Kategori ${
                            MOCK_PRODUCTS.find((p) => p.category === selectedCategory)?.categoryLabel ||
                            selectedCategory
                          }`}
                    </h2>
                    <p className="text-sm text-stone-500 mt-1">
                      Menampilkan {filteredProducts.length} barang 
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {selectedVendorFilter !== 'all' && filteredProducts[0]?.vendor && (
                      <button
                        type="button"
                        onClick={() => handleOpenChat(filteredProducts[0].vendor!)}
                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold font-heading flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>Chat Toko Ini</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedVendorFilter('all');
                        setSearchQuery('');
                      }}
                      className="text-sm font-bold text-emerald-700 hover:underline cursor-pointer font-heading"
                    >
                      ke Beranda 
                    </button>
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-stone-50 rounded-2xl p-12 text-center space-y-3 border border-stone-200">
                    <p className="font-bold text-stone-700 text-sm">Tidak ada alat yang cocok dengan pencarian ini</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedVendorFilter('all');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold font-heading"
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6">
                    {filteredProducts.map((product) => {
                      const inCart = cart.some((it) => it.product.id === product.id);
                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          rentalDateRange={rentalDateRange}
                          onViewDetail={(p) => setSelectedProductDetail(p)}
                          onQuickAdd={(p) => handleAddToCart(p, 1)}
                          onOpenChat={handleOpenChat}
                          isInCart={inCart}
                        />
                      );
                    })}
                  </div>
                )}
              </section>
            ) : (
              /* FULL HOMEPAGE LAYOUT EXACTLY MATCHING THE REFERENCE IMAGE */
              <>
                {/* 3. Hero Feature Banner (Capture More of You / Taklukkan Puncak) */}
                <HeroBanner
                  rentalDateRange={rentalDateRange}
                  onOpenDatePicker={() => setIsDatePickerOpen(true)}
                  onExploreCatalog={() => {
                    const el = document.getElementById('featured-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onSewaHeroProduct={() => {
                    const heroProd = MOCK_PRODUCTS[0]; // Naturehike Cloud Peak
                    if (heroProd) setSelectedProductDetail(heroProd);
                  }}
                />

                {/* 4. Category Icons Circular/Rounded Row (Flagship, Mid-Range, Budget, etc.) */}
                <section>
                  <CategoryIconRow
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat) => setSelectedCategory(cat)}
                  />
                </section>

                {/* 4b. Marketplace Basecamp & Mitra Hub Filter Bar */}
                <section>
                  <MarketplaceHubBar
                    selectedVendorFilter={selectedVendorFilter}
                    onSelectVendorFilter={(vendorId) => {
                      setSelectedVendorFilter(vendorId);
                    }}
                    onOpenMitraModal={() => setIsMitraModalOpen(true)}
                    onOpenRules={() => setIsRulesOpen(true)}
                  />
                </section>

                {/* 5. Featured Section -> Animated Moving Sideways Carousel */}
                <section id="featured-section">
                  <FeaturedCarousel
                    products={featuredTents}
                    rentalDateRange={rentalDateRange}
                    cart={cart}
                    onViewDetail={(p) => setSelectedProductDetail(p)}
                    onQuickAdd={(p) => handleAddToCart(p, 1)}
                    onOpenChat={handleOpenChat}
                    onViewAll={() => setSelectedCategory('tenda')}
                  />
                </section>

                {/* 6. Compare Devices & Why NovaPhone? -> "Bandingkan Tenda & Kenapa Camp Style?" */}
                <section>
                  <CompareAndWhySection
                    onOpenRules={() => setIsRulesOpen(true)}
                    onExploreTents={() => setSelectedCategory('tenda')}
                  />
                </section>

                {/* 7. Top Selling Accessories Section -> "Alat Masak & Aksesoris Terlaris" */}
                <section className="space-y-4">
                  <div className="flex items-start justify-between gap-3 pb-1">
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight font-heading leading-snug">
                        Alat Masak & Aksesoris Pendakian Terlaris
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-500 mt-1">
                        Lentera retro, nesting teflon, sleeping bag steril, dan headlamp
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCategory('alat-masak')}
                      className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 shrink-0 pt-1 cursor-pointer font-heading"
                    >
                      <span>Lihat Semua</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
                    {topAccessories.map((product) => {
                      const inCart = cart.some((it) => it.product.id === product.id);
                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          rentalDateRange={rentalDateRange}
                          onViewDetail={(p) => setSelectedProductDetail(p)}
                          onQuickAdd={(p) => handleAddToCart(p, 1)}
                          onOpenChat={handleOpenChat}
                          isInCart={inCart}
                        />
                      );
                    })}
                  </div>
                </section>

                {/* 7b. Marketplace Seller Ecosystem Banner */}
                <section>
                  <MarketplaceSellerBanner
                    onOpenMitraModal={() => setIsMitraModalOpen(true)}
                  />
                </section>

                {/* 8. Two Promo Banners (Back to School Deals & Upgrade & Save) */}
                <section>
                  <PromoSplitBanners
                    onOpenRules={() => setIsRulesOpen(true)}
                    onExploreCatalog={() => setSelectedCategory('all')}
                  />
                </section>

                {/* 9. Trust / Value Proposition Row (Free Shipping, Secure Payments, 24/7, Easy Returns) */}
                <section>
                  <TrustBadgesRow />
                </section>

                {/* 10. Newsletter / Stay Updated Bar (Blue Mail Subscribe Box) */}
                <section>
                  <NewsletterBar />
                </section>
              </>
            )}
          </>
        ) : (
          /* Rental Tracking Dashboard (Requirement #6) */
          <RentalTrackingView
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onExtendRental={handleExtendRental}
            onBackToCatalog={() => setCurrentView('catalog')}
          />
        )}
      </main>

     

      {/* OPERATIONAL MODALS (All 6 core features working perfectly) */}
      <RentalDatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        currentRange={rentalDateRange}
        onApplyRange={(newRange) => {
          setRentalDateRange(newRange);
          showToast(`Durasi sewa diperbarui: ${newRange.totalDays} Hari (${newRange.nightsCount} Malam).`);
        }}
      />

      <ProductDetailModal
        product={selectedProductDetail}
        isOpen={!!selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        rentalDateRange={rentalDateRange}
        onOpenDatePicker={() => setIsDatePickerOpen(true)}
        onAddToCart={(product, qty) => handleAddToCart(product, qty)}
        onOpenChat={handleOpenChat}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        rentalDateRange={rentalDateRange}
        onOpenDatePicker={() => setIsDatePickerOpen(true)}
        deliveryMethod={deliveryMethod}
        onChangeDeliveryMethod={setDeliveryMethod}
        includeCleaningService={includeCleaningService}
        onToggleCleaningService={setIncludeCleaningService}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        rentalDateRange={rentalDateRange}
        deliveryMethod={deliveryMethod}
        onChangeDeliveryMethod={setDeliveryMethod}
        includeCleaningService={includeCleaningService}
        onOrderCreated={handleOrderCreated}
      />

      <OrderSuccessModal
        order={lastPlacedOrder}
        isOpen={!!lastPlacedOrder}
        onClose={() => setLastPlacedOrder(null)}
        onGoToTracking={() => {
          setLastPlacedOrder(null);
          setCurrentView('tracking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <RentalRulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      <MitraVendorModal
        isOpen={isMitraModalOpen}
        onClose={() => setIsMitraModalOpen(false)}
      />

      <VendorChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        vendor={chatVendor}
        product={chatProduct}
      />
    </div>
  );
}
