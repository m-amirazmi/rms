import { ClockIcon, CubeIcon, TrendUpIcon } from "@phosphor-icons/react"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

interface CategoryCardProps {
  label: string
  description: string
  icon: React.ReactNode
  iconBg: string
  iconText: string
  modelCount: number
  avgRepairTime: string
  dailyIntakes: number
  tag: string | null
  popularBrands: string[]
  priceFrom: number
  isSelected: boolean
  onSelect: () => void
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

/**
 * Tappable category card with radio-style selection.
 *
 * Features:
 *   - Radio indicator
 *   - Soft-coloured icon background (big icon)
 *   - Metadata row with icons (models, avg time, daily intakes)
 *   - Popular brands as small pills
 *   - Price-from badge
 */
export function CategoryCard({
  label,
  description,
  icon,
  iconBg,
  iconText,
  modelCount,
  avgRepairTime,
  dailyIntakes,
  tag,
  popularBrands,
  priceFrom,
  isSelected,
  onSelect,
}: CategoryCardProps) {
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
      {/* Radio */}
      <div className="mt-0.5 shrink-0">
        <RadioIndicator checked={isSelected} />
      </div>

      {/* Icon with soft background */}
      <div
        className={cn(
          "mt-0.5 flex size-24 shrink-0 items-center justify-center rounded-xl transition-colors",
          iconBg,
          iconText
        )}
      >
        <span className="[&_svg]:size-10">{icon}</span>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* Label row: name + price */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "text-base font-semibold",
              isSelected ? "text-primary" : "text-foreground"
            )}
          >
            {label}
          </span>
          <span className="shrink-0 font-mono text-sm font-medium text-muted-foreground">
            From RM {priceFrom}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{description}</p>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-mono">
            <CubeIcon className="size-3.5" />
            {modelCount}
          </span>
          <span className="hidden text-muted-foreground/40 sm:inline">·</span>
          <span className="hidden items-center gap-1 sm:inline-flex">
            <ClockIcon className="size-3.5" />
            {avgRepairTime}
          </span>
          <span className="hidden text-muted-foreground/40 sm:inline">·</span>
          <span className="hidden items-center gap-1 sm:inline-flex">
            <TrendUpIcon className="size-3.5" />
            {dailyIntakes} today
          </span>
        </div>

        {/* Popular brands */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {tag && (
            <Badge
              variant="outline"
              className="shrink-0 text-[10px] font-medium whitespace-nowrap"
            >
              {tag}
            </Badge>
          )}
          {popularBrands.map((brand) => (
            <span
              key={brand}
              className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
