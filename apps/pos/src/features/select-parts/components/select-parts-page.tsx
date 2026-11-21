import { useState } from "react"

import { MagnifyingGlass, Minus, Plus } from "@phosphor-icons/react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import {
  calculateRepairTotals,
  type SelectedPart,
  useWizardStore,
} from "@/features/wizard"

const EMPTY_PARTS: SelectedPart[] = []

const PART_OPTIONS: SelectedPart[] = [
  {
    id: "screen-iphone-16",
    name: "iPhone 16 Pro Screen",
    sku: "SCR-IP16P",
    unitPrice: 320,
    quantity: 0,
    stock: 4,
    compatibility: "iPhone 16 Pro",
  },
  {
    id: "battery-iphone-16",
    name: "iPhone 16 Battery",
    sku: "BAT-IP16",
    unitPrice: 85,
    quantity: 0,
    stock: 7,
    compatibility: "iPhone 16",
  },
  {
    id: "usb-c-port",
    name: "USB-C Port Module",
    sku: "PRT-USBC",
    unitPrice: 45,
    quantity: 0,
    stock: 2,
    compatibility: "Universal",
  },
  {
    id: "camera-module",
    name: "Rear Camera Module",
    sku: "CAM-R16",
    unitPrice: 0,
    quantity: 0,
    stock: 0,
    compatibility: "iPhone 16",
  },
]

const formatCurrency = (value: number) => `RM ${value.toFixed(2)}`

export function SelectPartsPage() {
  const [query, setQuery] = useState("")
  const selectedParts = useWizardStore(
    (state) => state.formData.parts?.parts ?? EMPTY_PARTS
  )
  const updateFormData = useWizardStore((state) => state.updateFormData)
  const totals = calculateRepairTotals(selectedParts)
  const normalizedQuery = query.trim().toLowerCase()
  const matchingParts = PART_OPTIONS.filter(
    (part) =>
      part.name.toLowerCase().includes(normalizedQuery) ||
      part.sku.toLowerCase().includes(normalizedQuery)
  )

  const updateParts = (parts: SelectedPart[]) =>
    updateFormData("parts", { parts })

  const addPart = (part: SelectedPart) => {
    const existing = selectedParts.find((selected) => selected.id === part.id)
    if (existing?.quantity === part.stock || part.stock === 0) return

    updateParts(
      existing
        ? selectedParts.map((selected) =>
            selected.id === part.id
              ? { ...selected, quantity: selected.quantity + 1 }
              : selected
          )
        : [...selectedParts, { ...part, quantity: 1 }]
    )
  }

  const changeQuantity = (partId: string, quantity: number) => {
    const part = selectedParts.find((selected) => selected.id === partId)
    if (!part) return

    updateParts(
      quantity <= 0
        ? selectedParts.filter((selected) => selected.id !== partId)
        : selectedParts.map((selected) =>
            selected.id === partId
              ? { ...selected, quantity: Math.min(quantity, selected.stock) }
              : selected
          )
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Select Parts
        </h1>
        <p className="text-sm text-muted-foreground">
          Add the parts needed for this repair. At least one part is required.
        </p>
      </header>

      <label className="relative block">
        <MagnifyingGlass
          aria-hidden="true"
          className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search parts or SKU"
          aria-label="Search parts or SKU"
          className="pl-9"
        />
      </label>

      <section aria-labelledby="available-parts-heading">
        <h2
          id="available-parts-heading"
          className="mb-3 text-base font-semibold"
        >
          Available Parts
        </h2>
        <div className="overflow-hidden rounded-lg border border-border">
          {matchingParts.length ? (
            matchingParts.map((part) => {
              const quantity =
                selectedParts.find((selected) => selected.id === part.id)
                  ?.quantity ?? 0
              const unavailable = part.stock === 0
              const limitReached = quantity >= part.stock

              return (
                <div
                  key={part.id}
                  className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 last:border-b-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{part.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {part.sku} · {part.compatibility} · Stock: {part.stock}
                    </p>
                  </div>
                  <span className="font-mono text-sm">
                    {formatCurrency(part.unitPrice)}
                  </span>
                  <Button
                    type="button"
                    variant={quantity ? "secondary" : "outline"}
                    size="sm"
                    disabled={unavailable || limitReached}
                    onClick={() => addPart(part)}
                    aria-label={
                      unavailable
                        ? `${part.name} out of stock`
                        : `Add ${part.name}`
                    }
                  >
                    <Plus aria-hidden="true" />
                    {unavailable
                      ? "Out of stock"
                      : limitReached
                        ? `Max ${part.stock}`
                        : quantity
                          ? `Added (${quantity})`
                          : "Add"}
                  </Button>
                </div>
              )
            })
          ) : (
            <p className="p-4 text-sm text-muted-foreground">
              No parts match “{query}”.
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="selected-parts-heading">
        <h2
          id="selected-parts-heading"
          className="mb-3 text-base font-semibold"
        >
          Selected Parts
        </h2>
        <div className="overflow-hidden rounded-lg border border-border">
          {selectedParts.length ? (
            <>
              {selectedParts.map((part) => (
                <div
                  key={part.id}
                  className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 last:border-b-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{part.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(part.unitPrice)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label={`Remove one ${part.name}`}
                      onClick={() => changeQuantity(part.id, part.quantity - 1)}
                    >
                      <Minus aria-hidden="true" />
                    </Button>
                    <span
                      className="min-w-6 text-center font-mono"
                      aria-label={`Quantity ${part.quantity}`}
                    >
                      {part.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={part.quantity >= part.stock}
                      aria-label={`Add one ${part.name}`}
                      onClick={() => changeQuantity(part.id, part.quantity + 1)}
                    >
                      <Plus aria-hidden="true" />
                    </Button>
                  </div>
                  <span className="w-28 text-right font-mono text-sm">
                    {formatCurrency(part.unitPrice * part.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between bg-muted/40 p-4 font-medium">
                <span>Parts subtotal</span>
                <span className="font-mono">
                  {formatCurrency(totals.partsSubtotal)}
                </span>
              </div>
            </>
          ) : (
            <p className="p-4 text-sm text-muted-foreground">
              No parts selected yet.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
