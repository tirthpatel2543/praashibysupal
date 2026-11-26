import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { HeroSlide, EditorialBanner } from '@/types';
import { Sparkles, Edit3, Check, X } from 'lucide-react';

export const BannersModule: React.FC = () => {
  const { heroSlides, updateHeroSlide, editorialBanners, updateEditorialBanner } = useStore();

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSub, setSlideSub] = useState('');
  const [slideDesc, setSlideDesc] = useState('');
  const [slideImage, setSlideImage] = useState('');
  const [slideCta, setSlideCta] = useState('');

  const [editingBanner, setEditingBanner] = useState<EditorialBanner | null>(null);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerDesc, setBannerDesc] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerCta, setBannerCta] = useState('');

  const openSlideModal = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setSlideTitle(slide.title);
    setSlideSub(slide.subtitle);
    setSlideDesc(slide.description);
    setSlideImage(slide.image);
    setSlideCta(slide.ctaText);
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    updateHeroSlide({
      ...editingSlide,
      title: slideTitle,
      subtitle: slideSub,
      description: slideDesc,
      image: slideImage,
      ctaText: slideCta,
    });
    setEditingSlide(null);
  };

  const openBannerModal = (banner: EditorialBanner) => {
    setEditingBanner(banner);
    setBannerTitle(banner.title);
    setBannerDesc(banner.description);
    setBannerImage(banner.image);
    setBannerCta(banner.ctaText);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;
    updateEditorialBanner({
      ...editingBanner,
      title: bannerTitle,
      description: bannerDesc,
      image: bannerImage,
      ctaText: bannerCta,
    });
    setEditingBanner(null);
  };

  return (
    <div className="space-y-10 animate-fade-in font-sans">
      {/* Hero Slides Section */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-medium text-[#4A252B]">
            Homepage Hero Banner Slides
          </h2>
          <p className="text-xs text-[#806F72] mt-0.5 font-light">
            Manage the cinematic rotating hero slides. The primary slide uses <code className="text-[#4A252B] font-mono">/images/hero/main.jpg</code>, and secondary slides use <code className="text-[#4A252B] font-mono">1st.jpg</code>, <code className="text-[#4A252B] font-mono">2nd.jpg</code>, and <code className="text-[#4A252B] font-mono">3rd.jpg</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="rounded-2xl bg-white border border-[#EADBCE] overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] bg-[#ECE0D3]">
                <ImageWithFallback
                  src={slide.image}
                  alt={slide.title}
                  fallbackTitle={slide.title}
                  fallbackCategory={slide.subtitle}
                  theme="dark"
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/50 text-white font-mono text-[9px]">
                  Slide 0{index + 1} · {slide.image}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#9B4F52] font-semibold">
                    {slide.eyebrow}
                  </span>
                  <h3 className="font-serif font-medium text-xl text-[#4A252B] mt-0.5">
                    {slide.title}
                  </h3>
                  <p className="font-serif italic text-sm text-[#806F72]">{slide.subtitle}</p>
                  <p className="text-xs text-[#736366] mt-2 line-clamp-2 leading-relaxed font-light">
                    {slide.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EDE1D6] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4A252B]">
                    CTA: {slide.ctaText}
                  </span>
                  <button
                    onClick={() => openSlideModal(slide)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#D9C4B5] text-[#4A252B] hover:bg-[#FAF6F2] text-xs font-medium flex items-center gap-1.5"
                  >
                    <Edit3 size={13} />
                    <span>Edit Slide</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Banners Section */}
      <section className="space-y-4 pt-6 border-t border-[#EAE0D4]">
        <div>
          <h2 className="font-serif text-2xl font-medium text-[#4A252B]">
            Promotional & Editorial Banners
          </h2>
          <p className="text-xs text-[#806F72] mt-0.5 font-light">
            Manage full-width editorial callout banners such as the Bespoke Bridal Atelier and Pure Artisanal Gold features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editorialBanners.map((banner) => (
            <div
              key={banner.id}
              className="rounded-2xl bg-white border border-[#EADBCE] overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] bg-[#ECE0D3]">
                <ImageWithFallback
                  src={banner.image}
                  alt={banner.title}
                  fallbackTitle={banner.title}
                  fallbackCategory={banner.eyebrow}
                  theme="gold"
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#9B4F52] font-semibold">
                    {banner.eyebrow}
                  </span>
                  <h3 className="font-serif font-medium text-lg text-[#4A252B] mt-0.5">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-[#736366] mt-2 line-clamp-2 leading-relaxed font-light">
                    {banner.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EDE1D6] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4A252B]">
                    CTA: {banner.ctaText}
                  </span>
                  <button
                    onClick={() => openBannerModal(banner)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#D9C4B5] text-[#4A252B] hover:bg-[#FAF6F2] text-xs font-medium flex items-center gap-1.5"
                  >
                    <Edit3 size={13} />
                    <span>Edit Banner</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Slide Modal */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 border border-[#EADBCE] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE1D6] mb-5">
              <h3 className="font-serif text-xl text-[#4A252B] font-medium">Edit Hero Slide</h3>
              <button onClick={() => setEditingSlide(null)} className="text-[#806F72] hover:text-[#4A252B]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Slide Headline Title *
                </label>
                <input
                  type="text"
                  value={slideTitle}
                  onChange={(e) => setSlideTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={slideSub}
                  onChange={(e) => setSlideSub(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={slideDesc}
                  onChange={(e) => setSlideDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Image Path (e.g. /images/hero/main.jpg) *
                </label>
                <input
                  type="text"
                  value={slideImage}
                  onChange={(e) => setSlideImage(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Call to Action Button Label
                </label>
                <input
                  type="text"
                  value={slideCta}
                  onChange={(e) => setSlideCta(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#EDE1D6] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-5 py-2 rounded-full border border-[#D9C4B5] text-[#4A252B] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#4A252B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#9B4F52]"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {editingBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 border border-[#EADBCE] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE1D6] mb-5">
              <h3 className="font-serif text-xl text-[#4A252B] font-medium">Edit Editorial Banner</h3>
              <button onClick={() => setEditingBanner(null)} className="text-[#806F72] hover:text-[#4A252B]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Banner Headline *
                </label>
                <input
                  type="text"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={bannerDesc}
                  onChange={(e) => setBannerDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Image Path (in /images/banners/) *
                </label>
                <input
                  type="text"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Button Text
                </label>
                <input
                  type="text"
                  value={bannerCta}
                  onChange={(e) => setBannerCta(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#EDE1D6] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBanner(null)}
                  className="px-5 py-2 rounded-full border border-[#D9C4B5] text-[#4A252B] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#4A252B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#9B4F52]"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
