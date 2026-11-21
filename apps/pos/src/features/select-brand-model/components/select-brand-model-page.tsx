import { useState } from "react"

import { ClockIcon, CubeIcon, TrendUpIcon, Wrench } from "@phosphor-icons/react"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

import { useWizardStore } from "@/features/wizard"

import { BRANDS_BY_CATEGORY, CATEGORY_LABELS } from "../constants"
import type { BrandMeta } from "../types"

function BrandLogo({ brand }: { brand: BrandMeta }) {
  const [hasError, setHasError] = useState(false)
  const initials = brand.name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)

  return (
    <div className="flex h-12 w-36 items-center justify-center overflow-hidden rounded-md border border-border bg-card px-2">
      {hasError ? (
        <span
          aria-hidden="true"
          className="font-heading text-lg font-bold tracking-wide text-foreground"
        >
          {initials}
        </span>
      ) : (
        <img
          src={brand.logoSrc}
          alt={`${brand.name} logo`}
          className="max-h-full max-w-full object-contain"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <span
        className="mt-0.5 shrink-0 text-muted-foreground"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0 text-xs leading-5 text-muted-foreground">
        <span className="font-mono font-semibold text-foreground">{value}</span>{" "}
        {label}
      </span>
    </div>
  )
}

function BrandCard({
  brand,
  selected,
  onSelect,
}: {
  brand: BrandMeta
  selected: boolean
  onSelect: () => void
}) {
  const { metrics } = brand

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex min-h-56 w-full flex-col gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30",
        selected
          ? "border-primary bg-primary/5"
          : "border-foreground bg-card hover:border-primary/50 hover:bg-muted/30 active:scale-[0.99]"
      )}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <BrandLogo brand={brand} />
        <span
          aria-hidden="true"
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
            selected ? "border-primary bg-primary" : "border-foreground"
          )}
        >
          {selected && (
            <span className="size-2.5 rounded-full bg-primary-foreground" />
          )}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-heading text-base font-semibold text-foreground">
            {brand.name}
          </span>
          {selected && <Badge variant="secondary">Selected</Badge>}
        </div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2">
          <Metric
            icon={<CubeIcon className="size-4" />}
            label="models in category"
            value={metrics.modelCount.toLocaleString()}
          />
          <Metric
            icon={<Wrench className="size-4" />}
            label="completed repairs"
            value={metrics.completedRepairs.toLocaleString()}
          />
          <Metric
            icon={<CubeIcon className="size-4" />}
            label="compatible parts / SKUs"
            value={metrics.compatibleParts.toLocaleString()}
          />
          <Metric
            icon={<TrendUpIcon className="size-4" />}
            label="parts used"
            value={metrics.partsUsed.toLocaleString()}
          />
          <Metric
            icon={<ClockIcon className="size-4" />}
            label="average turnaround"
            value={metrics.averageRepairTime}
          />
        </div>
      </div>
    </button>
  )
}

export function SelectBrandModelPage() {
  const category = useWizardStore((state) => state.formData.category?.category)
  const selectedBrand = useWizardStore(
    (state) => state.formData["brand-model"]?.brand
  )
  const updateFormData = useWizardStore((state) => state.updateFormData)
  const [search, setSearch] = useState("")

  if (!category) {
    return null
  }

  const brands = BRANDS_BY_CATEGORY[category].filter((brand) =>
    brand.name.toLowerCase().includes(search.trim().toLowerCase())
  )

  const selectBrand = (brandId: string) => {
    updateFormData("brand-model", {
      brand: brandId,
      ...(selectedBrand !== brandId ? { model: undefined } : {}),
    })
  }

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-heading text-lg font-semibold tracking-wider text-foreground uppercase">
            Identify the Device
          </h1>
          <p className="text-base text-muted-foreground">
            Choose a brand for your {CATEGORY_LABELS[category].toLowerCase()}.
          </p>
        </div>
        <Badge variant="outline" className="w-fit">
          Demo metrics
        </Badge>
      </div>

      <div className="flex max-w-xl flex-col gap-2">
        <label
          htmlFor="brand-search"
          className="text-sm font-semibold text-foreground"
        >
          Search brands
        </label>
        <Input
          id="brand-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={`Search ${CATEGORY_LABELS[category]} brands...`}
        />
      </div>

      <div
        role="radiogroup"
        aria-label={`${CATEGORY_LABELS[category]} brands`}
        className="grid grid-cols-1 content-start gap-4 md:grid-cols-2"
      >
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            selected={selectedBrand === brand.id}
            onSelect={() => selectBrand(brand.id)}
          />
        ))}
      </div>

      {brands.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No brands match “{search}” in this category.
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        Model selection is the next part of this step. Brand counts and repair
        metrics shown here are sample data and are scoped to this device
        category.
      </p>
    </div>
  )
}
