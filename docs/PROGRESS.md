# Project Progress — Home & Kitchen Platform

---

## Session 6: Navigation & PLP — Real Data Integration (2026-02-25)

**Goal:** Replace hardcoded mock navigation + product data with live Supabase queries.

### ✅ Completed
- **Query Layer:** `lib/database/queries/categories.ts` (3 cached functions) + `products.ts` (3 cached + helpers)
- **Navigation Config:** Rewrote to match 5 real DB categories + 18 sub-categories
- **Collection Pages:** DB fetch, dynamic metadata, JSON-LD BreadcrumbList
- **PLP Components:** PlpClient accepts `products` prop, dynamic facets, no mock-data imports
- **ProductCard:** `parentCategory` prop + `data-parent-category` attribute for Dynamic Modular Engine
- **QuickViewModal:** Generic type (no mock-data dependency)
- **Connectivity Fix:** Resolved ISP blocking by updating `.env.local` with real Supabase credentials and implementing RLS Policies via MCP. Fresh .next cache wipe to clear 404 states.
- **PLP Filtering Fix:** Refactored `PlpClient` to use `usePathname()` instead of hardcoded paths, ensuring that filters apply seamlessly on nested sub-category pages without redirecting up a level.

### 📝 Key Decisions
- `use cache` on all Supabase query functions (categories rarely change)
- JSON-LD BreadcrumbList on all collection + products pages for SEO
- Parent category name prefetched via JOIN — no second round-trip for PDP layout mode
- Mock images cycled via `getMockImageSrc(index)` until Cloudinary assets ready

---

## Session 5: Data Integration — CSV to Supabase (2026-02-25)

**Goal:** Import 70 products from `Data/Final-Data.csv` + seed categories + fill empty categories with handcrafted products.

### ✅ Completed
- **Schema Migration:** Added 7 columns (`sku`, `compare_at_price_usd`, `usp_badges`, `narrative_blocks`, `faq_data`, `related_product_skus`, `material_details`)
- **Categories:** 5 parents + 18 sub-categories (Cookware, Dining & Entertaining, Home Furnishings, Bath & Wellness, Bedding)
- **Products:** 89 total (70 from CSV + 8 Bath & Wellness + 8 Bedding + 3 Serveware)
- **Variants:** 89 default variants with inventory from CSV `inventory_count`
- **Data Cleaning:** Mojibake stripped, Python arrays → JSONB, self-referencing related IDs filtered
- **Local `schema.sql`** synced with live DB

### 📝 Key Decisions
- `sku` stored as `TEXT UNIQUE` alongside UUID primary key
- `category_id` points to sub-category (most specific level); JOIN to parent for "Dynamic Modular Engine" CSS mode switching
- `material_details JSONB` added alongside existing `material TEXT` (for array storage)
- `dimensions` stores `{"specs": [...]}` JSONB from CSV

---

## Session 4: DTC Simplification (2026-02-25)

**Goal:** Strip all marketplace, seller, dropshipping, and split-fulfillment logic — converting platform to pure DTC (Direct-to-Consumer).

### ✅ Completed
- **Database Migration (Supabase Live — via MCP):**
    - Dropped `sellers` table (CASCADE)
    - Removed `products.seller_id` and `products.inventory_source` columns
    - Removed `order_items.seller_id` column
    - Removed `partially_shipped` from `orders.status` CHECK constraint
    - Removed seller RLS policy (`Sellers read own products`)
    - Updated local `schema.sql` to match live DB
- **Codebase Cleanup:**
    - `proxy.ts` — removed `/seller` protected route and seller dashboard auth guard (lines 42-56)
    - `types/index.ts` — removed `FulfillmentSource`, `InventorySource`, `SellerFulfillmentMethod`, `StripeConnectStatus`, `FulfillmentGroup`, `CartItem.sellerId`, `CartItem.fulfillmentSource`; renamed `SubOrderStatus` → `OrderItemStatus`
    - `types/database.ts` — removed `sellers` table type, `products.seller_id`, `products.inventory_source`
    - Deleted `src/app/(seller)/` and `src/lib/fulfillment/` directories
    - Passed global `tsc --noEmit` validation after clearing `.next` cache constraint
- **Architecture Doc (`architecture.md`):**
    - §1.3 — updated proxy.ts description (removed "split-shipping logic")
    - §2 — removed `(seller)/` route group, `lib/fulfillment/`, `lib/stripe/connect.ts`, `sellers.ts` query, dropship webhook, split-shipping-notice component
    - §2.3 — removed seller routes from Route Map
    - §3.1 — removed sellers, sub_orders, stripe_connect_accounts from ER diagram
    - §3.2 — removed `seller_id`, `inventory_source` from products table; deleted `sub_orders` table; deleted `sellers` table; changed `line_items` FK from `sub_orders` to `orders`; removed `partially_shipped` from orders
    - §3.3 — removed all seller/sub_order RLS policies
    - §4–§7 — already cleaned in previous session (proxy code, fulfillment router, cart state, Stripe Connect, Typesense, asset routing)
- **PRD Doc (`PRD.md`):**
    - Removed Artisan Alice persona (§2.4)
    - Removed Marketplace Seller Economics (§4.7)
    - Removed Dropshipping SLAs (§4.4.2)
    - Removed Mixed-Inventory edge cases (§5.2–5.3)
    - Stripped ~50 scattered references to sellers, dropship, and marketplace
