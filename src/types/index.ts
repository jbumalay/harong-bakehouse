export type CategoryType =
  | 'All Products'
  | 'Croissants & Viennoiserie'
  | 'Breads'
  | 'Cakes & Tarts'
  | 'Cookies & Small Treats'
  | 'Seasonal Specials';

export interface ProductVariant {
  id: string;
  name: string;
  priceDelta?: number;
}

export type AvailabilityStatus = 'in_stock' | 'preorder_only' | 'seasonal' | 'sold_out';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryType;
  description: string;
  detailedDescription: string;
  price: number; // In Philippine Pesos (₱)
  image: string;
  gallery: string[];
  ingredients: string[];
  allergens?: string[];
  availability: AvailabilityStatus;
  featured?: boolean;
  seasonal?: boolean;
  variants?: ProductVariant[];
  preparationNotes?: string;
  storageRecommendations?: string;
  weightOrSize?: string;
}

export interface OrderInquiryData {
  customerName: string;
  contactNumber: string;
  productSlug: string;
  productName: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  fulfillment: 'pickup' | 'delivery';
  preferredDate: string;
  preferredTime: string;
  specialInstructions?: string;
}

export interface CustomOrderInquiryData {
  fullName: string;
  contactNumber: string;
  email?: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  preferredProduct: string;
  budgetRange?: string;
  details: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface FAQItem {
  id: string;
  category: 'ORDERS' | 'PICKUP & DELIVERY' | 'PRODUCTS' | 'CUSTOM ORDERS';
  question: string;
  answer: string;
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  variantId: string | null;
  productName: string;
  variantName: string | null;
  unitPrice: number;
  quantity: number;
  image: string;
  category: CategoryType;
}

export interface MultiProductOrderData {
  customerName: string;
  contactNumber: string;
  email?: string;
  fulfillment: 'pickup' | 'delivery';
  deliveryAddress?: string;
  preferredDate: string;
  preferredTime: string;
  specialInstructions?: string;
  items: CartItem[];
  subtotal: number;
  totalQuantity: number;
}

