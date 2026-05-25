# POS UI Style Guide

> Reference for building consistent UI across all POS features.
> Theme: "Sharper Pop" — fresh, sharp, vibrant. Mint-green background with indigo primary, teal secondary, and amber accents.

---

## Layout Patterns

### Centered Card (Auth / Setup Screens)

Use this pattern for full-screen setup, auth, and onboarding flows.

```tsx
<div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-background p-4">
  <Card className="w-full max-w-md rounded-xl border border-foreground">
    {/* Card content */}
  </Card>
  <p className="text-sm text-muted-foreground">
    {/* Helper / footer text */}
  </p>
</div>
```

| Token | Value | Usage |
|-------|-------|-------|
| `bg-background` | Mint-green (`oklch(0.9789 0.0082 121.6272)`) | Page background |
| `gap-6` | `1.5rem` | Spacing between card and footer text |
| `p-4` | `1rem` | Page padding |
| `max-w-md` | `28rem` | Card max width |
| `rounded-xl` | `calc(var(--radius) * 1.4)` | Card corner radius |
| `border-foreground` | Black (`oklch(0 0 0)`) | Card border color |

---

## Card Component Conventions

All cards should use these consistent properties:

- **Border:** `border border-foreground` (1px solid black)
- **Radius:** `rounded-xl`
- **Width constraint:** `max-w-md` for single-column flows, `max-w-lg` or `max-w-xl` for wider layouts
- **Padding:** Rely on `<CardHeader>`, `<CardContent>`, `<CardFooter>` for internal spacing
- **Alignment:** Center-align headers and descriptions on auth/setup screens

```tsx
<Card className="w-full max-w-md rounded-xl border border-foreground">
  <CardHeader className="text-center">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col items-center gap-6">
    {/* Form or content */}
  </CardContent>
</Card>
```

---

## Form Input Patterns

### PIN / OTP Digit Boxes

For 6-digit codes, split into two groups of 3.

```tsx
<div className="flex items-center gap-2">
  {[0, 1, 2].map((i) => (
    <Input
      key={i}
      type="text"
      inputMode="numeric"
      maxLength={1}
      className="h-14 w-12 text-center font-mono disabled:opacity-50 md:text-2xl"
      aria-label={`Digit ${i + 1} of 6`}
    />
  ))}
  <span className="font-mono text-2xl text-muted-foreground select-none">
    —
  </span>
  {[3, 4, 5].map((i) => (
    <Input
      key={i}
      type="text"
      inputMode="numeric"
      maxLength={1}
      className="h-14 w-12 text-center font-mono disabled:opacity-50 md:text-2xl"
      aria-label={`Digit ${i + 1} of 6`}
    />
  ))}
</div>
```

| Property | Value | Rationale |
|----------|-------|-----------|
| `h-14 w-12` | `3.5rem × 3rem` | Touch-friendly for tablet/kiosk use |
| `font-mono` | Space Mono | Consistent digit width, prevents layout shift |
| `text-center` | centered | Visual balance |
| `md:text-2xl` | `1.5rem` at medium+ breakpoints | Readable on tablets, smaller on phones |
| `disabled:opacity-50` | 50% opacity | Clear loading state |
| `inputMode="numeric"` | numeric keypad | Mobile/tablet keyboard optimization |
| `maxLength={1}` | 1 char | Force single-digit per box |
| Group separator | em-dash `—` | Visual grouping `XXX—XXX` |

---

## Typography

| Role | Tailwind Class | Token | Usage |
|------|----------------|-------|-------|
| Page title | `font-heading text-lg font-semibold tracking-wider uppercase` | Nunito Sans | `<CardTitle>` inside centered cards |
| Description | `text-sm leading-relaxed text-muted-foreground` | DM Sans | `<CardDescription>` |
| Body text | `text-sm` or `text-base` | DM Sans | General content |
| Monospace / digits | `font-mono` | Space Mono | PINs, codes, IDs, prices |
| Footer / helper | `text-sm text-muted-foreground` | DM Sans | Below-card helper text |

