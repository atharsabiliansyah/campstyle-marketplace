import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Building2, 
  Truck, 
  Upload, 
  Check, 
  Lock,
  AlertCircle
} from 'lucide-react';
import { CartItem, RentalDateRange, DeliveryMethod, PaymentMethod, RentalOrder } from '../types';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  rentalDateRange: RentalDateRange;
  deliveryMethod: DeliveryMethod;
  onChangeDeliveryMethod: (method: DeliveryMethod) => void;
  includeCleaningService: boolean;
  onOrderCreated: (order: RentalOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  rentalDateRange,
  deliveryMethod,
  onChangeDeliveryMethod,
  includeCleaningService,
  onOrderCreated,
}) => {
  const [fullName, setFullName] = useState('Ahmad Fauzi');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [email, setEmail] = useState('ahmad.fauzi@campmail.id');
  const [idType, setIdType] = useState<'KTP' | 'KTM' | 'SIM'>('KTP');
  const [idNumber, setIdNumber] = useState('3304123456780001');
  const [idSimulatedUploaded, setIdSimulatedUploaded] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('Villa Kaliurang Asri No. 12, Sleman');
  const [customerNotes, setCustomerNotes] = useState('Rencana camp ceria di Bukit Klangon Merapi.');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const itemsSubtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.pricePerDay * rentalDateRange.totalDays * item.quantity;
  }, 0);

  const deliveryFee = deliveryMethod === 'courier_delivery' ? 25000 : 0;
  const cleaningFee = includeCleaningService ? 10000 : 0;
  const totalAmount = itemsSubtotal + deliveryFee + cleaningFee;

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdSimulatedUploaded(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setFormError('Anda wajib menyetujui syarat jaminan kartu identitas fisik & ketentuan sewa.');
      return;
    }
    if (!fullName || !phone || !idNumber) {
      setFormError('Mohon lengkapi semua data diri peminjam.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const orderId = `CS-2026-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${randomSuffix}`;
    const returnDueTimestamp = `${rentalDateRange.endDate}T20:00:00+07:00`;

    const newOrder: RentalOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        fullName,
        phone,
        email,
        idType,
        idNumber,
        idPhotoSimulated: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
        notes: customerNotes,
      },
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        category: item.product.categoryLabel,
        brand: item.product.brand,
        imageUrl: item.product.imageUrl,
        pricePerDay: item.product.pricePerDay,
        quantity: item.quantity,
        subtotal: item.product.pricePerDay * rentalDateRange.totalDays * item.quantity,
      })),
      dateRange: rentalDateRange,
      deliveryMethod,
      deliveryAddress: deliveryMethod === 'courier_delivery' ? deliveryAddress : undefined,
      deliveryFee,
      cleaningServiceFee: cleaningFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod_basecamp' ? 'pay_at_basecamp' : 'paid',
      status: deliveryMethod === 'pickup_basecamp' ? 'pending_pickup' : 'active_rented',
      guaranteeStatus: `Jaminan ${idType} (${idNumber}) Terverifikasi · Fisik diserahkan saat ambil`,
      returnDueTimestamp,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderCreated(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white rounded-lg border border-[#333] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#233d31] bg-[#14261e] text-white shrink-0 font-inter">
          <div>
            <h3 className="font-bold text-base uppercase tracking-wider font-heading">
              FORMULIR PENYEWAAN & JAMINAN FISIK
            </h3>
            <p className="text-xs text-stone-300">CAMP STYLE BASECAMP KALIURANG KM 12.5</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1 font-inter">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-xl flex items-center gap-2 text-xs text-red-900 font-inter">
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Section 1: Customer Data */}
              <div className="bg-[#faf9f5] p-4 rounded-xl border border-[#d8d5cb] space-y-3 font-inter text-xs">
                <span className="text-xs font-bold text-stone-800 uppercase block border-b border-[#eeece6] pb-1.5 font-heading">
                  DATA DIRI PENANGGUNG JAWAB
                </span>

                <div className="space-y-3">
                  <div>
                    <label className="block text-stone-600 mb-1 text-[11px]">NAMA LENGKAP (SESUAI IDENTITAS):</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-[#d8d5cb] rounded px-3 py-1.5 text-xs text-stone-900 font-sans focus:outline-none focus:border-[#1b3d2f]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 mb-1 text-[11px]">NO WHATSAPP AKTIF:</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-[#d8d5cb] rounded px-3 py-1.5 text-xs text-stone-900 font-sans focus:outline-none focus:border-[#1b3d2f]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1 text-[11px]">EMAIL:</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-[#d8d5cb] rounded px-3 py-1.5 text-xs text-stone-900 font-sans focus:outline-none focus:border-[#1b3d2f]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Identity Guarantee */}
              <div className="bg-[#f5f2e9] p-4 rounded border border-[#d5cfbe] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#e2dcce] pb-1.5">
                  <span className="text-[11px] font-bold text-amber-950 uppercase">
                    DOKUMEN JAMINAN FISIK (WAJIB DITITIPKAN)
                  </span>
                  <span className="text-[10px] text-amber-900 font-semibold">
                    Simpan di brankas basecamp
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {(['KTP', 'KTM', 'SIM'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setIdType(type)}
                        className={`py-1.5 px-2 text-xs font-bold border rounded transition text-center ${
                          idType === type
                            ? 'bg-[#1b3d2f] border-[#1b3d2f] text-white'
                            : 'bg-white border-[#d8d5cb] text-stone-800 hover:bg-stone-50'
                        }`}
                      >
                        {type === 'KTM' ? 'KTM' : type}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 text-[11px]">
                      NOMOR {idType} (NIK / NIM / NO. REGISTRASI):
                    </label>
                    <input
                      type="text"
                      required
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full bg-white border border-[#d8d5cb] rounded px-3 py-1.5 text-xs text-stone-900 font-sans focus:outline-none focus:border-[#1b3d2f]"
                    />
                  </div>

                  {/* ID Upload simulation */}
                  <div className="p-3 bg-white border border-[#d8d5cb] rounded flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-[11px] text-stone-900">Lampiran Foto Dokumen {idType}</p>
                      <p className="text-[10px] text-stone-500 font-sans">
                        {idSimulatedUploaded ? 'Foto kartu identitas terlampir' : 'Unggah foto identitas pendukung'}
                      </p>
                    </div>

                    <label className="cursor-pointer px-3.5 py-1.5 bg-stone-900 text-white text-xs font-heading rounded-lg hover:bg-stone-800 transition">
                      <span>{idSimulatedUploaded ? 'Ganti Foto' : 'Unggah Foto'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleSimulateUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 3: Delivery / Handover Method */}
              <div className="bg-[#faf9f5] p-4 rounded-xl border border-[#d8d5cb] space-y-3 font-inter text-xs">
                <span className="text-xs font-bold text-stone-800 uppercase block border-b border-[#eeece6] pb-1.5 font-heading">
                   METODE PENGAMBILAN UNIT
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div
                    onClick={() => onChangeDeliveryMethod('pickup_basecamp')}
                    className={`p-3 rounded border cursor-pointer transition ${
                      deliveryMethod === 'pickup_basecamp'
                        ? 'border-[#1b3d2f] bg-[#f0f4f1]'
                        : 'border-[#d8d5cb] bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold text-stone-900 text-[11px]">
                      <span>Ambil di Basecamp</span>
                      <span className="text-emerald-700">GRATIS</span>
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1 font-sans">
                      Jl. Kaliurang Km 12.5 (Buka 08:30 – 21:30 WIB)
                    </p>
                  </div>

                  <div
                    onClick={() => onChangeDeliveryMethod('courier_delivery')}
                    className={`p-3 rounded border cursor-pointer transition ${
                      deliveryMethod === 'courier_delivery'
                        ? 'border-[#1b3d2f] bg-[#f0f4f1]'
                        : 'border-[#d8d5cb] bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold text-stone-900 text-[11px]">
                      <span>Antar Kurir Lokasi</span>
                      <span>+Rp 25.000</span>
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1 font-sans">
                      Diantar ke homestay / pos pendakian
                    </p>
                  </div>
                </div>

                {deliveryMethod === 'courier_delivery' && (
                  <div className="pt-1">
                    <label className="block text-stone-600 mb-1 text-[11px]">ALAMAT LENGKAP PENGANTARAN:</label>
                    <textarea
                      rows={2}
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-white border border-[#d8d5cb] rounded px-3 py-1.5 text-xs text-stone-900 font-sans focus:outline-none focus:border-[#1b3d2f]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-stone-600 mb-1 text-[11px]">CATATAN / DESTINASI GUNUNG:</label>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Contoh: Rencana camp di Selo Merbabu"
                    className="w-full bg-white border border-[#d8d5cb] rounded px-3 py-1.5 text-xs text-stone-900 font-sans focus:outline-none focus:border-[#1b3d2f]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Order Manifest & Payment */}
            <div className="lg:col-span-5 space-y-4 font-inter text-xs">
              {/* Schedule Box */}
              <div className="p-3.5 bg-[#14261e] text-white rounded-xl space-y-1">
                <div className="flex justify-between text-xs text-stone-300 font-heading">
                  <span>DURASI SEWA:</span>
                  <span className="font-bold text-emerald-400">{rentalDateRange.totalDays} HARI</span>
                </div>
                <div className="text-xs text-stone-200 flex justify-between">
                  <span>Mulai: {formatDateIndo(rentalDateRange.startDate, false)}</span>
                  <span>Kembali: {formatDateIndo(rentalDateRange.endDate, false)}</span>
                </div>
              </div>

              {/* Items Summary Table */}
              <div className="bg-[#faf9f5] p-3.5 border border-[#d8d5cb] rounded-xl space-y-2">
                <span className="text-xs uppercase font-bold text-stone-700 block border-b border-[#eeece6] pb-1 font-heading">
                  RINGKASAN ITEM 
                </span>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between py-1 border-b border-[#eeece6] last:border-none text-[11px]">
                      <div className="flex-1 pr-2">
                        <p className="font-semibold text-stone-900 line-clamp-1">{item.product.name}</p>
                        <p className="text-[10px] text-stone-500">
                          {item.quantity} unit × {rentalDateRange.totalDays}h × {formatRupiah(item.product.pricePerDay)}
                        </p>
                      </div>
                      <span className="font-bold font-mono-num text-stone-900">
                        {formatRupiah(item.product.pricePerDay * rentalDateRange.totalDays * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#d8d5cb] space-y-1 text-stone-600 text-[11px]">
                  <div className="flex justify-between">
                    <span>Subtotal Alat:</span>
                    <span className="font-mono-num">{formatRupiah(itemsSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Pengantaran:</span>
                    <span>{deliveryFee > 0 ? formatRupiah(deliveryFee) : 'Rp 0'}</span>
                  </div>
                  {cleaningFee > 0 && (
                    <div className="flex justify-between">
                      <span>Layanan Cuci:</span>
                      <span className="font-mono-num">{formatRupiah(cleaningFee)}</span>
                    </div>
                  )}
                  <div className="pt-1 border-t border-[#d8d5cb] flex justify-between font-bold text-xs text-stone-950">
                    <span>TOTAL TAGIHAN:</span>
                    <span className="text-sm font-mono-num text-[#1b3d2f]">{formatRupiah(totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-[#faf9f5] p-3 border border-[#d8d5cb] rounded space-y-2">
                <span className="text-[10px] uppercase font-bold text-stone-500 block border-b border-[#eeece6] pb-1">
                 METODE PEMBAYARAN
                </span>

                <div className="space-y-1.5 text-[11px]">
                  <label
                    onClick={() => setPaymentMethod('qris')}
                    className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition ${
                      paymentMethod === 'qris'
                        ? 'border-[#1b3d2f] bg-white font-bold'
                        : 'border-[#d8d5cb] bg-white hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'qris'}
                      onChange={() => setPaymentMethod('qris')}
                      className="text-[#1b3d2f]"
                    />
                    <QrCode className="w-4 h-4 text-stone-700 shrink-0" />
                    <span>QRIS Instant (GoPay, OVO, ShopeePay, BCA)</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('va_bca')}
                    className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition ${
                      paymentMethod === 'va_bca'
                        ? 'border-[#1b3d2f] bg-white font-bold'
                        : 'border-[#d8d5cb] bg-white hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'va_bca'}
                      onChange={() => setPaymentMethod('va_bca')}
                      className="text-[#1b3d2f]"
                    />
                    <Banknote className="w-4 h-4 text-stone-700 shrink-0" />
                    <span>Transfer Virtual Account (BCA / Mandiri)</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod_basecamp')}
                    className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition ${
                      paymentMethod === 'cod_basecamp'
                        ? 'border-[#1b3d2f] bg-white font-bold'
                        : 'border-[#d8d5cb] bg-white hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod_basecamp'}
                      onChange={() => setPaymentMethod('cod_basecamp')}
                      className="text-[#1b3d2f]"
                    />
                    <Building2 className="w-4 h-4 text-stone-700 shrink-0" />
                    <span>Bayar tunai di basecamp</span>
                  </label>
                </div>
              </div>

              {/* Agreement */}
              <div className="p-3 bg-stone-100 border border-[#d8d5cb] rounded">
                <label className="flex items-start gap-2 cursor-pointer text-[10px] text-stone-700 leading-tight">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 text-[#1b3d2f]"
                  />
                  <span>
                    Saya bersedia menyerahkan <strong>1 kartu identitas fisik asli ({idType})</strong> pada saat pengambilan dan bertanggung jawab atas kelengkapan alat sewa Camp Style.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#1b3d2f] hover:bg-[#142e23] text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 font-heading cursor-pointer disabled:opacity-50 shadow-md"
              >
                {isSubmitting ? (
                  <span>MEMPROSES RESERVASI...</span>
                ) : (
                  <>
                    <span>KONFIRMASI SEWA </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
