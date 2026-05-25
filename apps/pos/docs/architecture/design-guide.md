# Design Guide

> AI reference for building UI consistently with this design system.
> **Theme:** "Sharper Pop" by Muhamad Amir, published on [tweakcn.com](https://tweakcn.com/themes/cmkcjz6s0000104l574rqdux5).

---

## Typography

| Role | Font | Token |
|---|---|---|
| Body / UI | DM Sans | `--font-sans` |
| Headings / Display | Nunito Sans Variable | `--font-heading` |
| Monospace | Space Mono | `--font-mono` |

---

## Color Tokens

Use these CSS variables. Never hardcode raw color values.

### Light Mode (`:root`)

| Token | oklch Value | Approx. Hex | Usage |
|---|---|---|---|
| `--background` | `oklch(0.9789 0.0082 121.6272)` | `#f7f9f3` | Page background (soft mint-green) |
| `--foreground` | `oklch(0 0 0)` | `#000000` | Primary text |
| `--card` | `oklch(1.0000 0 0)` | `#ffffff` | Card / surface backgrounds |
| `--card-foreground` | `oklch(0 0 0)` | `#000000` | Text on cards |
| `--popover` | `oklch(1.0000 0 0)` | `#ffffff` | Popover / dropdown backgrounds |
| `--popover-foreground` | `oklch(0 0 0)` | `#000000` | Text in popovers |
| `--primary` | `oklch(0.5106 0.2301 276.9656)` | `#4f46e5` | Primary actions, buttons, links (indigo) |
| `--primary-foreground` | `oklch(1.0000 0 0)` | `#ffffff` | Text on primary elements |
| `--secondary` | `oklch(0.7038 0.1230 182.5025)` | `#14b8a6` | Secondary buttons / surfaces (teal) |
| `--secondary-foreground` | `oklch(1.0000 0 0)` | `#ffffff` | Text on secondary elements |
| `--muted` | `oklch(0.9551 0 0)` | `#f0f0f0` | Subtle backgrounds, disabled states |
| `--muted-foreground` | `oklch(0.3211 0 0)` | `#333333` | Placeholder text, helper text |
| `--accent` | `oklch(0.7686 0.1647 70.0804)` | `#f59e0b` | Hover highlights, accent surfaces (amber) |
| `--accent-foreground` | `oklch(0 0 0)` | `#000000` | Text on accent elements |
| `--destructive` | `oklch(0.6368 0.2078 25.3313)` | `#ef4444` | Errors, delete actions (red) |
| `--destructive-foreground` | `oklch(1.0000 0 0)` | `#ffffff` | Text on destructive elements |
| `--border` | `oklch(0 0 0)` | `#000000` | Dividers, input borders |
| `--input` | `oklch(0.5555 0 0)` | `#737373` | Input field borders |
| `--ring` | `oklch(0.7853 0.1041 274.7134)` | `#a5b4fc` | Focus rings |

### Dark Mode (`.dark`)

| Token | oklch Value | Approx. Hex | Usage |
|---|---|---|---|
| `--background` | `oklch(0 0 0)` | `#000000` | Page background (true black) |
| `--foreground` | `oklch(1.0000 0 0)` | `#ffffff` | Primary text |
| `--card` | `oklch(0.2455 0.0217 257.2823)` | `#1a212b` | Card surfaces (dark navy) |
| `--card-foreground` | `oklch(1.0000 0 0)` | `#ffffff` | Text on cards |
| `--popover` | `oklch(0.2455 0.0217 257.2823)` | `#1a212b` | Popover backgrounds |
| `--popover-foreground` | `oklch(1.0000 0 0)` | `#ffffff` | Text in popovers |
| `--primary` | `oklch(0.6801 0.1583 276.9349)` | `#818cf8` | Primary actions (light indigo) |
| `--primary-foreground` | `oklch(0 0 0)` | `#000000` | Text on primary |
| `--secondary` | `oklch(0.7845 0.1325 181.9120)` | `#2dd4bf` | Secondary surfaces (light teal) |
| `--secondary-foreground` | `oklch(0 0 0)` | `#000000` | Text on secondary |
| `--muted` | `oklch(0.3211 0 0)` | `#333333` | Subtle backgrounds |
| `--muted-foreground` | `oklch(0.8452 0 0)` | `#cccccc` | Placeholder / helper text |
| `--accent` | `oklch(0.8790 0.1534 91.6054)` | `#fcd34d` | Hover / accent surfaces (light amber) |
| `--accent-foreground` | `oklch(0 0 0)` | `#000000` | Text on accents |
| `--destructive` | `oklch(0.7106 0.1661 22.2162)` | `#f87171` | Errors (light red) |
| `--destructive-foreground` | `oklch(0 0 0)` | `#000000` | Text on destructive |
| `--border` | `oklch(0.4459 0 0)` | `#545454` | Subtle borders |
| `--input` | `oklch(1.0000 0 0)` | `#ffffff` | Input borders |
| `--ring` | `oklch(0.6801 0.1583 276.9349)` | `#818cf8` | Focus rings |

---

## Sidebar Tokens

Sidebar has its own token set. Always use these for sidebar elements — never bleed page tokens in.

### Light

| Token | Value | Usage |
|---|---|---|
| `--sidebar` | `oklch(0.9789 0.0082 121.6272)` | Sidebar background (mint-green) |
| `--sidebar-foreground` | `oklch(0 0 0)` | Sidebar text |
| `--sidebar-primary` | `oklch(0.5106 0.2301 276.9656)` | Active nav item highlight (indigo) |
| `--sidebar-primary-foreground` | `oklch(1.0000 0 0)` | Text on active item |
| `--sidebar-accent` | `oklch(0.7686 0.1647 70.0804)` | Hover state on nav items (amber) |
| `--sidebar-accent-foreground` | `oklch(0 0 0)` | Text on hover state |
| `--sidebar-border` | `oklch(0 0 0)` | Sidebar dividers |
| `--sidebar-ring` | `oklch(0.7853 0.1041 274.7134)` | Sidebar focus ring |

### Dark

| Token | Value | Usage |
|---|---|---|
| `--sidebar` | `oklch(0 0 0)` | Sidebar background (black) |
| `--sidebar-foreground` | `oklch(1.0000 0 0)` | Sidebar text (white) |
| `--sidebar-primary` | `oklch(0.6801 0.1583 276.9349)` | Active nav item (light indigo) |
| `--sidebar-primary-foreground` | `oklch(1.0000 0 0)` | Text on active item (white) |
| `--sidebar-accent` | `oklch(0.8790 0.1534 91.6054)` | Hover state (light amber) |
| `--sidebar-accent-foreground` | `oklch(0 0 0)` | Text on hover (black) |
| `--sidebar-border` | `oklch(1.0000 0 0)` | Sidebar dividers (white) |
| `--sidebar-ring` | `oklch(0.6801 0.1583 276.9349)` | Sidebar focus ring (light indigo) |

---

## Chart / Data Viz Palette

A vibrant categorical scale spanning indigo, teal, amber, pink, and green. Use in order for sequential data; mix for categorical.

### Light Mode

| Token | Value | Approx. Hex | Tone |
|---|---|---|---|
| `--chart-1` | `oklch(0.5106 0.2301 276.9656)` | `#4f46e5` | Indigo |
| `--chart-2` | `oklch(0.7038 0.1230 182.5025)` | `#14b8a6` | Teal |
| `--chart-3` | `oklch(0.7686 0.1647 70.0804)` | `#f59e0b` | Amber |
| `--chart-4` | `oklch(0.6559 0.2118 354.3084)` | `#ec4899` | Pink |
| `--chart-5` | `oklch(0.7227 0.1920 149.5793)` | `#22c55e` | Green |

### Dark Mode

| Token | Value | Approx. Hex | Tone |
|---|---|---|---|
| `--chart-1` | `oklch(0.6801 0.1583 276.9349)` | `#818cf8` | Light indigo |
| `--chart-2` | `oklch(0.7845 0.1325 181.9120)` | `#2dd4bf` | Light teal |
| `--chart-3` | `oklch(0.8790 0.1534 91.6054)` | `#fcd34d` | Light amber |
| `--chart-4` | `oklch(0.7253 0.1752 349.7607)` | `#f472b6` | Light pink |
| `--chart-5` | `oklch(0.8003 0.1821 151.7110)` | `#4ade80` | Light green |

> Dark-mode charts are brighter to maintain contrast against dark backgrounds.

---

## Shadow Tokens

All values derive from `--shadow-color: #1a1a1a`, `--shadow-opacity: 0.05`, and zero-offset hard shadows.

| Token | Value |
|---|---|
| `--shadow-2xs` | `0px 0px 0px 0px hsl(0 0% 10.1961% / 0.03)` |
| `--shadow-xs` | `0px 0px 0px 0px hsl(0 0% 10.1961% / 0.03)` |
| `--shadow-sm` | `0px 0px 0px 0px hsl(0 0% 10.1961% / 0.05), 0px 1px 2px -1px hsl(0 0% 10.1961% / 0.05)` |
| `--shadow` | Same as `--shadow-sm` |
| `--shadow-md` | `0px 0px 0px 0px hsl(0 0% 10.1961% / 0.05), 0px 2px 4px -1px hsl(0 0% 10.1961% / 0.05)` |
| `--shadow-lg` | `0px 0px 0px 0px hsl(0 0% 10.1961% / 0.05), 0px 4px 6px -1px hsl(0 0% 10.1961% / 0.05)` |
| `--shadow-xl` | `0px 0px 0px 0px hsl(0 0% 10.1961% / 0.05), 0px 8px 10px -1px hsl(0 0% 10.1961% / 0.05)` |
| `--shadow-2xl` | `0px 0px 0px 0px hsl(0 0% 10.1961% / 0.13)` |

> Shadows are intentionally flat and sharp, matching the "Sharper Pop" aesthetic. Use Tailwind's `shadow-sm`, `shadow-md`, etc.

---

## Border Radius Scale

All values derive from the base `--radius: 0.5rem`.

| Token | Multiplier | Computed Value | Use For |
|---|---|---|---|
| `--radius-sm` | × 0.6 | `0.3rem` | Badges, tags, chips |
| `--radius-md` | × 0.8 | `0.4rem` | Inputs, small buttons |
| `--radius-lg` | × 1.0 | `0.5rem` | Cards, buttons (default) |
| `--radius-xl` | × 1.4 | `0.7rem` | Dialogs, larger cards |
| `--radius-2xl` | × 1.8 | `0.9rem` | Modals, panels |
| `--radius-3xl` | × 2.2 | `1.1rem` | Large feature cards |
| `--radius-4xl` | × 2.6 | `1.3rem` | Hero sections, banners |

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
  letter-spacing: var(--tracking-normal);
}

