import React from 'react';
import { Store, ShieldCheck, ArrowRight, Banknote, Sparkles, UserCheck } from 'lucide-react';

interface MarketplaceSellerBannerProps {
  onOpenMitraModal: () => void;
}

export const MarketplaceSellerBanner: React.FC<MarketplaceSellerBannerProps> = ({
  onOpenMitraModal,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12241d] via-[#1b3d2f] to-[#0f1d17] border border-emerald-900/50 text-white p-6 sm:p-8 lg:p-10 shadow-lg font-inter">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-8 space-y-4">

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight leading-tight">
            Punya Alat Camping Nganggur? <br />
            <span className="text-emerald-400">Jadikan Passive Income di Marketplace Kami</span>
          </h3>

          <p className="text-sm sm:text-base text-stone-200 max-w-2xl leading-relaxed">
            Gabung bersama 5+ mitra basecamp & persewaan outdoor di seluruh Indonesia. Tenda, nesting, dan carrier Anda disewakan ke pendaki terverifikasi dengan jaminan identitas KTP brankas dan asuransi kerusakan penuh.
          </p>

          {/* Quick value badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/10">
              <span className="font-semibold text-stone-200">Jaminan KTP Asli Fisik</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/10">
              <span className="font-semibold text-stone-200">Pencairan Otomatis Tiap Minggu</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/10">
              <span className="font-semibold text-stone-200">Penyewa Terverifikasi Sistem</span>
            </div>
          </div>
        </div>

        {/* Right CTA Box */}
        <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-stone-950 flex items-center justify-center mx-auto shadow-md">
            <Store className="w-6 h-6 stroke-[2.3]" />
          </div>

          <div>
            <h4 className="font-black text-lg font-heading text-white">
              Mulai Buka Toko Rental
            </h4>
            <p className="text-xs text-stone-300 mt-1">
              Gratis pendaftaran · Tanpa biaya langganan bulanan
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenMitraModal}
            className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 font-heading cursor-pointer"
          >
            <span>Daftar Jadi Mitra Sekarang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
