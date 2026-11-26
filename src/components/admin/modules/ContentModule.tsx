import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Plus, Trash2, Star, Sparkles } from 'lucide-react';

export const ContentModule: React.FC = () => {
  const { testimonials, addTestimonial, deleteTestimonial, settings, updateSettings } = useStore();

  const [announcementText, setAnnouncementText] = useState(settings.announcementBar);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Testimonial Form
  const [patronName, setPatronName] = useState('');
  const [patronCity, setPatronCity] = useState('');
  const [patronQuote, setPatronQuote] = useState('');
  const [patronProduct, setPatronProduct] = useState('');
  const [patronRating, setPatronRating] = useState(5);

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ announcementBar: announcementText });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName || !patronQuote) return;
    addTestimonial({
      name: patronName,
      city: patronCity || 'India',
      quote: patronQuote,
      productName: patronProduct || undefined,
      rating: patronRating,
      date: 'Recent Patron',
    });
    setPatronName('');
    setPatronCity('');
    setPatronQuote('');
    setPatronProduct('');
  };

  return (
    <div className="space-y-10 animate-fade-in font-sans">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
          Website Content Management
        </h2>
        <p className="text-xs text-[#806F72] mt-0.5 font-light">
          Manage header announcement ticker, patron testimonials, and brand storytelling narratives.
        </p>
      </div>

      {/* Header Announcement Bar Ticker */}
      <div className="p-6 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
        <h3 className="font-serif text-lg font-medium text-[#4A252B] mb-1">
          Top Announcement Bar Ticker
        </h3>
        <p className="text-xs text-[#806F72] mb-4">
          Appears across the very top bar of the storefront on all devices.
        </p>

        <form onSubmit={handleSaveAnnouncement} className="space-y-3">
          <input
            type="text"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-xs text-[#4A252B] outline-none"
          />
          <div className="flex items-center justify-between">
            {saveSuccess && (
              <span className="text-xs text-[#56775D] font-medium">
                ✓ Announcement bar updated successfully!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2 rounded-full bg-[#4A252B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#9B4F52]"
            >
              Update Ticker
            </button>
          </div>
        </form>
      </div>

      {/* Testimonials Management */}
      <div className="p-6 rounded-2xl bg-white border border-[#EADBCE] shadow-sm space-y-6">
        <div>
          <h3 className="font-serif text-lg font-medium text-[#4A252B]">
            Patron Reviews & Testimonials
          </h3>
          <p className="text-xs text-[#806F72]">
            Curate verified customer experiences displayed on the homepage review carousel.
          </p>
        </div>

        {/* Existing Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl bg-[#FAF6F2] border border-[#EAE0D5] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-[#C5A059]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="text-[#806F72] hover:text-[#9B4F52]"
                    title="Remove review"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <p className="font-serif italic text-xs text-[#4A252B] leading-relaxed mb-3">
                  “{t.quote}”
                </p>
              </div>

              <div className="text-[11px] text-[#806F72]">
                <strong className="text-[#4A252B] font-serif">{t.name}</strong> ({t.city})
                {t.productName && <span className="ml-2 text-[#9B4F52]">· {t.productName}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Add Testimonial Form */}
        <form onSubmit={handleAddTestimonial} className="p-4 rounded-xl bg-[#FBF7F3] border border-[#E2D2C6] space-y-3 text-xs">
          <h4 className="font-serif font-medium text-sm text-[#4A252B]">
            + Add New Patron Testimonial
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={patronName}
              onChange={(e) => setPatronName(e.target.value)}
              required
              placeholder="Patron Name (e.g. Aarohi Mehta)"
              className="px-3 py-2 rounded-lg bg-white border border-[#E2D2C6] outline-none"
            />
            <input
              type="text"
              value={patronCity}
              onChange={(e) => setPatronCity(e.target.value)}
              placeholder="City (e.g. Mumbai)"
              className="px-3 py-2 rounded-lg bg-white border border-[#E2D2C6] outline-none"
            />
            <input
              type="text"
              value={patronProduct}
              onChange={(e) => setPatronProduct(e.target.value)}
              placeholder="Purchased Piece"
              className="px-3 py-2 rounded-lg bg-white border border-[#E2D2C6] outline-none"
            />
          </div>
          <textarea
            rows={2}
            value={patronQuote}
            onChange={(e) => setPatronQuote(e.target.value)}
            required
            placeholder="Review quote text..."
            className="w-full px-3 py-2 rounded-lg bg-white border border-[#E2D2C6] outline-none resize-none"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-[#4A252B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#9B4F52]"
          >
            Add Testimonial
          </button>
        </form>
      </div>
    </div>
  );
};
