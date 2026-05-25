import { create } from "zustand"
import { persist } from "zustand/middleware"

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
  category?: string
  brand?: string
  model?: string
  issues?: string[]
  parts?: string[]
  customerName?: string
  technicianName?: string
}

interface WizardState {
  /** Index of the currently active step (0-based) */
  currentStepIndex: number
  /** Accumulated form data keyed by step */
  formData: Partial<Record<WizardStep, WizardFormData>>

  // --- actions ---
  /** Jump to a specific step index */
  setStep: (index: number) => void
  /** Advance one step (clamped to max) */
  nextStep: () => void
  /** Go back one step (clamped to min) */
  prevStep: () => void
  /** Merge form data for a given step */
  updateFormData: (step: WizardStep, data: Partial<WizardFormData>) => void
  /** Reset the entire wizard to initial state */
  resetWizard: () => void
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

/**
 * Global wizard state store — tracks the current repair-intake step and
 * accumulates form data across the 6-step wizard.
 *
 * Data is persisted to `localStorage` under the key `rms_wizard` so that
 * an accidental refresh mid-intake does not lose progress.
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

      resetWizard: () => set({ currentStepIndex: 0, formData: {} }),
    }),
    {
      name: "rms_wizard",
      /**
       * Only persist step progress and form data.
       */
      partialize: (state) => ({
        currentStepIndex: state.currentStepIndex,
        formData: state.formData,
      }),
    }
  )
)
