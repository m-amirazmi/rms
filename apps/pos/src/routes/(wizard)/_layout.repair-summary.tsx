import { createFileRoute, redirect } from "@tanstack/react-router"
import { RepairSummaryPage } from "@/features/repair-summary"
import {
  getFirstIncompleteWizardStep,
  getWizardStepPath,
  useWizardStore,
} from "@/features/wizard"

export const Route = createFileRoute("/(wizard)/_layout/repair-summary")({
  beforeLoad: () => {
    const incompleteStep = getFirstIncompleteWizardStep(
      "summary",
      useWizardStore.getState().formData
    )
    if (incompleteStep) {
      throw redirect({ to: getWizardStepPath(incompleteStep) })
    }
  },
  component: RepairSummaryPage,
})
