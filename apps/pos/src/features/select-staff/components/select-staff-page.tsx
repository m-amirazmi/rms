import { useCallback, useState } from "react"
import { useNavigate } from "@tanstack/react-router"

import AuthTopbar from "@/components/auth-topbar"

import { MOCK_STAFF } from "../constants"
import type { StaffMember } from "../types"
import { PinOverlay } from "./pin-overlay"
import { StaffGrid } from "./staff-grid"

export function SelectStaffPage() {
  const navigate = useNavigate()
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)

  const handleSuccess = useCallback(() => {
    navigate({ to: "/select-category" })
  }, [navigate])

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <AuthTopbar />

      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4 pb-30">
        <div className="space-y-1 text-center">
          <h1 className="font-heading text-lg font-semibold tracking-wider text-foreground uppercase">
            Who's serving?
          </h1>
          <p className="text-sm text-muted-foreground">
            Select your name to begin
          </p>
        </div>

        <StaffGrid staff={MOCK_STAFF} onSelect={setSelectedStaff} />

        <p className="text-center text-sm text-muted-foreground">
          Your name not here?{" "}
          <span className="font-medium text-foreground">
            Please contact your manager.
          </span>
        </p>
      </div>

      {selectedStaff && (
        <PinOverlay
          staff={selectedStaff}
          onSuccess={handleSuccess}
          onCancel={() => setSelectedStaff(null)}
        />
      )}
    </div>
  )
}
