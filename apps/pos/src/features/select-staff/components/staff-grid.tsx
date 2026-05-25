import type { StaffMember } from "../types"
import { StaffCard } from "./staff-card"

interface StaffGridProps {
  staff: StaffMember[]
  onSelect: (staff: StaffMember) => void
}

export function StaffGrid({ staff, onSelect }: StaffGridProps) {
  return (
    <div className="grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
      {staff.map((member) => (
        <StaffCard key={member.id} staff={member} onSelect={onSelect} />
      ))}
    </div>
  )
}
