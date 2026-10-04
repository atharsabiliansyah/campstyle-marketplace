import React from 'react';
import { Star, Check, Plus, Eye, Store, MessageCircle, MapPin } from 'lucide-react';
import { Product, RentalDateRange, RentalVendor } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  rentalDateRange: RentalDateRange;
  onViewDetail: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onOpenChat?: (vendor: RentalVendor, product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  rentalDateRange,
  onViewDetail,
  onQuickAdd,
  onOpenChat,
  isInCart = false,
}) => {
  const isReady = product.status === 'ready';
  const totalPrice = product.pricePerDay * rentalDateRange.totalDays;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-stone-300 transition-all duration-200 flex flex-col justify-between group">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-stone-50 overflow-hidden flex items-center justify-center p-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl group-hover:scale-102 transition-transform duration-200"
          loading="lazy"
        />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          {isReady ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 shadow-2xs font-heading">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Ready
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-200 flex items-center gap-1 shadow-2xs font-heading">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Disewa
            </span>
          )}
        </div>

        {/* Quick Actions (View Detail & Chat Toko) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
          {product.vendor && onOpenChat && (
            <button
              type="button"
              onClick={() => onOpenChat(product.vendor!, product)}
              className="p-1.5 rounded-full bg-white/95 hover:bg-white text-emerald-700 hover:text-emerald-800 shadow-xs transition cursor-pointer"
              title="Chat Toko / Tanya Mitra"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onViewDetail(product)}
            className="p-1.5 rounded-full bg-white/95 hover:bg-white text-stone-600 hover:text-stone-900 shadow-xs transition cursor-pointer"
            title="Lihat Detail & Syarat"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details (Matching NovaPhone card layout) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Brand & Name */}
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block font-heading">
            {product.brand}
          </span>
          <h3 
            onClick={() => onViewDetail(product)}
            className="font-bold text-stone-900 text-base leading-snug line-clamp-1 hover:text-emerald-700 cursor-pointer transition mt-0.5 font-heading"
          >
            {product.name}
          </h3>

          {/* Capacity or Key Spec */}
          <p className="text-sm text-stone-500 mt-1 font-medium">
            {product.capacityLabel ? `${product.capacityLabel} · ` : ''}{product.categoryLabel}
          </p>

          {/* Pricing */}
          <div className="mt-2.5 flex flex-col gap-0.5">
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-stone-900 font-sans tracking-tight">
                {formatRupiah(product.pricePerDay)}
              </span>
              <span className="text-xs text-stone-500 font-medium">/hari</span>
            </div>

            <span className="text-xs font-bold text-emerald-700">
              {rentalDateRange.totalDays} hari: {formatRupiah(totalPrice)}
            </span>
          </div>

          {/* Rating with 5 yellow stars & Tersewa Count (Marketplace style) */}
          <div className="flex items-center justify-between gap-1 mt-1.5 text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400 text-sm">
                {'★'.repeat(5)}
              </div>
              <span className="font-bold text-stone-800 text-sm">{product.rating}</span>
            </div>
            <span className="font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full text-[11px]">
              {product.reviewsCount}x Tersewa
            </span>
          </div>

          {/* Marketplace Vendor Store Info */}
          {product.vendor && (
            <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2.5 border-t border-stone-100 text-xs">
              <div className="flex items-center gap-1.5 truncate">
                <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate font-semibold text-stone-700">{product.vendor.name}</span>
                {product.vendor.isOfficial ? (
                  <span className="shrink-0 px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-heading">
                    Official
                  </span>
                ) : (
                  <span className="shrink-0 text-[10px] text-stone-400 flex items-center gap-0.5">
                    • {product.vendor.city}
                  </span>
                )}
              </div>

              {onOpenChat && (
                <button
                  type="button"
                  onClick={() => onOpenChat(product.vendor!, product)}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 shrink-0 hover:underline flex items-center gap-1 cursor-pointer font-heading"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Chat</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* CTA Button: Solid full-width blue/emerald button */}
        <button
          type="button"
          disabled={!isReady}
          onClick={() => onQuickAdd(product)}
          className={`w-full py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer font-heading ${
            !isReady
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : isInCart
              ? 'bg-emerald-700 text-white'
              : 'bg-green-800 hover:bg-green-800 text-white shadow-green-700/20'
          }`}
        >
          {!isReady ? (
            'Sedang Disewa'
          ) : isInCart ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Sudah di Keranjang</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Sewa</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

