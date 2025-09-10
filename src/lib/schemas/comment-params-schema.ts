import { z } from "zod";
import { zodPagination } from "./pagination-schema";

export enum SortKey {
  TOP = "voteCount,id,desc",
  OLDEST = "createdAt,id,asc",
  NEWEST = "createdAt,id,desc",
}

export const allowedValues = {
  sort: [SortKey.NEWEST, SortKey.OLDEST, SortKey.TOP],
} as const;

export const CommentParamsSchema = z.object({
  novelSlug: z.string(),
  sort: z.enum(allowedValues.sort).catch(SortKey.TOP).optional(),
  ...zodPagination
});

export type CommentParams = z.infer<typeof CommentParamsSchema>;