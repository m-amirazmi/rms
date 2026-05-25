import { z } from "zod"
import { PIN_LENGTH } from "./constants"

export const PinSchema = z.object({
  pin: z
    .string()
    .length(PIN_LENGTH, { message: "PIN must be 4 digits" })
    .regex(/^\d{4}$/, { message: "PIN must contain only numbers" }),
})

export type PinInput = z.infer<typeof PinSchema>
