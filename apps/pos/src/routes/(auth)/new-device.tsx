import { createFileRoute } from "@tanstack/react-router"
import { NewDevicePage } from "@/features/new-device"

export const Route = createFileRoute("/(auth)/new-device")({
  component: NewDevicePage,
})
