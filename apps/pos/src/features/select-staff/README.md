# Feature: Select Staff

Staff selection screen with PIN authentication.

## Public API

```ts
import { SelectStaffPage } from "@/features/select-staff"
```

## Components

| Component | Responsibility |
|---|---|
| `SelectStaffPage` | Main page. Manages selected-staff state. Renders topbar + grid + overlay. |
| `StaffGrid` | Responsive grid layout. Maps over staff list. |
| `StaffCard` | Presentational card. Avatar, name, position badge, last active, tickets. |
| `PinOverlay` | Full-screen PIN entry. RHF validation, lockout logic, shake animation. |

## Data Flow

1. User taps card → `SelectStaffPage` sets `selectedStaff`
2. `PinOverlay` appears → user enters 4-digit PIN
3. `validateStaffPin()` checks against mock data
4. On success → stores to localStorage → navigates to `/select-category`
5. On fail → lockout tracking, shake animation, error message

## Architecture

| File | Purpose |
|---|---|
| `types.ts` | TypeScript contracts (StaffMember, LockoutEntry) |
| `constants.ts` | Mock data and magic numbers |
| `schemas.ts` | Zod schema for PIN validation |
| `api.ts` | Mock async validation + in-memory lockout store |
| `utils.ts` | Pure helpers (initials, countdown formatting) |

## Future

- Replace `MOCK_STAFF` in `constants.ts` with TanStack Query hook
- Replace `validateStaffPin` in `api.ts` with real backend call
