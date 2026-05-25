import { createFileRoute } from "@tanstack/react-router"
import { SelectPartsPage } from "@/features/select-parts"

export const Route = createFileRoute("/(wizard)/_layout/select-parts")({
  component: SelectPartsPage,
})
