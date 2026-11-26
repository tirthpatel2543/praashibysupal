import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { IMAGE_PATHS } from '@/config/images';
import { Gem, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const DiamondSpotlightSection: React.FC = () => {
  const { setActiveCategory } = useStore();

  const handleExploreDiamonds = () => {
    setActiveCategory('Diamond');
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const diamondPillars = [
    { title: 'The 4Cs Rigor', desc: 'Cut, Color, Clarity, Carat hand-verified under 40x magnification.' },
    { title: 'Triple Excellent Cut', desc: 'Precision symmetrical faceting engineered for maximum white fire.' },
    { title: 'Conflict-Free Provenance', desc: '100% Kimberley Process certified ethical mining origins.' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F3] border-b border-[#EAE0D4] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy Side */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3 flex items-center gap-2">
              <Gem size={14} className="text-[#C5A059]" />
              The Solitaire Suite
            </p>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A252B] tracking-[-0.02em] font-normal leading-tight mb-5">
              Diamonds of <em>Singular Fire</em>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#736366] leading-relaxed mb-6 font-light">
              Only the top 1% of rough diamonds qualify for the Praashi signature cut. Set in featherweight 18K white, yellow, and rose gold mounts, each stone delivers breathless scintillation tailored for both intimate moments and grand gala celebrations.
            </p>

            <div className="space-y-3 mb-8">
              {diamondPillars.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="text-[#C5A059] mt-0.5 shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-[#4A252B] leading-tight">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[11px] text-[#806F72] mt-0.5 font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleExploreDiamonds}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-md hover:translate-y-[-2px]"
              >
                <span>View Diamond Jewellery</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#DCD4CA]">
              <ImageWithFallback
                src={IMAGE_PATHS.banners.solitairePromo}
                alt="Praashi Certified Diamond Solitaire"
                fallbackTitle="Certified Solitaire Brilliance"
                fallbackCategory="18K Gold & Certified Diamonds"
                theme="light"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201819]/70 via-transparent to-transparent" />

              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#4A252B] text-[10px] font-sans uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow">
                <Sparkles size={12} className="text-[#C5A059]" />
                <span>VS-GH Brilliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
