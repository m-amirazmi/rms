import { Badge } from "@workspace/ui/components/badge"
import { Brand } from "@workspace/ui/components/brand"

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
 *   [Logo]          [breadcrumb — centred]          [Outlet] [Avatar]
 *
 * Mobile (< lg):
 *   [Logo] [scrollable breadcrumb] [Avatar]
 */
export function TopBar({ outletName = "KL Branch", breadcrumb }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex min-h-16 w-full shrink-0 items-center gap-3 border-b border-border bg-background px-4 lg:gap-6 lg:px-8">
      {/* Left: Logo (non-interactive per spec) */}
      <div className="shrink-0">
        <Brand />
      </div>

      {/* Centre: Steps — scrollable on narrow screens */}
      <div className="scrollbar-hide flex min-w-0 flex-1 justify-center overflow-x-auto">
        {breadcrumb}
      </div>

      {/* Right: Outlet badge and avatar menu */}
      <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
        <Badge variant="outline" className="hidden sm:inline-flex">
          {outletName}
        </Badge>
        <AvatarPopover />
      </div>
    </header>
  )
}
