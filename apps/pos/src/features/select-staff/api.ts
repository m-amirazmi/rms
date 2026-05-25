import { MAX_ATTEMPTS, LOCKOUT_MS, MOCK_STAFF } from "./constants"
import type { LockoutEntry } from "./types"

/* ------------------------------------------------------------------ */
/*  Lockout State (in-memory)                                          */
/* ------------------------------------------------------------------ */

const lockoutStore = new Map<string, LockoutEntry>()

function getLockout(staffId: string): LockoutEntry {
  if (!lockoutStore.has(staffId)) {
    lockoutStore.set(staffId, { attempts: 0, lockedUntil: null })
  }
  return lockoutStore.get(staffId)!
}

export function recordAttempt(staffId: string): {
  locked: boolean
  remaining: number
} {
  const entry = getLockout(staffId)
  entry.attempts += 1
  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCKOUT_MS
    return { locked: true, remaining: 0 }
  }
  return { locked: false, remaining: MAX_ATTEMPTS - entry.attempts }
}

export function clearLockout(staffId: string) {
  lockoutStore.set(staffId, { attempts: 0, lockedUntil: null })
}

export function isLocked(staffId: string): boolean {
  const entry = getLockout(staffId)
  if (!entry.lockedUntil) return false
  if (Date.now() >= entry.lockedUntil) {
    clearLockout(staffId)
    return false
  }
  return true
}

export function getRemainingLockoutSeconds(staffId: string): number {
  const entry = getLockout(staffId)
  if (!entry.lockedUntil) return 0
  const remaining = Math.ceil((entry.lockedUntil - Date.now()) / 1000)
  if (remaining <= 0) {
    clearLockout(staffId)
    return 0
  }
  return remaining
}

/* ------------------------------------------------------------------ */
/*  Mock API                                                           */
/* ------------------------------------------------------------------ */

export async function validateStaffPin(staffId: string, pin: string) {
  await new Promise((r) => setTimeout(r, 600))
  const staff = MOCK_STAFF.find((s) => s.id === staffId)
  if (!staff) return { success: false as const }
  if (staff.pin === pin) return { success: true as const, staff }
  return { success: false as const }
}
