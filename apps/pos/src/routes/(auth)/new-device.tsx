import { useRef, useCallback, useEffect, useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

const PairingCodeSchema = z.object({
  pin: z
    .string()
    .length(6, { message: "Pairing code must be 6 digits" })
    .regex(/^\d{6}$/, {
      message: "Pairing code must contain only numbers",
    }),
})

type PairingCodeInput = z.infer<typeof PairingCodeSchema>

/* ------------------------------------------------------------------ */
/*  Mock API                                                           */
/* ------------------------------------------------------------------ */

async function validatePairingCode(pin: string) {
  await new Promise((r) => setTimeout(r, 800))
  if (pin === "123456") {
    return {
      success: true as const,
      outletName: "KL Branch",
      outletId: "out_456",
    }
  }
  return { success: false as const }
}

/* ------------------------------------------------------------------ */
/*  Route                                                              */
/* ------------------------------------------------------------------ */

export const Route = createFileRoute("/(auth)/new-device")({
  component: RouteComponent,
})

const PIN_LENGTH = 6
const GROUP_SIZE = 3

function RouteComponent() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<PairingCodeInput>({
    resolver: zodResolver(PairingCodeSchema),
    defaultValues: { pin: "" },
    mode: "onSubmit",
  })

  /* Focus helpers ---------------------------------------------------- */
  const focusInput = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, PIN_LENGTH - 1))
    inputRefs.current[clamped]?.focus()
  }, [])

  /* Auto-clear after error ------------------------------------------ */
  useEffect(() => {
    if (errors.pin) {
      const timer = setTimeout(() => {
        clearErrors("pin")
        setValue("pin", "")
        focusInput(0)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [errors.pin, clearErrors, setValue, focusInput])

  /* Submission ------------------------------------------------------- */
  const onSubmit = useCallback(
    async (data: PairingCodeInput) => {
      setIsLoading(true)
      const result = await validatePairingCode(data.pin)
      setIsLoading(false)

      if (!result.success) {
        setError("pin", {
          type: "manual",
          message:
            "Invalid or expired code. Please try again or regenerate from the portal.",
        })
        return
      }

      localStorage.setItem("rms_device_id", `dev_${Date.now()}`)
      localStorage.setItem("rms_device_session", `dses_${Date.now()}`)
      localStorage.setItem("rms_outlet_name", result.outletName)
      localStorage.setItem("rms_outlet_id", result.outletId)

      navigate({ to: "/staff-selection" })
    },
    [navigate, setError]
  )

  /* Change handler --------------------------------------------------- */
  const handleDigitChange = useCallback(
    (index: number, value: string, fieldOnChange: (val: string) => void) => {
      const digit = value.replace(/\D/g, "").slice(-1)
      const current = getValues("pin")
      const chars = current.split("")
      chars[index] = digit
      const nextPin = chars.join("")
      fieldOnChange(nextPin)

      if (digit) {
        if (index + 1 >= PIN_LENGTH) {
          // last box filled — attempt submit
          if (nextPin.length === PIN_LENGTH && /^\d{6}$/.test(nextPin)) {
            handleSubmit(onSubmit)()
          }
        } else {
          focusInput(index + 1)
        }
      }
    },
    [getValues, handleSubmit, onSubmit, focusInput]
  )

  /* Keyboard navigation ---------------------------------------------- */
  const handleKeyDown = useCallback(
    (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>,
      fieldOnChange: (val: string) => void
    ) => {
      const current = getValues("pin")
      const chars = current.split("")

      if (e.key === "Backspace") {
        e.preventDefault()
        if (chars[index]) {
          chars[index] = ""
        } else if (index > 0) {
          chars[index - 1] = ""
          focusInput(index - 1)
        }
        fieldOnChange(chars.join(""))
        return
      }

      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault()
        focusInput(index - 1)
        return
      }

      if (e.key === "ArrowRight" && index < PIN_LENGTH - 1) {
        e.preventDefault()
        focusInput(index + 1)
        return
      }

      if (e.key === "Enter") {
        e.preventDefault()
        handleSubmit(onSubmit)()
      }
    },
    [getValues, focusInput, handleSubmit, onSubmit]
  )

  /* Paste handler ---------------------------------------------------- */
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, fieldOnChange: (val: string) => void) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "")
      if (!pasted) return

      const digits = pasted.slice(0, PIN_LENGTH).split("")
      const newPin = digits.join("").padEnd(PIN_LENGTH, "")
      fieldOnChange(newPin)

      if (digits.length >= PIN_LENGTH) {
        handleSubmit(onSubmit)()
      } else {
        focusInput(digits.length)
      }
    },
    [handleSubmit, onSubmit, focusInput]
  )

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background gap-6 p-4">
      <Card className="w-full max-w-md border border-foreground rounded-sm">
        <CardHeader className="text-center">
          <CardTitle>Device Setup</CardTitle>
          <CardDescription>
            Enter the 6-digit pairing code from your Tenant Portal.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <Controller
            name="pin"
            control={control}
            render={({ field }) => {
              const chars = field.value.split("")

              return (
                <div className="flex items-center gap-2">
                  {Array.from({ length: PIN_LENGTH }, (_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        ref={(el) => {
                          inputRefs.current[i] = el
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={chars[i] ?? ""}
                        disabled={isLoading}
                        onChange={(e) =>
                          handleDigitChange(i, e.target.value, field.onChange)
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(i, e, field.onChange)
                        }
                        onPaste={(e) => handlePaste(e, field.onChange)}
                        className="h-14 w-12 text-center text-2xl font-mono disabled:opacity-50"
                        autoFocus={i === 0}
                        aria-label={`Digit ${i + 1} of ${PIN_LENGTH}`}
                        aria-invalid={!!errors.pin}
                      />
                      {i === GROUP_SIZE - 1 && i !== PIN_LENGTH - 1 && (
                        <span className="text-2xl font-mono text-muted-foreground select-none">
                          —
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )
            }}
          />

          {isLoading && (
            <p className="text-sm font-medium text-primary">Validating…</p>
          )}

          {errors.pin && !isLoading && (
            <p className="text-sm text-destructive text-center max-w-xs">
              {errors.pin.message}
            </p>
          )}

          {!isLoading && !errors.pin && (
            <p className="text-sm text-muted-foreground text-center">
              Code expires after 10 minutes.
            </p>
          )}
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Need help? Contact your outlet manager.
      </p>
    </div>
  )
}
