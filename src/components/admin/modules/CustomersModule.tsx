import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Users, Mail, Phone, MapPin, Award } from 'lucide-react';

export const CustomersModule: React.FC = () => {
  const { customers } = useStore();

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
          Patron Directory & Clients
        </h2>
        <p className="text-xs text-[#806F72] mt-0.5 font-light">
          Manage private client profiles, lifetime acquisition totals, and VIP heirloom tiers.
        </p>
      </div>

      <div className="rounded-xl bg-white border border-[#EADBCE] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6F2] border-b border-[#EDE1D6] text-[10px] uppercase tracking-wider text-[#806F72]">
                <th className="py-3 px-4 font-semibold">Patron Details</th>
                <th className="py-3 px-4 font-semibold">Contact</th>
                <th className="py-3 px-4 font-semibold">City</th>
                <th className="py-3 px-4 font-semibold">Orders</th>
                <th className="py-3 px-4 font-semibold">Total Spend</th>
                <th className="py-3 px-4 font-semibold">Atelier Tier</th>
                <th className="py-3 px-4 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4ECE3]">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF6F2] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#4A252B]">{c.name}</div>
                    <div className="font-mono text-[10px] text-[#806F72]">{c.id}</div>
                  </td>
                  <td className="py-3 px-4 text-[#736366]">
                    <div>{c.email}</div>
                    <div className="text-[10px]">{c.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-[#806F72]">{c.city}</td>
                  <td className="py-3 px-4 font-mono font-medium text-[#4A252B]">{c.ordersCount}</td>
                  <td className="py-3 px-4 font-serif font-medium text-[#4A252B]">
                    ₹{c.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.tier === 'Heirloom Member'
                          ? 'bg-[#F4ECE0] text-[#B38E46] border border-[#C5A059]/40'
                          : c.tier === 'Connoisseur'
                          ? 'bg-[#EAF1F8] text-[#3A6B94]'
                          : 'bg-[#FAF6F2] text-[#4A252B]'
                      }`}
                    >
                      {c.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[#806F72] max-w-[200px] truncate">
                    {c.notes || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
