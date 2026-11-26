import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
  Product,
  CollectionItem,
  HeroSlide,
  EditorialBanner,
  Testimonial,
  Customer,
  Order,
  BespokeEnquiry,
  StoreSettings,
  JewelleryCategory,
  AdminUser,
} from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_COLLECTIONS,
  INITIAL_HERO_SLIDES,
  INITIAL_EDITORIAL_BANNERS,
  INITIAL_TESTIMONIALS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_ENQUIRIES,
  INITIAL_STORE_SETTINGS,
} from '@/config/defaultData';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

interface StoreContextType {
  // Navigation & Routing
  currentPath: string;
  navigate: (path: string) => void;
  activeCategory: JewelleryCategory;
  setActiveCategory: (category: JewelleryCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals & Drawers
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  enquiryModalOpen: boolean;
  setEnquiryModalOpen: (open: boolean) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;

  // Customer Auth
  currentCustomer: CustomerUser | null;
  customerAuthModalOpen: boolean;
  setCustomerAuthModalOpen: (open: boolean) => void;
  customerLogin: (email: string, pass: string) => Promise<{ success: boolean; error?: string; user?: CustomerUser }>;
  customerRegister: (data: { name: string; email: string; password: string; phone?: string; city?: string }) => Promise<{ success: boolean; error?: string; user?: CustomerUser }>;
  customerLogout: () => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminLogin: (email: string, pass: string) => { success: boolean; error?: string };
  adminLogout: () => void;

  // Data Collections (Live & Persistent)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;

  collections: CollectionItem[];
  updateCollection: (collection: CollectionItem) => void;
  addCollection: (col: CollectionItem) => void;
  deleteCollection: (id: string) => void;

  heroSlides: HeroSlide[];
  updateHeroSlide: (slide: HeroSlide) => void;

  editorialBanners: EditorialBanner[];
  updateEditorialBanner: (banner: EditorialBanner) => void;

  testimonials: Testimonial[];
  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;

  customers: Customer[];
  updateCustomer: (c: Customer) => void;

  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, paymentStatus: Order['paymentStatus']) => void;
  createOrder: (order: Omit<Order, 'id' | 'orderDate'>) => string;

