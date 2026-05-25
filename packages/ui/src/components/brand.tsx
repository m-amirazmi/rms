import { StorefrontIcon } from "@phosphor-icons/react"
import { cn } from "@workspace/ui/lib/utils"

interface BrandProps {
  className?: string
  variant?: "default" | "compact"
}

export function Brand({ className, variant = "default" }: BrandProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15">
        <StorefrontIcon className="size-5 text-primary" weight="fill" />
      </div>
      {variant === "default" && (
        <span className="font-heading text-lg font-semibold tracking-wide">
          Baiki POS
        </span>
      )}
    </div>
  )
}
