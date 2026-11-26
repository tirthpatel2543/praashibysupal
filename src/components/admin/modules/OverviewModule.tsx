import React from 'react';
import { useStore } from '@/context/StoreContext';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  Award,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const OverviewModule: React.FC<{ onNavigateModule: (mod: string) => void }> = ({ onNavigateModule }) => {
  const { products, orders, customers, enquiries, settings, navigate } = useStore();

  const totalSales = orders
    .filter((o) => o.paymentStatus === 'Paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter((o) => o.status === 'Placed' || o.status === 'Processing').length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#4A252B] via-[#5E3239] to-[#3D1E23] text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#C5A059] font-semibold block mb-1">
            Praashi Atelier · Executive Control
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF6F2]">
            Welcome Back, Supal
          </h2>
          <p className="font-sans text-xs text-[#DFC1B5] mt-1 max-w-md font-light leading-relaxed">
            Your storefront is active. All changes made in this dashboard reflect instantly on the customer-facing experience.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateModule('products')}
            className="px-5 py-2.5 rounded-full bg-[#FAF6F2] text-[#4A252B] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shadow"
          >
            + Add New Product
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-all flex items-center gap-1.5"
          >
            <span>View Live Store</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
          <div className="flex items-center justify-between text-[#806F72] text-xs mb-2">
            <span className="font-sans uppercase tracking-wider text-[10px]">Total Revenue</span>
            <TrendingUp size={16} className="text-[#56775D]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
            ₹{totalSales.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-[#56775D] font-sans mt-1">
            From {orders.length} orders
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
          <div className="flex items-center justify-between text-[#806F72] text-xs mb-2">
            <span className="font-sans uppercase tracking-wider text-[10px]">Active Orders</span>
            <ShoppingBag size={16} className="text-[#B38E46]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
            {orders.length}
          </div>
          <div className="text-[11px] text-[#9B4F52] font-sans mt-1">
            {pendingOrders} awaiting fulfillment
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
          <div className="flex items-center justify-between text-[#806F72] text-xs mb-2">
            <span className="font-sans uppercase tracking-wider text-[10px]">Catalogue Pieces</span>
            <Package size={16} className="text-[#4A252B]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
            {products.length}
          </div>
          <div className="text-[11px] text-[#806F72] font-sans mt-1">
            Across 9 categories
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
          <div className="flex items-center justify-between text-[#806F72] text-xs mb-2">
            <span className="font-sans uppercase tracking-wider text-[10px]">Bridal Enquiries</span>
            <MessageSquare size={16} className="text-[#9B4F52]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
            {enquiries.length}
          </div>
          <div className="text-[11px] text-[#C5A059] font-sans mt-1 font-semibold">
            {newEnquiries} need attention
          </div>
        </div>
      </div>

      {/* Middle Grid: Live Bullion & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Bullion & Settings Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-medium text-[#4A252B]">
              Active Gold Ticker
            </h3>
            <button
              onClick={() => onNavigateModule('settings')}
              className="text-xs text-[#9B4F52] font-semibold uppercase hover:underline"
            >
              Edit Rates
            </button>
          </div>
          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 rounded-xl bg-[#FAF6F2] flex items-center justify-between">
              <span className="text-[#806F72]">24K Fine Gold (99.9%)</span>
              <strong className="font-mono text-sm text-[#4A252B]">₹{settings.goldRate24K}/g</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF6F2] flex items-center justify-between">
              <span className="text-[#806F72]">22K Standard Gold (91.6%)</span>
              <strong className="font-mono text-sm text-[#B38E46]">₹{settings.goldRate22K}/g</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF6F2] flex items-center justify-between">
              <span className="text-[#806F72]">18K Jewellery Gold (75.0%)</span>
              <strong className="font-mono text-sm text-[#4A252B]">₹{settings.goldRate18K}/g</strong>
            </div>
          </div>
        </div>

        {/* Quick Admin Navigation Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#EADBCE] shadow-sm lg:col-span-2">
          <h3 className="font-serif text-lg font-medium text-[#4A252B] mb-4">
            Atelier Management Shortcuts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans text-xs">
            <button
              onClick={() => onNavigateModule('products')}
              className="p-3.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F4ECE3] border border-[#EAE0D5] text-left transition-all"
            >
              <Package size={18} className="text-[#9B4F52] mb-1.5" />
              <strong className="block text-[#4A252B]">Products</strong>
              <span className="text-[10px] text-[#806F72]">Add, edit & stock</span>
            </button>
            <button
              onClick={() => onNavigateModule('banners')}
              className="p-3.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F4ECE3] border border-[#EAE0D5] text-left transition-all"
            >
              <Sparkles size={18} className="text-[#B38E46] mb-1.5" />
              <strong className="block text-[#4A252B]">Hero Slides</strong>
              <span className="text-[10px] text-[#806F72]">Update main.jpg & copy</span>
            </button>
            <button
              onClick={() => onNavigateModule('media')}
              className="p-3.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F4ECE3] border border-[#EAE0D5] text-left transition-all"
            >
              <Award size={18} className="text-[#56775D] mb-1.5" />
              <strong className="block text-[#4A252B]">Image Assets</strong>
              <span className="text-[10px] text-[#806F72]">Folder structure paths</span>
            </button>
            <button
              onClick={() => onNavigateModule('orders')}
              className="p-3.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F4ECE3] border border-[#EAE0D5] text-left transition-all"
            >
              <ShoppingBag size={18} className="text-[#4A252B] mb-1.5" />
              <strong className="block text-[#4A252B]">Orders Pipeline</strong>
              <span className="text-[10px] text-[#806F72]">{pendingOrders} pending action</span>
            </button>
            <button
              onClick={() => onNavigateModule('enquiries')}
              className="p-3.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F4ECE3] border border-[#EAE0D5] text-left transition-all"
            >
              <MessageSquare size={18} className="text-[#9B4F52] mb-1.5" />
              <strong className="block text-[#4A252B]">Bespoke Bridal</strong>
              <span className="text-[10px] text-[#806F72]">{newEnquiries} new requests</span>
            </button>
            <button
              onClick={() => onNavigateModule('content')}
              className="p-3.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F4ECE3] border border-[#EAE0D5] text-left transition-all"
            >
              <Clock size={18} className="text-[#C5A059] mb-1.5" />
              <strong className="block text-[#4A252B]">Editorial Content</strong>
              <span className="text-[10px] text-[#806F72]">Story & Testimonials</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders Preview Table */}
      <div className="p-6 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#4A252B]">
              Recent Atelier Orders
            </h3>
            <p className="font-sans text-xs text-[#806F72] font-light">
              Latest client acquisitions from the storefront
            </p>
          </div>
          <button
            onClick={() => onNavigateModule('orders')}
            className="text-xs font-sans text-[#9B4F52] font-semibold uppercase hover:underline"
          >
            View All ({orders.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-[#EDE1D6] text-[10px] uppercase tracking-wider text-[#806F72]">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Client Name</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Payment</th>
                <th className="pb-3 font-semibold">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4ECE3]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF6F2] transition-colors">
                  <td className="py-3 font-mono font-medium text-[#4A252B]">{order.id}</td>
                  <td className="py-3 font-medium text-[#4A252B]">{order.customerName}</td>
                  <td className="py-3 text-[#806F72]">{order.orderDate}</td>
                  <td className="py-3 font-serif font-medium text-[#4A252B]">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        order.paymentStatus === 'Paid'
                          ? 'bg-[#EAF3EA] text-[#426E49]'
                          : 'bg-[#FAF0E6] text-[#9A5D3F]'
                      }`}
                    >
                      {order.paymentStatus} · {order.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-[#EAF3EA] text-[#426E49]'
                          : order.status === 'Ready to Ship'
                          ? 'bg-[#EAF1F8] text-[#3A6B94]'
                          : 'bg-[#FBF0E6] text-[#9B4F52]'
                      }`}
                    >
                      {order.status}
                    </span>
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
