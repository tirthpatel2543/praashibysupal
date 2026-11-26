import React from 'react';
import { useStore } from '@/context/StoreContext';
import { CreditCard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const PaymentsModule: React.FC = () => {
  const { orders, updatePaymentStatus } = useStore();

  const totalCaptured = orders
    .filter((o) => o.paymentStatus === 'Paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingAmount = orders
    .filter((o) => o.paymentStatus === 'Pending')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
          Payment Status & Reconciliation
        </h2>
        <p className="text-xs text-[#806F72] mt-0.5 font-light">
          Track high-value transactions, UPI verifications, net banking, and refunds.
        </p>
      </div>

      {/* Payment Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-[#806F72] font-semibold block mb-1">
            Settled / Paid Volume
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-[#426E49]">
            ₹{totalCaptured.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-[#806F72] font-semibold block mb-1">
            Pending Clearances
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-[#9A5D3F]">
            ₹{pendingAmount.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-[#806F72] font-semibold block mb-1">
            Payment Gateways
          </span>
          <div className="text-xs text-[#4A252B] font-medium mt-1">
            Razorpay / Cashfree / Direct UPI / HDFC RTGS
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-xl bg-white border border-[#EADBCE] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6F2] border-b border-[#EDE1D6] text-[10px] uppercase tracking-wider text-[#806F72]">
                <th className="py-3 px-4 font-semibold">Order Reference</th>
                <th className="py-3 px-4 font-semibold">Client Name</th>
                <th className="py-3 px-4 font-semibold">Payment Channel</th>
                <th className="py-3 px-4 font-semibold">Transaction Amount</th>
                <th className="py-3 px-4 font-semibold">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4ECE3]">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-[#FAF6F2] transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#4A252B]">{o.id}</td>
                  <td className="py-3 px-4 font-medium text-[#4A252B]">{o.customerName}</td>
                  <td className="py-3 px-4 text-[#806F72]">{o.paymentMethod}</td>
                  <td className="py-3 px-4 font-serif font-medium text-[#4A252B]">
                    ₹{o.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={o.paymentStatus}
                      onChange={(e) => updatePaymentStatus(o.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold outline-none border ${
                        o.paymentStatus === 'Paid'
                          ? 'bg-[#EAF3EA] text-[#426E49] border-[#A8CCA7]'
                          : 'bg-[#FAF0E6] text-[#9A5D3F] border-[#E8DBD2]'
                      }`}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
                      <option value="Failed">Failed</option>
                    </select>
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
