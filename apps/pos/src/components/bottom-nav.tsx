import { useNavigate, useLocation } from "@tanstack/react-router"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { WIZARD_STEP_ROUTES } from "@/features/wizard"

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
 * - On the final step (Summary), Continue becomes "Create Job"
 */
export function BottomNav({ className }: BottomNavProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const currentIndex = WIZARD_STEP_ROUTES.findIndex(
    (r) => r.path === pathname
  )
  const safeIndex = Math.max(0, currentIndex)

  const isFirstStep = safeIndex === 0
  const isLastStep = safeIndex === WIZARD_STEP_ROUTES.length - 1

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

  return (
    <nav
      className={cn(
        "sticky bottom-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-t border-border bg-background px-4",
        className
      )}
    >
      <Button
        variant="outline"
        size="default"
        onClick={goPrev}
        disabled={isFirstStep}
        className="gap-1.5 rounded-sm"
      >
        <CaretLeftIcon className="size-4" weight="bold" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <Button
        variant="default"
        size="default"
        onClick={goNext}
        disabled={isLastStep}
        className="gap-1.5 rounded-sm"
      >
        <span className="hidden sm:inline">
          {isLastStep ? "Create Job" : "Continue"}
        </span>
        <CaretRightIcon className="size-4" weight="bold" />
      </Button>
    </nav>
  )
}
