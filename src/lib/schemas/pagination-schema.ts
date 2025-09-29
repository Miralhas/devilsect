import * as z from "zod";

export const zodPagination = {
  page: z.coerce.number().gt(0).catch(0).optional(),
  size: z.number().gte(0).catch(0).optional(),
}

export const PaginationSchema = z.object({
  ...zodPagination
})

export type PaginationSchemaParams = z.infer<typeof PaginationSchema>;