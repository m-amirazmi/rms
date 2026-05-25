import { createFileRoute } from "@tanstack/react-router"
import { CustomerTechPage } from "@/features/customer-tech"

export const Route = createFileRoute("/(wizard)/_layout/customer-tech")({
  component: CustomerTechPage,
})
