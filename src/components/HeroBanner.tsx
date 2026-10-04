import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Droplets, 
  Layers, 
  Sparkles,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { RentalDateRange, Product } from '../types';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

interface HeroBannerProps {
  rentalDateRange: RentalDateRange;
  onOpenDatePicker: () => void;
  onExploreCatalog: () => void;
  onSewaHeroProduct: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  rentalDateRange,
  onOpenDatePicker,
  onExploreCatalog,
  onSewaHeroProduct,
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d1f18] via-[#132c22] to-[#1e3f32] text-white shadow-lg border border-emerald-950">
      {/* Background Mountain Photo with Subtle Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('public/merbabu.png')`,
        }}
      />

      <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Copy & Features */}
        <div className="lg:col-span-7 space-y-7">
          <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white font-heading">
            Jelajahi Alam Bebas <br className="hidden sm:inline" />
            <span className="text-emerald-400">Tanpa Ribet?</span> Ya di Camp Style aja!
          </h1>
        </div>

          {/* Action Button & Date Indicator */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={onSewaHeroProduct}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-stone-100 text-stone-950 font-bold text-sm sm:text-base shadow-md transition flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Sewa Sekarang</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Rental Date Status */}
            <button
              type="button"
              onClick={onOpenDatePicker}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/35 hover:bg-black/50 border border-white/20 text-xs sm:text-sm text-stone-200 transition backdrop-blur-xs"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>
                {formatDateIndo(rentalDateRange.startDate, false)} - {formatDateIndo(rentalDateRange.endDate, false)}
              </span>
            </button>
          </div>

          {/* Bottom 3 Feature Spec Badges (Exactly like NovaPhone bottom camera/chip/battery icons) */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-5 border-t border-white/10 text-stone-300">
            <div className="flex items-center gap-3">
              
             
            </div>
          </div>
        </div>

        {/* Center / Right Hero Gear Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Main Hero Tent Cutout Photo */}
          <div className="relative z-10 w-full max-w-md lg:max-w-xl mx-auto aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img
              src="public/tenda1.png"
              alt="Naturehike Cloud Peak 4P Tent"
              className="w-full h-full object-cover"
            /></div>

          {/* Right Floating "Beyond Ordinary" script text (like NovaPhone) */}
          <div className="hidden 2xl:block absolute -right-2 top-1/2 -translate-y-1/2 pointer-events-none select-none text-right">
            <span 
              className="font-serif italic text-4xl lg:text-5xl text-white/30 block transform -rotate-12"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Beyond <br />
              <span className="text-white/50">Ordinary</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
