# Components — App Shell

> Application-shell components used across the wizard layout.

---

## `TopBar`

**File:** `src/components/top-bar.tsx`

The primary app header shown inside the wizard layout.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `outletName` | `string` | `"KL Branch"` | Read-only outlet badge text |
| `breadcrumb` | `React.ReactNode` | — | Rendered in the centre on `lg+`; omitted on mobile |

### Layout

Uses a responsive `grid-cols-12` on `lg+` for true-centre breadcrumb alignment:

- **Left** — `col-span-3`: Logo (non-interactive)
- **Centre** — `col-span-6`: Breadcrumb (hidden on `< lg`)
- **Right** — `col-span-3`: Outlet badge + Language toggle + Avatar

On mobile (`< lg`), the grid is disabled and the bar falls back to flex with `justify-between`.

### Usage

```tsx
import { TopBar } from "@/components/top-bar"
import { WizardBreadcrumb } from "@/components/wizard-breadcrumb"

<TopBar breadcrumb={<WizardBreadcrumb />} />
```

---

## `LanguageToggle`

**File:** `src/components/language-toggle.tsx`

Two-segment toggle that switches the UI language between English (`EN`) and Bahasa Malaysia (`MY`). The active segment uses the primary colour; the inactive segment is muted.

Persisted via `useLanguageStore` → `localStorage` (`rms_language`).

### Usage

```tsx
import { LanguageToggle } from "@/components/language-toggle"

<LanguageToggle />
```

---

## `AvatarPopover`

**File:** `src/components/avatar-popover.tsx`

Circular avatar button that opens a dropdown on tap/click.

### Dropdown Actions

| Action | Behaviour |
|---|---|
| **Switch staff member** | Redirects to `/select-staff`. Wizard state is preserved. |
| **Cancel intake** | Opens a confirmation dialog. On confirm, resets the wizard store and redirects to `/select-staff`. |

### Props

| Prop | Type | Default |
|---|---|---|
| `staffName` | `string` | `"Ahmad Faris"` |
| `branchName` | `string` | `"KL Branch"` |

### Usage

```tsx
import { AvatarPopover } from "@/components/avatar-popover"

<AvatarPopover staffName="Ahmad Faris" branchName="KL Branch" />
```

---

## `BottomNav`

**File:** `src/components/bottom-nav.tsx`

Sticky bottom navigation bar for the wizard. Derives step state from the current route URL.

### Props

| Prop | Type | Default |
|---|---|---|
| `className` | `string` | — |

### Actions

| Button | Behaviour |
|---|---|
| **Previous** | Navigates to the previous wizard route. Disabled on step 1. |
| **Continue** | Navigates to the next wizard route. On step 6, label becomes **"Create Job"**. |

### Usage

```tsx
import { BottomNav } from "@/components/bottom-nav"

<BottomNav />
```

---

## Version

Current POS version: **v0.0.4**
