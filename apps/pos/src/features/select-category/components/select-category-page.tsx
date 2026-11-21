import { useNavigate } from "@tanstack/react-router"

import {
  DeviceMobile,
  Devices,
  DeviceTablet,
  GameController,
  Laptop,
  Watch,
} from "@phosphor-icons/react"

import { useWizardStore } from "@/features/wizard"
import { CATEGORIES } from "../constants"
import type { DeviceCategory } from "../types"
import { CategoryCard } from "./category-card"

const ICON_MAP: Record<DeviceCategory, React.ReactNode> = {
  smartphone: <DeviceMobile weight="duotone" />,
  laptop: <Laptop weight="duotone" />,
  tablet: <DeviceTablet weight="duotone" />,
  wearable: <Watch weight="duotone" />,
  console: <GameController weight="duotone" />,
  other: <Devices weight="duotone" />,
}

export function SelectCategoryPage() {
  const navigate = useNavigate()
  const updateFormData = useWizardStore((s) => s.updateFormData)
  const setStep = useWizardStore((s) => s.setStep)

  const existingCategory = useWizardStore((s) => s.formData.category?.category)

  const handleSelectCategory = (category: DeviceCategory) => {
    updateFormData("category", { category })
    if (existingCategory !== category) {
      updateFormData("brand-model", {
        brand: undefined,
        brandName: undefined,
        model: undefined,
        modelName: undefined,
      })
      updateFormData("parts", { parts: [] })
    }
    setStep(1)
    navigate({ to: "/select-brand-model" })
  }

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="space-y-0.5">
          <h1 className="font-heading text-lg font-semibold tracking-wider text-foreground uppercase">
            New Repair Intake
          </h1>
          <p className="text-base text-muted-foreground">
            Select the device type to get started
          </p>
        </div>
      </div>

      {/* Category Grid */}
      <div
        className="grid grid-cols-1 content-start items-stretch gap-4 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Device categories"
      >
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            label={cat.label}
            description={cat.description}
            icon={ICON_MAP[cat.id]}
            iconBg={cat.iconBg}
            iconText={cat.iconText}
            modelCount={cat.modelCount}
            avgRepairTime={cat.avgRepairTime}
            dailyIntakes={cat.dailyIntakes}
            tag={cat.tag}
            popularBrands={cat.popularBrands}
            priceFrom={cat.priceFrom}
            isSelected={existingCategory === cat.id}
            onSelect={() => handleSelectCategory(cat.id)}
          />
        ))}
      </div>
    </div>
  )
}
