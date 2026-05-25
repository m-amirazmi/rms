import { createFileRoute } from "@tanstack/react-router"
import { SelectBrandModelPage } from "@/features/select-brand-model"

export const Route = createFileRoute("/(wizard)/_layout/select-brand-model")({
  component: SelectBrandModelPage,
})
