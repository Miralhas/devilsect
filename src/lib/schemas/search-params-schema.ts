import { createSerializer, parseAsInteger, parseAsString } from 'nuqs/server';

import { z } from "zod";

export const SearchParamsSchema = z.object({
  q: z.string().catch(""),
  page: z.number().gte(0).catch(0).optional(),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;

export const nuqsSearchParams = {
  q: parseAsString.withDefault("").withOptions({ shallow: true, clearOnDefault: true }),
  page: parseAsInteger.withDefault(1).withOptions({ shallow: true, clearOnDefault: true })
}

export const searchSerializer = createSerializer(nuqsSearchParams);