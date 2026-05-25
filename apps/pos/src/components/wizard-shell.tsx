import { Outlet } from "@tanstack/react-router"

import { TopBar } from "./top-bar"
import { BottomNav } from "./bottom-nav"
import { SummaryPanel, SummaryBar, SummaryPeek } from "./summary-panel"

interface WizardShellProps {
  /** Desktop breadcrumb rendered in the top bar centre */
  desktopBreadcrumb?: React.ReactNode
  /** Mobile breadcrumb rendered in a scrollable second row */
  mobileBreadcrumb?: React.ReactNode
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
  desktopBreadcrumb,
  mobileBreadcrumb,
}: WizardShellProps) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {/* Top bar */}
      <TopBar breadcrumb={desktopBreadcrumb} />

      {/* Mobile breadcrumb row */}
      {mobileBreadcrumb && (
        <div className="scrollbar-hide shrink-0 overflow-x-auto border-b border-border bg-background px-4 py-2 lg:hidden">
          {mobileBreadcrumb}
        </div>
      )}

      {/* Tablet summary bar */}
      <SummaryBar />

      {/* Main content area */}
      <div className="flex min-h-0 flex-1">
        <main className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1 p-4 lg:p-8">
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
