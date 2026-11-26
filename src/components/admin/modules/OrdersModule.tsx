import React, { useState, useEffect, useCallback } from 'react';
import {
  ShoppingBag,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  X,
  Search,
  Filter,
  CreditCard,
  MapPin,
  RefreshCw,
  Trash2,
  AlertCircle,
  Package,
} from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface DbOrder {
  id: string;
  order_number: string;
  customer_id?: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address_line: string;
  city: string;
  state: string;
  pin_code: string;
  country: string;
  subtotal: number;
  shipping_charges: number;
  total_amount: number;
  payment_status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  order_status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  payment_reference?: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

const ORDER_STATUS_OPTIONS = [
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

const PAYMENT_STATUS_OPTIONS = ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'];

export const OrdersModule: React.FC = () => {
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');

  // Selected Order for Modal
  const [selectedOrder, setSelectedOrder] = useState<DbOrder | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (orderStatusFilter !== 'ALL') params.append('status', orderStatusFilter);
      if (paymentFilter !== 'ALL') params.append('payment', paymentFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      }
    } catch (err: any) {
      console.error('Failed to fetch admin orders:', err);
    } finally {
      setLoading(false);
    }
  }, [orderStatusFilter, paymentFilter, searchQuery]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateOrderStatus = async (
    orderId: string,
    updates: { orderStatus?: string; paymentStatus?: string }
  ) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Order updated successfully in database.' });
        setTimeout(() => setFeedback(null), 3000);
        fetchOrders();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(data.order);
        }
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to update order status.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Network error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCleanTestOrders = async () => {
    if (!window.confirm('Clean test orders created by demo accounts? Real customer orders will be preserved.')) {
      return;
    }
    try {
      const res = await fetch('/api/admin/orders/clean-test', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', message: `Cleaned ${data.cleanedCount} test orders.` });
        setTimeout(() => setFeedback(null), 3000);
        fetchOrders();
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to clean test orders.' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
              Order Management & Fulfillment
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAF3EA] text-[#2C6E33] text-xs font-semibold border border-[#B6DCB9]">
              Database Synchronized
            </span>
          </div>
          <p className="text-xs text-[#806F72] mt-0.5 font-light">
            Review high-value jewellery orders, inspect delivery addresses, track payment references, and advance fulfillment statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#EADBCE] text-xs font-medium text-[#4A252B] hover:bg-[#FAF6F2] transition-colors shadow-sm"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin text-[#9B4F52]' : 'text-[#806F72]'} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleCleanTestOrders}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#F0D5D5] text-xs font-medium text-[#9E2A2B] hover:bg-[#FDF2F2] transition-colors shadow-sm"
            title="Clean test orders from development testing"
          >
            <Trash2 size={13} />
            <span>Clean Test Orders</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`px-4 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-[#EAF3EA] text-[#2C6E33] border border-[#B6DCB9]'
              : 'bg-[#FDF2F2] text-[#9E2A2B] border border-[#F5C2C2]'
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#EADBCE] shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B8E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order Number, Customer, Phone..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#FAF6F2] border border-[#E2D2C6] text-xs text-[#4A252B] placeholder-[#9A8B8E] focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Order Status Filter */}
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-[#806F72]" />
            <select
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF6F2] border border-[#E2D2C6] text-xs text-[#4A252B] outline-none"
            >
              <option value="ALL">All Order Statuses</option>
              {ORDER_STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Status Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#FAF6F2] border border-[#E2D2C6] text-xs text-[#4A252B] outline-none"
          >
            <option value="ALL">All Payment Statuses</option>
            {PAYMENT_STATUS_OPTIONS.map((pst) => (
              <option key={pst} value={pst}>
                Payment: {pst}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl bg-white border border-[#EADBCE] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6F2] border-b border-[#EDE1D6] text-[10px] uppercase tracking-wider text-[#806F72]">
                <th className="py-3 px-4 font-semibold">Order Number</th>
                <th className="py-3 px-4 font-semibold">Customer Details</th>
                <th className="py-3 px-4 font-semibold">Delivery City & PIN</th>
                <th className="py-3 px-4 font-semibold">Pieces</th>
                <th className="py-3 px-4 font-semibold">Total Amount</th>
                <th className="py-3 px-4 font-semibold">Payment Status</th>
                <th className="py-3 px-4 font-semibold">Order Status</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4ECE3]">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#806F72]">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw size={16} className="animate-spin text-[#9B4F52]" />
                      <span>Loading orders from database...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#806F72]">
                    <ShoppingBag size={32} className="mx-auto text-[#D9C4B5] mb-2 stroke-1" />
                    <p className="font-medium text-[#4A252B]">No orders recorded</p>
                    <p className="text-[11px] text-[#806F72] mt-0.5">
                      New orders placed via checkout will automatically appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF6F2] transition-colors">
                    {/* Order Number */}
                    <td className="py-3 px-4 font-mono font-bold text-[#4A252B]">
                      {order.order_number}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#4A252B]">{order.customer_name}</div>
                      <div className="text-[10px] text-[#806F72]">{order.customer_email}</div>
                      <div className="text-[10px] text-[#806F72] font-mono">{order.customer_phone}</div>
                    </td>

                    {/* City & PIN */}
                    <td className="py-3 px-4 text-[#736366]">
                      <div>{order.city}, {order.state}</div>
                      <div className="font-mono text-[10px] text-[#9A8B8E]">PIN: {order.pin_code}</div>
                    </td>

                    {/* Items Count */}
                    <td className="py-3 px-4 text-[#806F72]">
                      <span className="font-semibold text-[#4A252B]">{order.items?.length || 0}</span> piece(s)
                    </td>

                    {/* Total Amount */}
                    <td className="py-3 px-4 font-serif font-medium text-sm text-[#4A252B]">
                      ₹{order.total_amount.toLocaleString('en-IN')}
                    </td>

                    {/* Payment Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          order.payment_status === 'SUCCESS'
                            ? 'bg-[#EAF3EA] text-[#2C6E33] border-[#B6DCB9]'
                            : order.payment_status === 'FAILED'
                            ? 'bg-[#FDF2F2] text-[#9E2A2B] border-[#F5C2C2]'
                            : 'bg-[#FFF9EA] text-[#8C6D1F] border-[#EED799]'
                        }`}
                      >
                        {order.payment_status === 'SUCCESS' && <CheckCircle2 size={11} />}
                        {order.payment_status === 'FAILED' && <AlertCircle size={11} />}
                        {order.payment_status === 'PENDING' && <Clock size={11} />}
                        <span>{order.payment_status}</span>
                      </span>
                      {order.payment_reference && (
                        <div className="text-[9px] font-mono text-[#9A8B8E] mt-0.5 truncate max-w-[110px]" title={order.payment_reference}>
                          Ref: {order.payment_reference}
                        </div>
                      )}
                    </td>

                    {/* Order Workflow Status */}
                    <td className="py-3 px-4">
                      <select
                        value={order.order_status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(order.id, { orderStatus: e.target.value })
                        }
                        disabled={actionLoading}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold outline-none border cursor-pointer ${
                          order.order_status === 'DELIVERED' || order.order_status === 'CONFIRMED'
                            ? 'bg-[#EAF3EA] text-[#426E49] border-[#A8CCA7]'
                            : order.order_status === 'SHIPPED'
                            ? 'bg-[#EAF1F8] text-[#3A6B94] border-[#B7D2EA]'
                            : order.order_status === 'CANCELLED'
                            ? 'bg-[#FDF2F2] text-[#9E2A2B] border-[#F5C2C2]'
                            : 'bg-[#FAF0E6] text-[#9B4F52] border-[#E8DBD2]'
                        }`}
                      >
                        {ORDER_STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-[#806F72] text-[11px]">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </td>

                    {/* Details Button */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#EADBCE] text-[11px] font-medium text-[#4A252B] hover:bg-[#FAF6F2] hover:border-[#9B4F52] transition-colors"
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPLETE ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF6F2] rounded-2xl border border-[#EADBCE] shadow-2xl p-6 space-y-5 animate-scale-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EDE1D6] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9B4F52] font-semibold">
                  Order Breakdown
                </span>
                <h3 className="font-serif text-2xl text-[#4A252B] font-medium">
                  {selectedOrder.order_number}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full border border-[#D9C4B5] flex items-center justify-center text-[#4A252B] hover:bg-[#4A252B] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#EDE1D6] space-y-1 text-xs">
                <span className="text-[10px] text-[#806F72] uppercase tracking-wider block font-semibold mb-1">
                  Patron Information
                </span>
                <div className="text-sm font-medium text-[#4A252B]">{selectedOrder.customer_name}</div>
                <div className="text-[#736366]">{selectedOrder.customer_email}</div>
                <div className="font-mono text-[#736366]">{selectedOrder.customer_phone}</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#EDE1D6] space-y-1 text-xs">
                <span className="text-[10px] text-[#806F72] uppercase tracking-wider block font-semibold mb-1 flex items-center gap-1">
                  <MapPin size={12} className="text-[#9B4F52]" />
                  <span>Insured Delivery Address</span>
                </span>
                <div className="text-[#4A252B]">{selectedOrder.address_line}</div>
                <div className="text-[#736366]">
                  {selectedOrder.city}, {selectedOrder.state} — {selectedOrder.pin_code}
                </div>
                <div className="text-[11px] text-[#9A8B8E]">{selectedOrder.country}</div>
              </div>
            </div>

            {/* Order Items Table */}
            <div className="bg-white rounded-xl border border-[#EDE1D6] overflow-hidden">
              <div className="p-3 bg-[#FAF6F2] border-b border-[#EDE1D6] font-semibold text-xs text-[#4A252B]">
                Ordered Jewellery Pieces ({selectedOrder.items?.length || 0})
              </div>
              <div className="divide-y divide-[#F4ECE3] max-h-56 overflow-y-auto">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-3 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#ECE0D3] overflow-hidden shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          fallbackTitle={item.name}
                          fallbackCategory={item.category}
                          className="w-full h-full object-cover"
                          containerClassName="w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif text-sm font-medium text-[#4A252B] truncate">{item.name}</h5>
                        <p className="text-[11px] text-[#806F72]">{item.category} • Qty: {item.quantity}</p>
                      </div>
                      <div className="font-serif text-sm font-semibold text-[#4A252B]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-[#806F72]">No item rows recorded for this order.</div>
                )}
              </div>

              {/* Order Financials Summary */}
              <div className="p-4 bg-[#FAF6F2] border-t border-[#EDE1D6] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#736366]">
                  <span>Item Subtotal</span>
                  <span>₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#736366]">
                  <span>Insured Transit Shipping</span>
                  <span>{selectedOrder.shipping_charges === 0 ? 'Complimentary' : `₹${selectedOrder.shipping_charges}`}</span>
                </div>
                <div className="flex justify-between font-serif text-base font-semibold text-[#4A252B] pt-1 border-t border-[#EADBCE]">
                  <span>Total Amount Paid</span>
                  <span>₹{selectedOrder.total_amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Quick Status Modifiers */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#EDE1D6]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#806F72]">Update Order Status:</span>
                <select
                  value={selectedOrder.order_status}
                  onChange={(e) =>
                    handleUpdateOrderStatus(selectedOrder.id, { orderStatus: e.target.value })
                  }
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#E2D2C6] text-xs font-semibold text-[#4A252B] outline-none"
                >
                  {ORDER_STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#806F72]">Payment Status:</span>
                <select
                  value={selectedOrder.payment_status}
                  onChange={(e) =>
                    handleUpdateOrderStatus(selectedOrder.id, { paymentStatus: e.target.value })
                  }
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#E2D2C6] text-xs font-semibold text-[#4A252B] outline-none"
                >
                  {PAYMENT_STATUS_OPTIONS.map((pst) => (
                    <option key={pst} value={pst}>
                      {pst}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
