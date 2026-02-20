---
trigger: always_on
---

# Project Rules — Home & Kitchen Platform

> These rules are **immutable**. They auto-load in every conversation and override any assumptions.
> Source of truth: `docs/PRD.md` · `docs/design-system.md` · `docs/architecture.md`

---

## 1. Mandatory Context Protocol

### Conversation Start — Pre-Flight Check

Before writing ANY code in a conversation, you MUST:

1. Read `docs/QUICK-REFERENCE.md` — understand current project state, what's built, what's next
2. Read `docs/PROGRESS.md` — check component registry, page status, recent decisions
3. Identify the SPECIFIC task and load ONLY the relevant doc sections (see §1.2 below)

### Targeted Doc Reading — What to Read Per Task

Do NOT read all 3 docs cover-to-cover. Read ONLY the relevant sections:

| Task Type | Read These Sections |
|---|---|
| Building a PAGE | `design-system.md §3.x` (layout) + `PRD.md §4` (requirements for that feature) + `architecture.md §2` (file location) + `architecture.md §11.1` (PRD→Architecture traceability) |
| Building a COMPONENT | `design-system.md §4.x` (full spec) + `architecture.md §11.2` (file path mapping) |
| Database / Schema work | `architecture.md §3` (full schema + RLS policies) |
| Stripe / Payments | `architecture.md §4` (Stripe integration) + `PRD.md §4 CHK-*` rows |
| Search / Typesense | `architecture.md §5` (Typesense) + `PRD.md §4 DISC-*` rows |
| Media / Images | `architecture.md §7` (asset strategy) + `design-system.md §6` (image specs) |
| Auth / Security | `architecture.md §6` (Supabase auth) + `architecture.md §9` (security) |
| Styling / Tokens | `design-system.md §1` (tokens) + `architecture.md §10.2` (Tailwind 4 `@theme`) |
| Performance | `architecture.md §8` (caching + budgets) |
| Membership / Gold | `PRD.md §6` (membership economy) + `architecture.md §11.1 GOLD-*` rows |

### Conversation End — Handoff Protocol

At the END of every coding conversation, update `docs/PROGRESS.md`:
- Mark completed items
- Note any unfinished work
- Log key decisions made during the session

---

## 2. No Improvisation Rule

> **If it's not in the docs, don't invent it. ASK the user.**

- Do NOT invent new UI patterns not specified in `design-system.md`
- Do NOT create database tables/columns not in `architecture.md §3`
- Do NOT add npm packages not in the version lock table (`architecture.md §1`)
- Do NOT create files outside the directory structure (`architecture.md §2`)
- Do NOT use colors, fonts, spacing, or shadows not defined in design tokens (`design-system.md §1`)
- Do NOT add urgency patterns — no countdown timers, no "only X left" badges, no scarcity messaging (`PRD §2.2`)
- Do NOT deviate from documented patterns without explicit user approval
- If you encounter a gap in the docs, STOP and ask the user before proceeding

### Proactive Gap Detection

If you identify any of the following during development, STOP and alert the user before proceeding:

- A feature that should logically exist but is not documented in PRD, design-system, or architecture docs
- A missing edge case, error state, or user flow that the docs don't cover
- A system limitation or technical constraint that blocks a documented requirement
- A dependency conflict, security concern, or performance issue not addressed in the docs
- An opportunity to meaningfully improve the UX, performance, or architecture beyond what the docs specify

**Format:** State what's missing, why it matters, and propose a solution. Wait for explicit user approval before acting on it.

---

## 3. Tech Stack Version Locks

> Source: `architecture.md §1`

