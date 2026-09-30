export type AccountType = 'SHARING' | 'PRIVATE';

export type StockStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'DEFECTIVE';

export type OrderStatus = 'PENDING' | 'PAID' | 'EXPIRED' | 'REFUNDED';

export interface ProductVariant {
  id: string;
  productId: string;
  name: string; // e.g. "1 Bulan Sharing (1 Profil)"
  accountType: AccountType;
  durationMonths: number;
  price: number; // in IDR
  originalPrice?: number;
  features: string[];
  stockCount?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: 'AI & Productivity' | 'Streaming & Movies' | 'Design & Creative' | 'Music & Audio';
  tagline: string;
  description: string;
  badge?: string; // e.g. "Paling Laris", "Garansi Full"
  icon: string; // Icon identifier or logo
  loginUrl: string; // Official login URL (e.g. "https://netflix.com")
  variants: ProductVariant[];
}

export interface AccountInventory {
  id: string;
  variantId: string;
  email: string;
  password: string;
  profileName?: string; // For sharing (e.g. "Profile 2")
  profilePin?: string; // For sharing (e.g. "4921")
  additionalNotes?: string;
  status: StockStatus;
  reservedUntil?: string; // ISO string
  orderId?: string;
  createdAt: string;
  soldAt?: string;
}

export interface Order {
  id: string;
  invoiceNumber: string; // e.g. "LMN-20260930-4821"
  customerPhone: string; // WhatsApp
  customerEmail?: string;
  variantId: string;
  productId: string;
  productTitle: string;
  variantName: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: 'QRIS' | 'BCA_VA' | 'MANDIRI_VA' | 'GOPAY';
  qrisPayload?: string;
  assignedAccountId?: string;
  assignedAccount?: {
    email: string;
    password: string;
    profileName?: string;
    profilePin?: string;
    additionalNotes?: string;
    loginUrl: string;
  };
  createdAt: string;
  paidAt?: string;
  expiresAt: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  paidOrders: number;
  availableStock: number;
  soldStock: number;
}
