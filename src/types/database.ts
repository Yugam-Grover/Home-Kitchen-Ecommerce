// src/types/database.ts
// Placeholder — will be replaced by Supabase CLI `gen types` after schema migration
// Source: architecture.md §3.2

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    email: string;
                    full_name: string | null;
                    phone: string | null;
                    avatar_url: string | null;
                    membership_tier: 'free' | 'gold';
                    stripe_customer_id: string | null;
                    preferred_currency: string;
                    locale: string;
                    ccpa_opt_out: boolean;
                    tos_accepted_version: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Partial<Database['public']['Tables']['users']['Row']> & {
                    email: string;
                };
                Update: Partial<Database['public']['Tables']['users']['Row']>;
            };
            products: {
                Row: {
                    id: string;
                    category_id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    short_description: string | null;
                    base_price_usd: number;
                    gold_price_usd: number | null;
                    pricing_tag: 'standard' | 'clearance' | 'gold_exclusive' | null;
                    visible_to: 'all' | 'gold';
                    visibility_unlock_at: string | null;
                    is_self_sanitizing: boolean;
                    is_modular: boolean;
                    certifications: string[];
                    material: string | null;
                    dimensions: Json | null;
                    weight_grams: number | null;
                    features: Json;
                    status: 'draft' | 'active' | 'archived';
                    rating_avg: number;
                    review_count: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Partial<Database['public']['Tables']['products']['Row']> & {
                    category_id: string;
                    name: string;
                    slug: string;
                    base_price_usd: number;
                };
                Update: Partial<Database['public']['Tables']['products']['Row']>;
            };
            product_variants: {
                Row: {
                    id: string;
                    product_id: string;
                    sku: string;
                    variant_attributes: Json;
                    price_override_usd: number | null;
                    gold_price_override_usd: number | null;
                    stock: number;
                    low_stock_threshold: number;
                    image_urls: string[];
                    is_active: boolean;
                    version: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Partial<Database['public']['Tables']['product_variants']['Row']> & {
                    product_id: string;
                    sku: string;
                };
                Update: Partial<Database['public']['Tables']['product_variants']['Row']>;
            };
            orders: {
                Row: {
                    id: string;
                    user_id: string | null;
                    guest_email: string | null;
                    order_number: string;
                    status: string;
                    currency: string;
                    exchange_rate: number;
                    subtotal: number;
                    shipping_total: number;
                    tax_total: number;
                    discount_total: number;
                    grand_total: number;
                    stripe_payment_intent_id: string | null;
                    idempotency_key: string;
                    membership_tier_at_purchase: string;
                    promo_codes_applied: string[];
                    shipping_address: Json;
                    billing_address: Json | null;
                    ip_address: string | null;
                    user_agent: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Partial<Database['public']['Tables']['orders']['Row']> & {
                    order_number: string;
                    currency: string;
                    exchange_rate: number;
                    subtotal: number;
                    shipping_total: number;
                    tax_total: number;
                    grand_total: number;
                    idempotency_key: string;
                    shipping_address: Json;
                };
                Update: Partial<Database['public']['Tables']['orders']['Row']>;
            };
            memberships: {
                Row: {
                    id: string;
                    user_id: string;
                    tier: 'free' | 'gold';
                    status: 'active' | 'trial' | 'past_due' | 'canceled';
                    trial_start: string | null;
                    trial_end: string | null;
                    current_period_start: string | null;
                    current_period_end: string | null;
                    stripe_subscription_id: string | null;
                    cancel_at_period_end: boolean;
                    payment_retry_count: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Partial<Database['public']['Tables']['memberships']['Row']> & {
                    user_id: string;
                    tier: 'free' | 'gold';
                    status: 'active' | 'trial' | 'past_due' | 'canceled';
                };
                Update: Partial<Database['public']['Tables']['memberships']['Row']>;
            };
            categories: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    parent_id: string | null;
                    image_url: string | null;
                    description: string | null;
                    sort_order: number;
                    created_at: string;
                };
                Insert: Partial<Database['public']['Tables']['categories']['Row']> & {
                    name: string;
                    slug: string;
                };
                Update: Partial<Database['public']['Tables']['categories']['Row']>;
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
}
