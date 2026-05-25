import { StorefrontIcon } from "@phosphor-icons/react"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

interface AuthTopbarProps {
  className?: string
}

export default function AuthTopbar({ className }: AuthTopbarProps) {
  return (
    <header
      className={cn(
        "flex h-16 w-full shrink-0 items-center justify-between border-b border-foreground px-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15">
          <StorefrontIcon className="size-5 text-primary" weight="fill" />
        </div>
        <span className="font-heading text-lg font-semibold tracking-wide">
          RepairFlow POS
        </span>
      </div>

      <Badge variant="outline">KL Branch</Badge>
    </header>
  )
}
