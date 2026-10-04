import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Calendar, 
  ShoppingBag, 
  ArrowRight, 
  Truck,
  Building2,
  FileText
} from 'lucide-react';
import { CartItem, RentalDateRange, DeliveryMethod } from '../types';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  rentalDateRange: RentalDateRange;
  onOpenDatePicker: () => void;
  deliveryMethod: DeliveryMethod;
  onChangeDeliveryMethod: (method: DeliveryMethod) => void;
  includeCleaningService: boolean;
  onToggleCleaningService: (val: boolean) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  rentalDateRange,
  onOpenDatePicker,
  deliveryMethod,
  onChangeDeliveryMethod,
  includeCleaningService,
  onToggleCleaningService,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const itemsSubtotal = items.reduce((acc, item) => {
    return acc + item.product.pricePerDay * rentalDateRange.totalDays * item.quantity;
  }, 0);

  const deliveryFee = deliveryMethod === 'courier_delivery' ? 25000 : 0;
  const cleaningFee = includeCleaningService ? 10000 : 0;
  const grandTotal = itemsSubtotal + deliveryFee + cleaningFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-white border-l border-[#223d31] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#233d31] bg-[#14261e] text-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-emerald-400 stroke-[2.2]" />
              <div>
                <h3 className="font-bold text-base uppercase tracking-wider font-heading">
                  KERANJANG LOGISTIK SEWA
                </h3>
                <p className="text-xs text-stone-300 font-inter">
                  {items.length} ITEM · DURASI {rentalDateRange.totalDays} HARI
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-white rounded transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rental Dates Summary Banner */}
          <div className="px-5 py-3.5 bg-[#faf9f5] border-b border-[#d8d5cb] flex items-center justify-between text-xs font-inter">
            <div>
              <span className="text-[11px] uppercase font-bold text-stone-500 block">Jadwal Sewa Aktif:</span>
              <p className="font-bold text-stone-900 text-sm">
                {formatDateIndo(rentalDateRange.startDate, false)} → {formatDateIndo(rentalDateRange.endDate, false)}
              </p>
              <p className="text-xs text-[#1b3d2f] font-semibold">
                Total: {rentalDateRange.totalDays} Hari ({rentalDateRange.nightsCount} Malam)
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenDatePicker}
              className="px-3 py-1.5 text-xs font-bold text-[#1b3d2f] border border-[#1b3d2f] rounded-lg hover:bg-[#1b3d2f] hover:text-white transition font-heading"
            >
              Ubah Tanggal
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 font-inter">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 font-inter">
                <ShoppingBag className="w-10 h-10 text-stone-300" />
                <h4 className="font-bold text-stone-800 text-sm font-heading">Keranjang Sewa Kosong</h4>
                <p className="text-xs text-stone-500 max-w-xs">
                  Pilih peralatan gunung atau camping dari katalog di sebelah kiri untuk memulai reservasi.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-[#1b3d2f] text-white rounded text-xs font-bold hover:bg-[#142e23] transition font-heading"
                >
                  Buka Katalog Alat
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs font-bold text-stone-600 pb-1.5 border-b border-[#eeece6]">
                  <span className="font-heading">DAFTAR ALAT DISEWA</span>
                  <button
                    onClick={onClearCart}
                    className="hover:text-red-700 transition text-[11px]"
                  >
                    KOSONGKAN
                  </button>
                </div>

                {items.map((item) => {
                  const itemSubtotal = item.product.pricePerDay * rentalDateRange.totalDays * item.quantity;
                  return (
                    <div
                      key={item.product.id}
                      className="p-3 bg-[#faf9f5] border border-[#d8d5cb] rounded-xl flex gap-3 text-xs"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg bg-[#eeece6] shrink-0 border border-[#d8d5cb]"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-stone-900 line-clamp-1 font-heading text-sm">
                              {item.product.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-stone-400 hover:text-red-700 transition p-0.5"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-stone-500">
                            {item.product.brand} · {formatRupiah(item.product.pricePerDay)} /hari
                          </p>
                        </div>

                        {/* Calculation Formula detail */}
                        <div className="mt-1.5 text-xs bg-white p-1.5 rounded-lg border border-[#d8d5cb] flex items-center justify-between">
                          <span className="text-stone-600">
                            {formatRupiah(item.product.pricePerDay)} × {rentalDateRange.totalDays}h × {item.quantity}
                          </span>
                          <strong className="text-stone-950 font-bold">
                            {formatRupiah(itemSubtotal)}
                          </strong>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#eeece6] text-xs">
                          <span className="text-stone-500 font-medium">Jumlah Unit:</span>
                          <div className="flex items-center border border-[#d8d5cb] bg-white rounded-lg">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-stone-100 text-stone-600"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center font-bold text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-stone-100 text-stone-600"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Logistics & Service Options */}
                <div className="space-y-2.5 pt-2 text-xs">
                  <span className="text-xs uppercase font-bold text-stone-600 block font-heading">
                    Metode Pengambilan & Layanan Tambahan:
                  </span>

                  <label 
                    onClick={() => onChangeDeliveryMethod('pickup_basecamp')}
                    className={`flex items-start gap-2.5 p-3 rounded border cursor-pointer transition ${
                      deliveryMethod === 'pickup_basecamp'
                        ? 'border-[#1b3d2f] bg-[#f0f4f1]'
                        : 'border-[#d8d5cb] bg-white hover:bg-[#faf9f5]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'pickup_basecamp'}
                      onChange={() => onChangeDeliveryMethod('pickup_basecamp')}
                      className="mt-0.5 text-[#1b3d2f]"
                    />
                    <div className="flex-1 text-[11px]">
                      <div className="flex justify-between font-bold text-stone-900">
                        <span>Ambil Mandiri di Basecamp Kaliurang</span>
                        <span className="text-emerald-700">GRATIS</span>
                      </div>
                      <p className="text-stone-500 mt-0.5 text-[10px]">
                        Jl. Kaliurang Km 12.5 (Buka 08:30 – 21:30 WIB)
                      </p>
                    </div>
                  </label>

                  <label 
                    onClick={() => onChangeDeliveryMethod('courier_delivery')}
                    className={`flex items-start gap-2.5 p-3 rounded border cursor-pointer transition ${
                      deliveryMethod === 'courier_delivery'
                        ? 'border-[#1b3d2f] bg-[#f0f4f1]'
                        : 'border-[#d8d5cb] bg-white hover:bg-[#faf9f5]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'courier_delivery'}
                      onChange={() => onChangeDeliveryMethod('courier_delivery')}
                      className="mt-0.5 text-[#1b3d2f]"
                    />
                    <div className="flex-1 text-[11px]">
                      <div className="flex justify-between font-bold text-stone-900">
                        <span>Antar Kurir ke Lokasi / Basecamp Pendakian</span>
                        <span className="font-bold">+Rp 25.000</span>
                      </div>
                      <p className="text-stone-500 mt-0.5 text-[10px]">
                        Wilayah DIY / Pos Pendakian Merapi & Merbabu
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded border border-[#d8d5cb] bg-white hover:bg-[#faf9f5] cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={includeCleaningService}
                      onChange={(e) => onToggleCleaningService(e.target.checked)}
                      className="mt-0.5 text-[#1b3d2f]"
                    />
                    <div className="flex-1 text-[11px]">
                      <div className="flex justify-between font-bold text-stone-900">
                        <span>Layanan Cuci & Sterilisasi Bersih</span>
                        <span>+Rp 10.000</span>
                      </div>
                      <p className="text-stone-500 mt-0.5 text-[10px]">
                        Tidak perlu cuci nesting / jemur tenda saat pulang.
                      </p>
                    </div>
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#d8d5cb] bg-[#faf9f5] space-y-3.5 font-inter shrink-0">
              <div className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal Sewa ({rentalDateRange.totalDays} Hari):</span>
                  <span className="font-bold text-stone-900">{formatRupiah(itemsSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pengiriman dan Pengambilan:</span>
                  <span className="font-semibold text-stone-900">
                    {deliveryFee > 0 ? formatRupiah(deliveryFee) : 'Gratis'}
                  </span>
                </div>
                {cleaningFee > 0 && (
                  <div className="flex justify-between">
                    <span>Layanan Cuci Bebas Repot:</span>
                    <span className="font-semibold text-stone-900">{formatRupiah(cleaningFee)}</span>
                  </div>
                )}
                <div className="pt-2.5 border-t border-[#d8d5cb] flex justify-between items-baseline">
                  <div>
                    <span className="font-black text-stone-900 text-sm sm:text-base font-heading">TOTAL TAGIHAN:</span>
                    <span className="text-xs text-stone-500 block">Jaminan KTP asli diserahkan saat ambil</span>
                  </div>
                  <span className="text-xl font-black text-stone-950 font-heading">{formatRupiah(grandTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#1b3d2f] hover:bg-[#142e23] text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 font-heading cursor-pointer shadow-md"
              >
                <span>SELANJUTNYA</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
