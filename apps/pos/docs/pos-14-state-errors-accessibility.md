---
title: "POS Portal — Wizard State, Errors & Accessibility"
description: "Wizard state management model, error and empty states, discard confirmation dialog, and touch/accessibility guidelines."
feature_id: "pos-14"
related_specs:
  - "pos-03-app-shell.md"
  - "pos-04-navigation.md"
  - "pos-05-step1-category.md"
  - "pos-06-step2-brand-model.md"
  - "pos-07-step3-diagnostics.md"
  - "pos-08-step4-parts.md"
  - "pos-09-step5-customer-tech.md"
  - "pos-10-step6-confirm-create.md"
---

# Feature: Wizard State, Errors & Accessibility

> **Scope:** Wizard state management model, error and empty states, discard confirmation dialog, and touch/accessibility guidelines.

---

## Wizard State Management

```mermaid
classDiagram
    class WizardState {
        +string deviceId
        +string outletId
        +Staff createdBy
        +string deviceCategory
        +string deviceBrand
        +DeviceModel deviceModel
        +string[] diagnosticIssues
        +string diagnosticNotes
        +Part[] selectedParts
        +Technician assignedTechnician
        +Customer customer
        +reset()
        +persistToSession()
    }

    class Staff {
        +string id
        +string name
        +string avatarUrl
    }

    class DeviceModel {
        +string id
        +string name
        +string brand
        +string variant
        +boolean isManualEntry
    }

    class Part {
        +string id
        +string name
        +number quantity
        +number unitPrice
        +string compatibility
    }

    class Technician {
        +string id
        +string name
        +string role
        +string availability
        +number activeJobs
    }

    class Customer {
        +string id
        +string fullName
        +string phone
        +string email
        +boolean isNew
        +number previousRepairs
    }

    WizardState --> Staff
    WizardState --> DeviceModel
    WizardState --> Part
    WizardState --> Technician
    WizardState --> Customer
```

> Persist wizard state to `sessionStorage` on every step change so that an accidental page refresh on the kiosk or tablet does not lose a partially completed intake.

---

## Error & Empty States

```mermaid
flowchart TD
    A[User Action] --> B{Error Type}

    B -->|deviceSession invalid\nor revoked| Z[Redirect to Device\nRegistration Screen]
    B -->|Pairing code wrong\nor expired| Y[Inline error on\nRegistration Screen]
    B -->|Wrong staff PIN| X[Shake animation\nAttempt counter shown]
    B -->|Staff card locked| W[Locked state on card\n5 min cooldown shown]
    B -->|No category selected| C[Continue disabled\nAuto-advance not triggered]
    B -->|Device not in catalog| D[Show 'Can't find it?'\nManual entry fallback]
    B -->|Part out of stock| E[Disable Add button\n'Out of Stock' label on row]
    B -->|No technicians available| F[Show empty state in dropdown\nAllow proceed unassigned]
    B -->|Customer search empty| G['No results found'\nCreate New Customer as primary CTA]
    B -->|New customer save fails| H[Inline errors in drawer/sheet\nDrawer stays open]
    B -->|API submission fails| I[Inline error on Step 6\nWizard state fully preserved]
    B -->|Session timeout| J[Redirect to Staff Selector\nWizard state cleared]
```

---

## Discard Confirmation Dialog

Triggered by tapping **"Cancel Intake"** on any step, or any unhandled navigation-away.

```
  ┌──────────────────────────────────────────┐
  │   Discard Repair Intake?                 │
  │                                          │
  │   All entered information will be lost   │
  │   and cannot be recovered.               │
  │                                          │
  │   [ Keep Editing ]        [ Discard ]    │
  └──────────────────────────────────────────┘
```

| Action | Behaviour |
| --- | --- |
| Keep Editing | Closes dialog; returns to current step, state intact |
| Discard | Clears all wizard state; returns to Step 1 |

---

## Touch & Accessibility Guidelines

### Tap Targets

| Element | Minimum size |
| --- | --- |
| Category cards | 80px height |
| Brand tiles | 56px height |
| Issue shortcut cards | 72px height |
| Parts Add [+] button | 48×48px |
| Qty stepper [−] [+] | 44×44px |
| Customer cards | 64px height |
| Continue / Back | 52px height, full row |
| Technician list rows | 64px height |

### Keyboard Behaviour (Soft Keyboard on Mobile)

- When a search bar or text field is focused, the layout scrolls to keep the field visible above the soft keyboard
- Sticky action bar remains anchored above the keyboard, not behind it
- Summary peek bar on smartphone is hidden while keyboard is open to maximise space

### Other Touch Considerations

- No hover-dependent interactions anywhere in the flow
- All interactive elements have visible pressed/active states
- Swipe-left on a selected parts row reveals a delete affordance on tablet
- Drag-to-reorder is not required for parts in this version
