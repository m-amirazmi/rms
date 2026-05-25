import { createFileRoute } from "@tanstack/react-router"
import { SelectCategoryPage } from "@/features/select-category"

export const Route = createFileRoute("/(wizard)/_layout/select-category")({
  component: SelectCategoryPage,
})
