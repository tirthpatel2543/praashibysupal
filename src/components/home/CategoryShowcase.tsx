import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { IMAGE_PATHS } from '@/config/images';
import type { JewelleryCategory } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryTile {
  name: JewelleryCategory;
  title: string;
  piecesCount: string;
  image: string;
  description: string;
}

const CATEGORY_TILES: CategoryTile[] = [
  {
    name: 'Gold',
    title: 'Artisanal Gold',
    piecesCount: '48 Designs',
    image: IMAGE_PATHS.categories.gold,
    description: 'Pure 22K handcrafted heirlooms and hallmarked daily treasures.',
  },
  {
    name: 'Diamond',
    title: 'Certified Solitaires',
    piecesCount: '36 Designs',
    image: IMAGE_PATHS.categories.diamond,
    description: 'Dazzling solitaires and diamond suites crafted with ethical brilliance.',
  },
  {
    name: 'Earrings',
    title: 'Chandelier & Drops',
    piecesCount: '52 Designs',
    image: IMAGE_PATHS.categories.earrings,
    description: 'From dainty hoops to regal polki jhumkas designed to frame your grace.',
  },
  {
    name: 'Necklaces',
    title: 'Chokers & Sets',
    piecesCount: '28 Designs',
    image: IMAGE_PATHS.categories.necklaces,
    description: 'Intricately articulated collar necklaces sculpted for grand entrances.',
  },
  {
    name: 'Rings',
    title: 'Bands & Cocktails',
    piecesCount: '34 Designs',
    image: IMAGE_PATHS.categories.rings,
    description: 'Signet rings, solitaire eternity bands, and expressive cocktail jewels.',
  },
  {
    name: 'Bangles',
    title: 'Kadas & Bangles',
    piecesCount: '24 Designs',
    image: IMAGE_PATHS.categories.bangles,
    description: 'Intricate jaali filigree openwork and timeless antique kadas.',
  },
];

export const CategoryShowcase: React.FC = () => {
  const { setActiveCategory } = useStore();

  const handleCategoryClick = (cat: JewelleryCategory) => {
    setActiveCategory(cat);
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-10 bg-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3">
            Atelier Curations
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#4A252B] tracking-[-0.02em] font-normal">
            Shop by <em>Category</em>
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto my-4" />
          <p className="font-sans text-xs sm:text-sm text-[#806F72] leading-relaxed font-light">
            Each silhouette is conceived slowly, honouring timeless techniques of Indian goldsmithing alongside contemporary European poise.
          </p>
        </div>

        {/* Visual Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {CATEGORY_TILES.map((tile) => (
            <button
              key={tile.name}
              onClick={() => handleCategoryClick(tile.name)}
              className="group text-left flex flex-col rounded-xl overflow-hidden bg-[#FAF6F2] border border-[#EFE5DC] hover:border-[#C5A059] hover:shadow-lg transition-all duration-500 focus:outline-none"
            >
              {/* Category Image Tile */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE0D3]">
                <ImageWithFallback
                  src={tile.image}
                  alt={tile.title}
                  fallbackTitle={tile.title}
                  fallbackCategory={tile.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#4A252B] group-hover:bg-[#9B4F52] group-hover:text-white transition-colors">
                  <ArrowUpRight size={13} />
                </span>
              </div>

              {/* Category Meta */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#9B4F52] block">
                    {tile.piecesCount}
                  </span>
                  <h3 className="font-serif font-medium text-sm sm:text-base text-[#4A252B] mt-0.5 group-hover:text-[#9B4F52] transition-colors">
                    {tile.title}
                  </h3>
                </div>
                <p className="font-sans text-[10px] text-[#806F72] mt-1.5 line-clamp-2 font-light leading-relaxed">
                  {tile.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
