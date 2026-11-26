import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { CategoryNav, CATEGORIES } from '@/components/navigation/CategoryNav';
import {
  Search,
  ShoppingBag,
  Heart,
  CircleUserRound,
  Gem,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  Shield,
  ArrowRight,
  LogOut,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    setCartOpen,
    wishlist,
    setSearchOpen,
    settings,
    navigate,
    isAdminAuthenticated,
    adminUser,
    adminLogout,
    currentCustomer,
    customerLogout,
    setCustomerAuthModalOpen,
    setEnquiryModalOpen,
    setActiveCategory,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#F0E6DE] z-40 transition-all duration-300">
      {/* Top Announcement Bar with Live Gold Rate & Direct Admin Access */}
      <div className="bg-[#4A252B] text-[#F7ECE4] text-xs py-2 px-3 sm:px-6 tracking-[0.05em] flex items-center justify-between overflow-hidden">
        <div className="hidden md:flex items-center gap-4 text-[#DFC1B5]">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            Live Bullion: 24K Gold ₹{settings.goldRate24K.toLocaleString('en-IN')}/g · 22K ₹{settings.goldRate22K.toLocaleString('en-IN')}/g
          </span>
        </div>

        <div className="mx-auto text-center font-bold text-xs truncate px-2 text-[#FAF6F2]">
          {settings.announcementBar}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="hidden sm:flex text-[#DFC1B5] hover:text-white transition-colors items-center gap-1.5 uppercase tracking-widest text-[10px] font-semibold"
          >
            <PhoneCall size={12} className="text-[#C5A059]" />
            Bespoke Consultation
          </button>

          {/* Quick Admin Access Link in Announcement Bar */}
          <button
            onClick={() => navigate(isAdminAuthenticated ? '/admin' : '/admin/login')}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 hover:bg-[#C5A059] text-[#F3E5AB] hover:text-[#4A252B] transition-colors text-[10px] sm:text-[11px] font-bold uppercase tracking-wider"
            title="Access the Praashi Admin Atelier Portal"
          >
            <Shield size={12} />
            <span>{isAdminAuthenticated ? 'Admin Panel' : 'Admin Login'}</span>
          </button>
        </div>
      </div>

      {/* Main Brand & Search Navigation Row */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between gap-3 md:gap-8">
        {/* Mobile Menu Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#4A252B] p-2 -ml-1 rounded-lg hover:bg-[#FAF6F2] transition-colors focus:outline-none"
          aria-label="Toggle mobile navigation menu"
        >
          {mobileMenuOpen ? <X size={26} strokeWidth={2.2} /> : <Menu size={26} strokeWidth={2.2} />}
        </button>

        {/* Brand Mark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="flex items-center gap-2.5 sm:gap-3 group select-none"
          aria-label="Praashi by Supal - Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#9B4F52] flex items-center justify-center font-serif text-lg sm:text-xl text-[#9B4F52] group-hover:bg-[#9B4F52] group-hover:text-white transition-all duration-300 shadow-sm">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl sm:text-2xl tracking-[-0.02em] text-[#4A252B] leading-none">
              Praashi
            </span>
            <span className="font-sans text-[10px] sm:text-[10px] font-bold uppercase tracking-[0.26em] text-[#6D5D60] mt-0.5">
              by Supal
            </span>
          </div>
        </a>

        {/* Main Search Pill (Desktop) */}
        <button
          onClick={() => setSearchOpen(true)}
          aria-label="Search jewellery collections"
          className="hidden sm:flex flex-1 max-w-[500px] h-10 px-4 items-center gap-3 bg-[#FAF7F3] border border-[#E8DBD2] rounded-full text-xs text-[#5E4A4E] hover:border-[#C5A059] hover:bg-white hover:shadow-sm transition-all duration-300 group font-medium"
        >
          <Search size={16} className="text-[#9B4F52] group-hover:scale-110 transition-transform" />
          <span className="truncate">Search for diamond rings, 22K gold necklaces, bridal sets...</span>
          <span className="ml-auto flex items-center gap-1.5 text-[#C5A059]">
            <Gem size={14} />
            <Sparkles size={14} />
          </span>
        </button>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4 text-[#4A252B]">
          {/* Mobile Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-2 text-[#4A252B] hover:text-[#9B4F52] transition-colors"
            aria-label="Search"
          >
            <Search size={22} strokeWidth={2} />
          </button>

          {/* Bridal Enquiry Pill (Desktop) */}
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-bold border border-[#9B4F52]/40 rounded-full text-[#9B4F52] hover:bg-[#9B4F52] hover:text-white transition-all duration-300 shadow-sm"
          >
            <Sparkles size={13} />
            Bridal Atelier
          </button>

          {/* Customer Patron Account */}
          {currentCustomer ? (
            <button
              onClick={() => navigate('/checkout')}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-[#FAF6F2] border border-[#E8DBD2] hover:border-[#C5A059] transition-all flex items-center gap-1.5 group"
              title={`Patron: ${currentCustomer.name} (${currentCustomer.email})`}
            >
              <CircleUserRound size={19} strokeWidth={1.8} className="text-[#C5A059]" />
              <span className="hidden lg:inline text-xs font-bold text-[#4A252B]">
                {currentCustomer.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setCustomerAuthModalOpen(true)}
              className="p-2 text-[#4A252B] hover:text-[#9B4F52] transition-colors flex items-center gap-1 group"
              title="Patron Sign In / Register"
              aria-label="Patron Sign In"
            >
              <CircleUserRound size={21} strokeWidth={1.8} />
              <span className="hidden lg:inline text-xs font-semibold text-[#4A252B]">
                Sign In
              </span>
            </button>
          )}

          {/* Dedicated Admin Portal Button (Desktop & Tablet) */}
          <button
            onClick={() => navigate(isAdminAuthenticated ? '/admin' : '/admin/login')}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
              isAdminAuthenticated
                ? 'bg-[#56775D]/10 text-[#56775D] border-[#56775D]/30 hover:bg-[#56775D] hover:text-white'
                : 'bg-[#FAF6F2] text-[#4A252B] border-[#E8DBD2] hover:border-[#9B4F52] hover:text-[#9B4F52]'
            }`}
            title={isAdminAuthenticated ? `Logged in as ${adminUser?.name || 'Admin'}` : 'Admin Atelier Login (/admin/login)'}
          >
            <Shield size={14} className={isAdminAuthenticated ? 'text-[#56775D]' : 'text-[#C5A059]'} />
            <span>{isAdminAuthenticated ? 'Admin' : 'Admin'}</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              const el = document.getElementById('products-section') || document.getElementById('products');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative p-2 text-[#4A252B] hover:text-[#9B4F52] transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={21} strokeWidth={1.8} />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 min-w-[16px] h-[16px] px-1 bg-[#C5A059] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Drawer Action */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-[#4A252B] hover:text-[#9B4F52] transition-colors flex items-center gap-1"
            aria-label={`Shopping bag containing ${cartCount} items`}
          >
            <ShoppingBag size={21} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 min-w-[17px] h-[17px] px-1 bg-[#9B4F52] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Dedicated Jewellery Category Navigation (Directly Below Main Search Bar) */}
      <CategoryNav isSticky={isScrolled} />

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-fade-in">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div className="relative w-[85vw] max-w-sm h-full bg-[#FAF6F2] shadow-2xl flex flex-col z-50 border-r border-[#E8DBD2] overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 bg-[#4A252B] text-white flex items-center justify-between border-b border-[#3D1E23]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center font-serif text-base text-[#F3E5AB]">
                  P
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#FAF6F2] leading-none">
                    Praashi by Supal
                  </h3>
                  <span className="text-[9px] uppercase tracking-[0.24em] text-[#DFC1B5] font-semibold">
                    Royal Jewellery Atelier
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#DFC1B5] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Live Gold Rate Banner in Mobile Drawer */}
            <div className="px-4 py-2.5 bg-[#F0E6DE] text-[#4A252B] text-xs font-semibold flex items-center gap-2 border-b border-[#E2D2C6]">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse shrink-0" />
              <span>Live 22K Gold: ₹{settings.goldRate22K.toLocaleString('en-IN')}/g</span>
            </div>

            {/* Search Input in Mobile Drawer */}
            <div className="p-3.5 border-b border-[#E8DBD2] bg-white">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full h-11 px-3.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-xs text-[#6D5D60] font-semibold flex items-center gap-2.5"
              >
                <Search size={17} className="text-[#9B4F52]" />
                <span className="text-xs font-medium">Search jewellery, gold, diamonds...</span>
              </button>
            </div>

            {/* Mobile Categories Navigation List */}
            <div className="p-4 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9B4F52] mb-3">
                Jewellery Categories
              </p>
              <div className="space-y-1">
                {CATEGORIES.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveCategory(id);
                      setMobileMenuOpen(false);
                      if (window.location.pathname !== '/') {
                        navigate('/');
                      }
                      setTimeout(() => {
                        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white transition-all text-left text-sm font-bold text-[#4A252B] border border-transparent hover:border-[#E8DBD2]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#C5A059]">
                        <Icon size={20} />
                      </span>
                      <span className="font-semibold text-sm">{label}</span>
                    </div>
                    <ChevronRight size={16} className="text-[#A38E91]" />
                  </button>
                ))}
              </div>

              {/* Consultation & WhatsApp Actions */}
              <div className="mt-6 pt-4 border-t border-[#E8DBD2] space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9B4F52] mb-2">
                  Atelier Assistance
                </p>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setEnquiryModalOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#4A252B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles size={15} className="text-[#C5A059]" />
                  <span>Book Bespoke Consultation</span>
                </button>

                <a
                  href={`https://wa.me/${settings.whatsappConcierge.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#1E7E34] text-xs font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Concierge: {settings.whatsappConcierge}</span>
                </a>
              </div>

              {/* Patron Account Section */}
              <div className="mt-6 pt-4 border-t border-[#E8DBD2]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9B4F52] mb-2">
                  Patron Account
                </p>
                {currentCustomer ? (
                  <div className="p-3 bg-white rounded-xl border border-[#E8DBD2] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs">
                        <p className="font-bold text-[#4A252B]">{currentCustomer.name}</p>
                        <p className="text-[#806F72] text-[11px]">{currentCustomer.email}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF6F2] text-[#9B4F52] border border-[#E8DBD2]">
                        Patron
                      </span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/checkout');
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-[#4A252B] text-white text-xs font-bold"
                      >
                        Checkout / Bag
                      </button>
                      <button
                        onClick={() => customerLogout()}
                        className="py-1.5 px-3 rounded-lg border border-[#E8DBD2] text-xs font-semibold text-[#806F72] hover:text-[#9B4F52]"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCustomerAuthModalOpen(true);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#E8DBD2] text-xs font-bold text-[#4A252B] hover:border-[#9B4F52] flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <CircleUserRound size={17} className="text-[#C5A059]" />
                      Sign In to Patron Account
                    </span>
                    <ArrowRight size={14} className="text-[#9B4F52]" />
                  </button>
                )}
              </div>

              {/* Prominent Admin Login Section in Mobile Drawer */}
              <div className="mt-6 pt-4 border-t border-[#E8DBD2]">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#4A252B] to-[#2D161A] text-white shadow-md">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Shield size={16} className="text-[#F3E5AB]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F3E5AB]">
                      Atelier Staff &amp; Admin
                    </span>
                  </div>
                  <p className="text-[11px] text-[#DFC1B5] font-light leading-relaxed mb-3">
                    Direct access to product inventory, orders, customer enquiries and bullion rates.
                  </p>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(isAdminAuthenticated ? '/admin' : '/admin/login');
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-[#FAF6F2] hover:bg-white text-[#4A252B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>{isAdminAuthenticated ? 'Open Admin Dashboard' : 'Admin Login (/admin/login)'}</span>
                    <ArrowRight size={14} />
                  </button>
                  {isAdminAuthenticated && (
                    <div className="mt-2 text-center">
                      <button
                        onClick={() => {
                          adminLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="text-[10px] text-[#DFC1B5] hover:text-white underline font-medium"
                      >
                        Sign Out of Admin Session
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#F0E6DE] text-center text-[10px] text-[#806F72] border-t border-[#E2D2C6]">
              © {new Date().getFullYear()} Praashi by Supal. All Rights Reserved.
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
