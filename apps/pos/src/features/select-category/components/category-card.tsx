import { ClockIcon, CubeIcon, TrendUpIcon } from "@phosphor-icons/react"
import { Badge } from "@workspace/ui/components/badge"

import { SelectionCard } from "@/components/selection-card"

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
    <SelectionCard
      label={label}
      trailing={
        <span className="shrink-0 font-mono text-sm font-medium text-muted-foreground">
          From RM {priceFrom}
        </span>
      }
      icon={icon}
      iconBg={iconBg}
      iconText={iconText}
      isSelected={isSelected}
      onSelect={onSelect}
    >
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
    </SelectionCard>
  )
}
