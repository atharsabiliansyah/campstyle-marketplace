import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Product, RentalDateRange, CartItem, RentalVendor } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedCarouselProps {
  products: Product[];
  rentalDateRange: RentalDateRange;
  cart: CartItem[];
  onViewDetail: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onOpenChat?: (vendor: RentalVendor, product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  products,
  rentalDateRange,
  cart,
  onViewDetail,
  onQuickAdd,
  onOpenChat,
  onViewAll,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll loop effect like an advertising billboard
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.6; // pixels per frame

    const step = () => {
      if (!isHovered && container) {
        // If scrolled past half (where duplicate begins), reset to 0 seamlessly
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += speed;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  // We duplicate the items array so the marquee loops seamlessly without white gap
  const displayItems = [...products, ...products];

  return (
    <div className="space-y-4 w-full overflow-hidden">
      {/* Header with Title & View All */}
      <div className="flex items-start justify-between gap-3 pb-1">
        <div>
          <h2 className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight font-heading">
            Tenda & Perlengkapan
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Alat camping paling favorit dan siap ekspedisi
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 shrink-0 pt-1 cursor-pointer font-heading"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Animated Marquee / Sideways Scrolling Track */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none py-2 px-1 select-none"
          style={{ scrollBehavior: 'auto' }}
        >
          {displayItems.map((product, index) => {
            const inCart = cart.some((it) => it.product.id === product.id);
            return (
              <div
                key={`${product.id}-${index}`}
                className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 transform transition-transform hover:-translate-y-1 duration-200"
              >
                <ProductCard
                  product={product}
                  rentalDateRange={rentalDateRange}
                  onViewDetail={onViewDetail}
                  onQuickAdd={onQuickAdd}
                  onOpenChat={onOpenChat}
                  isInCart={inCart}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