- **Agent Rules:**
    - `project-rules.md` — removed `(seller)/` from directory structure
    - `coding-standards.md` — removed `/seller/*` from protected route redirects
- **Reference Docs:**
    - `QUICK-REFERENCE.md` — removed Stripe Connect from tech stack, `(seller)/` from directory, seller routes from route map, Split Shipping Notice from component registry

### ⚠️ Blocked / Pending
- **None** — DTC Simplification is officially 100% complete and verified.

### 📝 Key Decisions
- **DTC-Only Architecture:** All marketplace, seller, and dropshipping infrastructure permanently removed from DB, codebase, and documentation
- **Orders simplified:** Tracking, carrier, priority fields moved from deleted `sub_orders` table directly into `orders` table
- **Line items FK:** Changed from `sub_order_id → sub_orders(id)` to `order_id → orders(id)`

---

## Session 3: Navigation & Routing Architecture Overhaul (2026-02-22)

**Goal:** Overhaul the Navigation Architecture, construct a dynamic JSON-driven routing funnel, implement high-performance Search Overlay, establish Global Amber Button Color Balancing, and embed the official Nestora logos.

### ✅ Completed
- **Navigation & Search Architecture Overhaul:**
    - Created `src/config/navigation.ts` for strict state-driven UI data (categories, imagery)
    - Scaffolded the multi-depth routing funnel: `app/(shop)/collections/[...slug]/page.tsx`
    - Built the `CollectionRenderer` server/client orchestrator
    - Built `CategoryLandingView` (Depth 1: Discovery) and `SubCategoryGridView` (Depth 2: Shopping)
    - Replaced the deprecated Next.js 14 `revalidate` export with the Next.js 16 `use cache` directive inside the dynamic route
    - Completely refactored `Navbar` into a 30/70 Mega-Nav grid (Absolute positioned to prevent CLS, Auto-closing on click)
    - Built the `SearchOverlay` focusing on discovery-first autocomplete (Zero products), debounce hooks, and snappy motion physics using `backdrop-blur-sm`
- **Global UI Balancing & Brand:**
    - **Global Amber State:** Modified `button.tsx` to institute a striking `amber-600` hover state universally for primary/secondary buttons
    - **Token Enforcement:** Swept all overhauled files and replaced rogue hard-coded rgb/rgba shadows with strict `shadow-sm`, `shadow-md`, `shadow-xl` tokens
    - **Brand Implementation:** Sliced the Nestora transparent PNG into `logo-navbar-v2.png` and `logo-footer-v2.png`, configuring responsive `h-[48px] md:h-[56px] w-auto` Next.js `<Image>` attributes

### 📝 Key Decisions
- **CMS State-Driven Navigation:** Decoupled all Top-Level Navigation Links and Mega-Nav Images from UI components. The `navigation.ts` config acts as a proto-CMS.
- **Mega Menu Dropdowns:** 3-column Framer Motion mega menu for 'Shop' to provide instant category access without layout shifts.

---

## Session 2: Homepage Construction — Phase 3 (2026-02-21)

**Goal:** Build Homepage structural UI components and integrate Framer Motion animations.

### ✅ Completed
- Built structural `wellness-ui` components: `brand-usp-band`, `newsletter-cta`, `shop-by-category`, `TestimonialsCarousel`
- Integrated `framer-motion` (via `LazyMotion`) for external animations

### 📝 Key Decisions
- **Framer Motion Integration:** Approved for Hero Slider. Dynamic imports (`next/dynamic` with `ssr: false`) + static SSR fallback skeletons (`HeroSkeleton`) to protect LCP.
- **Newsletter Violation Exemptions:** Ignored Design Token & Brand DNA ("No pure black") violations per user instructions.
- **Seamless Layout Animations:** `AnimatePresence mode="popLayout"` for fluid layout shifts.
- **Bespoke Abstract SVGs:** Hand-coded responsive scalable vector illustrations (Japandi style) instead of raster images.

---

## Session 1: Project Initialization & Design System (2026-02-19–20)

**Goal:** Initialize Next.js project, apply base schema, build core design system components.

### ✅ Completed
- **Project Init:** Next.js 16.1.6, TypeScript, Tailwind 4.0, Turbopack
- **Design System:** Full `@theme` implementation in `globals.css`
- **Backend:** Supabase clients (Browser, Server, Admin) + `proxy.ts`, base schema applied via MCP
- **Core Components:** button, input, badge, product-card, star-rating, accordion, testimonial-card, toast, toaster, navbar, footer, breadcrumbs, category-search, checkbox, feature-section, product-carousel, select, slider
- **Agent Infrastructure:** `project-rules.md` (10 sections), `coding-standards.md` (10 sections), `/new-page` workflow, `/new-component` workflow

### 📝 Key Decisions
- Tailwind 4 `@theme` not config file
- `proxy.ts` not `middleware.ts` (Next.js 16)
- No manual `useMemo`/`useCallback` (React 19 Compiler)
- Cart in LocalStorage, not DB
- Cloudinary URL-based (no SDK)
- Two membership tiers only (Free + Gold)
- Explicit `baseUrl: "."` in `tsconfig`
- Next.js Font mapping to `<html>` tag

---

## Current Status

**Phase:** Phase 4 (Page Construction: PLP -> PDP -> Checkout) is underway. PLP is functioning with live data.

### ⏳ Pending
- **PDP & Checkout:** Product Details Page and Checkout flows untouched.
- **Images:** Migrating mock images to Cloudinary.
