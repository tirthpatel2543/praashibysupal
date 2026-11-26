import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Shield, Lock, Mail, ArrowRight, Sparkles, KeyRound } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { adminLogin, navigate } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = adminLogin(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
      setIsSubmitting(false);
    }, 400);
  };

  const handleFillDemo = () => {
    const demoEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@praashibysupal.com';
    const demoPass = import.meta.env.VITE_ADMIN_PASSWORD || 'Praashi@Admin2026!';
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#FBF5F0] flex flex-col justify-center items-center p-4 sm:p-6 text-[#25231F] selection:bg-[#EADBCE]">
      {/* Return to Storefront link */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-xs font-sans uppercase tracking-[0.16em] text-[#806F72] hover:text-[#4A252B] transition-colors flex items-center gap-1.5"
      >
        <span>&larr; Return to Storefront</span>
      </button>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-2xl border border-[#E8DBD2]">
        {/* Brand Monogram */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full border border-[#9B4F52] flex items-center justify-center font-serif text-2xl text-[#9B4F52] mx-auto mb-3 shadow-sm bg-[#FAF6F2]">
            P
          </div>
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#9B4F52] font-semibold block mb-1">
            Protected Atelier Workspace
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#4A252B] font-medium">
            Praashi Admin Portal
          </h2>
          <p className="font-sans text-xs text-[#806F72] mt-1 font-light">
            Sign in to manage catalogue, bullion rates, orders and bespoke requests.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-[#FAF0F0] border border-[#E8BDBD] text-xs text-[#9B4F52] leading-relaxed">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1.5 font-semibold">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806F72]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@praashibysupal.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52] focus:bg-white transition-all text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1.5 font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806F72]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52] focus:bg-white transition-all text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 rounded-xl bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:translate-y-[-1px] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to Atelier</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Development Demo Credentials Autofill Helper */}
        <div className="mt-8 pt-6 border-t border-[#F0E6DE] text-center">
          <div className="p-4 rounded-xl bg-[#FAF6F2] border border-[#EADBCE] text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#4A252B] flex items-center gap-1.5">
                <KeyRound size={14} className="text-[#C5A059]" />
                Demo Admin Credentials
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="px-2.5 py-1 rounded-md bg-[#4A252B] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#9B4F52] transition-colors"
              >
                1-Click Autofill
              </button>
            </div>
            <div className="text-xs text-[#6D5D60] space-y-0.5">
              <p><strong className="text-[#4A252B]">Email:</strong> admin@praashibysupal.com</p>
              <p><strong className="text-[#4A252B]">Password:</strong> Praashi@Admin2026!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
