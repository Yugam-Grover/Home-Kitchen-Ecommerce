---
description: Step-by-step workflow for building wellness-ui design system components
---

# New Component Workflow

Follow these steps in order when building any `wellness-ui` component. Do NOT skip steps.

## Pre-Implementation

### 1. Read the component spec
// turbo
Read the FULL component spec from `docs/design-system.md §4.x`. Extract:
- All variants (e.g., primary, secondary, ghost, danger)
- All sizes (e.g., sm, md, lg, xl)
- Exact CSS properties (dimensions, colors, typography, spacing, radii)
- Hover, focus, active, disabled states
- Animation/transition behavior
- ARIA attributes and accessibility requirements

### 2. Check file path mapping
// turbo
Read `docs/architecture.md §11.2` (Design System → Component Mapping) for the exact file path this component should live at. Example: `components/wellness-ui/button.tsx`.

### 3. Check PRD references
// turbo
Look for any PRD IDs referenced in the component spec (e.g., `PDP-003` for Notify Me, `CHK-011` for Gold Trial Card). Read those PRD sections to understand the business logic the component must support.

### 4. Check dependencies
// turbo
Check `docs/PROGRESS.md` component registry to see if this component depends on other components that need to be built first (e.g., Product Card depends on Badge + Star Rating).

## Implementation

### 5. Create the component file
Create the component at `src/components/wellness-ui/[component-name].tsx`.

Structure:
```tsx
// Props interface — explicit types for all props
interface ComponentNameProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  // ... all props from the spec
}

// Component — named export (no default exports)
export function ComponentName({ variant = 'primary', size = 'md', ...props }: ComponentNameProps) {
  return (
    // Use design tokens ONLY — no hardcoded values
  );
}
```

### 6. Implement all variants and states
- Implement EVERY variant from the spec (do not skip any)
- Implement all size variants
- Implement all interactive states: hover, focus-visible, active, disabled
- Use ONLY design tokens from `globals.css @theme`:
  - Colors: `text-sage-500`, `bg-surface-default`, etc.
  - Spacing: `p-4` (16px), `gap-2` (8px), etc.
  - Typography: Tailwind font classes mapped to design tokens
  - Shadows: `shadow-sm` through `shadow-xl` (sage-tinted)
  - Radii: `rounded-sm` (8px) through `rounded-full`

### 7. Add accessibility
Per PRD A11Y requirements:
- Add all ARIA attributes from the spec (`aria-label`, `aria-expanded`, `aria-live`, `role`, etc.)
- Ensure keyboard navigation works (Tab, Enter, Escape, Arrow keys as appropriate)
- Focus ring: `outline: 2px solid #4A5D4E; outline-offset: 2px` on `:focus-visible`
- Form elements: `aria-invalid` + `aria-describedby` for error states

### 8. Add motion support
- Apply animation timing from `design-system.md §5.1`:
  - `transition: all 300ms ease-out` for standard interactions
  - `150ms ease-out` for toggles/checkboxes
- Add `prefers-reduced-motion` support:

```css
@media (prefers-reduced-motion: reduce) {
  .component {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

- If the component needs Framer Motion/GSAP: it belongs in `components/external/`, NOT `wellness-ui/`

## Post-Implementation

### 9. Export with typed interface
Ensure the component:
- Has a named export (not default)
- Exports the props interface (for consuming components to use)
- Has explicit return type if complex
- Has no barrel export (import directly from file)

### 10. Update progress tracker
Update `docs/PROGRESS.md`:
- Mark the component as complete in the component registry
- Note which design-system section it implements
- Log any deviations or decisions (should be rare — spec is detailed)
