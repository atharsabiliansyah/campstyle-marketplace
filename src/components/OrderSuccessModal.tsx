import React from 'react';
import { Check, QrCode, ArrowRight } from 'lucide-react';
import { RentalOrder } from '../types';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

interface OrderSuccessModalProps {
  order: RentalOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onGoToTracking: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
  onGoToTracking,
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150 font-inter">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#333] shadow-2xl overflow-hidden p-6 sm:p-7 space-y-4 text-center">
        {/* Verification Mark */}
        <div className="w-14 h-14 rounded-2xl bg-[#1b3d2f] text-white mx-auto flex items-center justify-center shadow-md">
          <Check className="w-7 h-7 stroke-[3]" />
        </div>

        <div>
          <span className="text-xs uppercase font-bold text-stone-500 block font-heading">
            TRANSAKSI RESERVASI SEWA BERHASIL
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 uppercase font-heading mt-1">
            Peralatan Telah Direservasi
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Tunjukkan kode voucher di bawah saat serah-terima alat di Basecamp Camp Style.
          </p>
        </div>

        {/* Dispatch Voucher */}
        <div className="bg-[#faf9f5] border border-[#d8d5cb] rounded-xl p-4 sm:p-5 text-left space-y-3.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#d8d5cb]">
            <div>
              <span className="text-xs uppercase text-stone-500 font-bold block font-heading">KODE BOOKING SEWA</span>
              <p className="text-lg font-black text-stone-900 tracking-wider font-heading">{order.id}</p>
            </div>
            <div className="p-2 bg-white border border-[#d8d5cb] rounded-lg">
              <QrCode className="w-8 h-8 text-stone-800" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-stone-500 text-xs block font-medium">Penyewa:</span>
              <p className="font-bold text-stone-900">{order.customer.fullName}</p>
            </div>
            <div>
              <span className="text-stone-500 text-xs block font-medium">Total Tagihan:</span>
              <p className="font-bold text-[#1b3d2f] font-heading">{formatRupiah(order.totalAmount)}</p>
            </div>
            <div>
              <span className="text-stone-500 text-xs block font-medium">Mulai Sewa:</span>
              <p className="font-semibold text-stone-800">{formatDateIndo(order.dateRange.startDate, false)}</p>
            </div>
            <div>
              <span className="text-stone-500 text-xs block font-medium">Batas Kembali:</span>
              <p className="font-semibold text-stone-800">{formatDateIndo(order.dateRange.endDate, false)}</p>
            </div>
          </div>

          <div className="p-3 bg-[#f5f2e9] border border-[#d5cfbe] rounded-lg text-xs text-stone-800 leading-tight">
            * Jangan lupa membawa <strong>1 kartu identitas fisik asli ({order.customer.idType})</strong> saat serah-terima di basecamp.
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-1 font-heading">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-[#d8d5cb] text-stone-700 text-xs sm:text-sm font-bold hover:bg-stone-50 transition cursor-pointer"
          >
            Katalog Alat
          </button>
          <button
            type="button"
            onClick={onGoToTracking}
            className="w-full py-2.5 rounded-xl bg-[#1b3d2f] hover:bg-[#142e23] text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Tracking Sewa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
