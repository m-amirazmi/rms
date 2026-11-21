import { useNavigate } from "@tanstack/react-router"

import { CheckCircle, DeviceMobile } from "@phosphor-icons/react"
import { QRCodeSVG } from "qrcode.react"

import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"

import {
  calculateRepairTotals,
  type SelectedPart,
  useWizardStore,
} from "@/features/wizard"

const EMPTY_ISSUES: string[] = []
const EMPTY_PARTS: SelectedPart[] = []
const WHATSAPP_NUMBER = "601119821105"
const WHATSAPP_CONSENT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("YES")}`

const formatCurrency = (value: number) => `RM ${value.toFixed(2)}`

export function RepairSummaryPage() {
  const navigate = useNavigate()
  const category = useWizardStore((state) => state.formData.category?.category)
  const brandModel = useWizardStore((state) => state.formData["brand-model"])
  const issues = useWizardStore(
    (state) => state.formData.issues?.issues ?? EMPTY_ISSUES
  )
  const issueNotes = useWizardStore((state) =>
    state.formData.issues?.issueNotes?.trim()
  )
  const parts = useWizardStore(
    (state) => state.formData.parts?.parts ?? EMPTY_PARTS
  )
  const customerTech = useWizardStore(
    (state) => state.formData["customer-tech"]
  )
  const submission = useWizardStore((state) => state.submission)
  const resetWizard = useWizardStore((state) => state.resetWizard)
  const totals = calculateRepairTotals(parts)

  const startNewIntake = () => {
    resetWizard()
    navigate({ to: "/select-category" })
  }

  if (submission.status === "success") {
    return (
      <section
        aria-labelledby="job-created-heading"
        className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 rounded-xl border border-primary/30 bg-card p-6 text-center sm:p-10"
      >
        <CheckCircle
          aria-hidden="true"
          className="size-16 text-primary"
          weight="fill"
        />
        <div className="space-y-2">
          <h1
            id="job-created-heading"
            className="font-heading text-2xl font-semibold"
          >
            Repair Job Created
          </h1>
          <p className="text-muted-foreground">
            The frontend demo has created a mock repair job.
          </p>
        </div>
        <p className="rounded-md bg-muted px-4 py-2 font-mono text-lg">
          {submission.jobId}
        </p>
        <section
          aria-labelledby="whatsapp-updates-heading"
          className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg border border-border bg-card p-5"
        >
          <div className="space-y-1">
            <h2
              id="whatsapp-updates-heading"
              className="font-heading text-lg font-semibold"
            >
              Get WhatsApp Repair Updates
            </h2>
            <p className="text-sm text-muted-foreground">
              Please reply Y / YES to receive WhatsApp updates on your repair
              progress.
            </p>
          </div>
          <a
            href={WHATSAPP_CONSENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open WhatsApp and send YES to opt in to repair updates"
            className="rounded-md bg-white p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <QRCodeSVG value={WHATSAPP_CONSENT_URL} size={176} level="M" />
          </a>
          <div className="space-y-1 text-sm">
            <p>
              Scan to open WhatsApp with <span className="font-semibold">YES</span>{" "}
              ready to send.
            </p>
            <p className="text-muted-foreground">
              WhatsApp: +{WHATSAPP_NUMBER}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Demo only — repair updates are not sent by this mock.
          </p>
        </section>
        <Button size="lg" onClick={startNewIntake}>
          Start New Repair Intake
        </Button>
      </section>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Final Invoice
        </h1>
        <p className="text-sm text-muted-foreground">
          Review the intake details and estimated charges before creating the
          repair job.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section
          aria-labelledby="repair-details-heading"
          className="flex flex-col gap-5 rounded-lg border border-border bg-card p-4 sm:p-6"
        >
          <h2 id="repair-details-heading" className="text-lg font-semibold">
            Repair Details
          </h2>
          <div className="flex items-start gap-3">
            <DeviceMobile
              aria-hidden="true"
              className="mt-0.5 size-5 text-muted-foreground"
            />
            <div>
              <p className="font-medium">
                {[brandModel?.brandName, brandModel?.modelName]
                  .filter(Boolean)
                  .join(" ") || "Device"}
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {category ?? "Category not selected"}
              </p>
            </div>
          </div>

          <Separator />

          <section aria-labelledby="invoice-parts-heading">
            <h3 id="invoice-parts-heading" className="mb-3 font-semibold">
              Parts
            </h3>
            <div className="flex flex-col gap-3">
              {parts.map((part) => (
                <div
                  key={part.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span>
                    {part.name}{" "}
                    <span className="text-muted-foreground">
                      × {part.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono">
                    {formatCurrency(part.unitPrice * part.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-medium">
                <span>Parts subtotal</span>
                <span className="font-mono">
                  {formatCurrency(totals.partsSubtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Labour fee</span>
                <span className="font-mono">
                  {formatCurrency(totals.labourFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-mono">
                  {formatCurrency(totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (6% SST)</span>
                <span className="font-mono">{formatCurrency(totals.tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Grand Total</span>
                <span className="font-mono">
                  {formatCurrency(totals.grandTotal)}
                </span>
              </div>
            </div>
          </section>
        </section>

        <aside className="flex flex-col gap-5 rounded-lg border border-border bg-card p-4 sm:p-6">
          <section aria-labelledby="issues-heading">
            <h2 id="issues-heading" className="font-semibold">
              Reported Issues
            </h2>
            {issues.length || issueNotes ? (
              <ul className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                {issues.map((issue) => (
                  <li key={issue}>• {issue}</li>
                ))}
                {issueNotes && <li>Notes: {issueNotes}</li>}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">None</p>
            )}
          </section>
          <Separator />
          <section aria-labelledby="assignment-heading">
            <h2 id="assignment-heading" className="font-semibold">
              Assignment
            </h2>
            <dl className="mt-2 flex flex-col gap-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Customer</dt>
                <dd className="text-right font-medium">
                  {customerTech?.customer?.fullName ?? "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Technician</dt>
                <dd className="text-right font-medium">
                  {customerTech?.technician?.name ?? "—"}
                </dd>
              </div>
            </dl>
          </section>
          {submission.status === "submitting" && (
            <p role="status" className="text-sm text-muted-foreground">
              Creating repair job…
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}