button:not(:disabled),
[role="button"]:not(:disabled) {
  cursor: pointer;
}
```

---

## Palette Character & Tone

This theme has a **sharp, fresh, and vibrant** personality.

- **Background tint**: Mint-green (hue ~121) in light mode, true black in dark mode. Clean and energetic.
- **Primary accent**: Bold indigo (hue ~276). Modern, trustworthy, high-contrast.
- **Secondary accent**: Teal (hue ~182). Fresh, tech-forward complement to indigo.
- **Tertiary accent**: Amber (hue ~70). Warm and attention-grabbing — used for highlights, hover states, and secondary actions.
- **Dark mode**: True black backgrounds with navy cards. Accents become brighter to maintain vividness and readability.
- **Charts**: A vibrant categorical palette — indigo, teal, amber, pink, green — for maximum visual distinction.

**Mood**: Energetic, modern, and precise. Think startup dashboard or creative SaaS — not corporate sterile, not playful chaos.

---

## Do's and Don'ts

**Do:**
- Always reference tokens by CSS variable name, not raw values
- Use `--muted-foreground` for secondary/helper text
- Use `--destructive` for all error, delete, and danger states
- Respect the sidebar token namespace for sidebar-specific UI
- Use `font-sans` for body/UI copy, `font-heading` for titles and display text
- Use flat shadows (`shadow-sm`, `shadow-md`) — never heavy drop shadows

**Don't:**
- Don't hardcode any colors or border-radius values
- Don't mix sidebar tokens into main content areas
- Don't use chart colors for UI state (they're for data only)
- Don't use `--muted` as a general-purpose grey — it carries a tint
- Don't introduce new hues outside the defined palette (indigo, teal, amber, red)
