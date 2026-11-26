import React from 'react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { IMAGE_PATHS } from '@/config/images';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  const socialPosts = [
    { image: IMAGE_PATHS.products.noorNecklace, caption: 'The Noor choker catching sunset in Jaipur', tag: '#PraashiPatrons' },
    { image: IMAGE_PATHS.products.asterEarrings, caption: 'Cascading brilliance for celebratory evenings', tag: '#PraashiSolitaires' },
    { image: IMAGE_PATHS.products.saanjhBangle, caption: '22K Jaali filigree wrist stack', tag: '#EverydayGold' },
    { image: IMAGE_PATHS.products.lunaRing, caption: 'The Luna starburst signet ring', tag: '#PraashiAtelier' },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-[#FAF7F3] border-t border-[#EDE1D6]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3 flex items-center gap-2">
              <Instagram size={14} className="text-[#C5A059]" />
              Patron Styling & Atelier Moments
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A252B] tracking-[-0.02em] font-normal">
              @PraashiBySupal
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#9B4F52] text-[#9B4F52] hover:bg-[#9B4F52] hover:text-white transition-all text-xs uppercase tracking-wider font-semibold"
          >
            <span>Follow Our Journal</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {socialPosts.map((post, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#ECE0D3] shadow-sm cursor-pointer"
            >
              <ImageWithFallback
                src={post.image}
                alt={post.caption}
                fallbackTitle={post.tag}
                fallbackCategory="Instagram Gallery"
                theme="gold"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                containerClassName="w-full h-full"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                <span className="self-end text-xs text-[#C5A059]">
                  <Instagram size={16} />
                </span>
                <div>
                  <p className="font-sans text-[11px] text-white/90 line-clamp-2 leading-relaxed font-light">
                    {post.caption}
                  </p>
                  <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-wider mt-1 block">
                    {post.tag}
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
