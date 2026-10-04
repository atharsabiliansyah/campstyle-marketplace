import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryIconRowProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

interface CategoryItem {
  id: ProductCategory;
  label: string;
  imageUrl?: string;
  isGrid?: boolean;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: 'tenda',
    label: 'Tenda',
    imageUrl: '/tenda.eiger.png',
  },
  {
    id: 'tenda',
    label: 'Tenda Keluarga',
    imageUrl: '/tenda.keluarga.png',
  },
  {
    id: 'alat-masak',
    label: 'Alat Masak',
    imageUrl: '/alat.masak.png',
  },
  {
    id: 'sleeping-gear',
    label: 'Sleeping Bag',
    imageUrl: '/sleping.png',
  },
  {
    id: 'penerangan',
    label: 'Lampu Tenda',
    imageUrl: '/lentera.png',
  },
  {
    id: 'carrier-logistik',
    label: 'Carrier',
    imageUrl: '/carrier.png',
  },
  {
    id: 'all',
    label: 'Semua Alat',
    isGrid: true,
  },
];

export const CategoryIconRow: React.FC<CategoryIconRowProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-6 py-2">
        {CATEGORY_ITEMS.map((item, index) => {
          const isSelected = selectedCategory === item.id;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectCategory(item.id)}
              className="flex flex-col items-center gap-2 group text-center cursor-pointer w-full transition-all"
            >
              {/* Square Rounded Card Image */}
              <div
                className={`w-full max-w-[160px] aspect-square rounded-2xl p-2 border transition-all duration-200 flex items-center justify-center overflow-hidden bg-white shadow-xs ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md scale-105'
                    : 'border-stone-200 hover:border-stone-400 hover:shadow-md'
                }`}
              >
                {item.isGrid ? (
                  <div className="w-full h-full rounded-xl bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-stone-200 transition">
                    <LayoutGrid className="w-10 h-10 stroke-[2]" />
                  </div>
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.label}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=300&q=80';
                    }}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform"
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-sm sm:text-base font-semibold leading-tight transition ${
                  isSelected ? 'text-emerald-700 font-bold' : 'text-stone-800 group-hover:text-stone-950 font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
