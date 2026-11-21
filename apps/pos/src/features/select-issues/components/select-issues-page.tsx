import { useState } from "react"

import {
  BatteryCharging,
  Camera,
  Check,
  DeviceMobile,
  Drop,
  Info,
  Plug,
  SpeakerHigh,
  WifiHigh,
  X,
} from "@phosphor-icons/react"
import { Button } from "@workspace/ui/components/button"
import { useNavigate } from "@tanstack/react-router"

import { useWizardStore } from "@/features/wizard"

const ISSUE_OPTIONS = [
  { label: "Display / Screen", icon: <DeviceMobile weight="duotone" /> },
  { label: "Battery", icon: <BatteryCharging weight="duotone" /> },
  { label: "Charging Port", icon: <Plug weight="duotone" /> },
  { label: "Audio", icon: <SpeakerHigh weight="duotone" /> },
  { label: "Camera", icon: <Camera weight="duotone" /> },
  { label: "Network", icon: <WifiHigh weight="duotone" /> },
  { label: "Water Damage", icon: <Drop weight="duotone" /> },
  { label: "Other", icon: <Info weight="duotone" /> },
]

export function SelectIssuesPage() {
  const navigate = useNavigate()
  const [showDiagnosticsNote, setShowDiagnosticsNote] = useState(true)
  const selectedIssues = useWizardStore(
    (state) => state.formData.issues?.issues ?? []
  )
  const issueNotes = useWizardStore(
    (state) => state.formData.issues?.issueNotes ?? ""
  )
  const selectedModel = useWizardStore(
    (state) => state.formData["brand-model"]?.model
  )
  const updateFormData = useWizardStore((state) => state.updateFormData)

  const toggleIssue = (issue: string) => {
    const issues = selectedIssues.includes(issue)
      ? selectedIssues.filter((selected) => selected !== issue)
      : [...selectedIssues, issue]

    updateFormData("issues", { issues })
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Device Diagnostics
        </h1>
        <p className="text-sm text-muted-foreground">
          Select all issues reported by the customer and found during
          inspection.
        </p>
      </header>

      {showDiagnosticsNote && (
        <div
          role="note"
          className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm"
        >
          <Info
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-primary"
            weight="fill"
          />
          <p className="flex-1 text-foreground">
            Inspect the device with the customer present. Select all visible and
            reported issues.
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Dismiss diagnostics note"
            onClick={() => setShowDiagnosticsNote(false)}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      )}

      {selectedModel && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Customer Issues</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/select-brand-model" })}
            aria-label={`Change device model from ${selectedModel}`}
          >
            <DeviceMobile aria-hidden="true" />
            <span>{selectedModel}</span>
            <X aria-hidden="true" />
          </Button>
        </div>
      )}

      <fieldset className="flex flex-col gap-3">
        {!selectedModel && (
          <legend className="text-base font-semibold">Customer Issues</legend>
        )}
        {selectedModel && <legend className="sr-only">Customer Issues</legend>}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {ISSUE_OPTIONS.map(({ label, icon }) => {
            const isSelected = selectedIssues.includes(label)

            return (
              <button
                key={label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleIssue(label)}
                className={`flex min-h-[72px] items-center gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/30"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/30 text-secondary-foreground [&_svg]:size-6"
                >
                  {icon}
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium">
                  {label}
                </span>
                {isSelected && (
                  <Check
                    aria-hidden="true"
                    className="size-5 shrink-0"
                    weight="bold"
                  />
                )}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="issue-notes"
          className="text-sm font-semibold text-foreground"
        >
          Other Issue / Specific Notes
        </label>
        <textarea
          id="issue-notes"
          value={issueNotes}
          onChange={(event) =>
            updateFormData("issues", { issueNotes: event.target.value })
          }
          placeholder="Describe additional issues here..."
          rows={4}
          className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        />
      </div>
    </div>
  )
}
