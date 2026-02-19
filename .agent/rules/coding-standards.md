---
trigger: always_on
---

# Coding Standards — Home & Kitchen Platform

> Auto-loaded rules for TypeScript, React 19, and Next.js 16 patterns.
> Source of truth: `docs/architecture.md`

---

## 1. TypeScript Standards

- **Strict mode** — `strict: true` in `tsconfig.json`. No exceptions.
- **No `any`** — Use `unknown` + type narrowing if the type is truly unknown.
- **Explicit return types** on all exported functions and hooks.
- **Zod for runtime validation** — All API inputs validated with Zod schemas (`lib/utils/validation.ts`).
- **Database types** — Generated from Supabase. Import from `types/database.ts`.
- **Prefer `const` assertions** — Use `as const` for static config objects (see Cloudinary config in `architecture.md §7.2`).

---

## 2. Server vs Client Components

> Source: `architecture.md §2`, React 19 RSC model

### Default: Server Components

Every component is a Server Component by default. Only add `'use client'` when the component:
- Uses React hooks (`useState`, `useEffect`, `useRef`, etc.)
- Uses browser APIs (`window`, `document`, `navigator`, `localStorage`)
- Uses event handlers (`onClick`, `onChange`, `onSubmit`, etc.)
- Uses context providers/consumers

### Client Islands Pattern

Extract the smallest possible client boundary:

```tsx
// ✅ CORRECT — Server component with a small client island
// app/(shop)/products/[slug]/page.tsx (Server Component)
import { ProductGallery } from '@/components/wellness-ui/product-gallery';
import { BuyBox } from '@/components/wellness-ui/buy-box'; // 'use client' inside

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug); // Server fetch
  return (
    <div>
      <ProductGallery images={product.images} />  {/* Can be server */}
      <BuyBox product={product} />                 {/* Client island */}
    </div>
  );
}
```

```tsx
// ❌ WRONG — Entire page marked as client
'use client'; // DON'T do this on page-level components
export default function ProductPage() { ... }
```

---

## 3. `proxy.ts` — NOT `middleware.ts`

> Source: `architecture.md §4`

Next.js 16 uses `proxy.ts` (not `middleware.ts`) for edge logic. This file handles:
- Session resolution (Supabase Auth JWT)
- Currency detection (`x-vercel-ip-country` → `mapCountryToCurrency()`)
- Security headers (HSTS, CSP, X-Frame-Options)
- CSRF token validation
- Rate limiting routing
- Protected route redirects (`/account/*`, `/seller/*`, `/checkout`)
- Membership tier header (`x-membership-tier`)

**NEVER create a `middleware.ts` file. All edge logic goes in `proxy.ts`.**

---

## 4. `use cache` Patterns

> Source: `architecture.md §8.1`

Next.js 16 `use cache` directive replaces `revalidate` in most cases:

| Route/Component | Strategy | Revalidation |
|---|---|---|
| Homepage | `use cache` | 60s |
| PLP (category pages) | `use cache` | 30s |
| PDP (static content) | `use cache` | 300s |
| PDP (inventory/price) | **No cache** | Realtime WebSocket |
| Search results | **No cache** | Dynamic per query |
| Checkout | **No cache** | Fully dynamic |
| Exchange rates | `use cache` | 900s (15 min) |
| Product images | CDN-cached via Cloudinary | Immutable |

```tsx
// ✅ Example: Cached server component
async function TrendingProducts() {
  'use cache';
  const products = await getTrendingProducts();
  return <ProductGrid products={products} />;
}
```

---

## 5. No Manual Memoization

> Source: `architecture.md §1` — React Compiler enabled

React 19 Compiler (`reactCompiler: true` in `next.config.ts`) handles memoization automatically.

- ❌ Do NOT use `useMemo()`
- ❌ Do NOT use `useCallback()`
- ❌ Do NOT use `React.memo()`

The compiler optimizes re-renders automatically. Manual memoization adds unnecessary complexity.

---

## 6. Supabase Client Patterns

> Source: `architecture.md §6`

Three client variants — use the correct one for each context:

| Client | Function | Context | RLS |
|---|---|---|---|
| Browser | `createBrowserSupabase()` | Client components | ✅ Enforced |
| Server | `createServerSupabase()` | Server components, Route Handlers | ✅ Enforced |
| Admin | `createAdminSupabase()` | Server-only admin ops (erasure, migrations) | ❌ Bypassed |

