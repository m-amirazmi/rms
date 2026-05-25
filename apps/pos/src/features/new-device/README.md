# Feature: New Device

Device registration / pairing screen for first-time setup.

## Public API

```ts
import { NewDevicePage } from "@/features/new-device"
```

## Components

| Component | Responsibility |
|---|---|
| `NewDevicePage` | Full pairing form page. 6-digit code input with auto-submit, keyboard nav, paste support. |

## Architecture

| File | Purpose |
|---|---|
| `schemas.ts` | Zod schema for 6-digit pairing code |
| `api.ts` | Mock `validatePairingCode` — validates against "123456" |
| `constants.ts` | `PIN_LENGTH = 6`, `GROUP_SIZE = 3` |

## Future

- Replace `validatePairingCode` with real Tenant Portal API call
- Add QR code scanner as alternative input method
