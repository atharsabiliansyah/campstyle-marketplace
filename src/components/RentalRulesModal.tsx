import React from 'react';
import { ShieldAlert, FileText, AlertTriangle, Clock, Check, X } from 'lucide-react';

interface RentalRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RentalRulesModal: React.FC<RentalRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150 font-inter">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#333] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#233d31] bg-[#14261e] text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm uppercase tracking-wider font-heading">
              PROSEDUR JAMINAN IDENTITAS & ATURAN SEWA
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Main Guarantee Highlight */}
          <div className="p-4 bg-[#f5f2e9] border border-[#d5cfbe] rounded-xl space-y-2">
            <span className="font-bold text-amber-950 uppercase text-xs block font-heading">
              1. KETENTUAN PENITIPAN KARTU IDENTITAS FISIK ASLI (WAJIB)
            </span>
            <p className="text-stone-800 text-xs sm:text-sm leading-relaxed">
              Penyewa wajib menitipkan <strong>1 kartu identitas fisik asli yang masih berlaku (KTP / KTM Mahasiswa / SIM)</strong> atas nama penanggung jawab pemesanan pada saat serah-terima alat di basecamp. Kartu disimpan di brankas terenkripsi basecamp dan diserahkan kembali seketika saat seluruh peralatan kembali lengkap tanpa kerusakan fatal.
            </p>
          </div>

          {/* Standard Operational Procedures */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-stone-600 block font-heading">
              STANDAR OPERASIONAL PROSEDUR PENGEMBALIAN:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#faf9f5] border border-[#d8d5cb] rounded-xl space-y-1">
                <span className="font-bold text-stone-900 block text-xs sm:text-sm font-heading">Waktu Serah Terima</span>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Pengambilan alat mulai pukul 08:30 WIB pada hari pertama. Batas pengembalian adalah pukul 20:00 WIB pada tanggal selesai.
                </p>
              </div>

              <div className="p-3.5 bg-[#faf9f5] border border-[#d8d5cb] rounded-xl space-y-1">
                <span className="font-bold text-stone-900 block text-xs sm:text-sm font-heading">Denda Keterlambatan</span>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Keterlambatan tanpa konfirmasi dikenakan denda sesuai tarif sewa normal harian per 24 jam keterlambatan.
                </p>
              </div>

              <div className="p-3.5 bg-[#faf9f5] border border-[#d8d5cb] rounded-xl space-y-1">
                <span className="font-bold text-stone-900 block text-xs sm:text-sm font-heading">Kondisi Pengembalian</span>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Peralatan wajib dikembalikan lengkap dan bebas sampah. Jangan melipat tenda basah kuyup dalam waktu lama tanpa konfirmasi kru basecamp.
                </p>
              </div>

              <div className="p-3.5 bg-[#faf9f5] border border-[#d8d5cb] rounded-xl space-y-1">
                <span className="font-bold text-stone-900 block text-xs sm:text-sm font-heading">Kerusakan & Kehilangan</span>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Kerusakan akibat kelalaian (robek terbakar bara api, frame bengkok karena paksaan) wajib diganti sesuai harga servis pabrikan resmi.
                </p>
              </div>
            </div>
          </div>

          {/* Basecamp Location */}
          <div className="p-4 bg-[#14261e] text-white rounded-xl text-xs flex justify-between items-center">
            <div>
              <p className="font-bold uppercase tracking-wider text-emerald-400 font-heading">DEPOT LOGISTIK KALIURANG</p>
              <p className="text-stone-300">Jl. Kaliurang Km 12.5 No. 48, Sleman, D.I. Yogyakarta</p>
              <p className="text-stone-400 text-xs mt-0.5">Hotline WhatsApp: 0812-9988-7711</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#d8d5cb] bg-[#faf9f5] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1b3d2f] hover:bg-[#142e23] text-white text-xs font-bold rounded-xl transition font-heading cursor-pointer"
          >
            SAYA MENGERTI KETENTUAN
          </button>
        </div>
      </div>
    </div>
  );
};
