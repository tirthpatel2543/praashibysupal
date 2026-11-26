import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { IMAGE_PATHS } from '@/config/images';
import type { JewelleryCategory } from '@/types';
import { Check, Edit2, Layers } from 'lucide-react';

interface CategoryData {
  name: JewelleryCategory;
  classification: 'Fine Gold' | 'Solitaire Diamonds' | 'Artisanal Daily' | 'Fashion / Artificial';
  image: string;
  itemCount: number;
  featured: boolean;
}

export const CategoriesModule: React.FC = () => {
  const { products } = useStore();

  const [categories, setCategories] = useState<CategoryData[]>([
    { name: 'All Jewellery', classification: 'Fine Gold', image: IMAGE_PATHS.categories.all, itemCount: products.length, featured: true },
    { name: 'Gold', classification: 'Fine Gold', image: IMAGE_PATHS.categories.gold, itemCount: products.filter(p => p.metalType === 'Gold').length, featured: true },
    { name: 'Diamond', classification: 'Solitaire Diamonds', image: IMAGE_PATHS.categories.diamond, itemCount: products.filter(p => p.metalType === 'Diamond').length, featured: true },
    { name: 'Earrings', classification: 'Fine Gold', image: IMAGE_PATHS.categories.earrings, itemCount: products.filter(p => p.category === 'Earrings').length, featured: true },
    { name: 'Daily Wear', classification: 'Artisanal Daily', image: IMAGE_PATHS.categories.dailyWear, itemCount: products.filter(p => p.category === 'Daily Wear').length, featured: true },
    { name: 'Necklaces', classification: 'Fine Gold', image: IMAGE_PATHS.categories.necklaces, itemCount: products.filter(p => p.category === 'Necklaces').length, featured: true },
    { name: 'Rings', classification: 'Solitaire Diamonds', image: IMAGE_PATHS.categories.rings, itemCount: products.filter(p => p.category === 'Rings').length, featured: true },
    { name: 'Bracelets', classification: 'Solitaire Diamonds', image: IMAGE_PATHS.categories.bracelets, itemCount: products.filter(p => p.category === 'Bracelets').length, featured: true },
    { name: 'Bangles', classification: 'Fine Gold', image: IMAGE_PATHS.categories.bangles, itemCount: products.filter(p => p.category === 'Bangles').length, featured: true },
  ]);

  const toggleFeatured = (idx: number) => {
    setCategories((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, featured: !c.featured } : c))
    );
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
          Jewellery Categories Management
        </h2>
        <p className="text-xs text-[#806F72] mt-0.5 font-light">
          Manage the 9 core category navigation channels and classify between Pure Gold, Solitaires, and Artificial / Fashion lines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.name}
            className="p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-[#FAF6F2] border border-[#EDE1D6] text-[10px] uppercase font-semibold text-[#9B4F52]">
                  {cat.classification}
                </span>
                <span className="font-mono text-xs text-[#806F72]">{cat.itemCount} Items</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#ECE0D3] shrink-0">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.name}
                    fallbackTitle={cat.name}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-medium text-lg text-[#4A252B]">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#806F72] font-mono mt-0.5 truncate max-w-[180px]">
                    {cat.image}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE1D6] flex items-center justify-between text-xs">
              <span className="text-[#806F72]">Storefront Visibility</span>
              <button
                onClick={() => toggleFeatured(idx)}
                className={`px-3 py-1 rounded-full font-semibold text-[10px] uppercase transition-colors ${
                  cat.featured ? 'bg-[#EAF3EA] text-[#426E49]' : 'bg-[#FAF0E6] text-[#9A5D3F]'
                }`}
              >
                {cat.featured ? 'Active in Header' : 'Hidden'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
