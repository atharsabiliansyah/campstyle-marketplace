import React from 'react';
import { 
  Tent, 
  Search, 
  User, 
  ShoppingBag, 
  Flame, 
  Calendar,
  ClipboardList,
  ShieldCheck,
  Store
} from 'lucide-react';
import { RentalDateRange, ProductCategory } from '../types';
import { formatDateIndo } from '../utils/formatters';

interface NavbarProps {
  currentView: 'catalog' | 'tracking';
  onNavigate: (view: 'catalog' | 'tracking') => void;
  rentalDateRange: RentalDateRange;
  onOpenDatePicker: () => void;
  onOpenRules: () => void;
  onOpenCart: () => void;
  onOpenMitraModal: () => void;
  cartCount: number;
  activeRentalsCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  rentalDateRange,
  onOpenDatePicker,
  onOpenRules,
  onOpenCart,
  onOpenMitraModal,
  cartCount,
  activeRentalsCount,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs w-full">
      {/* Top Navbar Row */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none group"
          >
            <div className="w-17 h-17 rounded-xl overflow-hidden flex items-center justify-center bg-emerald-50">
            <img src="public/Camp.png" alt="CampStyle Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-2xl tracking-tight text-stone-950 font-heading">
                  Camp<span className="text-emerald-600">Style</span>
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium -mt-0.5 hidden sm:block">
                Smarter Gear, Better Adventure.
              </p>
            </div>
          </div>

          {/* Center Search Bar (like NovaPhone) */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari peralatan apa hari ini..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-stone-50 hover:bg-stone-100/70 focus:bg-white border border-stone-300 rounded-full py-2.5 pl-5 pr-11 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
              />
              <button 
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Controls: Account & Cart (like NovaPhone) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mitra Rental (Marketplace Button) */}
            <button
              type="button"
              onClick={onOpenMitraModal}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-300 hover:border-emerald-600 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 text-xs font-bold transition font-heading cursor-pointer shadow-2xs"
              title="Daftar Jadi Mitra Rental & Sewakan Alat Camping"
            >
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sewakan Alat</span>
            </button>

            {/* Account / Rental Tracking Button */}
            <button
              type="button"
              onClick={() => onNavigate(currentView === 'tracking' ? 'catalog' : 'tracking')}
              className="flex items-center gap-2.5 text-sm font-semibold text-stone-700 hover:text-emerald-700 transition px-2.5 py-1.5 rounded-xl hover:bg-stone-100"
            >
              <User className="w-5 h-5 text-stone-600" />
              <div className="text-left hidden sm:block">
                <span className="block leading-tight font-medium">Pesanan Saya</span>
                {activeRentalsCount > 0 && (
                  <span className="text-xs text-emerald-600 font-bold">
                    {activeRentalsCount} Aktif Disewa
                  </span>
                )}
              </div>
            </button>

            {/* Cart with Blue Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 text-stone-700 hover:text-emerald-700 hover:bg-stone-100 rounded-xl transition flex items-center justify-center"
              title="Keranjang Sewa"
            >
              <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari alat camping..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-full py-2 pl-4 pr-9 text-sm text-stone-900 focus:outline-none focus:border-emerald-600"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          </div>
        </div>
      </div>

      {/* Bottom Sub-Navigation Bar (like NovaPhone) */}
      <div className="border-t border-stone-100 bg-white w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex items-center justify-between h-12 text-sm">
            {/* Category Navigation Links */}
            <nav className="flex items-center gap-2 sm:gap-7 overflow-x-auto scrollbar-none py-1">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('all');
                  onNavigate('catalog');
                }}
                className={`font-semibold transition pb-1 border-b-2 whitespace-nowrap px-1 text-sm ${
                  selectedCategory === 'all' && currentView === 'catalog'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Semua Alat
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('tenda');
                  onNavigate('catalog');
                }}
                className={`font-semibold transition pb-1 border-b-2 whitespace-nowrap px-1 text-sm ${
                  selectedCategory === 'tenda' && currentView === 'catalog'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Tenda Camping
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('alat-masak');
                  onNavigate('catalog');
                }}
                className={`font-semibold transition pb-1 border-b-2 whitespace-nowrap px-1 text-sm ${
                  selectedCategory === 'alat-masak' && currentView === 'catalog'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Nesting & Alat Masak
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('sleeping-gear');
                  onNavigate('catalog');
                }}
                className={`font-semibold transition pb-1 border-b-2 whitespace-nowrap px-1 text-sm ${
                  selectedCategory === 'sleeping-gear' && currentView === 'catalog'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Sleeping Bag & Matras
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('penerangan');
                  onNavigate('catalog');
                }}
                className={`font-semibold transition pb-1 border-b-2 whitespace-nowrap px-1 text-sm ${
                  selectedCategory === 'penerangan' && currentView === 'catalog'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Penerangan
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('carrier-logistik');
                  onNavigate('catalog');
                }}
                className={`font-semibold transition pb-1 border-b-2 whitespace-nowrap px-1 text-sm ${
                  selectedCategory === 'carrier-logistik' && currentView === 'catalog'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Carrier
              </button>
              <button
                type="button"
                onClick={onOpenRules}
                className="font-semibold text-stone-500 hover:text-stone-900 transition whitespace-nowrap px-1 text-sm"
              >
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
