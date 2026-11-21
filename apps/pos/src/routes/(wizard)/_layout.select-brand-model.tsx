import { createFileRoute, redirect } from "@tanstack/react-router"
import { SelectBrandModelPage } from "@/features/select-brand-model"
import {
  getFirstIncompleteWizardStep,
  getWizardStepPath,
  useWizardStore,
} from "@/features/wizard"

export const Route = createFileRoute("/(wizard)/_layout/select-brand-model")({
  beforeLoad: () => {
    const formData = useWizardStore.getState().formData
    const incompleteStep = getFirstIncompleteWizardStep("brand-model", formData)

    if (incompleteStep) {
      throw redirect({ to: getWizardStepPath(incompleteStep) })
    }
  },
  component: SelectBrandModelPage,
})
