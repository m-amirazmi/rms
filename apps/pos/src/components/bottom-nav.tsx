import { useNavigate, useLocation } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import { CaretLeftIcon, CaretRightIcon, Check, X } from "@phosphor-icons/react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { cn } from "@workspace/ui/lib/utils"

import {
  isWizardStepComplete,
  WIZARD_STEP_ROUTES,
  useWizardStore,
} from "@/features/wizard"

interface BottomNavProps {
  className?: string
}

/**
 * Sticky bottom navigation bar for the wizard.
 *
 * Navigates between wizard routes. The step state is derived from the
 * current URL rather than the store so the two stay in sync.
 *
 * - Previous: disabled on step 1
 * - Continue: advances to the next step
 * - Continue is enabled only when the current step is complete
 * - The final step creates a mock job and prevents duplicate submission
 */
export function BottomNav({ className }: BottomNavProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const currentIndex = WIZARD_STEP_ROUTES.findIndex((r) => r.path === pathname)
  const safeIndex = Math.max(0, currentIndex)

  const isFirstStep = safeIndex === 0
  const isLastStep = safeIndex === WIZARD_STEP_ROUTES.length - 1
  const formData = useWizardStore((s) => s.formData)
  const submission = useWizardStore((s) => s.submission)
  const createMockJob = useWizardStore((s) => s.createMockJob)
  const resetWizard = useWizardStore((s) => s.resetWizard)
  const setStep = useWizardStore((s) => s.setStep)

  useEffect(() => {
    setStep(safeIndex)
  }, [safeIndex, setStep])
  const currentStep = WIZARD_STEP_ROUTES[safeIndex]?.step
  const canContinue = currentStep
    ? isWizardStepComplete(currentStep, formData)
    : false
  const continueLabel = isLastStep
    ? submission.status === "success"
      ? "Job Created"
      : submission.status === "submitting"
        ? "Creating Job..."
        : "Create Repair Job"
    : "Continue"

  const goPrev = () => {
    if (!isFirstStep) {
      navigate({ to: WIZARD_STEP_ROUTES[safeIndex - 1].path })
    }
  }

  const goNext = () => {
    if (!canContinue) return
    if (isLastStep) {
      createMockJob()
      return
    }
    navigate({ to: WIZARD_STEP_ROUTES[safeIndex + 1].path })
  }

  const handleCancelIntake = () => {
    resetWizard()
    setShowCancelDialog(false)
    navigate({ to: "/select-staff" })
  }

  return (
    <>
      <nav
        className={cn(
          "z-30 flex w-full shrink-0 items-center justify-between border-t border-border bg-background px-4 py-4 lg:px-8",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            onClick={goPrev}
            disabled={isFirstStep}
            className="gap-1.5 rounded-sm"
          >
            <CaretLeftIcon className="size-4" weight="bold" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => setShowCancelDialog(true)}
            className="gap-1.5 rounded-sm text-destructive hover:text-destructive/80"
          >
            <X className="size-4" weight="bold" />
            <span className="hidden sm:inline">Cancel Intake</span>
          </Button>
        </div>

        <Button
          variant="default"
          size="lg"
          onClick={goNext}
          disabled={
            !canContinue || (isLastStep && submission.status !== "idle")
          }
          aria-label={continueLabel}
          className="gap-1.5 rounded-sm"
        >
          <span className="hidden sm:inline">{continueLabel}</span>
          {isLastStep ? (
            <Check aria-hidden="true" className="size-4" weight="bold" />
          ) : (
            <CaretRightIcon className="size-4" weight="bold" />
          )}
        </Button>
      </nav>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
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
    </>
  )
}
