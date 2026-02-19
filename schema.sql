-- Database Schema — Home & Kitchen Platform
-- Source: architecture.md §3 + Inferred Tables
-- Usage: Apply via Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS (Extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  membership_tier TEXT CHECK (membership_tier IN ('free', 'gold')) DEFAULT 'free',
  stripe_customer_id TEXT UNIQUE,
  preferred_currency TEXT DEFAULT 'USD',
  locale TEXT DEFAULT 'en-US',
  ccpa_opt_out BOOLEAN DEFAULT FALSE,
  tos_accepted_version TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SELLERS
CREATE TABLE public.sellers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  business_email TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  fulfillment_method TEXT CHECK (fulfillment_method IN ('self_ship', 'dropship')) DEFAULT 'self_ship',
  stripe_connect_account_id TEXT UNIQUE,
  stripe_connect_status TEXT CHECK (stripe_connect_status IN ('pending', 'active', 'suspended')) DEFAULT 'pending',
  commission_rate DECIMAL(5, 2) DEFAULT 10.00,
  on_time_dispatch_rate DECIMAL(5, 2) DEFAULT 100.00,
  is_suspended BOOLEAN DEFAULT FALSE,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES (Inferred)
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES public.categories(id),
  image_url TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCTS
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES public.sellers(id),
  category_id UUID REFERENCES public.categories(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  base_price_usd DECIMAL(10, 2) NOT NULL,
  gold_price_usd DECIMAL(10, 2),
  pricing_tag TEXT CHECK (pricing_tag IN ('standard', 'clearance', 'gold_exclusive')),
  inventory_source TEXT CHECK (inventory_source IN ('warehouse', 'seller_fulfilled', 'dropship')),
  visible_to TEXT CHECK (visible_to IN ('all', 'gold')) DEFAULT 'all',
  visibility_unlock_at TIMESTAMPTZ,
  is_self_sanitizing BOOLEAN DEFAULT FALSE,
  is_modular BOOLEAN DEFAULT FALSE,
  certifications TEXT[],
  material TEXT,
  dimensions JSONB,
  weight_grams INTEGER,
  features JSONB,
  status TEXT CHECK (status IN ('draft', 'active', 'archived')) DEFAULT 'draft',
  rating_avg DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRODUCT VARIANTS
CREATE TABLE public.product_variants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE NOT NULL,
  variant_attributes JSONB NOT NULL,
  price_override_usd DECIMAL(10, 2),
  gold_price_override_usd DECIMAL(10, 2),
  stock INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  image_urls TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORDERS
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  guest_email TEXT,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'partially_shipped', 'shipped', 'delivered', 'canceled', 'return_initiated')) DEFAULT 'pending',
  currency TEXT NOT NULL,
  exchange_rate DECIMAL(10, 6) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_total DECIMAL(10, 2) NOT NULL,
  tax_total DECIMAL(10, 2) NOT NULL,
  discount_total DECIMAL(10, 2) DEFAULT 0,
  grand_total DECIMAL(10, 2) NOT NULL,
  stripe_payment_intent_id TEXT,
  idempotency_key TEXT UNIQUE,
  membership_tier_at_purchase TEXT,
  promo_codes_applied TEXT[],
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDER ITEMS
CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES public.sellers(id),
  product_id UUID REFERENCES public.products(id),
  variant_id UUID REFERENCES public.product_variants(id),
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT CHECK (status IN ('processing', 'dispatched', 'in_transit', 'delivered', 'canceled', 'return_initiated', 'returned')) DEFAULT 'processing',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. MEMBERSHIPS
CREATE TABLE public.memberships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  tier TEXT CHECK (tier IN ('free', 'gold')) DEFAULT 'free',
  status TEXT CHECK (status IN ('active', 'trial', 'past_due', 'canceled')) DEFAULT 'active',
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  stripe_subscription_id TEXT UNIQUE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  payment_retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SAVED ITEMS (Inferred)
CREATE TABLE public.saved_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- 10. REVIEWS (Inferred)
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ADDRESSES (Inferred)
CREATE TABLE public.addresses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('shipping', 'billing')),
  is_default BOOLEAN DEFAULT FALSE,
  name TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- users: self read/write
CREATE POLICY "Users can read own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);

-- products: public read active, sellers read own
CREATE POLICY "Public read active products" ON public.products FOR SELECT USING (status = 'active');
CREATE POLICY "Sellers read own products" ON public.products FOR SELECT USING (seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid()));

-- categories: public read
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);

-- addresses: self read/write
CREATE POLICY "Users read own addresses" ON public.addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users write own addresses" ON public.addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own addresses" ON public.addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own addresses" ON public.addresses FOR DELETE USING (auth.uid() = user_id);

-- saved_items: self read/write
CREATE POLICY "Users read saved items" ON public.saved_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users write saved items" ON public.saved_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete saved items" ON public.saved_items FOR DELETE USING (auth.uid() = user_id);
