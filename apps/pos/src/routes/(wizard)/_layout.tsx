import { createFileRoute } from "@tanstack/react-router"

import { WizardShell } from "@/components/wizard-shell"
import { WizardBreadcrumb } from "@/components/wizard-breadcrumb"

/**
 * Pathless layout for all wizard (repair-intake) routes.
 *
 * Renders:
 *   - WizardShell wrapping <Outlet />.
 */
export const Route = createFileRoute("/(wizard)/_layout")({
  component: () => (
    <WizardShell
      breadcrumb={<WizardBreadcrumb />}
    />
  ),
})
