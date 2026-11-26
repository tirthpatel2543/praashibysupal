import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cartOpen,
    setCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    createOrder,
    settings,
    currentCustomer,
    setCustomerAuthModalOpen,
    navigate,
  } = useStore();

  if (!cartOpen) return null;

  const freeShippingThreshold = settings.shippingThresholdFree || 5000;
  const isFreeShipping = cartTotal >= freeShippingThreshold;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    if (!currentCustomer) {
      setCustomerAuthModalOpen(true);
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end"
    >
      <div className="w-full max-w-md bg-[#FAF6F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#EADBCE] animate-drawer-in">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#EDE1D6] flex items-center justify-between">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#9B4F52] font-semibold">
              Your Selection
            </p>
            <h2 className="font-serif text-2xl text-[#4A252B] font-medium">
              Shopping Bag <span className="text-[#C5A059] text-base font-normal">({cartCount})</span>
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close shopping bag"
            className="w-8 h-8 rounded-full border border-[#D9C4B5] flex items-center justify-center text-[#4A252B] hover:bg-[#4A252B] hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Indicator */}
        <div className="px-6 py-2.5 bg-[#F4ECE3] border-b border-[#EADBCE] text-[11px] font-sans text-[#736366] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#B38E46]" />
            <span>
              {isFreeShipping
                ? '✦ You have unlocked complimentary insured shipping'
                : `Add ₹${(freeShippingThreshold - cartTotal).toLocaleString('en-IN')} more for free insured shipping`}
            </span>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#806F72]">
              <ShoppingBag size={40} className="text-[#D9C4B5] mb-3 stroke-1" />
              <p className="font-serif text-lg text-[#4A252B] mb-1">Your bag is empty</p>
              <p className="font-sans text-xs text-[#806F72] mb-6">
                Explore our fine jewellery collections to find your signature heirloom.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#4A252B] text-white text-xs uppercase tracking-wider font-semibold"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white border border-[#EAE0D5] shadow-sm"
              >
                {/* Thumb */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#ECE0D3] shrink-0">
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    fallbackTitle={item.product.name}
                    fallbackCategory={item.product.category}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="font-sans text-[9px] uppercase tracking-wider text-[#9B4F52] block">
                    {item.product.category}
                  </span>
                  <h4 className="font-serif text-sm font-medium text-[#4A252B] truncate">
                    {item.product.name}
                  </h4>
                  <div className="font-serif text-sm text-[#4A252B] font-semibold mt-0.5">
                    ₹{item.product.price.toLocaleString('en-IN')}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-5 h-5 rounded border border-[#D9C4B5] flex items-center justify-center text-[#4A252B] hover:bg-[#F4ECE3]"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-5 h-5 rounded border border-[#D9C4B5] flex items-center justify-center text-[#4A252B] hover:bg-[#F4ECE3]"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label="Remove item"
                  className="p-1.5 text-[#806F72] hover:text-[#9B4F52] transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#EDE1D6] bg-white space-y-4">
            <div className="space-y-1.5 text-xs font-sans text-[#736366]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-serif text-base font-medium text-[#4A252B]">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Insured Shipping</span>
                <span className="text-[#56775D] font-medium">Complimentary</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
