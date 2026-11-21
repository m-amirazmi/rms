import { createFileRoute, redirect } from "@tanstack/react-router"
import { SelectBrandModelPage } from "@/features/select-brand-model"
import { useWizardStore } from "@/features/wizard"

export const Route = createFileRoute("/(wizard)/_layout/select-brand-model")({
  beforeLoad: () => {
    if (!useWizardStore.getState().formData.category?.category) {
      throw redirect({ to: "/select-category" })
    }
  },
  component: SelectBrandModelPage,
})
