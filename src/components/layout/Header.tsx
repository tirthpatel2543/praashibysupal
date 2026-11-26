import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { CategoryNav } from '@/components/navigation/CategoryNav';
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
    currentCustomer,
    setCustomerAuthModalOpen,
    setEnquiryModalOpen,
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

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#F0E6DE] z-40 transition-all duration-300">
      {/* Top Announcement Bar with Live Gold Rate */}
      <div className="bg-[#4A252B] text-[#F7ECE4] text-[10px] sm:text-[11px] py-1.5 px-4 tracking-[0.08em] flex items-center justify-between overflow-hidden">
        <div className="hidden md:flex items-center gap-4 text-[#DFC1B5]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            Live Bullion: 24K Gold ₹{settings.goldRate24K.toLocaleString('en-IN')}/g · 22K ₹{settings.goldRate22K.toLocaleString('en-IN')}/g
          </span>
        </div>
        <div className="mx-auto text-center font-medium truncate px-2">
          {settings.announcementBar}
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="text-[#DFC1B5] hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-widest text-[9px]"
          >
            <PhoneCall size={11} className="text-[#C5A059]" />
            Bespoke Consultation
          </button>
        </div>
      </div>

      {/* Main Brand & Search Navigation Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5 sm:py-4 flex items-center justify-between gap-4 md:gap-8">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#4A252B] p-1.5 focus:outline-none"
          aria-label="Toggle mobile navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#9B4F52] flex items-center justify-center font-serif text-base sm:text-lg text-[#9B4F52] group-hover:bg-[#9B4F52] group-hover:text-white transition-all duration-300">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-semibold text-lg sm:text-2xl tracking-[-0.03em] text-[#4A252B] leading-none">
              Praashi
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#806F72] mt-0.5">
              by Supal
            </span>
          </div>
        </a>

        {/* Main Search Pill */}
        <button
          onClick={() => setSearchOpen(true)}
          aria-label="Search jewellery collections"
          className="hidden sm:flex flex-1 max-w-[520px] h-10 px-4 items-center gap-3 bg-[#FAF7F3] border border-[#E8DBD2] rounded-full text-xs text-[#806F72] hover:border-[#C5A059] hover:bg-white hover:shadow-sm transition-all duration-300 group"
        >
          <Search size={15} className="text-[#9B4F52] group-hover:scale-110 transition-transform" />
          <span className="truncate">Search for diamond rings, 22K gold necklaces, bridal sets...</span>
          <span className="ml-auto flex items-center gap-1.5 text-[#C5A059]">
            <Gem size={13} />
            <Sparkles size={13} />
          </span>
        </button>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 sm:gap-5 text-[#4A252B]">
          {/* Mobile search icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-1.5 hover:text-[#9B4F52] transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Bridal Enquiry Pill */}
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold border border-[#9B4F52]/40 rounded-full text-[#9B4F52] hover:bg-[#9B4F52] hover:text-white transition-all duration-300"
          >
            <Sparkles size={12} />
            Bridal Atelier
          </button>

          {/* Admin / Customer Account Icon */}
          {currentCustomer ? (
            <button
              onClick={() => navigate('/checkout')}
              className="relative p-1.5 hover:text-[#9B4F52] transition-colors flex items-center gap-1 group"
              title={`Patron: ${currentCustomer.name} (${currentCustomer.email})`}
            >
              <CircleUserRound size={20} strokeWidth={1.6} className="text-[#C5A059]" />
              <span className="hidden lg:inline text-[10px] uppercase tracking-wider text-[#4A252B] font-semibold">
                {currentCustomer.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => navigate(isAdminAuthenticated ? '/admin' : '/admin/login')}
              className="relative p-1.5 hover:text-[#9B4F52] transition-colors flex items-center gap-1 group"
              aria-label={isAdminAuthenticated ? 'Go to Admin Dashboard' : 'Admin Login'}
              title={isAdminAuthenticated ? `Logged in as ${adminUser?.name || 'Admin'}` : 'Admin Atelier Login'}
            >
              <CircleUserRound size={20} strokeWidth={1.6} />
              {isAdminAuthenticated && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#56775D] rounded-full border-2 border-white" />
              )}
              <span className="hidden lg:inline text-[10px] uppercase tracking-wider text-[#806F72] group-hover:text-[#9B4F52]">
                {isAdminAuthenticated ? 'Admin' : 'Atelier'}
              </span>
            </button>
          )}

          {/* Wishlist */}
          <button
            onClick={() => {
              const el = document.getElementById('products-section') || document.getElementById('products');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative p-1.5 hover:text-[#9B4F52] transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={20} strokeWidth={1.6} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-1 bg-[#C5A059] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Drawer Action */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-1.5 hover:text-[#9B4F52] transition-colors flex items-center gap-1.5"
            aria-label={`Shopping bag containing ${cartCount} items`}
          >
            <ShoppingBag size={20} strokeWidth={1.6} />
            <span className="min-w-[17px] h-[17px] px-1 bg-[#9B4F52] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Dedicated Jewellery Category Navigation (Directly Below Main Search Bar) */}
      <CategoryNav isSticky={isScrolled} />
    </header>
  );
};
