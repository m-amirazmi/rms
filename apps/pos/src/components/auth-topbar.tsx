import { Badge } from "@workspace/ui/components/badge"
import { Brand } from "@workspace/ui/components/brand"
import { cn } from "@workspace/ui/lib/utils"

interface AuthTopbarProps {
  className?: string
}

export default function AuthTopbar({ className }: AuthTopbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 w-full shrink-0 items-center justify-between border-b border-foreground bg-background px-4",
        className
      )}
    >
      <Brand />

      <Badge variant="outline">KL Branch</Badge>
    </header>
  )
}
