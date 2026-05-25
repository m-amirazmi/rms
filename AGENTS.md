# RMS Monorepo — Agent Guide

> AI-first reference for building consistently across this codebase.
> When in doubt, check `apps/pos/docs/design-guide.md` for detailed design tokens.

---

## Project Overview

A **Bun + Turborepo monorepo** containing a tablet-first POS (Point of Sale) portal for repair intake workflows.

- `apps/pos` — Main POS application (Vite + React + TanStack Router)
- `packages/ui` — Shared shadcn/ui component library (`@workspace/ui`)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Bun | 1.x |
| Monorepo | Turborepo | 2.x |
| Framework | React | 19 |
| Bundler | Vite | 8 |
| Router | TanStack Router | v1 (file-based, auto code-splitting) |
| Styling | Tailwind CSS | v4 (via `@tailwindcss/vite`) |
| UI | shadcn/ui | radix-sera style |
| Icons | Phosphor Icons | `@phosphor-icons/react` |
| Fonts | DM Sans (body), Nunito Sans Variable (headings), Space Mono (mono) |

---

## Design System

**Theme:** "Sharper Pop" by Muhamad Amir, published on [tweakcn.com](https://tweakcn.com/themes/cmkcjz6s0000104l574rqdux5)

- **Personality:** Fresh, sharp, and vibrant. Mint-green background with indigo primary, teal secondary, and amber accents.
- **CSS source of truth:** `packages/ui/src/styles/globals.css`
- **Token reference:** `apps/pos/docs/design-guide.md`
- **Rule:** Never hardcode raw color or radius values — always use CSS variables and `@theme inline` mappings.

---

## Component Conventions

- **Location:** Add new shared components to `packages/ui/src/components/`. App-specific components go in `apps/pos/src/components/`.
- **Variants:** Use CVA (`class-variance-authority`) for component variants. See existing `button.tsx`, `badge.tsx`, `card.tsx`.
- **Class merging:** Always use `cn()` from `@workspace/ui/lib/utils` (wraps `clsx` + `tailwind-merge`).
- **Icons:** Only `@phosphor-icons/react`. Never import Lucide directly.
- **shadcn style:** `radix-sera` (configured in `components.json`).

---

## Route Patterns

- `apps/pos/src/routes/` — File-based routing via TanStack Router.
- Route groups: `(auth)/`, `(wizard)/`
- Root layout: `routes/__root.tsx` wraps all pages with `<Header />` + `<Outlet />`
- Route tree is auto-generated at `src/routeTree.gen.ts`

---

## Key Commands

```bash
# Dev server (apps/pos)
bun run dev

# Build (typecheck + Vite)
bun run build

# Lint (ESLint)
bun run lint

# Typecheck (tsc --noEmit)
bun run typecheck

# Format (Prettier)
bun run format
```

---

## Design Rules (Quick Reference)

1. **Colors:** Only CSS variables (`--background`, `--primary`, etc.). Never hex/rgb/hsl literals.
2. **Radius:** Derive from `--radius: 0.5rem` (scale: sm, md, lg, xl, 2xl, 3xl, 4xl).
3. **Sidebar:** Use sidebar-specific token namespace (`--sidebar-*`). Never bleed page tokens into sidebar.
4. **Charts:** Use `--chart-1` through `--chart-5` for data visualization only.
5. **Fonts:** `font-sans` for body/UI, `font-heading` for titles.
6. **Dark mode:** Fully supported. Test both `:root` (light) and `.dark` classes.

---

## Package Aliases

| Alias | Target |
|---|---|
| `@/*` | `apps/pos/src/*` |
| `@workspace/ui/*` | `packages/ui/src/*` |
