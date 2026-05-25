import { createFileRoute, redirect } from "@tanstack/react-router"

import { WizardShell } from "@/components/wizard-shell"
import { WizardBreadcrumb } from "@/components/wizard-breadcrumb"

/**
 * Pathless layout for all wizard (repair-intake) routes.
 *
 * Guards:
 *   - If no staff session exists in localStorage, redirect to /select-staff.
 *
 * Renders:
 *   - WizardShell wrapping <Outlet />.
 */
export const Route = createFileRoute("/(wizard)/_layout")({
  beforeLoad: () => {
    const staffId = localStorage.getItem("rms_staff_id")

    if (!staffId) {
      throw redirect({ to: "/select-staff" })
    }
  },
  component: () => (
    <WizardShell
      desktopBreadcrumb={<WizardBreadcrumb />}
      mobileBreadcrumb={<WizardBreadcrumb />}
    />
  ),
})
