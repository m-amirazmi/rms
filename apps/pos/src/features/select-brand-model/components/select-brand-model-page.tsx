import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import {
  CubeIcon,
  DeviceMobile,
  Devices,
  DeviceTablet,
  GameController,
  Laptop,
  TrendUpIcon,
  Watch,
  Wrench,
} from "@phosphor-icons/react"
import {
  siAcer,
  siApple,
  siAsus,
  siAtari,
  siBose,
  siDell,
  siDji,
  siFitbit,
  siFujifilm,
  siGarmin,
  siGoogle,
  siHonor,
  siHp,
  siHuawei,
  siJbl,
  siLenovo,
  siMotorola,
  siMsi,
  siNikon,
  siNokia,
  siOneplus,
  siOppo,
  siRazer,
  siSamsung,
  siSega,
  siSony,
  siSteam,
  siXiaomi,
} from "simple-icons/icons"

import { SelectionCard } from "@/components/selection-card"
import { useWizardStore } from "@/features/wizard"
import { CATEGORY_ICON_STYLES } from "@/features/select-category/constants"

import { BRANDS_BY_CATEGORY, CATEGORY_LABELS } from "../constants"
import { MODEL_OPTIONS_BY_CATEGORY } from "../model-options"
import type { BrandMeta, DeviceModel } from "../types"

const BRAND_ICONS: Partial<Record<string, { path: string }>> = {
  acer: siAcer,
  apple: siApple,
  asus: siAsus,
  atari: siAtari,
  bose: siBose,
  dell: siDell,
  dji: siDji,
  fitbit: siFitbit,
  fujifilm: siFujifilm,
  garmin: siGarmin,
  google: siGoogle,
  honor: siHonor,
  hp: siHp,
  huawei: siHuawei,
  jbl: siJbl,
  lenovo: siLenovo,
  motorola: siMotorola,
  msi: siMsi,
  nikon: siNikon,
  nokia: siNokia,
  oneplus: siOneplus,
  oppo: siOppo,
  razer: siRazer,
  samsung: siSamsung,
  sega: siSega,
  sony: siSony,
  steam: siSteam,
  xiaomi: siXiaomi,
}

const CATEGORY_DEVICE_ICONS: Record<string, React.ReactNode> = {
  smartphone: <DeviceMobile weight="duotone" />,
  laptop: <Laptop weight="duotone" />,
  tablet: <DeviceTablet weight="duotone" />,
  wearable: <Watch weight="duotone" />,
  console: <GameController weight="duotone" />,
  other: <Devices weight="duotone" />,
}

function BrandLogo({ brand }: { brand: BrandMeta }) {
  const icon = BRAND_ICONS[brand.id]
  const initials = brand.name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)

  return (
    <>
      {icon ? (
        <svg
          role="img"
          aria-label={`${brand.name} logo`}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-10"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          role="img"
          aria-label={`${brand.name} logo`}
          className="font-heading text-2xl font-bold tracking-wide"
        >
          {initials}
        </span>
      )}
    </>
  )
}

function SelectionSummary({
  brand,
  model,
  isSelectingBrand,
  onToggleBrandSelection,
}: {
  brand: BrandMeta | undefined
  model: DeviceModel | undefined
  isSelectingBrand: boolean
  onToggleBrandSelection: () => void
}) {
  const modelLabel = model?.name ?? "Select a model"

  return (
    <div
      aria-live="polite"
      className="min-w-0 sm:ml-auto sm:w-96 sm:text-right"
    >
      {brand ? (
        <button
          type="button"
          onClick={onToggleBrandSelection}
          aria-label={
            isSelectingBrand
              ? "Keep selected brand"
              : `Change brand from ${brand.name}`
          }
          title={`${brand.name} | ${modelLabel}`}
          className="inline-flex w-full min-w-0 items-center justify-end gap-1.5 text-right text-sm font-medium hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
        >
          <span className="truncate">{brand.name}</span>
          <span aria-hidden="true" className="h-5 w-px shrink-0 bg-border" />
          <span
            className={model ? "truncate" : "truncate text-muted-foreground"}
          >
            {modelLabel}
          </span>
        </button>
      ) : (
        <div className="inline-flex w-full min-w-0 items-center justify-end gap-1.5 text-right text-sm font-medium text-muted-foreground">
          <span>Select a brand</span>
          <span aria-hidden="true" className="h-5 w-px shrink-0 bg-border" />
          <span>Select a model</span>
        </div>
      )}
    </div>
  )
}

