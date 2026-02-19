# Progress Tracker — Home & Kitchen Platform

> **Updated at the end of every conversation.** This is the living record of what's been built.

---

## Phase Status

| Phase | Description | Scope | Status |
|---|---|---|---|
| **Phase 0** | Rules & Skills Layer | Rules, workflows, context docs, skills audit | ✅ Complete |
| **Phase 1** | Project Scaffolding + Backend Foundation | Next.js 16 init, Tailwind 4 `@theme`, Supabase (tables + RLS + types), fonts, `proxy.ts`, env vars, `globals.css` | ⬜ Not Started |
| **Phase 2** | Design System (wellness-ui components) | All 22 components from `design-system.md §4` — Button, Input, Badge, Product Card, Navbar, Footer, etc. | ⬜ Not Started |
| **Phase 3** | Page-by-Page Build (revenue path first) | Homepage → PLP → PDP → Cart/Checkout → Auth → Account → Membership → Seller → Static pages | ⬜ Not Started |
| **Phase 4** | Integration & Polish | Typesense search, Cloudinary media pipeline, Realtime inventory, Resend email, Stripe Connect, performance optimization | ⬜ Not Started |

---

## Infrastructure

| Item | Status | Notes |
|---|---|---|
| Next.js 16 project init | ⬜ | — |
| Tailwind 4 + `@theme` tokens in `globals.css` | ⬜ | — |
| Fonts (Satoshi self-hosted + Lora) | ⬜ | — |
| Supabase project setup | ⬜ | — |
| DB schema + RLS policies | ⬜ | — |
| Supabase type generation | ⬜ | — |
| `proxy.ts` (auth, currency, headers) | ⬜ | — |
| Environment variables (`.env.local`) | ⬜ | — |
| ESLint + Prettier config | ⬜ | — |

---

## Component Registry

| Component | Status | Notes |
|---|---|---|
| Button | ⬜ | `design-system.md §4.1` — 5 variants, 4 sizes |
| Input | ⬜ | `§4.2` — text, search, select, range, checkbox |
| Badge | ⬜ | `§4.3` — 7 variants, 2 sizes |
| Product Card | ⬜ | `§4.4` — PLP grid, hover ATC overlay |
| Star Rating | ⬜ | `§4.5` — filled/empty/half stars |
| Accordion | ⬜ | `§4.6` — expand/collapse, chevron rotation |
| Testimonial Card | ⬜ | `§4.7` — quote, author, decorative mark |
| Toast | ⬜ | `§4.8` — 4 types, slide-in, auto-dismiss |
| Autocomplete | ⬜ | `§4.9` — 3-char trigger, 8 results, keyboard nav |
| Typo Correction | ⬜ | `§4.10` — "Showing results for X" notice |
| Comparison Tray | ⬜ | `§4.11` — fixed bottom bar, max 4 items |
| Mini Cart | ⬜ | `§4.12` — slide-in panel, 420px |
| Notify Me | ⬜ | `§4.13` — OOS recovery, inline email form |
| Toggle Switch | ⬜ | `§4.14` — Subscribe & Save toggle |
| Quantity Stepper | ⬜ | `§4.15` — increment/decrement, stock-bound |
| Gold Trial Card | ⬜ | `§4.16` — post-checkout upsell CTA |
| Empty State | ⬜ | `§4.17` — empty cart, no results, etc. |
| Navbar | ⬜ | `§2.4` — fixed, mega-nav, mobile hamburger |
| Footer | ⬜ | `§2.5` — dark, 4-col grid |
| Checkout Accordion | ⬜ | `§3.4` — multi-step single-page checkout |
| Image Viewer 360° | ⬜ | 24-36 frame drag-to-rotate viewer |
| Split Shipping Notice | ⬜ | Checkout disclosure for split orders |

**Legend:** ⬜ Not Started · 🔨 In Progress · ✅ Complete

---

## Page Status

| Page | Status | Notes |
|---|---|---|
| Homepage | ⬜ | `design-system.md §3.1` |
| PLP (Product Listing) | ⬜ | `§3.2` |
| PDP (Product Detail) | ⬜ | `§3.3` |
| Checkout | ⬜ | `§3.4` |
| Membership / Pricing | ⬜ | `§3.5` |
| Account Dashboard | ⬜ | `§3.6` |
| Login | ⬜ | — |
| Register | ⬜ | — |
| Forgot Password | ⬜ | — |
| Confirmation | ⬜ | — |
| Seller Dashboard | ⬜ | — |
| Seller Analytics | ⬜ | — |
| About | ⬜ | — |
| Contact | ⬜ | — |
| Privacy Policy | ⬜ | — |

---

## Integration Status

| Service | Status | Notes |
|---|---|---|
| Supabase Auth | ⬜ | JWT cookies, `proxy.ts` session resolution |
| Supabase Realtime | ⬜ | Inventory WebSocket (PDP-001→004) |
| Stripe Payments | ⬜ | PaymentIntent, Elements, webhooks |
| Stripe Connect | ⬜ | Marketplace seller payouts |
| Stripe Subscriptions | ⬜ | Gold membership billing |
| Typesense Search | ⬜ | Autocomplete, facets, typo tolerance |
| Cloudinary Media | ⬜ | Product images, 360° sequences |
| Resend Email | ⬜ | Transactional emails (order, restock, etc.) |
| Currency Exchange | ⬜ | Multi-currency with rate locking |

---

## Decisions Log

| Date | Decision | Rationale | Conversation |
|---|---|---|---|
| 2026-02-19 | Created Rules & Skills layer before any code | Prevents context rot and drift from the start | dd825cef |
| 2026-02-19 | Backend-first approach (infra → components → pages) | Components depend on data shapes; visual shell would require refactoring | dd825cef |
| 2026-02-19 | Targeted doc reading, not full-doc reads | Balances context accuracy with credit efficiency | dd825cef |
| 2026-02-19 | ui-ux-pro-max skill set to MANUAL INVOKE ONLY | Prevents auto-triggering on UI work; used only for post-build UX audits | dd825cef |
| 2026-02-19 | Added Proactive Gap Detection rule to project-rules | AI must flag missing features/improvements but wait for approval | dd825cef |
| 2026-02-19 | Design Inspirations folder not needed until Phase 2+ | Phase 1 is infrastructure only, no visual UI | dd825cef |

---

## Conversation Handoff Notes

**Last conversation:** 2026-02-19 (ID: dd825cef)
**What was completed:** Phase 0 — Rules & Skills Layer fully set up (2 rules, 2 workflows, 2 context docs, 3 skills audited, gap detection rule added)
**What's next:** Phase 1 — Project scaffolding (Next.js 16.1.6 init, Tailwind 4 `@theme` config, Supabase setup, fonts, `proxy.ts`, env vars)
**Blockers:** None
**Note:** Start next conversation with "Read the Quick Reference and Progress docs, then let's begin Phase 1."