| Package | Version | Notes |
|---|---|---|
| Next.js | `16.1.6` | **Non-negotiable.** Mitigates CVE-2026-23864. Pin exact. |
| React | `19.2.x` | Server Components + React Compiler. Bundled with Next.js 16.1.6. |
| Tailwind CSS | `4.0.x` | `@theme` in CSS — NO `tailwind.config.js`. |
| Supabase JS | `2.49.x` | `@supabase/supabase-js` |
| Supabase SSR | `0.6.x` | `@supabase/ssr` — cookie-based auth |
| Stripe | `17.x` | Server-side. `@stripe/stripe-js` for client Elements. |
| Typesense | `2.0.x` | `typesense-js` — search client |
| Cloudinary | URL-based | No SDK. Direct URL construction via `cloudinaryUrl()` helper. |
| Resend | `4.x` | Transactional email |
| Radix UI | `1.x` | Unstyled accessible primitives (e.g., `@radix-ui/react-accordion`) |
| cva / clsx / tailwind-merge | latest | Tailwind utility packages for component class construction |
| Framer Motion | `12.x` | Dynamic import ONLY — never synchronous in above-fold |
| GSAP | `3.12.x` | Dynamic import ONLY — isolated in `components/external/` |
| Lucide React | latest | Icon library — `strokeWidth={1.5}`, `currentColor` |

**Do NOT install packages not on this list without asking the user.**

---

## 4. Directory Structure Contract

> Source: `architecture.md §2`

```
src/
├── app/                          # Next.js 16 App Router
│   ├── (shop)/                   # Public shopping routes
│   │   ├── products/             # PLP + PDP
│   │   └── categories/           # Category pages
│   ├── (account)/                # Authenticated user routes
│   ├── (seller)/                 # Seller dashboard routes
│   ├── (checkout)/               # Checkout + confirmation
│   ├── (auth)/                   # Login, register, forgot-password
│   ├── membership/               # Pricing page (public)
│   ├── api/                      # Route Handlers
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── not-found.tsx             # 404
├── components/
│   ├── wellness-ui/              # Design system components (from design-system.md §4)
│   ├── external/                 # Third-party animation wrappers (dynamic import only)
│   └── providers/                # Context providers (cart, currency, auth)
├── hooks/                        # Custom hooks (use-cart, use-inventory, etc.)
├── lib/
│   ├── supabase/                 # Supabase clients (browser, server, admin)
│   ├── stripe/                   # Stripe checkout, subscriptions, connect, webhooks
│   ├── typesense/                # Search client + query builders
│   ├── cloudinary/               # URL builder + upload config
│   ├── currency/                 # Exchange rates, formatting, locking
│   ├── fulfillment/              # Split-order routing, SLA monitoring
│   ├── membership/               # Discount stacking, tier logic
│   ├── database/queries/         # Typed Supabase queries
│   └── utils/                    # Validation, rate-limit, idempotency
├── styles/
│   └── globals.css               # Tailwind 4 @theme + design tokens + utility classes
├── types/                        # Shared TypeScript types
└── proxy.ts                      # Auth, currency detection, security headers (NOT middleware.ts)
```

**Every new file MUST go in the correct location per this structure. No exceptions.**

---

## 5. Naming Conventions

> Source: `architecture.md §2`, `design-system.md`

| Context | Convention | Example |
|---|---|---|
| Files & directories | `kebab-case` | `product-card.tsx`, `use-cart.ts` |
| React components | `PascalCase` | `ProductCard`, `MiniCart` |
| Custom hooks | `use-` prefix + `kebab-case` filename | `useCart()` in `use-cart.ts` |
| Database tables/columns | `snake_case` | `order_items`, `membership_tier` |
| CSS classes (custom) | `kebab-case` | `.container-standard`, `.text-display-xl` |
| Environment variables | `UPPER_SNAKE_CASE` | `NEXT_PUBLIC_SUPABASE_URL` |
| TypeScript types/interfaces | `PascalCase` | `Product`, `OrderItem` |
| Route groups | Parenthesized | `(shop)`, `(account)`, `(checkout)` |
| API routes | RESTful verbs | `GET`, `POST`, `PATCH`, `DELETE` in `route.ts` |

---

## 6. Design Token Enforcement

> Source: `design-system.md §1`, `architecture.md §10.2`