function BrandCard({
  brand,
  selected,
  onSelect,
  iconBg,
  iconText,
}: {
  brand: BrandMeta
  selected: boolean
  onSelect: () => void
  iconBg: string
  iconText: string
}) {
  const { metrics } = brand

  return (
    <SelectionCard
      label={brand.name}
      icon={<BrandLogo brand={brand} />}
      iconBg={iconBg}
      iconText={iconText}
      isSelected={selected}
      onSelect={onSelect}
    >
      <div className="flex flex-col items-start gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1 font-mono">
          <CubeIcon className="size-3.5" />
          {metrics.modelCount.toLocaleString()}
        </span>
        <span className="inline-flex items-center gap-1 font-mono">
          <Wrench className="size-3.5" />
          {metrics.completedRepairs.toLocaleString()}
        </span>
        <span className="inline-flex items-center gap-1 font-mono">
          <TrendUpIcon className="size-3.5" />
          {metrics.compatibleParts.toLocaleString()}
        </span>
      </div>
    </SelectionCard>
  )
}

export function SelectBrandModelPage() {
  const navigate = useNavigate()
  const category = useWizardStore((state) => state.formData.category?.category)
  const selectedBrandId = useWizardStore(
    (state) => state.formData["brand-model"]?.brand
  )
  const selectedModelId = useWizardStore(
    (state) => state.formData["brand-model"]?.model
  )
  const updateFormData = useWizardStore((state) => state.updateFormData)
  const setStep = useWizardStore((state) => state.setStep)
  const [isSelectingBrand, setIsSelectingBrand] = useState(false)

  if (!category) {
    return null
  }

  const brands = BRANDS_BY_CATEGORY[category]
  const { iconBg, iconText } = CATEGORY_ICON_STYLES[category]
  const selectedBrand = brands.find((brand) => brand.id === selectedBrandId)
  const modelOptions = selectedBrand
    ? (MODEL_OPTIONS_BY_CATEGORY[category][selectedBrand.id] ?? [])
    : []
  const selectedModel = modelOptions.find(
    (model) => model.id === selectedModelId
  )
  const showBrandOptions = !selectedBrand || isSelectingBrand

  const selectBrand = (brandId: string) => {
    updateFormData("brand-model", {
      brand: brandId,
      ...(selectedBrandId !== brandId ? { model: undefined } : {}),
    })
    setIsSelectingBrand(false)
  }

  const selectModel = (modelId: string) => {
    updateFormData("brand-model", { model: modelId })
    setStep(2)
    navigate({ to: "/select-issues" })
  }

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-heading text-lg font-semibold tracking-wider text-foreground uppercase">
            Identify the Device
          </h1>
          <p className="text-base text-muted-foreground">
            {showBrandOptions
              ? `Choose a brand for your ${CATEGORY_LABELS[category].toLowerCase()}.`
              : selectedModel
                ? `${selectedBrand?.name} ${selectedModel.name} selected.`
                : `Choose a model for your ${selectedBrand?.name}.`}
          </p>
        </div>
        <SelectionSummary
          brand={selectedBrand}
          model={selectedModel}
          isSelectingBrand={isSelectingBrand}
          onToggleBrandSelection={() => {
            setIsSelectingBrand((selecting) => !selecting)
          }}
        />
      </div>

      {showBrandOptions ? (
        <div
          role="radiogroup"
          aria-label={`${CATEGORY_LABELS[category]} brands`}
          className="grid grid-cols-1 content-start gap-4 md:grid-cols-3"
        >
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              selected={selectedBrandId === brand.id}
              onSelect={() => selectBrand(brand.id)}
              iconBg={iconBg}
              iconText={iconText}
            />
          ))}
        </div>
      ) : (
        <div
          role="radiogroup"
          aria-label={`${selectedBrand.name} models`}
          className="grid grid-cols-1 content-start gap-4 md:grid-cols-3"
        >
          {modelOptions.map((model) => (
            <SelectionCard
              key={model.id}
              label={model.name}
              icon={CATEGORY_DEVICE_ICONS[category]}
              iconBg={iconBg}
              iconText={iconText}
              isSelected={selectedModelId === model.id}
              onSelect={() => selectModel(model.id)}
            />
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Brand metrics and model options are sample data for this device
        category.
      </p>
    </div>
  )
}
