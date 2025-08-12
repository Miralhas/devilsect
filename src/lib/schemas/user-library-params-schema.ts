import { z } from "zod";

export const UserLibraryParamsSchema = z.object({
  completed: z.boolean().optional(),
  bookmarked: z.boolean().optional(),
  novelSlug: z.string().optional(),
  size: z.number().gt(0).catch(0).optional(),
  page: z.number().gte(0).catch(0).optional(),
});

export type UserLibraryParams = z.infer<typeof UserLibraryParamsSchema>;