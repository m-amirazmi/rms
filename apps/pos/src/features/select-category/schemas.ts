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
  urgency: z.enum(["standard", "express", "warranty"]).optional(),
})

export type CategoryFormInput = z.infer<typeof CategorySchema>
