import { Outlet } from "@tanstack/react-router"

import { TopBar } from "./top-bar"
import { BottomNav } from "./bottom-nav"
import { SummaryPanel, SummaryBar, SummaryPeek } from "./summary-panel"

interface WizardShellProps {
  /** Breadcrumb rendered in the top bar */
  breadcrumb?: React.ReactNode
}

/**
 * Responsive wizard shell — the main layout wrapper for all repair-intake
 * wizard steps.
 *
 * Breakpoints:
 *   - lg+ (1024px): Two-column. Wizard left, persistent SummaryPanel right.
 *   - md  (768px):  Single column. Collapsible SummaryBar above content.
 *   - <md (smartphone): Single column. Sticky SummaryPeek above BottomNav.
 */
export function WizardShell({
  breadcrumb,
}: WizardShellProps) {
  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden">
      {/* Top bar */}
      <TopBar breadcrumb={breadcrumb} />

      {/* Tablet summary bar */}
      <SummaryBar />

      {/* Main content area */}
      <div className="flex min-h-0 flex-1">
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-8">
            <Outlet />
          </div>

          {/* Mobile summary peek + bottom nav */}
          <SummaryPeek />
          <BottomNav />
        </main>

        {/* Desktop persistent summary panel */}
        <SummaryPanel />
      </div>
    </div>
  )
}
