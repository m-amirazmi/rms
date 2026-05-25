import { z } from "zod"

import { PIN_LENGTH } from "./constants"

export const PairingCodeSchema = z.object({
  pin: z
    .string()
    .length(PIN_LENGTH, { message: "Pairing code must be 6 digits" })
    .regex(/^\d{6}$/, {
      message: "Pairing code must contain only numbers",
    }),
})

export type PairingCodeInput = z.infer<typeof PairingCodeSchema>
