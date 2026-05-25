import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const alertVariants = cva(
  "relative flex w-full items-start gap-3 rounded-xl border p-4 text-sm shadow-sm",
  {
    variants: {
      variant: {
        default: "border-foreground bg-card text-foreground",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive dark:border-destructive/30 dark:bg-destructive/10",
        info: "border-primary/30 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/10",
        warning:
          "border-yellow-500/30 bg-yellow-500/10 text-yellow-500 dark:border-yellow-500/30 dark:bg-yellow-500/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 text-sm leading-none font-semibold tracking-wide",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 text-sm leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
