import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { OverviewModule } from './modules/OverviewModule';
import { ProductsModule } from './modules/ProductsModule';
import { CategoriesModule } from './modules/CategoriesModule';
import { CollectionsModule } from './modules/CollectionsModule';
import { MediaManagerModule } from './modules/MediaManagerModule';
import { BannersModule } from './modules/BannersModule';
import { ContentModule } from './modules/ContentModule';
import { CustomersModule } from './modules/CustomersModule';
import { OrdersModule } from './modules/OrdersModule';
import { EnquiriesModule } from './modules/EnquiriesModule';
import { PaymentsModule } from './modules/PaymentsModule';
import { SettingsModule } from './modules/SettingsModule';
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  FolderOpen,
  Image as ImageIcon,
  FileText,
  Users,
  ClipboardList,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

type ModuleKey =
  | 'overview'
  | 'products'
  | 'categories'
  | 'collections'
  | 'media'
  | 'banners'
  | 'content'
  | 'customers'
  | 'orders'
  | 'enquiries'
  | 'payments'
  | 'settings';

export const AdminLayout: React.FC = () => {
  const { adminUser, adminLogout, navigate } = useStore();
  const [activeModule, setActiveModule] = useState<ModuleKey>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { key: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { key: 'products', label: 'Product Catalogue', icon: Package },
    { key: 'categories', label: 'Jewellery Categories', icon: Layers },
    { key: 'collections', label: 'Curated Collections', icon: Sparkles },
    { key: 'media', label: 'Image Asset Manager', icon: FolderOpen },
    { key: 'banners', label: 'Homepage Banners', icon: ImageIcon },
    { key: 'content', label: 'Website Content', icon: FileText },
    { key: 'customers', label: 'Patrons & Clients', icon: Users },
    { key: 'orders', label: 'Orders', icon: ClipboardList },
    { key: 'enquiries', label: 'Enquiries', icon: MessageSquare },
    { key: 'payments', label: 'Payment Reconciliation', icon: CreditCard },
    { key: 'settings', label: 'Website Settings', icon: Settings },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewModule onNavigateModule={(m) => setActiveModule(m as ModuleKey)} />;
      case 'products':
        return <ProductsModule />;
      case 'categories':
        return <CategoriesModule />;
      case 'collections':
        return <CollectionsModule />;
      case 'media':
        return <MediaManagerModule />;
      case 'banners':
        return <BannersModule />;
      case 'content':
        return <ContentModule />;
      case 'customers':
        return <CustomersModule />;
      case 'orders':
        return <OrdersModule />;
      case 'enquiries':
        return <EnquiriesModule />;
      case 'payments':
        return <PaymentsModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <OverviewModule onNavigateModule={(m) => setActiveModule(m as ModuleKey)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF5F0] flex flex-col lg:flex-row text-[#25231F] selection:bg-[#EADBCE]">
      {/* Mobile Top bar */}
      <div className="lg:hidden bg-[#4A252B] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border border-[#C5A059] flex items-center justify-center font-serif text-sm text-[#C5A059]">
            P
          </div>
          <span className="font-serif font-medium text-lg">Praashi Admin</span>
        </div>
        <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="p-1">
          {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#4A252B] text-white p-6 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static lg:w-72 shrink-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Mark */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#5E3239] mb-6">
            <div className="w-10 h-10 rounded-full border border-[#C5A059] flex items-center justify-center font-serif text-xl text-[#C5A059] bg-[#3D1E23]">
              P
            </div>
            <div>
              <h1 className="font-serif font-medium text-xl leading-none text-[#FAF6F2]">
                Praashi
              </h1>
              <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#DFC1B5]">
                Admin Atelier
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 font-sans text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveModule(item.key as ModuleKey);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold shadow-sm'
                      : 'text-[#DFC1B5] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-[#C5A059]' : 'text-[#DFC1B5]'} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-[#C5A059]" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Footer & Actions */}
        <div className="pt-6 border-t border-[#5E3239] space-y-3 font-sans text-xs">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#DFC1B5] hover:bg-white/10 hover:text-white transition-colors"
          >
            <ExternalLink size={15} />
            <span>Go to Live Storefront</span>
          </button>

          <div className="p-3 rounded-xl bg-black/20 flex items-center justify-between">
            <div className="truncate mr-2">
              <strong className="block text-white text-xs truncate">
                {adminUser?.name || 'Director'}
              </strong>
              <span className="text-[10px] text-[#DFC1B5] truncate block">
                {adminUser?.email || 'admin@praashibysupal.com'}
              </span>
            </div>
            <button
              onClick={adminLogout}
              className="p-1.5 text-[#DFC1B5] hover:text-white transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Workspace Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-[1440px]">
        {renderModule()}
      </main>
    </div>
  );
};
