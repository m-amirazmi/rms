import { createFileRoute, redirect } from "@tanstack/react-router"
import { SelectPartsPage } from "@/features/select-parts"
import {
  getFirstIncompleteWizardStep,
  getWizardStepPath,
  useWizardStore,
} from "@/features/wizard"

export const Route = createFileRoute("/(wizard)/_layout/select-parts")({
  beforeLoad: () => {
    const incompleteStep = getFirstIncompleteWizardStep(
      "parts",
      useWizardStore.getState().formData
    )
    if (incompleteStep) {
      throw redirect({ to: getWizardStepPath(incompleteStep) })
    }
  },
  component: SelectPartsPage,
})
