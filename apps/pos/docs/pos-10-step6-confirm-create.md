---
title: "POS Portal — Step 6: Confirm & Create"
description: "Wizard Step 6. Final invoice review, read-only summary, Create Repair Job CTA with duplicate prevention."
feature_id: "pos-10"
related_specs:
  - "pos-03-app-shell.md"
  - "pos-04-navigation.md"
  - "pos-09-step5-customer-tech.md"
  - "pos-12-job-confirmation.md"
  - "pos-14-state-errors-accessibility.md"
---

# Feature: Step 6 — Confirm & Create

> **Scope:** Wizard Step 6. Final invoice review, read-only summary, Create Repair Job CTA with duplicate prevention.

---

## Prerequisites

This step runs inside the [App Shell](pos-03-app-shell.md) and uses the [Navigation & Breadcrumb](pos-04-navigation.md) system. See [Wizard State Management](pos-14-state-errors-accessibility.md) for data model definitions.

---

## UI Layout

**Navigation:** Sticky action bar with Create Repair Job CTA

The summary panel has already shown all information progressively. Step 6 serves as the **full invoice view and point of no return** — staff turns the screen to the customer for sign-off before tapping Create.

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  [Logo]  ✓ > ✓ > 3 issues > 2 parts > ✓ > Summary  [KL Branch] [MY|EN] [👤]   │
├─────────────────────────────────────────────────────┬─────────────────────────────┤
│                                                      │  Repair Summary             │
│  Final Invoice                                       │  ─────────────────────────  │
│                                                      │                         │
│  ┌────────────────────────────────────────────────┐  │  Issues                 │
│  │ iPhone 16 Pro Screen       1×      RM 320.00   │  │  · Display/Screen       │
│  │ iPhone 16 Battery          1×       RM  85.00  │  │  · Battery              │
│  │ Labour Fee                          RM  80.00  │  │                         │
│  │ ──────────────────────────────────────────     │  │  Parts                  │
│  │ Subtotal                           RM 485.00   │  │  · Screen      $320     │
│  │ Tax (6% SST)                        RM  29.10  │  │  · Battery      $85     │
│  │ ──────────────────────────────────────────     │  │                         │
│  │ Grand Total                        RM 514.10   │  │  Tech     Hafiz Zain    │
│  └────────────────────────────────────────────────┘  │  Customer  Ali Evans    │
│                                                      │  ─────────────────────  │
│  [✕ Cancel]                                         │  Est. Total  RM 514.10  │
├─────────────────────────────────────────────────────┴─────────────────────────┤
│  [ ◀  Previous ]                         [ ✔  Create Repair Job ]             │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## UI Components

| Component | Description |
| --- | --- |
| Invoice table | Line items, labour, subtotal, tax, grand total |
| Create Repair Job | Primary CTA — full-width on mobile, right-aligned on tablet |

---

## Behaviour

- All content is read-only; editing requires navigating back
- **Create Repair Job** is disabled after first tap to prevent duplicate submission
- On success → navigate to Job Confirmation screen, show success toast
- On failure → inline error message displayed; wizard state fully preserved

---

## Wizard Context

```mermaid
flowchart LR
    BOOT(["Device Boot\n+ Session Check"])
    SS(["Staff Selector\nWho's serving?"])
    S1(["Step 1\nCategory"])
    S2(["Step 2\nBrand & Model"])
    S3(["Step 3\nDiagnostics"])
    S4(["Step 4\nParts"])
    S5(["Step 5\nCustomer &\nTechnician"])
    S6(["Step 6\nConfirm"])
    DONE(["✅ Job Created"])

    BOOT -->|Session valid| SS
    SS -->|Staff selected\n± PIN| S1
    S1 -->|Auto-advance\non selection| S2
    S2 -->|Auto-advance\non model tap| S3
    S3 -->|Tap Continue| S4
    S4 -->|Tap Continue| S5
    S5 -.->|New customer| NC(["Slide-over /\nBottom sheet"])
    NC -.->|Save & Assign| S5
    S5 -->|Tap Continue| S6
    S6 -->|Tap Create\nRepair Job| DONE
    DONE -->|New Repair Intake| SS
```
