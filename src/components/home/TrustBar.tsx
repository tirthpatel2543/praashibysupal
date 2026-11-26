import React from 'react';
import { ShieldCheck, Award, Truck, RefreshCw } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const assurances = [
    {
      icon: Award,
      title: '100% Certified Diamonds',
      subtitle: 'IGI, GIA & SGL authenticated with tamper-proof certificates',
    },
    {
      icon: ShieldCheck,
      title: 'BIS 916 Hallmarked Gold',
      subtitle: 'Guaranteed 22K and 18K purity stamped with government hallmark',
    },
    {
      icon: Truck,
      title: 'Complimentary Insured Shipping',
      subtitle: 'Discreet, high-security transit insurance to your doorstep',
    },
    {
      icon: RefreshCw,
      title: 'Lifetime Exchange & Buyback',
      subtitle: 'Transparent valuation policies for your cherished heirlooms',
    },
  ];

  return (
    <section className="bg-[#FAF6F2] border-y border-[#EDE3DC] py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {assurances.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-2 transition-transform duration-300 hover:translate-y-[-2px]"
            >
              <div className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#E2D2C6] flex items-center justify-center text-[#B38E46] shrink-0 shadow-sm">
                <Icon size={20} strokeWidth={1.4} />
              </div>
              <div>
                <h4 className="font-serif font-medium text-[15px] text-[#4A252B] leading-tight">
                  {item.title}
                </h4>
                <p className="font-sans text-[11px] text-[#806F72] mt-1 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
