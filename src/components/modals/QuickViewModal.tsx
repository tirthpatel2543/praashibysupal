import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { X, Heart, ShoppingBag, Award, ShieldCheck, Sparkles } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useStore();

  if (!quickViewProduct) return null;
  const isLiked = wishlist.includes(quickViewProduct.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-3xl bg-[#FAF6F2] rounded-2xl overflow-hidden shadow-2xl border border-[#EADBCE] grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 border border-[#E8DBD2] flex items-center justify-center text-[#4A252B] hover:bg-[#4A252B] hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Product Visual */}
        <div className="relative aspect-square md:aspect-auto h-full min-h-[350px] bg-[#ECE0D3]">
          <ImageWithFallback
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            fallbackTitle={quickViewProduct.name}
            fallbackCategory={quickViewProduct.category}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
          {quickViewProduct.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-[#4A252B] text-[#FAF6F2] text-[9px] uppercase tracking-widest font-semibold rounded-full shadow">
              {quickViewProduct.badge}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#9B4F52] uppercase tracking-widest mb-1.5 font-sans font-semibold">
              <span>{quickViewProduct.category}</span>
              {quickViewProduct.karat && <span className="text-[#806F72]">{quickViewProduct.karat}</span>}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#4A252B] font-medium leading-tight mb-3">
              {quickViewProduct.name}
            </h2>

            <div className="font-serif text-2xl text-[#4A252B] font-semibold mb-4">
              ₹{quickViewProduct.price.toLocaleString('en-IN')}
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#806F72] font-normal line-through ml-2">
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="font-sans text-xs text-[#736366] leading-relaxed mb-6 font-light">
              {quickViewProduct.description}
            </p>

            {/* Hallmarking & Certificate highlights */}
            <div className="space-y-2 p-3.5 rounded-xl bg-white/70 border border-[#E8DBD2] mb-6 text-xs text-[#4A252B]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#B38E46]" />
                <span>100% BIS 916 Hallmarked & Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={15} className="text-[#B38E46]" />
                <span>Complimentary Insured Express Delivery</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#EDE1D6]">
            <button
              onClick={() => addToCart(quickViewProduct)}
              className="w-full py-3.5 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow"
            >
              <ShoppingBag size={15} />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              onClick={() => toggleWishlist(quickViewProduct.id)}
              className="w-full py-2.5 rounded-full border border-[#D9C4B5] text-[#4A252B] hover:bg-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} className={isLiked ? 'text-[#9B4F52]' : ''} />
              <span>{isLiked ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
