import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Truck,
  Award,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    clearCart,
    currentCustomer,
    settings,
    navigate,
  } = useStore();

  // Customer Form Details
  const [fullName, setFullName] = useState(currentCustomer?.name || '');
  const [email, setEmail] = useState(currentCustomer?.email || '');
  const [phone, setPhone] = useState(currentCustomer?.phone || '');

  // Delivery Address
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pinCode, setPinCode] = useState('');
  const [country] = useState('India');

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'UPI' | 'Card'>('Razorpay');

  // Processing & Simulation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [currentOrderData, setCurrentOrderData] = useState<any>(null);

  // Confirmed Order State
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Client calculations for display (final calculation is strictly enforced on server)
  const clientSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const clientShipping = clientSubtotal >= (settings.shippingThresholdFree || 5000) ? 0 : 250;
  const clientGrandTotal = clientSubtotal + clientShipping;

  // Handle Initiate Order
  const handleInitiateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side quick check
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please complete all contact information.');
      return;
    }
    if (!addressLine.trim() || !city.trim() || !pinCode.trim()) {
      setErrorMessage('Please complete your full delivery street address and PIN code.');
      return;
    }
    if (cart.length === 0) {
      setErrorMessage('Your bag is empty.');
      return;
    }

    setIsProcessing(true);

    try {
      // STEP 5: Server-side Order Creation with Database validation & server price calculation
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: currentCustomer?.id,
          customerName: fullName.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          addressLine: addressLine.trim(),
          city: city.trim(),
          state: state.trim(),
          pinCode: pinCode.trim(),
          country,
          items: cart.map((c) => ({
            productId: c.product.id,
            quantity: c.quantity,
          })),
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Server rejected order creation. Please check your details.');
        setIsProcessing(false);
        return;
      }

      // Order created in DB! Open Razorpay Payment gateway / test dialog
      setCurrentOrderData(data);
      setIsProcessing(false);
      setPaymentModalOpen(true);
    } catch (err: any) {
      setErrorMessage('Network connection error connecting to server API.');
      setIsProcessing(false);
    }
  };

  // STEP 6: Razorpay Payment Simulation (Supports Success and Failure for Test E & F)
  const handleSimulatePayment = async (status: 'SUCCESS' | 'FAILED') => {
    if (!currentOrderData) return;
    setIsProcessing(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/orders/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: currentOrderData.orderId,
          razorpayPaymentId: status === 'SUCCESS' ? `pay_rzp_${Date.now()}` : null,
          razorpayOrderId: currentOrderData.razorpay.orderId,
          razorpaySignature: status === 'SUCCESS' ? `sig_${Date.now()}` : null,
          paymentStatus: status,
          paymentMethod,
        }),
      });

      const verifyData = await res.json();

      if (status === 'SUCCESS' && res.ok && verifyData.success) {
        // STEP 7: Success! Clear cart and display order confirmation
        clearCart();
        setPaymentModalOpen(false);
        setConfirmedOrder({
          ...verifyData.order,
          items: verifyData.items,
        });
      } else {
        // STEP 6 Failure case (TEST F):
        // Show failure, DO NOT confirm order, DO NOT clear cart
        setPaymentModalOpen(false);
        setErrorMessage(
          verifyData.error || 'Payment failed or was declined by bank. Your cart has been preserved.'
        );
      }
    } catch (err: any) {
      setErrorMessage('Payment verification request failed.');
      setPaymentModalOpen(false);
    } finally {
      setIsProcessing(false);
    }
  };

  // STEP 7: Order Confirmation View
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#FBF5F0] py-16 px-4 sm:px-6 lg:px-10 flex items-center justify-center font-sans text-[#25231F]">
        <div className="w-full max-w-2xl bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#EADBCE] text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#EAF3EA] text-[#426E49] mx-auto mb-4 flex items-center justify-center shadow-inner">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-[10px] uppercase tracking-[0.28em] text-[#9B4F52] font-semibold block mb-1">
            Payment Verified · Order Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#4A252B] font-medium mb-2">
            Thank you for choosing Praashi
          </h1>
          <p className="text-xs sm:text-sm text-[#736366] max-w-md mx-auto mb-6 font-light">
            Your high jewellery order has been recorded in our atelier database. Our master craftsmen will begin insured dispatch preparations.
          </p>

          <div className="p-5 rounded-2xl bg-[#FAF6F2] border border-[#EDE1D6] text-left text-xs mb-8 space-y-3">
            <div className="flex justify-between border-b border-[#E8DBD2] pb-2">
              <span className="text-[#806F72]">Unique Order Reference:</span>
              <strong className="font-mono text-sm text-[#4A252B]">{confirmedOrder.order_number}</strong>
            </div>
            <div className="flex justify-between border-b border-[#E8DBD2] pb-2">
              <span className="text-[#806F72]">Customer:</span>
              <strong className="text-[#4A252B]">{confirmedOrder.customer_name}</strong>
            </div>
            <div className="flex justify-between border-b border-[#E8DBD2] pb-2">
              <span className="text-[#806F72]">Payment Status:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF3EA] text-[#426E49] font-bold text-[10px]">
                {confirmedOrder.payment_status} · {confirmedOrder.payment_reference}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#E8DBD2] pb-2">
              <span className="text-[#806F72]">Delivery Address:</span>
              <span className="text-right text-[#4A252B] max-w-xs">
                {confirmedOrder.address_line}, {confirmedOrder.city}, {confirmedOrder.state} {confirmedOrder.pin_code}
              </span>
            </div>
            <div className="flex justify-between font-serif text-base font-semibold text-[#4A252B] pt-1">
              <span>Final Paid Amount:</span>
              <span>₹{confirmedOrder.total_amount?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Purchased Items List */}
          {confirmedOrder.items && confirmedOrder.items.length > 0 && (
            <div className="mb-8 text-left">
              <h3 className="font-serif text-sm font-semibold text-[#4A252B] uppercase tracking-wider mb-3">
                Purchased Creations ({confirmedOrder.items.length})
              </h3>
              <div className="space-y-2">
                {confirmedOrder.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F3] border border-[#EADBCE]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#ECE0D3]">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          containerClassName="w-full h-full"
                        />
                      </div>
                      <div>
                        <strong className="font-serif text-sm text-[#4A252B] block">{item.name}</strong>
                        <span className="text-[10px] text-[#806F72]">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-serif font-medium text-sm text-[#4A252B]">
                      ₹{item.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/')}
            className="px-8 py-3.5 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-wider font-semibold transition-all shadow-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // STEP 4: Standard Checkout Layout
  return (
    <div className="min-h-screen bg-[#FBF5F0] py-10 px-4 sm:px-6 lg:px-10 text-[#25231F] font-sans">
      <div className="max-w-[1280px] mx-auto">
        {/* Top Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-[#806F72] hover:text-[#4A252B] flex items-center gap-1 uppercase tracking-wider font-semibold"
          >
            <ChevronLeft size={16} />
            <span>Return to Atelier Storefront</span>
          </button>
        </div>

        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#9B4F52] font-semibold block mb-1">
            Insured Doorstep Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#4A252B] font-medium">
            Checkout & Order Verification
          </h1>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-[#FAF0F0] border border-[#E8BDBD] text-xs text-[#9B4F52] flex items-center gap-2 shadow-sm">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Customer Details & Delivery Address Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm">
            <form onSubmit={handleInitiateOrder} noValidate className="space-y-6 text-xs">
              {/* Section 1: Customer Info */}
              <div>
                <h3 className="font-serif text-lg text-[#4A252B] font-medium pb-2 border-b border-[#EDE1D6] mb-4">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Aarohi Mehta"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+91 98201 44521"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Email Address for Insured Transit Tracking *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
                  />
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div>
                <h3 className="font-serif text-lg text-[#4A252B] font-medium pb-2 border-b border-[#EDE1D6] mb-4">
                  2. Secure Shipping Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="addressLine" className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                      Street Address & Residence *
                    </label>
                    <input
                      id="addressLine"
                      type="text"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      required
                      placeholder="Flat / House No., Apartment, Street Road"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                        City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder="e.g. Mumbai"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                        State *
                      </label>
                      <input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder="Maharashtra"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
                      />
                    </div>
                    <div>
                      <label htmlFor="pinCode" className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                        PIN Code *
                      </label>
                      <input
                        id="pinCode"
                        type="text"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        required
                        placeholder="400026"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none focus:border-[#9B4F52]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div>
                <h3 className="font-serif text-lg text-[#4A252B] font-medium pb-2 border-b border-[#EDE1D6] mb-4">
                  3. Payment Gateway
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Razorpay')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Razorpay'
                        ? 'border-[#9B4F52] bg-[#FAF6F2] text-[#4A252B]'
                        : 'border-[#E2D2C6] bg-white text-[#806F72]'
                    }`}
                  >
                    <CreditCard size={18} className="text-[#C5A059] mb-1.5" />
                    <strong className="block text-xs font-semibold">Razorpay Online</strong>
                    <span className="text-[10px]">UPI, Cards & NetBanking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#9B4F52] bg-[#FAF6F2] text-[#4A252B]'
                        : 'border-[#E2D2C6] bg-white text-[#806F72]'
                    }`}
                  >
                    <Sparkles size={18} className="text-[#C5A059] mb-1.5" />
                    <strong className="block text-xs font-semibold">Instant UPI</strong>
                    <span className="text-[10px]">GPay, PhonePe, Paytm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#9B4F52] bg-[#FAF6F2] text-[#4A252B]'
                        : 'border-[#E2D2C6] bg-white text-[#806F72]'
                    }`}
                  >
                    <Lock size={18} className="text-[#C5A059] mb-1.5" />
                    <strong className="block text-xs font-semibold">Debit / Credit Card</strong>
                    <span className="text-[10px]">Visa, Mastercard, Amex</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-[#4A252B] text-white hover:bg-[#9B4F52] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Verifying Catalogue Prices & Creating Order...</span>
                ) : (
                  <>
                    <span>Place Order & Continue to Payment</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary (STEP 4) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm space-y-6">
            <h3 className="font-serif text-lg text-[#4A252B] font-medium pb-2 border-b border-[#EDE1D6]">
              Order Summary ({cart.length} Pieces)
            </h3>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF7F3] border border-[#EADBCE]"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#ECE0D3] shrink-0">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-medium text-[#4A252B] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] text-[#806F72]">
                      Qty: {item.quantity} · {item.product.category}
                    </span>
                    <div className="font-serif text-xs text-[#4A252B] font-semibold mt-0.5">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-4 border-t border-[#EDE1D6] text-xs text-[#736366]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-serif text-sm font-medium text-[#4A252B]">
                  ₹{clientSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Insured Doorstep Shipping</span>
                <span className="text-[#56775D] font-semibold">
                  {clientShipping === 0 ? 'Complimentary' : `₹${clientShipping}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#EDE1D6] font-serif text-lg font-semibold text-[#4A252B]">
                <span>Total Payable Amount</span>
                <span>₹{clientGrandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="p-3.5 rounded-xl bg-[#FAF6F2] border border-[#EADBCE] text-[11px] text-[#806F72] space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#B38E46]" />
                <span>100% BIS 916 Hallmarked Gold & Certified Gems</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={15} className="text-[#B38E46]" />
                <span>Transit Insurance Included on All Shipments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 6: Razorpay Payment Gateway Dialog */}
      {paymentModalOpen && currentOrderData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F2] border border-[#C5A059] flex items-center justify-center text-[#9B4F52] mx-auto mb-3">
              <CreditCard size={24} />
            </div>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9B4F52] font-semibold block mb-1">
              Razorpay Secure Checkout (Test Mode)
            </span>
            <h3 className="font-serif text-2xl text-[#4A252B] font-medium mb-1">
              Authorize Payment
            </h3>
            <p className="text-xs text-[#806F72] mb-6">
              Order: <span className="font-mono font-semibold text-[#4A252B]">{currentOrderData.orderNumber}</span>
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#EADBCE] text-left text-xs mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#806F72]">Payable Amount:</span>
                <strong className="font-serif text-base text-[#4A252B]">
                  ₹{currentOrderData.totalAmount.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#806F72]">Gateway Order ID:</span>
                <span className="font-mono text-[10px] text-[#4A252B]">{currentOrderData.razorpay.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#806F72]">Environment:</span>
                <span className="text-[#B38E46] font-semibold text-[10px]">Test Mode Active</span>
              </div>
            </div>

            {/* Actions for complete testing (Success and Failure as explicitly demanded in TEST B and TEST F) */}
            <div className="space-y-3">
              <button
                onClick={() => handleSimulatePayment('SUCCESS')}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-full bg-[#56775D] text-white hover:bg-[#426E49] text-xs uppercase tracking-wider font-semibold transition-all shadow flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} />
                <span>Complete Test Payment (Simulate Success)</span>
              </button>

              <button
                onClick={() => handleSimulatePayment('FAILED')}
                disabled={isProcessing}
                className="w-full py-3 rounded-full border border-[#D98A8A] text-[#9B4F52] hover:bg-[#FAF0F0] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
              >
                <AlertCircle size={15} />
                <span>Simulate Payment Failure (Verify Fail Handling)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
