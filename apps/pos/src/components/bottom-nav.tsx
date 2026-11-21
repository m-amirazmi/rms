import { useNavigate, useLocation } from "@tanstack/react-router"
import { useState } from "react"

import { CaretLeftIcon, CaretRightIcon, X } from "@phosphor-icons/react"

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

import { WIZARD_STEP_ROUTES, useWizardStore } from "@/features/wizard"

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
 * - On Step 1, Continue is only enabled when a category has been selected
 * - On Brand & Model, Continue is only enabled when a model has been selected
 * - On Issues, Continue requires a selected issue or non-empty notes
 * - On the final step (Summary), Continue becomes "Create Job"
 */
export function BottomNav({ className }: BottomNavProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const currentIndex = WIZARD_STEP_ROUTES.findIndex((r) => r.path === pathname)
  const safeIndex = Math.max(0, currentIndex)

  const isFirstStep = safeIndex === 0
  const isLastStep = safeIndex === WIZARD_STEP_ROUTES.length - 1
  const isStep1 = pathname === "/select-category"
  const isBrandSelectionStep = pathname === "/select-brand-model"
  const isIssuesStep = pathname === "/select-issues"

  const category = useWizardStore((s) => s.formData.category?.category)
  const selectedBrand = useWizardStore((s) => s.formData["brand-model"]?.brand)
  const selectedModel = useWizardStore((s) => s.formData["brand-model"]?.model)
  const selectedIssues = useWizardStore((s) => s.formData.issues?.issues)
  const issueNotes = useWizardStore((s) => s.formData.issues?.issueNotes)
  const resetWizard = useWizardStore((s) => s.resetWizard)
  const canContinue = isStep1
    ? Boolean(category)
    : isBrandSelectionStep
      ? Boolean(selectedBrand && selectedModel)
      : isIssuesStep
        ? Boolean(selectedIssues?.length || issueNotes?.trim())
        : true
  const continueLabel = isLastStep
    ? "Create Job"
    : isBrandSelectionStep && !selectedModel
      ? selectedBrand
        ? "Select a model to continue"
        : "Select brand and model to continue"
      : "Continue"

  const goPrev = () => {
    if (!isFirstStep) {
      navigate({ to: WIZARD_STEP_ROUTES[safeIndex - 1].path })
    }
  }

  const goNext = () => {
    if (!isLastStep) {
      navigate({ to: WIZARD_STEP_ROUTES[safeIndex + 1].path })
    }
  }

  const handleCancelIntake = () => {
    resetWizard()
    navigate({ to: "/select-staff" })
  }

  return (
    <>
      <nav
        className={cn(
          "sticky bottom-0 z-30 flex w-full shrink-0 items-center justify-between border-t border-border bg-background px-4 py-4 lg:px-8",
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
          disabled={isLastStep || !canContinue}
          aria-label={continueLabel}
          className="gap-1.5 rounded-sm"
        >
          <span className="hidden sm:inline">{continueLabel}</span>
          <CaretRightIcon className="size-4" weight="bold" />
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