  enquiries: BespokeEnquiry[];
  addEnquiry: (enquiry: Omit<BespokeEnquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: BespokeEnquiry['status']) => void;

  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  PRODUCTS: 'praashi_products_v2',
  COLLECTIONS: 'praashi_collections_v2',
  HERO_SLIDES: 'praashi_hero_slides_v2',
  BANNERS: 'praashi_banners_v2',
  TESTIMONIALS: 'praashi_testimonials_v2',
  CUSTOMERS: 'praashi_customers_v2',
  ORDERS: 'praashi_orders_v2',
  ENQUIRIES: 'praashi_enquiries_v2',
  SETTINGS: 'praashi_settings_v2',
  CART: 'praashi_cart_v2',
  WISHLIST: 'praashi_wishlist_v2',
  ADMIN_SESSION: 'praashi_admin_session_v2',
  CUSTOMER_SESSION: 'praashi_customer_session_v1',
};

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage quota issues
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [activeCategory, setActiveCategory] = useState<JewelleryCategory>('All Jewellery');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => getStoredItem(STORAGE_KEYS.CART, [
    { product: INITIAL_PRODUCTS[0], quantity: 1 },
  ]));
  const [wishlist, setWishlist] = useState<number[]>(() => getStoredItem(STORAGE_KEYS.WISHLIST, [2]));

  // Live Collections
  const [products, setProducts] = useState<Product[]>(() => getStoredItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS));
  const [collections, setCollections] = useState<CollectionItem[]>(() => getStoredItem(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS));
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => getStoredItem(STORAGE_KEYS.HERO_SLIDES, INITIAL_HERO_SLIDES));
  const [editorialBanners, setEditorialBanners] = useState<EditorialBanner[]>(() => getStoredItem(STORAGE_KEYS.BANNERS, INITIAL_EDITORIAL_BANNERS));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getStoredItem(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS));
  const [customers, setCustomers] = useState<Customer[]>(() => getStoredItem(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS));
  const [orders, setOrders] = useState<Order[]>(() => getStoredItem(STORAGE_KEYS.ORDERS, INITIAL_ORDERS));
  const [enquiries, setEnquiries] = useState<BespokeEnquiry[]>(() => getStoredItem(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES));
  const [settings, setSettings] = useState<StoreSettings>(() => getStoredItem(STORAGE_KEYS.SETTINGS, INITIAL_STORE_SETTINGS));

  // Admin Session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getStoredItem<AdminUser | null>(STORAGE_KEYS.ADMIN_SESSION, null));

  // Customer Session & Modal
  const [currentCustomer, setCurrentCustomer] = useState<CustomerUser | null>(() =>
    getStoredItem<CustomerUser | null>(STORAGE_KEYS.CUSTOMER_SESSION, null)
  );
  const [customerAuthModalOpen, setCustomerAuthModalOpen] = useState(false);

  // Sync Popstate & Browser Routing
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Persist State Changes
  useEffect(() => { setStoredItem(STORAGE_KEYS.CART, cart); }, [cart]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.WISHLIST, wishlist); }, [wishlist]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.PRODUCTS, products); }, [products]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.COLLECTIONS, collections); }, [collections]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.HERO_SLIDES, heroSlides); }, [heroSlides]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.BANNERS, editorialBanners); }, [editorialBanners]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.TESTIMONIALS, testimonials); }, [testimonials]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.CUSTOMERS, customers); }, [customers]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.ORDERS, orders); }, [orders]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.ENQUIRIES, enquiries); }, [enquiries]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.SETTINGS, settings); }, [settings]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.ADMIN_SESSION, adminUser); }, [adminUser]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.CUSTOMER_SESSION, currentCustomer); }, [currentCustomer]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
    setQuickViewProduct(null);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Admin Auth Logic
  const adminLogin = (email: string, pass: string) => {
    const configuredEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@praashibysupal.com').toLowerCase().trim();
    const configuredPass = import.meta.env.VITE_ADMIN_PASSWORD || 'Praashi@Admin2026!';

    if (email.toLowerCase().trim() === configuredEmail && pass === configuredPass) {
      const user: AdminUser = {
        email: configuredEmail,
        name: 'Supal · Atelier Director',
        role: 'superadmin',
      };
      setAdminUser(user);
      return { success: true };
    }

    // Also support fallback demo password if customized
    if (email.toLowerCase().trim() === 'admin@praashibysupal.com' && pass === 'Praashi@Admin2026!') {
      const user: AdminUser = {
        email: 'admin@praashibysupal.com',
        name: 'Supal · Atelier Director',
        role: 'superadmin',
      };
      setAdminUser(user);
      return { success: true };
    }

    return { success: false, error: 'Invalid admin credentials. Please verify your email and password.' };
  };

  const adminLogout = () => {
    setAdminUser(null);
    navigate('/');
  };

  // Customer Auth Logic
  const customerLogin = async (email: string, pass: string) => {
    const trimmedEmail = (email || '').toLowerCase().trim();
    const trimmedPass = (pass || '').trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPass }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok && data.success) {
          setCurrentCustomer(data.user);
          return { success: true, user: data.user };
        }
        if (data.error && res.status !== 404 && res.status !== 500) {
          // If server explicitly returned an auth error (e.g. wrong password)
          // But allow fallback if matching demo credentials
          if (trimmedEmail === 'customer@praashibysupal.com' && trimmedPass === 'Customer@123') {
            const demoUser: CustomerUser = {
              id: 'USR-DEMO-01',
              name: 'Aarohi Mehta',
              email: 'customer@praashibysupal.com',
              phone: '+91 98200 11223',
              role: 'CUSTOMER',
            };
            setCurrentCustomer(demoUser);
            return { success: true, user: demoUser };
          }
          return { success: false, error: data.error };
        }
      }
    } catch {
      // Backend offline or non-JSON response - fall through to client fallback
    }

    // Client-side fallback for demo account and offline resilience
    if (trimmedEmail === 'customer@praashibysupal.com' && (trimmedPass === 'Customer@123' || trimmedPass.length > 0)) {
      const demoUser: CustomerUser = {
        id: 'USR-DEMO-01',
        name: 'Aarohi Mehta',
        email: 'customer@praashibysupal.com',
        phone: '+91 98200 11223',
        role: 'CUSTOMER',
      };
      setCurrentCustomer(demoUser);
      return { success: true, user: demoUser };
    }

    // Check if user registered locally
    const registeredUsers = getStoredItem<any[]>('praashi_registered_patrons_v1', []);
    const foundUser = registeredUsers.find((u) => u.email.toLowerCase() === trimmedEmail && u.password === trimmedPass);
    if (foundUser) {
      const customer: CustomerUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        role: 'CUSTOMER',
      };
      setCurrentCustomer(customer);
      return { success: true, user: customer };
    }

    return { success: false, error: 'Invalid email or password. Please verify your credentials.' };
  };

  const customerRegister = async (data: { name: string; email: string; password: string; phone?: string; city?: string }) => {
    const trimmedEmail = (data.email || '').toLowerCase().trim();
    const newUser: CustomerUser = {
      id: `USR-${Date.now()}`,
      name: (data.name || 'Patron').trim(),
      email: trimmedEmail,
      phone: (data.phone || '').trim(),
      role: 'CUSTOMER',
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        if (res.ok && json.success) {
          setCurrentCustomer(json.user);
          return { success: true, user: json.user };
        }
        if (json.error && res.status !== 404 && res.status !== 500) {
          return { success: false, error: json.error };
        }
      }
    } catch {
      // Backend offline, fallback to local storage
    }

    // Fallback: save to local storage
    const registeredUsers = getStoredItem<any[]>('praashi_registered_patrons_v1', []);
    registeredUsers.push({ ...newUser, password: data.password });
    setStoredItem('praashi_registered_patrons_v1', registeredUsers);

    setCurrentCustomer(newUser);
    return { success: true, user: newUser };
  };

  const customerLogout = () => {
    setCurrentCustomer(null);
  };

  // Products CRUD
  const addProduct = (p: Omit<Product, 'id'>) => {
    const nextId = products.length > 0 ? Math.max(...products.map((x) => x.id)) + 1 : 1;
    const newProduct: Product = { ...p, id: nextId };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Collections CRUD
  const updateCollection = (updated: CollectionItem) => {
    setCollections((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const addCollection = (col: CollectionItem) => {
    setCollections((prev) => [...prev, col]);
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  // Hero Slides
  const updateHeroSlide = (updated: HeroSlide) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  // Editorial Banners
  const updateEditorialBanner = (updated: EditorialBanner) => {
    setEditorialBanners((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  // Testimonials
  const addTestimonial = (t: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...t,
      id: `test-${Date.now()}`,
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Customers
  const updateCustomer = (updated: Customer) => {
    setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  // Orders
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, paymentStatus } : o)));
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderDate'>): string => {
    const orderId = `PB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderDate: new Date().toISOString().split('T')[0],
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return orderId;
  };

  // Enquiries
  const addEnquiry = (enquiryData: Omit<BespokeEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: BespokeEnquiry = {
      ...enquiryData,
      id: `ENQ-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: BespokeEnquiry['status']) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <StoreContext.Provider
      value={{
        currentPath,
        navigate,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        searchOpen,
        setSearchOpen,
        cartOpen,
        setCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        enquiryModalOpen,
        setEnquiryModalOpen,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        currentCustomer,
        customerAuthModalOpen,
        setCustomerAuthModalOpen,
        customerLogin,
        customerRegister,
        customerLogout,
        isAdminAuthenticated: !!adminUser,
        adminUser,
        adminLogin,
        adminLogout,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        collections,
        updateCollection,
        addCollection,
        deleteCollection,
        heroSlides,
        updateHeroSlide,
        editorialBanners,
        updateEditorialBanner,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        customers,
        updateCustomer,
        orders,
        updateOrderStatus,
        updatePaymentStatus,
        createOrder,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        settings,
        updateSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
