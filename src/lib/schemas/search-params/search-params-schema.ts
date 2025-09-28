import { createSerializer, parseAsIndex, parseAsString } from 'nuqs/server';

import { z } from "zod";
import { zodPagination } from '../pagination-schema';

export const SearchParamsSchema = z.object({
  q: z.string().catch(""),
  ...zodPagination
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;

export const nuqsSearchParams = {
  q: parseAsString.withDefault("").withOptions({ shallow: true, clearOnDefault: true }),
  page: parseAsIndex.withDefault(0).withOptions({ shallow: true, clearOnDefault: true })
}

export const searchSerializer = createSerializer(nuqsSearchParams);