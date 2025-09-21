import z from 'zod';

const STATUSES = ["ON_GOING", "COMPLETED"] as const;

export const updateNovelSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long"
    }),
  alias: z
    .string()
    .min(2, {message: "Alias should have at least 2 character"})
    .nullish(),
  author: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character long"
    }),
  status: z
    .enum(STATUSES),
  description: z
    .string()
    .min(1, {
      message: "Description must be at least 1 character long",
    }),
  genres: z
    .array(z.string())
    .min(1, {
      message: "Genres must at least have 1 genre selected",
    }),
  tags: z
    .array(z.string())
    .min(1, {
      message: "Tags must at least have 1 tag selected",
    }),
}).transform(value => value.alias === null ? {...value, alias: undefined} : value)

export type UpdateNovelInput = z.infer<typeof updateNovelSchema>;