import { useState } from "react"
import { useLocation } from "@tanstack/react-router"

import {
  CaretDown,
  CaretUp,
  CurrencyDollar,
  DeviceMobile,
  DeviceTablet,
  GameController,
  Laptop,
  ListChecks,
  Watch,
  Devices,
  Wrench,
} from "@phosphor-icons/react"
import { Badge } from "@workspace/ui/components/badge"
import { CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { cn } from "@workspace/ui/lib/utils"

import {
  calculateRepairTotals,
  WIZARD_STEP_ROUTES,
  type SelectedPart,
  useWizardStore,
} from "@/features/wizard"

const EMPTY_ISSUES: string[] = []
const EMPTY_PARTS: SelectedPart[] = []
const STEP_COUNT = 6
const formatCurrency = (value: number) => `RM ${value.toFixed(2)}`

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
  const { pathname } = useLocation()
  const routeIndex = WIZARD_STEP_ROUTES.findIndex(
    (route) => route.path === pathname
  )
  const currentStep = Math.max(0, routeIndex) + 1
  const modelName = useWizardStore(
    (state) => state.formData["brand-model"]?.modelName ?? "Device"
  )
  const parts = useWizardStore(
    (state) => state.formData.parts?.parts ?? EMPTY_PARTS
  )
  const total = calculateRepairTotals(parts).grandTotal

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
          <span className="text-sm font-medium">{modelName}</span>
          <Badge variant="secondary" className="text-xs">
            {currentStep} of {STEP_COUNT}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium">
            {formatCurrency(total)}
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
  const { pathname } = useLocation()
  const routeIndex = WIZARD_STEP_ROUTES.findIndex(
    (route) => route.path === pathname
  )
  const currentStep = Math.max(0, routeIndex) + 1
  const parts = useWizardStore(
    (state) => state.formData.parts?.parts ?? EMPTY_PARTS
  )
  const total = calculateRepairTotals(parts).grandTotal

  return (
    <div
      className={cn(
        "z-20 w-full shrink-0 border-t border-border bg-card md:hidden",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-mono text-sm font-medium">
          {formatCurrency(total)}
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

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  smartphone: <DeviceMobile className="size-4" />,
  laptop: <Laptop className="size-4" />,
  tablet: <DeviceTablet className="size-4" />,
  wearable: <Watch className="size-4" />,
  console: <GameController className="size-4" />,
  other: <Devices className="size-4" />,
}

function SummaryContent() {
  const category = useWizardStore((s) => s.formData.category?.category)
  const modelName = useWizardStore((s) => s.formData["brand-model"]?.modelName)
  const issues = useWizardStore(
    (s) => s.formData.issues?.issues ?? EMPTY_ISSUES
  )
  const issueNotes = useWizardStore((s) =>
    s.formData.issues?.issueNotes?.trim()
  )
  const parts = useWizardStore((s) => s.formData.parts?.parts ?? EMPTY_PARTS)
  const customer = useWizardStore((s) => s.formData["customer-tech"]?.customer)
  const technician = useWizardStore(
    (s) => s.formData["customer-tech"]?.technician
  )
  const totals = calculateRepairTotals(parts)

  return (
    <div className="flex flex-col gap-4 pt-2">
      {/* Category */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Category</span>
        {category ? (
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">
              {CATEGORY_ICON_MAP[category]}
            </span>
            <span className="text-sm font-medium text-foreground capitalize">
              {category}
            </span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </div>

      <Separator />

      <div className="flex items-center gap-2">
        <DeviceMobile className="size-4 text-muted-foreground" />
        <span className="text-sm">{modelName ?? "—"}</span>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ListChecks className="size-4 text-muted-foreground" />
          <span>Issues ({issues.length})</span>
        </div>
        <ul className="flex flex-col gap-1 pl-6">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <li key={issue} className="text-xs text-muted-foreground">
                • {issue}
              </li>
            ))
          ) : !issueNotes ? (
            <li className="text-xs text-muted-foreground">—</li>
          ) : null}
          {issueNotes && (
            <li className="text-xs text-muted-foreground">
              • Notes: {issueNotes}
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Wrench className="size-4 text-muted-foreground" />
          <span>Parts ({parts.length})</span>
        </div>
        <ul className="flex flex-col gap-1 pl-6">
          {parts.length ? (
            parts.map((part) => (
              <li key={part.id} className="text-xs text-muted-foreground">
                • {part.name} × {part.quantity} ·{" "}
                {formatCurrency(part.unitPrice * part.quantity)}
              </li>
            ))
          ) : (
            <li className="text-xs text-muted-foreground">—</li>
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">Technician</span>
          <span className="text-right">{technician?.name ?? "—"}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">Customer</span>
          <span className="text-right">{customer?.fullName ?? "—"}</span>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <CurrencyDollar className="size-4 text-muted-foreground" />
          <span>Est. Total</span>
        </div>
        <span className="font-mono text-base font-semibold">
          {formatCurrency(totals.grandTotal)}
        </span>
      </div>
    </div>
  )
}
