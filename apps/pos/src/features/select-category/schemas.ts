import { z } from "zod"

export const CategorySchema = z.object({
  category: z.enum([
    "smartphone",
    "laptop",
    "tablet",
    "wearable",
    "console",
    "other",
  ]),
})

export type CategoryFormInput = z.infer<typeof CategorySchema>
