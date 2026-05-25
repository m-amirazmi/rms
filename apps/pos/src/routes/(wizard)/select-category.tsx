import { createFileRoute } from "@tanstack/react-router"
import { SelectCategoryPage } from "@/features/select-category"

export const Route = createFileRoute("/(wizard)/select-category")({
  component: SelectCategoryPage,
})
