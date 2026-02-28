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

// === Orders ===

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'shipped'
    | 'delivered'
    | 'canceled'
    | 'return_initiated';

export type OrderItemStatus =
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



// === Promo Codes ===
export type PromoCodeType = 'percentage' | 'fixed_amount' | 'free_shipping';

// === Dimensions ===
export interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
    unit: 'inches' | 'cm';
}
