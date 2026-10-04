import React from 'react';
import { Search } from 'lucide-react';
import { ProductCategory, AvailabilityStatus } from '../types';

interface ProductFilterBarProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedCapacity: number | 'all';
  onSelectCapacity: (cap: number | 'all') => void;
  availabilityFilter: AvailabilityStatus | 'all';
  onSelectAvailability: (status: AvailabilityStatus | 'all') => void;
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'rating';
  onSelectSort: (sort: 'popular' | 'price_asc' | 'price_desc' | 'rating') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalProductsCount: number;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'SEMUA ALAT' },
  { id: 'tenda', label: 'TENDA CAMPING' },
  { id: 'alat-masak', label: 'NESTING & KOMPOR' },
  { id: 'sleeping-gear', label: 'BEDDING & SLEEPING BAG' },
  { id: 'penerangan', label: 'LENTERA & HEADLAMP' },
  { id: 'carrier-logistik', label: 'CARRIER & FLYSHEET' },
  { id: 'furnitur-outdoor', label: 'KURSI & MEJA LIPAT' },
];

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedCapacity,
  onSelectCapacity,
  availabilityFilter,
  onSelectAvailability,
  sortBy,
  onSelectSort,
  searchQuery,
  onSearchChange,
  totalProductsCount,
}) => {
  return (
    <div className="space-y-3 bg-white p-4 border border-[#d8d5cb] rounded-lg">
      {/* Top Row: Search & Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Cari alat (misal: tenda 4p, nesting, kompor, lentera...)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#faf9f5] border border-[#d8d5cb] rounded text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1b3d2f] font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-stone-400 hover:text-stone-900"
            >
              RESET
            </button>
          )}
        </div>

        {/* Count & Sort */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-stone-500 hidden sm:inline">
            TERSEDIA: <strong className="text-stone-900">{totalProductsCount} ITEM</strong>
          </span>

          <div className="flex items-center gap-2 border border-[#d8d5cb] px-2.5 py-1.5 rounded bg-[#faf9f5]">
            <span className="text-stone-500 uppercase text-[10px]">URUTKAN:</span>
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value as any)}
              className="bg-transparent font-bold text-stone-800 text-xs focus:outline-none cursor-pointer"
            >
              <option value="popular">Paling Populer</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price_asc">Tarif Termurah</option>
              <option value="price_desc">Tarif Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories Tabs - Clean segmented bar, zero pill enclosures */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-t border-[#eeece6] pt-3 scrollbar-none font-mono text-xs">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold tracking-wide whitespace-nowrap transition ${
                isSelected
                  ? 'bg-[#1b3d2f] text-white'
                  : 'bg-transparent text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Row: Capacity & Availability - Clean technical segments */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#eeece6] text-xs font-mono">
        {/* Availability */}
        <div className="flex items-center gap-2">
          <span className="text-stone-500 text-[10px] uppercase">STATUS BASECAMP:</span>
          <div className="inline-flex border border-[#d8d5cb] rounded overflow-hidden">
            <button
              type="button"
              onClick={() => onSelectAvailability('all')}
              className={`px-2.5 py-1 text-[11px] transition ${
                availabilityFilter === 'all'
                  ? 'bg-stone-900 text-white font-bold'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              SEMUA
            </button>
            <button
              type="button"
              onClick={() => onSelectAvailability('ready')}
              className={`px-2.5 py-1 text-[11px] border-l border-[#d8d5cb] transition ${
                availabilityFilter === 'ready'
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              READY SAJA
            </button>
            <button
              type="button"
              onClick={() => onSelectAvailability('rented')}
              className={`px-2.5 py-1 text-[11px] border-l border-[#d8d5cb] transition ${
                availabilityFilter === 'rented'
                  ? 'bg-stone-800 text-white font-bold'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              ○ SEDANG DISEWA
            </button>
          </div>
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-2">
          <span className="text-stone-500 text-[10px] uppercase">KAPASITAS TENDA:</span>
          <div className="inline-flex border border-[#d8d5cb] rounded overflow-hidden">
            {[
              { val: 'all' as const, label: 'SEMUA' },
              { val: 2, label: '2P' },
              { val: 4, label: '4P' },
              { val: 6, label: '6P+' },
            ].map((cap, i) => (
              <button
                key={cap.label}
                type="button"
                onClick={() => onSelectCapacity(cap.val)}
                className={`px-2.5 py-1 text-[11px] transition ${i > 0 ? 'border-l border-[#d8d5cb]' : ''} ${
                  selectedCapacity === cap.val
                    ? 'bg-[#1b3d2f] text-white font-bold'
                    : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cap.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
