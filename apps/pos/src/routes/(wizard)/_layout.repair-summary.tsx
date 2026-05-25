import { createFileRoute } from "@tanstack/react-router"
import { RepairSummaryPage } from "@/features/repair-summary"

export const Route = createFileRoute("/(wizard)/_layout/repair-summary")({
  component: RepairSummaryPage,
})
