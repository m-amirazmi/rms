# Shared UI Components — Reference

> Living inventory of `@workspace/ui` primitives, their APIs, and usage patterns.

---

## Philosophy

All components follow the same conventions:

- **Radix UI** primitives for accessibility, focus management, and keyboard handling.
- **`cn()`** from `@workspace/ui/lib/utils` for class merging.
- **`data-slot`** attributes on every root element for Tailwind parent/peer selectors.
- **No hardcoded colors** — only CSS variable tokens (`bg-primary`, `text-muted-foreground`, etc.).
- **No hardcoded radius** — derive from `--radius` scale (`rounded-sm`, `rounded-xl`, etc.).

---

## Existing Components

| Component | Location | Radix Primitive | Notes |
|---|---|---|---|
| Avatar | `components/avatar.tsx` | `AvatarPrimitive` | Sizes, fallback, badge, group |
| Badge | `components/badge.tsx` | — | CVA variants, `asChild` support |
| Breadcrumb | `components/breadcrumb.tsx` | — | Phosphor Icons (`CaretRight`, `DotsThree`) |
| Button | `components/button.tsx` | — | CVA variants + sizes, `asChild`, uppercase |
| Card | `components/card.tsx` | — | Header, Title, Description, Action, Content, Footer |
| Dialog | `components/dialog.tsx` | `DialogPrimitive` | Overlay, Content, Header, Footer, Title, Description |
| Input | `components/input.tsx` | — | Bottom-border style, `aria-invalid` support |
| Label | `components/label.tsx` | `LabelPrimitive` | Uppercase, tracking-wide |
| Popover | `components/popover.tsx` | `PopoverPrimitive` | Trigger + Content with animations |
| Separator | `components/separator.tsx` | `SeparatorPrimitive` | Horizontal / vertical |
| Switch | `components/switch.tsx` | `SwitchPrimitive` | Sizes, data-checked/unchecked |

---

## Popover

### Exports

- `Popover` — Root wrapper (manages open state)
- `PopoverTrigger` — The element that toggles the popover
- `PopoverContent` — The floating panel

### Usage

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@workspace/ui/components/popover"
import { Button } from "@workspace/ui/components/button"

<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent className="w-56">
    <p>Popover content here</p>
  </PopoverContent>
</Popover>
```

### Styling Notes

- Default width: `w-72`
- Background: `bg-popover`
- Border: `border border-border`
- Radius: `rounded-xl`
- Shadow: `shadow-md`
- Animations: `data-[state=open]:animate-in`, `data-[state=closed]:animate-out`, etc.

---

## Dialog

### Exports

- `Dialog` — Root wrapper
- `DialogTrigger` — Opens the dialog
- `DialogContent` — Modal surface (centers itself, includes overlay + portal automatically)
- `DialogHeader` — Title + description container
- `DialogFooter` — Action button row (reverses on mobile)
- `DialogTitle` — Accessible heading
- `DialogDescription` — Accessible description
- `DialogClose` — Closes the dialog on click
- `DialogPortal` / `DialogOverlay` — Advanced composition

### Usage

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"

<Dialog>
  <DialogTrigger asChild>
    <Button>Delete</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Styling Notes

- Max width: `max-w-lg`
- Background: `bg-card`
- Border: `border border-border`
- Radius: `rounded-xl`
- Overlay: `bg-black/50` with fade animation
- Content slides + zooms in from center

---

## Adding a New Primitive

1. Check if the Radix primitive exists in `radix-ui`.
2. Create `packages/ui/src/components/<primitive>.tsx`.
3. Wrap the Radix component, apply `data-slot`, use `cn()` for class merging.
4. Export named sub-components (e.g., `Dialog`, `DialogContent`, `DialogTitle`).
5. Run `bun run typecheck` in `packages/ui`.
6. Document here.

---

## Version

Current `@workspace/ui` version: **v0.0.0**
