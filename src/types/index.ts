export type ProductCategory = 
  | 'all'
  | 'tenda'
  | 'alat-masak'
  | 'sleeping-gear'
  | 'penerangan'
  | 'carrier-logistik'
  | 'furnitur-outdoor';

export type AvailabilityStatus = 'ready' | 'rented';

export interface RentalVendor {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number;
  totalRentals: number;
  responseTime: string;
  isOfficial?: boolean;
  avatarUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  brand: string;
  pricePerDay: number;
  originalPriceDeposit: number; // nilai taksiran barang untuk jaminan
  status: AvailabilityStatus;
  capacity?: number; // Orang (khusus tenda / nest set)
  capacityLabel?: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  galleryUrls: string[];
  description: string;
  condition: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  includedItems: string[];
  rentalTerms: string[];
  vendor?: RentalVendor;
}

export interface RentalDateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  totalDays: number;
  nightsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  dateRange: RentalDateRange;
  customNotes?: string;
}

export type DeliveryMethod = 'pickup_basecamp' | 'courier_delivery';

export type PaymentMethod = 'qris' | 'va_bca' | 'va_mandiri' | 'cod_basecamp';

export type OrderStatus = 'pending_pickup' | 'active_rented' | 'returned' | 'overdue';

export interface RentalOrder {
  id: string; // e.g. CS-2026-X841
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    idType: 'KTP' | 'KTM' | 'SIM';
    idNumber: string;
    idPhotoSimulated?: string;
    notes?: string;
  };
  items: {
    productId: string;
    productName: string;
    category: string;
    brand: string;
    imageUrl: string;
    pricePerDay: number;
    quantity: number;
    subtotal: number;
  }[];
  dateRange: RentalDateRange;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: string;
  deliveryFee: number;
  cleaningServiceFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pay_at_basecamp';
  status: OrderStatus;
  guaranteeStatus: string;
  returnDueTimestamp: string; // ISO date string
  returnedAt?: string;
}
