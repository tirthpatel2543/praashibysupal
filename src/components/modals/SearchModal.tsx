import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, setSearchQuery, setActiveCategory } = useStore();
  const [inputVal, setInputVal] = useState('');

  if (!searchOpen) return null;

  const popularSearches = [
    '22K Gold Choker',
    'Diamond Solitaire Ring',
    'Polki Earrings',
    'Bridal Necklace Set',
    'Everyday Hoops',
    'Jaali Kada',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputVal);
    setSearchOpen(false);
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickTag = (tag: string) => {
    setInputVal(tag);
    setSearchQuery(tag);
    setSearchOpen(false);
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-2xl bg-[#FAF6F2] rounded-2xl p-6 sm:p-8 border border-[#EADBCE] shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setSearchOpen(false)}
          aria-label="Close search"
          className="absolute top-4 right-4 text-[#806F72] hover:text-[#4A252B]"
        >
          <X size={22} />
        </button>

        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#9B4F52] font-semibold mb-3 flex items-center gap-1.5">
          <Sparkles size={13} className="text-[#C5A059]" />
          Search the Praashi Atelier
        </p>

        {/* Input Form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-[#4A252B] pb-3 mb-6">
          <Search size={22} className="text-[#9B4F52] mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Try “solitaire studs”, “22k bangles”, or “bridal choker”"
            className="w-full bg-transparent font-serif text-xl sm:text-2xl text-[#4A252B] placeholder-[#806F72]/50 outline-none"
          />
          <button type="submit" aria-label="Submit search" className="text-[#4A252B] hover:text-[#9B4F52] pl-2">
            <ArrowRight size={22} />
          </button>
        </form>

        {/* Popular Searches */}
        <div>
          <span className="font-sans text-[10px] uppercase tracking-wider text-[#806F72] block mb-2.5">
            Curated Searches:
          </span>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleQuickTag(term)}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#E2D2C6] text-xs font-sans text-[#4A252B] hover:border-[#9B4F52] hover:bg-[#FAF6F2] transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
