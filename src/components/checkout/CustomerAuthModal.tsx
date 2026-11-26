import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Lock, Mail, User, Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CustomerAuthModal: React.FC<{ isOpen: boolean; onClose: () => void; onSuccess: () => void }> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { customerLogin, customerRegister } = useStore();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        const res = await customerLogin(email, password);
        if (res.success) {
          onSuccess();
          onClose();
        } else {
          setError(res.error || 'Invalid email or password.');
        }
      } else {
        const res = await customerRegister({
          name,
          email,
          password,
          phone,
        });
        if (res.success) {
          onSuccess();
          onClose();
        } else {
          setError(res.error || 'Failed to create customer account.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#EADBCE] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-[#806F72] hover:text-[#4A252B]"
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border border-[#9B4F52] flex items-center justify-center font-serif text-xl text-[#9B4F52] mx-auto mb-2 bg-[#FAF6F2]">
            P
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9B4F52] font-semibold block mb-1">
            Praashi Patron Account
          </span>
          <h2 className="font-serif text-2xl text-[#4A252B] font-medium">
            {mode === 'signin' ? 'Sign In to Proceed' : 'Create Patron Account'}
          </h2>
          <p className="text-xs text-[#806F72] mt-1 font-light">
            {mode === 'signin'
              ? 'Sign in to access insured doorstep checkout and save your heirlooms.'
              : 'Join the Praashi inner circle for bespoke order tracking and private access.'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-[#FAF0F0] border border-[#E8BDBD] text-xs text-[#9B4F52]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                Full Name *
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806F72]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Aarohi Mehta"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
              Email Address *
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806F72]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                Mobile / WhatsApp Number
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806F72]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 00000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
              Password *
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806F72]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign In & Continue' : 'Create Account & Continue'}</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="mt-4 p-2.5 rounded-xl bg-[#FAF6F2] border border-[#EADBCE] text-[11px] text-[#736366] flex items-center justify-between">
          <span>Demo Customer:</span>
          <button
            type="button"
            onClick={() => {
              setEmail('customer@praashibysupal.com');
              setPassword('Customer@123');
              setMode('signin');
            }}
            className="text-[#9B4F52] font-semibold hover:underline"
          >
            Autofill Demo Login
          </button>
        </div>

        {/* Switch Mode Button */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
            }}
            className="text-xs text-[#9B4F52] hover:underline font-medium"
          >
            {mode === 'signin'
              ? 'New to Praashi? Create a patron account'
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
