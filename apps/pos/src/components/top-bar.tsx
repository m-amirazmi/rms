import { Badge } from "@workspace/ui/components/badge"
import { Brand } from "@workspace/ui/components/brand"

import { LanguageToggle } from "./language-toggle"
import { AvatarPopover } from "./avatar-popover"

interface TopBarProps {
  /** Optional outlet / branch name displayed as a read-only badge */
  outletName?: string
  /** Optional breadcrumb slot — rendered in the centre on tablet+ */
  breadcrumb?: React.ReactNode
}

/**
 * Application top bar for the wizard shell.
 *
 * Uses a 3-column grid so the breadcrumb is truly centred regardless of
 * left / right column widths.
 *
 * Desktop (lg+):
 *   [Logo]          [breadcrumb — centred]          [Outlet] [Lang] [Avatar]
 *
 * Mobile (< lg):
 *   [Logo]                                            [Outlet] [Lang] [Avatar]
 *   (breadcrumb is rendered in a separate scrollable row below)
 */
export function TopBar({ outletName = "KL Branch", breadcrumb }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex w-full shrink-0 items-center border-b border-border bg-background px-4 py-4 lg:grid lg:grid-cols-12 lg:px-8">
      {/* Left: Logo (non-interactive per spec) */}
      <div className="lg:col-span-3">
        <Brand />
      </div>

      {/* Centre: Breadcrumb — hidden on mobile, centred on lg+ */}
      <div className="col-span-6 hidden items-center justify-center lg:flex">
        {breadcrumb}
      </div>

      {/* Right: Outlet badge, language toggle, avatar */}
      <div className="ml-auto flex items-center justify-end gap-2 sm:gap-3 lg:col-span-3 lg:ml-0">
        <Badge variant="outline" className="hidden sm:inline-flex">
          {outletName}
        </Badge>
        <LanguageToggle />
        <AvatarPopover />
      </div>
    </header>
  )
}
