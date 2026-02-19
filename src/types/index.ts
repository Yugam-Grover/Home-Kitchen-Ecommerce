// src/types/index.ts
// Shared TypeScript types used across the application
// Source: architecture.md §3, §4, §5

// === Membership ===
export type MembershipTier = 'free' | 'gold';
export type MembershipStatus = 'active' | 'trial' | 'past_due' | 'canceled';
export type MembershipAction =
    | 'trial_started'
    | 'activated'
    | 'renewed'
    | 'canceled'
    | 'downgraded'
    | 'payment_failed';

// === Fulfillment ===
export type FulfillmentSource = 'warehouse' | 'seller_fulfilled' | 'dropship';

// === Orders ===
export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'partially_shipped'
    | 'shipped'
    | 'delivered'
    | 'canceled'
    | 'return_initiated';

export type SubOrderStatus =
    | 'processing'
    | 'dispatched'
    | 'in_transit'
    | 'delivered'
    | 'canceled'
    | 'return_initiated'
    | 'returned';

// === Products ===
export type ProductStatus = 'draft' | 'active' | 'archived';
export type PricingTag = 'standard' | 'clearance' | 'gold_exclusive';
export type ProductVisibility = 'all' | 'gold';
export type InventorySource = 'warehouse' | 'seller_fulfilled' | 'dropship';

// === Inventory ===
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface InventoryState {
    stock: number;
    status: StockStatus;
    lowStockThreshold: number;
}

// === Cart ===
export interface CartItem {
    productId: string;
    variantId: string;
    quantity: number;
    addedAt: number;
    fulfillmentSource: FulfillmentSource;
    sellerId: string | null;
}

// === Currency ===
export type SupportedCurrency =
    | 'USD' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'INR'
    | 'BRL' | 'SGD' | 'AED' | 'EUR' | 'NZD' | 'CHF'
    | 'SEK' | 'NOK' | 'DKK' | 'ZAR' | 'MXN' | 'KRW'
    | 'CNY' | 'HKD' | 'TWD' | 'THB' | 'MYR' | 'PHP' | 'IDR';

export interface ExchangeRates {
    base: 'USD';
    rates: Record<string, number>;
    fetchedAt: number;
}

// === Seller ===
export type SellerFulfillmentMethod = 'self_ship' | 'dropship';
export type StripeConnectStatus = 'pending' | 'active' | 'suspended';

// === Stripe Connect ===
export interface FulfillmentGroup {
    source: FulfillmentSource;
    sellerId: string | null;
    items: CartItem[];
    dispatchSlaHours: number;
    shippingCost: number;
    estimatedDeliveryMin: Date;
    estimatedDeliveryMax: Date;
}

// === Promo Codes ===
export type PromoCodeType = 'percentage' | 'fixed_amount' | 'free_shipping';

// === Dimensions ===
export interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
    unit: 'inches' | 'cm';
}
