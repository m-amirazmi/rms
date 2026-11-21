import { createFileRoute, redirect } from "@tanstack/react-router"
import { SelectIssuesPage } from "@/features/select-issues"
import {
  getFirstIncompleteWizardStep,
  getWizardStepPath,
  useWizardStore,
} from "@/features/wizard"

export const Route = createFileRoute("/(wizard)/_layout/select-issues")({
  beforeLoad: () => {
    const incompleteStep = getFirstIncompleteWizardStep(
      "issues",
      useWizardStore.getState().formData
    )
    if (incompleteStep) {
      throw redirect({ to: getWizardStepPath(incompleteStep) })
    }
  },
  component: SelectIssuesPage,
})
