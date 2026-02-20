# Quick Reference — Home & Kitchen Platform

> **Read this file at the start of every conversation.** It provides fast context loading without reading all 230KB of docs.
> For full details, follow the section references to the source docs.

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| Next.js | `16.1.6` | App Router, RSC, `use cache`, `proxy.ts` |
| React | `19.2.x` | Server Components, React Compiler (auto-memoization) |
| Tailwind CSS | `4.0.x` | `@theme` in CSS — NO `tailwind.config.js` |
| Supabase | `2.49.x` | PostgreSQL, Auth (JWT cookies), Realtime, RLS |
| Stripe | `17.x` | Payments, Subscriptions, Connect (marketplace) |
| Typesense | `2.0.x` | Full-text search, facets, typo tolerance |
| Cloudinary | URL-based | Product images, 360° sequences, CDN |
| Resend | `4.x` | Transactional email |
| Framer Motion | `12.x` | Animations (dynamic import only) |
| Lucide React | latest | Icons (stroke 1.5, 24px default) |

---

## Directory Structure

```
src/
├── app/
│   ├── (shop)/products/          # PLP + PDP
│   ├── (account)/                # Profile, orders, saved, membership
│   ├── (seller)/                 # Seller dashboard, analytics
│   ├── (checkout)/               # Checkout + confirmation
│   ├── (auth)/                   # Login, register, forgot-password
│   ├── membership/               # Pricing page
│   ├── api/                      # Route Handlers
│   ├── layout.tsx                # Root layout (fonts, providers)
│   └── page.tsx                  # Homepage
├── components/
│   ├── wellness-ui/              # Design system components (§4.x specs)
│   ├── external/                 # Animation wrappers (dynamic import)
│   └── providers/                # Cart, currency, auth providers
├── hooks/                        # use-cart, use-inventory, use-search, etc.
├── lib/                          # supabase/, stripe/, typesense/, cloudinary/, etc.
├── styles/globals.css            # Tailwind 4 @theme + all design tokens
├── types/                        # TypeScript types
└── proxy.ts                      # Auth, currency, security headers
```

---

## Design Tokens Summary

| Token Category | Key Values | Source |
|---|---|---|
| **Primary** | Sage: `#4A5D4E` (500), range 50→900 | `design-system.md §1.1` |
| **Secondary** | Amber: `#D97706` (500), Gold accents | `design-system.md §1.1` |
| **Surfaces** | Default: `#F2F0EA`, White: `#FFF`, Warm: `#FAF8F5` | `design-system.md §1.1` |
| **Text** | Primary: `#1C1917`, Secondary: `#57534E`, Muted: `#A8A29E` | `design-system.md §1.1` |
| **Fonts** | Heading: `Lora` (serif), Body: `Satoshi` (sans), Mono: `Geist Mono` | `design-system.md §1.2` |
| **Spacing** | 4px baseline: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 | `design-system.md §1.3` |
| **Radii** | sm: 8px, DEFAULT: 12px, lg: 16px, xl: 20px, 2xl: 24px, full: 9999px | `design-system.md §1.4` |
| **Shadows** | Sage-tinted (rgba(74,93,78,x)), sm→xl. No pure black. | `design-system.md §1.5` |
| **Motion** | fast: 150ms, default: 300ms, slow: 500ms. All ease-out. | `design-system.md §5.1` |

---

## Route Map

| Page | Route Group | Path | Layout | Cache |
|---|---|---|---|---|
| Homepage | root | `/` | Root | 60s |
| PLP | `(shop)` | `/products`, `/categories/[slug]` | Shop | 30s |
| PDP | `(shop)` | `/products/[slug]` | Shop | 300s (static), Realtime (inventory) |
| Checkout | `(checkout)` | `/checkout` | Checkout | None |
| Confirmation | `(checkout)` | `/confirmation` | Checkout | None |
| Login | `(auth)` | `/login` | Auth | None |
| Register | `(auth)` | `/register` | Auth | None |
| Forgot Password | `(auth)` | `/forgot-password` | Auth | None |
| Account Profile | `(account)` | `/account/profile` | Account (sidebar) | None |
| Account Orders | `(account)` | `/account/orders` | Account (sidebar) | None |
| Saved Items | `(account)` | `/account/saved` | Account (sidebar) | None |
| Membership Mgmt | `(account)` | `/account/membership` | Account (sidebar) | None |
| Membership Page | root | `/membership` | Root | 60s |
| Seller Dashboard | `(seller)` | `/seller/dashboard` | Seller | None |
| Seller Analytics | `(seller)` | `/seller/analytics` | Seller | None |

---

## Component Registry

**Status Legend:**
✅ = Complete & Documented
🚧 = In Development
⬜ = Not Started

