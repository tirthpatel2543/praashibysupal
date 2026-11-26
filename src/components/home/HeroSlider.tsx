import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { heroSlides, setEnquiryModalOpen } = useStore();
  const activeSlides = heroSlides.filter((s) => s.active);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto move slides rightward seamlessly every 4.5 seconds
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) return null;

  return (
    <section
      aria-label="Cinematic Jewellery Hero"
      className="relative w-full overflow-hidden bg-[#FAF6F2] py-3 sm:py-5 px-4 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-end bg-[#181915]">
          {/* Slides Layer - Auto moves rightward seamlessly */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {activeSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  idx === currentIdx
                    ? 'opacity-100 translate-x-0 scale-100 z-10'
                    : idx < currentIdx
                    ? 'opacity-0 -translate-x-full scale-105 z-0'
                    : 'opacity-0 translate-x-full scale-105 z-0'
                }`}
              >
                <ImageWithFallback
                  src={slide.image}
                  alt={slide.title || 'Praashi High Jewellery'}
                  fallbackTitle={slide.title}
                  fallbackCategory={slide.subtitle}
                  theme="dark"
                  className="w-full h-full object-cover object-center"
                  containerClassName="w-full h-full"
                />
              </div>
            ))}

            {/* Subtle soft gradient at the bottom purely for clean button contrast */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 via-black/25 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Just Two Action Buttons Below - Clean, Uncluttered, No Overlapping Text */}
          <div className="relative z-20 pb-8 sm:pb-12 px-6 sm:px-12 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#FAF6F2] text-[#4A252B] font-sans text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold hover:bg-white hover:shadow-2xl hover:translate-y-[-2px] transition-all duration-300 shadow-xl"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </a>

            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-black/45 backdrop-blur-md border border-white/35 text-[#FAF6F2] font-sans text-xs sm:text-sm uppercase tracking-[0.16em] font-medium hover:bg-black/65 hover:border-[#C5A059] hover:text-white transition-all duration-300 shadow-xl"
            >
              <Sparkles size={15} className="text-[#C5A059]" />
              <span>Book Atelier Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
