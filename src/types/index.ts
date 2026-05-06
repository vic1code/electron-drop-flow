export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  sku: string;
  image: string;
  specifications: Record<string, string>;
  datasheetUrl?: string;
  rating: number;
  reviewsCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  fullName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: Address;
  paymentMethod: 'stripe' | 'paypal';
  trackingNumber?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'supplier';
  avatar?: string;
}