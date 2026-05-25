---
title: "POS Portal — New Customer Flow"
description: "Slide-over drawer (tablet) and bottom sheet (smartphone) for creating a new customer during Step 5."
feature_id: "pos-11"
related_specs:
  - "pos-03-app-shell.md"
  - "pos-09-step5-customer-tech.md"
  - "pos-14-state-errors-accessibility.md"
---

# Feature: New Customer Flow

> **Scope:** Slide-over drawer (tablet) and bottom sheet (smartphone) for creating a new customer during Step 5.

---

## Prerequisites

Triggered by tapping **"+ Create New Customer"** on [Step 5](pos-09-step5-customer-tech.md).

---

## Tablet — Slide-over Drawer

A panel slides in from the right, temporarily replacing the summary panel. Wizard content stays visible but dimmed. On save, drawer closes, new customer is auto-assigned, and the summary panel returns with the customer name populated.

```
┌─────────────────────────────────────────────────────┬──────────────────────────┐
│  Step 5 content                                      │  ✕  New Customer         │
│  (dimmed, non-interactive)                           │  ──────────────────────  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  Full Name               │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  [ __________________ ]  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │                          │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  Phone                   │
│                                                      │  [ __________________ ]  │
│                                                      │                          │
│                                                      │  Email                   │
│                                                      │  [ __________________ ]  │
│                                                      │                          │
│                                                      │  Notes                   │
│                                                      │  [ __________________ ]  │
│                                                      │                          │
│                                                      │  [ Cancel ]  [ Save ✔ ]  │
└─────────────────────────────────────────────────────┴──────────────────────────┘
```

---

## Smartphone — Bottom Sheet

Sheet slides up from the bottom, covering the lower half of the screen. Background dims. Dismissible by tapping outside or the × button.

```
┌─────────────────────────────────┐
│  (Step 5 dimmed behind sheet)   │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
├─────────────────────────────────┤
│  ╌╌╌  New Customer          ✕  │  ← bottom sheet handle
│  ─────────────────────────────  │
│  Full Name  [ ________________] │
│  Phone      [ ________________] │
│  Email      [ ________________] │
│  Notes      [ ________________] │
│                                 │
│  [        Save & Assign       ] │
└─────────────────────────────────┘
```

---

## New Customer Form Fields

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| Full Name | Text | Yes | Min 2 characters |
| Phone | Tel | Yes | Valid MY phone format |
| Email | Email | No | Valid email format if provided |
| Notes | Textarea | No | Free text |

---

## Behaviour

- Tapping Cancel closes the drawer/sheet; returns to Step 5 with no customer assigned
- Tapping Save validates the form; on success, creates the customer, closes the drawer/sheet, and auto-assigns the new customer on Step 5
- On save failure, inline field errors are shown within the drawer/sheet

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
