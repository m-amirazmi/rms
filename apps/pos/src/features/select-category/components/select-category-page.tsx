import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import {
  Clock,
  DeviceMobile,
  Devices,
  DeviceTablet,
  GameController,
  Laptop,
  Lightning,
  ShieldCheck,
  WarningIcon,
  Watch,
  X,
} from "@phosphor-icons/react"

import { Alert, AlertDescription } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { cn } from "@workspace/ui/lib/utils"

import { useWizardStore } from "@/features/wizard"
import { CATEGORIES } from "../constants"
import { CategorySchema, type CategoryFormInput } from "../schemas"
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

const URGENCY_OPTIONS = [
  {
    id: "standard" as const,
    label: "Standard",
    icon: <Clock className="size-4" />,
  },
  {
    id: "express" as const,
    label: "Express",
    icon: <Lightning className="size-4" />,
  },
  {
    id: "warranty" as const,
    label: "Warranty",
    icon: <ShieldCheck className="size-4" />,
  },
]

export function SelectCategoryPage() {
  const navigate = useNavigate()
  const updateFormData = useWizardStore((s) => s.updateFormData)
  const resetWizard = useWizardStore((s) => s.resetWizard)

  const existingCategory = useWizardStore((s) => s.formData.category)

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(CategorySchema),
    mode: "onChange",
    defaultValues: {
      category: undefined as unknown as DeviceCategory,
      urgency: (existingCategory?.urgency as CategoryFormInput["urgency"]) ?? "standard",
    },
  })

  // Sync default urgency into the wizard store on first load so the
  // summary panel reflects it immediately.
  useEffect(() => {
    if (!existingCategory?.urgency) {
      updateFormData("category", { urgency: "standard" })
    }
  }, [])

  const selectedCategory = form.watch("category")
  const [showBanner, setShowBanner] = useState(true)
  const [showDialog, setShowDialog] = useState(false)

  const handleSelectCategory = (category: DeviceCategory) => {
    form.setValue("category", category, { shouldValidate: true })
    updateFormData("category", { category })
  }

  const handleCancelIntake = () => {
    resetWizard()
    navigate({ to: "/select-staff" })
  }

  return (
    <div className="flex h-full flex-col gap-5">
      {/* Header — Cancel Intake aligned top-right */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-0.5">
          <h1 className="font-heading text-lg font-semibold tracking-wider text-foreground uppercase">
            New Repair Intake
          </h1>
          <p className="text-base text-muted-foreground">
            Select the device type to get started
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDialog(true)}
          className="shrink-0 gap-1.5 text-destructive hover:text-destructive/80"
        >
          <X className="size-4" weight="bold" />
          Cancel Intake
        </Button>
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
            isSelected={selectedCategory === cat.id}
            onSelect={() => handleSelectCategory(cat.id)}
          />
        ))}
      </div>

      {/* Urgency */}
      <Controller
        control={form.control}
        name="urgency"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">
              Repair urgency
            </span>
            <div className="flex flex-wrap gap-2">
              {URGENCY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    field.onChange(opt.id)
                    updateFormData("category", { urgency: opt.id })
                  }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
                    field.value === opt.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-foreground bg-card text-muted-foreground hover:border-primary/50 hover:bg-muted/30"
                  )}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      />

      {/* Inspection Fee Alert */}
      {showBanner && (
        <Alert variant="warning">
          <WarningIcon className="size-5 shrink-0 text-accent" weight="fill" />
          <div className="flex flex-1 flex-col gap-0.5">
            <AlertDescription className="text-sm font-semibold text-foreground">
              Standard Inspection Fee — RM 30.00
            </AlertDescription>
            <p className="text-sm text-muted-foreground">
              Applies to all new intakes. Waived if repair proceeds. Reflected
              in final estimate.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Dismiss inspection fee notice"
          >
            <X className="size-4" />
          </button>
        </Alert>
      )}

      {/* Discard Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Intake?</DialogTitle>
            <DialogDescription>
              This will discard the current repair intake and return you to the
              staff selector. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Stay</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleCancelIntake}>
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
