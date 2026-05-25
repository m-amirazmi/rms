import { useCallback, useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon, LockKey } from "@phosphor-icons/react"
import { Brand } from "@workspace/ui/components/brand"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

import { PIN_LENGTH } from "../constants"
import {
  clearLockout,
  getRemainingLockoutSeconds,
  isLocked,
  recordAttempt,
  validateStaffPin,
} from "../api"
import { PinSchema } from "../schemas"
import type { PinInput } from "../schemas"
import type { StaffMember } from "../types"
import { formatCountdown, getInitials } from "../utils"

interface PinOverlayProps {
  staff: StaffMember
  onSuccess: () => void
  onCancel: () => void
}

export function PinOverlay({ staff, onSuccess, onCancel }: PinOverlayProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const [lockoutSeconds, setLockoutSeconds] = useState(() =>
    isLocked(staff.id) ? getRemainingLockoutSeconds(staff.id) : 0
  )
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const form = useForm<PinInput>({
    resolver: zodResolver(PinSchema),
    defaultValues: { pin: "" },
    mode: "onSubmit",
  })

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState: { errors },
  } = form

  /* Countdown timer for lockout -------------------------------------- */
  useEffect(() => {
    if (lockoutSeconds <= 0) return
    const timer = setInterval(() => {
      const remaining = getRemainingLockoutSeconds(staff.id)
      setLockoutSeconds(remaining)
    }, 1000)
    return () => clearInterval(timer)
  }, [lockoutSeconds, staff.id])

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
  }, [errors.pin, clearErrors, setValue])

  /* Focus helpers ---------------------------------------------------- */
  const focusInput = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, PIN_LENGTH - 1))
    inputRefs.current[clamped]?.focus()
  }, [])

  /* Change handler --------------------------------------------------- */
  const handleDigitChange = useCallback(
    (index: number, value: string, fieldOnChange: (val: string) => void) => {
      if (isLocked(staff.id)) return
      const digit = value.replace(/\D/g, "").slice(-1)
      const current = getValues("pin")
      const chars = current.split("")
      chars[index] = digit
      const nextPin = chars.join("")
      fieldOnChange(nextPin)

      if (digit) {
        if (index + 1 >= PIN_LENGTH) {
          if (nextPin.length === PIN_LENGTH && /^\d{4}$/.test(nextPin)) {
            handleSubmit(onSubmit)()
          }
        } else {
          focusInput(index + 1)
        }
      }
    },
    [getValues, handleSubmit, focusInput, staff.id]
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
    [getValues, focusInput, handleSubmit]
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
      const newPin = digits.join("").padEnd(PIN_LENGTH, " ")
      fieldOnChange(newPin)

      if (digits.length >= PIN_LENGTH) {
        handleSubmit(onSubmit)()
      } else {
        focusInput(digits.length)
      }
    },
    [handleSubmit, focusInput]
  )

  /* Submission ------------------------------------------------------- */
  const onSubmit = useCallback(
    async (data: PinInput) => {
      if (isLocked(staff.id)) return
      setIsLoading(true)
      const result = await validateStaffPin(staff.id, data.pin)
      setIsLoading(false)

      if (!result.success) {
        const { locked, remaining } = recordAttempt(staff.id)
        if (locked) {
          setLockoutSeconds(getRemainingLockoutSeconds(staff.id))
          setError("pin", {
            type: "manual",
            message: "Too many failed attempts. Card locked.",
          })
        } else {
          setError("pin", {
            type: "manual",
            message: `Incorrect PIN. ${remaining} attempts remaining.`,
          })
          setShake(true)
          setTimeout(() => setShake(false), 500)
        }
        return
      }

      clearLockout(staff.id)
      localStorage.setItem("rms_staff_id", staff.id)
      localStorage.setItem("rms_staff_name", staff.fullName)
      localStorage.setItem("rms_staff_position", staff.position)
      onSuccess()
    },
    [staff.id, staff.fullName, staff.position, setError, onSuccess]
  )

  const locked = lockoutSeconds > 0

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/95 p-4 pb-40 backdrop-blur-sm">
      <Brand />

      <Card
        className={`w-full max-w-md rounded-xl border border-foreground ${shake ? "animate-shake" : ""}`}
      >
        <CardHeader className="text-center">
          <div
            className={`mx-auto flex size-16 items-center justify-center rounded-full font-heading text-xl font-semibold ${staff.avatarBg} ${staff.avatarText}`}
          >
            {getInitials(staff.fullName)}
          </div>
          <CardTitle className="mt-2">{staff.fullName}</CardTitle>
          <CardDescription>
            {locked ? "Card locked" : "Enter your 4-digit PIN"}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          {locked ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <LockKey className="size-8 text-destructive" weight="fill" />
              <p className="text-sm text-destructive">
                Too many failed attempts.
              </p>
              <p className="text-sm text-muted-foreground">
                Try again in{" "}
                <span className="font-mono font-medium text-foreground">
                  {formatCountdown(lockoutSeconds)}
                </span>
              </p>
            </div>
          ) : (
            <Controller
              name="pin"
              control={control}
              render={({ field }) => {
                const chars = field.value.split("")
                return (
                  <div className="flex items-center gap-2">
                    {Array.from({ length: PIN_LENGTH }, (_, i) => (
                      <Input
                        key={i}
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
                    ))}
                  </div>
                )
              }}
            />
          )}

          {isLoading && (
            <p className="text-sm font-medium text-primary">Validating…</p>
          )}

          {errors.pin && !isLoading && !locked && (
            <p className="max-w-xs text-center text-sm text-destructive">
              {errors.pin.message}
            </p>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="gap-1"
            disabled={isLoading}
          >
            <ArrowLeftIcon className="size-3.5" />
            Back to staff list
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
