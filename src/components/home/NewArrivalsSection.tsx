import React, { useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { JewelleryCategory, Product } from '@/types';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';

const TABS: JewelleryCategory[] = [
  'All Jewellery',
  'Gold',
  'Diamond',
  'Earrings',
  'Daily Wear',
  'Necklaces',
  'Rings',
  'Bracelets',
  'Bangles',
];

export const NewArrivalsSection: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
  } = useStore();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      const matchesCat =
        activeCategory === 'All Jewellery' ||
        p.category === activeCategory ||
        (activeCategory === 'Gold' && p.metalType === 'Gold') ||
        (activeCategory === 'Diamond' && p.metalType === 'Diamond') ||
        (activeCategory === 'Daily Wear' && (p.category === 'Daily Wear' || p.price < 25000));

      // Search query filter
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.metalType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <section id="products-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B4F52] mb-3 flex items-center gap-2">
              <Sparkles size={13} className="text-[#C5A059]" />
              The Latest From Our Atelier
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A252B] tracking-[-0.02em] font-normal">
              New <em>Arrivals</em>
            </h2>
          </div>

          <div className="text-sm font-sans text-[#806F72]">
            Showing <strong className="text-[#4A252B]">{filteredProducts.length}</strong> crafted creations
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-10 border-b border-[#EDE2D8]" style={{ scrollbarWidth: 'none' }}>
          {TABS.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-sans uppercase tracking-[0.08em] transition-all ${
                  isActive
                    ? 'bg-[#4A252B] text-white font-semibold shadow-sm'
                    : 'text-[#806F72] hover:text-[#4A252B] hover:bg-[#FAF6F2]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#FAF6F2] rounded-2xl border border-dashed border-[#D9C4B5] p-8">
            <h3 className="font-serif text-2xl text-[#4A252B] mb-2">No pieces found in this curation</h3>
            <p className="font-sans text-xs text-[#806F72] mb-6">
              Try adjusting your category filter or clearing the search query.
            </p>
            <button
              onClick={() => setActiveCategory('All Jewellery')}
              className="px-6 py-2.5 rounded-full bg-[#4A252B] text-white text-xs uppercase tracking-wider font-semibold"
            >
              View All Jewellery
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isLiked = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-[#FAF6F2] rounded-2xl overflow-hidden border border-[#EFE5DC] hover:border-[#C5A059] hover:shadow-xl transition-all duration-500"
                >
                  {/* Product Visual */}
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

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                      className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center transition-all ${
                        isLiked ? 'text-[#9B4F52] bg-white' : 'text-[#806F72] hover:text-[#9B4F52]'
                      }`}
                    >
                      <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    </button>

                    {/* Quick View Button */}
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

                  {/* Product Details */}
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

                    {/* Price and Cart */}
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
        )}
      </div>
    </section>
  );
};
