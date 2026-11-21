import { Badge } from "@workspace/ui/components/badge"
import { Brand } from "@workspace/ui/components/brand"

import { AvatarPopover } from "./avatar-popover"

interface TopBarProps {
  /** Optional outlet / branch name displayed as a read-only badge */
  outletName?: string
  /** Optional wizard breadcrumb — centered on tablet+, below the header on mobile */
  breadcrumb?: React.ReactNode
}

/**
 * Application top bar for the wizard shell.
 *
 * Uses a 3-column grid so the breadcrumb is truly centred regardless of
 * left / right column widths.
 *
 * Tablet and desktop (md+):
 *   [Logo]          [breadcrumb — centred]          [Outlet] [Avatar]
 * Mobile (< md):
 *   [Logo]                                      [Avatar]
 *   [scrollable breadcrumb]
 */
export function TopBar({ outletName = "KL Branch", breadcrumb }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full shrink-0 border-b border-border bg-background">
      <div className="flex min-h-16 items-center gap-3 px-4 lg:gap-6 lg:px-8">
        {/* Left: Logo (non-interactive per spec) */}
        <div className="shrink-0">
          <Brand />
        </div>

        {/* Centre: Steps on tablet and desktop */}
        <div className="scrollbar-hide hidden min-w-0 flex-1 justify-center overflow-x-auto md:flex">
          {breadcrumb}
        </div>

        {/* Right: Outlet badge and avatar menu */}
        <div className="ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-3 md:ml-0">
          <Badge variant="outline" className="hidden sm:inline-flex">
            {outletName}
          </Badge>
          <AvatarPopover />
        </div>
      </div>

      {breadcrumb && (
        <div className="border-t border-border/60 px-4 py-2 md:hidden">
          <div className="scrollbar-hide min-w-0 overflow-x-auto">
            <div className="w-max">{breadcrumb}</div>
          </div>
        </div>
      )}
    </header>
  )
}
