import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { Product } from '@/types';
import { Heart, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';

export const BestsellersSection: React.FC = () => {
  const { products, addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useStore();
  const bestsellers = products.filter((p) => p.badge === 'Bestseller' || p.isFeatured).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3 flex items-center gap-2">
              <Sparkles size={13} className="text-[#C5A059]" />
              Patron Favorites
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A252B] tracking-[-0.02em] font-normal">
              Bestselling <em>Jewellery</em>
            </h2>
          </div>

          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-sans text-xs uppercase tracking-[0.16em] text-[#9B4F52] font-semibold hover:text-[#4A252B] transition-colors flex items-center gap-1.5"
          >
            <span>View All Pieces</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestsellers.map((product) => {
            const isLiked = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#FAF6F2] rounded-2xl overflow-hidden border border-[#EFE5DC] hover:border-[#C5A059] hover:shadow-xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-[#ECE0D3]">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    fallbackTitle={product.name}
                    fallbackCategory={product.category}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                    containerClassName="w-full h-full"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#4A252B] text-[#FAF6F2] text-[9px] uppercase tracking-widest font-semibold rounded-full shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                    className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center transition-all ${
                      isLiked ? 'text-[#9B4F52] bg-white' : 'text-[#806F72] hover:text-[#9B4F52]'
                    }`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>

                  {/* Quick View Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="px-4 py-2 rounded-full bg-white/95 text-[#4A252B] text-[11px] font-sans uppercase tracking-wider font-semibold shadow hover:bg-white flex items-center gap-1.5 transition-transform hover:scale-105"
                    >
                      <Eye size={13} />
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#9B4F52] uppercase tracking-widest mb-1 font-sans">
                      <span>{product.category}</span>
                      {product.karat && <span className="text-[#806F72]">{product.karat}</span>}
                    </div>

                    <h3 className="font-serif font-medium text-lg text-[#4A252B] group-hover:text-[#9B4F52] transition-colors leading-snug line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="font-sans text-[11px] text-[#806F72] mt-1.5 line-clamp-2 leading-relaxed font-light">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Add to Bag */}
                  <div className="pt-4 mt-3 border-t border-[#EDE1D6] flex items-center justify-between">
                    <div>
                      <div className="font-serif font-medium text-lg text-[#4A252B]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-[#806F72] line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      aria-label="Add to shopping bag"
                      className="px-3.5 py-2 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingBag size={13} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
