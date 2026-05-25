import { useRef, useCallback, useEffect, useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Brand } from "@workspace/ui/components/brand"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

import { GROUP_SIZE, PIN_LENGTH } from "../constants"
import { validatePairingCode } from "../api"
import { PairingCodeSchema } from "../schemas"
import type { PairingCodeInput } from "../schemas"

export function NewDevicePage() {
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

      navigate({ to: "/select-staff" })
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
    (
      e: React.ClipboardEvent<HTMLInputElement>,
      fieldOnChange: (val: string) => void
    ) => {
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-background p-4 pb-40">
      <Brand />

      <Card className="w-full max-w-md rounded-xl border border-foreground">
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
                        onKeyDown={(e) => handleKeyDown(i, e, field.onChange)}
                        onPaste={(e) => handlePaste(e, field.onChange)}
                        className="h-14 w-12 text-center font-mono disabled:opacity-50 md:text-2xl"
                        autoFocus={i === 0}
                        aria-label={`Digit ${i + 1} of ${PIN_LENGTH}`}
                        aria-invalid={!!errors.pin}
                      />
                      {i === GROUP_SIZE - 1 && i !== PIN_LENGTH - 1 && (
                        <span className="font-mono text-2xl text-muted-foreground select-none">
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
            <p className="max-w-xs text-center text-sm text-destructive">
              {errors.pin.message}
            </p>
          )}

          {!isLoading && !errors.pin && (
            <p className="text-center text-sm text-muted-foreground">
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
