# Product Requirements Document: Home & Kitchen Platform

> **Brand DNA:** Organic Modernist — Restorative · Safe · Aspirational · Minimalist

---

## Table of Contents

1. [Vision & Success Metrics](#1-vision--success-metrics)
2. [The Restorative Personas](#2-the-restorative-personas)
3. [Logic-Dense User Journeys](#3-logic-dense-user-journeys)
4. [Functional Requirements (Atomic)](#4-functional-requirements-atomic)
5. [High-Density Edge Case Matrix](#5-high-density-edge-case-matrix)
6. [Membership Economy (Gold Tier)](#6-membership-economy-gold-tier)
7. [Implementation Roadmap](#7-implementation-roadmap)
8. [PM Assumptions (2026 Standards)](#8-pm-assumptions-2026-standards)
9. [Technical Guardrails](#9-technical-guardrails)

---

## 1. Vision & Success Metrics

### 1.1 Product Vision

A **mid-market** e-commerce platform for Home & Kitchen products — positioned alongside IKEA in price accessibility — that combines **Direct-to-Consumer (DTC)** curated inventory with a **vetted Marketplace**, powered by a **hybrid fulfillment model** (owned warehouses + dropshipping partners). The platform serves **international markets** (Tier 1 and Tier 2 countries) with multi-currency support, delivering a restorative, low-friction shopping experience where every interaction reinforces trust, safety, and calm.

**Brand USP:** "Self-Sanitizing Surfaces & Modular Multi-Taskers" — surfaced exclusively on the homepage value proposition hero section. This USP does not appear on PDPs, category pages, or checkout flows.

**Price Positioning:** Mid-market. Comparable to IKEA's home & kitchen range. Median product price: $15–$120. Premium tier capped at $300.

### 1.2 North Star Metrics

| Metric | Target | Measurement Method | Cadence |
|---|---|---|---|
| Gross Merchandise Value (GMV) | **$10M** annualized | Sum of all completed order values (net of refunds) | Monthly |
| Conversion Rate | **> 2.8%** | `(Completed Orders / Unique Sessions) × 100` | Weekly |
| Largest Contentful Paint (LCP) | **< 1.2s** | Lighthouse CI on every deploy; RUM via Web Vitals API | Per-deploy + Daily P75 |

### 1.3 Supporting KPIs

| KPI | Target | Rationale |
|---|---|---|
| Cart Abandonment Rate | < 55% | Industry avg is 70%; low-friction checkout must outperform |
| Average Order Value (AOV) | > $85 | Bundle & cross-sell logic drives basket size |
| Return Rate | < 8% | Accurate PDP content (360° views, sizing) reduces mismatch |
| First Contentful Paint (FCP) | < 0.8s | Perceived speed builds trust in the "Restorative" brand promise |
| Cumulative Layout Shift (CLS) | < 0.05 | Visual stability is non-negotiable for a calm UX |
| Time to Interactive (TTI) | < 2.0s | Users must be able to act (search, filter, add-to-cart) immediately |
| Customer Satisfaction (CSAT) | > 4.5 / 5 | Post-purchase survey; measures alignment with brand promise |
| Repeat Purchase Rate | > 30% within 90 days | Loyalty signal for DTC products (consumables, refills) |
| Dropship SLA Compliance | > 95% on-time | Dropshipped items dispatched within 48h or auto-escalated |
| Multi-Currency Accuracy | 0 pricing errors | Exchange rates refreshed every 15 min; all prices validated pre-checkout |

### 1.4 Metric Dependencies & Guardrails

| If… | Then… | System Response |
|---|---|---|
| LCP exceeds 1.5s on any page | Conversion drops ~7% per 100ms of delay | Trigger performance alert → auto-disable non-critical third-party scripts |
| Conversion drops below 2.0% for 7 consecutive days | GMV trajectory breaks | Flag to PM dashboard → activate A/B test queue for checkout flow |
| Cart Abandonment exceeds 65% | Revenue leakage | Trigger abandoned-cart email sequence at `T+30min`, `T+24h`, `T+72h` |
| Dropship partner misses 48h SLA | Customer experience degrades | Auto-escalate to partner; if unresolved at 72h → trigger auto-cancel/refund [See Section 5] |
| Exchange rate drift > 2% since last cart update | Price integrity risk | Force cart revalidation on checkout entry; display updated totals with change notice |

### 1.5 Geographic Scope & Compliance

| Dimension | Specification |
|---|---|
| **Target Markets** | Tier 1 (US, UK, EU, Canada, Australia, Japan) and Tier 2 (India, Brazil, Southeast Asia, Middle East) |
| **Multi-Currency** | Support local currencies for all Tier 1 + Tier 2 markets; Stripe handles currency conversion |
| **Default Currency** | USD (used for internal accounting and GMV reporting) |
| **Currency Display** | Auto-detect via `Accept-Language` header + GeoIP; user can override via currency selector in header |
| **Exchange Rates** | Refreshed every 15 minutes from provider API; cached server-side |
| **Pricing Strategy** | Prices stored in USD; converted at display time; checkout locks rate at cart-entry |

#### Tier 1 Compliance Requirements

| Country/Region | Regulation | System Requirement |
|---|---|---|
| EU | GDPR | PII anonymization, right-to-erasure API, cookie consent banner, DPO contact [See architecture.md] |
| US (California) | CCPA | "Do Not Sell My Info" link, data deletion request flow, annual disclosure |
| UK | UK GDPR + PECR | Post-Brexit GDPR equivalent; separate data controller registration |
| Canada | PIPEDA | Consent-based data collection; breach notification within 72h |
| Australia | APPs (Privacy Act) | Cross-border data transfer disclosure; APP 8 compliance |
| Japan | APPI | Opt-in consent for cross-border data transfer to non-whitelisted countries |
| EU | PSD2/SCA | Strong Customer Authentication via Stripe 3DS (already handled in CHK-004) |
| EU | Digital Services Act | Marketplace seller identity verification; transparent recommendation algorithms |

> [!NOTE]
> Tier 2 compliance requirements will be documented as they crystallize during Phase 3 (Internationalization). MVP launches with Tier 1 compliance only.

### 1.6 Pricing & Inventory Model

| Dimension | Specification |
|---|---|
| **Price Positioning** | Mid-market, comparable to IKEA Home & Kitchen range |
| **Median Product Price** | $15–$120 USD |
| **Premium Cap** | $300 USD (products above this require PM approval) |
| **Inventory Model** | Hybrid: DTC items from owned/leased warehouses + Marketplace items via seller warehouses or dropshipping partners |
| **DTC Fulfillment** | Owned warehouse → pick/pack/ship; target dispatch within 24h |
| **Marketplace Fulfillment** | Seller self-fulfills from own warehouse OR via approved dropshipping partner |
| **Dropship SLA** | 48-hour dispatch window from order placement; inventory source is **abstracted from customer** (customer sees unified brand experience) |
| **Marketplace Commission** | Flat **5%** of item sale price (excluding shipping & tax); deducted before seller payout |
| **Seller Payout** | Net of 5% commission; disbursed T+7 business days via Stripe Connect |

---

## 2. The Restorative Personas

### 2.1 Persona Overview

| Attribute | Nesting Nina (DTC Customer) | Marketplace Maven (Marketplace Buyer) | Artisan Alice (Seller) |
|---|---|---|---|
| **Archetype** | Wellness-conscious homemaker | Variety-seeking value optimizer | Small-batch / indie brand owner |
| **Age Range** | 28–42 | 25–50 | 30–55 |
| **Primary Goal** | Safe, non-toxic, curated products for the home | Maximum selection with minimum decision fatigue | Simple tools to list, manage, and grow sales |
| **Pain Points** | Distrust of ingredient lists; overwhelmed by Amazon's chaos | Too many tabs; inconsistent product quality across sellers | Complex dashboards; hidden fees; slow onboarding |
| **Brand Affinity** | Values certifications (Organic, BPA-Free, Fair Trade) | Values reviews, ratings, comparison features | Values transparent commission (flat 5%), fast payouts |
| **Geographic Reach** | Primarily Tier 1 markets; multi-currency aware | Global; shops across Tier 1 + Tier 2 markets | Ships from own warehouse or via dropshipping; international reach |
| **Device Split** | 65% mobile / 35% desktop | 50% mobile / 50% desktop | 20% mobile / 80% desktop |
| **Session Behavior** | Browse → Save → Return → Purchase (multi-session) | Search → Compare → Purchase (single-session intent) | Dashboard-centric; batch operations |

### 2.2 Persona: Nesting Nina (DTC Customer)

**Scenario:** Nina is searching for a non-toxic ceramic cookware set. She needs to trust the product before committing.

| Journey Phase | Nina's Need | System Response |
|---|---|---|
| Discovery | "Show me only safe, certified products" | Surface DTC-only filter; auto-tag products with certification badges (Organic, BPA-Free, USDA) |
| Evaluation | "I want to see the product from every angle" | Serve 360° image viewer; lazy-load high-res assets; display ingredient/material breakdown |
| Trust Building | "Are other people like me buying this?" | Show verified-purchase reviews filtered by `similar_profile` tag; display `X bought in last 24h` social proof |
| Purchase | "I don't want surprises at checkout" | Zero-surprise checkout: all fees in local currency visible on PDP; no price changes between PDP and cart |
| Post-Purchase | "When is it arriving, and is my data safe?" | Real-time shipment tracking via webhook integration; GDPR-compliant data handling [See architecture.md] |
| Returns | "Easy returns if it's not right" | Free members: 7–15 business day return window; Gold members: 3–5 business day expedited returns |

**UX Mandate:** The entire Nina flow must feel **calm and unhurried**. No countdown timers. No "only 2 left!" anxiety triggers. Trust indicators replace urgency signals.

### 2.3 Persona: Marketplace Maven

**Scenario:** Maven wants to compare bamboo cutting boards across multiple sellers without opening 15 tabs.

| Journey Phase | Maven's Need | System Response |
|---|---|---|
| Discovery | "Show me everything in this category, ranked fairly" | Default sort by `relevance_score` (composite of rating, recency, fulfillment speed); no paid placement bias in default view |
| Comparison | "Let me see these side-by-side" | Inline comparison tray (max 4 items); auto-populate key attributes (price, rating, material, dimensions, shipping ETA) |
| Filtering | "Narrow down without page reloads" | AJAX-powered faceted filtering; URL state sync so filters persist on back-navigation |
| Purchase | "One checkout, even if items are from different sellers" | Unified cart with split-shipping disclosure; per-seller shipping cost shown before checkout; prices in local currency |
| Post-Purchase | "Track all my items in one place" | Aggregated order tracking dashboard; per-seller shipment status with independent ETAs; inventory source abstracted (no "dropshipped" label visible) |

**UX Mandate:** Variety must never feel like chaos. Clean grid layouts, consistent card dimensions, and predictable sort behavior.

### 2.4 Persona: Artisan Alice (Seller)

**Scenario:** Alice makes handcrafted olive-wood utensils and wants to list her first 20 products.

| Journey Phase | Alice's Need | System Response |
|---|---|---|
| Onboarding | "Get me selling in under 10 minutes" | Guided onboarding wizard (≤ 5 steps); auto-detect product category from image upload via ML classification; select fulfillment method (self-ship or dropship) |
| Listing Management | "Bulk operations, not one-by-one" | CSV bulk upload with validation preview; inline error correction; draft/publish toggle per item; multi-currency price preview |
| Inventory | "Don't oversell my limited stock" | Real-time inventory sync via WebSocket; automatic listing deactivation at `stock = 0`; dropship inventory fed from partner API |
| Financials | "Show me what I actually earn" | Flat **5% commission** per sale (on item price, excl. shipping & tax); net earnings dashboard; payout schedule (T+7 business days via Stripe Connect) |
| Growth | "Help me reach more buyers" | Seller analytics: impressions, click-through rate, conversion by product; international traffic breakdown by country; actionable recommendations |

**UX Mandate:** Alice's dashboard must be **minimalist**. Maximum 5 navigation items. No feature overload. Progressive disclosure — advanced tools appear only when Alice's catalog exceeds 50 items.

---

## 3. Logic-Dense User Journeys

### 3.1 Journey Map: Search → Product Discovery

```
[User Input] → Autocomplete Engine → [Results Page]
     │                                       │
     ├─ Keystroke 1-2: No suggestions         ├─ 0 results? → Trigger fallback:
     │  (wait for 3rd character)              │   1. Fuzzy match (Levenshtein ≤ 2)
     │                                       │   2. Category suggestion
     ├─ Keystroke 3+: Debounced query         │   3. "Did you mean…?" prompt
     │  (150ms debounce)                     │
     │                                       ├─ Results rendered:
     ├─ Typo detected?                       │   Server-side render first 12 items
     │  → Levenshtein distance ≤ 2           │   Client-side infinite scroll after
     │  → Auto-correct + show original       │
     │                                       └─ Filter applied?
     └─ Enter pressed?                           → AJAX request (no page reload)
        → Full search results page               → URL params updated (shareable)
                                                  → Scroll position preserved
```

### 3.2 Journey Map: PDP → Add to Cart → Checkout

| Step | User Action | System Response | Technical Logic |
|---|---|---|---|
| 1 | Opens PDP | Render product page | SSR for SEO; hydrate interactive elements (image viewer, variant selector) client-side |
| 2 | Views images | 360° viewer loads | Lazy-load image set; preload next 2 images; serve WebP with AVIF fallback [See architecture.md] |
| 3 | Selects variant (e.g., color) | UI updates instantly | Client-side state: update price, availability, images without API call if data is pre-fetched in initial payload |
| 4 | Selects variant (e.g., size) | Inventory check | If variant combo not in pre-fetched data → WebSocket ping to inventory service → update availability badge within 200ms |
| 5 | Clicks "Add to Cart" | Item added; mini-cart slides in | `POST /api/cart/items` → validate inventory (optimistic lock) → return updated cart state → animate mini-cart |
| 6 | Clicks "Checkout" | Checkout page renders | Load cart from server (not LocalStorage alone); recalculate totals server-side in user's local currency; apply tax based on shipping address; lock exchange rate |
| 7 | Enters shipping address | Shipping options appear | Address validation via API → detect mixed-inventory (warehouse + dropship) → calculate shipping per fulfillment source → display per-line shipping cost; Gold members see expedited options first |
| 7a | *(Mixed inventory detected)* | Split-shipping disclosure | System partitions cart into fulfillment groups: `warehouse_items[]` + `dropship_items[]` + `seller_fulfilled_items[]`; display separate ETAs per group; single checkout, multiple shipments |
| 8 | Selects payment | Stripe Elements mounts | Mount Stripe `PaymentElement` with `currency` set to user's local currency; tokenize card client-side; never send raw card data to our server [See architecture.md] |
| 9 | Clicks "Place Order" | Order confirmation | `POST /api/orders` → Stripe `PaymentIntent.confirm()` in local currency → on success: decrement inventory per source (atomic DB transaction) → notify dropship partners via webhook → send confirmation email → redirect to confirmation page |
| 10 | Views confirmation | Order summary displayed | Display order ID, itemized receipt in local currency, per-shipment estimated delivery, and support contact; Gold trial offer (if eligible); trigger post-purchase analytics event |

### 3.3 Trust-Building Touchpoints (Embedded in Journeys)

| Touchpoint | Location | System Behavior |
|---|---|---|
| Certification Badges | PDP — below product title | Render badges from `product.certifications[]` array; link each badge to a tooltip explaining the certification |
| Verified Reviews | PDP — reviews section | Filter by `verified_purchase = true` by default; sort by `helpfulness_score` descending |
| Transparent Pricing | PDP + Cart | Total cost (product + shipping + tax) visible at every stage; no hidden fees introduced at checkout |
| Secure Checkout Indicator | Checkout page header | Display lock icon + "256-bit encrypted" text; Stripe badge; no custom payment form |
| Real-Time Inventory | PDP — variant selector | WebSocket feed updates stock status live; display "In Stock", "Low Stock (< 5)", or "Out of Stock" badges; inventory source abstracted |
| Estimated Delivery | PDP + Cart + Checkout | Calculate from `fulfillment_source.sla` (warehouse: 24h, dropship: 48h) + `shipping_carrier.eta`; Gold members see faster delivery estimate; display date range, not vague "3-5 days" |
| Membership Perks Banner | Cart + Checkout | If Free member: show "Upgrade to Gold for faster delivery & free returns" inline prompt with benefit comparison |
| Local Currency | All commerce pages | Prices rendered in user's detected local currency; currency selector available; exchange rate locked at cart entry |

### 3.4 Journey Map: Guest Checkout vs. Account Checkout

| Decision Point | Guest Path | Account Path | System Logic |
|---|---|---|---|
| User arrives at checkout | Show email input + "Continue as Guest" | Auto-populate from session | Check `auth.session` cookie; if valid → Account Path; else → Guest Path |
| Cart persistence | Cart stored in LocalStorage (client) + server-side session (keyed by `session_id` cookie) | Cart stored in DB linked to `user_id` | On login: merge LocalStorage cart with DB cart; conflict resolution = higher quantity wins |
| Payment | Full Stripe Elements form | Saved payment methods + Stripe Elements | Retrieve `stripe_customer_id` → list saved `PaymentMethod` objects → pre-select last used |
| Post-checkout | Show "Create Account" prompt with pre-filled email (from order) | Show order in account dashboard | If guest creates account post-checkout → link order to new `user_id` via `order.email` match |
| Gold Membership Trial | Offer 1-click Gold trial on confirmation page | Offer Gold upgrade if not already Gold | Display value prop: free shipping, faster delivery (priority dispatch), 3–5 day returns, stacked discounts, early access to new arrivals, trending add-on bundles; `POST /api/memberships/trial` on acceptance |

---

## 4. Functional Requirements (Atomic)

### 4.1 Discovery Engine

#### 4.1.1 Autocomplete

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| DISC-001 | Autocomplete activates after 3 characters | Debounced API call (`GET /api/search/suggest?q=`) at 150ms after last keystroke | ≤ 200ms round-trip for suggestion response |
| DISC-002 | Show max 8 suggestions | Return ranked list: 4 product matches + 2 category matches + 2 recent searches (if logged in) | No duplicate entries; results update on each keystroke |
| DISC-003 | Keyboard navigation | Arrow keys traverse suggestions; Enter selects; Escape closes | Focus ring visible on active suggestion (WCAG 2.1 AA) |
| DISC-004 | Suggestion grouping | Group results under headers: "Products", "Categories", "Your Recent Searches" | Headers are decorative (not focusable); screen readers announce group labels |

#### 4.1.2 Typo Tolerance

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| DISC-005 | Auto-correct typos with Levenshtein distance ≤ 2 | Search engine applies fuzzy matching; return corrected results + "Showing results for _X_. Search instead for _Y_?" | Corrected results appear in < 300ms |
| DISC-006 | Preserve original query | Display original query as clickable alternative | Clicking original query bypasses fuzzy matching |
| DISC-007 | Handle phonetic misspellings | Phonetic algorithm (Soundex/Metaphone) as secondary matching layer | "ceramic" matches "seramic"; "knife" matches "knive" |

#### 4.1.3 AJAX Filtering

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| DISC-008 | Faceted filters update without page reload | `GET /api/products?category=X&price_min=Y&...` via AJAX; DOM update via client-side rendering | No full page reload; loading skeleton shown during fetch |
| DISC-009 | Filter state persists in URL | Each filter maps to a URL query param; browser back/forward respects filter state | URL is shareable and produces identical results |
| DISC-010 | Filter counts update dynamically | Each filter option shows the count of matching products after applying current filters | Counts recalculated server-side on each filter change |
| DISC-011 | Multi-select within facets | Checkboxes for material, brand, certification; OR logic within facet, AND logic across facets | Clear individual filter or "Clear All" resets to default |
| DISC-012 | Price range slider | Dual-handle range slider with manual min/max input fields | Slider values debounced at 300ms; input fields validate numeric only |
| DISC-013 | Sort options | Relevance (default), Price Low→High, Price High→Low, Rating, Newest | Sort change triggers AJAX reload; persists in URL as `&sort=` param |

### 4.2 Product Detail Page (PDP)

#### 4.2.1 WebSocket Real-Time Inventory

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| PDP-001 | Real-time stock status via WebSocket | Client subscribes to `ws://inventory/{product_id}`; server pushes on stock change | UI updates within 500ms of inventory change |
| PDP-002 | Stock status badges | Display: "In Stock" (green), "Low Stock — only X left" (amber, when ≤ 5), "Out of Stock" (red) | Badge color and text update without page refresh |
| PDP-003 | Out-of-stock variant handling | Disable variant selector option; show "Notify Me" button | `POST /api/notifications/restock` → stores email + variant ID; sends restock email when `stock > 0` |
| PDP-004 | WebSocket reconnection | Auto-reconnect with exponential backoff (1s, 2s, 4s, max 30s) | Fallback: poll `GET /api/inventory/{product_id}` every 30s if WebSocket fails 3 consecutive times |

#### 4.2.2 360° Product Views

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| PDP-005 | 360° image viewer | Load 24–36 frame image sequence; user drags to rotate | Initial 6 frames load eagerly (< 1s); remaining lazy-loaded |
| PDP-006 | Pinch-to-zoom (mobile) | Touch gesture triggers high-res zoom overlay | Zoom level: 2x and 4x; image served at appropriate resolution per zoom level |
| PDP-007 | Fallback for low bandwidth | Detect via `navigator.connection.effectiveType`; if `2g` or `slow-2g` → serve static gallery instead of 360° | Static gallery = 4 curated angles; no degraded UX |
| PDP-008 | Accessibility for image viewer | Arrow keys rotate image; alt text describes each angle; screen reader announces rotation position | "Image 5 of 24: Front-left angle of Ceramic Cookware Set" |

#### 4.2.3 Variant State Management

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| PDP-009 | Variant selection updates all dependent UI | Selecting a variant (color, size, material) updates: price, images, availability, SKU, breadcrumb | All updates occur in < 100ms (client-side state) if data is pre-fetched |
| PDP-010 | Unavailable variant combinations | Gray-out impossible combinations (e.g., "Blue" + "XL" does not exist) | Impossible combos determined from `variant_matrix[]` in product payload |
| PDP-011 | Deep-linkable variants | Variant selection reflected in URL: `/product/slug?color=blue&size=lg` | Shared URL renders with correct variant pre-selected |
| PDP-012 | Variant-specific reviews | Filter reviews by selected variant when variant has > 10 reviews | "Showing reviews for Blue / Large"; toggle to "Show all reviews" available |

### 4.3 Checkout

#### 4.3.1 Stripe Elements Integration

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| CHK-001 | Mount Stripe `PaymentElement` | Render Stripe's pre-built UI component in checkout; supports cards, Apple Pay, Google Pay | No raw card data touches our servers; PCI DSS compliance via Stripe.js |
| CHK-002 | Payment intent lifecycle | `POST /api/checkout/create-intent` → return `client_secret` → confirm on client via `stripe.confirmPayment()` | On success: `payment_intent.status === 'succeeded'`; on failure: display Stripe error message verbatim |
| CHK-003 | Saved payment methods (Account users) | Retrieve via `GET /api/users/{id}/payment-methods` → render list with last-4 digits and brand icon | User can select saved method or add new; default = last used |
| CHK-004 | SCA / 3D Secure handling | Stripe automatically triggers 3DS when required by issuing bank | 3DS modal handled by Stripe SDK; no custom implementation; on success → resume flow; on failure → show error |
| CHK-005 | Idempotent order submission | `POST /api/orders` includes `Idempotency-Key` header (UUID v4, generated client-side) | Duplicate submissions (network retry, double-click) produce the same order; no duplicate charges |

#### 4.3.2 LocalStorage Cart Persistence

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| CHK-006 | Persist cart in LocalStorage | On every cart mutation: serialize cart → `localStorage.setItem('cart', JSON.stringify(cart))` | Cart survives browser refresh and tab close |
| CHK-007 | Cart hydration on page load | On app init: read LocalStorage → validate items against server (price, availability) → reconcile | Stale items (price changed, out-of-stock) flagged with inline notice; user must acknowledge before checkout |
| CHK-008 | Cart merge on login | If LocalStorage cart exists AND server-side cart exists → merge | Conflict resolution: higher quantity wins; duplicates collapsed; merged cart saved to server + LocalStorage |
| CHK-009 | Cart expiration | LocalStorage cart entries expire after **7 days** (store `added_at` timestamp per item) | Expired items silently removed on next hydration; no user notification for expired items |
| CHK-010 | Storage quota handling | If `localStorage.setItem` throws `QuotaExceededError` → degrade gracefully | Fall back to session-only cart (in-memory); log error to monitoring; user is not blocked |

#### 4.3.3 1-Click Gold Membership Trial

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| CHK-011 | Gold trial offer on confirmation page | After successful order: render Gold trial card with full value props (see GOLD-001 through GOLD-008 below) | Single CTA: "Start Free 30-Day Trial" — no multi-step form |
| CHK-012 | 1-click activation | `POST /api/memberships/trial` with `user_id` and `payment_method_id` (from just-completed order) | Trial starts immediately; no charge for 30 days; auto-converts to $9.99/mo unless canceled |
| CHK-013 | Trial terms transparency | Display: trial duration, renewal price, cancellation policy — all visible without scrolling, before CTA | Legal copy: "You will be charged $9.99/month after 30 days. Cancel anytime from Account Settings." |
| CHK-014 | Duplicate trial prevention | Check `user.membership_history` for prior trial | If prior trial exists → show "Welcome back" upgrade offer at $7.99/mo (first 3 months) instead of free trial |
| CHK-015 | Gold benefits instant activation | On trial start: update `user.membership_tier` → recalculate shipping (free), unlock priority delivery, activate return window change, apply discount stacking on any pending orders | Benefits reflected in UI within the same session; no logout/login required |

### 4.4 Inventory & Fulfillment (Hybrid Model)

#### 4.4.1 Fulfillment Source Routing

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| INV-001 | Determine fulfillment source per item | On `Add to Cart`: tag each item with `fulfillment_source` enum: `WAREHOUSE`, `SELLER_FULFILLED`, `DROPSHIP` | Source resolved from `product.inventory_source` field; abstracted from customer UI |
| INV-002 | Mixed-inventory cart detection | On checkout entry: partition cart items by `fulfillment_source` into separate shipment groups | Display per-group shipping cost and ETA; single payment, multiple shipments |
| INV-003 | Mixed-inventory order splitting | `POST /api/orders` creates one parent order + N child sub-orders (one per fulfillment source) | Each sub-order has independent tracking number, status, and ETA |
| INV-004 | Inventory source abstraction | Customer-facing UI never reveals whether an item is warehouse-stocked, seller-fulfilled, or dropshipped | All items display under unified brand; shipping labels use platform return address |

#### 4.4.2 Dropshipping SLA

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| INV-005 | 48-hour dispatch SLA for dropshipped items | On order creation: start SLA timer; dropship partner receives order via webhook with `dispatch_deadline` timestamp | SLA timer visible in seller/partner dashboard |
| INV-006 | SLA breach escalation | At `T+24h`: auto-send reminder to partner; at `T+44h`: escalate to operations team | Partner receives email + dashboard alert at each stage |
| INV-007 | Auto-cancel on SLA breach | At `T+72h` with no dispatch confirmation: auto-cancel sub-order → initiate full refund → notify customer | Refund processed within 3–5 business days; customer email includes apology + 10% discount code [See Section 5] |
| INV-008 | Partner SLA scoring | Track `on_time_dispatch_rate` per partner; if < 90% over rolling 30 days → flag for review | Below 85% → auto-suspend new orders to partner; notify PM dashboard |

#### 4.4.3 Warehouse Fulfillment

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| INV-009 | 24-hour dispatch SLA for warehouse items | Pick/pack/ship within 24h of order placement; priority dispatch for Gold members | Gold orders flagged `priority = true` in warehouse management system |
| INV-010 | Warehouse inventory sync | Real-time sync between warehouse management system (WMS) and platform inventory DB | Stock discrepancy > 5 units triggers reconciliation alert |

### 4.5 Membership Tiers & Benefits

#### 4.5.1 Tier Comparison Matrix

| Benefit | Free Member | Gold Member ($9.99/mo) |
|---|---|---|
| **Return Window** | 7–15 business days | 3–5 business days (expedited processing) |
| **Delivery Speed** | Standard shipping (carrier default ETA) | Priority dispatch (warehouse: same-day pick; dropship: flagged priority) + free expedited shipping |
| **Shipping Cost** | Calculated per order (weight + destination) | Free on all orders (no minimum) |
| **Discount Stacking** | Single promo code per order | Stack up to 2 promo codes + automatic 5% Gold loyalty discount on every order |
| **Early Access** | None | 48h early access to new product launches, restocks, and "Modular" drops |
| **Trending Add-Ons** | Not available | Curated "Trending Add-Ons" bundle suggestions at checkout (personalized, based on cart + browsing history) |
| **Exclusive Pricing** | Standard pricing | Gold-exclusive prices on select items (typically 8–12% below standard) |
| **Support Priority** | Standard queue (target response: < 24h) | Priority support queue (target response: < 2h) |

> [!NOTE]
> Full membership economy rules, stacking logic, and upgrade/downgrade flows are detailed in [Section 6](#6-membership-economy-gold-tier).

#### 4.5.2 Membership Benefits — Functional Requirements

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| GOLD-001 | Expedited return processing (Gold) | Gold returns processed within 3–5 business days of item receipt at warehouse | Return label auto-generated; pickup scheduled if available in region |
| GOLD-002 | Standard return processing (Free) | Free returns processed within 7–15 business days of item receipt | Return shipping cost borne by customer unless item is defective |
| GOLD-003 | Priority delivery flagging (Gold) | On order placement: if `user.membership_tier === 'gold'` → set `priority = true` on all sub-orders | Warehouse picks Gold orders first; dropship partners receive priority flag in webhook payload |
| GOLD-004 | Free shipping calculation (Gold) | If Gold: set `shipping_cost = 0` for all items regardless of weight, destination, or seller | Shipping cost absorbed by platform (factored into Gold subscription margin) |
| GOLD-005 | Discount stacking engine (Gold) | Gold members: apply `gold_loyalty_discount` (5%) + allow up to 2 promo codes | Discounts applied in order: promo codes first → Gold discount on remaining total; total discount capped at 30% |
| GOLD-006 | Trending add-on suggestions (Gold) | At checkout: query `GET /api/recommendations/trending?cart_items=X&user_id=Y` → return 3 add-on bundles | Bundles personalized via collaborative filtering; display as carousel below cart summary |
| GOLD-007 | Early access gating (Gold) | New product launches: set `visible_to` = `gold` for first 48h → then `visible_to` = `all` | Gold members see "Early Access" badge; standard members see "Coming Soon" with countdown |
| GOLD-008 | Exclusive pricing (Gold) | Products with `gold_price` field: display Gold price to Gold members, standard price to others | PDP shows crossed-out standard price + Gold price; savings percentage displayed |

### 4.6 Multi-Currency & Internationalization

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| INTL-001 | Auto-detect user currency | On first visit: resolve currency from GeoIP → map to supported currency list → set `user.currency` | Supported currencies: USD, EUR, GBP, CAD, AUD, JPY, INR, BRL, SGD, AED (expandable) |
| INTL-002 | Manual currency override | Currency selector in site header; persisted in cookie + user profile (if logged in) | Override takes effect immediately across all pages without reload (client-side re-render) |
| INTL-003 | Exchange rate management | Rates fetched from provider API every 15 min; cached in Redis; fallback to last-known rate if API fails | All prices derived from base USD price × current rate; no manual per-currency pricing |
| INTL-004 | Checkout rate locking | On checkout page load: lock exchange rate for the session; store `locked_rate` + `locked_at` timestamp | If session > 30 min old at payment: re-lock rate and display updated total with change notice |
| INTL-005 | Multi-currency Stripe integration | Create `PaymentIntent` with `currency` param matching user's selected currency | Stripe handles settlement; platform receives USD equivalent; no manual FX reconciliation |
| INTL-006 | Localized formatting | Format prices using `Intl.NumberFormat` with locale-appropriate separators, symbols, and decimal precision | ¥1,234 (JPY, no decimals); €12,34 (EUR, comma decimal); $12.34 (USD, dot decimal) |
| INTL-007 | Tax calculation by region | Tax engine calculates VAT/GST/Sales Tax based on shipping destination country + region | EU: VAT inclusive display; US: tax added at checkout; displayed clearly at every stage |

### 4.7 Marketplace Seller Economics

| Req ID | Requirement | System Behavior | Acceptance Criteria |
|---|---|---|---|
| MKT-001 | Flat 5% commission | On order completion: calculate `commission = item_price × 0.05` per item (excludes shipping & tax) | Commission deducted before payout; visible in seller dashboard per-order and aggregated |
| MKT-002 | Commission transparency | Seller dashboard shows: gross sale, 5% commission deduction, net earnings, per order | Exportable as CSV; filterable by date range, product, order status |
| MKT-003 | Payout schedule | Net earnings disbursed T+7 business days after order marked `delivered` | Payout via Stripe Connect; seller sets bank account in onboarding; minimum payout threshold: $10 |
| MKT-004 | Commission on returns | If item returned: reverse commission; credit 5% back to seller's next payout | Reversal visible as line item in seller's earnings ledger |
| MKT-005 | Dropship partner commission | Same 5% flat rate applies to dropshipped items; commission calculated on item price charged to customer | Partner payout = item cost (wholesale) paid separately; platform retains markup + 5% commission |

---

## 5. High-Density Edge Case Matrix

### 5.1 Race Conditions

| Edge Case | Trigger Condition | System Response | Resolution Logic |
|---|---|---|---|
| Simultaneous checkout of last item | Two users click "Place Order" for the same item when `stock = 1` | Optimistic locking on inventory row; first `UPDATE` to decrement wins | Losing transaction: Stripe `PaymentIntent` canceled before capture; user sees "Item sold out" with suggested alternatives |
| Concurrent cart-add at low stock | `stock = 3`; 5 users add item to cart simultaneously | Cart-add succeeds (soft reservation); inventory validated again at checkout entry | At checkout: if `stock < cart_quantity` → show "Only X remaining" and auto-adjust quantity; user confirms |
| Double-click on "Place Order" | User clicks submit twice in rapid succession | `Idempotency-Key` header (UUID v4) ensures duplicate `POST /api/orders` returns same response | No duplicate charge; no duplicate order; second request returns `200` with existing order data |
| WebSocket reconnect during stock change | User's WebSocket drops; stock changes from "In Stock" to "Out of Stock" | On reconnect: server pushes full current state (not delta) | If item in user's cart is now OOS → surface inline cart warning on next page interaction |
| Concurrent variant selection | Two users select last unit of same variant (e.g., Blue/Large) | Variant-level optimistic lock; `stock` tracked per SKU, not per product | Loser sees variant grayed out + "Notify Me" button within 500ms of the other user's successful checkout |

### 5.2 Mixed-Inventory Logistics

| Edge Case | Trigger Condition | System Response | Resolution Logic |
|---|---|---|---|
| Multi-source cart (warehouse + dropship + seller) | Cart contains items from ≥ 2 fulfillment sources | Partition into fulfillment groups at checkout; display per-group ETA and shipping cost | Single payment; parent order + N child sub-orders; each sub-order tracked independently |
| Partial fulfillment failure | Warehouse sub-order ships; dropship sub-order fails SLA | Each sub-order has independent lifecycle; customer notified per-shipment | Failed sub-order follows SLA breach flow (INV-007); shipped items unaffected; partial refund for failed items only |
| Split-shipment returns | Customer returns 1 item from a 3-item, 2-shipment order | Return initiated per sub-order; refund calculated per item (item price + proportional shipping if applicable) | Return label generated for correct fulfillment source; inventory re-added to correct source |
| Dropship item bundled with DTC item | Free shipping promo applies to DTC items; dropship has separate shipping | System calculates: DTC shipping = promotional rate; dropship shipping = standard rate | Cart displays per-group shipping breakdown; Gold members: all shipping = $0 regardless |
| Mixed-inventory with international shipping | Cart has warehouse item (US) + dropship item (EU supplier) | Calculate customs/duties per shipment; display per-line landed cost estimate | Warn customer: "This order ships in 2 packages. Delivery dates may vary."; duties calculated via tax engine |
| Address change after order split | Customer updates shipping address post-order but pre-dispatch | If sub-order status = `processing` → allow address update; if `dispatched` → deny with explanation | Address update propagated to fulfillment source via webhook; updated ETA recalculated |

### 5.3 Dropshipping SLA Breaches

| Edge Case | Trigger Condition | System Response | Resolution Logic |
|---|---|---|---|
| SLA breach at T+48h (no dispatch) | Dropship partner has not confirmed dispatch within 48h | Auto-send escalation email to partner + flag in operations dashboard | System waits until T+72h for resolution before auto-action |
| SLA breach at T+72h (auto-cancel) | No dispatch confirmation by 72h | Auto-cancel dropship sub-order → initiate full refund → notify customer | Refund via Stripe `Refund.create()`; customer email includes apology + 10% discount code (single-use, 30-day expiry) |
| SLA breach on Gold member order | Gold member's dropship item breaches 48h SLA | Escalate at T+24h (earlier than standard T+48h); Gold orders have priority SLA | If unresolved at T+48h for Gold → auto-cancel + refund + 15% discount code + priority rebooking offer |
| Partner dispatches at T+71h (just before auto-cancel) | Dispatch confirmation arrives between T+48h and T+72h | Accept dispatch; cancel auto-cancel timer; update tracking | Flag as late fulfillment; increment partner's `late_dispatch_count`; partner SLA score degraded |
| Repeated SLA breaches by same partner | Partner `on_time_dispatch_rate` falls below 85% over rolling 30 days | Auto-suspend partner from receiving new orders; notify PM team | Partner must complete remediation review before reinstatement; existing in-flight orders unaffected |
| Customer cancels during SLA breach window | Customer requests cancellation while dropship sub-order is in breach | Immediately cancel sub-order → refund → no need to wait for T+72h | If partner has already dispatched (race condition): initiate return-to-sender via partner |

### 5.4 Data Privacy (GDPR / CCPA)

| Edge Case | Trigger Condition | System Response | Resolution Logic |
|---|---|---|---|
| Right-to-erasure request (GDPR Art. 17) | EU user submits data deletion request via Account Settings or email | `POST /api/privacy/erasure` → queue async job → anonymize PII within 30 days | Anonymize: name → "Deleted User", email → hash, address → null; retain order records with anonymized data for financial compliance (7 years) |
| CCPA "Do Not Sell" opt-out | US (CA) user clicks "Do Not Sell My Personal Information" | Set `user.ccpa_opt_out = true` → disable all third-party data sharing → update cookie consent | Suppress marketing pixels (Meta, Google Ads); retain first-party analytics; confirm opt-out via email |
| Data export request (GDPR Art. 20) | User requests portable copy of their data | `GET /api/privacy/export` → generate JSON/CSV bundle → email download link (valid 72h) | Bundle includes: profile, orders, reviews, saved items, membership history; excludes internal analytics |
| Cookie consent withdrawal | User revokes cookie consent via banner | Immediately stop non-essential cookies; delete existing tracking cookies; update `consent_status` | Essential cookies (session, cart, currency) remain; analytics and marketing cookies purged client-side |
| Cross-border data transfer | EU user's data processed on US servers | Ensure Standard Contractual Clauses (SCCs) are in place; log all cross-border transfers | Privacy policy discloses transfer; DPO contact available; transfer logged in compliance audit trail |
| Minor's data (under 16, EU) | Age verification fails or user self-declares as minor | Block account creation; do not store any PII; display age-gate message | "You must be 16 or older to create an account. Please ask a parent or guardian." |
| Breach notification | Unauthorized access to PII detected | Notify affected users within 72h (GDPR); notify California AG if > 500 CA residents affected (CCPA) | Incident response: contain breach → assess scope → notify DPO → notify users → file regulatory reports |

### 5.5 Payment & Financial Edge Cases

| Edge Case | Trigger Condition | System Response | Resolution Logic |
|---|---|---|---|
| Payment intent expires | User abandons checkout; Stripe `PaymentIntent` expires after 24h | On return: create new `PaymentIntent`; re-validate cart (prices, stock) | Old intent auto-canceled by Stripe; no orphaned charges |
| Currency rate shift during checkout | Exchange rate changes > 2% between cart entry and payment confirmation | Force rate re-lock; display updated total with delta explanation | "Prices have been updated due to currency changes. Your new total is X." User must re-confirm |
| Stripe webhook failure | `payment_intent.succeeded` webhook not received within 60s | Polling fallback: query `PaymentIntent` status via Stripe API every 30s for 5 min | If confirmed via poll: proceed with order; if still pending after 5 min: hold order + alert operations |
| Refund on multi-currency order | Refund requested on order paid in non-USD currency | Refund issued in original payment currency at original locked rate | No FX gain/loss for customer; platform absorbs any rate difference |
| Chargeback received | Stripe sends `charge.dispute.created` webhook | Auto-pause seller payout for disputed item; gather evidence (order details, tracking, delivery confirmation) | Submit dispute evidence via Stripe API within 7 days; if lost: deduct from seller balance (marketplace items) or absorb (DTC) |

### 5.6 Membership Edge Cases

| Edge Case | Trigger Condition | System Response | Resolution Logic |
|---|---|---|---|
| Gold trial expires mid-order | User's 30-day trial ends while they have items in cart with Gold pricing | On next cart hydration: recalculate with standard pricing; display change notice | "Your Gold trial has ended. Prices have been updated. Upgrade to keep your discounts." |
| Downgrade from Gold to Free | User cancels Gold subscription | Gold benefits remain active until end of current billing period; Free tier activates on expiry | No partial refund for remaining Gold period |
| Double trial attempt | User who previously had Gold trial signs up again | `user.membership_history` check → deny free trial → offer "Welcome back" at $7.99/mo (3 months) | If user creates new account with same email: email-level dedup prevents second trial |
| Payment failure on renewal | Stripe fails to charge renewal ($9.99) | Retry at T+3 days, T+7 days; during retry: benefits remain active | After 3 failed attempts: downgrade to Free; notify user; offer to update payment method |

---

## 6. Membership Economy (Gold Tier)

### 6.1 Tier Architecture

| Dimension | Free | Gold ($9.99/mo) |
|---|---|---|
| **Target Persona** | All users (default) | Brand loyalists; high-AOV customers |
| **Conversion Funnel** | Organic sign-up | Prompted post-checkout (1-click trial) or after 2nd purchase |
| **Trial Offer** | N/A | 30-day free trial |
| **Auto-Renewal** | N/A | Yes, $9.99/mo after trial |
| **Cancellation** | N/A | Anytime from Account Settings; benefits until period end |
| **Upgrade Path** | → Gold | N/A (highest tier) |
| **Downgrade Path** | N/A | → Free (at period end) |

### 6.2 Benefit Matrix (Detailed)

| Benefit Category | Free | Gold ($9.99/mo) |
|---|---|---|
| **Shipping** | Standard rates | Free on all orders |
| **Delivery Priority** | Standard queue | Priority dispatch (warehouse: same-day pick) |
| **Return Window** | 7–15 business days | 3–5 business days |
| **Return Shipping** | Customer pays (unless defective) | Free return shipping |
| **Loyalty Discount** | None | 5% on every order |
| **Promo Code Stacking** | 1 code per order | 2 codes + 5% loyalty |
| **Discount Cap** | 15% max per order | 30% max per order |
| **Early Access — Product Launches** | None | 48h early access to new launches + "Modular" drops |
| **Early Access — Seasonal Sales** | None | 48h early access |
| **Exclusive Pricing** | Standard | 8–12% below standard on select items |
| **Trending Add-On Bundles** | Not available | Personalized trending bundles at checkout |
| **Support Response Time** | < 24h | < 2h |
| **Birthday Perk** | None | 15% birthday coupon + free gift wrap on next order |
| **Exclusive Collections** | None | Access to limited-run Gold-only SKUs |

### 6.3 Discount Stacking Logic (Hard Rules)

> [!IMPORTANT]
> These rules are immutable. No override is permitted without PM + Engineering sign-off.

#### 6.3.1 Stacking Rules Engine

| Rule ID | Rule | Input | Logic | Output |
|---|---|---|---|---|
| STK-001 | Promo codes apply before loyalty discount | Cart total + promo codes + membership tier | `discounted_total = cart_total - promo_discount`; then `final_total = discounted_total × (1 - loyalty_rate)` | Loyalty discount calculated on post-promo subtotal |
| STK-002 | Free members: max 1 promo code | `user.tier = free`; `applied_promos.length` | If `applied_promos.length > 1` → reject second code with message | "Free members can apply 1 promo code per order. Upgrade to Gold for more." |
| STK-003 | Gold members: max 2 promos + 5% loyalty | `user.tier = gold`; up to 2 promo codes + 5% | Apply promos sequentially (largest first) → then 5% on remainder; cap at 30% | If combined > 30% → cap at 30%; display "Maximum discount reached" |
| STK-004 | Membership discount CANNOT stack with clearance items | Item has `pricing_tag = 'clearance'` | Skip loyalty discount for clearance items; promo codes still apply if code allows clearance | Clearance items show: "Loyalty discount does not apply to clearance items" |
| STK-005 | Exclusive member pricing replaces standard price (not additive) | Item has `gold_price` | Member price IS the base price; loyalty discount applies on top of member price | Member price + loyalty discount allowed; promo codes also apply unless code excludes member-priced items |
| STK-006 | Seasonal promo + membership discount: allowed | Sitewide seasonal promo (e.g., "SUMMER20") + membership tier | Seasonal promo applied first → loyalty discount on remainder | Both stack within the per-tier cap (15% / 30%) |
| STK-007 | Referral credit stacks with everything | User has referral credit balance | Referral credit applied last, after all discounts, as a dollar-amount deduction | Referral credit reduces final total; no cap interaction; can bring total to $0 |

#### 6.3.2 Stacking Decision Flowchart

```
[Cart Total] → Apply Member Exclusive Pricing (if applicable)
     │
     ├─ Item has gold_price?
     │  → YES: Use member price as base
     │  → NO: Use standard price
     │
     ▼
[Adjusted Subtotal] → Apply Promo Code(s)
     │
     ├─ How many codes allowed?
     │  Free: 1 │ Gold: 2
     │
     ├─ Is item clearance?
     │  → YES: Check if promo allows clearance
     │  → NO: Apply promo discount
     │
     ▼
[Post-Promo Subtotal] → Apply Loyalty Discount
     │
     ├─ Is item clearance?
     │  → YES: Skip loyalty discount for this item
     │  → NO: Apply tier rate (0% / 5%)
     │
     ▼
[Post-Loyalty Subtotal] → Check Discount Cap
     │
     ├─ Total discount % > tier cap?
     │  Free: 15% │ Gold: 30%
     │  → YES: Clamp to cap; display notice
     │  → NO: Proceed
     │
     ▼
[Capped Subtotal] → Apply Referral Credit (if any)
     │
     └─ Deduct dollar amount → [Final Total]
```

### 6.4 Upgrade, Downgrade & Cancellation Flows

| Action | Trigger | System Behavior | Billing Logic |
|---|---|---|---|
| Free → Gold | User clicks "Start Gold Trial" on confirmation page, account settings, or prompted after 2nd purchase | Start 30-day trial; collect payment method; `user.tier = gold` | No charge for 30 days; auto-charge $9.99/mo on day 31 |
| Gold → Free | User cancels Gold | Gold benefits remain until end of billing period; Free tier on expiry | No further charges; `user.tier` updated to `free` at period end |
| Renewal payment failure | Stripe charge declined | Retry at T+3, T+7, T+10 days; benefits active during retry window | After 3 failures: downgrade to Free; notify user; offer to update payment method |

---

## 7. Implementation Roadmap

### 7.1 Phase 1 — Visual Shell (Weeks 1–4)

**Objective:** Achieve full UI fidelity with static mock data. All pages render correctly and pass visual QA.

| Deliverable | Description | Exit Criteria |
|---|---|---|
| Design System Implementation | Implement all tokens, typography, color palette, spacing, and components per [See design-system.md] | All components render; Storybook (or equivalent) catalog complete |
| Homepage | Hero section with brand USP ("Self-Sanitizing Surfaces & Modular Multi-Taskers"); featured categories; trending products | LCP < 1.2s with mock data; responsive across breakpoints |
| Category / Search Results Page | Product grid with filter sidebar; sort controls; pagination/infinite scroll | AJAX filtering works with mock data; URL state sync functional |
| Product Detail Page (PDP) | 360° viewer (static frames); variant selector; reviews section; trust badges | All interactive elements functional with mock data; variant state management working |
| Cart & Mini-Cart | Slide-in mini-cart; full cart page; quantity controls; price breakdown | LocalStorage persistence working; cart survives refresh |
| Checkout Flow | Single-page accordion: Cart → Shipping → Payment → Review → Confirmation. All steps on one page; active step expanded, completed steps collapsed with edit link. | Stripe Elements mounted (test mode); form validation complete; accordion expand/collapse transitions working |
| Account Pages | Profile, order history, saved items, membership management | Static data renders correctly; all navigation items work |
| Seller Dashboard | Product listing management, analytics mock, earnings summary | 5 navigation items max; progressive disclosure working |
| Responsive & Accessibility Audit | All pages pass WCAG 2.1 AA automated checks | axe-core: 0 violations; keyboard navigation complete; screen reader tested |

### 7.2 Phase 2 — Logic Grafting (Weeks 5–10)

**Objective:** Replace mock data with live backend. All business logic operational.

| Deliverable | Description | Exit Criteria |
|---|---|---|
| Supabase Integration | Database schema, RLS policies, auth (email + OAuth), real-time subscriptions [See architecture.md] | All CRUD operations functional; RLS tested per persona |
| Search Engine | Autocomplete, typo tolerance, faceted filtering connected to live product data | DISC-001 through DISC-013 passing |
| Inventory System | WebSocket real-time stock; hybrid fulfillment routing (warehouse/dropship/seller); mixed-cart splitting | INV-001 through INV-010 passing; race condition tests green |
| Stripe Payment Integration | PaymentIntent lifecycle, multi-currency, saved methods, 3DS, idempotency | CHK-001 through CHK-015 passing; test charges in all supported currencies |
| Membership Engine | Free/Gold tier logic; trial flows; upgrade/downgrade; discount stacking engine | STK-001 through STK-007 passing; GOLD-001 through GOLD-008 passing |
| Order Management | Order creation, sub-order splitting, status tracking, refund flows | Parent + child order model working; partial refund tested |
| Seller Onboarding & Management | Guided wizard, CSV upload, inventory sync, 5% commission calculation, Stripe Connect payouts | MKT-001 through MKT-005 passing; payout tested in Stripe test mode |
| Email Transactional System | Order confirmation, shipping updates, SLA breach notifications, membership emails | All email templates rendering; triggered by correct events |
| Privacy & Compliance | GDPR erasure flow, CCPA opt-out, cookie consent, data export | All privacy edge cases from §5.4 passing |

### 7.3 Phase 3 — Growth (Weeks 11–16)

**Objective:** Optimize for acquisition, retention, and international expansion.

| Deliverable | Description | Exit Criteria |
|---|---|---|
| SEO Foundation | SSR/SSG for all public pages; structured data (JSON-LD) for products; sitemap.xml; meta tags | Google Search Console: 0 crawl errors; all products indexed within 14 days |
| A/B Testing Infrastructure | Feature flag system; experiment framework for checkout, PDP, and pricing experiments | First experiment (checkout CTA variant) live; statistical significance calculator integrated |
| Internationalization (i18n) | Multi-currency live (INTL-001–007); locale detection; RTL support for Arabic markets | All Tier 1 currencies functional; prices render correctly per locale |
| Performance Optimization | Image CDN (AVIF/WebP); code splitting; edge caching; prefetching | LCP < 1.2s (P75); FCP < 0.8s; CLS < 0.05 across all pages |
| Analytics & Reporting | Event tracking (add-to-cart, checkout, purchase); funnel visualization; GMV dashboard | All KPIs from §1.2 and §1.3 tracked and visualized |
| Abandoned Cart Recovery | Email sequence at T+30min, T+24h, T+72h; personalized product reminders | Sequence tested; open rate > 30%; recovery rate > 5% |
| Seller Growth Tools | Seller analytics dashboard (impressions, CTR, conversion); international traffic breakdown | Alice persona flow fully operational |
| Tier 2 Market Prep | Localized compliance review; regional shipping partner integration; market-specific pricing research | Tier 2 launch checklist created; compliance gaps documented |

### 7.4 Milestone Summary

```
Week  1 ─────── 4        5 ─────────── 10       11 ─────────── 16
│   PHASE 1:          │   PHASE 2:            │   PHASE 3:            │
│   Visual Shell      │   Logic Grafting      │   Growth              │
│                     │                       │                       │
│ ✓ Design system     │ ✓ Supabase + Auth     │ ✓ SEO launch          │
│ ✓ All pages (mock)  │ ✓ Stripe payments     │ ✓ A/B framework       │
│ ✓ Responsive + a11y │ ✓ Inventory + WS      │ ✓ i18n (Tier 1)       │
│ ✓ Checkout shell    │ ✓ Membership engine   │ ✓ Performance pass    │
│                     │ ✓ Seller tools        │ ✓ Analytics live      │
│                     │ ✓ Privacy/GDPR        │ ✓ Tier 2 prep         │
└─────────────────────┴───────────────────────┴───────────────────────┘
        Gate 1:                Gate 2:                Gate 3:
     Visual QA Pass       Functional QA Pass      Production Launch
```

---

## 8. PM Assumptions (2026 Standards)

> [!IMPORTANT]
> These assumptions form the baseline for all business logic in this PRD. If any assumption is invalidated, the dependent requirements must be re-evaluated.

### 8.1 Pricing Assumptions

| Assumption ID | Assumption | Basis | Dependent Requirements |
|---|---|---|---|
| ASM-P01 | Median product price range: $15–$120 USD | IKEA Home & Kitchen comparable positioning; validated via competitor analysis (2026) | All AOV targets, discount cap calculations, free-shipping thresholds |
| ASM-P02 | Premium product cap: $300 USD | Products above $300 require PM approval; protects mid-market positioning | PDP price display logic; admin approval workflow |
| ASM-P03 | Gold membership: $9.99/mo | Competitive with Amazon Prime monthly ($14.99) at ~33% lower; justified by narrower product vertical scope | Membership ROI modeling; break-even at 2 orders/month with free shipping |
| ASM-P04 | No intermediate paid tier | Two-tier model (Free + Gold) simplifies UX and maximizes Gold conversion rate | Gold trial CTA placement; membership upgrade prompts |
| ASM-P05 | Marketplace commission: flat 5% | Below industry average (15–20% for Amazon, 8–15% for Etsy, 2026); attracts artisan sellers | MKT-001 through MKT-005; seller acquisition targets |
| ASM-P06 | No dynamic/surge pricing | Mid-market trust: prices are stable; no algorithmic price manipulation | Real-time pricing engine not required; prices change via admin only |

### 8.2 Shipping Assumptions

| Assumption ID | Assumption | Basis | Dependent Requirements |
|---|---|---|---|
| ASM-S01 | DTC warehouse dispatch SLA: 24h | Industry standard for owned fulfillment (2026) | INV-009; delivery ETA calculations |
| ASM-S02 | Dropship dispatch SLA: 48h | Contractual requirement with all dropship partners | INV-005 through INV-008; SLA breach escalation chain |
| ASM-S03 | Average domestic shipping: $5.99–$8.99 | Carrier rate contracts (UPS/FedEx/USPS, 2026 rates); weight-based for mid-market products | Shipping cost calculations; Gold free-shipping subsidy budget |
| ASM-S04 | International shipping: $12.99–$29.99 | Varies by destination tier; calculated via carrier API | Multi-currency checkout; cross-border customs estimates |
| ASM-S05 | Free shipping threshold (non-members): $75 | Drives AOV above $85 target; below threshold: standard rates apply | Cart upsell logic: "Add $X more for free shipping" |
| ASM-S06 | Gold free shipping cost absorption: ~$7/order avg | Subsidized by $9.99/mo subscription; break-even at 1.4 orders/month | Gold membership margin modeling |

### 8.3 Inventory & Restock Assumptions

| Assumption ID | Assumption | Basis | Dependent Requirements |
|---|---|---|---|
| ASM-I01 | DTC restock lead time: 2–4 weeks | Supplier contracts (2026); assumes Tier 1 country sourcing | Restock notification timing; "Notify Me" feature trigger |
| ASM-I02 | Dropship partner catalog refresh: weekly | Partners push updated inventory feed every 7 days; real-time deltas via API for stock changes | INV-010; stock discrepancy alerts |
| ASM-I03 | Average SKU count at launch: 2,000–5,000 | Curated catalog (not open marketplace); grows to 10,000+ by end of Year 1 | Search index sizing; filter performance; DB schema planning |
| ASM-I04 | Overstock threshold: > 120 days of inventory | Items with > 120 days supply flagged for markdown or bundling | Clearance pricing logic; STK-005 (no loyalty discount on clearance) |
| ASM-I05 | Stockout tolerance: < 2% of active SKUs | Target: 98%+ in-stock rate across catalog | Inventory alert thresholds; reorder point automation |

### 8.4 Customer Behavior Assumptions

| Assumption ID | Assumption | Basis | Dependent Requirements |
|---|---|---|---|
| ASM-C01 | 60% of traffic is mobile | Industry trend (2026); mobile-first design imperative | Responsive design priority; touch-optimized interactions |
| ASM-C02 | Average session duration: 4–6 minutes | Mid-market e-commerce benchmark; browse-heavy category (Home & Kitchen) | Content depth (360° views, reviews); page load budget |
| ASM-C03 | Guest checkout rate: ~40% of orders | Users prefer speed over account creation on first purchase | Guest flow optimization; post-purchase account creation prompt |
| ASM-C04 | Gold conversion rate: 8–12% of active users within 6 months | Benchmarked against similar DTC subscription models (2026) | Membership revenue forecasting; trial-to-paid funnel targets |
| ASM-C05 | Repeat purchase rate: 30%+ within 90 days | Driven by consumables (cleaning supplies, food storage) and seasonal refreshes | Retention email cadence; loyalty discount ROI |
| ASM-C06 | Average return rate: < 8% | Accurate PDP content (360° views, material specs) reduces purchase mismatch | Return processing SLA; reverse logistics cost modeling |

### 8.5 Technology Assumptions

| Assumption ID | Assumption | Basis | Dependent Requirements |
|---|---|---|---|
| ASM-T01 | Supabase as primary backend (Auth, DB, Realtime, Storage) | Selected for rapid development; PostgreSQL compatibility; real-time subscriptions [See architecture.md] | All backend requirements; WebSocket inventory; RLS policies |
| ASM-T02 | Stripe as sole payment processor | Multi-currency support; Stripe Connect for marketplace payouts; PCI compliance offloaded | CHK-001 through CHK-015; MKT-003; INTL-005 |
| ASM-T03 | CDN-first image delivery | All product images served via CDN (Cloudflare/Vercel Edge); AVIF/WebP auto-format | LCP < 1.2s target; 360° viewer performance |
| ASM-T04 | Edge rendering for Tier 1 markets | SSR/SSG deployed to edge nodes in US, EU, UK, JP, AU | FCP < 0.8s; TTI < 2.0s across Tier 1 regions |
| ASM-T05 | Email transactional provider: Resend or equivalent | API-based email delivery; template engine; webhook status tracking | Order confirmations, SLA breach notifications, membership emails |

---

## 9. Technical Guardrails

### 9.1 Security Requirements

| Req ID | Requirement | Specification | Compliance Standard |
|---|---|---|---|
| SEC-001 | Data encryption at rest | AES-256 encryption for all PII stored in database | SOC 2 Type II; GDPR Art. 32 |
| SEC-002 | Data encryption in transit | TLS 1.3 enforced on all endpoints; HSTS header with `max-age=31536000` | OWASP Top 10 (2025); PCI DSS |
| SEC-003 | API authentication | All API endpoints require valid JWT (Supabase Auth); rate limiting: 100 req/min per user | OWASP API Security Top 10 |
| SEC-004 | Row-Level Security (RLS) | Supabase RLS policies enforce data isolation: users can only access own data; sellers access own products/orders | Supabase best practices; GDPR data minimization |
| SEC-005 | Payment data isolation | No raw card data stored or transmitted by our servers; all payment tokenized via Stripe.js client-side | PCI DSS Level 1 (via Stripe) |
| SEC-006 | Admin access controls | Admin dashboard requires MFA; role-based access (PM, Operations, Support); audit log for all admin actions | SOC 2; internal policy |
| SEC-007 | Dependency security scanning | Automated vulnerability scanning on all npm dependencies; critical CVEs block deployment | Snyk or Dependabot; zero critical/high vulns in production |
| SEC-008 | CSRF protection | Anti-CSRF tokens on all state-changing forms; `SameSite=Strict` on auth cookies | OWASP Top 10 |
| SEC-009 | Content Security Policy | CSP headers restricting script sources to self + trusted CDNs + Stripe.js; no `unsafe-inline` | OWASP; XSS mitigation |
| SEC-010 | Secrets management | All API keys, database credentials, Stripe keys stored in environment variables; never in source code | 12-Factor App; CI/CD pipeline validation |

### 9.2 Accessibility Requirements (WCAG 2.1 AA)

| Req ID | Requirement | Specification | Test Method |
|---|---|---|---|
| A11Y-001 | Color contrast ratios | Minimum 4.5:1 for normal text; 3:1 for large text (≥ 18px or ≥ 14px bold) | axe-core automated scan; manual spot-check |
| A11Y-002 | Keyboard navigation | All interactive elements reachable and operable via keyboard alone; visible focus indicators | Manual keyboard-only walkthrough of all user journeys |
| A11Y-003 | Screen reader compatibility | All images have descriptive `alt` text; form inputs have associated `<label>` elements; ARIA landmarks on all pages | NVDA + Firefox; VoiceOver + Safari testing |
| A11Y-004 | Focus management | Modal dialogs trap focus; focus returns to trigger element on close; no focus loss on dynamic content updates | Manual testing; unit tests for focus behavior |
| A11Y-005 | Error identification | Form validation errors announced to screen readers via `aria-live` regions; errors linked to input via `aria-describedby` | Screen reader testing; automated rule check |
| A11Y-006 | Motion & animation | Respect `prefers-reduced-motion` media query; disable non-essential animations when preference set | OS-level setting; CSS media query verification |
| A11Y-007 | Touch targets | Minimum touch target size: 44×44px on mobile; adequate spacing between interactive elements | Device testing; automated layout check |
| A11Y-008 | Text resizing | Page remains functional when text is resized to 200%; no content truncation or overlap | Browser zoom testing; CSS `rem`-based layout verification |
| A11Y-009 | Skip navigation | "Skip to main content" link visible on keyboard focus; present on every page | Keyboard navigation test |
| A11Y-010 | 360° Viewer accessibility | Arrow keys for rotation; alt text per frame; screen reader announces position ("Image 5 of 24") | PDP-008 compliance; manual screen reader test |

### 9.3 Performance Budgets

| Metric | Budget | Measurement | Enforcement |
|---|---|---|---|
| Largest Contentful Paint (LCP) | < 1.2s (P75) | Lighthouse CI + RUM (Web Vitals) | CI gate: fail deploy if P75 > 1.5s |
| First Contentful Paint (FCP) | < 0.8s (P75) | Lighthouse CI + RUM | CI gate: warn at > 1.0s; fail at > 1.5s |
| Cumulative Layout Shift (CLS) | < 0.05 (P75) | Lighthouse CI + RUM | CI gate: fail deploy if > 0.1 |
| Time to Interactive (TTI) | < 2.0s (P75) | Lighthouse CI | CI gate: warn at > 2.5s |
| Total JavaScript bundle (initial) | < 150 KB (gzipped) | Build-time analysis | CI gate: fail if > 200 KB |
| Total CSS bundle (initial) | < 30 KB (gzipped) | Build-time analysis | CI gate: warn at > 40 KB |
| Image payload per page | < 500 KB (above fold) | Lighthouse audit | Enforce via CDN auto-optimization (AVIF/WebP) |
| API response time (P95) | < 200ms | Server-side monitoring | Alert at > 300ms; investigate at > 500ms |
| WebSocket latency | < 100ms for inventory updates | Client-side timing | Alert if > 500ms sustained |
| Lighthouse Performance Score | ≥ 90 on all pages | Lighthouse CI per deploy | CI gate: fail deploy if < 85 |

### 9.4 Reliability & Uptime

| Requirement | Target | Specification |
|---|---|---|
| Platform uptime | 99.9% (excludes scheduled maintenance) | ≤ 8.76h downtime/year; monitored via uptime checker |
| Scheduled maintenance window | Tuesdays 02:00–04:00 UTC | Announced 48h in advance via status page; maintenance banner in app |
| Database backups | Every 6h; retained for 30 days | Supabase managed backups; point-in-time recovery enabled |
| Disaster recovery RTO | < 4 hours | Restore from backup; DNS failover to standby region |
| Disaster recovery RPO | < 6 hours | Acceptable data loss window based on backup frequency |
| Error rate budget | < 0.1% of requests return 5xx | Server-side monitoring; auto-alert at > 0.05% |

### 9.5 Compliance & Legal Guardrails

| Guardrail | Requirement | Enforcement |
|---|---|---|
| PII data retention | Order PII retained for 7 years (tax/legal); anonymized after if no active account | Automated anonymization job runs monthly |
| Cookie consent | Essential cookies only without consent; analytics/marketing require opt-in | Consent management platform (CMP) integrated; default = deny |
| Age verification | Users must be 16+ (EU) or 13+ (US) to create an account | Age gate on registration; no PII stored for denied users |
| Accessibility legal | WCAG 2.1 AA compliance to mitigate ADA/EAA litigation risk | Quarterly audit; remediation within 30 days of finding |
| Terms of Service | Displayed at registration; version-controlled; changes require re-acknowledgment | `user.tos_accepted_version` tracked; prompt on version mismatch |
| Seller agreements | Marketplace sellers agree to platform ToS + seller-specific terms at onboarding | Signed digitally; stored in compliance archive |

---

> **PRD Contract v1.0.0**
> All coding agents must treat this document as the immutable source of truth.
> Deviations require explicit approval and a version bump to this document.
>
> **Companion Documents:**
> - [See architecture.md] — Technical architecture, infrastructure, service topology, and deployment strategy
> - [See design-system.md] — Visual design tokens, component library, CSS specifications, and brand guidelines
