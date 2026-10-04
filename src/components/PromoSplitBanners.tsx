import React from 'react';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

interface PromoSplitBannersProps {
  onOpenRules: () => void;
  onExploreCatalog: () => void;
}

export const PromoSplitBanners: React.FC<PromoSplitBannersProps> = ({
  onOpenRules,
  onExploreCatalog,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Left Banner: Student Deals (matching Back to School in NovaPhone) */}
      <div className="bg-gradient-to-r from-green-100/90 via-green-50 to-rose-50 border border-green-200/80 rounded-3xl p-6 sm:p-8 flex items-center justify-between gap-4 overflow-hidden relative group">
        <div className="space-y-3.5 z-10 max-w-[65%]">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-green-700 block font-mono">
            Promo Pendakian Mahasiswa
          </span>
          <h4 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight font-heading">
            Hemat Sewa Hingga <span className="text-green-700">35% OFF</span>
          </h4>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Cukup lampirkan foto KTM aktif saat booking untuk mendapatkan tarif sewa khusus mahasiswa.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={onExploreCatalog}
              className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Sewa Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Promo Gear Mockup */}
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <img
            src="/amba.png"
            alt="Nesting Cookset"
            className="w-36 h-36 object-cover rounded-2xl shadow-md border-2 border-white group-hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Right Banner: Extended Rental & Upgrade (matching Upgrade & Save in NovaPhone) */}
      <div className="bg-gradient-to-r from-green-100/90 via-green-50 to-green-50 border border-green-200/80 rounded-3xl p-6 sm:p-8 flex items-center justify-between gap-4 overflow-hidden relative group">
        <div className="space-y-3.5 z-10 max-w-[65%]">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-green-700 block font-mono">
            Fleksibilitas Pendakian
          </span>
          <h4 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight font-heading">
            Perpanjang Masa Sewa Kapan Saja
          </h4>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Cuaca puncak berkabut? Cukup tekan tombol perpanjang di dashboard untuk menambah hari sewa tanpa repot.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenRules}
              className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Pelajari Prosedur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swap / Extension Mockup with Arrows */}
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-2xl bg-white p-3 shadow-md border border-green-200 flex flex-col items-center justify-center text-center">
            <RefreshCw className="w-10 h-10 text-green-600 mb-1.5" />
            <span className="text-xs font-bold text-green-800 leading-tight">
              +1 Hari Ekstra <br />
              <strong className="text-green-700">Otomatis</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
