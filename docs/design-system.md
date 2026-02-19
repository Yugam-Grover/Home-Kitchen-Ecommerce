# Design System: Home & Kitchen Platform

> **Brand DNA:** Organic Modernist — Restorative · Safe · Aspirational · Minimalist
> **Tone:** Japandi minimalism with warm, tactile editorial layouts
> **Core USPs:** Self-Sanitizing Surfaces & Modular Multi-Taskers
> **Companion:** [PRD.md](file:///c:/Users/yugam/Desktop/Ecom%202/docs/PRD.md) · [architecture.md](file:///c:/Users/yugam/Desktop/Ecom%202/docs/architecture.md)

---

## Table of Contents

1. [Design Tokens](#1-design-tokens)
2. [Global Layout & Grid](#2-global-layout--grid)
3. [Page-Specific Layouts](#3-page-specific-layouts)
4. [Atomic Component Specs](#4-atomic-component-specs)
5. [Motion & Animation](#5-motion--animation)
6. [Iconography & Media](#6-iconography--media)
7. [Responsive Breakpoints](#7-responsive-breakpoints)
8. [Design Rationale](#8-design-rationale)

---

## 1. Design Tokens

### 1.1 Color Palette

```json
{
  "color": {
    "primary": {
      "DEFAULT": "#4A5D4E",
      "light": "#6B7F6F",
      "dark": "#33422F",
      "50": "#F0F4F1",
      "100": "#D9E3DA",
      "200": "#B3C7B7",
      "500": "#4A5D4E",
      "700": "#33422F",
      "900": "#1C2B1E"
    },
    "secondary": {
      "DEFAULT": "#D97706",
      "light": "#F59E0B",
      "dark": "#B45309",
      "50": "#FFFBEB",
      "100": "#FEF3C7",
      "500": "#D97706",
      "700": "#B45309"
    },
    "surface": {
      "DEFAULT": "#F2F0EA",
      "white": "#FFFFFF",
      "warm": "#FAF8F5",
      "muted": "#E8E5DE",
      "card": "#FFFFFF",
      "overlay": "rgba(28, 25, 23, 0.5)"
    },
    "text": {
      "primary": "#1C1917",
      "secondary": "#57534E",
      "muted": "#A8A29E",
      "inverse": "#FFFFFF",
      "link": "#4A5D4E"
    },
    "border": {
      "DEFAULT": "#E5E7EB",
      "subtle": "#F0EDE8",
      "strong": "#D1D5DB"
    },
    "semantic": {
      "success": "#166534",
      "success-light": "#DCFCE7",
      "error": "#991B1B",
      "error-light": "#FEE2E2",
      "warning": "#B45309",
      "warning-light": "#FEF3C7",
      "info": "#1E40AF",
      "info-light": "#DBEAFE"
    },
    "badge": {
      "discount": "#166534",
      "new": "#D97706",
      "low-stock": "#B45309",
      "out-of-stock": "#991B1B",
      "gold-member": "#D97706",
      "early-access": "#4A5D4E",
      "certification": "#4A5D4E"
    }
  }
}
```

#### Tailwind Extension

```js
// tailwind.config.js — colors
module.exports = {
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F0F4F1',
          100: '#D9E3DA',
          200: '#B3C7B7',
          300: '#8DAB93',
          400: '#6B7F6F',
          500: '#4A5D4E',
          600: '#3D4E41',
          700: '#33422F',
          800: '#263121',
          900: '#1C2B1E',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          300: '#FCD34D',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
        },
        cloud: '#F2F0EA',
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
    },
  },
};
```

### 1.2 Typography

**Font Stack:**
- Headings: `'Lora', Georgia, 'Times New Roman', serif`
- Body: `'Satoshi', 'Geist', system-ui, -apple-system, sans-serif`
- Mono: `'Geist Mono', 'SF Mono', 'Fira Code', monospace`

**Google Fonts Import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
```

> Satoshi is loaded from [fontshare.com](https://www.fontshare.com/fonts/satoshi) via self-hosted `@font-face`.

#### Type Scale

| Token | Element | Font | Size | Weight | Line Height | Letter Spacing | Tailwind Class |
|---|---|---|---|---|---|---|---|
| `display-xl` | Hero headline | Lora | 72px / 4.5rem | 700 | 1.0 | -0.02em | `text-7xl font-bold font-serif` |
| `display-lg` | Section headline | Lora | 48px / 3rem | 600 | 1.1 | -0.01em | `text-5xl font-semibold font-serif` |
| `display-md` | Sub-section headline | Lora | 36px / 2.25rem | 600 | 1.2 | -0.01em | `text-4xl font-semibold font-serif` |
| `heading-lg` | Card / Component title | Lora | 28px / 1.75rem | 600 | 1.3 | 0 | `text-3xl font-semibold font-serif` |
| `heading-md` | Product name (PDP) | Lora | 24px / 1.5rem | 600 | 1.3 | 0 | `text-2xl font-semibold font-serif` |
| `heading-sm` | Product name (Card) | Satoshi | 18px / 1.125rem | 600 | 1.4 | 0 | `text-lg font-semibold` |
| `body-lg` | Lead paragraphs | Satoshi | 18px / 1.125rem | 400 | 1.6 | 0 | `text-lg` |
| `body-md` | Default body text | Satoshi | 16px / 1rem | 400 | 1.6 | 0 | `text-base` |
| `body-sm` | Secondary text, captions | Satoshi | 14px / 0.875rem | 400 | 1.5 | 0 | `text-sm` |
| `caption` | Labels, helper text | Satoshi | 12px / 0.75rem | 500 | 1.4 | 0.02em | `text-xs font-medium` |
| `overline` | Category labels, eyebrow | Satoshi | 12px / 0.75rem | 700 | 1.4 | 0.08em | `text-xs font-bold uppercase tracking-widest` |
| `price-lg` | Price display (PDP) | Satoshi | 28px / 1.75rem | 700 | 1.2 | 0 | `text-3xl font-bold` |
| `price-md` | Price display (Card) | Satoshi | 18px / 1.125rem | 700 | 1.2 | 0 | `text-lg font-bold` |
| `price-strike` | Original/struck price | Satoshi | 16px / 1rem | 400 | 1.2 | 0 | `text-base line-through text-stone-400` |

#### Tailwind Extension

```js
// tailwind.config.js — typography
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Satoshi', 'Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
    },
  },
};
```

### 1.3 Spacing

**Baseline:** `4px` — All spacing values are multiples of 4.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Inline icon gap, badge padding |
| `space-2` | 8px | Tight component padding (chips, tags) |
| `space-3` | 12px | Input padding, small card insets |
| `space-4` | 16px | Standard component padding, card insets |
| `space-5` | 20px | Button padding (horizontal) |
| `space-6` | 24px | Card internal spacing, grid gap |
| `space-8` | 32px | Grid gap (PLP), inter-component spacing |
| `space-10` | 40px | Sub-section spacing |
| `space-12` | 48px | Section internal padding |
| `space-16` | 64px | Section margin (minimum) |
| `space-20` | 80px | Section margin (standard) |
| `space-24` | 96px | Section margin (generous) |
| `space-32` | 128px | Hero section top/bottom padding |

### 1.4 Borders & Radius

```json
{
  "borderRadius": {
    "none": "0px",
    "sm": "8px",
    "DEFAULT": "12px",
    "lg": "16px",
    "xl": "20px",
    "2xl": "24px",
    "full": "9999px"
  },
  "borderWidth": {
    "DEFAULT": "1px",
    "2": "2px"
  },
  "borderColor": {
    "DEFAULT": "#E5E7EB"
  }
}
```

| Element | Radius | Tailwind |
|---|---|---|
| Buttons (all) | `9999px` (full pill) | `rounded-full` |
| Product cards | `16px` | `rounded-2xl` |
| Image containers | `16px` | `rounded-2xl` |
| Input fields | `12px` | `rounded-xl` |
| Badges / Chips | `9999px` | `rounded-full` |
| Modal / Dialog | `24px` | `rounded-3xl` |
| FAQ Accordion items | `12px` | `rounded-xl` |
| Newsletter CTA band | `24px` | `rounded-3xl` |

### 1.5 Shadows & Elevation

```json
{
  "boxShadow": {
    "sm": "0 2px 8px rgba(74, 93, 78, 0.04)",
    "DEFAULT": "0 4px 16px rgba(74, 93, 78, 0.06)",
    "md": "0 8px 24px rgba(74, 93, 78, 0.08)",
    "lg": "0 16px 48px rgba(74, 93, 78, 0.10)",
    "xl": "0 24px 64px rgba(74, 93, 78, 0.12)",
    "inner": "inset 0 2px 4px rgba(74, 93, 78, 0.04)",
    "none": "none"
  }
}
```

| State | Shadow Token | Usage |
|---|---|---|
| Rest (cards, containers) | `shadow-sm` | Subtle depth separation from surface |
| Hover (interactive cards) | `shadow-md` | Lift effect on product cards |
| Floating (dropdowns, modals) | `shadow-lg` | Mega-nav, mini-cart, overlays |
| Elevated (featured pricing card) | `shadow-xl` | Membership featured tier card |
| Pressed / Active | `shadow-inner` | Active filter chips |

> All shadows use the primary sage `#4A5D4E` as tint — no pure black shadows. This maintains warmth.

---

## 2. Global Layout & Grid

### 2.1 Container System

| Container | Max-Width | Padding (x) | Usage |
|---|---|---|---|
| `container-immersive` | `1600px` / `94vw` | `24px` | Hero sections, full-bleed banners, newsletter CTA |
| `container-standard` | `1280px` | `24px` | All primary content: PLP, PDP, Checkout, Account |
| `container-narrow` | `800px` | `24px` | Text-heavy sections, FAQ, testimonial quotes |

```css
/* Global Container Classes */
.container-immersive {
  max-width: 1600px;
  margin-inline: auto;
  padding-inline: 24px;
}
.container-standard {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 24px;
}
.container-narrow {
  max-width: 800px;
  margin-inline: auto;
  padding-inline: 24px;
}
```

### 2.2 Grid System

**Base:** 12-column CSS Grid with `24px` gutters.

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
```

| Layout Pattern | Columns (Desktop) | Columns (Tablet) | Columns (Mobile) |
|---|---|---|---|
| Product Grid (PLP) | 3 cols (`span 4` each) | 2 cols (`span 6` each) | 1 col (`span 12`) |
| PDP Transactional Zone | `span 7` gallery + `span 5` buy-box | `span 12` stacked | `span 12` stacked |
| Checkout | `span 7` cart + `span 5` summary | `span 12` stacked | `span 12` stacked |
| Category Grid | 6 cols (custom) | 3 cols | 2 cols |
| Pricing Cards | 3 cols (`span 4` each) | `span 12` stacked | `span 12` stacked |

### 2.3 Vertical Rhythm

| Between… | Desktop | Mobile |
|---|---|---|
| Navbar ↔ Page content | `0px` (navbar is fixed) | `0px` |
| Major sections (e.g. Hero → Categories) | `96px` | `64px` |
| Sub-sections within a page section | `48px` | `32px` |
| Component → Component (same section) | `24px` | `16px` |
| Heading → Content below | `16px` | `12px` |
| Eyebrow → Heading below | `8px` | `8px` |

### 2.4 Navbar

| Property | Value |
|---|---|
| Position | `fixed`, `top: 0`, `z-index: 50` |
| Height | `72px` (desktop) / `60px` (mobile) |
| Background | `surface.white` with `backdrop-blur(12px)` + `opacity: 0.95` |
| Border | `1px solid border.subtle` on bottom |
| Container | `container-standard` (1280px) |
| Layout | `flex justify-between items-center` |

**Left Zone:** Logo (linked to `/`)
**Center Zone:** Navigation links — Home, Shop (dropdown), Collections, About, Contact
**Right Zone:** Search icon (opens overlay), Currency selector, Cart icon (with badge count), Account icon

#### Mega-Nav Dropdown (Shop)

| Property | Value |
|---|---|
| Trigger | Hover (desktop) / Tap (mobile) |
| Position | `absolute`, full-width, below navbar |
| Background | `surface.white` |
| Shadow | `shadow-lg` |
| Border radius | `0 0 16px 16px` (bottom corners only) |
| Layout | Multi-column grid: category columns + featured image |
| Padding | `32px 48px` |
| Animation | Fade-in + slide-down, 200ms ease-out |

### 2.5 Footer

| Property | Value |
|---|---|
| Background | `text.primary` (#1C1917) |
| Text color | `surface.warm` / `text.muted` |
| Padding | `64px 0 32px` |
| Layout | 4-column grid → stacked on mobile |
| Columns | Brand + tagline | Quick Links | Customer Service | Newsletter mini-form |
| Bottom bar | Copyright + legal links + payment icons |

---

## 3. Page-Specific Layouts

### 3.1 Homepage

The homepage follows a **modular stacking pattern** — full-width sections stacked vertically with generous spacing. Each section has distinct visual treatment.

#### Section Order & Spec

| # | Section | Container | Background | Height / Padding |
|---|---|---|---|---|
| 1 | **Hero Slider** | `immersive` | `surface.DEFAULT` (#F2F0EA) | `min-height: 85vh` (desktop), `60vh` (mobile) |
| 2 | **Shop by Category** | `standard` | `surface.white` | `py: 96px` |
| 3 | **Trending Products (Carousel)** | `standard` | `surface.white` | `py: 96px` |
| 4 | **Brand USP Band** | `immersive` (full bleed) | `primary.500` (#4A5D4E) | `py: 64px` |
| 5 | **Testimonials (Carousel)** | `narrow` | `surface.warm` (#FAF8F5) | `py: 96px` |
| 6 | **Newsletter CTA** | `standard` | Card floats over `surface.DEFAULT` | `py: 96px` |

#### Hero Slider — Layout Rules

```
┌────────────────────────────────────────────────────────────┐
│  [Eyebrow: "THE RESTORATIVE HOME"]                         │
│  [display-xl Headline: "Self-Sanitizing                    │
│   Surfaces & Modular Multi-Taskers"]                       │
│  [body-lg subtitle paragraph]                              │
│  [Pill CTA: "Shop Now" → primary bg]                       │
│                                                            │
│  ┌──────────────┐                        ┌───────────────┐ │
│  │ Social Proof │  [HERO PRODUCT IMAGE   │ Secondary     │ │
│  │ Card         │   — overlapping,       │ Product       │ │
│  │ 12k+         │   large-scale,         │ (smaller)     │ │
│  │ Customers    │   no background]       │               │ │
│  └──────────────┘                        └───────────────┘ │
│                                          [< >] Nav Arrows  │
└────────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---|---|
| Headline | `display-xl`, `text.primary`, max-width 60% of container |
| Subtitle | `body-lg`, `text.secondary`, max-width 40% |
| CTA | `btn-primary` (pill), 48px height |
| Social proof card | `surface.white`, `shadow-sm`, `rounded-2xl`, avatar stack + star rating + count |
| Product images | Position `absolute` or CSS grid overlap, `z-index: 1` above background |
| Slider arrows | Circular, 48px, `border: 1px solid border.DEFAULT`, positioned bottom-right |
| Auto-advance | Every 6s, pause on hover |

#### Shop by Category — Layout Rules

| Property | Value |
|---|---|
| Layout | 6-column grid, equal widths |
| Card | `surface.warm` background, `rounded-2xl`, aspect-ratio `1/1`, centered image |
| Label | `heading-sm`, centered below image, `mt: 12px` |
| Hover | Card lifts → `shadow-md`, image scales `1.03` |
| Mobile | 2-column grid, scroll horizontally if > 4 |

#### Trending Products — Layout Rules

| Property | Value |
|---|---|
| Layout | Left text block (span 3) + Right product carousel (span 9) |
| Left block | Eyebrow (`overline`, `secondary.500`) + `display-md` heading + `body-md` paragraph + "View All" pill link |
| Carousel | 3 visible cards, horizontal scroll-snap, `gap: 24px` |
| Card | See [Product Card Component](#44-product-card) |
| Navigation | Dot indicators below; swipe on mobile |

#### Brand USP Band

| Property | Value |
|---|---|
| Background | `primary.500` (#4A5D4E) |
| Text | `text.inverse` (#FFFFFF) |
| Layout | Centered, `container-narrow` |
| Content | `display-md` headline + `body-lg` subtitle + 3-column icon+text feature row |
| Icons | 48px, stroke-style, `surface.white` color |

#### Testimonials Carousel

| Property | Value |
|---|---|
| Layout | Single featured quote (centered) + peek side quotes (faded, smaller) |
| Quote card | `container-narrow`, centered text |
| Content | Star rating (amber) → Quoted text (`body-lg`, italic, serif) → Author name + location (`body-sm`) |
| Decorative | Large `"` quote mark (120px, `secondary.100` color), positioned behind text |
| Navigation | Left/right arrows (circular) + dot indicators |

#### Newsletter CTA — Layout Rules

| Property | Value |
|---|---|
| Layout | Rounded card (`rounded-3xl`) floating within section |
| Background | Gradient: `primary.500` → `primary.700` |
| Content | 2-column: Left (heading + body + email input + submit button) / Right (decorative illustration or product image) |
| Input + Button | Inline flex: input (`rounded-l-full`) + button (`rounded-r-full`, `secondary.DEFAULT` bg) |
| Text | `text.inverse` |

### 3.2 Product Listing Page (PLP)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Breadcrumb: Home / Shop / [Category]                                │
│  [display-md: "Shop"]                                                │
│  [body-sm: "Home / Shop"]                                            │
├────────────┬─────────────────────────────────────────────────────────┤
│            │ [Result Count] [Active Filters: pill chips × ]          │
│  FILTER    │ [Category Search (pill input)] [Sort By ▼]              │
│  SIDEBAR   │ ┌──────────┐ ┌──────────┐ ┌──────────┐                 │
│  (Sticky)  │ │ Product  │ │ Product  │ │ Product  │                 │
│            │ │ Card     │ │ Card     │ │ Card     │                 │
│ ─────────  │ └──────────┘ └──────────┘ └──────────┘                 │
│ By Category│ ┌──────────┐ ┌──────────┐ ┌──────────┐                 │
│ □ Cookware │ │ Product  │ │ Product  │ │ Product  │                 │
│ □ Storage  │ │ Card     │ │ Card     │ │ Card     │                 │
│ ─────────  │ └──────────┘ └──────────┘ └──────────┘                 │
│ By Type    │                                                         │
│ ─────────  │ [< 1  2  3 ... 10 >]  Pagination                       │
│ Price      │                                                         │
│ [●────●]   ├─────────────────────────────────────────────────────────┤
│ ─────────  │ ┌─────────┐ ┌─────────┐ ┌─────────┐                    │
│ Rating     │ │ 🚚 Free │ │ 💳 Flex │ │ 📞 24/7 │ Trust Bar         │
│ ─────────  │ │ Shipping│ │ Payment │ │ Support │                    │
│ Promos     │ └─────────┘ └─────────┘ └─────────┘                    │
│ Availability│                                                        │
└────────────┴─────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---|---|
| **Page header** | `display-md` title + breadcrumb (`body-sm`, `text.muted`) |
| **Sidebar** | `width: 260px`, `position: sticky; top: 88px`, `border-right: 1px solid border.subtle` |
| **Filter section** | `heading-sm` label + checkbox list / slider. Sections separated by `border-bottom: 1px solid border.subtle`, `py: 16px` |
| **Active filters** | Pill chips (`rounded-full`, `bg: primary.50`, `text: primary.700`, `border: 1px solid primary.200`) with `×` close |
| **Category search** | Pill-shaped input (`rounded-full`, `border: 1px solid border.DEFAULT`, icon inside). Sits beside Sort dropdown. |
| **Sort dropdown** | `rounded-xl`, `border: 1px solid border.DEFAULT` |
| **Product grid** | 3 columns, `gap: 32px` |
| **Pagination** | Centered, numbered, current page = `primary.500` bg circle |
| **Trust bar** | 3-column icon + text row, `border-top: 1px solid border.subtle`, `py: 24px` |
| **Mobile** | Sidebar collapses to a "Filter" button that opens a slide-in drawer |

### 3.3 Product Detail Page (PDP)

The PDP is divided into **3 vertical zones**: Transactional → Narrative → Recirculation.

#### Zone 1: Transactional (Buy Box)

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────┐  ┌──────────────────────────────┐│
│  │                            │  │ ★★★★★ 50,000+ reviews       ││
│  │     MAIN IMAGE             │  │ [heading-md: Product Name]   ││
│  │     (360° viewer)          │  │ [body-md: Description]       ││
│  │                            │  │                              ││
│  │                            │  │ [price-strike] [price-lg]    ││
│  │                            │  │                              ││
│  │                            │  │ • Feature bullet 1           ││
│  ├──────────────────────────  │  │ • Feature bullet 2           ││
│  │ [thumb] [thumb] [thumb]    │  │                              ││
│  └────────────────────────────┘  │ Variant: [pill] [pill] [pill]││
│                                  │                              ││
│  ┌────────────────────────────┐  │ [Subscribe toggle]           ││
│  │ "Craig H. ✓ Verified"     │  │                              ││
│  │ "It leaves my lips..."    │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ││
│  └────────────────────────────┘  │ [PROCEED TO CHECKOUT →]      ││
│                                  │                              ││
│                                  │ 🔒 Trust badges row         ││
│                                  │ [Visa] [MC] [PayPal] [GPay] ││
│                                  └──────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---|---|
| **Gallery** | `span 7` on 12-col grid. Main image: `aspect-ratio: 1/1`, `rounded-2xl`. Thumbnails: horizontal row below, 64px squares, `rounded-lg`, active = `border: 2px solid primary.500` |
| **Buy box** | `span 5`. Sticky on desktop (`position: sticky; top: 88px`). |
| **Rating** | Star icons (amber) + review count link |
| **Price** | `price-lg` for sale price; `price-strike` for original |
| **Variants** | Pill toggles (`rounded-full`), active = `bg: primary.500, text: white`, inactive = `border: 1px solid border.DEFAULT` |
| **CTA** | Full-width pill button, 56px height, `bg: primary.500`, `text: white`. Arrow icon right. |
| **Trust row** | Horizontal: lock icon + "100% Satisfaction" + "Free Returns" + payment icons |
| **Inline review** | Floating card over gallery bottom-left, `rounded-2xl`, `shadow-sm`, initials avatar + star + quote snippet |

#### Zone 2: Narrative (Feature Sections)

These are the "beautiful sections" per the user's requirement. They use an **alternating zig-zag layout** to showcase product features uniquely per product.

**Pattern A — "Best Things About It":**

| Property | Value |
|---|---|
| Layout | 2-column: Left = product image (angled), Right = heading + body text + 3-col stats row |
| Stats row | 3 items: icon + large number + label (e.g., "100% Vegan", "3% Tripeptide-1", "10.5 ml of OZ") |
| Background | `surface.white` |

**Pattern B — "Every Ingredient Counts" (Feature breakdown):**

| Property | Value |
|---|---|
| Layout | 2-column: Left = icon list (each feature with icon + heading + body), Right = lifestyle image with `rounded-3xl` |
| Background | `surface.warm` (#FAF8F5). Full-width band with internal `container-standard`. Subtle `rounded-3xl` on the background block. |
| Icon list | Circular icon (40px, `primary.50` bg, `primary.500` icon) + `heading-sm` + `body-sm` |

**Pattern C — Social proof stats bar:**

| Property | Value |
|---|---|
| Layout | 3-column centered: "Trusted by 146,000+ clients" (left) + stat card (center "9M+") + stat card (right "4.8") |
| Background | `surface.white` |

**Pattern D — UGC / Video Carousel:**

| Property | Value |
|---|---|
| Background | Dark (`primary.900` or `text.primary`) |
| Layout | Centered heading + horizontal carousel of video thumbnails (rounded, portrait aspect ratio, play icon overlay) |
| Dot indicators | Below carousel |

**Pattern E — Promotional Band:**

| Property | Value |
|---|---|
| Layout | 2-column: Left = eyebrow + heading + body + CTA button / Right = product image + stat badges |
| Background | Dark (`text.primary`), `rounded-3xl` card within `container-standard` |

#### Zone 3: Recirculation

| Section | Spec |
|---|---|
| **FAQ Accordion** | `container-narrow`. Each item: `rounded-xl`, `border: 1px solid border.DEFAULT`, `py: 16px`, `px: 20px`. Chevron icon right. Active item: `border: 2px solid primary.500`, `bg: primary.50` |
| **Reviews Section** | Star histogram (horizontal bars, `secondary.500` fill), individual review cards with avatar circle (initials), star rating, headline, body, "Verified" badge |
| **Related Products** | `container-standard`. Horizontal scroll carousel, 4 visible cards, `gap: 24px`, `scroll-snap-type: x mandatory` |

### 3.4 Checkout Page (Single-Page Accordion)

> **PRD Ref:** §7.1 — "Single-page accordion: Cart → Shipping → Payment → Review → Confirmation."

All checkout steps live on **one page**. The active step is expanded; completed steps collapse into a summary row with an "Edit" link. This reduces page loads, preserves context, and keeps the order summary always visible.

```
┌──────────────────────────────────────────────────────────────────┐
│  [heading-lg: "Checkout"]                                        │
│  ① Cart Review ─── ② Shipping ─── ③ Payment ─── ④ Review        │
├───────────────────────────────┬──────────────────────────────────┤
│  ACCORDION STEPS (span 7)     │  ORDER SUMMARY (span 5, sticky) │
│                               │                                  │
│  ┌─ STEP 1: CART REVIEW ────┐│  ┌──────────────────────────┐   │
│  │  ✓ Completed  [Edit]     ││  │ [Coupon Code Input]      │   │
│  │  3 items · $1,649.99     ││  │ [View Available Offers →] │   │
│  └──────────────────────────┘│  │                          │   │
│  ┌─ STEP 2: SHIPPING ──────┐│  │ Items (3):    $1649.99   │   │
│  │  ✓ Completed  [Edit]     ││  │ Shipping:       $18.36   │   │
│  │  123 Main St · Standard  ││  │ Savings:       -$114.58  │   │
│  └──────────────────────────┘│  │ Tax:            $42.00   │   │
│  ┌─ STEP 3: PAYMENT ═══════┐│  │ ─────────────────────── │   │
│  │  ▼ ACTIVE (expanded)     ││  │ Total:        $1,595.77  │   │
│  │                          ││  │                          │   │
│  │  [Saved card: •••• 4242] ││  │ 🔒 Money Back Guarantee  │   │
│  │  [Stripe PaymentElement] ││  │ [Visa] [MC] [PayPal]     │   │
│  │                          ││  └──────────────────────────┘   │
│  │  [Continue to Review →]  ││                                  │
│  └──────────────────────────┘│                                  │
│  ┌─ STEP 4: REVIEW ────────┐│                                  │
│  │  (locked until step 3)   ││                                  │
│  └──────────────────────────┘│                                  │
├───────────────────────────────┴──────────────────────────────────┤
│  [heading-lg: "Recommended with your order"]   [View All →]      │
│  [Product Carousel — 5 cards]                                    │
└──────────────────────────────────────────────────────────────────┘
```

#### Accordion Step Component

| Property | Value |
|---|---|
| Container | `border: 1px solid border.DEFAULT`, `rounded-2xl`, `mb: 12px` |
| Header (collapsed) | `p: 20px 24px`. Flex: step number circle + title (`heading-sm`) + summary text (`body-sm`, `text.muted`) + "Edit" link (`text.link`). `bg: surface.warm`. |
| Header (active) | `p: 20px 24px`. Step number circle filled `primary.500` + title (`heading-sm`, `primary.700`). `bg: surface.white`. |
| Header (locked) | Same as collapsed but `opacity: 0.5`, no Edit link, step number = `border.DEFAULT` |
| Body (expanded) | `p: 0 24px 24px`. Form content. Transition: `max-height` + `opacity`, `300ms ease-out`. |
| Step number | `28px` circle, `rounded-full`. Active = `bg: primary.500, text: white`. Done = `bg: semantic.success, text: white, ✓`. Locked = `bg: surface.muted, text: text.muted`. |
| Continue CTA | Full-width pill, `btn-primary btn-lg`, anchored to bottom of expanded step |

#### Progress Indicator (Top)

| Property | Value |
|---|---|
| Layout | Horizontal flex, centered, `mb: 32px` |
| Steps | Numbered circles (same styling as accordion) connected by lines |
| Connecting line | `2px`, `border.DEFAULT` (incomplete) / `semantic.success` (completed) |
| Labels | `body-sm` below each circle: "Cart", "Shipping", "Payment", "Review" |

#### Step 1: Cart Review

| Element | Spec |
|---|---|
| **Cart item row** | `border: 1px solid border.DEFAULT`, `rounded-2xl`, `p: 24px`. Image: `80px × 80px`, `rounded-xl`. Flex row with product info + quantity controls + price. |
| **Quantity control** | Inline: `[–]` `count` `[+]` — circular buttons, 32px (reuses §4.15 Quantity Stepper) |
| **Actions** | `body-sm`, `text.secondary`: "Remove" (trash icon) · "Save for later" (heart icon) |
| **Continue CTA** | `btn-primary btn-lg`: "Continue to Shipping →" |
| **Back link** | `body-sm`, `text.link`: "← Continue Shopping" |

#### Step 2: Shipping

| Element | Spec |
|---|---|
| **Guest/Account** | If guest: email input + "Continue as Guest" / "Log in". If account: pre-filled. |
| **Address form** | First name, Last name, Address line 1, Address line 2, City, State/Province, ZIP, Country dropdown. All use §4.2 input specs. |
| **Saved addresses** | Radio card list: address summary + "Default" badge. Active = `border: 2px solid primary.500`. |
| **Shipping options** | Radio group: Standard ($X, Y–Z days) / Expedited ($X, Y days) / Gold Free (if Gold member). Active = `bg: primary.50`, `border: 2px solid primary.500`. |
| **Collapsed summary** | "123 Main St, City · Standard Shipping (3–5 days)" |
| **Continue CTA** | `btn-primary btn-lg`: "Continue to Payment →" |

#### Step 3: Payment

| Element | Spec |
|---|---|
| **Content** | Reuses Stripe PaymentElement Container spec (see above) |
| **Saved methods** | Card brand icon + `•••• XXXX` + expiry. Radio select. |
| **Billing address** | Checkbox: "Same as shipping" (default checked). If unchecked → show address form. |
| **Collapsed summary** | "Visa ending in 4242" |
| **Continue CTA** | `btn-primary btn-lg`: "Review Order →" |

#### Step 4: Review & Place Order

| Element | Spec |
|---|---|
| **Layout** | Summary of all previous steps: Items list (compact) + Shipping address + Payment method. Each with "Edit" link back to that step. |
| **Terms** | `body-sm` + checkbox: "I agree to the Terms of Service and Privacy Policy" |
| **Place Order CTA** | `btn-primary btn-xl`: "Place Order · $1,595.77" — full-width, 56px height. Includes total in button text. |
| **Security row** | Lock icon + "256-bit encrypted" + Stripe badge + "100% Money Back Guarantee" |

#### Order Summary Sidebar

| Element | Spec |
|---|---|
| **Position** | `sticky; top: 88px`, `border: 1px solid border.DEFAULT`, `rounded-2xl`, `p: 24px`, `bg: surface.white` |
| **Coupon input** | `rounded-xl` input + "Apply" pill button |
| **Line items** | Compact: thumbnail (48px) + name + qty + price |
| **Breakdown** | Items total, Shipping, Savings (`semantic.success`), Tax, Divider, **Total** (`heading-md`) |
| **Checkout CTA** | Mirrors active step's Continue CTA (updates label per step) |
| **Trust badges** | 🔒 Money Back Guarantee + payment method logos |

#### Mobile Behavior

| Property | Value |
|---|---|
| Layout | Stacked: accordion steps full-width → order summary below (not sticky) |
| Order summary | Collapsible: "Order Summary · $1,595.77 ▼" bar at top, tap to expand |
| Steps | Same accordion behavior, full-width |
| Place Order CTA | Fixed bottom bar (`z-index: 45`, `p: 16px`, `bg: surface.white`, `shadow-lg` upward): total + "Place Order" button |

#### Membership Upgrade Banner (Free Members Only)

> **PRD Ref:** §3.3 L215 — "Upgrade to Gold for faster delivery & free returns" inline prompt.

| Property | Value |
|---|---|
| Visibility | Rendered only when `user.membership_tier === 'free'` |
| Position | Between cart items and order summary (desktop: full-width row); above checkout CTA (mobile) |
| Background | `primary.50` (#F0F4F1) |
| Border | `1px solid primary.200` |
| Radius | `16px` (`rounded-2xl`) |
| Padding | `20px 24px` |
| Layout | Flex row: Left (crown icon + heading + body) — Right (`btn-primary btn-sm`: "Upgrade to Gold") |
| Heading | `heading-sm`: "Get free shipping & faster delivery" |
| Body | `body-sm`, `text.secondary`: "Gold members save on every order. Starting at $9.99/mo." |
| Dismiss | `×` close icon, top-right. Dismissed state stored in `sessionStorage`. |

#### Split-Shipping Disclosure (Mixed-Inventory Carts)

> **PRD Ref:** INV-002, §5.2 — Partition fulfillment groups; display per-group ETA and shipping cost.

| Property | Value |
|---|---|
| Visibility | Rendered only when cart contains items from ≥ 2 `fulfillment_source` groups |
| Position | Within order summary, between shipping line and subtotal |
| Layout | Each fulfillment group as a sub-section: header row (package icon + label + ETA) → item list |
| Group label | `body-sm`, `font-weight: 600`: "Package 1 of 2", "Package 2 of 2" |
| Group ETA | `body-sm`, `text.secondary`: "Est. delivery: Feb 24–26" |
| Group shipping | `body-sm`: Per-group shipping cost (or `$0.00` for Gold) |
| Divider | `1px dashed border.subtle` between groups |
| Notice | `body-sm`, `text.muted`, top of section: "This order ships in [N] packages. Delivery dates may vary." |

### 3.5 Membership / Pricing Page

| Property | Value |
|---|---|
| **Heading** | `display-lg`, centered: "Choose Your Plan" + `body-lg` subtitle |
| **Layout** | 2 columns within `container-standard`, centered (`max-width: 800px`). Gold card elevated. |

> **PRD Ref:** Only two tiers — Free and Gold ($9.99/mo). See PRD §6.1–§6.2.

| Tier | Free | Gold ($9.99/mo) |
|---|---|---|
| **Card bg** | `surface.white` | `surface.white` |
| **Card border** | `1px solid border.DEFAULT` | `2px solid primary.500` |
| **Card shadow** | `shadow-sm` | `shadow-xl` |
| **Card scale** | `1.0` | `1.05` (slightly larger) |
| **Badge** | None | `"RECOMMENDED"` pill, `bg: primary.500`, `text: white`, top-center, `translateY(-50%)` |
| **Price** | `display-md`: "$0" + `body-md`: "/month" | `display-md`: "$9.99" + `body-md`: "/month" |
| **CTA** | `btn-secondary` (outlined pill) | `btn-primary` (filled pill) |
| **Feature list** | Check (✓ `primary.500`) / dash (— `text.muted`) per row | All features checked |

#### Benefits Checklist (PRD §6.2)

Each row: ✓ icon (`primary.500`) for included, — dash (`text.muted`) for excluded. Text: `body-md`.

| Benefit | Free | Gold |
|---|---|---|
| Shipping | Standard rates | ✓ Free on all orders |
| Delivery Priority | Standard queue | ✓ Priority dispatch |
| Return Window | 7–15 business days | ✓ 3–5 business days |
| Return Shipping | Customer pays | ✓ Free |
| Loyalty Discount | — | ✓ 5% every order |
| Promo Stacking | 1 code (15% cap) | ✓ 2 codes + loyalty (30% cap) |
| Early Access | — | ✓ 48h early access |
| Exclusive Pricing | — | ✓ 8–12% below standard |
| Trending Add-Ons | — | ✓ Personalized bundles |
| Support Response | < 24h | ✓ < 2h priority |
| Birthday Perk | — | ✓ 15% coupon + free gift wrap |
| Exclusive Collections | — | ✓ Gold-only SKUs |

---

### 3.6 User Account Dashboard

> **PRD Ref:** §7.1 Phase 1 — "Account Pages: Profile, order history, saved items, membership management."

#### Shell Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  [heading-lg: "My Account"]        [body-sm: "Welcome, Nina"]    │
├────────────┬─────────────────────────────────────────────────────┤
│  SIDEBAR   │                                                     │
│  (240px)   │            CONTENT AREA (span 9)                    │
│            │                                                     │
│  👤 Profile │                                                     │
│  📦 Orders  │         [Active page content renders here]          │
│  ♡ Saved    │                                                     │
│  👑 Member  │                                                     │
│  📍 Address │                                                     │
│  ↩ Returns  │                                                     │
│  ❓ Help    │                                                     │
│  ⚙ Settings │                                                     │
│            │                                                     │
│  [Log Out] │                                                     │
└────────────┴─────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Container | `container-standard` (1280px) |
| Layout | 12-col grid: sidebar `span 3` + content `span 9` |
| Sidebar | `width: 240px`, `position: sticky; top: 88px`, `border-right: 1px solid border.subtle` |
| Nav items | `body-md`, `py: 12px`, `px: 16px`, icon (20px) + label. Active = `bg: primary.50`, `text: primary.700`, `font-weight: 600`, `border-left: 3px solid primary.500` |
| Hover | `bg: surface.warm` |
| Log Out | `body-sm`, `text.muted`, bottom of sidebar, `mt: auto` |
| Mobile | Sidebar → horizontal scroll tabs at top of page |

**Navigation Items:**

| Nav Item | Icon (Lucide) | Route |
|---|---|---|
| Profile | `User` | `/account/profile` |
| Orders | `Package` | `/account/orders` |
| Saved Items | `Heart` | `/account/saved` |
| Membership | `Crown` | `/account/membership` |
| Addresses | `MapPin` | `/account/addresses` |
| Returns & Refunds | `RotateCcw` | `/account/returns` |
| Help & Support | `HelpCircle` | `/account/help` |
| Settings | `Settings` | `/account/settings` |

#### Orders — List View

| Property | Value |
|---|---|
| Layout | Vertical stack of order cards, `gap: 16px` |
| Order card | `border: 1px solid border.DEFAULT`, `rounded-2xl`, `p: 24px` |
| Card header | Flex: Order ID (`heading-sm`) + Date (`body-sm`, `text.muted`) + Total (`price-md`) + Status badge |
| Status badges | `Confirmed` (info), `Processing` (warning), `Shipped` (primary), `Delivered` (success), `Cancelled` (error), `Return Initiated` (warning) |
| Card body | Inline thumbnails (48px, `rounded-lg`) of ordered items, max 4 visible + "+N more" |
| Card actions | `body-sm` links: "View Details" · "Track Order" · "Request Return" |
| Pagination | Numbered, centered, matching PLP pagination style |
| Filters | Dropdown: "All Orders" / "Last 30 days" / "Last 6 months" / "Last year" |

#### Orders — Detail View

| Property | Value |
|---|---|
| Header | `heading-md`: "Order #[ID]" + status badge + date |
| Sections | Order Items → Shipping & Tracking → Payment Summary → Actions |
| Item row | `80px` image (`rounded-xl`) + name + variant + qty + price. Same layout as cart item rows. |
| Tracking | Per-shipment group (split-shipping aware): carrier + tracking number (linked) + status timeline |
| Status timeline | Vertical stepper: dots connected by line. Current step = `primary.500` filled, completed = `semantic.success`, future = `border.DEFAULT` |
| Payment summary | Itemized: subtotal, shipping, discount, tax, total. Matches checkout order summary layout. |
| Actions | `btn-secondary btn-sm`: "Request Return" · "Download Invoice" · "Contact Support" |

#### Saved Items (Wishlist)

| Property | Value |
|---|---|
| Layout | 3-column product card grid (reuses §4.4 Product Card component) |
| Extra actions | Each card has "Move to Cart" (`btn-primary btn-sm`) + "Remove" (`body-sm`, `text.muted`) below price |
| Empty state | §4.17 empty wishlist pattern |
| Sort | "Date Added" (default) / "Price Low→High" / "Price High→Low" |

#### Membership Management

| Property | Value |
|---|---|
| Current tier | Large badge: tier name + icon. Gold = `secondary.100` bg card with crown icon. Free = `surface.muted` bg. |
| Billing info | `body-md`: "Next billing date: [date]" · "Payment method: •••• 4242" · `text.link`: "Update payment" |
| Benefits summary | Compact version of §3.5 Benefits Checklist (collapsed accordion, expandable) |
| Actions (Free) | `btn-primary btn-lg`: "Upgrade to Gold — $9.99/mo" + trial callout if eligible |
| Actions (Gold) | `btn-ghost btn-sm`: "Cancel Membership" → confirmation modal with retention offer |
| Cancel modal | `rounded-3xl`, centered, `shadow-xl`. Heading + "We'll miss you" message + retention offer ("Stay for $7.99/mo for 3 months?") + two CTAs: "Keep Gold" (primary) / "Cancel Anyway" (ghost) |

#### Returns & Refunds

| Property | Value |
|---|---|
| Section header | `heading-md`: "Returns & Refunds" + `body-sm` policy summary: "Free: 7–15 days · Gold: 3–5 days" |
| Active returns | Card list matching order card style, with return-specific status badges: `Return Requested`, `Item Shipped Back`, `Received`, `Refund Processed` |
| Return request flow | Step-by-step wizard (3 steps): 1) Select order/items → 2) Reason + condition → 3) Confirm & get label |
| Step 1 | List of eligible orders. Each item has checkbox + image + name. Select items to return. |
| Step 2 | Reason dropdown (Wrong size, Defective, Changed mind, etc.) + Condition radio (Unopened, Used, Damaged) + optional notes textarea |
| Step 3 | Summary card + return label download (`btn-primary`: "Download Return Label") + return shipping instructions |
| Refund tracker | Timeline stepper (same as order tracking): Return Requested → Item Shipped → Received at Warehouse → Refund Processed. Estimated refund date displayed. |
| Refund method | `body-sm`: "Refund to original payment method" + estimated processing time (3–5 business days Gold, 7–15 Free) |

#### Help & Support

| Property | Value |
|---|---|
| Section header | `heading-md`: "Help & Support" |
| Layout | 2-column: Left (FAQ accordion + contact options) / Right (help categories grid) |
| FAQ | Reuses §4.6 Accordion component. Top 5 FAQs: Shipping, Returns, Membership, Payments, Account. |
| Help categories | 2×3 grid of cards (`rounded-2xl`, `surface.warm`, icon + label): Shipping, Returns, Payments, Membership, Account, Orders |
| Contact options | Card stack: Live Chat (`btn-primary`: "Start Chat", availability badge: "Online" green / "Offline" muted) · Email (`btn-secondary`: "Send Email", response time: "< 24h" or "< 2h" for Gold) · Phone (Gold only: phone number + hours) |
| Gold priority | Gold members see `badge-sm` "Priority Support" next to their name. Chat/email routed to priority queue (PRD §6.2). |
| Ticket history | Expandable section: list of past support tickets with status (Open, Resolved, Closed) |

---

## 4. Atomic Component Specs

### 4.1 Buttons

#### Variants

| Variant | Background | Text | Border | Hover | Active |
|---|---|---|---|---|---|
| `btn-primary` | `primary.500` | `white` | none | `primary.600` + `shadow-md` | `primary.700` |
| `btn-secondary` | `transparent` | `primary.500` | `1px solid primary.500` | `primary.50` bg | `primary.100` bg |
| `btn-accent` | `secondary.500` | `white` | none | `secondary.600` + `shadow-md` | `secondary.700` |
| `btn-ghost` | `transparent` | `text.secondary` | none | `surface.muted` bg | `surface.warm` bg |
| `btn-danger` | `semantic.error` | `white` | none | darken 10% | darken 20% |

#### Sizes

| Size | Height | Padding (x) | Font | Icon Size |
|---|---|---|---|---|
| `btn-sm` | 36px | 16px | `body-sm` (14px) | 16px |
| `btn-md` | 44px | 20px | `body-md` (16px) | 20px |
| `btn-lg` | 52px | 24px | `body-lg` (18px) | 24px |
| `btn-xl` | 56px | 32px | `body-lg` (18px, 600wt) | 24px |

#### Shared Properties

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 9999px; /* pill shape — ALL buttons */
  font-family: 'Satoshi', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 300ms ease-out;
  white-space: nowrap;
}
.btn:focus-visible {
  outline: 2px solid #4A5D4E;
  outline-offset: 2px;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 4.2 Inputs

#### Text Input

```css
.input {
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-family: 'Satoshi', sans-serif;
  font-size: 16px;
  color: #1C1917;
  background: #FFFFFF;
  transition: border-color 300ms ease-out, box-shadow 300ms ease-out;
}
.input::placeholder {
  color: #A8A29E;
}
.input:hover {
  border-color: #D1D5DB;
}
.input:focus {
  outline: none;
  border-color: #4A5D4E;
  box-shadow: 0 0 0 3px rgba(74, 93, 78, 0.1);
}
.input-error {
  border-color: #991B1B;
  box-shadow: 0 0 0 3px rgba(153, 27, 27, 0.1);
}
```

#### Search Input (Pill — for PLP category search)

```css
.input-search {
  height: 44px;
  padding: 10px 20px 10px 44px; /* left space for icon */
  border: 1px solid #E5E7EB;
  border-radius: 9999px;
  background: #FFFFFF url('search-icon.svg') no-repeat 16px center;
  background-size: 20px;
}
```

#### Select / Dropdown

| Property | Value |
|---|---|
| Height | 48px |
| Border | `1px solid border.DEFAULT` |
| Radius | `12px` |
| Chevron | Custom SVG, positioned right 16px, 20px size |
| Focus | Same as text input |

#### Range Slider (Price Filter)

| Property | Value |
|---|---|
| Track | `4px` height, `bg: border.DEFAULT`, `rounded-full` |
| Fill | `bg: primary.500` |
| Thumb | `20px` circle, `bg: primary.500`, `border: 2px solid white`, `shadow-md` |

#### Checkbox

| Property | Value |
|---|---|
| Size | `20px × 20px` |
| Border | `2px solid border.strong` |
| Radius | `4px` |
| Checked | `bg: primary.500`, white checkmark SVG |
| Focus | `outline: 2px solid primary.500, offset: 2px` |

#### Form Validation Error Pattern

> **PRD Ref:** A11Y-005 — Errors announced via `aria-live`, linked via `aria-describedby`.

| Property | Value |
|---|---|
| Position | Directly below erroring input, `mt: 6px` |
| Icon | `14px` alert-circle (Lucide), `semantic.error`, left of message |
| Text | `13px`, `semantic.error`, `font-weight: 400` |
| Input state | `.input-error`: red border + `box-shadow: 0 0 0 3px rgba(153, 27, 27, 0.1)` |
| ARIA (input) | `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| ARIA (message) | `<p id="[error-id]" role="alert">` or within `aria-live="polite"` region |
| Multi-field summary | For checkout forms: error summary box at form top — `semantic.error-light` bg, `3px` left border `semantic.error`, lists all errors as anchor links to fields |

### 4.3 Badges & Chips

#### Badge Variants

| Type | Background | Text | Border | Usage |
|---|---|---|---|---|
| Discount | `semantic.success` | `white` | none | "50% off" on product images (PLP) |
| New | `secondary.500` | `white` | none | "New" on product cards |
| Low Stock | `semantic.warning-light` | `semantic.warning` | none | "Only X left" on PDP |
| Out of Stock | `semantic.error-light` | `semantic.error` | none | "Out of Stock" overlay |
| Gold Member | `secondary.100` | `secondary.700` | none | "Gold Exclusive" on pricing |
| Certification | `primary.50` | `primary.700` | `1px solid primary.200` | "Organic", "BPA-Free" on PDP |
| Active Filter | `primary.50` | `primary.700` | `1px solid primary.200` | PLP active filter chips |

#### Badge Sizing

| Size | Padding | Font | Radius |
|---|---|---|---|
| `badge-sm` | `2px 8px` | `caption` (12px, 500wt) | `9999px` |
| `badge-md` | `4px 12px` | `body-sm` (14px, 500wt) | `9999px` |

### 4.4 Product Card

Used on: PLP grid, Homepage Trending carousel, Related Products, Recommended Products.

```
┌──────────────────────────┐
│  [Badge: "50% off"]      │
│  [♡ Wishlist]      ─────→│  (top-right icons)
│                          │
│     PRODUCT IMAGE        │
│     (aspect 4:5)         │
│                          │
│  ┌──[ATC overlay]──────┐ │  (appears on hover)
│  │ 🛒 Add to Cart      │ │
│  └──────────────────────┘ │
├──────────────────────────┤
│  [overline: "Category"]  │
│  [heading-sm: "Name"]    │  ★ 4.9
│  [price-strike] [price]  │
└──────────────────────────┘
```

| Property | Value |
|---|---|
| Width | Fills grid column |
| Background | `surface.white` |
| Border | `1px solid border.subtle` |
| Border radius | `16px` (`rounded-2xl`) |
| Shadow (rest) | `shadow-sm` |
| Shadow (hover) | `shadow-md` |
| Image | `aspect-ratio: 4/5`, `object-fit: cover`, `rounded-t-2xl` |
| Badge | Positioned `top: 12px, left: 12px`, absolutely |
| Wishlist icon | Positioned `top: 12px, right: 12px`, 36px circle, `bg: surface.white/80`, `backdrop-blur` |
| ATC overlay | Bottom of image, full-width, `bg: primary.500/90`, `backdrop-blur(4px)`, appears on hover with slide-up animation |
| Info section | `p: 16px` |
| Category | `overline` style, `text.muted` |
| Product name | `heading-sm`, `text.primary`, max 2 lines with `line-clamp-2` |
| Rating | Star icon (`secondary.500`) + `body-sm` number, right-aligned |
| Price | `price-md` for current; `price-strike` for original. Inline. |
| Hover | Card lifts: `transform: translateY(-4px)`, `shadow-md`, transition `300ms ease-out` |

### 4.5 Star Rating

| Property | Value |
|---|---|
| Icon | Filled star SVG, 16px (small) / 20px (medium) |
| Filled | `secondary.500` (#D97706) |
| Empty | `border.DEFAULT` (#E5E7EB) |
| Half | Clip-path or gradient (50% filled, 50% empty) |
| Gap | `2px` between stars |
| Display | Inline-flex, vertically centered with adjacent text |

### 4.6 Accordion (FAQ)

```css
.accordion-item {
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 8px;
  transition: all 300ms ease-out;
}
.accordion-item[data-state="open"] {
  border-color: #4A5D4E;
  border-width: 2px;
  background-color: #F0F4F1; /* primary.50 */
}
.accordion-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-family: 'Satoshi', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1C1917;
}
.accordion-chevron {
  width: 20px;
  height: 20px;
  transition: transform 300ms ease-out;
}
.accordion-item[data-state="open"] .accordion-chevron {
  transform: rotate(180deg);
}
.accordion-content {
  padding-top: 12px;
  font-size: 14px;
  color: #57534E;
  line-height: 1.6;
}
```

### 4.7 Testimonial Card

| Property | Value |
|---|---|
| Background | `surface.white` (featured) / `transparent` (side peeks) |
| Text alignment | Center |
| Star rating | Centered, `secondary.500` |
| Quote text | `body-lg`, `font-style: italic`, `font-family: serif`, `text.primary` |
| Author | `heading-sm`, `text.primary` |
| Location | `body-sm`, `text.muted` |
| Decorative quote mark | `120px`, `secondary.100` color, positioned behind/below, `opacity: 0.3` |

### 4.8 Toast / Notification

| Type | Left Border | Icon | Background |
|---|---|---|---|
| Success | `3px solid semantic.success` | ✓ circle | `semantic.success-light` |
| Error | `3px solid semantic.error` | ✗ circle | `semantic.error-light` |
| Warning | `3px solid semantic.warning` | ⚠ triangle | `semantic.warning-light` |
| Info | `3px solid semantic.info` | ℹ circle | `semantic.info-light` |

| Property | Value |
|---|---|
| Position | Fixed, `top: 88px`, `right: 24px`, `z-index: 60` |
| Width | `400px` max, `min-width: 320px` |
| Radius | `12px` |
| Shadow | `shadow-lg` |
| Animation | Slide-in from right, 300ms ease-out |
| Auto-dismiss | 5s (success/info), persist (error/warning) |

### 4.9 Autocomplete Dropdown

> **PRD Ref:** DISC-001→004 — 8 suggestions, grouped headers, keyboard nav.

| Property | Value |
|---|---|
| Trigger | 3+ characters typed + 150ms debounce |
| Position | `absolute`, below search input, full-width of search bar, `z-index: 55` |
| Background | `surface.white` |
| Shadow | `shadow-lg` |
| Border | `1px solid border.DEFAULT`, `rounded-xl` |
| Max height | `480px`, `overflow-y: auto` |
| Group headers | `overline` style, `text.muted`, `px: 16px`, `py: 8px`, non-focusable (`aria-hidden`) |
| Product row | Flex: `48px` image (`rounded-lg`) + name (`body-md`) + price (`price-md`). `px: 16px`, `py: 10px`. |
| Category/recent row | Icon (16px) + `body-md` text. `px: 16px`, `py: 10px`. |
| Hover/Focus | `bg: primary.50` + `2px` left border `primary.500` |
| Keyboard | Arrow keys traverse; Enter selects; Escape closes. Focus ring visible (A11Y-002). |
| Max items | 8 total: 4 products + 2 categories + 2 recent searches |
| Groups | "Products", "Categories", "Your Recent Searches" — headers decorative, screen readers announce group labels |

### 4.10 Typo Correction Notice

> **PRD Ref:** DISC-005→006 — "Showing results for X. Search instead for Y?"

| Property | Value |
|---|---|
| Position | Top of search results, before product grid, `mb: 16px` |
| Background | `surface.warm`, `rounded-xl`, `px: 16px`, `py: 12px` |
| Content | "Showing results for **[corrected]**. Search instead for [original]?" |
| Corrected term | `font-weight: 700`, `text.primary` |
| Original term | `text.link` (sage), underlined, clickable — bypasses fuzzy matching |

### 4.11 Comparison Tray

> **PRD Ref:** §2.3 L144 — Inline comparison tray, max 4 items.

| Property | Value |
|---|---|
| Trigger | "Compare" checkbox on product card hover (bottom-right) |
| Position | Fixed bottom bar, `z-index: 45`, full-width, `bg: surface.white`, `shadow-lg` (upward), `border-top: 1px solid border.DEFAULT` |
| Height (collapsed) | `80px` — flex row: up to 4 thumbnails (56px, `rounded-lg`) + names + `btn-primary btn-sm`: "Compare (N)" + `×` clear |
| Height (expanded) | Full-screen overlay, `container-standard`, table: columns = products, rows = attributes |
| Attributes | Auto-populated: Price, Rating, Material, Dimensions, Shipping ETA |
| Max items | 4. 5th attempt → toast warning. |
| Mobile | Fixed bottom sheet, swipeable cards |

### 4.12 Mini-Cart Slide-In Panel

> **PRD Ref:** §3.2 L197 — "Item added; mini-cart slides in."

| Property | Value |
|---|---|
| Trigger | Successful Add to Cart |
| Position | Fixed, right, `top: 0`, `height: 100vh`, `z-index: 55` |
| Width | `420px` (desktop), `100vw` (mobile) |
| Background | `surface.white` |
| Shadow | `shadow-xl` (left side) |
| Backdrop | `surface.overlay`, click to close |
| Animation | `translateX(100%) → 0`, `300ms ease-out` |
| Header | `heading-lg`: "Your Cart (N)" + `×` close (top-right) |
| Item row | `56px` image (`rounded-lg`) + name (`heading-sm`) + variant (`body-sm`, `text.muted`) + qty + `price-md`. `border-bottom: 1px solid border.subtle`. |
| Footer (sticky) | Subtotal (`heading-md`) + `btn-primary btn-lg` full-width: "Checkout" + `body-sm` link: "View Cart" |
| Empty state | Shopping bag icon (48px, `text.muted`) + "Your cart is empty" + `btn-secondary`: "Continue Shopping" |

### 4.13 Notify Me (OOS Recovery)

> **PRD Ref:** PDP-003 — Out-of-stock variant → "Notify Me" button.

| Property | Value |
|---|---|
| Trigger | Selected variant `stock === 0` |
| Replaces | Main CTA in buy-box |
| Button (initial) | `btn-secondary btn-xl`: bell icon + "Notify Me When Available" |
| Form (on click) | Expands inline: email `.input` (`rounded-l-full`) + `btn-primary` (`rounded-r-full`): "Notify" |
| Success state | ✓ icon + `body-md`: "We'll email you when this is back!" + `text.link`: "Change email" |
| ARIA | `aria-expanded` on button; `aria-live="polite"` for success |

### 4.14 Toggle Switch (Subscribe & Save)

> **PRD Ref:** PDP Buy Box — Subscribe toggle.

| Property | Value |
|---|---|
| Track | `48px × 26px`, `rounded-full`, `bg: border.DEFAULT` (off) / `bg: primary.500` (on) |
| Knob | `22px` circle, `bg: white`, `shadow-sm`, slides left/right |
| Transition | `150ms ease-out` |
| Label | `body-md`: "Subscribe & Save" |
| Savings callout | `badge-sm`, `semantic.success-light` bg: "Save 15%" |
| Subscript | `body-sm`, `text.muted`: "Delivered every 30 days. Cancel anytime." |
| ARIA | `role="switch"`, `aria-checked`, `aria-label` |

### 4.15 Quantity Stepper

> **PRD Ref:** §3.4 — Cart quantity controls.

| Property | Value |
|---|---|
| Layout | Inline flex: `[–]` + count + `[+]` |
| Button size | `32px × 32px`, circular (`rounded-full`), `bg: surface.muted`, hover: `bg: primary.50` |
| Count | `body-md`, `font-weight: 600`, `min-width: 32px`, center-aligned |
| Disabled (min) | `–` at `qty === 1`: `opacity: 0.3`, `cursor: not-allowed` |
| Disabled (max) | `+` at `qty === stock`: `opacity: 0.3`, `cursor: not-allowed` |
| ARIA | Buttons: `aria-label="Decrease/Increase quantity"`. Count: `aria-live="polite"` |

### 4.16 Gold Trial Offer Card

> **PRD Ref:** CHK-011→013 — Post-checkout Gold trial card, 1-click CTA, legal visible before CTA.

| Property | Value |
|---|---|
| Position | Confirmation page, below order summary, `mt: 48px` |
| Background | Gradient: `primary.50` → `secondary.50` |
| Border | `2px solid primary.500` |
| Radius | `24px` (`rounded-3xl`) |
| Shadow | `shadow-lg` |
| Padding | `32px` |
| Layout | 2-column: Left (heading + 4 benefit bullets + legal) / Right (lifestyle image, `rounded-2xl`) |
| Heading | `heading-lg`: "Start Your Free 30-Day Gold Trial" |
| Benefits | Check icons (`primary.500`): Free shipping, Priority delivery, 5% every order, Early access |
| Legal text | `caption`, `text.muted`: "You will be charged $9.99/month after 30 days. Cancel anytime." — **visible without scrolling, before CTA** |
| CTA | `btn-primary btn-lg`: "Start Free Trial →" — single click, no form |
| Returning users | If prior trial → `heading-lg`: "Welcome Back" + "$7.99/mo for first 3 months" (CHK-014) |
| Mobile | Stacked: image on top, content below |

### 4.17 Empty & Error States

> **PRD Ref:** DISC (0 results), CHK-007 (stale items), CHK-009 (expired items).

#### Empty States

| State | Icon (64px, `text.muted`) | Heading (`heading-md`) | Body (`body-md`, `text.secondary`) | CTA |
|---|---|---|---|---|
| Empty cart | Shopping bag | "Your cart is empty" | "Discover our curated collection" | `btn-primary`: "Start Shopping" |
| No search results | Search | "No results for \"[query]\"" | "Try a different search or browse categories" | `btn-secondary`: "Browse Categories" |
| No reviews | Star | "No reviews yet" | "Be the first to share your experience" | `btn-secondary`: "Write a Review" |
| Empty wishlist | Heart | "Your wishlist is empty" | "Save items you love for later" | `btn-primary`: "Explore Products" |

**Layout:** Centered vertically + horizontally, `py: 96px`, icon → heading (`mt: 16px`) → body (`mt: 8px`, `max-width: 400px`) → CTA (`mt: 24px`).

#### Inline Cart Warning (Stale Items)

| Property | Value |
|---|---|
| Position | Top of cart items list, `mb: 16px` |
| Background | `semantic.warning-light` |
| Border | `1px solid semantic.warning`, `rounded-xl` |
| Padding | `16px 20px` |
| Layout | Flex: warning icon (20px) + `body-sm` message |
| Content | "Some items in your cart have been updated:" + per-item changes |
| Action | "Acknowledge" button required before checkout (CHK-007) |

---

## 5. Motion & Animation

### 5.1 Timing Tokens

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `motion-fast` | `150ms` | `ease-out` | Checkbox, toggle, icon rotation |
| `motion-default` | `300ms` | `ease-out` | All standard transitions (hover, focus, state changes) |
| `motion-slow` | `500ms` | `ease-out` | Page section fade-in, carousel slide, modal open |
| `motion-spring` | `500ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions (ATC bounce, notification pop) |

### 5.2 Animation Catalog

| Animation | Trigger | Properties | Duration | Easing |
|---|---|---|---|---|
| Card hover lift | Mouse enter | `translateY(-4px)`, `shadow-sm → shadow-md` | 300ms | ease-out |
| Card image scale | Mouse enter | `transform: scale(1.03)` on image only | 300ms | ease-out |
| ATC overlay slide | Mouse enter card | `translateY(0)` from `translateY(100%)` | 300ms | ease-out |
| Button press | Click | `scale(0.97)` → `scale(1)` | 150ms | ease-out |
| Mega-nav open | Hover nav item | `opacity: 0→1`, `translateY(-8px)→0` | 200ms | ease-out |
| Mini-cart slide | ATC click | Slide from right, `translateX(100%)→0` | 300ms | ease-out |
| Toast notification | Event trigger | Slide from right, `translateX(100%)→0` | 300ms | ease-out |
| Accordion expand | Click trigger | `max-height: 0 → auto` (JS), chevron rotates 180° | 300ms | ease-out |
| Checkout step transition | Step continue CTA | Active step collapses (summary slides in), next step expands | 300ms | ease-out |
| Page section reveal | Scroll into view | `opacity: 0→1`, `translateY(24px)→0` | 500ms | ease-out |
| Hero slider | Auto / arrow | `opacity` crossfade | 500ms | ease-out |
| Carousel slide | Swipe / arrow | `scroll-behavior: smooth` + `scroll-snap` | native | native |
| Skeleton pulse | Loading state | `opacity: 0.5→1→0.5` repeating | 1500ms | ease-in-out |

### 5.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

> **PRD Ref:** A11Y-006 — Respect `prefers-reduced-motion`. All non-essential animations disabled.

---

## 6. Iconography & Media

### 6.1 Icon System

| Property | Value |
|---|---|
| Library | Lucide Icons (open source, consistent stroke style) |
| Default size | `20px` (body context) / `24px` (buttons, nav) / `48px` (feature sections) |
| Stroke width | `1.5px` (default) / `2px` (small sizes for clarity) |
| Color | Inherits `currentColor` from parent |
| Alignment | Vertically centered within flex containers |

### 6.2 Image Specifications

| Context | Format | Aspect Ratio | Max Width | Loading |
|---|---|---|---|---|
| Product card (PLP) | WebP, AVIF fallback | `4:5` | 400px | Lazy (`loading="lazy"`) |
| PDP main image | WebP, AVIF fallback | `1:1` | 800px | Eager (above fold) |
| PDP thumbnails | WebP | `1:1` | 80px | Eager |
| Hero slider | WebP, AVIF fallback | Free-form (product cutout, no bg) | 600px | Eager (first slide), lazy (rest) |
| Category icons | WebP or SVG | `1:1` | 200px | Eager |
| Narrative sections | WebP, AVIF fallback | `3:4` or `1:1` | 600px | Lazy |
| UGC thumbnails | WebP | `9:16` (portrait) | 200px | Lazy |

> **PRD Ref:** PDP-005 through PDP-008 — 360° viewer uses 24–36 frame sequences, lazy-loaded after first 6 frames.

---

## 7. Responsive Breakpoints

| Token | Min-Width | Tailwind Prefix | Usage |
|---|---|---|---|
| `mobile` | `0px` | (default) | Single column, stacked layout |
| `sm` | `640px` | `sm:` | Large phones landscape |
| `md` | `768px` | `md:` | Tablets — 2-col grids, sidebar appears |
| `lg` | `1024px` | `lg:` | Small desktops — full grid layouts |
| `xl` | `1280px` | `xl:` | Standard desktop — `container-standard` reaches max |
| `2xl` | `1536px` | `2xl:` | Large screens — `container-immersive` breathing room |

### Mobile Adaptations

| Component | Desktop | Mobile |
|---|---|---|
| Navbar | Horizontal links + icons | Hamburger → slide-out drawer |
| PLP sidebar | Sticky left column | "Filter" button → bottom sheet |
| PLP grid | 3 columns | 1 column (2 on `sm`) |
| PDP gallery + buybox | Side-by-side | Stacked (gallery on top) |
| PDP narrative zig-zag | 2-col alternating | Stacked (image → text) |
| Checkout (accordion) | Accordion steps (span 7) + sticky summary (span 5) | Stacked: accordion full-width + collapsible summary bar + fixed bottom CTA |
| Membership cards | 2-col (Free + Gold) | Stacked, Gold card first |
| Category grid | 6 columns | 2 columns |
| Hero | Text + overlapping images | Text above, single image below |
| Carousel | 3–5 visible cards | 1.5 visible cards (peek next) |

---

## 8. Design Rationale

### Why These Choices?

| Decision | Rationale | PRD Alignment |
|---|---|---|
| **Pill-shaped buttons** | Soft geometry = "Safe" and approachable. Avoids aggressive corners. Aligns with Japandi tactile warmth. | Brand DNA: Restorative, Safe |
| **Sage moss primary** | Earth-toned green = wellness, nature, cleanliness. Perfect for "Self-Sanitizing" USP. Not clinical. | Brand DNA: Organic Modernist |
| **Warm amber secondary** | Provides warmth and energy for CTAs without aggression. Complementary to sage on the color wheel. | Brand DNA: Aspirational |
| **Cloud dancer surface** | Warm white (not pure #FFF) reduces eye strain, creates "lived-in" quality, feels like natural linen. | Brand DNA: Restorative |
| **Lora serif headings** | Adds editorial gravitas. Signals quality and thoughtfulness. Contrasts pleasantly with Satoshi's clean geometry. | Tone: Japandi + editorial |
| **96px section spacing** | Creates "visual breathing room." Content feels unhurried, mirroring UX Mandate: "calm and unhurried." | PRD §2.2: No anxiety triggers |
| **Sage-tinted shadows** | Shadows with color tint (not black) feel softer and warmer. Reinforces organic palette consistency. | Brand DNA: Minimalist |
| **4px baseline grid** | Ensures mathematical harmony across all spacing. Prevents visual jitter. Standard for precision layouts. | PRD: Performance + CLS < 0.05 |
| **No urgency patterns** | No countdown timers, no "only 2 left" badges (PRD explicitly bans them). Trust replaces urgency. | PRD §2.2: UX Mandate |
| **Sticky buy-box** | User requirement from mockups. Keeps ATC always visible during scroll through narrative sections. | PRD §3.2: Checkout efficiency |
| **Zig-zag PDP sections** | User explicitly requested "beautiful sections like img2 and img4" for showcasing product features uniquely. | Design Inspiration: PDP Readme |
| **PLP inline category search** | User explicitly requested a search input near Sort By for intra-category filtering. | Design Inspiration: PLP Readme |
| **300ms transitions** | Fast enough to feel responsive, slow enough to feel intentional and calm. Not jarring. | Brand DNA: Restorative |
| **Accordion checkout** | Single page reduces cognitive load; all steps visible = no surprise fees. Edit links build trust. Aligns with "calm and unhurried" UX mandate. | PRD §7.1: Single-page accordion |
| **2-tier membership** | Only Free + Gold — no Silver. Simplifies comparison, reduces decision fatigue, matches PRD §6.1. | PRD §6.1: Two tiers only |

> **Design System Contract v1.0.0**
> All coding agents must treat this document as the immutable source of truth.
> Deviations require explicit approval and a version bump to this document.
>
> **Companion Documents:**
> - [See PRD.md] — All functional requirements, edge cases, and business logic
> - [See architecture.md] — Technical architecture, infrastructure, and deployment strategy
