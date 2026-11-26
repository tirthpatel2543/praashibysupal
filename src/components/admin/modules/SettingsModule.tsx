import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Save, Check, Award } from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const { settings, updateSettings } = useStore();

  const [rate24K, setRate24K] = useState(settings.goldRate24K);
  const [rate22K, setRate22K] = useState(settings.goldRate22K);
  const [rate18K, setRate18K] = useState(settings.goldRate18K);
  const [whatsapp, setWhatsapp] = useState(settings.whatsappConcierge);
  const [email, setEmail] = useState(settings.contactEmail);
  const [phone, setPhone] = useState(settings.contactPhone);
  const [shippingLimit, setShippingLimit] = useState(settings.shippingThresholdFree);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      goldRate24K: Number(rate24K),
      goldRate22K: Number(rate22K),
      goldRate18K: Number(rate18K),
      whatsappConcierge: whatsapp,
      contactEmail: email,
      contactPhone: phone,
      shippingThresholdFree: Number(shippingLimit),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans max-w-3xl">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
          Store Settings & Bullion Rates
        </h2>
        <p className="text-xs text-[#806F72] mt-0.5 font-light">
          Configure daily gold bullion rates per gram, atelier concierge contact details, and shipping policies.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EADBCE] shadow-sm space-y-6 text-xs">
        {/* Bullion Rates Section */}
        <div>
          <h3 className="font-serif text-lg font-medium text-[#4A252B] mb-1 flex items-center gap-2">
            <Award size={18} className="text-[#C5A059]" />
            Live Gold Rates (Per Gram in INR)
          </h3>
          <p className="text-[11px] text-[#806F72] mb-4">
            Changes update the top announcement bar ticker across the entire website immediately.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                24K Pure Gold (₹/g)
              </label>
              <input
                type="number"
                value={rate24K}
                onChange={(e) => setRate24K(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none font-mono font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                22K Hallmarked (₹/g)
              </label>
              <input
                type="number"
                value={rate22K}
                onChange={(e) => setRate22K(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none font-mono font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                18K Jewellery Gold (₹/g)
              </label>
              <input
                type="number"
                value={rate18K}
                onChange={(e) => setRate18K(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none font-mono font-medium"
              />
            </div>
          </div>
        </div>

        {/* Concierge Contacts Section */}
        <div className="pt-6 border-t border-[#EDE1D6] space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#4A252B]">
            Atelier Concierge & Communications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                WhatsApp Concierge Number
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                Concierge Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                Atelier Landline
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                Free Insured Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={shippingLimit}
                onChange={(e) => setShippingLimit(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-[#EDE1D6] flex items-center justify-between">
          {saved && (
            <span className="text-xs text-[#56775D] font-medium flex items-center gap-1.5">
              <Check size={14} /> Settings saved & updated on storefront!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-7 py-3 rounded-full bg-[#4A252B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#9B4F52] flex items-center gap-2 shadow"
          >
            <Save size={14} />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
