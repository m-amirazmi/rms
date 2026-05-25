# Components — Wizard Shell

> Main layout wrapper for the repair-intake wizard.

---

## `WizardShell`

**File:** `src/components/wizard-shell.tsx`

### Props

| Prop | Type | Description |
|---|---|---|
| `desktopBreadcrumb` | `React.ReactNode` | Rendered in the top bar centre on `lg+` |
| `mobileBreadcrumb` | `React.ReactNode` | Rendered in a scrollable second row below the top bar on `< lg` |

### Responsive Breakdown

```
Desktop (lg+):
┌─────────────────────────────────────────────────────────────┐
│  [TopBar]                                    [badge][lang][👤] │
├──────────────────────────────────────────────┬──────────────┤
│                                              │              │
│  <Outlet />  (scrollable)                     │ SummaryPanel │
│                                              │ (persistent) │
│                                              │              │
├──────────────────────────────────────────────┴──────────────┤
│  [Previous]                              [Continue / Create] │
└─────────────────────────────────────────────────────────────┘

Tablet (md):
┌────────────────────────────────────────────┐
│  [TopBar]                       [badge][👤] │
├────────────────────────────────────────────┤
│  [SummaryBar — collapsible]                │
├────────────────────────────────────────────┤
│                                            │
│  <Outlet />                                │
│                                            │
├────────────────────────────────────────────┤
│  [Previous]              [Continue / Create]│
└────────────────────────────────────────────┘

Mobile (< md):
┌────────────────────────────────────────────┐
│  [TopBar]                       [badge][👤] │
├────────────────────────────────────────────┤
│  ← scrollable breadcrumb row →             │
├────────────────────────────────────────────┤
│                                            │
│  <Outlet />                                │
│                                            │
├────────────────────────────────────────────┤
│  [Previous]              [Continue / Create]│
├────────────────────────────────────────────┤
│  RM 561.00 · Step 4 of 6              [▲] │  ← SummaryPeek
└────────────────────────────────────────────┘
```

### Usage

```tsx
import { WizardShell } from "@/components/wizard-shell"
import { WizardBreadcrumb } from "@/components/wizard-breadcrumb"

<WizardShell
  desktopBreadcrumb={<WizardBreadcrumb />}
  mobileBreadcrumb={<WizardBreadcrumb />}
/>
```

---

## `routes/(wizard)/_layout.tsx`

**File:** `src/routes/(wizard)/_layout.tsx`

TanStack Router **pathless layout** (`_` prefix = no URL segment). It wraps every route inside `routes/(wizard)/`.

### Guards

- `beforeLoad` checks `localStorage` for `rms_staff_id`.
- If missing, throws `redirect({ to: "/select-staff" })`.

### Child Routes

| Route File | Full Path | Description |
|---|---|---|
| `_layout.select-category.tsx` | `/select-category` | Step 1: Category selection |
| `_layout.select-brand-model.tsx` | `/select-brand-model` | Step 2: Brand & model selection |
| `_layout.select-issues.tsx` | `/select-issues` | Step 3: Issue diagnosis |
| `_layout.select-parts.tsx` | `/select-parts` | Step 4: Parts selection |
| `_layout.customer-tech.tsx` | `/customer-tech` | Step 5: Customer & technician |
| `_layout.repair-summary.tsx` | `/repair-summary` | Step 6: Review & submit |

### Adding a New Wizard Step

1. Create `src/routes/(wizard)/<step-name>.tsx`.
2. Export a thin `createFileRoute` wrapper that imports the page from `src/features/<step>/`.
3. The `_layout.tsx` shell will automatically wrap it.

---

## Version

Current POS version: **v0.0.3**
