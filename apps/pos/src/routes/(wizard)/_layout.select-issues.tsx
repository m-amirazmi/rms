import { createFileRoute } from "@tanstack/react-router"
import { SelectIssuesPage } from "@/features/select-issues"

export const Route = createFileRoute("/(wizard)/_layout/select-issues")({
  component: SelectIssuesPage,
})
