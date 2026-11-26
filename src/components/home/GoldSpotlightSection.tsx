import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { IMAGE_PATHS } from '@/config/images';
import { ShieldCheck, Sparkles, ArrowRight, Award } from 'lucide-react';

export const GoldSpotlightSection: React.FC = () => {
  const { setActiveCategory } = useStore();

  const handleExploreGold = () => {
    setActiveCategory('Gold');
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF4EC] to-[#F5ECE0] border-y border-[#EAE0D4] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase Side */}
          <div className="relative">
            {/* Ornamental Frame Backing */}
            <div className="absolute -inset-4 rounded-3xl border border-[#C5A059]/30 -rotate-1 pointer-events-none" />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#D6C2AF]">
              <ImageWithFallback
                src={IMAGE_PATHS.banners.goldFestive}
                alt="22K Artisanal Indian Gold Jewellery"
                fallbackTitle="22K Artisanal Hallmarked Gold"
                fallbackCategory="Heritage Goldsmithing"
                theme="gold"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#271E19]/80 via-transparent to-transparent" />

              {/* Floating Purity Stamp */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#EADBCE] shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4A252B] text-[#C5A059] flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-sm text-[#4A252B]">
                      100% BIS 916 Hallmarked
                    </h4>
                    <p className="font-sans text-[10px] text-[#806F72]">
                      Pure 22 Karat certified gold with laser-engraved HUID
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#C5A059]">22K / 916</span>
              </div>
            </div>
          </div>

          {/* Editorial Content Side */}
          <div className="flex flex-col justify-center">
            <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-[#C5A059]" />
              The Gold Chapter
            </p>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A252B] tracking-[-0.02em] font-normal leading-tight mb-5">
              The Alchemy of <em>Pure Gold</em>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#736366] leading-relaxed mb-6 font-light">
              In Indian ritual, gold is not merely an ornament — it is sunlight cast into metal, a blessing carried across generations. At Praashi, our 22K jewellery is forged slowly by traditional karigars using ancient techniques of die-stamping, delicate filigree, and hand-burnishing.
            </p>

            {/* Features Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-3.5 rounded-xl bg-white/70 border border-[#E8DBD2]">
                <h4 className="font-serif text-sm font-medium text-[#4A252B] mb-1">
                  Zero Alloy Compromise
                </h4>
                <p className="font-sans text-[11px] text-[#806F72] font-light">
                  Strictly conforming to 91.6% pure gold ratio with copper & silver balancing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 border border-[#E8DBD2]">
                <h4 className="font-serif text-sm font-medium text-[#4A252B] mb-1">
                  Jaipur & Bengal Craft
                </h4>
                <p className="font-sans text-[11px] text-[#806F72] font-light">
                  Reviving generational jaali patterns and antique micro-granulation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleExploreGold}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-md hover:translate-y-[-2px]"
              >
                <span>Explore Gold Collection</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