---

## Color Tokens

**Never hardcode hex/rgb/hsl values.** Always use CSS variables via Tailwind classes.

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `bg-background` | Mint `#f7f9f3` | Black `#000000` | Page background |
| `bg-card` | White `#ffffff` | Dark gray | Card surfaces |
| `text-foreground` | Black | White | Primary text |
| `text-muted-foreground` | Dark gray | Light gray | Secondary / helper text |
| `text-primary` | Indigo `#4f46e5` | Lighter indigo | Active states, loader text |
| `text-destructive` | Red `#ef4444` | Lighter red | Error messages |
| `border-foreground` | Black | Light gray | Card borders |
| `border-input` | Gray `#737373` | White | Input underlines |

---

## Spacing & Sizing

| Context | Tailwind | Value |
|---------|----------|-------|
| Page padding | `p-4` | `1rem` |
| Card internal gap | `gap-6` inside `<CardContent>` | `1.5rem` |
| Between card and footer | `gap-6` on outer flex | `1.5rem` |
| Input box gap | `gap-2` | `0.5rem` |
| Section gap in forms | `gap-6` | `1.5rem` |

---

## Form Validation & Error Patterns

### React Hook Form + Zod Setup

```tsx
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const Schema = z.object({
  fieldName: z.string().min(1, { message: "Required" }),
})

type FormInput = z.infer<typeof Schema>

const form = useForm<FormInput>({
  resolver: zodResolver(Schema),
  defaultValues: { fieldName: "" },
  mode: "onSubmit",
})
```

### Error Display

- Show inline below the relevant input group
- Use `text-destructive` color
- Center-align on narrow cards (`text-center`)
- Limit width on wide errors (`max-w-xs`)

```tsx
{errors.fieldName && (
  <p className="max-w-xs text-center text-sm text-destructive">
    {errors.fieldName.message}
  </p>
)}
```

### Loading State

- Disable all inputs during async validation
- Show concise loader text in `text-primary`

```tsx
{isLoading && (
  <p className="text-sm font-medium text-primary">Validating…</p>
)}
```

### Auto-Clear Pattern

For PIN/code inputs with errors:
- Display error immediately
- Auto-clear after 4 seconds
- Reset field value and return focus to first input

```tsx
useEffect(() => {
  if (errors.pin) {
    const timer = setTimeout(() => {
      clearErrors("pin")
      setValue("pin", "")
      focusInput(0)
    }, 4000)
    return () => clearTimeout(timer)
  }
}, [errors.pin])
```

---

## Accessibility Rules

- Every input must have an `aria-label` describing its purpose
- Error states use `aria-invalid` on inputs
- Use `inputMode="numeric"` for digit inputs (triggers correct mobile keyboard)
- Respect `prefers-reduced-motion` where animations are added
- Maintain focus management (auto-focus first field, return focus on error)

---

## Component Import Conventions

```tsx
// shadcn/ui components from workspace
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

// Form libraries
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Router
import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router"
```

---

## File Organization

### Route Files (Thin Wrappers)

Route files under `src/routes/` contain **only** TanStack Router wiring. All business logic lives in `src/features/`.

```tsx
// src/routes/(auth)/select-staff.tsx
import { createFileRoute } from "@tanstack/react-router"
import { SelectStaffPage } from "@/features/select-staff"

export const Route = createFileRoute("/(auth)/select-staff")({
  component: SelectStaffPage,
})
```

### Feature Modules

See `frontend-architecture.md` for the full feature module convention.

```
src/features/<feature>/
  index.ts          # Barrel export
  types.ts          # Interfaces
  constants.ts      # Mock data
  schemas.ts        # Zod schemas
  api.ts            # Async functions
  utils.ts          # Pure helpers
  components/
    <feature>-page.tsx
    ...
```

---

## Version

Current POS version: **v0.0.2**
