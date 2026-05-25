---
title: "POS Portal — Step 1: Device Category"
description: "Wizard Step 1. Device category selection via tappable icon cards with auto-advance and inspection fee notice."
feature_id: "pos-05"
related_specs:
  - "pos-03-app-shell.md"
  - "pos-04-navigation.md"
  - "pos-06-step2-brand-model.md"
  - "pos-14-state-errors-accessibility.md"
---

# Feature: Step 1 — Device Category

> **Scope:** Wizard Step 1. Device category selection via tappable icon cards with auto-advance and inspection fee notice.

---

## Prerequisites

This step runs inside the [App Shell](pos-03-app-shell.md) and uses the [Navigation & Breadcrumb](pos-04-navigation.md) system. See [Wizard State Management](pos-14-state-errors-accessibility.md) for data model definitions.

---

## UI Layout

**Navigation:** Auto-advance on card tap

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  [Logo]  Category > Brand > Model > Diagnostic > Parts > Customer & Tech > Summary  [KL Branch] [MY|EN] [👤] │
├────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────┤
│                                                                                │  Repair Summary             │
│                             New Repair Intake                                  │  ─────────────────────────  │
│                      Select the device type to get started                     │  Parts                   —  │
│                                                                                │  Tech                    —  │
│                   ┌───────────┐  ┌───────────┐  ┌───────────┐                  │  Customer                —  │
│                   │   [icon]  │  │   [icon]  │  │   [icon]  │                  │  ─────────────────────────  │
│                   │Smartphone │  │  Laptop   │  │  Tablet   │                  │  Est. Total              —  │
│                   └───────────┘  └───────────┘  └───────────┘                  │                             │
│                   ┌───────────┐  ┌───────────┐  ┌───────────┐                  │                             │
│                   │   [icon]  │  │   [icon]  │  │   [icon]  │                  │                             │
│                   │ Wearable  │  │  Console  │  │   Other   │                  │                             │
│                   └───────────┘  └───────────┘  └───────────┘                  │                             │
│                                                                                │                             │
│                 ┌──────────────────────────────────────────────┐               │                             │
│                 │ ⚠  Standard Inspection Fee applies to all    │               │                             │
│                 │    new intakes. Reflected in final estimate. │               │                             │
│                 └──────────────────────────────────────────────┘               │                             │
│                                                                                │                             │
│  [✕ Cancel Intake]                                                             │                             │
└────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────┘
```

---

## UI Components

| Component | Description |
| --- | --- |
| Category grid | 6 tappable icon cards in a 3×2 layout; min 80px height per card |
| Card states | Default / Pressed / Selected (highlighted border + tint) |
| Inspection Fee banner | Dismissible info banner |
| Cancel Intake | Ghost button, always visible, triggers discard confirmation dialog |

---

## Behaviour

- Single selection only; tapping another card deselects the previous
- On tap → card highlights → undo toast → auto-advance after 3s
- No Continue button on this step

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
