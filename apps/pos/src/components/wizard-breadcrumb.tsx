import { useLocation, useNavigate } from "@tanstack/react-router"
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react"

import { cn } from "@workspace/ui/lib/utils"
import { Badge } from "@workspace/ui/components/badge"

import {
  isWizardStepComplete,
  WIZARD_STEPS,
  WIZARD_STEP_ROUTES,
  useWizardStore,
} from "@/features/wizard"

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
 * Selection-aware wizard step breadcrumb with links to completed steps.
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
  const navigate = useNavigate()
  const formData = useWizardStore((state) => state.formData)
  const setStep = useWizardStore((state) => state.setStep)

  const currentStepIndex = WIZARD_STEP_ROUTES.findIndex(
    (r) => r.path === pathname
  )
  const safeIndex = Math.max(0, currentStepIndex)
  const issueCount = formData.issues?.issues?.length ?? 0
  const partCount = formData.parts?.parts?.length ?? 0
  const labels: Record<string, string> = {
    category: isWizardStepComplete("category", formData) ? "✓" : "Category",
    "brand-model": isWizardStepComplete("brand-model", formData)
      ? "✓"
      : "Brand & Model",
    issues: isWizardStepComplete("issues", formData)
      ? issueCount
        ? `${issueCount} issue${issueCount === 1 ? "" : "s"}`
        : "Notes"
      : "Issues",
    parts: isWizardStepComplete("parts", formData)
      ? `${partCount} part${partCount === 1 ? "" : "s"}`
      : "Parts",
    "customer-tech": isWizardStepComplete("customer-tech", formData)
      ? "✓"
      : "Customer & Tech",
    summary: "Summary",
  }

  return (
    <nav
      aria-label="Wizard steps"
      className={cn(
        "flex items-center gap-1 text-xs font-medium tracking-wide sm:text-sm",
        className
      )}
    >
      {WIZARD_STEPS.map((step, index) => {
        const isCompleted =
          index < safeIndex && isWizardStepComplete(step, formData)
        const isCurrent = index === safeIndex
        const isFuture = index > safeIndex
        const label = labels[step] ?? STEP_LABELS[step] ?? step
        const route = WIZARD_STEP_ROUTES[index]

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

            {isCompleted ? (
              <button
                type="button"
                onClick={() => {
                  setStep(index)
                  navigate({ to: route.path })
                }}
                aria-label={`Go to completed step: ${STEP_LABELS[step]}`}
                className="flex items-center gap-1 rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-foreground hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
              >
                {label === "✓" && (
                  <CheckIcon
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-primary"
                    weight="bold"
                  />
                )}
                <span>{label === "✓" ? "" : label}</span>
              </button>
            ) : (
              <Badge
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex items-center gap-1 text-xs whitespace-nowrap text-muted-foreground data-[variant=default]:bg-muted",
                  isCurrent &&
                    "text-primary data-[variant=default]:bg-primary/20",
                  isFuture && "text-muted-foreground"
                )}
              >
                <span className={cn(isCurrent && "font-semibold")}>
                  {label}
                </span>
              </Badge>
            )}
          </div>
        )
      })}
    </nav>
  )
}
