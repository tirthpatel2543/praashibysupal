import React from 'react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { IMAGE_PATHS } from '@/config/images';
import { Sparkles, ArrowRight } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-[#FBF5F0] border-t border-[#EDE1D6] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-[#D9C8B8]">
              <ImageWithFallback
                src={IMAGE_PATHS.brand.founder}
                alt="Supal · Founder and Creative Director of Praashi"
                fallbackTitle="Supal · Creative Director"
                fallbackCategory="The Atelier"
                theme="gold"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201819]/60 via-transparent to-transparent" />
            </div>

            {/* Floating Atelier Story Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-5 rounded-2xl bg-white shadow-xl border border-[#EADBCE] max-w-[220px]">
              <p className="font-serif italic text-base text-[#4A252B]">
                “Jewellery should never overpower you; it should illuminate the light already within.”
              </p>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#9B4F52] font-semibold mt-2 block">
                — Supal
              </span>
            </div>
          </div>

          {/* Right Editorial Copy Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3 flex items-center gap-2">
              <Sparkles size={13} className="text-[#C5A059]" />
              The House of Praashi
            </p>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A252B] tracking-[-0.02em] font-normal leading-tight mb-6">
              Crafted for the rituals that make <em>you.</em>
            </h2>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-[#736366] leading-relaxed font-light">
              <p>
                Founded by Supal, Praashi was born from an intimate desire to create modern heirlooms — pieces meant to be lived in, touched, passed down, and celebrated every single day, rather than locked away in vaults.
              </p>
              <p>
                Each design begins as a hand-drawn gouache study in our Mumbai studio, marrying the poetic symmetry of traditional Indian jewellery with a featherweight, contemporary silhouette. We work strictly with certified ethical diamonds, natural gemstones, and 100% BIS 916 hallmarked pure gold.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-[#EDE1D6]">
              <div>
                <strong className="font-serif text-2xl sm:text-3xl text-[#4A252B] block">22K</strong>
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#806F72]">
                  BIS Hallmarked
                </span>
              </div>
              <div>
                <strong className="font-serif text-2xl sm:text-3xl text-[#4A252B] block">100%</strong>
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#806F72]">
                  Certified Diamonds
                </span>
              </div>
              <div>
                <strong className="font-serif text-2xl sm:text-3xl text-[#4A252B] block">3rd Gen</strong>
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#806F72]">
                  Master Karigars
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
