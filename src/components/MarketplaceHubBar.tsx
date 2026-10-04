import React from 'react';
import { 
  Store, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { MOCK_VENDORS } from '../data/mockProducts';

interface MarketplaceHubBarProps {
  selectedVendorFilter: string;
  onSelectVendorFilter: (vendorId: string) => void;
  onOpenMitraModal: () => void;
  onOpenRules: () => void;
}

export const MarketplaceHubBar: React.FC<MarketplaceHubBarProps> = ({
  selectedVendorFilter,
  onSelectVendorFilter,
  onOpenMitraModal,
  onOpenRules,
}) => {
  const hubs = [
    { id: 'all', name: 'Semua Mitra & Hub', location: 'Seluruh Indonesia', isOfficial: false },
    { id: 'kaliurang', name: 'CampStyle Official Hub', location: '📍 Sleman / Merapi', isOfficial: true },
    { id: 'merbabu', name: 'Merbabu Outdoor Hub', location: '📍 Boyolali / Selo', isOfficial: false },
    { id: 'dieng', name: 'Dieng Highland Gear', location: '📍 Wonosobo / Prau', isOfficial: false },
    { id: 'lawu', name: 'Lawu Station Adventure', location: '📍 Karanganyar / Cetho', isOfficial: false },
  ];

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 sm:p-6 space-y-4">
      {/* Top Marketplace Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-stone-900 text-base sm:text-lg font-heading">
                Marketplace Basecamp & Mitra Rental
              </h3>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Sewa langsung dari basecamp terdekat titik pendakian atau hub resmi CampStyle
            </p>
          </div>
        </div>

        {/* CTA Buka Toko */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenMitraModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-600 text-emerald-700 text-xs font-bold transition shadow-2xs font-heading cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>Buka Toko Rental Kamu</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs / Location Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {hubs.map((hub) => {
          const isSelected = selectedVendorFilter === hub.id;
          return (
            <button
              key={hub.id}
              type="button"
              onClick={() => onSelectVendorFilter(hub.id)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-2xs ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-stone-900/10'
                  : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300 hover:text-stone-950'
              }`}
            >
              <span>{hub.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected
                    ? 'bg-stone-800 text-emerald-300'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {hub.location}
              </span>
            </button>
          );
        })}
      </div>

      {/* Marketplace Guarantees Ticker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-200/80">
          <span className="text-stone-700 font-semibold truncate">Garansi KTP Brankas</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-200/80">
          
          <span className="text-stone-700 font-semibold truncate">Antar ke Basecamp</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-200/80">
          
          <span className="text-stone-700 font-semibold truncate">Siap Pakai & Bersih QC</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-200/80">
          <span className="text-stone-700 font-semibold truncate">Pilihan Komplit 100+ Alat</span>
        </div>
      </div>
    </div>
  );
};
