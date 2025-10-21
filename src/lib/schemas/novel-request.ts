import { z } from "zod"

export const novelRequestSchema = z.object({
  novelTitle: z
    .string()
    .min(3, {
      message: "Novel title must be at least 3 characters long"
    })
    .max(100, {
      message: "Username cannot be more than 100 characters long"
    }),
})

export type NovelRequestInput = z.infer<typeof novelRequestSchema>;