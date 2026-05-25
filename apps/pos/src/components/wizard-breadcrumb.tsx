import { useLocation } from "@tanstack/react-router"
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react"

import { cn } from "@workspace/ui/lib/utils"
import { Badge } from "@workspace/ui/components/badge"

import { WIZARD_STEPS, WIZARD_STEP_ROUTES } from "@/features/wizard"

const STEP_LABELS: Record<string, string> = {
  category: "Category",
  "brand-model": "Brand & Model",
  issues: "Issues",
  parts: "Parts",
  "customer-tech": "Customer & Tech",
  summary: "Summary",
}

interface WizardBreadcrumbProps {
  className?: string
}

/**
 * Read-only wizard step breadcrumb.
 *
 * Derives the active step from the current route pathname so it always
 * stays in sync with the URL.
 *
 * - Completed steps: check icon + muted text
 * - Current step: bold text + primary colour
 * - Future steps: muted text
 */
export function WizardBreadcrumb({ className }: WizardBreadcrumbProps) {
  const { pathname } = useLocation()

  const currentStepIndex = WIZARD_STEP_ROUTES.findIndex(
    (r) => r.path === pathname
  )
  const safeIndex = Math.max(0, currentStepIndex)

  return (
    <nav
      aria-label="Wizard steps"
      className={cn(
        "flex items-center gap-1 text-xs font-medium tracking-wide sm:text-sm",
        className
      )}
    >
      {WIZARD_STEPS.map((step, index) => {
        const isCompleted = index < safeIndex
        const isCurrent = index === safeIndex
        const isFuture = index > safeIndex

        return (
          <div key={step} className="flex items-center gap-1">
            {index > 0 && (
              <CaretRightIcon
                className={cn(
                  "size-3 shrink-0 text-muted-foreground",
                  isCompleted && "text-primary"
                )}
                weight="bold"
              />
            )}

            <Badge
              className={cn(
                "flex items-center gap-1 text-xs whitespace-nowrap text-muted-foreground data-[variant=default]:bg-muted",
                isCompleted &&
                  "text-green-900 line-through data-[variant=default]:bg-green-100/60",
                isCurrent &&
                  "text-primary data-[variant=default]:bg-primary/20",
                isFuture && "text-muted-foreground"
              )}
            >
              {isCompleted && (
                <CheckIcon
                  className="size-3.5 shrink-0 text-green-700"
                  weight="bold"
                />
              )}
              <span className={cn(isCurrent && "font-semibold")}>
                {STEP_LABELS[step] ?? step}
              </span>
            </Badge>
          </div>
        )
      })}
    </nav>
  )
}
