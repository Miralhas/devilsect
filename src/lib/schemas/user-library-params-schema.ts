import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

import { z } from "zod";


export enum SortKey {
  LAST_READ = "lastReadAt,id,desc",
  LONGEST = "totalChapters,id,desc",
}

const allowedValues = {
  sort: [SortKey.LAST_READ, SortKey.LONGEST],
  filter: ["COMPLETED", "BOOKMARKED", ""]
} as const;

export type FilterType = typeof allowedValues.filter[number];

export const mapSortKey = (value: string): SortKey => {
  switch (value) {
    case "Last Read": return SortKey.LAST_READ;
    case "Longest": return SortKey.LONGEST;
    default: return SortKey.LAST_READ
  }
}

export const mapFilter = (value: string): FilterType => {
  switch (value) {
    case "completed": return "COMPLETED";
    case "bookmarked": return "BOOKMARKED";
    default: return "";
  }
}

export const UserLibraryParamsSchema = z.object({
  novelSlug: z.string().optional(),
  size: z.coerce.number().gt(0).catch(0).optional(),
  page: z.number().gte(0).catch(0).optional(),
  sort: z.enum(allowedValues.sort).catch(SortKey.LAST_READ).optional(),
  filter: z.enum(allowedValues.filter).catch("").optional(),
});

export type UserLibraryParams = z.infer<typeof UserLibraryParamsSchema>;

export const nuqsUserLibrarySeachParams = {
  size: parseAsInteger.withDefault(20).withOptions({ shallow: false }),
  filter: parseAsString.withDefault("bookmarked").withOptions({ shallow: false }),
  sort: parseAsString.withDefault("Last Read").withOptions({ shallow: false })
}

export const loadUserLibraryParams = createLoader(nuqsUserLibrarySeachParams);