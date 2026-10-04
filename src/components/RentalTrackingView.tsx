import React, { useState } from 'react';
import { 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Plus, 
  Printer, 
  X, 
  Building2, 
  Truck
} from 'lucide-react';
import { RentalOrder, OrderStatus } from '../types';
import { formatRupiah, formatDateIndo, formatDateTimeIndo, getRemainingTimeText } from '../utils/formatters';

interface RentalTrackingViewProps {
  orders: RentalOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus, extra?: any) => void;
  onExtendRental: (orderId: string) => void;
  onBackToCatalog: () => void;
}

export const RentalTrackingView: React.FC<RentalTrackingViewProps> = ({
  orders,
  onUpdateOrderStatus,
  onExtendRental,
  onBackToCatalog,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active_rented' | 'pending_pickup' | 'returned'>('all');
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<RentalOrder | null>(null);
  const [extendNotification, setExtendNotification] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (selectedFilter === 'all') return true;
    return order.status === selectedFilter;
  });

  const activeRentalsCount = orders.filter((o) => o.status === 'active_rented').length;

  const handleReturnGear = (orderId: string) => {
    const confirmReturn = window.confirm(
      'Konfirmasi pengembalian alat ke Basecamp Camp Style? Kru akan melakukan checklist fisik kelengkapan dan mengembalikan kartu identitas fisik Anda.'
    );
    if (confirmReturn) {
      onUpdateOrderStatus(orderId, 'returned', {
        returnedAt: new Date().toISOString(),
        guaranteeStatus: 'Kartu Identitas Jaminan Telah Diserahkan Kembali ke Penyewa Lengkap',
      });
    }
  };

  const handleExtend = (orderId: string) => {
    onExtendRental(orderId);
    setExtendNotification(`Masa sewa untuk order ${orderId} berhasil diperpanjang +1 hari.`);
    setTimeout(() => setExtendNotification(null), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Header Manifest Board */}
      <div className="bg-[#14261e] border border-[#233d31] rounded-2xl p-6 sm:p-7 text-white shadow-md font-inter">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-heading">
              Riwayat Status Sewa
            </h2>
            <p className="text-sm text-stone-300 mt-1">
              Pusat kontrol jadwal pengembalian alat, status kartu jaminan di brankas basecamp, dan nota invoice digital.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#1b382c] border border-[#2a5442] px-4 py-2.5 rounded-xl text-center">
              <span className="text-xl font-black text-emerald-400 block leading-tight font-heading">
                {activeRentalsCount}
              </span>
              <span className="text-xs text-stone-300 uppercase font-medium">SEDANG DISEWA</span>
            </div>
            <div className="bg-[#1b382c] border border-[#2a5442] px-4 py-2.5 rounded-xl text-center">
              <span className="text-xl font-black text-white block leading-tight font-heading">
                {orders.length}
              </span>
              <span className="text-xs text-stone-300 uppercase font-medium">TOTAL TRANSAKSI</span>
            </div>
          </div>
        </div>
      </div>

      {extendNotification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-xl text-sm font-medium flex items-center justify-between">
          <span>{extendNotification}</span>
          <button onClick={() => setExtendNotification(null)} className="text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs - Clean segments */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d8d5cb] pb-3 text-xs sm:text-sm font-inter">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'all' as const, label: 'SEMUA PESANAN' },
            { id: 'active_rented' as const, label: 'SEDANG DISEWA' },
            { id: 'pending_pickup' as const, label: 'MENUNGGU AMBIL' },
            { id: 'returned' as const, label: 'SELESAI KEMBALI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition font-heading ${
                selectedFilter === tab.id
                  ? 'bg-[#1b3d2f] text-white shadow-xs'
                  : 'bg-white border border-[#d8d5cb] text-stone-700 hover:bg-stone-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={onBackToCatalog}
          className="text-xs sm:text-sm font-bold text-[#1b3d2f] hover:underline font-heading"
        >
          + Sewa Alat Tambahan di Katalog
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white border border-[#d8d5cb] rounded-2xl p-12 text-center space-y-2 text-sm text-stone-600 font-inter">
          <Clock className="w-9 h-9 text-stone-400 mx-auto" />
          <p className="font-bold text-stone-800 text-base font-heading">Tidak ada pesanan pada kategori filter ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const timeInfo = getRemainingTimeText(order.returnDueTimestamp);

            return (
              <div
                key={order.id}
                className="bg-white border border-[#d8d5cb] rounded-2xl overflow-hidden shadow-xs font-inter"
              >
                {/* Header Row */}
                <div className="p-4 bg-[#faf9f5] border-b border-[#eeece6] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-stone-900 bg-stone-900 text-white px-2.5 py-1 rounded-lg text-xs font-heading">
                      {order.id}
                    </span>
                    <div>
                      <p className="text-xs text-stone-500">
                        Dibuat: {formatDateTimeIndo(order.createdAt)}
                      </p>
                      <p className="font-bold text-stone-900 text-sm">
                        Penyewa: {order.customer.fullName} · {order.customer.phone}
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div>
                    {order.status === 'active_rented' && (
                      <span className="text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold font-heading">
                        AKTIF SEDANG DISEWA
                      </span>
                    )}
                    {order.status === 'pending_pickup' && (
                      <span className="text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold font-heading">
                        MENUNGGU AMBIL DI BASECAMP
                      </span>
                    )}
                    {order.status === 'returned' && (
                      <span className="text-stone-700 bg-stone-100 border border-stone-300 px-3 py-1 rounded-full text-xs font-bold font-heading">
                        SELESAI DIKEMBALIKAN
                      </span>
                    )}
                  </div>
                </div>

                {/* Return Schedule & Identity Guarantee Bar */}
                <div className="px-4 py-3 bg-[#f5f2e9] border-b border-[#e5dfd0] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-xs font-bold text-stone-500 uppercase block font-heading">BATAS WAKTU PENGEMBALIAN ALAT:</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-bold text-stone-900 text-sm">
                        {formatDateIndo(order.dateRange.endDate)} (Maks. 20:00 WIB)
                      </span>
                      {order.status === 'active_rented' && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          timeInfo.isOverdue ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {timeInfo.text}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-stone-500 uppercase block font-heading">STATUS IDENTITAS JAMINAN:</span>
                    <span className="font-semibold text-stone-800 text-xs sm:text-sm block mt-0.5">
                      {order.guaranteeStatus}
                    </span>
                  </div>
                </div>

                {/* Items Manifest */}
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2.5 border border-[#d8d5cb] rounded-xl bg-[#faf9f5] text-xs"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-14 h-14 rounded-lg object-cover bg-[#eeece6] shrink-0 border border-[#d8d5cb]"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-stone-900 truncate font-heading text-sm">{item.productName}</p>
                          <p className="text-xs text-stone-500">
                            {item.quantity} unit · {item.brand}
                          </p>
                          <p className="text-xs text-[#1b3d2f] font-bold">
                            {formatRupiah(item.subtotal)} ({order.dateRange.totalDays}h)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.customer.notes && (
                    <p className="text-xs text-stone-600 bg-[#faf9f5] p-2.5 border border-[#eeece6] rounded-xl">
                      <strong>Catatan Petualangan:</strong> {order.customer.notes}
                    </p>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="px-4 py-3.5 border-t border-[#eeece6] bg-[#faf9f5] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-stone-500 text-xs">Total Tagihan:</span>{' '}
                    <strong className="text-base text-stone-950 font-black font-heading">
                      {formatRupiah(order.totalAmount)}
                    </strong>
                    <span className="text-xs text-stone-500 ml-1.5">
                      ({order.paymentMethod.toUpperCase()} · {order.paymentStatus === 'paid' ? 'LUNAS' : 'BAYAR BASECAMP'})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-heading">
                    <button
                      type="button"
                      onClick={() => setActiveInvoiceOrder(order)}
                      className="px-3.5 py-2 rounded-xl border border-[#d8d5cb] bg-white hover:bg-stone-50 text-stone-800 font-semibold transition flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Nota Digital</span>
                    </button>

                    {order.status === 'active_rented' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleExtend(order.id)}
                          className="px-3.5 py-2 rounded-xl border border-[#1b3d2f] text-[#1b3d2f] hover:bg-[#1b3d2f] hover:text-white font-bold transition text-xs sm:text-sm cursor-pointer"
                        >
                          + Perpanjang 1 Hari
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReturnGear(order.id)}
                          className="px-4 py-2 rounded-xl bg-[#1b3d2f] hover:bg-[#142e23] text-white font-bold transition text-xs sm:text-sm cursor-pointer"
                        >
                          Kembalikan Alat & Ambil Jaminan
                        </button>
                      </>
                    )}

                    {order.status === 'pending_pickup' && (
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(order.id, 'active_rented')}
                        className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold transition text-xs sm:text-sm cursor-pointer"
                      >
                        Konfirmasi Barang Diambil
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Official Printable Invoice Modal */}
      {activeInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150 font-mono">
          <div className="relative w-full max-w-xl bg-white rounded-lg border border-[#333] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#233d31] bg-[#14261e] text-white shrink-0">
              <h3 className="font-bold text-xs uppercase tracking-wider">
                KWITANSI RESMI PENYEWAAN ALAT
              </h3>
              <button
                onClick={() => setActiveInvoiceOrder(null)}
                className="p-1 text-stone-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-900 bg-white">
              {/* Receipt Header */}
              <div className="flex justify-between border-b-2 border-stone-900 pb-3">
                <div>
                  <h2 className="text-base font-black tracking-tight uppercase">CAMP STYLE OUTDOOR DEPOT</h2>
                  <p className="text-[10px] text-stone-500">Stasiun Logistik Perlengkapan Gunung & Camping</p>
                  <p className="text-[10px] text-stone-500">Jl. Kaliurang Km 12.5, Sleman, D.I. Yogyakarta</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-stone-400 block">KODE RESERVASI</span>
                  <p className="text-sm font-black">{activeInvoiceOrder.id}</p>
                  <p className="text-[10px] text-stone-500">{formatDateTimeIndo(activeInvoiceOrder.createdAt)}</p>
                </div>
              </div>

              {/* Renter Details */}
              <div className="grid grid-cols-2 gap-3 bg-[#faf9f5] p-3 border border-[#d8d5cb] rounded text-[11px]">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block">DATA PENYEWA:</span>
                  <p className="font-bold">{activeInvoiceOrder.customer.fullName}</p>
                  <p>{activeInvoiceOrder.customer.phone}</p>
                  <p>Jaminan: {activeInvoiceOrder.customer.idType} ({activeInvoiceOrder.customer.idNumber})</p>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block">PERIODE PENYEWAAN:</span>
                  <p className="font-bold">
                    {formatDateIndo(activeInvoiceOrder.dateRange.startDate, false)} s/d {formatDateIndo(activeInvoiceOrder.dateRange.endDate, false)}
                  </p>
                  <p className="text-[#1b3d2f] font-bold">
                    {activeInvoiceOrder.dateRange.totalDays} Hari ({activeInvoiceOrder.dateRange.nightsCount} Malam)
                  </p>
                  <p className="text-[10px] text-stone-500">Maks. kembali jam 20:00 WIB</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-xs border border-[#d8d5cb]">
                <thead className="bg-[#eeece6] text-stone-700 font-bold border-b border-[#d8d5cb] text-[11px]">
                  <tr>
                    <th className="py-1.5 px-2.5">Item Alat</th>
                    <th className="py-1.5 px-2 text-center">Qty</th>
                    <th className="py-1.5 px-2 text-right">Tarif/Hari</th>
                    <th className="py-1.5 px-2.5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eeece6] text-[11px]">
                  {activeInvoiceOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-1.5 px-2.5 font-semibold">{it.productName}</td>
                      <td className="py-1.5 px-2 text-center">{it.quantity}</td>
                      <td className="py-1.5 px-2 text-right font-mono-num">{formatRupiah(it.pricePerDay)}</td>
                      <td className="py-1.5 px-2.5 text-right font-bold font-mono-num">{formatRupiah(it.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Subtotal */}
              <div className="space-y-1 text-right text-[11px] pt-1">
                <div className="flex justify-between">
                  <span>Logistik Pengantaran:</span>
                  <span>{activeInvoiceOrder.deliveryFee > 0 ? formatRupiah(activeInvoiceOrder.deliveryFee) : 'Rp 0'}</span>
                </div>
                {activeInvoiceOrder.cleaningServiceFee > 0 && (
                  <div className="flex justify-between">
                    <span>Layanan Cuci:</span>
                    <span>{formatRupiah(activeInvoiceOrder.cleaningServiceFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black pt-1 border-t border-stone-800">
                  <span>TOTAL TAGIHAN:</span>
                  <span className="font-mono-num">{formatRupiah(activeInvoiceOrder.totalAmount)}</span>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-4 border-t border-dashed border-stone-300 flex justify-between items-end text-[10px]">
                <div className="text-stone-500 max-w-xs">
                  <p>• Tanda terima resmi sewa alat Camp Style.</p>
                  <p>• Jaminan fisik dikembalikan setelah pemeriksaan kondisi barang.</p>
                </div>
                <div className="text-center">
                  <span className="text-stone-400 block mb-6">Pemeriksa Depot Basecamp</span>
                  <p className="font-bold border-t border-stone-800 px-4 pt-0.5">Camp Style Team</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-[#d8d5cb] bg-[#faf9f5] flex justify-between items-center shrink-0">
              <span className="text-[11px] text-stone-500">Status Pembayaran: LUNAS</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-stone-900 text-white rounded text-xs font-bold hover:bg-stone-800 transition flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Bukti Transaksi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
