# Design Guide

> AI reference for building UI consistently with this design system.

---

## Typography

| Role | Font |
|---|---|
| Body / UI | `Inter Variable` (`--font-sans`) |
| Headings / Display | `Nunito Sans Variable` (`--font-heading`) |

---

## Color Tokens

Use these CSS variables. Never hardcode raw color values.

### Light Mode (`:root`)

| Token | Value | Usage |
|---|---|---|
| `--background` | `oklch(0.96 0.003 325.6)` | Page background (soft warm off-white) |
| `--foreground` | `oklch(0.145 0.008 326)` | Primary text |
| `--card` | `oklch(1 0 0)` | Card / surface backgrounds |
| `--card-foreground` | `oklch(0.145 0.008 326)` | Text on cards |
| `--popover` | `oklch(1 0 0)` | Popover / dropdown backgrounds |
| `--popover-foreground` | `oklch(0.145 0.008 326)` | Text in popovers |
| `--primary` | `oklch(0.5 0.134 242.749)` | Primary actions, buttons, links (blue) |
| `--primary-foreground` | `oklch(0.977 0.013 236.62)` | Text on primary elements |
| `--secondary` | `oklch(0.967 0.001 286.375)` | Secondary buttons / surfaces |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)` | Text on secondary elements |
| `--muted` | `oklch(0.96 0.003 325.6)` | Subtle backgrounds, disabled states |
| `--muted-foreground` | `oklch(0.542 0.034 322.5)` | Placeholder text, helper text |
| `--accent` | `oklch(0.96 0.003 325.6)` | Hover highlights, accent surfaces |
| `--accent-foreground` | `oklch(0.212 0.019 322.12)` | Text on accent elements |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Errors, delete actions (red) |
| `--border` | `oklch(0.922 0.005 325.62)` | Dividers, input borders |
| `--input` | `oklch(0.922 0.005 325.62)` | Input field borders |
| `--ring` | `oklch(0.711 0.019 323.02)` | Focus rings |

### Dark Mode (`.dark`)

| Token | Value | Usage |
|---|---|---|
| `--background` | `oklch(0.145 0.008 326)` | Page background (deep warm dark) |
| `--foreground` | `oklch(0.985 0 0)` | Primary text |
| `--card` | `oklch(0.212 0.019 322.12)` | Card surfaces |
| `--card-foreground` | `oklch(0.985 0 0)` | Text on cards |
| `--popover` | `oklch(0.212 0.019 322.12)` | Popover backgrounds |
| `--popover-foreground` | `oklch(0.985 0 0)` | Text in popovers |
| `--primary` | `oklch(0.443 0.11 240.79)` | Primary actions (muted blue) |
| `--primary-foreground` | `oklch(0.977 0.013 236.62)` | Text on primary |
| `--secondary` | `oklch(0.274 0.006 286.033)` | Secondary surfaces |
| `--secondary-foreground` | `oklch(0.985 0 0)` | Text on secondary |
| `--muted` | `oklch(0.263 0.024 320.12)` | Subtle backgrounds |
| `--muted-foreground` | `oklch(0.711 0.019 323.02)` | Placeholder / helper text |
| `--accent` | `oklch(0.263 0.024 320.12)` | Hover / accent surfaces |
| `--accent-foreground` | `oklch(0.985 0 0)` | Text on accents |
| `--destructive` | `oklch(0.704 0.191 22.216)` | Errors (brighter red for dark bg) |
| `--border` | `oklch(1 0 0 / 10%)` | Subtle white-alpha borders |
| `--input` | `oklch(1 0 0 / 15%)` | Input borders |
| `--ring` | `oklch(0.542 0.034 322.5)` | Focus rings |

---

## Sidebar Tokens

Sidebar has its own token set. Always use these for sidebar elements — never bleed page tokens in.

### Light

| Token | Usage |
|---|---|
| `--sidebar` | Sidebar background (`oklch(0.985 0 0)`) |
| `--sidebar-foreground` | Sidebar text |
| `--sidebar-primary` | Active nav item highlight (blue `oklch(0.588 0.158 241.966)`) |
| `--sidebar-primary-foreground` | Text on active item |
| `--sidebar-accent` | Hover state on nav items |
| `--sidebar-accent-foreground` | Text on hover state |
| `--sidebar-border` | Sidebar dividers |
| `--sidebar-ring` | Sidebar focus ring |

### Dark

| Token | Usage |
|---|---|
| `--sidebar` | `oklch(0.212 0.019 322.12)` — matches card tone |
| `--sidebar-primary` | `oklch(0.685 0.169 237.323)` — bright blue |
| `--sidebar-primary-foreground` | `oklch(0.293 0.066 243.157)` — dark blue text |

---

## Chart / Data Viz Palette

A warm yellow-to-amber scale. Use in order for sequential data; mix for categorical.

| Token | Value | Approximate Tone |
|---|---|---|
| `--chart-1` | `oklch(0.905 0.182 98.111)` | Bright yellow |
| `--chart-2` | `oklch(0.795 0.184 86.047)` | Yellow-amber |
| `--chart-3` | `oklch(0.681 0.162 75.834)` | Amber |
| `--chart-4` | `oklch(0.554 0.135 66.442)` | Deep amber |
| `--chart-5` | `oklch(0.476 0.114 61.907)` | Dark amber-brown |

> Same palette in both light and dark modes — these are intentionally consistent.

---

## Border Radius Scale

All values derive from the base `--radius: 0.625rem`.

| Token | Multiplier | Computed Value | Use For |
|---|---|---|---|
| `--radius-sm` | × 0.6 | `0.375rem` | Badges, tags, chips |
| `--radius-md` | × 0.8 | `0.5rem` | Inputs, small buttons |
| `--radius-lg` | × 1.0 | `0.625rem` | Cards, buttons (default) |
| `--radius-xl` | × 1.4 | `0.875rem` | Dialogs, larger cards |
| `--radius-2xl` | × 1.8 | `1.125rem` | Modals, panels |
| `--radius-3xl` | × 2.2 | `1.375rem` | Large feature cards |
| `--radius-4xl` | × 2.6 | `1.625rem` | Hero sections, banners |

---

## Base Rules

```css
/* Applied globally via @layer base */
* {
  border-color: var(--border);
  outline-color: color-mix(in oklch, var(--ring) 50%, transparent);
}

body {
  background-color: var(--background);
  color: var(--foreground);
}

button:not(:disabled),
[role="button"]:not(:disabled) {
  cursor: pointer;
}
```

---

## Palette Character & Tone

This theme has a **warm-neutral** personality with **cool blue** primary actions.

- **Background tint**: Very subtle warm-pink/mauve hue (hue ~325–326). Not pure white or grey.
- **Primary accent**: Steel blue (hue ~242). Clean, trustworthy, professional.
- **Dark mode**: Warm dark backgrounds (not cold grey), maintaining the mauve hue consistency.
- **Charts**: Warm amber/yellow — good contrast on both light and dark surfaces.

**Mood**: Clean enterprise SaaS with a human, slightly warm edge. Not cold or sterile.

---

## Do's and Don'ts

**Do:**
- Always reference tokens by CSS variable name, not raw values
- Use `--muted-foreground` for secondary/helper text
- Use `--destructive` for all error, delete, and danger states
- Respect the sidebar token namespace for sidebar-specific UI
- Use `font-sans` for body/UI copy, `font-heading` for titles and display text

**Don't:**
- Don't hardcode any colors or border-radius values
- Don't mix sidebar tokens into main content areas
- Don't use chart colors for UI state (they're for data only)
- Don't use `--muted` as a general-purpose grey — it carries a warm tint
