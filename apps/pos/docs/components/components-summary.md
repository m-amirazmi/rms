# Components — Summary Panels

> Three responsive variants of the repair-intake summary panel.

---

## Philosophy

The summary information is rendered through **three mutually exclusive components** depending on the viewport width. Only one is visible at a time:

| Component | Breakpoint | Behaviour |
|---|---|---|
| `SummaryPanel` | `lg:` (1024px+) | Persistent right sidebar, always visible |
| `SummaryBar` | `md:` (768px–1023px) | Collapsible bar above content, tap to expand |
| `SummaryPeek` | `< md` (smartphone) | Sticky peek at bottom (above nav), tap to expand |

All three subscribe only to `currentStepIndex` (a stable primitive) for the step indicator, and render static mock data imported directly at the module level. They share an internal `SummaryContent` helper so the markup stays consistent.

---

## `SummaryPanel`

**File:** `src/components/summary-panel.tsx`

### Props

| Prop | Type | Default |
|---|---|---|
| `className` | `string` | — |

### Usage

```tsx
import { SummaryPanel } from "@/components/summary-panel"

<div className="flex">
  <main>Wizard content</main>
  <SummaryPanel />
</div>
```

---

## `SummaryBar`

**File:** `src/components/summary-panel.tsx`

### Props

| Prop | Type | Default |
|---|---|---|
| `className` | `string` | — |

### Usage

```tsx
import { SummaryBar } from "@/components/summary-panel"

<SummaryBar />
<main>Wizard content</main>
```

---

## `SummaryPeek`

**File:** `src/components/summary-panel.tsx`

### Props

| Prop | Type | Default |
|---|---|---|
| `className` | `string` | — |

### Usage

```tsx
import { SummaryPeek } from "@/components/summary-panel"

<main>Wizard content</main>
<SummaryPeek />
<BottomNav />
```

---

## Summary Data

All panels render the same mock data from the wizard store:

- **Device name** — e.g. `iPhone 16 Pro Max`
- **Issues** — count + list
- **Parts** — count + list
- **Total price** — e.g. `RM 561.00`
- **Step indicator** — e.g. `Step 4 of 6`

When real wizard steps start populating `formData`, the summary components will read from the store's `formData` field directly instead of using static mock data.

---

## Version

Current POS version: **v0.0.3**