| Component | Design System § | Architecture File | Status |
|---|---|---|---|
| Button | §4.1 | `wellness-ui/button.tsx` | ✅ Complete |
| Input | §4.2 | `wellness-ui/input.tsx` | ✅ Complete |
| Badge | §4.3 | `wellness-ui/badge.tsx` | ✅ Complete |
| Product Card | §4.4 | `wellness-ui/product-card.tsx` | ✅ Complete |
| Star Rating | §4.5 | `wellness-ui/star-rating.tsx` | ✅ Complete |
| Accordion | §4.6 | `wellness-ui/accordion.tsx` | ✅ Complete |
| Testimonial Card | §4.7 | `wellness-ui/testimonial-card.tsx` | ✅ Complete |
| Toast | §4.8 | `wellness-ui/toast.tsx` | ✅ Complete |
| Toaster | — | `wellness-ui/toaster.tsx` | ✅ Complete |
| Autocomplete | §4.9 | `wellness-ui/autocomplete.tsx` | ⬜ Not started |
| Typo Correction | §4.10 | `wellness-ui/typo-correction.tsx` | ⬜ Not started |
| Comparison Tray | §4.11 | `wellness-ui/comparison-tray.tsx` | ⬜ Not started |
| Mini Cart | §4.12 | `wellness-ui/mini-cart.tsx` | ⬜ Not started |
| Notify Me | §4.13 | `wellness-ui/notify-me.tsx` | ⬜ Not started |
| Toggle Switch | §4.14 | `wellness-ui/toggle-switch.tsx` | ⬜ Not started |
| Quantity Stepper | §4.15 | `wellness-ui/quantity-stepper.tsx` | ⬜ Not started |
| Gold Trial Card | §4.16 | `wellness-ui/gold-trial-card.tsx` | ⬜ Not started |
| Empty State | §4.17 | `wellness-ui/empty-state.tsx` | ⬜ Not started |
| Navbar | §2.4 | `wellness-ui/navbar.tsx` | ✅ Complete |
| Footer | §2.5 | `wellness-ui/footer.tsx` | ✅ Complete |
| Breadcrumbs | — | `wellness-ui/breadcrumbs.tsx` | ✅ Complete |
| Category Search | — | `wellness-ui/category-search.tsx` | ✅ Complete |
| Checkbox | — | `wellness-ui/checkbox.tsx` | ✅ Complete |
| Feature Section | — | `wellness-ui/feature-section.tsx` | ✅ Complete |
| Product Carousel | — | `wellness-ui/product-carousel.tsx` | ✅ Complete |
| Select | — | `wellness-ui/select.tsx` | ✅ Complete |
| Slider | — | `wellness-ui/slider.tsx` | ✅ Complete |
| Checkout Accordion | §3.4 | `wellness-ui/checkout-accordion.tsx` | ⬜ Not started |
| Image Viewer 360° | — | `wellness-ui/image-viewer-360.tsx` | ⬜ Not started |
| Split Shipping Notice | — | `wellness-ui/split-shipping-notice.tsx` | ⬜ Not started |

---

## Key Decisions

| # | Decision | Rationale | Source |
|---|---|---|---|
| 1 | `proxy.ts` not `middleware.ts` | Next.js 16 pattern for edge logic | `architecture.md §4` |
| 2 | Tailwind 4 `@theme` not config file | Tailwind 4.0 removed `tailwind.config.js` | `architecture.md §10.2` |
| 3 | No manual `useMemo`/`useCallback` | React 19 Compiler handles memoization | `architecture.md §1` |
| 4 | No urgency patterns | Brand DNA: calm, unhurried, trust-based UX | `PRD §2.2` |
| 5 | Sage-tinted shadows (no pure black) | Organic warmth, visual consistency | `design-system.md §1.5` |
| 6 | Cloud Dancer (#F2F0EA) page bg, not #FFF | Warm, restorative feel — like natural linen | `design-system.md §8` |
| 7 | Pill-shaped buttons (radius: 9999px) | Soft, safe, approachable geometry | `design-system.md §8` |
| 8 | Cart in LocalStorage, not DB | Fast offline access, no auth required for cart | `architecture.md §4.4` |
| 9 | Cloudinary URL-based (no SDK) | Minimal bundle size, direct URL construction | `architecture.md §7` |
| 10 | Two membership tiers only (Free + Gold) | Reduces decision fatigue, clear value prop | `PRD §6.1` |
| 11 | Explicit `baseUrl: "."` in `tsconfig` | Ensures path aliases `@/*` resolve correctly | `tsconfig.json` |
| 12 | Next.js Font mapping to `<html>` tag | Ensures global CSS variables resolve correctly for Tailwind `@theme` inheritance. | `architecture` / `layout.tsx` |

---

## Current Project Status

**Phase:** 2 — Design System & Components ✅ COMPLETE
**Next Phase:** 3 — Page Construction (Homepage -> PLP -> PDP)

### What's been set up:
- `.agent/rules/project-rules.md` — 10 sections: context protocol, no-improvisation + gap detection, version locks, directory structure, naming, tokens, brand, assets, perf budgets, env vars
- `.agent/rules/coding-standards.md` — 10 sections: TypeScript strict, RSC, proxy.ts, use cache, no manual memo, Supabase clients, component architecture, imports, errors, animation
- `.agent/workflows/new-page.md` — 10-step page building workflow (`/new-page`)
- `.agent/workflows/new-component.md` — 10-step component building workflow (`/new-component`)
- `docs/QUICK-REFERENCE.md` — This file (fast context loader)
- `docs/PROGRESS.md` — Living progress tracker

### Available skills:
- `ui-ux-pro-max` — UX audit tool (MANUAL INVOKE ONLY — say "run a UX audit")
- `skill-creator` — Meta-tool for creating new skills
- `error-handling-patterns` — Generic error patterns (rarely needed)

### Design Inspirations:
- `Design_Inspirations/` folder contains 15 mockups/moodboards (Homepage, PLP, PDP, Checkout, Membership). Relevant from Phase 2 onward.
