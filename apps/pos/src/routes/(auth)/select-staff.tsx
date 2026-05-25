import { createFileRoute } from "@tanstack/react-router"
import { SelectStaffPage } from "@/features/select-staff"

export const Route = createFileRoute("/(auth)/select-staff")({
  component: SelectStaffPage,
})
