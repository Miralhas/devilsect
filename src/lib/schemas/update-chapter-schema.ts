import z from 'zod';

export const updateChapterSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long"
    }),
  body: z
    .string()
    .min(1, { message: "Body should have at least 1 character" }),
  number: z
    .number()
    .positive({ message: "Number has to be greater than 0" }),
})

export type UpdateChapterInput = z.infer<typeof updateChapterSchema>;