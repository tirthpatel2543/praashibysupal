import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { ArrowRight, Sparkles } from 'lucide-react';

export const EditorialBanners: React.FC = () => {
  const { editorialBanners, setEnquiryModalOpen } = useStore();
  if (editorialBanners.length === 0) return null;

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-10 bg-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
        {editorialBanners.map((banner, index) => {
          const isReverse = index % 2 === 1;
          return (
            <div
              key={banner.id}
              className={`rounded-2xl overflow-hidden bg-[#FAF6F2] border border-[#EFE5DC] grid grid-cols-1 lg:grid-cols-12 shadow-sm ${
                isReverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Banner Column */}
              <div
                className={`relative min-h-[320px] sm:min-h-[420px] lg:col-span-7 bg-[#E2D5C7] overflow-hidden ${
                  isReverse ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <ImageWithFallback
                  src={banner.image}
                  alt={banner.title}
                  fallbackTitle={banner.title}
                  fallbackCategory={banner.eyebrow}
                  theme="gold"
                  className="w-full h-full object-cover hover:scale-104 transition-transform duration-1000 ease-out"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Copy Banner Column */}
              <div
                className={`p-8 sm:p-12 lg:p-16 flex flex-col justify-center lg:col-span-5 ${
                  isReverse ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3 flex items-center gap-2">
                  <Sparkles size={13} className="text-[#C5A059]" />
                  {banner.eyebrow}
                </p>

                <h3 className="font-serif text-2xl sm:text-4xl text-[#4A252B] tracking-[-0.02em] font-normal leading-tight mb-4">
                  {banner.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#736366] leading-relaxed mb-8 font-light">
                  {banner.description}
                </p>

                <div>
                  <button
                    onClick={() => {
                      if (banner.ctaLink.includes('consultation')) {
                        setEnquiryModalOpen(true);
                      } else {
                        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-md hover:translate-y-[-2px]"
                  >
                    <span>{banner.ctaText}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
