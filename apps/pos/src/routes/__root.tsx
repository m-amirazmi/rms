import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import "@workspace/ui/globals.css"

const RootLayout = () => (
  <div className="flex h-screen w-screen flex-col">
    <Outlet />
    <TanStackRouterDevtools />
  </div>
)

export const Route = createRootRoute({ component: RootLayout })
