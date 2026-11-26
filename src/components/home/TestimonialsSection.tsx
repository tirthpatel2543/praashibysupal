import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Star, Sparkles, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useStore();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-[#FFFFFF] border-t border-[#F0E6DE]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3 flex items-center justify-center gap-2">
            <Sparkles size={13} className="text-[#C5A059]" />
            Words From Our Patrons
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#4A252B] tracking-[-0.02em] font-normal">
            Heirlooms in <em>Real Life</em>
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto my-4" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC] flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#C5A059] mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <Quote size={28} className="text-[#DFC1B5] mb-3" />

                <p className="font-serif italic text-base sm:text-lg text-[#3D2025] leading-relaxed mb-6">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#EDE1D6] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-medium text-sm text-[#4A252B]">
                    {item.name}
                  </h4>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#806F72]">
                    {item.city} · Verified Patron
                  </span>
                </div>
                {item.productName && (
                  <span className="font-sans text-[10px] text-[#9B4F52] font-medium bg-white px-2.5 py-1 rounded-full border border-[#EADBCE]">
                    {item.productName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
