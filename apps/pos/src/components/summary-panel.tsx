import { useState } from "react"

import { Badge } from "@workspace/ui/components/badge"
import { CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { cn } from "@workspace/ui/lib/utils"
import {
  CaretDown,
  CaretUp,
  DeviceMobile,
  CurrencyDollar,
  ListChecks,
  Wrench,
} from "@phosphor-icons/react"

import { useWizardStore } from "@/features/wizard"

// ---------------------------------------------------------------------------
// Static mock data — never changes, so we import it directly rather than
// subscribing to the store for it.
// ---------------------------------------------------------------------------

const MOCK_DEVICE_NAME = "iPhone 16 Pro Max"
const MOCK_ISSUES = [
  "Screen cracked",
  "Battery draining fast",
  "Face ID not working",
]
const MOCK_PARTS = ["OLED Display Assembly", "Battery", "Front Camera Module"]
const MOCK_TOTAL = 561.0
const STEP_COUNT = 6

interface SummaryPanelProps {
  className?: string
}

/**
 * Persistent summary panel for desktop (lg+ breakpoint).
 *
 * Fixed-width right panel that scrolls independently.
 */
export function SummaryPanel({ className }: SummaryPanelProps) {
  return (
    <aside
      className={cn(
        "hidden w-80 shrink-0 border-l border-border bg-card lg:block",
        className
      )}
    >
      <div className="flex h-full flex-col gap-4 p-4">
        <CardHeader className="p-0">
          <CardTitle className="font-heading text-base font-semibold">
            Repair Summary
          </CardTitle>
        </CardHeader>

        <SummaryContent />
      </div>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// Tablet Summary Bar (md breakpoint)
// ---------------------------------------------------------------------------

interface SummaryBarProps {
  className?: string
}

/**
 * Collapsible summary bar for tablet portrait (md breakpoint).
 *
 * Tapping expands/collapses the full summary details below the bar.
 */
export function SummaryBar({ className }: SummaryBarProps) {
  const [expanded, setExpanded] = useState(false)
  const currentStep = useWizardStore((s) => s.currentStepIndex) + 1

  return (
    <div
      className={cn(
        "hidden border-b border-border bg-card md:block lg:hidden",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <DeviceMobile className="size-5 text-muted-foreground" />
          <span className="text-sm font-medium">{MOCK_DEVICE_NAME}</span>
          <Badge variant="secondary" className="text-xs">
            {currentStep} of {STEP_COUNT}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium">
            RM {MOCK_TOTAL.toFixed(2)}
          </span>
          {expanded ? (
            <CaretUp className="size-4 text-muted-foreground" />
          ) : (
            <CaretDown className="size-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-4 pb-4">
          <SummaryContent />
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mobile Summary Peek (smartphone)
// ---------------------------------------------------------------------------

interface SummaryPeekProps {
  className?: string
}

/**
 * Sticky summary peek bar for smartphone (< md).
 *
 * Sits at the very bottom of the viewport above the bottom nav.
 * Shows total price and step indicator; tapping expands details.
 */
export function SummaryPeek({ className }: SummaryPeekProps) {
  const [expanded, setExpanded] = useState(false)
  const currentStep = useWizardStore((s) => s.currentStepIndex) + 1

  return (
    <div
      className={cn(
        "sticky bottom-16 z-20 w-full border-t border-border bg-card md:hidden",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-mono text-sm font-medium">
          RM {MOCK_TOTAL.toFixed(2)}
        </span>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Step {currentStep} of {STEP_COUNT}
          </span>
          {expanded ? (
            <CaretUp className="size-4" />
          ) : (
            <CaretDown className="size-4" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-4 pb-4">
          <SummaryContent />
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared Summary Content
// ---------------------------------------------------------------------------

function SummaryContent() {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex items-center gap-2">
        <DeviceMobile className="size-4 text-muted-foreground" />
        <span className="text-sm">{MOCK_DEVICE_NAME}</span>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ListChecks className="size-4 text-muted-foreground" />
          <span>Issues ({MOCK_ISSUES.length})</span>
        </div>
        <ul className="flex flex-col gap-1 pl-6">
          {MOCK_ISSUES.map((issue, i) => (
            <li key={i} className="text-xs text-muted-foreground">
              • {issue}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Wrench className="size-4 text-muted-foreground" />
          <span>Parts ({MOCK_PARTS.length})</span>
        </div>
        <ul className="flex flex-col gap-1 pl-6">
          {MOCK_PARTS.map((part, i) => (
            <li key={i} className="text-xs text-muted-foreground">
              • {part}
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <CurrencyDollar className="size-4 text-muted-foreground" />
          <span>Total</span>
        </div>
        <span className="font-mono text-base font-semibold">
          RM {MOCK_TOTAL.toFixed(2)}
        </span>
      </div>
    </div>
  )
}