### Absolute Rules

- **ALL colors** must come from `@theme` tokens in `globals.css` — e.g., `text-sage-500`, `bg-surface-default`
- **ALL spacing** must use the 4px baseline scale — `spacing-1` (4px) through `spacing-32` (128px)
- **ALL typography** must use preset classes — `.text-display-xl`, `.text-body-md`, `.text-price-lg`, etc.
- **ALL shadows** must use sage-tinted tokens — `shadow-sm` through `shadow-xl`. No pure black shadows.
- **ALL border radii** must use tokens — `rounded-sm` (8px) through `rounded-full` (9999px)
- **ALL fonts** — Headings: `Lora` (serif), Body: `Satoshi` (sans), Mono: `Geist Mono`

### Tailwind 4 — Critical Difference

Tailwind 4 does **NOT** use `tailwind.config.js`. All theming is done via `@theme` directive in `globals.css`. If you see any code referencing a Tailwind config file, it is WRONG.

---

## 7. Brand Constraints

> Source: `PRD.md §1-2`, `design-system.md §8`

- **Brand DNA:** Organic Modernist — Restorative · Safe · Aspirational · Minimalist
- **Tone:** Japandi minimalism with warm, tactile editorial layouts
- **Core USPs:** Self-Sanitizing Surfaces & Modular Multi-Taskers
- **UX Mandate:** Calm and unhurried. No anxiety triggers.
- **Forbidden patterns:**
  - ❌ Countdown timers
  - ❌ "Only X left" scarcity badges
  - ❌ Aggressive pop-ups or interstitials
  - ❌ Pure black (#000) anywhere — use `stone-900` (#1C1917)
  - ❌ Pure white (#FFF) backgrounds for pages — use `surface-default` (#F2F0EA)
  - ❌ Generic system fonts — always Lora/Satoshi/Geist Mono

---

## 8. Asset Routing

> Source: `architecture.md §7`

| Asset Type | Source | Rule |
|---|---|---|
| Product photos | Cloudinary CDN | MUST use `f_auto,q_auto`. Use `cloudinaryUrl()` helper. |
| 360° frame sequences | Cloudinary CDN | Use `CLOUDINARY_360_PRESET`. 6 eager + lazy rest. |
| Hero/lifestyle images | Cloudinary CDN | `f_auto,q_auto` enforced. |
| UI icons | `/public/assets/icons/` | Lucide SVGs, 24px, stroke 1.5 |
| Brand logo/favicon | `/public/assets/brand/` | SVG + PNG |
| Payment logos | `/public/assets/payment/` | SVG |
| Illustrations | `/public/assets/illustrations/` | SVG |
| Fonts | `/public/fonts/satoshi/` | Satoshi-Variable.woff2 (self-hosted) |

---

## 9. Performance Budgets

> Source: `architecture.md §8.3`

| Metric | Budget | Hard Fail |
|---|---|---|
| LCP | < 1.2s (P75) | > 1.5s |
| FCP | < 0.8s (P75) | > 1.5s |
| CLS | < 0.05 (P75) | > 0.1 |
| TTI | < 2.0s (P75) | > 2.5s |
| JS bundle (initial) | < 150 KB gzip | > 200 KB |
| CSS bundle (initial) | < 30 KB gzip | > 40 KB |
| Lighthouse | ≥ 90 | < 85 |

---

## 10. Environment Variables

> Source: `architecture.md §10.3`

All required env vars (must be set in `.env.local`):

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_GOLD_PRICE_ID

# Typesense
TYPESENSE_HOST
TYPESENSE_API_KEY
TYPESENSE_ADMIN_API_KEY

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

# Currency
EXCHANGE_RATE_API_URL
EXCHANGE_RATE_API_KEY

# Email
RESEND_API_KEY

# App
NEXT_PUBLIC_APP_URL
NODE_ENV
```

Variables prefixed with `NEXT_PUBLIC_` are client-safe. All others are server-only — NEVER expose them to the client.