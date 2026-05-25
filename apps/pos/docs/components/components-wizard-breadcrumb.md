# Components — Wizard Breadcrumb

> Read-only step indicator for the repair-intake wizard.

---

## `WizardBreadcrumb`

**File:** `src/components/wizard-breadcrumb.tsx`

### Visual States

| State | Style | Icon |
|---|---|---|
| **Completed** | Muted + strikethrough text | `Check` icon |
| **Current** | Primary colour + bold | — |
| **Future** | Muted text | — |

Steps are separated by `CaretRight` icons.

### Props

| Prop | Type | Default |
|---|---|---|
| `className` | `string` | — |

### Usage

```tsx
import { WizardBreadcrumb } from "@/components/wizard-breadcrumb"

// Desktop — centred in top bar
<TopBar breadcrumb={<WizardBreadcrumb />} />

// Mobile — scrollable second row
<div className="overflow-x-auto">
  <WizardBreadcrumb />
</div>
```

### Step Labels

| Key | Display |
|---|---|
| `category` | Category |
| `brand-model` | Brand & Model |
| `issues` | Issues |
| `parts` | Parts |
| `customer-tech` | Customer & Tech |
| `summary` | Summary |

### Route-Aware Derivation

The breadcrumb derives its active step from `useLocation().pathname` rather than `useWizardStore((s) => s.currentStepIndex)`. This ensures the UI always reflects the current URL even when the user navigates directly to a route or uses the browser back button.

### Future Work

Once all wizard steps are implemented, completed steps may become **clickable** to allow jumping back to earlier steps. For now, the breadcrumb is **read-only** to avoid incomplete navigation logic.

---

## Version

Current POS version: **v0.0.4**
