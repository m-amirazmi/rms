import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const deviceId = localStorage.getItem("rms_device_id")
    const deviceSession = localStorage.getItem("rms_device_session")

    if (deviceId && deviceSession) {
      throw redirect({ to: "/select-staff" })
    }

    throw redirect({ to: "/new-device" })
  },
})
