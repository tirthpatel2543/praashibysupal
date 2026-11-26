import React, { useRef, useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import type { JewelleryCategory } from '@/types';
import {
  IconAllJewellery,
  IconGold,
  IconDiamond,
  IconEarrings,
  IconDailyWear,
  IconNecklaces,
  IconRings,
  IconBracelets,
  IconBangles,
} from './CategoryIcons';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryItem {
  id: JewelleryCategory;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'All Jewellery', label: 'All Jewellery', icon: IconAllJewellery },
  { id: 'Gold', label: 'Gold', icon: IconGold },
  { id: 'Diamond', label: 'Diamond', icon: IconDiamond },
  { id: 'Earrings', label: 'Earrings', icon: IconEarrings },
  { id: 'Daily Wear', label: 'Daily Wear', icon: IconDailyWear },
  { id: 'Necklaces', label: 'Necklaces', icon: IconNecklaces },
  { id: 'Rings', label: 'Rings', icon: IconRings },
  { id: 'Bracelets', label: 'Bracelets', icon: IconBracelets },
  { id: 'Bangles', label: 'Bangles', icon: IconBangles },
];

export const CategoryNav: React.FC<{ isSticky?: boolean }> = ({ isSticky = false }) => {
  const { activeCategory, setActiveCategory, currentPath, navigate } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll overflows
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Handle wheel scrolling horizontally
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      scrollRef.current.scrollBy({ left: e.deltaY * 0.9, behavior: 'auto' });
      checkScroll();
    }
  };

  const scrollBy = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkScroll, 250);
  };

  const handleSelectCategory = (cat: JewelleryCategory) => {
    setActiveCategory(cat);
    if (currentPath !== '/') {
      navigate('/');
    }
    // Smooth scroll down to products section
    setTimeout(() => {
      const target = document.getElementById('products-section') || document.getElementById('products');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  return (
    <nav
      aria-label="Jewellery Category Navigation"
      className={`w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#F0E6DE] transition-all duration-300 z-30 ${
        isSticky ? 'sticky top-0 shadow-[0_4px_20px_rgba(74,37,43,0.08)]' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 relative flex items-center">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollBy(-180)}
            aria-label="Scroll categories left"
            className="absolute left-1 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border border-[#E8DBD2] shadow-md flex items-center justify-center text-[#9B4F52] hover:bg-[#FDFBF7] transition-all"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {/* Scrollable Container with No Visible Scrollbar & High Touch Usability */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onWheel={handleWheel}
          className="flex items-center gap-1.5 sm:gap-2 md:gap-4 overflow-x-auto py-2.5 sm:py-3.5 w-full scroll-smooth select-none no-scrollbar touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {CATEGORIES.map(({ id, label, icon: Icon }) => {
            const isActive = activeCategory === id;
            return (
              <button
                key={id}
                onClick={() => handleSelectCategory(id)}
                className={`group relative flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full whitespace-nowrap transition-all duration-300 select-none ${
                  isActive
                    ? 'bg-[#4A252B] text-white shadow-md font-bold'
                    : 'text-[#4A252B] hover:text-[#9B4F52] hover:bg-[#FAF6F2] font-semibold'
                }`}
              >
                {/* Thin-line Jewellery Icon */}
                <span
                  className={`flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-[#F3E5AB]' : 'text-[#8E7579] group-hover:text-[#B38E46]'
                  }`}
                >
                  <Icon size={20} />
                </span>

                {/* Typography with bold legible sizing on mobile */}
                <span className={`font-sans text-xs sm:text-[12px] tracking-[0.04em] uppercase ${
                  isActive ? 'font-bold' : 'font-semibold'
                }`}>
                  {label}
                </span>

                {/* Understated Active Indicator */}
                {isActive && (
                  <span className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-[#F3E5AB] via-[#C5A059] to-[#F3E5AB] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scrollBy(180)}
            aria-label="Scroll categories right"
            className="absolute right-1 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border border-[#E8DBD2] shadow-md flex items-center justify-center text-[#9B4F52] hover:bg-[#FDFBF7] transition-all"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </nav>
  );
};
