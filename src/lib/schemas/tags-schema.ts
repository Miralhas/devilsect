import { z } from "zod";
import { zodPagination } from './pagination-schema';
import { parseAsIndex, parseAsInteger, parseAsStringLiteral } from "nuqs/server";

export const ALPHABET = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
] as const;

export const TagsSchema = z.object({
  ...zodPagination,
  firstLetter: z.enum(ALPHABET).catch("a").optional()
});

export const nuqsTagsParams = {
  letter: parseAsStringLiteral(ALPHABET).withDefault("a").withOptions({ clearOnDefault: true }),
  page: parseAsIndex.withDefault(0).withOptions({ clearOnDefault: true, history: "push" }),
  size: parseAsInteger.withDefault(50).withOptions({ clearOnDefault: true, }),
}

export type TagsParams = z.infer<typeof TagsSchema>;