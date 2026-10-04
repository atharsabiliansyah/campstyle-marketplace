import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface CompareAndWhySectionProps {
  onOpenRules: () => void;
  onExploreTents: () => void;
}

export const CompareAndWhySection: React.FC<CompareAndWhySectionProps> = ({
  onOpenRules,
  onExploreTents,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Left Card: Compare Tents */}
      <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative group">
        <div className="space-y-3.5 flex-1 z-10">
          <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight font-heading">
            Bandingkan Tenda & Kapasitas
          </h3>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-sm">
            Pilih tenda 2P ultralight untuk solo/duo, 4P double layer untuk tim, atau 6-8P kabin glamping untuk keluarga.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={onExploreTents}
              className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Lihat Rekomendasi Tenda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tents Mockup Imagery */}
        <div className="relative w-44 h-36 shrink-0 flex items-center justify-center">
          <img
            src="public/tenda1.png"
            alt="Tenda 2P"
            className="w-28 h-28 object-cover rounded-2xl shadow-lg border-2 border-white absolute -left-2 top-2 transform -rotate-6 group-hover:-rotate-3 transition-transform"
          />
          <img
            src="public/tenda2.png"
            alt="Tenda 4P"
            className="w-32 h-32 object-cover rounded-2xl shadow-xl border-2 border-white absolute right-0 bottom-0 transform rotate-6 group-hover:rotate-3 transition-transform"
          />
        </div>
      </div>

      {/* Right Card: Why Camp Style? (Matching NovaPhone's Why NovaPhone?) */}
      <div className="bg-gradient-to-br from-emerald-50/60 to-teal-50/40 border border-emerald-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="space-y-3.5 flex-1 z-10">
          <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight font-heading">
            Kenapa Sewa di Camp Style?
          </h3>
          <ul className="space-y-2.5 text-sm sm:text-base font-semibold text-stone-700">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Tenda & SB Dicuci Steril Laundry Bersih</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Jaminan KTP / KTM Aman di Brankas</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Gratis Cek Kelengkapan Pasak & Frame</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Bisa Diantar ke Pos Pendakian Merbabu/Merapi</span>
            </li>
          </ul>

          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenRules}
              className="text-sm font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
            >
              Baca Selengkapnya Syarat Sewa
            </button>
          </div>
        </div>

        {/* Shield Guarantee Visual (like the green shield in NovaPhone) */}
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-3xl bg-emerald-600 text-white shadow-xl flex flex-col items-center justify-center text-center p-3 border-4 border-white transform rotate-3">
            <ShieldCheck className="w-12 h-12 mb-1" />
            <span className="text-xs font-black uppercase tracking-wider leading-tight">
              100% TERAWAT & AMAN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
