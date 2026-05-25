import { useNavigate } from "@tanstack/react-router"

import {
  Avatar,
  AvatarFallback,
} from "@workspace/ui/components/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"

import { useWizardStore } from "@/features/wizard"

interface AvatarPopoverProps {
  staffName?: string
  branchName?: string
}

/**
 * Staff avatar button that opens a popover dropdown.
 *
 * Actions:
 *   - Switch staff member → redirects to /select-staff (wizard state preserved)
 *   - Cancel intake → opens a confirmation dialog
 */
export function AvatarPopover({
  staffName = "Ahmad Faris",
  branchName = "KL Branch",
}: AvatarPopoverProps) {
  const navigate = useNavigate()
  const resetWizard = useWizardStore((s) => s.resetWizard)

  const handleSwitchStaff = () => {
    navigate({ to: "/select-staff" })
  }

  const handleCancelIntake = () => {
    resetWizard()
    navigate({ to: "/select-staff" })
  }

  const initials = staffName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Dialog>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="relative flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
            aria-label="Open staff menu"
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-56" align="end" sideOffset={4}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{staffName}</span>
                <span className="text-xs text-muted-foreground">
                  {branchName}
                </span>
              </div>
            </div>

            <Separator />

            <button
              type="button"
              onClick={handleSwitchStaff}
              className="text-left text-sm text-foreground transition-colors hover:text-primary"
            >
              Switch staff member
            </button>

            <DialogTrigger asChild>
              <button
                type="button"
                className="text-left text-sm text-destructive transition-colors hover:text-destructive/80"
              >
                Cancel intake
              </button>
            </DialogTrigger>
          </div>
        </PopoverContent>
      </Popover>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Intake?</DialogTitle>
          <DialogDescription>
            This will discard the current repair intake and return you to the
            staff selector. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Stay</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleCancelIntake}>
            Discard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
