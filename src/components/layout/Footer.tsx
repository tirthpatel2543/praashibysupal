import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveCategory, navigate } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#4A252B] text-[#FAF6F2] pt-16 sm:pt-24 pb-12 border-t border-[#3D1E23]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#5E3239]">
          {/* Brand & Atelier Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-[#C5A059] flex items-center justify-center font-serif text-xl text-[#C5A059]">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-medium text-2xl tracking-[-0.03em] text-[#FAF6F2] leading-none">
                  Praashi
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#DFC1B5] mt-0.5">
                  by Supal
                </span>
              </div>
            </div>

            <p className="font-serif italic text-base sm:text-lg text-[#DFC1B5] leading-relaxed mb-6 font-light max-w-sm">
              “Jewellery for every chapter of your becoming. Made slowly, worn forever.”
            </p>

            <div className="text-xs text-[#DFC1B5] space-y-1.5 font-light">
              <p>The Atelier: 42 Altamount Road, Cumballa Hill, Mumbai 400026</p>
              <p>Concierge WhatsApp: {settings.whatsappConcierge}</p>
              <p>Email: {settings.contactEmail}</p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold mb-5">
              Categories
            </h4>
            <ul className="space-y-3 font-sans text-xs text-[#DFC1B5]">
              {['Gold', 'Diamond', 'Earrings', 'Necklaces', 'Rings', 'Bangles'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat as any);
                      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* House Services Column */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold mb-5">
              Atelier Services
            </h4>
            <ul className="space-y-3 font-sans text-xs text-[#DFC1B5]">
              <li>
                <a href="#bridal" className="hover:text-white transition-colors">
                  Bespoke Bridal Suite
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Our Goldsmithing Story
                </a>
              </li>
              <li>
                <a href="#diamonds" className="hover:text-white transition-colors">
                  Solitaire Certification
                </a>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  Heirloom Care & Restoration
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin/login')}
                  className="hover:text-[#C5A059] transition-colors text-left"
                >
                  Admin Atelier Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-2 flex items-center gap-2">
              <Sparkles size={12} />
              Private Inner Circle
            </p>
            <h4 className="font-serif text-2xl text-[#FAF6F2] font-normal mb-3">
              Join Our Atelier Journal
            </h4>
            <p className="font-sans text-xs text-[#DFC1B5] leading-relaxed mb-5 font-light">
              Receive private preview invitations, invitations to trunk shows, and editorial essays on Indian jewellery culture.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/10 border border-[#C5A059]/40 text-[#DFC1B5] text-xs flex items-center gap-2.5">
                <Sparkles size={16} className="text-[#C5A059]" />
                <span>Welcome to the circle. We look forward to adorning your story.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex border-b border-[#DFC1B5]/40 pb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-transparent text-sm text-[#FAF6F2] placeholder-[#DFC1B5]/50 outline-none w-full"
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="text-[#C5A059] hover:text-white transition-colors pl-2"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
                <p className="text-[10px] text-[#DFC1B5]/60">
                  Discreet, respectful mailings only. You may unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#DFC1B5]/60 font-sans tracking-wide">
          <div>
            &copy; 2026 Praashi by Supal. All rights reserved. Registered Indian Trademark.
          </div>
          <div className="flex items-center gap-6">
            <span>BIS 916 Hallmarked</span>
            <span>Kimberley Process Compliant</span>
            <span>Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
