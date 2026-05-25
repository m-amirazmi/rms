import { createRootRoute, Outlet } from "@tanstack/react-router"
import "@workspace/ui/globals.css"

const RootLayout = () => (
  <div className="flex h-screen w-screen flex-col">
    <Outlet />
  </div>
)

export const Route = createRootRoute({ component: RootLayout })
