# Store Architecture

> Global client-side state for the POS application, powered by **Zustand** with the `persist` middleware.
> Stores are co-located inside their respective **feature folders** rather than a top-level `store/` directory.

---

## Philosophy

We keep stores **functional and minimal** (plain `(set, get) => …` creators) rather than using the heavier class-based action pattern. Each store lives inside the feature it belongs to:

| Store | Feature | Domain | Persistence |
|---|---|---|---|
| `useLanguageStore` | `features/language` | UI language (`EN` / `MY`) | `localStorage` — `rms_language` |
| `useWizardStore` | `features/wizard` | Repair-intake wizard progress | `localStorage` — `rms_wizard` |

Components subscribe via **selectors** so only the data they actually read triggers re-renders.

---

## `useLanguageStore`

**Location:** `src/features/language/language-store.ts`  
**Barrel:** `src/features/language/index.ts`

### Purpose
Tracks the active UI language and persists it across sessions.

### State

| Key | Type | Default |
|---|---|---|
| `language` | `"EN" \| "MY"` | `"EN"` |

### Actions

| Action | Signature | Description |
|---|---|---|
| `setLanguage` | `(lang: "EN" \| "MY") => void` | Switch language and persist to `localStorage` |

### Usage

```tsx
import { useLanguageStore } from "@/features/language"

function LanguageToggle() {
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)

  return <button onClick={() => setLanguage("MY")}>Switch to Malay</button>
}
```

---

## `useWizardStore`

**Location:** `src/features/wizard/wizard-store.ts`  
**Barrel:** `src/features/wizard/index.ts`

### Purpose
Manages the multi-step repair-intake wizard — current step index, accumulated form data, and a derived summary.

### State

| Key | Type | Default | Description |
|---|---|---|---|
| `currentStepIndex` | `number` | `0` | 0-based index into `WIZARD_STEPS` |
| `formData` | `Partial<Record<WizardStep, WizardFormData>>` | `{}` | Data keyed by step name |

### Actions

| Action | Signature | Description |
|---|---|---|
| `setStep` | `(index: number) => void` | Jump to a step (clamped to valid range) |
| `nextStep` | `() => void` | Advance one step |
| `prevStep` | `() => void` | Go back one step |
| `updateFormData` | `(step, data) => void` | Merge partial data into a step's bucket |
| `resetWizard` | `() => void` | Clear all progress and return to step 0 |

### Usage

```tsx
import { useWizardStore, WIZARD_STEPS } from "@/features/wizard"

function StepIndicator() {
  const index = useWizardStore((s) => s.currentStepIndex)

  return (
    <p>
      Step {index + 1} of {WIZARD_STEPS.length}
    </p>
  )
}
```

> **Selector rule:** Only select **primitive values** (numbers, strings, booleans) or stable function references from the store. Never select an object/array computed inside the store — it creates a new reference on every call and can trigger cascading re-renders or infinite loops.
>
> Shell components that need derived data (e.g., summary panels) should either:
> - Read static mock data directly (imported at module level)
> - Or derive values locally with `useMemo` subscribing only to the primitives they need

---

## Wizard Step Order

The canonical 6-step sequence is exported as `WIZARD_STEPS`:

1. `category` — Device category selection
2. `brand-model` — Brand and model selection
3. `issues` — Issue diagnosis
4. `parts` — Parts selection
5. `customer-tech` — Customer & technician assignment
6. `summary` — Review and submit

### Route Mapping

`WIZARD_STEP_ROUTES` maps each step to its TanStack Router path:

| Step | Route Path |
|---|---|
| `category` | `/select-category` |
| `brand-model` | `/select-brand-model` |
| `issues` | `/select-issues` |
| `parts` | `/select-parts` |
| `customer-tech` | `/customer-tech` |
| `summary` | `/repair-summary` |

Shell components (BottomNav, WizardBreadcrumb) derive the active step from the current URL (`useLocation().pathname`) rather than the store index. This keeps the UI and URL in sync and avoids selector anti-patterns.

---

## Persistence Strategy

Both stores use Zustand's `persist` middleware with a `partialize` option (on the wizard store) so we only serialize what is necessary:

- **`rms_language`** — The staff-selected language survives browser restarts.
- **`rms_wizard`** — Step index and form data survive accidental refreshes mid-intake. The derived summary is **not** persisted because it is rebuilt at runtime.

---

## Adding a New Store

1. Decide which **feature** owns the state.
2. Create `src/features/<feature>/<feature>-store.ts`.
3. Export `use<Domain>Store` with `create<State>()(...)`.
4. Re-export from `src/features/<feature>/index.ts`.
5. Document the store in this file.

Keep stores **small and focused**. If a slice starts needing 10+ fields, consider splitting it into two stores.

---

## Version

Current POS version: **v0.0.3**
