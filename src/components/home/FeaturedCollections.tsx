import React, { useRef } from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

export const FeaturedCollections: React.FC = () => {
  const { collections, setActiveCategory } = useStore();
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!railRef.current) return;
    const distance = railRef.current.clientWidth * 0.7;
    railRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  const handleCollectionSelect = (catFilter?: string) => {
    if (catFilter) {
      setActiveCategory(catFilter as any);
    }
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FBF5F0] overflow-hidden border-t border-[#F0E6DE]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading with Slider Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3">
              Curated Universes
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A252B] tracking-[-0.02em] font-normal">
              Featured <em>Collections</em>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous collection"
              className="w-10 h-10 rounded-full border border-[#D9C4B5] bg-white text-[#4A252B] hover:bg-[#FAF6F2] hover:border-[#9B4F52] flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next collection"
              className="w-10 h-10 rounded-full border border-[#D9C4B5] bg-white text-[#4A252B] hover:bg-[#FAF6F2] hover:border-[#9B4F52] flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Collections Rail */}
        <div
          ref={railRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {collections.map((col, index) => (
            <div
              key={col.id}
              onClick={() => handleCollectionSelect(col.categoryFilter)}
              className="flex-none w-[280px] sm:w-[340px] lg:w-[380px] group cursor-pointer"
            >
              {/* Collection Card Visual */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8DDD1] shadow-md group-hover:shadow-xl transition-all duration-700">
                <ImageWithFallback
                  src={col.image}
                  alt={col.name}
                  fallbackTitle={col.name}
                  fallbackCategory={col.subtitle}
                  theme="gold"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-1000 ease-out"
                  containerClassName="w-full h-full"
                />

                {/* Subtle Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#201819]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Corner Badge */}
                <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-[#FAF6F2] bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {col.detail}
                </div>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5D6BD] block mb-1">
                      {col.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium leading-tight group-hover:text-[#F3DFB0] transition-colors">
                      {col.name}
                    </h3>
                  </div>

                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#C5A059] group-hover:text-[#4A252B] transition-colors shrink-0">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
