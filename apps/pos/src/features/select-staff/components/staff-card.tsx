import { ClockIcon, TicketIcon } from "@phosphor-icons/react"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent } from "@workspace/ui/components/card"

import type { StaffMember } from "../types"
import { getInitials } from "../utils"

interface StaffCardProps {
  staff: StaffMember
  onSelect: (staff: StaffMember) => void
}

export function StaffCard({ staff, onSelect }: StaffCardProps) {
  return (
    <Card
      size="sm"
      className="cursor-pointer items-center rounded-xl border border-foreground text-center transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 hover:border-primary/50 hover:shadow-sm"
      onClick={() => onSelect(staff)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(staff)
        }
      }}
    >
      <CardContent className="flex flex-col items-center gap-4">
        <div
          className={`flex size-24 items-center justify-center rounded-full font-heading text-2xl font-semibold ${staff.avatarBg} ${staff.avatarText}`}
        >
          {getInitials(staff.fullName)}
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-foreground">{staff.fullName}</p>
          <Badge
            variant={
              staff.position === "Technician"
                ? "default"
                : staff.position === "Frontdesk"
                  ? "secondary"
                  : "outline"
            }
          >
            {staff.position}
          </Badge>

          <div className="mt-2 flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ClockIcon className="size-3" />
              {staff.lastUsed}
            </span>
            <span className="flex items-center gap-1">
              <TicketIcon className="size-3" />
              {staff.ticketsToday} tickets created today
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
