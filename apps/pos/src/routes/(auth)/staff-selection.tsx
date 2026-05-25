import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)/staff-selection")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <h1 className="text-2xl font-heading font-semibold text-foreground">
        Staff Selection
      </h1>
    </div>
  )
}
