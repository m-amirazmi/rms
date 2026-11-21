// Feature: Wizard
//
// Shared state for the 6-step repair-intake wizard.
// Tracks step progress, accumulates form data, and provides route mappings.
//
// Usage:
//   import {
//     useWizardStore,
//     WIZARD_STEPS,
//     WIZARD_STEP_ROUTES,
//     type WizardStep,
//     type WizardFormData,
//   } from "@/features/wizard"

export {
  useWizardStore,
  WIZARD_STEPS,
  WIZARD_STEP_ROUTES,
  getFirstIncompleteWizardStep,
  getWizardStepPath,
  isWizardStepComplete,
  calculateRepairTotals,
  LABOUR_FEE,
  SALES_TAX_RATE,
} from "./wizard-store"
export type {
  CustomerSelection,
  DeviceCategory,
  JobSubmission,
  SelectedPart,
  TechnicianSelection,
  WizardStep,
  WizardFormData,
  WizardStepRoute,
} from "./wizard-store"
