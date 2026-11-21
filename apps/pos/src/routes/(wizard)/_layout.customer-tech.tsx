import { createFileRoute, redirect } from "@tanstack/react-router"
import { CustomerTechPage } from "@/features/customer-tech"
import {
  getFirstIncompleteWizardStep,
  getWizardStepPath,
  useWizardStore,
} from "@/features/wizard"

export const Route = createFileRoute("/(wizard)/_layout/customer-tech")({
  beforeLoad: () => {
    const incompleteStep = getFirstIncompleteWizardStep(
      "customer-tech",
      useWizardStore.getState().formData
    )
    if (incompleteStep) {
      throw redirect({ to: getWizardStepPath(incompleteStep) })
    }
  },
  component: CustomerTechPage,
})
