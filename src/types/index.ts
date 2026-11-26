export type JewelleryCategory =
  | 'All Jewellery'
  | 'Gold'
  | 'Diamond'
  | 'Earrings'
  | 'Daily Wear'
  | 'Necklaces'
  | 'Rings'
  | 'Bracelets'
  | 'Bangles';

export type MetalType = 'Gold' | 'Diamond' | 'Artificial' | 'Gemstone' | 'Platinum' | 'Silver';

export interface Product {
  id: number;
  name: string;
  category: JewelleryCategory;
  metalType: MetalType;
  price: number;
  originalPrice?: number;
  karat?: string; // e.g. "22K Gold", "18K Diamond", "14K Gold", "925 Silver"
  weight?: string; // e.g. "4.8 gms"
  image: string;
  gallery?: string[];
  badge?: 'Bestseller' | 'New arrival' | 'Trending' | 'Crafted to Order';
  description: string;
  inStock: boolean;
  isFeatured?: boolean;
  isGoldHighlight?: boolean;
  isDiamondHighlight?: boolean;
}

export interface CollectionItem {
  id: string;
  name: string;
  subtitle: string;
  detail: string;
  image: string;
  categoryFilter?: JewelleryCategory;
  accentColor?: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  active: boolean;
}

export interface EditorialBanner {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  align: 'left' | 'right' | 'center';
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: number;
  productName?: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  tier: 'Patron' | 'Connoisseur' | 'Heirloom Member';
  joinedDate: string;
  notes?: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Order {
  id: string; // e.g. PB-1048
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Placed' | 'Processing' | 'Ready to Ship' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery';
  orderDate: string;
}

export interface BespokeEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: 'Bespoke Bridal' | 'Custom Heirloom' | 'Solitaire Consultation' | 'Sizing & Care';
  budgetRange: string;
  preferredDate?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Consultation Scheduled' | 'Completed';
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  announcementBar: string;
  goldRate24K: number; // e.g. 7480 per gram
  goldRate22K: number; // e.g. 6850 per gram
  goldRate18K: number; // e.g. 5600 per gram
  whatsappConcierge: string;
  contactEmail: string;
  contactPhone: string;
  currencySymbol: string;
  shippingThresholdFree: number;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'atelier_manager';
}