```tsx
// Client component
'use client';
import { createBrowserSupabase } from '@/lib/supabase/client';
const supabase = createBrowserSupabase();

// Server component or Route Handler
import { createServerSupabase } from '@/lib/supabase/server';
const supabase = await createServerSupabase();

// Admin operations ONLY (service role)
import { createAdminSupabase } from '@/lib/supabase/admin';
const supabase = await createAdminSupabase();
```

**NEVER use the admin client in client components. NEVER expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.**

---

## 7. Component Architecture

> Source: `architecture.md §2`, `design-system.md §4`

### `wellness-ui/` — Design System Primitives

All design system components live in `src/components/wellness-ui/`. Each component:
- Implements the EXACT spec from `design-system.md §4.x`
- Uses ONLY design tokens from `globals.css @theme` (no hardcoded values)
- Has all variants and sizes from the spec
- Includes proper ARIA attributes (per PRD A11Y-* requirements)
- Supports `prefers-reduced-motion`
- Exports a typed props interface

### `external/` — Third-Party Animation Wrappers

Components that use Framer Motion, GSAP, or other animation libraries:
- MUST live in `src/components/external/`
- MUST be dynamically imported: `dynamic(() => import(...), { ssr: false })`
- MUST NOT be synchronously imported in above-fold components
- Have dedicated ESLint rules preventing synchronous animation imports

### `providers/` — Context Providers

React context providers for global state:
- `cart-provider.tsx` — Cart state (LocalStorage-backed, `architecture.md §4.4`)
- `currency-provider.tsx` — Currency selection + formatting (`architecture.md §5.3`)
- `auth-provider.tsx` — Supabase Auth session state

---

## 8. Import Rules

### Path Alias

Use `@/` for all imports from `src/`:

```tsx
// ✅ Correct
import { Button } from '@/components/wellness-ui/button';
import { useCart } from '@/hooks/use-cart';
import { createServerSupabase } from '@/lib/supabase/server';

// ❌ Wrong
import { Button } from '../../../components/wellness-ui/button';
```

### Import Order

Group imports in this order, separated by blank lines:

```tsx
// 1. React / Next.js
import { Suspense } from 'react';
import Image from 'next/image';

// 2. External packages
import { motion } from 'framer-motion';

// 3. Internal modules (lib, hooks, utils)
import { useCart } from '@/hooks/use-cart';
import { createServerSupabase } from '@/lib/supabase/server';

// 4. Components
import { Button } from '@/components/wellness-ui/button';
import { ProductCard } from '@/components/wellness-ui/product-card';

// 5. Types
import type { Product } from '@/types/database';
```

### No Barrel Exports

Do NOT create `index.ts` barrel files. Import directly from the component file:

```tsx
// ✅ Direct import
import { Button } from '@/components/wellness-ui/button';

// ❌ No barrel exports
import { Button } from '@/components/wellness-ui';
```

---

## 9. Error Handling

### API Route Handlers

Return structured error responses with appropriate HTTP status codes:

```tsx
// Standard error response shape
{ error: string; code?: string; details?: unknown }
```

### Form Validation

- Use Zod schemas for all form inputs
- Display inline errors with `.input-error` styling (`design-system.md §4.2`)
- Error messages below erroring input with `mt: 6px`, alert-circle icon
- `aria-invalid="true"` + `aria-describedby="[error-id]"` on invalid inputs
- `aria-live="polite"` or `role="alert"` on error messages
- Multi-field forms: error summary box at form top (checkout pattern)

### Data Fetching Errors

- Server components: use `error.tsx` boundaries per route segment
- Client components: handle errors in state, show Toast notification (`design-system.md §4.8`)

---

## 10. Animation Rules

> Source: `architecture.md §8.4`, `design-system.md §5`

### Timing Tokens

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `motion-fast` | 150ms | ease-out | Toggle, checkbox, icon rotation |
| `motion-default` | 300ms | ease-out | All standard hover/focus/state transitions |
| `motion-slow` | 500ms | ease-out | Page sections, carousel, modal |
| `motion-spring` | 500ms | cubic-bezier(0.34,1.56,0.64,1) | ATC bounce, notification pop |

### Isolation Rules

- Framer Motion / GSAP → ONLY in `components/external/`
- Must use `dynamic(() => import(...), { ssr: false })`
- CSS transitions for simple hover/focus — no JS library needed
- `@media (prefers-reduced-motion: reduce)` must disable all non-essential animations

### Above-Fold Rule

Components rendered above the fold (hero, navbar, first product row) must NEVER synchronously import animation libraries. This is a **performance-blocking violation** (degrades LCP).