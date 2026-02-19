---
description: Step-by-step workflow for building any new page in the Home & Kitchen Platform
---

# New Page Workflow

Follow these steps in order when building any new page. Do NOT skip steps.

## Pre-Implementation

### 1. Identify the page in design-system.md
// turbo
Read `docs/design-system.md §3.x` for the page's layout spec. This tells you:
- Container type (immersive/standard/narrow)
- Grid layout (columns, gaps, responsive behavior)
- Section-by-section wireframe with exact spacing
- Mobile adaptation rules

### 2. Identify the route location in architecture.md
// turbo
Read `docs/architecture.md §2` (Directory Structure) to determine:
- Which route group: `(shop)`, `(account)`, `(seller)`, `(checkout)`, `(auth)`, or root
- Exact file path for the page (e.g., `app/(shop)/products/[slug]/page.tsx`)
- Whether it needs a layout file

### 3. Identify functional requirements in PRD.md
// turbo
Read `docs/PRD.md §4` (Functional Requirements) for the relevant feature IDs:
- Find the PRD IDs that map to this page (e.g., `DISC-*` for PLP, `PDP-*` for PDP, `CHK-*` for checkout)
- Cross-reference with `docs/architecture.md §11.1` (Traceability Matrix) to see all file mappings
- Check `docs/PRD.md §5` (Edge Case Matrix) for edge cases related to this page

### 4. Identify required components
// turbo
Read `docs/architecture.md §11.2` (Design System → Component Mapping) to list which `wellness-ui` components this page needs. Check `docs/PROGRESS.md` to see which are already built vs. need building.

## Implementation

### 5. Scaffold the page file
Create the page file at the correct route location. Default to **Server Component** (no `'use client'`).

```tsx
// Example: app/(shop)/products/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title — Restorative Home',
  description: 'SEO description here',
};

export default async function PageName() {
  // Server-side data fetching here
  return (
    <main>
      {/* Page content */}
    </main>
  );
}
```

### 6. Implement layout sections
Build each section following the wireframe from `design-system.md §3.x`:
- Use the exact container class (`container-immersive`, `container-standard`, `container-narrow`)
- Use the exact grid structure specified
- Apply section spacing from design tokens (`spacing-24` = 96px between major sections)
- Import and compose `wellness-ui` components

### 7. Apply caching strategy
Add the appropriate `use cache` directive per `architecture.md §8.1`:
- Check the cache strategy table for this route
- Apply revalidation time if applicable
- Mark interactive sections as client islands with `'use client'`

### 8. Add SEO metadata
Every page MUST have:
- `title` — Descriptive, includes "Restorative Home" brand name
- `description` — Compelling meta description
- Single `<h1>` per page
- Semantic HTML5 elements (`<main>`, `<section>`, `<article>`, `<nav>`)
- Unique IDs on all interactive elements

## Post-Implementation

### 9. Verify responsive behavior
Check the page at ALL breakpoints from `design-system.md §7`:
- Mobile (0px) — single column, stacked
- `sm` (640px) — large phone landscape
- `md` (768px) — tablet, 2-col grids, sidebar appears
- `lg` (1024px) — small desktop, full grids
- `xl` (1280px) — standard desktop
- `2xl` (1536px) — large screen

Refer to the "Mobile Adaptations" table in `design-system.md §7` for component-specific responsive changes.

### 10. Update progress tracker
Update `docs/PROGRESS.md`:
- Mark the page as complete in the page status section
- Note any components that were built as part of this page
- Log any decisions made
