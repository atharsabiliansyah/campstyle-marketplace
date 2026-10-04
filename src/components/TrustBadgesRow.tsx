import React from 'react';
import { Truck, ShieldCheck, Headphones, RotateCcw } from 'lucide-react';

export const TrustBadgesRow: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-stone-200">
      <div className="flex items-center gap-3.5">
        <div className="p-3 rounded-2xl bg-stone-100 text-stone-800">
          <Truck className="w-6 h-6" />
        </div>
        <div>
          <h5 className="font-bold text-sm sm:text-base text-stone-900 leading-tight">Pengantaran Mudah</h5>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">Antar Basecamp / Lokasi</p>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="p-3 rounded-2xl bg-stone-100 text-stone-800">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h5 className="font-bold text-sm sm:text-base text-stone-900 leading-tight">Jaminan KTP Aman</h5>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">Brankas khusus basecamp</p>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="p-3 rounded-2xl bg-stone-100 text-stone-800">
          <Headphones className="w-6 h-6" />
        </div>
        <div>
          <h5 className="font-bold text-sm sm:text-base text-stone-900 leading-tight">Bantuan Kru 24/7</h5>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">Konsultasi rute & alat sewa</p>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="p-3 rounded-2xl bg-stone-100 text-stone-800">
          <RotateCcw className="w-6 h-6" />
        </div>
        <div>
          <h5 className="font-bold text-sm sm:text-base text-stone-900 leading-tight">Pengembalian Fleksibel</h5>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">Batas jam s/d 20:00 WIB</p>
        </div>
      </div>
    </div>
  );
};
