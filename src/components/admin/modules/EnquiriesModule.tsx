import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Trash2,
  Eye,
  X,
  Bot,
  FileText,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface DbEnquiry {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  enquiry_type: string;
  product_interest?: string | null;
  message: string;
  source: 'CHATBOT' | 'CONTACT_FORM';
  status: 'NEW' | 'CONTACTED' | 'RESOLVED';
  created_at: string;
  updated_at: string;
}

interface EnquiryStats {
  total: number;
  new: number;
  contacted: number;
  resolved: number;
}

export const EnquiriesModule: React.FC = () => {
  const [enquiries, setEnquiries] = useState<DbEnquiry[]>([]);
  const [stats, setStats] = useState<EnquiryStats>({ total: 0, new: 0, contacted: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NEW' | 'CONTACTED' | 'RESOLVED'>('ALL');
  const [dateFilter, setDateFilter] = useState<'ALL' | 'TODAY' | 'WEEK' | 'MONTH'>('ALL');

  // Detail Modal & Delete Confirmation
  const [selectedEnquiry, setSelectedEnquiry] = useState<DbEnquiry | null>(null);
  const [enquiryToDelete, setEnquiryToDelete] = useState<DbEnquiry | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`/api/enquiries?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setEnquiries(data.enquiries || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  // Date filtering in memory
  const filteredEnquiries = enquiries.filter((enq) => {
    if (dateFilter === 'ALL') return true;
    const itemDate = new Date(enq.created_at);
    const now = new Date();
    if (dateFilter === 'TODAY') {
      return itemDate.toDateString() === now.toDateString();
    }
    if (dateFilter === 'WEEK') {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return itemDate >= oneWeekAgo;
    }
    if (dateFilter === 'MONTH') {
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return itemDate >= oneMonthAgo;
    }
    return true;
  });

  const handleStatusChange = async (id: string, newStatus: 'NEW' | 'CONTACTED' | 'RESOLVED') => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', message: `Status updated to ${newStatus}` });
        setTimeout(() => setFeedback(null), 3000);
        fetchEnquiries();
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to update status' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Network error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEnquiry = async () => {
    if (!enquiryToDelete) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/enquiries/${enquiryToDelete.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Enquiry deleted successfully' });
        setTimeout(() => setFeedback(null), 3000);
        setEnquiryToDelete(null);
        if (selectedEnquiry?.id === enquiryToDelete.id) {
          setSelectedEnquiry(null);
        }
        fetchEnquiries();
      } else {
        const data = await res.json();
        setFeedback({ type: 'error', message: data.error || 'Failed to delete enquiry' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Network error' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
              Enquiry Management
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#9B4F52] text-xs font-semibold border border-[#E8DBD2]">
              Live Database
            </span>
          </div>
          <p className="text-xs text-[#806F72] mt-0.5 font-light">
            Monitor, review and contact patrons who submitted enquiries via the Floating Concierge or Website Contact Forms.
          </p>
        </div>
        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#EADBCE] text-xs font-medium text-[#4A252B] hover:bg-[#FAF6F2] transition-colors shadow-sm self-start sm:self-auto"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin text-[#9B4F52]' : 'text-[#806F72]'} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Feedback banner */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#EADBCE] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#806F72] font-semibold">Total Enquiries</span>
            <MessageSquare size={16} className="text-[#C5A059]" />
          </div>
          <div className="font-serif text-2xl text-[#4A252B] font-medium mt-1">{stats.total}</div>
          <p className="text-[10px] text-[#806F72] mt-0.5">All customer submissions</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#EADBCE] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#9B4F52] font-semibold">New Enquiries</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#E05A47] animate-pulse" />
          </div>
          <div className="font-serif text-2xl text-[#9B4F52] font-medium mt-1">{stats.new}</div>
          <p className="text-[10px] text-[#806F72] mt-0.5">Requires initial callback</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#EADBCE] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#3A6B94] font-semibold">Contacted</span>
            <Clock size={16} className="text-[#3A6B94]" />
          </div>
          <div className="font-serif text-2xl text-[#3A6B94] font-medium mt-1">{stats.contacted}</div>
          <p className="text-[10px] text-[#806F72] mt-0.5">Consultation in progress</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#EADBCE] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#426E49] font-semibold">Resolved</span>
            <CheckCircle2 size={16} className="text-[#426E49]" />
          </div>
          <div className="font-serif text-2xl text-[#426E49] font-medium mt-1">{stats.resolved}</div>
          <p className="text-[10px] text-[#806F72] mt-0.5">Completed enquiries</p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#EADBCE] shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B8E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, email, mobile..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#FAF6F2] border border-[#E2D2C6] text-xs text-[#4A252B] placeholder-[#9A8B8E] focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-[#806F72]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF6F2] border border-[#E2D2C6] text-xs text-[#4A252B] outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New Only</option>
              <option value="CONTACTED">Contacted</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg bg-[#FAF6F2] border border-[#E2D2C6] text-xs text-[#4A252B] outline-none"
          >
            <option value="ALL">All Dates</option>
            <option value="TODAY">Today</option>
            <option value="WEEK">Last 7 Days</option>
            <option value="MONTH">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-xl bg-white border border-[#EADBCE] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6F2] border-b border-[#EDE1D6] text-[10px] uppercase tracking-wider text-[#806F72]">
                <th className="py-3 px-4 font-semibold">Customer Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Mobile Number</th>
                <th className="py-3 px-4 font-semibold">Enquiry Type</th>
                <th className="py-3 px-4 font-semibold">Product Interest</th>
                <th className="py-3 px-4 font-semibold">Source</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4ECE3]">
              {loading && enquiries.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#806F72]">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw size={16} className="animate-spin text-[#9B4F52]" />
                      <span>Loading database enquiries...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#806F72]">
                    <MessageSquare size={32} className="mx-auto text-[#D9C4B5] mb-2 stroke-1" />
                    <p className="font-medium text-[#4A252B]">No enquiries found</p>
                    <p className="text-[11px] text-[#806F72] mt-0.5">
                      Try adjusting your search criteria or filter options.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#FAF6F2] transition-colors">
                    {/* Customer Name */}
                    <td className="py-3 px-4">
                      <strong className="text-[#4A252B] font-medium block">{enq.customer_name}</strong>
                      <span className="font-mono text-[9px] text-[#9A8B8E]">{enq.id}</span>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-4">
                      <a
                        href={`mailto:${enq.email}`}
                        className="text-[#736366] hover:text-[#9B4F52] underline underline-offset-2 flex items-center gap-1"
                      >
                        <Mail size={11} className="text-[#9A8B8E]" />
                        <span>{enq.email}</span>
                      </a>
                    </td>

                    {/* Mobile Number */}
                    <td className="py-3 px-4">
                      <a
                        href={`tel:${enq.phone}`}
                        className="text-[#4A252B] font-mono text-[11px] hover:text-[#9B4F52] flex items-center gap-1"
                      >
                        <Phone size={11} className="text-[#9A8B8E]" />
                        <span>{enq.phone}</span>
                      </a>
                    </td>

                    {/* Enquiry Type */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#FAF6F2] border border-[#EADBCE] text-[10px] font-medium text-[#9B4F52]">
                        {enq.enquiry_type}
                      </span>
                    </td>

                    {/* Product Interest */}
                    <td className="py-3 px-4 text-[#4A252B] max-w-[140px] truncate">
                      {enq.product_interest || <span className="text-[#A39295] italic">General Enquiry</span>}
                    </td>

                    {/* Source */}
                    <td className="py-3 px-4">
                      {enq.source === 'CHATBOT' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F5EEF8] border border-[#E2CEEC] text-[10px] font-semibold text-[#6E3A82]">
                          <Bot size={11} />
                          <span>Chatbot</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F0F4F8] border border-[#D0DFEB] text-[10px] font-semibold text-[#2C5E8A]">
                          <FileText size={11} />
                          <span>Contact Form</span>
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-[#806F72] text-[11px]">
                      {new Date(enq.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
                        disabled={actionLoading}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold outline-none border transition-colors cursor-pointer ${
                          enq.status === 'NEW'
                            ? 'bg-[#FAF0E6] text-[#9B4F52] border-[#E8DBD2]'
                            : enq.status === 'RESOLVED'
                            ? 'bg-[#EAF3EA] text-[#426E49] border-[#A8CCA7]'
                            : 'bg-[#EAF1F8] text-[#3A6B94] border-[#B7D2EA]'
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          aria-label="View complete enquiry details"
                          className="p-1.5 rounded-lg border border-[#EADBCE] text-[#4A252B] hover:bg-[#FAF6F2] hover:border-[#9B4F52] transition-colors"
                          title="View Details"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() => setEnquiryToDelete(enq)}
                          aria-label="Delete enquiry"
                          className="p-1.5 rounded-lg border border-[#F0D5D5] text-[#9E2A2B] hover:bg-[#FDF2F2] transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW COMPLETE ENQUIRY DETAILS MODAL */}
      {selectedEnquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="w-full max-w-lg bg-[#FAF6F2] rounded-2xl border border-[#EADBCE] shadow-2xl p-6 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#EDE1D6] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9B4F52] font-semibold">
                  Enquiry Record
                </span>
                <h3 className="font-serif text-xl text-[#4A252B] font-medium">
                  {selectedEnquiry.customer_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-7 h-7 rounded-full border border-[#D9C4B5] flex items-center justify-center text-[#4A252B] hover:bg-[#4A252B] hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-[#EDE1D6]">
                <div>
                  <span className="text-[10px] text-[#806F72] block uppercase tracking-wider">Email</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-[#4A252B] font-medium hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-[#806F72] block uppercase tracking-wider">Mobile Number</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-[#4A252B] font-mono font-medium hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-[#806F72] block uppercase tracking-wider">Category</span>
                  <span className="text-[#9B4F52] font-semibold">{selectedEnquiry.enquiry_type}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#806F72] block uppercase tracking-wider">Product of Interest</span>
                  <span className="text-[#4A252B]">{selectedEnquiry.product_interest || 'General Atelier Consultation'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#806F72] block uppercase tracking-wider">Source Origin</span>
                  <span className="font-semibold text-[#6E3A82]">{selectedEnquiry.source}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#806F72] block uppercase tracking-wider">Submitted On</span>
                  <span className="text-[#736366]">{new Date(selectedEnquiry.created_at).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-[#806F72] block uppercase tracking-wider mb-1 font-semibold">
                  Customer Message / Requirements:
                </span>
                <div className="p-3.5 rounded-xl bg-white border border-[#EDE1D6] text-[#4A252B] text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Updater inside Modal */}
              <div className="flex items-center justify-between pt-2 border-t border-[#EDE1D6]">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#806F72]">Update Status:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as any)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#E2D2C6] text-xs font-semibold text-[#4A252B] outline-none"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>
                </div>

                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-lg bg-[#4A252B] text-white text-xs font-medium hover:bg-[#9B4F52] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {enquiryToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="w-full max-w-sm bg-white rounded-2xl border border-[#EDE1D6] shadow-2xl p-6 space-y-4 animate-scale-up text-center">
            <div className="w-12 h-12 rounded-full bg-[#FDF2F2] border border-[#F5C2C2] text-[#9E2A2B] flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#4A252B] font-medium">Delete Enquiry?</h4>
              <p className="text-xs text-[#806F72] mt-1">
                Are you sure you want to permanently delete the enquiry from <strong>{enquiryToDelete.customer_name}</strong>?
                This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setEnquiryToDelete(null)}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg border border-[#D9C4B5] text-xs font-medium text-[#4A252B] hover:bg-[#FAF6F2]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEnquiry}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg bg-[#9E2A2B] text-white text-xs font-medium hover:bg-[#7D1F20] transition-colors"
              >
                {actionLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
