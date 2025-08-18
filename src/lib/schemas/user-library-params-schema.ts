import { createLoader, parseAsBoolean, parseAsInteger, parseAsString } from 'nuqs/server';

import { z } from "zod";


export enum SortKey {
  LAST_READ = "lastReadAt,id,desc",
  LONGEST = "totalChapters,id,desc",
}

const allowedValues = {
  sort: [SortKey.LAST_READ, SortKey.LONGEST]
} as const

export const mapSortKey = (value: string): SortKey => {
  switch (value) {
    case "Last Read": return SortKey.LAST_READ;
    case "Longest": return SortKey.LONGEST;
    default: return SortKey.LAST_READ
  }
}

export const UserLibraryParamsSchema = z.object({
  completed: z.boolean().optional(),
  bookmarked: z.boolean().optional(),
  novelSlug: z.string().optional(),
  size: z.coerce.number().gt(0).catch(0).optional(),
  page: z.number().gte(0).catch(0).optional(),
  sort: z.enum(allowedValues.sort).catch(SortKey.LAST_READ).optional(),
});

export type UserLibraryParams = z.infer<typeof UserLibraryParamsSchema>;

export const nuqsUserLibrarySeachParams = {
  size: parseAsInteger.withDefault(20).withOptions({ shallow: false }),
  completed: parseAsBoolean.withDefault(false).withOptions({ shallow: false }),
  sort: parseAsString.withDefault("Last Read").withOptions({ shallow: false })
}

export const loadUserLibraryParams = createLoader(nuqsUserLibrarySeachParams);