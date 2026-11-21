import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WizardStep =
  | "category"
  | "brand-model"
  | "issues"
  | "parts"
  | "customer-tech"
  | "summary"

export type DeviceCategory =
  | "smartphone"
  | "laptop"
  | "tablet"
  | "wearable"
  | "console"
  | "other"

export interface SelectedPart {
  id: string
  name: string
  sku: string
  unitPrice: number
  quantity: number
  stock: number
  compatibility: string
}

export const LABOUR_FEE = 80
export const SALES_TAX_RATE = 0.06

export function calculateRepairTotals(parts: SelectedPart[] = []) {
  const partsSubtotal = parts.reduce(
    (total, part) => total + part.unitPrice * part.quantity,
    0
  )
  const subtotal = partsSubtotal + LABOUR_FEE
  const tax = subtotal * SALES_TAX_RATE

  return {
    partsSubtotal,
    labourFee: LABOUR_FEE,
    subtotal,
    tax,
    grandTotal: subtotal + tax,
  }
}

export interface CustomerSelection {
  id: string
  fullName: string
  phone: string
  email?: string
  notes?: string
  previousRepairs: number
  isNew: boolean
}

export interface TechnicianSelection {
  id: string
  name: string
  role: string
  activeJobs: number
  availability: "available" | "busy" | "unavailable"
}

export const WIZARD_STEPS: WizardStep[] = [
  "category",
  "brand-model",
  "issues",
  "parts",
  "customer-tech",
  "summary",
]

export interface WizardStepRoute {
  step: WizardStep
  path: string
}

export const WIZARD_STEP_ROUTES: WizardStepRoute[] = [
  { step: "category", path: "/select-category" },
  { step: "brand-model", path: "/select-brand-model" },
  { step: "issues", path: "/select-issues" },
  { step: "parts", path: "/select-parts" },
  { step: "customer-tech", path: "/customer-tech" },
  { step: "summary", path: "/repair-summary" },
]

export interface WizardFormData {
  category?: DeviceCategory
  brand?: string
  brandName?: string
  model?: string
  modelName?: string
  issues?: string[]
  issueNotes?: string
  parts?: SelectedPart[]
  customer?: CustomerSelection
  technician?: TechnicianSelection
  customerName?: string
  technicianName?: string
}

export type JobSubmission =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; jobId: string }

interface WizardState {
  /** Index of the currently active step (0-based) */
  currentStepIndex: number
  /** Accumulated form data keyed by step */
  formData: Partial<Record<WizardStep, WizardFormData>>
  /** Submission state is intentionally not persisted with the draft. */
  submission: JobSubmission

  // --- actions ---
  /** Jump to a specific step index */
  setStep: (index: number) => void
  /** Advance one step (clamped to max) */
  nextStep: () => void
  /** Go back one step (clamped to min) */
  prevStep: () => void
  /** Merge form data for a given step */
  updateFormData: (step: WizardStep, data: Partial<WizardFormData>) => void
  /** Create a frontend-only repair job result. */
  createMockJob: () => void
  /** Reset the entire wizard to initial state */
  resetWizard: () => void
}

export function isWizardStepComplete(
  step: WizardStep,
  formData: Partial<Record<WizardStep, WizardFormData>>
): boolean {
  switch (step) {
    case "category":
      return Boolean(formData.category?.category)
    case "brand-model":
      return Boolean(
        formData["brand-model"]?.brand && formData["brand-model"]?.model
      )
    case "issues":
      return Boolean(
        formData.issues?.issues?.length || formData.issues?.issueNotes?.trim()
      )
    case "parts":
      return Boolean(formData.parts?.parts?.some((part) => part.quantity > 0))
    case "customer-tech":
      return Boolean(
        formData["customer-tech"]?.customer &&
        formData["customer-tech"]?.technician
      )
    case "summary":
      return WIZARD_STEPS.slice(0, -1).every((priorStep) =>
        isWizardStepComplete(priorStep, formData)
      )
  }
}

export function getFirstIncompleteWizardStep(
  beforeStep: WizardStep,
  formData: Partial<Record<WizardStep, WizardFormData>>
): WizardStep | undefined {
  const beforeIndex = WIZARD_STEPS.indexOf(beforeStep)
  return WIZARD_STEPS.slice(0, beforeIndex).find(
    (step) => !isWizardStepComplete(step, formData)
  )
}

export function getWizardStepPath(step: WizardStep): string {
  return (
    WIZARD_STEP_ROUTES.find((route) => route.step === step)?.path ??
    "/select-category"
  )
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

/**
 * Global wizard state store — tracks the current repair-intake step and
 * accumulates form data across the 6-step wizard.
 *
 * Data is persisted to `sessionStorage` under the key `rms_wizard` so an
 * accidental refresh mid-intake does not lose progress within the tab session.
 *
 * Usage:
 * ```ts
 * const step = useWizardStore((s) => s.currentStepIndex)
 * const next = useWizardStore((s) => s.nextStep)
 * ```
 */
export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      currentStepIndex: 0,
      formData: {},
      submission: { status: "idle" },

      setStep: (index) =>
        set({
          currentStepIndex: Math.max(
            0,
            Math.min(index, WIZARD_STEPS.length - 1)
          ),
        }),

      nextStep: () => {
        const { currentStepIndex } = get()
        set({
          currentStepIndex: Math.min(
            currentStepIndex + 1,
            WIZARD_STEPS.length - 1
          ),
        })
      },

      prevStep: () => {
        const { currentStepIndex } = get()
        set({ currentStepIndex: Math.max(currentStepIndex - 1, 0) })
      },

      updateFormData: (step, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [step]: { ...state.formData[step], ...data },
          },
        })),

      createMockJob: () => {
        if (
          get().submission.status !== "idle" ||
          !isWizardStepComplete("summary", get().formData)
        ) {
          return
        }

        set({ submission: { status: "submitting" } })
        setTimeout(() => {
          if (get().submission.status === "submitting") {
            set({
              submission: {
                status: "success",
                jobId: `RJ-${Date.now()}`,
              },
            })
          }
        }, 500)
      },

      resetWizard: () =>
        set({
          currentStepIndex: 0,
          formData: {},
          submission: { status: "idle" },
        }),
    }),
    {
      name: "rms_wizard",
      storage: createJSONStorage(() => sessionStorage),
      /**
       * Persist draft progress but never an in-flight/successful submission.
       */
      partialize: (state) => ({
        currentStepIndex: state.currentStepIndex,
        formData: state.formData,
      }),
    }
  )
)
