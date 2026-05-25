export interface StaffMember {
  id: string
  userId: string
  fullName: string
  position: "Technician" | "Frontdesk" | "Manager"
  pin: string
  phoneNumber: string
  lastUsed: string
  ticketsToday: number
  avatarBg: string
  avatarText: string
}

export interface LockoutEntry {
  attempts: number
  lockedUntil: number | null
}
