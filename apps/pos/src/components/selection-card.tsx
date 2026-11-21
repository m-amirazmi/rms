import type { ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

interface SelectionCardProps {
  label: string
  trailing?: ReactNode
  icon: ReactNode
  iconBg: string
  iconText: string
  isSelected: boolean
  onSelect: () => void
  children?: ReactNode
}

function RadioIndicator({ checked }: { checked: boolean }) {
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        checked
          ? "border-primary bg-primary"
          : "border-foreground bg-transparent"
      )}
      aria-hidden="true"
    >
      {checked && <div className="size-2.5 rounded-full bg-white" />}
    </div>
  )
}

export function SelectionCard({
  label,
  trailing,
  icon,
  iconBg,
  iconText,
  isSelected,
  onSelect,
  children,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
      className={cn(
        "group flex h-full w-full items-start gap-4 rounded-xl border p-4 text-left transition-all outline-none select-none",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-foreground bg-card hover:border-primary/50 hover:bg-muted/30 active:scale-[0.99]"
      )}
    >
      <div className="mt-0.5 shrink-0">
        <RadioIndicator checked={isSelected} />
      </div>

      <div
        className={cn(
          "mt-0.5 flex size-24 shrink-0 items-center justify-center rounded-xl transition-colors",
          iconBg,
          iconText
        )}
      >
        <span className="[&_svg]:size-10">{icon}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "text-base font-semibold",
              isSelected ? "text-primary" : "text-foreground"
            )}
          >
            {label}
          </span>
          {trailing}
        </div>
        {children}
      </div>
    </button>
  )
}
