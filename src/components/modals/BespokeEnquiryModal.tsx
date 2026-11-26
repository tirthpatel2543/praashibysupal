import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export const BespokeEnquiryModal: React.FC = () => {
  const { enquiryModalOpen, setEnquiryModalOpen, addEnquiry } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<'Bespoke Bridal' | 'Custom Heirloom' | 'Solitaire Consultation' | 'Sizing & Care'>('Bespoke Bridal');
  const [budgetRange, setBudgetRange] = useState('₹2,00,000 - ₹5,00,000');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!enquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      name,
      email,
      phone,
      serviceType,
      budgetRange,
      preferredDate,
      message,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEnquiryModalOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-[#FAF6F2] rounded-2xl p-6 sm:p-8 border border-[#EADBCE] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setEnquiryModalOpen(false)}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-[#806F72] hover:text-[#4A252B]"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#56775D]/10 text-[#56775D] mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-serif text-2xl text-[#4A252B]">Consultation Requested</h3>
            <p className="font-sans text-xs text-[#736366] leading-relaxed max-w-sm mx-auto font-light">
              Thank you, {name}. Supal’s private atelier concierge will reach out to you within 24 hours to schedule your bespoke consultation.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-[#4A252B] text-white text-xs uppercase tracking-wider font-semibold"
            >
              Return to Storefront
            </button>
          </div>
        ) : (
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#9B4F52] font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#C5A059]" />
              Private Atelier Appointment
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#4A252B] font-normal leading-tight mb-2">
              Book a Bespoke Consultation
            </h3>
            <p className="font-sans text-xs text-[#736366] font-light mb-6">
              Collaborate directly with Supal on bespoke bridal trousseaus, custom solitaire settings, or ancestral heirloom remodels.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D9C4B5] outline-none text-[#4A252B] focus:border-[#9B4F52]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+91 98200 00000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D9C4B5] outline-none text-[#4A252B] focus:border-[#9B4F52]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D9C4B5] outline-none text-[#4A252B] focus:border-[#9B4F52]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Service Required
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D9C4B5] outline-none text-[#4A252B] focus:border-[#9B4F52]"
                  >
                    <option value="Bespoke Bridal">Bespoke Bridal</option>
                    <option value="Custom Heirloom">Custom Heirloom</option>
                    <option value="Solitaire Consultation">Solitaire Consultation</option>
                    <option value="Sizing & Care">Sizing & Care</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Estimated Budget
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D9C4B5] outline-none text-[#4A252B] focus:border-[#9B4F52]"
                  >
                    <option value="Under ₹1,00,000">Under ₹1,00,000</option>
                    <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                    <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                    <option value="₹5,00,000+">₹5,00,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Personal Vision or Notes
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the occasion, gemstones of interest, or custom requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D9C4B5] outline-none text-[#4A252B] focus:border-[#9B4F52] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow"
              >
                <Send size={14} />
                <span>Submit Consultation Request</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
