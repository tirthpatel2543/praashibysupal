import React from 'react';
import { StoreProvider, useStore } from '@/context/StoreContext';
import { HomePage } from '@/components/home/HomePage';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { CheckoutPage } from '@/components/checkout/CheckoutPage';
import { CustomerAuthModal } from '@/components/checkout/CustomerAuthModal';
import { JewelleryConcierge } from '@/components/concierge/JewelleryConcierge';

const AppContent: React.FC = () => {
  const {
    currentPath,
    isAdminAuthenticated,
    customerAuthModalOpen,
    setCustomerAuthModalOpen,
    navigate,
  } = useStore();

  // Protected Admin Routes Logic
  if (currentPath === '/admin/login') {
    if (isAdminAuthenticated) {
      return <AdminLayout />;
    }
    return <AdminLogin />;
  }

  if (currentPath.startsWith('/admin')) {
    if (!isAdminAuthenticated) {
      return <AdminLogin />;
    }
    return <AdminLayout />;
  }

  // Checkout Route
  if (currentPath === '/checkout') {
    return (
      <div className="min-h-screen bg-[#FAF6F2] text-[#4A252B] selection:bg-[#EADBCE]">
        <CheckoutPage />
        <CustomerAuthModal
          isOpen={customerAuthModalOpen}
          onClose={() => setCustomerAuthModalOpen(false)}
          onSuccess={() => navigate('/checkout')}
        />
        <JewelleryConcierge />
      </div>
    );
  }

  // Customer-facing Storefront
  return (
    <div className="min-h-screen bg-[#FAF6F2] text-[#4A252B] selection:bg-[#EADBCE]">
      <HomePage />
      <CustomerAuthModal
        isOpen={customerAuthModalOpen}
        onClose={() => setCustomerAuthModalOpen(false)}
        onSuccess={() => navigate('/checkout')}
      />
      <JewelleryConcierge />
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
