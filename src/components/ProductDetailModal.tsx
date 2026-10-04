import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Check, 
  ShieldAlert, 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  FileText, 
  Clock, 
  CheckCircle, 
  Store,
  MessageCircle,
  ThumbsUp,
  UserCheck
} from 'lucide-react';
import { Product, RentalDateRange, RentalVendor } from '../types';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  rentalDateRange: RentalDateRange;
  onOpenDatePicker: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenChat?: (vendor: RentalVendor, product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  rentalDateRange,
  onOpenDatePicker,
  onAddToCart,
  onOpenChat,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'terms' | 'reviews'>('specs');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  const currentImg = selectedImage || product.imageUrl;
  const subtotal = product.pricePerDay * rentalDateRange.totalDays * quantity;

  const handleAdd = () => {
    if (product.status !== 'ready') return;
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150 font-inter">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#333] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#254234] bg-[#14261e] text-white shrink-0">
          <div className="flex items-center gap-2 text-xs font-heading">
            <span className="text-emerald-400 font-bold uppercase">{product.categoryLabel}</span>
            <span className="text-stone-500">/</span>
            <span className="text-stone-300 uppercase">{product.brand}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-xl bg-[#eeece6] border border-[#d8d5cb] overflow-hidden">
                <img
                  src={currentImg}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.galleryUrls && product.galleryUrls.length > 1 && (
                <div className="flex gap-2">
                  {product.galleryUrls.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border transition ${
                        currentImg === img ? 'border-[#1b3d2f] ring-2 ring-[#1b3d2f]/30' : 'border-[#d8d5cb] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Technical Maintenance Certificate */}
              <div className="p-3.5 bg-[#faf9f5] border border-[#d8d5cb] rounded-xl text-xs space-y-1">
                <span className="text-xs uppercase font-bold text-stone-600 block font-heading">Kondisi Fisik & Sanitasi:</span>
                <p className="text-stone-800 text-xs leading-relaxed">{product.condition}</p>
              </div>
            </div>

            {/* Info & Price Calculator */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <div className="flex items-center text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-600 mr-1" />
                    {product.rating}
                  </div>
                  <span>·</span>
                  <span>{product.reviewsCount} Kali Disewa</span>
                </div>
                <h2 className="text-xl font-bold text-stone-900 leading-snug font-heading">{product.name}</h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">{product.description}</p>
              </div>

              {/* Rate Card */}
              <div className="p-3.5 bg-[#f2f0e9] border border-[#d8d5cb] rounded-xl flex items-baseline justify-between">
                <span className="text-xs uppercase font-bold text-stone-600 font-heading">Tarif Sewa Harian:</span>
                <div>
                  <span className="text-2xl font-black text-stone-950 font-heading">
                    {formatRupiah(product.pricePerDay)}
                  </span>
                  <span className="text-xs text-stone-500 font-medium"> /hari</span>
                </div>
              </div>

              {/* Marketplace Vendor Profile Card */}
              {product.vendor && (
                <div className="p-3.5 bg-[#faf9f5] border border-[#d8d5cb] rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-heading font-black text-sm">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 text-sm font-heading">{product.vendor.name}</span>
                          {product.vendor.isOfficial && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-heading">
                              Official
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500">
                          {product.vendor.area} · {product.vendor.city}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 justify-end font-bold text-stone-900">
                        <Star className="w-3 h-3 fill-amber-500 stroke-amber-600" />
                        <span>{product.vendor.rating}</span>
                      </div>
                      <span className="text-[11px] text-stone-400">Respon {product.vendor.responseTime}</span>
                    </div>
                  </div>

                  {onOpenChat && (
                    <div className="pt-2 border-t border-[#d8d5cb] flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">Punya pertanyaan seputar alat atau penjemputan?</span>
                      <button
                        type="button"
                        onClick={() => onOpenChat(product.vendor!, product)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold font-heading flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Rental Date Info */}
              <div className="p-3.5 bg-[#faf9f5] border border-[#d8d5cb] rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-stone-600 font-heading">Jadwal Sewa Aktif:</span>
                  <button
                    type="button"
                    onClick={onOpenDatePicker}
                    className="font-bold text-[#1b3d2f] hover:underline cursor-pointer"
                  >
                    Ubah Tanggal
                  </button>
                </div>
                <div className="flex items-center justify-between bg-white p-2.5 border border-[#d8d5cb] rounded-lg text-xs">
                  <span className="font-medium">{formatDateIndo(rentalDateRange.startDate, false)} → {formatDateIndo(rentalDateRange.endDate, false)}</span>
                  <strong className="text-[#1b3d2f] font-heading">{rentalDateRange.totalDays} HARI</strong>
                </div>
              </div>

              {/* Quantity & Formula */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600 uppercase font-bold text-xs font-heading">Kuantitas Unit:</span>
                  <div className="flex items-center border border-[#d8d5cb] rounded-lg bg-white">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 hover:bg-stone-100 disabled:opacity-40 text-stone-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                    <button
                      type="button"
                      disabled={product.status !== 'ready'}
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 hover:bg-stone-100 disabled:opacity-40 text-stone-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-[#14261e] text-white rounded-xl space-y-1">
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>{formatRupiah(product.pricePerDay)} × {rentalDateRange.totalDays} Hari × {quantity} Unit</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1 border-t border-[#233d31]">
                    <span className="text-xs text-emerald-400 font-bold font-heading">TOTAL ESTIMASI:</span>
                    <span className="text-xl font-black font-heading">{formatRupiah(subtotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs & Included Manifest */}
          <div className="border-t border-[#d8d5cb] pt-4">
            <div className="flex border-b border-[#d8d5cb] gap-4 sm:gap-6 mb-4 text-xs font-heading overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 font-bold tracking-wider uppercase transition border-b-2 cursor-pointer whitespace-nowrap ${
                  activeTab === 'specs'
                    ? 'border-[#1b3d2f] text-[#1b3d2f]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
              SPESIFIKASI & KELENGKAPAN
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('terms')}
                className={`pb-2.5 font-bold tracking-wider uppercase transition border-b-2 cursor-pointer whitespace-nowrap ${
                  activeTab === 'terms'
                    ? 'border-[#1b3d2f] text-[#1b3d2f]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
              SYARAT JAMINAN KTP
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 font-bold tracking-wider uppercase transition border-b-2 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'border-[#1b3d2f] text-[#1b3d2f]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <span>ULASAN PENYEWA</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
                </span>
              </button>
            </div>

            {activeTab === 'specs' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Tech Specs */}
                <div className="bg-[#faf9f5] p-4 border border-[#d8d5cb] rounded-xl space-y-2">
                  <span className="text-xs uppercase font-bold text-stone-600 block mb-2 font-heading">
                    Manifest Spesifikasi Material
                  </span>
                  <div className="space-y-1.5">
                    {product.specs.map((s, idx) => (
                      <div key={idx} className="flex justify-between py-1.5 border-b border-[#eeece6] last:border-none">
                        <span className="text-stone-500">{s.label}:</span>
                        <span className="font-bold text-stone-900 text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included Items */}
                <div className="bg-[#faf9f5] p-4 border border-[#d8d5cb] rounded-xl space-y-2">
                  <span className="text-xs uppercase font-bold text-stone-600 block mb-2 font-heading">
                    Item Checklist Serah-Terima Fisik
                  </span>
                  <ul className="space-y-2">
                    {product.includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-stone-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1b3d2f]"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : activeTab === 'terms' ? (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl space-y-1">
                  <span className="font-bold text-amber-950 uppercase text-xs block font-heading">
                    Ketentuan Jaminan Identitas (Wajib Fisik Asli)
                  </span>
                  <p className="text-amber-900 text-xs sm:text-sm leading-relaxed">
                    Penyewa wajib menitipkan 1 kartu identitas fisik asli yang masih berlaku (KTP / KTM Mahasiswa / SIM) saat pengambilan barang di basecamp. Kartu disimpan di lemari brankas dan dikembalikan seketika saat unit diserahkan utuh.
                  </p>
                </div>

                <div className="bg-[#faf9f5] p-4 border border-[#d8d5cb] rounded-xl space-y-2">
                  <span className="text-xs uppercase font-bold text-stone-600 block font-heading">Ketentuan Khusus Item Ini:</span>
                  <ul className="space-y-1.5 text-stone-700">
                    {product.rentalTerms.map((term, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-stone-400 font-bold">•</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              /* Marketplace Reviews & Testimonials Tab */
              <div className="space-y-4 text-xs">
                {/* Summary Score Bar */}
                <div className="p-4 bg-[#faf9f5] border border-[#d8d5cb] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-black text-stone-900 font-heading">
                      {product.rating}
                    </div>
                    <div>
                      <div className="flex text-amber-500 text-sm">
                        {'★'.repeat(5)}
                      </div>
                      <p className="text-xs text-stone-500 font-medium mt-0.5">
                        Berdasarkan {product.reviewsCount} penyewaan sukses di marketplace
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1 font-heading">
                      <UserCheck className="w-3.5 h-3.5" />
                      100% Ulasan Terverifikasi
                    </span>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-3">
                  <div className="p-3.5 bg-white border border-stone-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-stone-800 text-white flex items-center justify-center font-bold text-xs">
                          BP
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900">Bagas Pratama</span>
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              Sewa Terverifikasi
                            </span>
                          </div>
                          <span className="text-[10px] text-stone-400">2 hari lalu · Pendakian Gunung Merbabu</span>
                        </div>
                      </div>
                      <div className="flex text-amber-500 text-xs">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                      "Barang bersih banget, wangi, tidak ada bekas tanah ataupun debu lembap. Waktu kena hujan badai di Pos 3 aman sekali sealant tidak ada yang bocor. Kemarin serah terima KTP brankas juga cepat dan amanah!"
                    </p>
                    {product.vendor && (
                      <div className="mt-2 pl-3 border-l-2 border-emerald-600 bg-stone-50 p-2 rounded-r-lg space-y-0.5">
                        <span className="text-[11px] font-bold text-emerald-800 font-heading">
                          Respon dari {product.vendor.name}:
                        </span>
                        <p className="text-[11px] text-stone-600">
                          "Terima kasih banyak kak Bagas atas kepercayaannya menyewa di hub kami! Sehat dan lestari selalu untuk pendakian selanjutnya 🙏"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 bg-white border border-stone-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                          DS
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900">Dian Safitri</span>
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              Sewa Terverifikasi
                            </span>
                          </div>
                          <span className="text-[10px] text-stone-400">5 hari lalu · Camping Keluarga Kaliurang</span>
                        </div>
                      </div>
                      <div className="flex text-amber-500 text-xs">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                      "Pelayanan mitra super ramah, respon chat gercep hitungan menit. Tenda pas dibuka frame-nya masih lurus kencang, pasak komplit 12 pcs. Next camping pasti sewa ke toko ini lagi."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#d8d5cb] bg-[#faf9f5] flex items-center justify-between shrink-0 font-inter">
          <div>
            <span className="text-xs uppercase font-bold text-stone-500 block font-heading">Total Estimasi ({rentalDateRange.totalDays} Hari):</span>
            <span className="text-xl font-black text-stone-900 font-heading">{formatRupiah(subtotal)}</span>
          </div>

          <div className="flex items-center gap-2.5 font-heading">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-700 hover:text-stone-950 transition cursor-pointer"
            >
              Tutup
            </button>
            <button
              type="button"
              disabled={product.status !== 'ready'}
              onClick={handleAdd}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm ${
                product.status !== 'ready'
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : addedNotice
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#1b3d2f] hover:bg-[#142e23] text-white'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  Masuk Keranjang!
                </>
              ) : product.status !== 'ready' ? (
                'Unit Sedang Disewa'
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Tambah Keranjang
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
